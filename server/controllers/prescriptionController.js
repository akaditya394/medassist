const Prescription = require("../models/Prescriptions");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

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
    res.status(error.statusCode).json({
      type: "error",
      message: error.message,
    });
  }
};

exports.addPrescriptions = async (req, res) => {
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

        await User.findByIdAndUpdate(res.locals.id, {
          $push: { prescriptions: prescription },
        });

        return res.status(200).json({
          type: "success",
          message: "Prescription uploaded successfully",
        });
      })
      .catch((err) => {
        res.status(err.statusCode).json({
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
