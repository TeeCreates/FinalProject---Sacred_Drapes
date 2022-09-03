"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// IMAGES
const getAllImages = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FinalProject");
    const result = await db.collection("Images").find().toArray();
    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, data: "not found" });
    }
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getSpecificImage = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FinalProject");
    const { imageId } = req.params;

    const specificImage = await db
      .collection("Images")
      .findOne({ _Id: imageId });
    console.log("specific image", specificImage);
    res.status(200).json({ status: 200, data: specificImage });

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const deleteSpecificImage = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FinalProject");
    const { imageId } = req.params;
    const deletedImage = await db
      .collection("Images")
      .deleteOne({ _Id: imageId });
    console.log("specific image", deletedImage);
    res.status(200).json({ status: 200, data: deletedImage });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const addImage = async (req, res) => {
  try {
    //connect to mongo
    const client = new MongoClient(MONGO_URI, options);
    console.log(MONGO_URI);
    await client.connect();
    const db = await client.db("FinalProject");

    const newImage = {
      _id: uuidv4(),
      description: req.body.description,
      image: req.body.image,
    };

    console.log(newImage);
    const newImageAdded = await db.collection("Images").insertOne(newImage);

    console.log("new image added", newImageAdded);
    res.status(200).json({ status: 200, data: newImageAdded });

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

//BOOKINGS

const getAllBookings = async (req, res) => {
  try {
    //connect to mongo
    const client = new MongoClient(MONGO_URI, options);
    console.log(MONGO_URI);
    await client.connect();
    const db = await client.db("FinalProject");

    const getBookings = await db.collection("Bookings").find().toArray();

    res.status(200).json({ status: 200, data: getBookings });
  } catch {
    res
      .status(400)
      .json({ status: 400, message: "could not retrieve bookings" });
  }
};

const getSpecificBooking = async (req, res) => {
  try {
    //connect to mongo
    const client = new MongoClient(MONGO_URI, options);
    console.log(MONGO_URI);
    await client.connect();
    const db = await client.db("FinalProject");

    const { bookingId } = req.params;

    const getBoooking = await db
      .collection("Bookings")
      .findOne({ _id: bookingId });

    res.status(200).json({ status: 200, data: getBoooking });
  } catch {
    res
      .status(400)
      .json({ status: 400, message: "could not retrieve booking" });
  }
};

const deleteSpecificBooking = async (req, res) => {
  try {
    //connect to mongo
    const client = new MongoClient(MONGO_URI, options);
    console.log(MONGO_URI);
    await client.connect();
    const db = await client.db("FinalProject");

    const { bookingId } = req.params;
    const deletedBooking = await db
      .collection("Bookings")
      .deleteOne({ _id: bookingId });

    res.status(200).json({ status: 200, data: deletedBooking });
  } catch {
    res
      .status(400)
      .json({ status: 400, data: "booking not deleted, something went wrong" });
  }
};

const addBooking = async (req, res) => {
  try {
    console.log("req.body", req.body);
    //connect to mongo
    const client = new MongoClient(MONGO_URI, options);
    console.log(MONGO_URI);
    await client.connect();
    const db = await client.db("FinalProject");

    //grab object
    const services = req.body.services;

    const newBooking = {
      _id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      month: req.body.month,
      year: req.body.year,
      day: req.body.day,
      email: req.body.email,
      services: services,
    };

    // console.log("new boooking", newBooking);

    // add new booking into
    const newBookingAdded = await db
      .collection("Bookings")
      .insertOne(newBooking);

    console.log("added to mongo", newBooking);

    if (newBookingAdded) {
      res.status(200).json({ status: 200, data: newBookingAdded });
      client.close();
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    //connect to mongo
    const client = new MongoClient(MONGO_URI, options);
    console.log(MONGO_URI);
    await client.connect();
    const db = await client.db("FinalProject");

    const { bookingId } = req.params;

    const newBookingObject = req.body;

    console.log(newBookingObject);
    // console.log("did we get the object", newBookingObject);

    const findBooking = await db
      .collection("Bookings")
      .findOneAndReplace({ _id: bookingId }, newBookingObject);

    // console.log("found booking", findBooking);

    res.status(200).json({ status: 200, data: findBooking });
  } catch {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  getAllImages,
  getSpecificImage,
  deleteSpecificImage,
  addImage,
  addBooking,
  updateBooking,
  deleteSpecificBooking,
  getSpecificBooking,
  getAllBookings,
};
