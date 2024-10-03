import React, { useState } from 'react';
import './Registration.css';
const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const userData = {
            username,
            password,
            public_key: publicKey,
        };

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Registration successful: ' + data.message);
                setError(''); // Clear any previous errors
            } else {
                const errorData = await response.json();
                setError('Registration failed: ' + (errorData.message || 'Unknown error'));
                setSuccessMessage(''); // Clear any previous success messages
            }
        } catch (error) {
            setError('Error during registration: ' + error.message);
            setSuccessMessage(''); // Clear any previous success messages
        }
    };

    return (
        <div>
            <h1>Don't have an account?? Feel free to register</h1>
            <h2>Register Here</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Public Key:</label>
                    <input
                        type="text"
                        value={publicKey}
                        onChange={(e) => setPublicKey(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default Registration;
