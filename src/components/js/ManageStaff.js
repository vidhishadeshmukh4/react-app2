import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ManageStaff.css'; 

function ManageStaff() {
    const [staff, setStaff] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:3008/api/users');
            console.log('Fetched users:', response.data); // Log the fetched data
            setStaff(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setMessage('Error fetching users. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add new user
            await axios.post('http://localhost:3000/api/users', {
                username,
                password,
                email,
                first_name: firstName,
                last_name: lastName,
                user_role: userRole,
            });
            setMessage('User added successfully!');
            // Reset form fields
            setUsername('');
            setPassword('');
            setEmail('');
            setFirstName('');
            setLastName('');
            setUserRole('');
            fetchStaff(); // Refresh the user list
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error: ' + (error.response?.data?.error || 'Something went wrong'));
        }
    };

    return (
        <div className="manage-staff">
            <h2>Manage Staff</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="text"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    placeholder="User Role"
                    required
                />
                <button type="submit">Add User</button>
            </form>
            {message && <p>{message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Role</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.length > 0 ? (
                        staff.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.user_role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No users available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ManageStaff;
