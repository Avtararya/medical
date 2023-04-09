import express from "express";
import axios from "axios";
import request from "request";
import { accessToken } from "../config.js";

const router = express.Router();

// const accessToken = await getAccessToken(clientId, clientSecret);

const BaseURI = "https://healthidsbx.abdm.gov.in";
const BasePath = "api";

// Generate Mobile OTP to start registration

router.post("/generateOtp", async (req, res) => {
  try {
    const { mobile } = req.body;
    const options = {
      url: `${BaseURI}/${BasePath}/v1/registration/mobile/generateOtp`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: { mobile },
    };
    const response = await axios.post(options.url, options.data, {
      headers: options.headers,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/resendOtp", async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    const response = await axios.post(
      `${BaseURI}/${BasePath}/api/v1/registration/mobile/resendOtp`,
      {
        mobileNumber,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/verifyOtp", async (req, res) => {
  try {
    const { txnId, otp } = req.body;

    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/mobile/verifyOtp`,
      {
        otp,
        txnId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/aadhaar/verifyOTP", async (req, res) => {
  try {
    const { aadhaarNumber, otp } = req.body;

    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/mobile/verifyOtp`,
      {
        aadhaarNumber,
        otp,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/createHealthId", async (req, res) => {
  try {
    const { mobileNumber, token } = req.body;

    const response = await axios.post(`${BaseURI}/createHealthId`, {
      mobileNumber,
      token,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

export default router;
