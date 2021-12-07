import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { usersRoute } from './routes/users.js';
import { mongo } from './mongo/mongo.js';
import { resetRoute } from './routes/resetPassword.js';
dotenv.config();

const app = express();
await mongo.connectDB();
const PORT = process.env.PORT;
app.get('/', (req, res) => {
res.send("Server running successfully")
})
app.use(cors())
app.use(express.json())
app.use("/users", usersRoute)
app.use("/resetPassword",resetRoute)
app.listen(PORT, () => console.log(`server running successfully on PORT ${PORT}`))

