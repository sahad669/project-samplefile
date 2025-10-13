import contactModel from "../models/contactModel.js";
import { sendEmail } from "../sendEmail.js";


export const createMessage = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Fill all the fields" });
  }
  try {
    const newMessage = await contactModel.create({ name, email, message });
    await sendEmail(name, email, message);
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
     
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
};

// Get all messages 

export const getAllMessages = async (req, res) => {
  try {
    const messages = await contactModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};


