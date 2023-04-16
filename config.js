import axios from "axios";

const clientId = "SBX_002395";
const clientSecret = "f71714da-bfb6-4744-bc25-c839df86a29d";

// Function to get access token
export const getAccessToken = async () => {
  const response = await axios.post(
    "https://dev.abdm.gov.in/gateway/v0.5/sessions",
    {
      clientId: clientId,
      clientSecret: clientSecret,
    }
  );
  return response.data.accessToken;
};

// Function to store access token in local storage
export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

// Function to get access token from local storage
export const getStoredAccessToken = () => {
  return localStorage.getItem("accessToken");
};
