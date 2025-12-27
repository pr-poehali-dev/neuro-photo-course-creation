import json
import os
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """API для обработки платежей за курс нейрофотосессии"""
    
    method = event.get('httpMethod', 'GET')
    
    # CORS для всех запросов
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Email'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    # Подключение к БД
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        # Регистрация новой заявки на оплату
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            email = body.get('email', '').strip()
            phone = body.get('phone', '').strip()
            
            if not email:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email обязателен'}),
                    'isBase64Encoded': False
                }
            
            # Сохраняем заявку
            cursor.execute(
                "INSERT INTO payments (email, phone, amount, payment_status) VALUES (%s, %s, %s, %s) RETURNING id",
                (email, phone, 2990, 'pending')
            )
            payment_id = cursor.fetchone()['id']
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'payment_id': payment_id,
                    'message': 'Заявка создана. После оплаты доступ будет предоставлен автоматически.',
                    'card_number': '2204320428267423',
                    'amount': 2990
                }),
                'isBase64Encoded': False
            }
        
        # Проверка статуса оплаты
        elif method == 'GET':
            email = event.get('queryStringParameters', {}).get('email', '').strip()
            
            if not email:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email обязателен'}),
                    'isBase64Encoded': False
                }
            
            # Проверяем доступ
            cursor.execute(
                "SELECT * FROM course_access WHERE email = %s",
                (email,)
            )
            access = cursor.fetchone()
            
            if access:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'has_access': True,
                        'granted_at': access['access_granted_at'].isoformat() if access['access_granted_at'] else None
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'has_access': False,
                        'message': 'Оплата не найдена. Пожалуйста, оплатите курс.'
                    }),
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
