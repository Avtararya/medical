import express from "express";
import axios from "axios";
import request from "request";

const router = express.Router();

const baseUrl = "https://healthidsbx.ndhm.gov.in/api";

// Generate Mobile OTP to start registration
router.post("/generateOtp", async (req, res) => {
  try {
    request
      .post(
        "https://healthidsbx.ndhm.gov.in/api/v1/registration/mobile/generateOtp",
        JSON.stringify({
          mobile: "+91-7387791658",
        })
      )
      .on("response", function (response) {
        res.json(response);
        console.log(response.statusCode); // 200
        console.log(response.headers["content-type"]); // 'image/png'
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

// router.post("/generateOtp", async (req, res) => {
//   try {
//     const { mobileNumber } = req.body;

//     const response = await axios.post(`${baseUrl}/generateOtp`, {
//       mobileNumber,
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// Resend Mobile OTP for Health ID registration
// router.post("/resendOtp", async (req, res) => {
//   try {
//     const { mobileNumber } = req.body;

//     const response = await axios.post(`${baseUrl}/resendOtp`, {
//       mobileNumber,
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// // Verify Mobile OTP sent as part of registration transaction
// router.post("/verifyOtp", async (req, res) => {
//   try {
//     const { mobileNumber, otp } = req.body;

//     const response = await axios.post(`${baseUrl}/verifyOtp`, {
//       mobileNumber,
//       otp,
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// // Verify Aadhaar OTP Only
// router.post("/aadhaar/verifyOTP", async (req, res) => {
//   try {
//     const { aadhaarNumber, otp } = req.body;

//     const response = await axios.post(`${baseUrl}/aadhaar/verifyOTP`, {
//       aadhaarNumber,
//       otp,
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// // Create Health ID with verified mobile token
// router.post("/createHealthId", async (req, res) => {
//   try {
//     const { mobileNumber, token } = req.body;

//     const response = await axios.post(`${baseUrl}/createHealthId`, {
//       mobileNumber,
//       token,
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

export default router;
