import express from "express";
import axios from "axios";
import request from "request";
import pkg from "pg"; // Import your database connection pool
const { pool } = pkg;

import { getAccessToken } from "../config.js";
let accessToken = await getAccessToken();

const router = express.Router();

const BaseURI = "https://healthidsbx.abdm.gov.in";
const BasePath = "api";

// Generate Mobile OTP to start registration

let tokenRow = null;

// try {
//   const query = {
//     text: "SELECT * FROM tokens WHERE name = $1",
//     values: ["accessToken"],
//   };
//   const { rows } = await pool.query(query);
//   if (rows.length > 0) {
//     tokenRow = rows[0];
//     accessToken = tokenRow.value;
//   }
// } catch (error) {
//   console.error(error);
// }

// if (!tokenRow) {
//   const query = {
//     text: "INSERT INTO tokens (name, value) VALUES ($1, $2)",
//     values: ["accessToken", accessToken],
//   };
//   try {
//     await pool.query(query);
//   } catch (error) {
//     console.error(error);
//   }
// }

router.post("/generateOtp", async (req, res) => {
  const { mobile } = req.body;

  try {
    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/mobile/generateOtp`,
      {
        mobile,
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

// // Verify Aadhaar OTP Only
// router.post("/aadhaar/verifyOTP", async (req, res) => {
//   try {
//     const { aadhaarNumber, otp } = req.body;

//     const response = await axios.post(
//       `${ BaseURI }/${ BasePath }/v1/registration/mobile/verifyOtp`,
//       {
//         aadhaarNumber,
//         otp,
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// // Create Health ID with verified mobile token
router.post("/createHealthId", async (req, res) => {
  try {
    const data = req.body;
    const response = await axios.post(
      `${BaseURI}/${BasePath}/v1/registration/mobile/createHealthId`,
      {
        ...data,
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

router.get("/districtCode", async (req, res) => {
  try {
    const response = await axios.get(
      `${BaseURI}/${BasePath}/v1/ha/lgd/districts?stateCode=27`, // replace with your actual endpoint
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

router.get("/stateCode", async (req, res) => {
  try {
    const response = await axios.get(
      `${BaseURI}/${BasePath}/v2/ha/lgd/states`, // replace with your actual endpoint
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
