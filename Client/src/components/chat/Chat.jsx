import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styles from './Chat.module.css';
import axios from 'axios'; // Import axios

let socket = null;

const Chat = ({ otherUser, otherUserModel, otherUserName }) => {
    const [loggedInUser, setLoggedInUser] = useState(null); // New state for fetched user
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
    const [isOtherUserOnline, setIsOtherUserOnline] = useState(false);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // Fetch logged-in user data on component mount
    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/me'); // Assuming /api/me endpoint
                setLoggedInUser(response.data);
            } catch (error) {
                console.error("Error fetching logged-in user:", error);
                setLoggedInUser(null); // Ensure user is null on error
            }
        };
        fetchLoggedInUser();
    }, []); // Empty dependency array to run once on mount

    const currentUser = loggedInUser ? loggedInUser._id : null;
    const currentUserModel = loggedInUser ? loggedInUser.model : null;
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!loggedInUser) return; // Only connect socket if user data is available

        const connectSocket = () => {
            socket = io('http://localhost:8000');

            socket.on('connect', () => {
                console.log('Socket connected!');
                socket.emit('user_online', { userId: loggedInUser._id, userModel: loggedInUser.model });

                if (otherUser) {
                    socket.emit('get_messages', {
                        user1Id: loggedInUser._id,
                        user1Model: loggedInUser.model,
                        user2Id: otherUser,
                        user2Model: otherUserModel
                    }, (history) => {
                        setMessages(history);
                        scrollToBottom();
                    });
                }
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected.');
                setIsOtherUserOnline(false);
            });

            socket.on('receive_message', (data) => {
                if (
                    data &&
                    data.sender &&
                    data.sender._id &&
                    data.sender._id.toString() !== loggedInUser._id.toString()
                ) {
                    setMessages((prevMessages) => [...prevMessages, data]);
                    scrollToBottom();
                }
            });

            socket.on('typing', (senderId) => {
                if (senderId === otherUser) {
                    setIsOtherUserTyping(true);
                }
            });

            socket.on('stop_typing', (senderId) => {
                if (senderId === otherUser) {
                    setIsOtherUserTyping(false);
                }
            });

            socket.on('user_status_change', ({ userId, isOnline }) => {
                if (userId === otherUser) {
                    setIsOtherUserOnline(isOnline);
                }
            });
        };

        connectSocket();

        return () => {
            if (socket) {
                socket.disconnect();
                socket = null;
            }
        };
    }, [loggedInUser, otherUser, otherUserModel]); // Add loggedInUser to dependencies

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        if (loggedInUser && otherUser && socket) {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            socket.emit('typing', { senderId: loggedInUser._id, receiverId: otherUser });
            typingTimeoutRef.current = setTimeout(() => {
                socket.emit('stop_typing', { senderId: loggedInUser._id, receiverId: otherUser });
            }, 1000);
        }
    };

    const sendMessage = () => {
        console.log("Current state for sending:", { message, currentUser: loggedInUser?._id, otherUser, socket: socket ? "connected" : "disconnected" });

        // Always add the message to the local state for immediate display
        setMessages((prevMessages) => [...prevMessages, {
            sender: {
                _id: loggedInUser?._id,
                firstName: loggedInUser?.model === "User" ? "You" : undefined,
                lastName: loggedInUser?.model === "User" ? "" : undefined,
                name: loggedInUser?.model === "Shop" ? "You" : undefined
            },
            senderModel: loggedInUser?.model,
            content: message
        }]);
        setMessage('');
        scrollToBottom();

        if (message.trim() && loggedInUser && otherUser && socket) {
            const messageData = {
                senderId: loggedInUser._id,
                senderModel: loggedInUser.model,
                receiverId: otherUser,
                receiverModel: otherUserModel,
                content: message,
            };
            console.log("Sending message data:", messageData);
            socket.emit('send_message', messageData);
            socket.emit('stop_typing', { senderId: loggedInUser._id, receiverId: otherUser });
        } else {
            if (!otherUser) {
                console.warn("Message displayed locally but NOT sent to server: otherUser is null. Please select a user or ensure owner ID is fetched.");
            }
        }
    };

    const getSenderName = (msg) => {
        if (!msg.sender) return "System";
        if (msg.sender._id && msg.sender._id.toString() === currentUser.toString()) {
            return "You";
        } else if (msg.senderModel === "User") {
            if (msg.sender.firstName && msg.sender.lastName) {
                return `${msg.sender.firstName} ${msg.sender.lastName}`;
            } else if (msg.sender.firstName) {
                return msg.sender.firstName;
            } else if (msg.sender.lastName) {
                return msg.sender.lastName;
            }
        } else if (msg.senderModel === "Shop" && msg.sender.name) {
            return msg.sender.name;
        }
        return "System";
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <h3>Chat with {otherUserName || (otherUserModel === "User" ? "User" : "Owner")}</h3>
                <span className={`${styles.statusIndicator} ${isOtherUserOnline ? styles.online : styles.offline}`}>
                    {isOtherUserOnline ? 'Online' : 'Offline'}
                </span>
            </div>
            <div className={styles.messageList}>
                {messages.map((msg, index) => {
                    const isSentByCurrentUser = msg.sender && msg.sender._id && msg.sender._id.toString() === currentUser.toString();
                    return (
                        <div key={index} className={`${styles.message} ${isSentByCurrentUser ? styles.sent : styles.received}`}>
                            <div className={styles.messageContent}>
                                <span className={styles.messageSender}>{getSenderName(msg)}: </span>{msg.content}
                            </div>
                        </div>
                    );
                })}
                {isOtherUserTyping && (
                    <div className={styles.typingIndicator}>Other user is typing...</div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className={styles.messageInputContainer}>
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    className={styles.messageInput}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <button onClick={sendMessage} className={styles.sendButton}>Send</button>
            </div>
        </div>
    );
};

export default Chat;