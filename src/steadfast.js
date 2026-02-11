const axios = require("axios");

async function steadfast(trackingNumber) {
  try {
    const res = await axios.get(
      `https://steadfast.com.bd/track/consignment/${trackingNumber}`,
      { headers: { "Accept": "application/json" } }
    );
    return res.data;
  } catch (err) {
    throw new Error(`Steadfast tracking failed: ${err.message}`);
  }
}

module.exports = steadfast;
