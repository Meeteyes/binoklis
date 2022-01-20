import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import testData from "./cities.json";

///---- MONGO DB ---
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/binoklis";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// ---- Schema for the Order ------
const ShowSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    trim: true,
  },
  coordinates: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
  },
  contactPerson: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    minlenght: "8",
    maxlength: "8",
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
});

// ---- Schema for the Cities -----
const CitySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
    unique: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const Show = new mongoose.model("Show", ShowSchema);
const City = new mongoose.model("City", CitySchema);

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());

app.use(express.json());

app.get("/cities", async (req, res) => {
  try {
    const cityList = await City.find({});
    res.status(200).json({ response: cityList, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/booking", async (req, res) => {
  console.log("HAPPENING");
  const { city, address, coordinates, date, contactPerson, phone, email } =
    req.body;
  try {
    const show = await new Show({
      city,
      address,
      coordinates,
      date,
      contactPerson,
      phone,
      email,
    }).save();
    res.status(201).json({ response: show, success: true });
  } catch (error) {
    console.log("This is executed");
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
