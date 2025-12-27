import json
import os
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """Webhook для уведомлений о новых платежах и предоставления доступа"""
    
    method = event.get('httpMethod', 'GET')
    
    # CORS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        # Подтверждение оплаты (для админа)
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            payment_id = body.get('payment_id')
            
            if not payment_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'payment_id обязателен'}),
                    'isBase64Encoded': False
                }
            
            # Обновляем статус платежа
            cursor.execute(
                "UPDATE payments SET payment_status = %s, confirmed_at = %s WHERE id = %s RETURNING email",
                ('confirmed', datetime.now(), payment_id)
            )
            result = cursor.fetchone()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Платёж не найден'}),
                    'isBase64Encoded': False
                }
            
            email = result['email']
            
            # Предоставляем доступ к курсу
            cursor.execute(
                "INSERT INTO course_access (email, payment_id) VALUES (%s, %s) ON CONFLICT (email) DO NOTHING",
                (email, payment_id)
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'message': 'Доступ предоставлен',
                    'email': email
                }),
                'isBase64Encoded': False
            }
        
        # Получить список платежей (для админа)
        elif method == 'GET':
            status = event.get('queryStringParameters', {}).get('status', 'pending')
            
            cursor.execute(
                "SELECT id, email, phone, amount, payment_status, created_at FROM payments WHERE payment_status = %s ORDER BY created_at DESC LIMIT 50",
                (status,)
            )
            payments = cursor.fetchall()
            
            # Конвертируем datetime в строки
            for p in payments:
                if p['created_at']:
                    p['created_at'] = p['created_at'].isoformat()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'payments': payments}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
