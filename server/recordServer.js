const mongoose = require("mongoose");

let mongoDBConnectionString =
  process.env.MONGO_URI ||
  "mongodb+srv://XXXXXXXXXXX@record.s4vcc.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";

let Schema = mongoose.Schema;

let recordSchema = new mongoose.Schema({
  URL: String,
  title: String,
  location: String,
  grade: String,
  image: Buffer,
  contentType: String,
  public: Boolean,
  userID: mongoose.Schema.Types.ObjectId
});

let Record; // will be assigned after connecting

module.exports.connect = function () {
  return new Promise((resolve, reject) => {
    const db = mongoose.createConnection(mongoDBConnectionString);

    db.on("error", (err) => reject(err));

    db.once("open", () => {
      Record = db.model("records", recordSchema);
      resolve();
    });
  });
};

module.exports.Record = () => {
  if (!Record) throw new Error("Database connection is not established yet.");
  return Record;
};

module.exports.updateRecordImage = async function (recordId, imagePath, mimeType) {
  try {
    if (!Record) throw new Error("Database connection is not established yet.");

    const imageBuffer = fs.readFileSync(imagePath);

    const result = await Record.updateOne(
      { _id: recordId },
      {
        $set: {
          image: imageBuffer,
          contentType: mimeType
        }
      }
    );
    return result;
  } catch (err) {
    throw new Error("Error updating record image: " + err.message);
  }
};

// Example usage (replace 'recordIdHere' and 'exampleBinaryData')
const exampleImageBuffer = Buffer.from("exampleBinaryData"); // Replace with actual binary data
// addImageToRecord("recordIdHere", exampleImageBuffer, "image/png");

// Create a new record
module.exports.newRecord = function (recordData) {
  return new Promise((resolve, reject) => {
    if (!Record) return reject("Database connection is not established yet.");

    // Convert the string from the front end to a real boolean
    if (typeof recordData.public === "string") {
      recordData.public = recordData.public === "true";
    }

    Record.findOne({ title: recordData.title })
      .exec()
      .then((record) => {
        if (!record) {
          let newRecord = new Record(recordData);
          newRecord
            .save()
            .then(() =>
              resolve(`Record ${recordData.title} successfully added`)
            )
            .catch((err) =>
              reject(`Error creating record: ${err.message}`)
            );
        } else {
          reject("Record already exists");
        }
      })
      .catch(() => reject("Unable to create record"));
  });
};

// Check if a record exists
module.exports.checkRecord = function (recordData) {
  return new Promise((resolve, reject) => {
    if (!Record) return reject("Database connection is not established yet.");
    Record.findOne({ URL: recordData.URL })
      .exec()
      .then((record) => {
        if (record) {
          resolve(record);
        } else {
          reject(`Record ${recordData.URL} not found`);
        }
      })
      .catch(() => reject(`Unable to find record ${recordData.URL}`));
  });
};
