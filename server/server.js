// Import necessary libraries
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const recordService = require("./recordServer.js");
const userService = require("./userServer.js");
const messageService = require("./messageServer.js");
const recordRouter = require("./routes/recordRouter.js");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const upload = multer();
const HTTP_PORT = process.env.PORT || 8080;
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET || 'XXXXXXXXXXXXXXXXXXXXXXQQQQQQQ^N^0zOP89NT04mPuaM!&G8cbNZOtH', // Use env variable
};

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  console.log('payload received', jwt_payload);
  if (jwt_payload) {
    next(null, {
      _id: jwt_payload._id,
      userName: jwt_payload.userName,
      role: jwt_payload.role,
    });
  } else {
    next(null, false);
  }
});

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload._id); // Replace with your user lookup
      if (!user) {
        return done(null, false); // No user found
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
app.use(passport.initialize());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://www.ctoserver.com", "http://localhost:8080"], // Allow only your front-end origin
    methods: ["POST", "GET"],
    credentials: true,
  })
);


app.use(express.json());

// Import Record model after connection
let Record;
let messages = [];

const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email provider
  auth: {
    user: "c.cto1981@gmail.com",
    pass: "nlyu kuyb pswn pmgd",
  },
});


app.get("/api/record", async (req, res) => {
  const userId = req.user ? req.user._id : null;

  let filter = { $or: [{ public: true }] };

  if (userId) {
    filter.$or.push({ userID: userId });
  }

  try {
    const records = await Record.find(filter);

    // Convert image buffer to Base64 for each record
    const recordsWithBase64Images = records.map((record) => {
      const recordObj = record.toObject();

      if (recordObj.image && recordObj.image.data) {
        recordObj.image = Buffer.from(recordObj.image.data).toString("base64");
      }

      return recordObj;
    });

    // Return the array directly
    res.json(recordsWithBase64Images);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ message: "Server error, unable to retrieve records" });
  }
});




// POST endpoint to create a new record
app.post(
  "/api/record",
  
  upload.single("image"),
  (req, res) => {
    // Extract fields from req.body
    // Make sure your frontend sends `public` in the body if you want to set it
    const { title, URL, location, grade, public } = req.body; 
    const file = req.file; // The uploaded file

    // Validate required fields
    if (!title || !URL || !location || !grade) {
      return res
        .status(422)
        .json({ message: "All fields (title, URL, location, grade) are required." });
    }

    // Extract userID from JWT payload
    // `req.user` is set by passport from the JWT payload
    const userID = req.user ? req.user._id : null;

    if (!userID) {
      return res.status(401).json({ message: "Unauthorized: User not found in token." });
    }

    // Create the new Record
    const newRecord = new Record({
      title,
      URL,
      location,
      grade,
      image: file ? file.buffer : null, // Save binary data if provided
      contentType: file ? file.mimetype : null, // Save file type if provided
      public: req.body.public === "true", // Convert to boolean if needed
      userID: userID
    });

    newRecord
      .save()
      .then(() => {
        res.json({ message: "Record successfully added with image!" , "token": token});
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error, unable to create record" });
      });
  }
);


app.get("/api/record/:id", (req, res) => {
  Record.findById(req.params.id)
    .then((record) => {
      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }

      const base64Image = Buffer.from(record.image.buffer).toString("base64");
      const imageData = `data:${record.contentType};base64,${base64Image}`;
  
      res.json({...record.toObject(),
        image: imageData, "token": token});
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
});


app.get("/api/record/:id/image", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record || !record.image) {
      return res.status(404).send("Image not found");
    }
    res.contentType(record.contentType);
    res.send(record.image);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Server error");
  }
});


app.post("/api/login", (req, res) => {
  userService.checkUser(req.body).then(user => {
    const payload = {
      _id: user._id,
      userName: user.userName,
      role: user.role,
    };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    console.log("login successful");
    res.json({ "message": "login successful", "token": token });
  }).catch(msg => {
    console.log("error");
    res.status(422).json({ "message": msg });
  });
});

app.post("/api/register", (req,res)=>{
  userService.registerUser(req.body).then(msg=>{
      res.json({message: msg});
  }).catch(msg=>{
      res.status(422).json({message: msg});
  });
});


app.get('/messages', (req, res) => {
  res.json(messages);
});

// Endpoint to post a new message
app.post("/api/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save the message or perform your database logic here
    console.log("Message saved to database:", { name, email, message });

    // Send email logic here
    await transporter.sendMail({
      from: email,
      to: "c.cto1981@gmail.com",
      subject: `New Message from ${name}`,
      text: `You have received a new message:\n\nMessage: ${message}\nEmail: ${email}`
    });

    // Send a JSON response
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);

    // Send an error response as JSON
    res.status(500).json({ success: false, error: "Failed to send message. Please try again." });
  }
});



app.use((req, res) => {
  res.status(404).end();
});


// Ensure that database connections complete before starting the server
Promise.all([userService.connect(), recordService.connect(), messageService.connect()])
  .then(() => {
    // 1. Assign the Record model
    Record = recordService.Record();

    // 2. Now mount the router, so it has a valid Record model
    app.use("/api/record", recordRouter);

    // 3. Start the server
    app.listen(HTTP_PORT, () => {
      console.log("API listening on: " + HTTP_PORT);
    });
  })
  .catch(err => {
    console.error("Error connecting to services:", err);
  });