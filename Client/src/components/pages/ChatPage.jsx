import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chat from '../chat/Chat';
import styles from './ChatPage.module.css';

let socket = null; // Initialize socket as null

// Placeholder for owner's ID - in a real app, this would come from auth context
const OWNER_ID = "60c72b2f9b1e8c001c8e4d1a"; // Example MongoDB ObjectId
const OWNER_MODEL = "Shop";

const ChatPage = () => {
    const [users, setUsers] = useState([]); // Stores objects with { _id, name, model }
    const [selectedUser, setSelectedUser] = useState(null); // Stores the selected user object
    const [onlineUsers, setOnlineUsers] = useState({}); // { userId: true/false }

    useEffect(() => {
        const connectSocket = () => {
            socket = io('http://localhost:8000');

            socket.on('connect', () => {
                console.log('ChatPage Socket connected!');
                // Emit that the owner is online
                socket.emit('user_online', { userId: OWNER_ID, userModel: OWNER_MODEL });
            });

            socket.on('disconnect', () => {
                console.log('ChatPage Socket disconnected.');
            });

            // Listen for user status changes
            socket.on('user_status_change', ({ userId, isOnline, name, model }) => {
                setOnlineUsers((prevStatus) => ({
                    ...prevStatus,
                    [userId]: isOnline,
                }));
                setUsers((prevUsers) => {
                    const existingUser = prevUsers.find(u => u._id === userId);
                    if (existingUser) {
                        return prevUsers.map(u => u._id === userId ? { ...u, name, model } : u);
                    } else {
                        return [...prevUsers, { _id: userId, name, model }];
                    }
                });
            });

            // Listen for new user connections (this should ideally provide user ID and model)
            socket.on('user_connected', (userData) => {
                // userData should be { _id, name, model }
                setUsers((prevUsers) => {
                    if (!prevUsers.some(u => u._id === userData._id)) {
                        return [...prevUsers, userData];
                    }
                    return prevUsers;
                });
            });
        };

        const timeoutId = setTimeout(connectSocket, 5000); // Delay connection by 5 seconds

        return () => {
            clearTimeout(timeoutId);
            if (socket) {
                socket.disconnect();
                socket = null;
            }
        };
    }, []);

    return (
        <div className={styles.chatPageContainer}>
            <div className={styles.userListContainer}>
                <h2 className={styles.userListTitle}>Connected Users</h2>
                <ul className={styles.userList}>
                    {users.map((user) => (
                        <li key={user._id} onClick={() => setSelectedUser(user)} className={styles.userListItem}>
                            <span className={styles.userName}>{user.name}</span>
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
                        currentUser={OWNER_ID}
                        currentUserModel={OWNER_MODEL}
                        otherUser={selectedUser._id} 
                        otherUserModel={selectedUser.model}
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