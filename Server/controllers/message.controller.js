const Message = require('../models/message.model');
const User = require('../models/user.model');
const Shop = require('../models/shop.model');

module.exports = {
    saveMessage: async (senderId, senderModel, receiverId, receiverModel, content) => {
        try {
            const newMessage = new Message({
                sender: senderId,
                senderModel: senderModel,
                receiver: receiverId,
                receiverModel: receiverModel,
                content: content
            });
            await newMessage.save();
            return newMessage;
        } catch (error) {
            console.error('Error saving message:', error);
            throw error;
        }
    },

    getMessages: async (user1Id, user1Model, user2Id, user2Model) => {
        try {
            const messages = await Message.find({
                $or: [
                    { sender: user1Id, senderModel: user1Model, receiver: user2Id, receiverModel: user2Model },
                    { sender: user2Id, senderModel: user2Model, receiver: user1Id, receiverModel: user1Model }
                ]
            })
            .populate({
                path: 'sender',
                select: 'firstName lastName name', // Select firstName, lastName for User, and name for Shop
                // Conditional population based on senderModel
                transform: (doc) => {
                    if (doc.firstName && doc.lastName) {
                        return { _id: doc._id, firstName: doc.firstName, lastName: doc.lastName };
                    } else if (doc.name) {
                        return { _id: doc._id, name: doc.name };
                    }
                    return doc; // Fallback
                }
            })
            .populate({
                path: 'receiver',
                select: 'firstName lastName name', // Select firstName, lastName for User, and name for Shop
                // Conditional population based on receiverModel
                transform: (doc) => {
                    if (doc.firstName && doc.lastName) {
                        return { _id: doc._id, firstName: doc.firstName, lastName: doc.lastName };
                    } else if (doc.name) {
                        return { _id: doc._id, name: doc.name };
                    }
                    return doc; // Fallback
                }
            })
            .sort({ createdAt: 1 });
            return messages;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }
};
