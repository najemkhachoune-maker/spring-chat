import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './ChatRoom.css';

const ChatRoom = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Connect to WebSocket
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            console.log('Connected to WebSocket');
            setConnected(true);

            // Subscribe to public messages
            client.subscribe('/topic/public', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, receivedMessage]);
            });

            // Subscribe to private messages
            client.subscribe(`/user/${user.username}/queue/messages`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, receivedMessage]);
            });

            // Send join notification
            client.publish({
                destination: '/app/chat.addUser',
                body: JSON.stringify({
                    sender: user.username,
                    type: 'JOIN',
                }),
            });
        };

        client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
            setConnected(false);
        };

        client.activate();
        setStompClient(client);

        // Fetch active users
        fetchActiveUsers();

        return () => {
            if (client) {
                client.publish({
                    destination: '/app/chat.removeUser',
                    body: JSON.stringify({
                        sender: user.username,
                        type: 'LEAVE',
                    }),
                });
                client.deactivate();
            }
        };
    }, [user, navigate]);

    const fetchActiveUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users/online');
            if (response.ok) {
                const users = await response.json();
                setActiveUsers(users.filter(u => u.username !== user.username));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() && stompClient && connected) {
            const chatMessage = {
                sender: user.username,
                content: inputMessage,
                type: 'CHAT',
                timestamp: new Date().toISOString(),
            };

            if (selectedUser) {
                chatMessage.recipient = selectedUser.username;
                stompClient.publish({
                    destination: '/app/chat.sendMessage',
                    body: JSON.stringify(chatMessage),
                });
            } else {
                stompClient.publish({
                    destination: '/app/chat.sendMessage',
                    body: JSON.stringify(chatMessage),
                });
            }

            setInputMessage('');
        }
    };

    const handleLogout = () => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/chat.removeUser',
                body: JSON.stringify({
                    sender: user.username,
                    type: 'LEAVE',
                }),
            });
            stompClient.deactivate();
        }
        logout();
        navigate('/login');
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const filteredUsers = activeUsers.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="chatroom-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="user-profile">
                        <div className="avatar">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-info">
                            <h3>{user?.username}</h3>
                            <div className="status-indicator">
                                <span className={`status-dot ${connected ? 'online' : 'offline'}`}></span>
                                <span className="status-text">{connected ? 'Online' : 'Offline'}</span>
                            </div>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout} title="Logout">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="chat-tabs">
                    <button
                        className={`tab-btn ${!selectedUser ? 'active' : ''}`}
                        onClick={() => setSelectedUser(null)}
                    >
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                        </svg>
                        Public Chat
                    </button>
                </div>

                <div className="search-container">
                    <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="users-list">
                    <h4 className="users-title">Active Users ({filteredUsers.length})</h4>
                    {filteredUsers.map((u) => (
                        <div
                            key={u.id}
                            className={`user-item ${selectedUser?.id === u.id ? 'selected' : ''}`}
                            onClick={() => setSelectedUser(u)}
                        >
                            <div className="user-avatar">
                                {u.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-details">
                                <span className="user-name">{u.username}</span>
                                <span className="user-status">Online</span>
                            </div>
                        </div>
                    ))}
                    {filteredUsers.length === 0 && (
                        <div className="no-users">
                            <p>No users found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="chat-main">
                <div className="chat-header">
                    <div className="chat-info">
                        {selectedUser ? (
                            <>
                                <div className="chat-avatar">
                                    {selectedUser.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2>{selectedUser.username}</h2>
                                    <p className="chat-subtitle">Private conversation</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="chat-avatar public">
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2>Public Chat</h2>
                                    <p className="chat-subtitle">Everyone can see messages here</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="connection-status">
                        <span className={`status-badge ${connected ? 'connected' : 'disconnected'}`}>
                            {connected ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>
                </div>

                <div className="messages-container">
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <h3>No messages yet</h3>
                            <p>Start the conversation by sending a message</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => {
                            const isOwnMessage = msg.sender === user?.username;
                            const isSystemMessage = msg.type === 'JOIN' || msg.type === 'LEAVE';

                            if (isSystemMessage) {
                                return (
                                    <div key={index} className="system-message">
                                        <span>{msg.content || `${msg.sender} ${msg.type === 'JOIN' ? 'joined' : 'left'} the chat`}</span>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={index}
                                    className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}
                                >
                                    {!isOwnMessage && (
                                        <div className="message-avatar">
                                            {msg.sender.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="message-content">
                                        {!isOwnMessage && (
                                            <span className="message-sender">{msg.sender}</span>
                                        )}
                                        <div className="message-bubble">
                                            <p>{msg.content}</p>
                                            <span className="message-time">
                                                {msg.timestamp ? formatTime(msg.timestamp) : 'Now'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={sendMessage} className="message-input-container">
                    <div className="input-wrapper-chat">
                        <input
                            type="text"
                            placeholder={selectedUser ? `Message ${selectedUser.username}...` : 'Type a message...'}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="message-input"
                            disabled={!connected}
                        />
                        <button
                            type="submit"
                            className="send-button"
                            disabled={!inputMessage.trim() || !connected}
                        >
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatRoom;
