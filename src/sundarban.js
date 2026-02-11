const axios = require("axios");

async function sundarban(trackingNumber) {
  try {
    const res = await axios.post(
      "https://tracking.sundarbancourierltd.com/Home/getDatabyCN",
      {
        selectedtypes: "cnno",
        selectedtimes: "7",
        inputvalue: trackingNumber
      },
      { headers: { "accept": "application/json", "content-type": "application/json" } }
    );
    return res.data;
  } catch (err) {
    throw new Error(`Sundarban tracking failed: ${err.message}`);
  }
}

module.exports = sundarban;
