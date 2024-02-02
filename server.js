import express from "express";
import {} from "./db.js";
import Contact from "./Models/Contact.js";
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Contact backend server");
});

// Post the new Contact
app.post("/api/v1/contact/new", async (req, res) => {
  try {
    const data = req.body;
    const NewContact = await new Contact(data);

    NewContact.save();

    res.status(200).json({
      success: true,
      data: NewContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get all the Contacts
app.get("/api/v1/contact/all", async (req, res) => {
  try {
    const contactDetails = await Contact.find();
    if (!contactDetails.length) {
      return res.status(404).json({
        success: false,
        message: "Contact Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: contactDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get Contact by the objecy _id
app.get("/api/v1/contact/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const contactDetails = await Contact.findById(id);
    if (!contactDetails) {
      return res.status(404).json({
        success: false,
        message: "Contact Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: contactDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get searched Contact
app.get("/api/v1/contact/search/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const contactDetails = await Contact.find();
    const searchContacts = contactDetails.filter((contact) => {
      return contact.name.includes(name);
    });
    if (!searchContacts.length) {
      return res.status(404).json({
        success: false,
        message: "Contact Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: searchContacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT update the contact details
app.put("/api/v1/contact/:id/update", async (req, res) => {
  try {
    const id = req.params.id;
    const updateDetails = req.body;
    const contactDetails = await Contact.findByIdAndUpdate(id, updateDetails);

    if (!contactDetails) {
      return res.status(404).json({
        success: false,
        message: `Contact Not Found`,
      });
    }

    res.status(200).json({
      success: true,
      data: contactDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE Contact by object _id
app.delete("/api/v1/contact/:id/delete", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Contact.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "Contact Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
