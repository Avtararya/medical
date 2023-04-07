import express from "express";
import bodyParser from "body-parser";
// import axios from "axios";
import cors from "cors";

import dotenv from "dotenv";
import Auth from "./routes/registrationRouter.js";
dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// const searchResults = await searchPatients(accessToken, searchQuery);
// console.log(accessToken);

//Update bridge URL:

// const bridgeUrl = "https://your-hip-or-hiu-service-url";

// const updateBridgeUrl = async (accessToken) => {
//   try {
//     const response = await axios.patch(
//       "https://dev.ndhm.gov.in/devservice/v1/bridges",
//       {
//         url: bridgeUrl,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//           Accept: "*/*",
//         },
//       }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Call the function with the access token
// updateBridgeUrl(accessToken);

//Add HIP service to the bridge:

// const addHipService = async (accessToken) => {
//   try {
//     const response = await axios.put(
//       "https://dev.ndhm.gov.in/devservice/v1/bridges/services",
//       {
//         id: "unique-hip-id",
//         name: "Your-facility-name",
//         type: "HIP",
//         active: true,
//         alias: ["EG"],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Call the function with the access token
// addHipService(accessToken);

//Add HIU service to the bridge:

// const addHiuService = async (accessToken) => {
//   try {
//     const response = await axios.put(
//       "https://dev.ndhm.gov.in/devservice/v1/bridges/services",
//       {
//         id: "unique-hiu-id",
//         name: "Your-facility-name",
//         type: "HIU",
//         active: true,
//         alias: ["EG"],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Call the function with the access token
// addHiuService(accessToken);

app.use("/api", Auth);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
