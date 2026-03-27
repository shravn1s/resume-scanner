import mysql.connector
import hashlib

# MySQL config — replace with your credentials
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Blueisgreat@123',
    'database': 'hirewise'
}

def get_connection():
    return mysql.connector.connect(**DB_CONFIG)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def add_user(username, password):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)",
                       (username, hash_password(password)))
        conn.commit()
        return True
    except mysql.connector.IntegrityError:
        return False
    finally:
        cursor.close()
        conn.close()

def validate_user(username, password):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
    record = cursor.fetchone()
    cursor.close()
    conn.close()
    return record and record[0] == hash_password(password)
