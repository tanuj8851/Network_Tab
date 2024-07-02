// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 8080;

// Enable CORS for all routes
app.use(cors());

app.get("/proxy", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const response = await axios.get(url);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Error fetching URL:", error);
    res
      .status(error.response ? error.response.status : 500)
      .send(error.message);
  }
});

app.listen(port, () => {
  console.log(`CORS proxy server running at http://localhost:${port}`);
});
