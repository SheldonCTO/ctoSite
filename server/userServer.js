const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let mongoDBConnectionString = process.env.MONGO_URI || "mongodb+srv://XXXXXXXXXXXXXX@record.s4vcc.mongodb.net/yourDatabaseName";

let userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: String,
  email:String, // Hashed password will be stored here
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Add roles for user management
});

// Before saving a new user, hash the password


const User = mongoose.model('users', userSchema);

module.exports.connect = function () {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoDBConnectionString)
      .then(() => {
        console.log('Database connected successfully.');
        resolve(User); // Return the model for later use
      })
      .catch((err) => {
        console.error('Database connection error:', err);
        reject(err);
      });
  });
};


userSchema.pre('save', function(next) {
  console.log(">>> pre-save hook running for user:", this.userName);
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      this.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
});

module.exports.registerUser =  function (userData) {
  return new Promise(function (resolve, reject) {

      if (userData.password != userData.password2) {
          reject("Passwords do not match");
      } else {

          bcrypt.hash(userData.password, 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
              
              userData.password = hash;

              let newUser = new User(userData);

              newUser.save().then(() => {
                  resolve("User " + userData.userName + " successfully registered");
              }).catch(err => {
                  if (err.code == 11000) {
                      reject("User Name already taken");
                  } else {
                      reject("There was an error creating the user: " + err);
                  }
              });
          }).catch(err=>reject(err));
      }
  });      
};

// Check if the user exists and the password matches
module.exports.checkUser = function (userData) {
  return new Promise(function (resolve, reject) {
    User.findOne({ userName: userData.userName })
      .exec()
      .then((user) => {
        if (!user) {
          reject("Unable to find user " + userData.userName);
        } else {
          // Compare the plaintext password with the hashed password
          bcrypt.compare(userData.password, user.password, (err, isMatch) => {
            if (err) {
              reject("Error comparing passwords.");
            }
            if (isMatch) {
              resolve(user);
            } else {
              console.log(userData.password)
              console.log(user.password)
              reject("Incorrect password for user " + userData.userName);
            }
          });
        }
      })
      .catch((err) => {
        reject("Unable to find user " + userData.userName);
      });
  });
};
