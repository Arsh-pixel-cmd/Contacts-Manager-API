import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js"; // this for applying CRUD operation on contact collection

// create contact controller for contacts crud operation

// to give label for api we will give
// @desc: Get all contact
// @routes GET /api/contacts
// @access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id : req.user.id}); // this will give all the contacts of the user who is logged in
  res.status(200).json(contacts);
});

// @desc: Create new contact
// @routes POST /api/contacts
// @access private

const createContact = asyncHandler(async (req, res) => {
  console.log(`The request body is ${req.body}`);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please Enter All fields !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id, // this will give the id of the user who is logged in
  });

  res.status(201).json(contact);
});

// @desc: Get contact
// @routes GET /api/contacts/:id
// @access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact NOt Found");
  }
  res.status(202).json(contact);
});

// @desc: update new contact
// @routes POST /api/contacts/:id
// @access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact NOt Found");
  }

  if(contact.user_id.toString() !== req.user.id ){
    res.status(403);
    throw new Error("You are not authorized to update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

// @desc: delete contact
// @routes delete /api/contacts/:id
// @access private

const deleteContact = asyncHandler(async (req, res) => {
  try {
    // Check if the user is authorized to delete the contact
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }

    if (contact.user_id.toString() !== req.user.id) {
      res.status(403).json({ message: "You are not authorized to delete this contact" });
      return;
    }

    // Delete the contact
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting contact: " + error.message });
  }
});

const contactController = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

export default contactController;
