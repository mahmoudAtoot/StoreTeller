const express = require('express');
const cors = require('cors');
const app = express();
const dotenvResult = require('dotenv').config();
const path = require('path');

if (dotenvResult.error) {
    console.error("Error loading .env file:", dotenvResult.error);
} else {
    console.log(".env variables loaded:", dotenvResult.parsed);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
require('./routes/auth.rout')(app);

require('./routes/product.route')(app);

require('./config/mongoose.config');

const port = process.env.PORT || 8000;

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});

const messageController = require('./controllers/message.controller');
const User = require('./models/user.model'); // Import User model
const Shop = require('./models/shop.model'); // Import Shop model

const connectedUsers = {}; // Stores userId: { socketId, name, model }

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('user_online', async ({ userId, userModel }) => {
        let userName = "Unknown";
        try {
            if (userModel === "User") {
                const user = await User.findById(userId);
                if (user) userName = user.username; // Assuming 'username' field for User
            } else if (userModel === "Shop") {
                const shop = await Shop.findById(userId);
                if (shop) userName = shop.shopName; // Assuming 'shopName' field for Shop
            }
        } catch (error) {
            console.error("Error fetching user name:", error);
        }

        connectedUsers[userId] = { socketId: socket.id, name: userName, model: userModel };
        console.log(`${userModel} ${userName} (${userId}) is online. Socket ID: ${socket.id}`);
        io.emit('user_status_change', { userId, isOnline: true, name: userName, model: userModel });
    });

    socket.on('send_message', async (data) => {
        try {
            // Save message to database
            const savedMessage = await messageController.saveMessage(
                data.senderId, data.senderModel, data.receiverId, data.receiverModel, data.content
            );

            const receiverInfo = connectedUsers[data.receiverId];
            if (receiverInfo && receiverInfo.socketId) {
                io.to(receiverInfo.socketId).emit('receive_message', savedMessage);
            }
        } catch (error) {
            console.error('Error handling send_message:', error);
        }
    });

    socket.on('get_messages', async (data, callback) => {
        try {
            const messages = await messageController.getMessages(
                data.user1Id, data.user1Model, data.user2Id, data.user2Model
            );
            callback(messages);
        } catch (error) {
            console.error('Error handling get_messages:', error);
            callback([]); // Return empty array on error
        }
    });

    socket.on('typing', ({ senderId, receiverId }) => {
        const receiverInfo = connectedUsers[receiverId];
        if (receiverInfo && receiverInfo.socketId) {
            io.to(receiverInfo.socketId).emit('typing', senderId);
        }
    });

    socket.on('stop_typing', ({ senderId, receiverId }) => {
        const receiverInfo = connectedUsers[receiverId];
        if (receiverInfo && receiverInfo.socketId) {
            io.to(receiverInfo.socketId).emit('stop_typing', senderId);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
        // Find the user associated with this socket ID and mark them offline
        for (const userId in connectedUsers) {
            if (connectedUsers[userId] && connectedUsers[userId].socketId === socket.id) {
                const disconnectedUserId = userId;
                const disconnectedUserName = connectedUsers[userId].name;
                const disconnectedUserModel = connectedUsers[userId].model;
                delete connectedUsers[userId];
                io.emit('user_status_change', { userId: disconnectedUserId, isOnline: false, name: disconnectedUserName, model: disconnectedUserModel });
                console.log(`${disconnectedUserName} (${disconnectedUserId}) is now offline.`);
                break;
            }
        }
    });