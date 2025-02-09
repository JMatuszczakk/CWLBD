from flask import Flask, jsonify, request, g
from flask_cors import CORS
import psycopg2
from psycopg2 import OperationalError

app = Flask(__name__)
CORS(app)

import os
from dotenv import load_dotenv
import hashlib
import uuid
from datetime import datetime, timedelta
load_dotenv()
password = os.getenv('POSTGRES_PASSWORD')

def create_connection():
    try:
        connection = psycopg2.connect(
            host='104.248.18.162',
            user='postgres',
            password=password,
            database='postgres'
        )
        print("Połączenie z bazą danych PostgreSQL udane")
        return connection
    except OperationalError as e:
        print(f"Błąd połączenia z bazą danych: '{e}'")
        return None

def fetch_all_dogs(cursor):
    cursor.execute("SELECT * FROM dogs")
    columns = []
    for desc in cursor.description:
        columns.append(desc[0])
    result = []
    for row in cursor.fetchall():
        print(row)
        row_dict = {}
        for col, val in zip(columns, row):
            row_dict[col] = val
        result.append(row_dict)
    print(result)
    return result

def insert_dog(cursor, dog_data):
    query = """
    INSERT INTO dogs (name, race, color, photo, number, illnesses)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (dog_data['name'], dog_data['race'], dog_data['color'],
                           dog_data['photo'], dog_data['number'], dog_data['illnesses']))

def delete_dog(cursor, dog_id):
    query = "DELETE FROM dogs WHERE id = %s"
    cursor.execute(query, (dog_id,))

@app.before_request
def before_request():
    g.connection = create_connection()

@app.teardown_request
def teardown_request(exception):
    connection = getattr(g, 'connection', None)
    if connection:
        connection.close()

@app.route('/')
def home():
    return "Witamy w API Schroniska dla Psów!"

@app.route('/api/dogs', methods=['GET'])
def get_dogs():
    cursor = g.connection.cursor()
    dogs = fetch_all_dogs(cursor)
    cursor.close()
    return jsonify(dogs)

@app.route('/api/dogs/addDog', methods=['POST'])
def post_dog():
    new_dog = request.get_json()
    cursor = g.connection.cursor()
    insert_dog(cursor, new_dog)
    g.connection.commit()
    cursor.close()
    return jsonify({"message": "Pies dodany pomyślnie!"}), 201

@app.route('/api/dogs/delete', methods=['POST'])
def remove_dog():
    info = request.get_json()
    delete_dog(info['id'])
"""
the user sessions table:
CREATE TABLE user_sessions (
    user_id INTEGER NOT NULL,
    session_key TEXT NOT NULL,
    expiration_day DATE NOT NULL
);
"""
@app.route('/api/users/login', methods=['POST'])
def login():
    user = request.get_json()
    cursor = g.connection.cursor()
    hashed_password = hashlib.sha256(user['password'].encode()).hexdigest()
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (user['username'], hashed_password))
    result = cursor.fetchone()
    if result:
        session_key = str(uuid.uuid4())
        expiration_day = datetime.now() + timedelta(days=1)
        cursor.execute("INSERT INTO user_sessions (user_id, session_key, expiration_day) VALUES (%s, %s, %s)",
                       (result[0], session_key, expiration_day))
        g.connection.commit()
        cursor.close()
        return jsonify({"message": "Zalogowano pomyślnie!", "session_key": session_key}), 200
    else:
        cursor.close()
        return jsonify({"message": "Niepoprawne dane logowania!"}), 401

"""
sample curl request:
curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}' http://localhost:5000/api/users/logout
"""
#the favourites and cart columns are JSON type
@app.route('/api/users/register', methods=['POST'])
def register():
    user = request.get_json()
    cursor = g.connection.cursor()
    hashed_password = hashlib.sha256(user['password'].encode()).hexdigest()
    cursor.execute("INSERT INTO public_users (email, password_hash, favourites, cart) VALUES (%s, %s, %s,%s)", (user['username'], hashed_password, '{}', '{}'))
    g.connection.commit()
    cursor.close()
    return jsonify({"message": "Zarejestrowano pomyślnie!"}), 201
"""
sample curl request:
curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}' http://localhost:5000/api/users/register
"""


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)