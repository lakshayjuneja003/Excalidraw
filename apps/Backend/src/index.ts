import express from "express";
import { prisma } from "@repo/database/dbClient";
const app = express();
app.use(express.json());


app.get("/", async (req, res) => {
    const user = await prisma.user.findMany({
        where:{
            email : "test@test.com"
        }
    })
  res.send(JSON.stringify(user))
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});