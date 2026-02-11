const axios = require("axios");

async function rokomari(trackingNumber, phone) {
  try {
    const res = await axios.get(
      `https://www.rokomari.com/ordertrack?orderId=${trackingNumber}&countryISOCode=BD&phn=${encodeURIComponent(phone)}`,
      { headers: { 'accept': 'text/html' } }
    );
    return res.data;
  } catch (err) {
    throw new Error(`Rokomari tracking failed: ${err.message}`);
  }
}

module.exports = rokomari;
