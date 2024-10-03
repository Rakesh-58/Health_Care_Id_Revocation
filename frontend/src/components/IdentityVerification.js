import React, { useState } from 'react';
import './IdentityVerification.css';
const VerifyIdentity = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Verification failed');
            }

            // If verification is successful, redirect to the revoke page
            window.location.href = '/revoke'; // Redirect to the revoke ID page
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Verify Identity</h2>
            <form onSubmit={handleVerify}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Verify</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default VerifyIdentity;
