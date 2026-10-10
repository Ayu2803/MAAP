const express = require ("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); //A middleware i.e. used by Express, to read JSON code incoming from React


app.get("/", (req, res) => {
    
    res.send("MAAP Backend is running!!");

});

app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message.trim().toLowerCase();
   console.log("Received message:", userMessage);

  if (userMessage === "hello") {
    res.json({                       
      reply: "Hello! How are you?"
    });
  } else if (userMessage === "bye") {
    res.json({
      reply: "Goodbye!"
    });
  } else {
    res.json({
      reply: "Sorry, I don't understand that message."
    });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});