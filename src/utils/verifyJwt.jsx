// utils/authUtils.js

import jwtDecode from 'jwt-decode';

// Function to check the validity of a JWT accessToken
const isAccessTokenValid = (accessToken) => {
  try {
    const decodedToken = jwtDecode(accessToken);

    // Check if the token is not expired
    if (decodedToken.exp * 1000 > Date.now()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // If the token decoding fails, return false
    return false;
  }
};

export default isAccessTokenValid;
