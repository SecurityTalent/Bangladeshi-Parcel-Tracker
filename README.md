
# 📦 Bangladeshi Parcel Tracker (Full Stack Example)
A JavaScript library to track parcels from major Bangladeshi courier services:
`Redx, Steadfast, Pathao, Rokomari, Sundarban.`

This project demonstrates how to use the **bangladeshi-parcel-tracker** npm package with a full stack setup:

- ✅ Node.js + Express Backend
- ✅ React (Vite) Frontend
- ✅ API-based tracking
- ✅ Form-based tracking input
- ✅ CORS enabled

Supports:

- Redx
- Steadfast
- Pathao
- Rokomari
- Sundarban

---

# 📁 Project Structure

```
bangladeshi-parcel-tracker-app/
│
├── backend/
│   ├── node_modules/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── package-lock.json
```

---

# 🖥️ Backend Setup (Express API)

## 1️⃣ Create Backend Folder

```bash
mkdir backend
cd backend
npm init -y
```

## 2️⃣ Install Dependencies

```bash
npm install express cors bangladeshi-parcel-tracker
```

## 3️⃣ Create `server.js`

```js
import express from "express";
import cors from "cors";
import tracker from "bangladeshi-parcel-tracker";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Redx
app.get("/track/redx/:trackingNumber", async (req, res) => {
  try {
    const data = await tracker.redx(req.params.trackingNumber);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Steadfast
app.get("/track/steadfast/:trackingNumber", async (req, res) => {
  try {
    const data = await tracker.steadfast(req.params.trackingNumber);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pathao
app.get("/track/pathao/:trackingNumber/:phone", async (req, res) => {
  try {
    const { trackingNumber, phone } = req.params;
    const data = await tracker.pathao(trackingNumber, phone);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rokomari
app.get("/track/rokomari/:trackingNumber/:phone", async (req, res) => {
  try {
    const { trackingNumber, phone } = req.params;
    const data = await tracker.rokomari(trackingNumber, phone);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sundarban
app.get("/track/sundarban/:trackingNumber", async (req, res) => {
  try {
    const data = await tracker.sundarban(req.params.trackingNumber);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## 4️⃣ Run Backend

```bash
node server.js
```

Backend runs at:

```
http://localhost:3000
```

---

# ⚛️ Frontend Setup (React + Vite)

## 1️⃣ Create React App

```bash
npm create vite@latest frontend
cd frontend
npm install
```

Choose:
- Framework: React
- Variant: JavaScript

---

## 2️⃣ Replace `src/App.jsx`

```jsx
import { useState } from "react";

function App() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(
        `http://localhost:3000/track/pathao/${trackingNumber}/${phone}`
      );
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>📦 Parcel Tracking</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tracking Number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit">Track</button>
      </form>

      {loading && <p>Loading...</p>}

      {data && data.data && (
        <div style={{ marginTop: "20px" }}>
          <h2>Tracking Result</h2>
          <p>Status: {data.data.order.transfer_status}</p>
          <p>Recipient: {data.data.order.recipient_name}</p>
          <p>Address: {data.data.order.recipient_address}</p>
          <p>Estimated Delivery: {data.data.order.estimated_date}</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

---

## 3️⃣ Run Frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔄 How It Works

1. User enters tracking number & phone.
2. React sends request to backend.
3. Backend calls `bangladeshi-parcel-tracker`.
4. Backend returns JSON.
5. React displays parcel information.

---

# 📌 Available Backend Endpoints

| Endpoint | Method | Description |
|-----------|--------|------------|
| /track/redx/:trackingNumber | GET | Fetch Redx parcel |
| /track/steadfast/:trackingNumber | GET | Fetch Steadfast parcel |
| /track/pathao/:trackingNumber/:phone | GET | Fetch Pathao parcel |
| /track/rokomari/:trackingNumber/:phone | GET | Fetch Rokomari parcel |
| /track/sundarban/:trackingNumber | GET | Fetch Sundarban parcel |

---

# 🛡️ CORS Enabled

CORS is enabled using:

```js
app.use(cors());
```

---

# 🚀 Production Notes

- Use environment variables for PORT
- Add validation middleware
- Add error handling middleware
- Secure endpoints if needed
- Deploy backend separately (Render, Railway, VPS)
- Deploy frontend separately (Vercel, Netlify)

---

# 📜 License

MIT License

---

# 👨‍💻Developed using:

- Node.js
- Express.js
- React (Vite)
- bangladeshi-parcel-tracker
