import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styles from './Chat.module.css';

let socket = null; // Initialize socket as null

const Chat = ({ currentUser, otherUser, currentUserModel, otherUserModel }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
    const [isOtherUserOnline, setIsOtherUserOnline] = useState(false);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const connectSocket = () => {
            socket = io('http://localhost:8000');

            socket.on('connect', () => {
                console.log('Socket connected!');
                if (currentUser && currentUserModel) {
                    socket.emit('user_online', { userId: currentUser, userModel: currentUserModel });
                }
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected.');
                setIsOtherUserOnline(false); // Assume offline if disconnected
            });

            // Fetch message history when component mounts or users change
            if (currentUser && otherUser) {
                socket.emit('get_messages', {
                    user1Id: currentUser,
                    user1Model: currentUserModel,
                    user2Id: otherUser,
                    user2Model: otherUserModel
                }, (history) => {
                    setMessages(history);
                    scrollToBottom();
                });
            }

            // Listen for new messages
            socket.on('receive_message', (data) => {
                setMessages((prevMessages) => [...prevMessages, data]);
                scrollToBottom();
            });

            // Listen for typing events
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

            // Listen for user status changes
            socket.on('user_status_change', ({ userId, isOnline }) => {
                if (userId === otherUser) {
                    setIsOtherUserOnline(isOnline);
                }
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
    }, [currentUser, otherUser, currentUserModel, otherUserModel]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        if (currentUser && otherUser && socket) {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            socket.emit('typing', { senderId: currentUser, receiverId: otherUser });
            typingTimeoutRef.current = setTimeout(() => {
                socket.emit('stop_typing', { senderId: currentUser, receiverId: otherUser });
            }, 1000);
        }
    };

    const sendMessage = () => {
        if (message.trim() && currentUser && otherUser && socket) {
            const messageData = {
                senderId: currentUser,
                senderModel: currentUserModel,
                receiverId: otherUser,
                receiverModel: otherUserModel,
                content: message,
            };
            socket.emit('send_message', messageData);
            // Optimistically update UI with sent message
            setMessages((prevMessages) => [...prevMessages, { 
                sender: { _id: currentUser, username: currentUserModel === "User" ? "You" : undefined, shopName: currentUserModel === "Shop" ? "You" : undefined }, 
                senderModel: currentUserModel,
                content: message 
            }]);
            setMessage('');
            scrollToBottom();
            socket.emit('stop_typing', { senderId: currentUser, receiverId: otherUser }); // Stop typing after sending
        }
    };

    const getSenderName = (msg) => {
        if (!msg.sender) return "Unknown";
        if (msg.sender._id && msg.sender._id.toString() === currentUser.toString()) {
            return "You";
        } else if (msg.senderModel === "User" && msg.sender.username) {
            return msg.sender.username;
        } else if (msg.senderModel === "Shop" && msg.sender.shopName) {
            return msg.sender.shopName;
        }
        return "Unknown";
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <h3>Chat with {otherUserModel === "User" ? "User" : "Owner"}</h3>
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
