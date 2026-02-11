# Bangladeshi Parcel Tracker

A fully working Bangladeshi Parcel Tracker built with JavaScript (Node.js + HTML/JS/CSS). Supports all major Bangladeshi couriers: `Redx, Steadfast, Pathao, Rokomari, Sundarban.` This tracker can be run locally and handles CORS automatically.

> Full stack parcel tracking example for Bangladesh (Redx, Steadfast, Pathao, Rokomari, Sundarban)  

# **NPM Package:** [bangladeshi-parcel-tracker](https://www.npmjs.com/package/bangladeshi-parcel-tracker)

---
## 📦 Installation

```bash
npm install bangladeshi-parcel-tracker
```

# Features
- 🚚 Track parcels from `Redx, Steadfast, Pathao, Rokomari, Sundarban`
- 📦 Unified tracking interface
- ⏱️ View detailed parcel journey and current status
- 🔄 Real-time API integration
- 🛠️ Easy to run locally with `Node.js`

# Supported Couriers
| Courier       | Description                                   |
| ------------- | --------------------------------------------- |
| **Redx**      | Leading courier service in Bangladesh         |
| **Steadfast** | Reliable delivery solutions                   |
| **Pathao**    | Fast and efficient courier service            |
| **Rokomari**  | Book and product delivery specialist          |
| **Sundarban** | Comprehensive logistics and courier solutions |


# Installation
## Backend (Node.js)

1. **Clone the repository:**

```bash
git clone https://github.com/SecurityTalent/Bangladeshi-Parcel-Tracker.git
cd Bangladeshi-Parcel-Tracker
```
2. **Install dependencies:**
```bash
npm install
# npm install express axios cors
```
2. **Run the server:**
```bash
node server.js
```
Server will run at http://localhost:3000

## Frontend
`Open index.html in your browser`. This frontend connects to the backend server to fetch parcel data.

## Usage
- Open index.html
- Select a courier
- Enter tracking number (and phone number if required)
- Click Track
- JSON response will display tracking information


# Sample Pathao Tracking Example
- Select Courier: `Pathao`
- Tracking Number: `DM0902269TUGST`
- Phone Number: `015111944**`

## JSON Response
```json
{
  "message": "Order information",
  "type": "success",
  "code": 200,
  "data": {
    "order": {
      "order_id": 164119312,
      "consignment": "DM0902269TUGST",
      "order_type_id": 1,
      "collectable_amount": 5000,
      "transfer_status": "In-Transit",
      "transfer_status_updated_at": "10 Feb, 2026 5:23 AM",
      "merchant_logo": "https://cdn.pathao.com/hermes/hermes_U7PSsSZEj8YsCAbp1730632745.png",
      "created_at": "Feb 9, 2026 6:51 PM",
      "order_description": "MTP-VD01D-3E2VUDF",
      "cash_on_delivery": "Yes",
      "recipient_name": "PiaL",
      "recipient_address": "Ghosher Ghat Bridge, Sriram Kandi, Tungipara, Gopalganj",
      "merchant_name": "M S International",
      "merchant_address": "66/A Shama Complex, 6th Floor, Naya Paltan, Dhaka-1000",
      "estimated_date": "Feb 12-13, 2026"
    },
    "state": {
      "name": "In-Transit"
    },
    "log": [
      {
        "desc": "New order pickup requested",
        "created_at": "Feb 9, 2026 6:51 PM"
      }
    ]
  }
}

```

## Frontend Screenshot

![Pathao Delivery Tracking POC](https://raw.githubusercontent.com/SecurityTalent/Bangladeshi-Parcel-Tracker/refs/heads/main/POC/Pathao%20Delivery%20Tracking%20POC.png)


# Backend Endpoints
| Endpoint                      | Method | Description                                 |
| ----------------------------- | ------ | ------------------------------------------- |
| `/redx/:tracking_number`      | GET    | Fetch Redx parcel info                      |
| `/steadfast/:tracking_number` | GET    | Fetch Steadfast parcel info                 |
| `/pathao`                     | POST   | Fetch Pathao parcel info (requires phone)   |
| `/rokomari`                   | POST   | Fetch Rokomari parcel info (requires phone) |
| `/sundarban`                  | POST   | Fetch Sundarban parcel info                 |

## Frontend JavaScript Usage
```js
const form = document.getElementById("trackerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const courier = document.getElementById("courier").value;
  const trackingNumber = document.getElementById("trackingNumber").value.trim();
  const phone = document.getElementById("phone").value.trim();

  let response;

  switch (courier) {
    case "redx":
      response = await fetch(`http://localhost:3000/redx/${trackingNumber}`);
      response = await response.json();
      break;
    case "pathao":
      response = await fetch("http://localhost:3000/pathao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracking_number: trackingNumber, phone })
      });
      response = await response.json();
      break;
    // ...other couriers
  }

  document.getElementById("result").innerHTML = `<pre>${JSON.stringify(response, null, 2)}</pre>`;
});

```

## Contributing
- Fork the repository
- Create a new branch for your feature
- Submit a pull request
- Make sure to test your changes locally

## License
This project is licensed under the [MIT License](LICENSE).
