import mongoose from "mongoose";

// Define a MongoDB Connection Url
const MongoUrl = `mongodb://127.0.0.1:27017/contact`;

// set up a MongoDB Connection
mongoose.connect(MongoUrl);

// Define a deault Connection
const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Successfully Connected to the MongoDB`);
});

db.on("error", () => {
  console.log(`MongoDB Connection error`);
});

db.on("disconnected", () => {
  console.log(`MongoDb Server disconnected`);
});

// Export the deault connection object

export default db;
