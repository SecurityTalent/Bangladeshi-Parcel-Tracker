const axios = require("axios");

async function pathao(trackingNumber, phone) {
  try {
    const res = await axios.post(
      "https://merchant.pathao.com/api/v1/user/tracking",
      { consignment_id: trackingNumber, phone_no: phone },
      { headers: {
          'accept': 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'origin': 'https://merchant.pathao.com',
        } 
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(`Pathao tracking failed: ${err.message}`);
  }
}

module.exports = pathao;
