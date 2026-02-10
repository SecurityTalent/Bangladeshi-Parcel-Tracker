const form = document.getElementById("trackerForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const courier = document.getElementById("courier").value;
  const trackingNumber = document.getElementById("trackingNumber").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!courier || !trackingNumber) {
    alert("Please fill all required fields!");
    return;
  }

  resultDiv.innerHTML = "Tracking... ⏳";

  try {
    let response;

    switch (courier) {
      case "redx":
        response = await fetch(`http://localhost:3000/redx/${trackingNumber}`);
        response = await response.json();
        break;

      case "steadfast":
        response = await fetch(`http://localhost:3000/steadfast/${trackingNumber}`);
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

      case "rokomari":
        response = await fetch("http://localhost:3000/rokomari", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tracking_number: trackingNumber, phone })
        });
        break;

      case "sundarban":
        response = await fetch("http://localhost:3000/sundarban", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tracking_number: trackingNumber })
        });
        response = await response.json();
        break;
    }

    resultDiv.innerHTML = `<pre>${JSON.stringify(response, null, 2)}</pre>`;
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `Error: ${err.message}`;
  }
});
