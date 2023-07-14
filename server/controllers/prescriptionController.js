const Prescription = require("../models/Prescriptions");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const vision = require("@google-cloud/vision");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

const client = new vision.ImageAnnotatorClient({
  keyFileName: "../APIKey.json",
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ user: res.locals.id });
    if (!prescriptions) {
      throw new Error("There are no prescriptions...Start by uploading one");
    }
    return res.status(200).json({
      type: "success",
      prescriptions,
    });
  } catch (error) {
    res.json({
      type: "error",
      message: error.message,
    });
  }
};

exports.addPrescriptions = async (req, res, next) => {
  const { file } = req.files;
  const { name } = req.body;

  try {
    cloudinary.uploader
      .upload(file.tempFilePath, {
        public_id: `${Date.now()}`,
        folder: "prescriptions",
        filename_override: name,
      })
      .then(async (result) => {
        const prescription = new Prescription({
          name,
          image: result.secure_url,
          user: res.locals.id,
        });
        await prescription.save();

        if (!prescription) {
          cloudinary.uploader.destroy(result.public_id).then((data) => {
            console.log(data);
          });
          return res.status(400).json({
            type: "error",
            message: `Failed to add prescription`,
          });
        }

        const user = await User.findByIdAndUpdate(
          res.locals.id,
          {
            $push: { prescriptions: prescription },
          },
          { new: true }
        );

        if (!user) {
          return res.json({
            type: "error",
            message:
              "There was an error updating the prescription to your profile",
          });
        }
        res.locals.presc = prescription;
        // res.status(200).json({
        //   type: "success",
        //   prescription,
        //   message: "Prescription uploaded successfully",
        // });

        next();
      })
      .catch((err) => {
        res.status(err.status).json({
          type: "error",
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      type: "error",
      message: error.message,
    });
  }
};

exports.addDrugs = async (req, res) => {
  let detections;
  // console.log(res.locals);
  try {
    const [result] = await client.textDetection(res.locals.presc.image);
    detections = result.textAnnotations;
    console.log("Text:");
    // detections.forEach((text) => console.log(text.description));
    detections = detections.map((text) => text.description);
    let ans = [
      "STALOPAM",
      "DOLO",
      "ASPIRIN",
      "Zerodol",
      "Humira",
      "Cetirizine",
      "Calpol",
      "IBUPROFEN",
      "Mucinex",
      "Delsym",
      "Abreva",
      "Carmex",
    ];
    let medi = [];
    detections.forEach(async (i) => {
      // console.log(i);
      if (ans.includes(i)) {
        medi.push(i);
      }
    });
    // console.log(medi);
    const prescription = await Prescription.findByIdAndUpdate(
      res.locals.presc._id,
      {
        $set: { drugs: medi },
      },
      { new: true }
    );
    // // console.log(i, " mine");
    return res.status(200).json({
      type: "success",
      message: "Prescription uploaded successfully",
      prescription,
    });
  } catch (error) {
    res.json({
      type: "error",
      message: error.message,
    });
  }
};

exports.getSideEffects = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(req.body, "id");
    const presc = await Prescription.findById(id);
    // console.log(presc);
    if (presc.sideEffects.length > 0) {
      return res.status(200).json({
        type: "success",
        prescriptions: presc,
      });
    }
    let requests = [];
    let sides = [];

    requests = presc.drugs.map((drug) => {
      console.log(drug);
      return `https://medassist-386411.el.r.appspot.com/predict?med=${drug}`;
    });

    Promise.all(
      requests.map((request) => {
        return axios.get(request);
      })
    ).then(async (data) => {
      sides = data.map((sideEffect) => sideEffect.data.reaction.join(", "));
      console.log(data, sides, "Yo");
      const newPresc = await Prescription.findByIdAndUpdate(
        id,
        {
          $set: {
            sideEffects: sides,
          },
        },
        { new: true }
      );
      console.log(newPresc);
      return res.status(200).json({
        type: "success",
        prescriptions: newPresc,
      });
    });
  } catch (error) {
    res.json({
      type: "error",
      message: error.message,
    });
  }
};

exports.addAlternativeAndSuggestion = async (req, res) => {
  const { id } = req.query;
  const { suggestions, alternatives } = req.body;

  try {
    const newPresc = await Prescription.findByIdAndUpdate(
      id,
      {
        $set: {
          suggestions,
          alternatives,
          isVerified: true,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      type: "success",
      newPresc,
    });
  } catch (error) {
    res.json({
      type: "error",
      message: error.message,
    });
  }
};

// exports.verify = async (req, res) => {
//   // const id =
//   try {
//     const prescription = await Prescription.findByIdAndUpdate(
//       id,
//       { isVerified: true },
//       { new: true }
//     );
//     res.status(200).json({
//       type: "success",
//       message: "Prescription Verified",
//     });
//   } catch (error) {
//     res.status(404).json({
//       type: "error",
//       message: error.message,
//     });
//   }
// };
