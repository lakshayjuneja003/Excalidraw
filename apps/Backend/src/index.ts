import express from "express";
import cors from "cors"
import userRoutes from "./routes/user.routes"

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", async (req, res) => {
  res.send("hi form server")
});

app.use("/api/user" , userRoutes);

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});