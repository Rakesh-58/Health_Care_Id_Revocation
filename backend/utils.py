from hashlib import sha256
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256

def hash_password(password):
    """Hashes a password using SHA-256."""
    return sha256(password.encode()).hexdigest()

def verify_password(stored_password, provided_password):
    """Verifies a provided password against a stored hashed password."""
    return hash_password(provided_password) == stored_password

def generate_signature(message, private_key_str):
    """Generates a digital signature for a given message using a private key."""
    private_key = RSA.import_key(private_key_str)
    h = SHA256.new(message.encode())
    signature = pkcs1_15.new(private_key).sign(h)
    return signature.hex()
