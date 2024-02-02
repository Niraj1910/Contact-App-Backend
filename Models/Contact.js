import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
