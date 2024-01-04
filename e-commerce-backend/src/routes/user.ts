import express from 'express'
import { deleteUser, getAllUser, getAllUsers, newUser } from '../controllers/user.js';

const app = express.Router();
// route - /api/v1/user/new
app.post("/new", newUser) 
// route - /api/v1/user/all
app.get("/all", getAllUsers)
// route - /api/v1/user/DynamicID

app.route("/:id")
.get(getAllUser)
.delete(deleteUser);

export default app;