import React, { useState } from 'react';
import './RevokeId.css';
const RevokeID = () => {
    const [username, setUsername] = useState('');  // Store username here
    const [reason, setReason] = useState('');

    const handleRevoke = async () => {
        try {
            const response = await fetch('http://localhost:5000/revoke', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, reason }),
            });

            if (response.ok) {
                alert('ID revoked successfully');
            } else {
                const errorData = await response.json();
                alert(`Failed to revoke ID: ${errorData.error}`);
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        }
    };

    return (
        <div>
            <h2>Revoke ID</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}  // Change to use username state
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Reason for revocation"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
            />
            <button onClick={handleRevoke}>Revoke ID</button>
        </div>
    );
};

export default RevokeID;
