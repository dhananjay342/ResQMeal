import express from "express";
import connectDB from "./config/database.js";
import errorMiddleware from "./middlewares/error.js";
import userHandler from "./handlers/user.js";

const app = express();

const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("how are you doing");
});

app.use("/users", userHandler);

// Error middleware MUST be last
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});