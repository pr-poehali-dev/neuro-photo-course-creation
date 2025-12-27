-- Таблица для хранения платежей
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    amount INTEGER NOT NULL DEFAULT 2990,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    transaction_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    confirmed_at TIMESTAMP,
    notes TEXT
);

-- Таблица для предоставления доступа к курсу
CREATE TABLE IF NOT EXISTS course_access (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    payment_id INTEGER REFERENCES payments(id),
    access_granted_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_payments_email ON payments(email);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_course_access_email ON course_access(email);