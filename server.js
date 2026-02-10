// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- Pathao ----------------
app.post("/pathao", async (req, res) => {
  const { tracking_number, phone } = req.body;
  try {
    const response = await axios.post(
      "https://merchant.pathao.com/api/v1/user/tracking",
      { consignment_id: tracking_number, phone_no: phone },
      { headers: {
          'accept': 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'origin': 'https://merchant.pathao.com',
          'referer': `https://merchant.pathao.com/tracking?consignment_id=${tracking_number}&phone=${phone}`
        } 
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Rokomari ----------------
app.post("/rokomari", async (req, res) => {
  const { tracking_number, phone } = req.body;
  function encodePhone(phone) {
    return encodeURIComponent(phone);
  }
  try {
    const response = await axios.get(
      `https://www.rokomari.com/ordertrack?orderId=${tracking_number}&countryISOCode=BD&phn=${encodePhone(phone)}`,
      { headers: { 'accept': 'text/html' } }
    );
    res.send(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Redx ----------------
app.get("/redx/:tracking_number", async (req, res) => {
  try {
    const response = await axios.get(`https://api.redx.com.bd/v1/logistics/global-tracking/${req.params.tracking_number}`, {
      headers: { "Accept": "application/json" }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Steadfast ----------------
app.get("/steadfast/:tracking_number", async (req, res) => {
  try {
    const response = await axios.get(`https://steadfast.com.bd/track/consignment/${req.params.tracking_number}`, {
      headers: { "Accept": "application/json" }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Sundarban ----------------
app.post("/sundarban", async (req, res) => {
  const { tracking_number } = req.body;
  try {
    const response = await axios.post(
      "https://tracking.sundarbancourierltd.com/Home/getDatabyCN",
      {
        selectedtypes: "cnno",
        selectedtimes: "7",
        inputvalue: tracking_number
      },
      { headers: {
          "accept": "application/json",
          "content-type": "application/json"
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
