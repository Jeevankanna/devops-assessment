const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("🚀 DevOps Assessment is Working!");
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        timestamp: new Date(),
        hostname: require("os").hostname()
    });
});

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
