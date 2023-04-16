import express from "express";
import axios from "axios";
import { getAccessToken } from "../config.js";
let accessToken = await getAccessToken();

const router = express.Router();

const BaseURI = "https://healthidsbx.abdm.gov.in";
const BasePath = "api";

// Generate Aadhaar OTP on registered mobile number
router.post("/aadhaar/generateOtp", async (req, res) => {
  const { aadhaar } = req.body;
  try {
    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/aadhaar/generateOtp`,
      {
        aadhaar,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Aadhaar OTP on registered mobile number to create Health ID
router.post("/aadhaar/verifyOtp", async (req, res) => {
  const { txnId, otp } = req.body;
  try {
    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/aadhaar/createHealthIdWithAadhaarOtp`,
      {
        txnId,
        otp,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Aadhaar using biometrics
router.post("/aadhaar/verifyBio", async (req, res) => {
  const { aadhaarNumber, bioData } = req.body;
  try {
    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/aadhaar/verifyBio`,
      {
        aadhaarNumber,
        bioData,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Health ID using pre-verified Aadhaar and Mobile
router.post("/aadhaar/createHealthId", async (req, res) => {
  const { aadhaarNumber, mobileNumber } = req.body;
  try {
    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/aadhaar/createHealthIdWithPreVerified`,
      {
        aadhaarNumber,
        mobileNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resend Aadhaar OTP on registered mobile number to create Health ID
router.post("/aadhaar/resendOtp", async (req, res) => {
  const { aadhaarNumber, mobileNumber } = req.body;
  try {
    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/aadhaar/resendAadhaarOtp`,
      {
        aadhaarNumber,
        mobileNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate Mobile OTP for verification
router.post("/aadhaar/generateMobileOtp", async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/aadhaar/generateMobileOTP`,
      {
        mobileNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Generate Mobile OTP for verification
router.post("/aadhaar/generateMobileOtp", async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/aadhaar/generateMobileOTP`,
      {
        mobileNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Mobile OTP in an existing transaction
router.post("/aadhaar/verifyMobileOtp", async (req, res) => {
  const { txnId, otp } = req.body;
  try {
    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/aadhaar/verifyMobileOTP`,
      {
        txnId,
        otp,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
