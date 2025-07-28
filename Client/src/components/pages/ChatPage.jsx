import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Chat from '../chat/Chat';
import styles from './ChatPage.module.css';

import { useAuth } from '../../context/AuthContext';


const ChatPage = () => {
    const { user, isOwner } = useAuth();
    console.log("ChatPage Auth Context:", { user, isOwner });

    // Dynamically set OWNER_ID and OWNER_MODEL from AuthContext
    const OWNER_ID = isOwner && user ? user._id : null; // Assuming the logged-in owner is the OWNER_ID
    const OWNER_MODEL = "Shop"; // Assuming the owner is always a 'Shop' model for chat purposes
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState({});
    const [socket] = useState(io(':8000'));

    const getDisplayName = (user) => {
        if (user.model === "User") {
            return user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.firstName || user.lastName || 'Unknown User';
        } else {
            return user.shopName || 'Unknown Shop';
        }
    };


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users'); // Assuming this endpoint exists
                setUsers(response.data.map(user => ({ ...user, displayName: getDisplayName(user) })));
                console.log("Fetched users:", response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();

        socket.on('connect', () => {
            console.log('ChatPage Socket connected!');
            if (user && user._id && user.model) { // Add check for user before emitting
                socket.emit('user_online', { userId: user._id, userModel: user.model });
            }
        });

        socket.on('disconnect', () => {
            console.log('ChatPage Socket disconnected.');
        });

        socket.on('user_status_change', ({ userId, isOnline, firstName, lastName, shopName, model }) => {
            setOnlineUsers(prev => ({ ...prev, [userId]: isOnline }));

            setUsers(prev => {
                const existingUser = prev.find(u => u._id === userId);
                const newUser = {
                    _id: userId,
                    firstName,
                    lastName,
                    shopName,
                    model,
                    displayName: getDisplayName({ firstName, lastName, shopName, model })
                };
                if (existingUser) {
                    return prev.map(u => u._id === userId ? { ...u, ...newUser } : u);
                }
                return [...prev, newUser];
            });
        });

        socket.on('user_connected', (userData) => {
            const displayName = getDisplayName(userData);
            setUsers(prev => {
                if (!prev.some(u => u._id === userData._id)) {
                    return [...prev, { ...userData, displayName }];
                }
                return prev;
            });
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [user]); // Added user to dependency array to re-run effect if user changes

    // Import axios at the top of the file if not already present
    // import axios from 'axios';

    return (
        <div className={styles.chatPageContainer}>
            <div className={styles.userListContainer}>
                <h2 className={styles.userListTitle}>Connected Users</h2>
                <ul className={styles.userList}>
                    {users.map((user) => (
                        <li
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`${styles.userListItem} ${selectedUser && selectedUser._id === user._id ? styles.active : ''}`}
                        >
                            <span className={styles.userName}>{user.displayName}</span>
                            <span className={`${styles.statusIndicator} ${onlineUsers[user._id] ? styles.online : styles.offline}`}>
                                {onlineUsers[user._id] ? 'Online' : 'Offline'}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.chatContainer}>
                {selectedUser ? (
                    <Chat
                        otherUser={selectedUser._id}
                        otherUserModel={selectedUser.model}
                        otherUserName={selectedUser.displayName}
                    />
                ) : (
                    <div className={styles.welcomeMessage}>
                        <h2>Welcome to Live Chat</h2>
                        <p>Select a user from the left to start chatting in real-time.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
