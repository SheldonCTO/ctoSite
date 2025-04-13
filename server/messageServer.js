const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection string
let mongoDBConnectionString =
  process.env.MONGO_URI || 
  "mongodb+srv://XXXXXXXXXX@record.s4vcc.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";

// Define the Message schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

// Message model
let Message;

// Function to connect to MongoDB
const connect = () => {
  return new Promise((resolve, reject) => {
    const db = mongoose.createConnection(mongoDBConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db.on("error", (err) => reject(err));

    db.once("open", () => {
      console.log("Connected to MongoDB for messages!");
      Message = db.model("Message", messageSchema);
      resolve();
    });
  });
};

// Function to save a message
const saveMessage = async (messageData) => {
  const newMessage = new Message(messageData);
  return await newMessage.save();
};

// Export the functions
module.exports = {
  connect,
  saveMessage,
};
