from flask import Flask, request, jsonify
from utils import hash_password, verify_password
import mysql.connector
from datetime import datetime
from flask_cors import CORS
import time


app = Flask(__name__)
CORS(app, resources={r"/register": {"origins": "http://localhost:3000"},
                     r"/verify": {"origins": "http://localhost:3000"},
                     r"/revoke": {"origins": "http://localhost:3000"}})

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="healthcare"
)
cursor = db.cursor()

# Register User Route
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    start_time = time.time()
    password = hash_password(data['password'])
    end_time = time.time()
    time_taken = end_time - start_time
    print(f"Time taken to hash the password: {time_taken:.6f} seconds")
    public_key = data['public_key']
    
    query = "INSERT INTO users (username, password_hash, public_key, is_revoked) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (username, password, public_key, False))
    db.commit()
    return jsonify({"message": "User registered successfully"}), 201

# Verify User Identity
@app.route('/verify', methods=['POST'])
def verify_identity():
    data = request.json
    username = data['username']
    password = data['password']
    password_hashed = hash_password(password)
    # Fetch the password hash for the given username
    query = "SELECT password_hash FROM users WHERE username = %s"
    cursor.execute(query, (username,))  

    # Check if a user was found and verify the password
    result = cursor.fetchone()
    print(result[0],password_hashed)
    if result and result[0]==password_hashed:
        print("Success")
        return jsonify({"message": "Identity verified successfully"}), 200
    else:
        print("Failed")
        return jsonify({"error": "Invalid username or password"}), 401

# Revoke User ID
@app.route('/revoke', methods=['POST'])
def revoke_id():
    data = request.json
    username = data['username']
    reason = data['reason']

    # Check if user is verified before revoking
    verification_query = "SELECT public_key, is_revoked FROM users WHERE username = %s"
    cursor.execute(verification_query, (username,))
    result = cursor.fetchone()

    if result and not result[1]:  # If user is found and not already revoked
        public_key = result[0]

        # Update the user's revocation status
        query = "UPDATE users SET is_revoked = TRUE WHERE username = %s"
        cursor.execute(query, (username,))

        # Insert into the revocation list
        revocation_query = "INSERT INTO revocation_list (username, public_key, reason, revoked_at) VALUES (%s, %s, %s, %s)"
        cursor.execute(revocation_query, (username, public_key, reason, datetime.now()))

        db.commit()  # Commit changes to the database
        return jsonify({"message": "ID revoked successfully", "reason": reason}), 200
    else:
        return jsonify({"error": "User not verified or already revoked"}), 403


# Handle 404 errors
@app.errorhandler(404)
def not_found(e):
    return jsonify(error=str(e)), 404

if __name__ == '__main__':
    app.run(debug=True)
