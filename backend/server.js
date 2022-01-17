import express from "express";
import cors from "cors";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());

app.use(express.json());

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
