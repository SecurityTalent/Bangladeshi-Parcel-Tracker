const axios = require("axios");

async function redx(trackingNumber) {
  try {
    const res = await axios.get(
      `https://api.redx.com.bd/v1/logistics/global-tracking/${trackingNumber}`,
      { headers: { "Accept": "application/json" } }
    );
    return res.data;
  } catch (err) {
    throw new Error(`Redx tracking failed: ${err.message}`);
  }
}

module.exports = redx;
