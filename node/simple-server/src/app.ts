import express, { Request, Response } from "express";
import { User } from "./models/user";

type RequestBody = {
  name: string;
};

const PORT = 5000;
const app = express();
app.use(express.json());

let users: User[] = [];

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  try {
    const userId = Number(req.params.id);

    const user = users.find((user) => user.id === userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/users", (req, res) => {
  const { name } = req.body as RequestBody;

  const createdUser: User = {
    id: users.length + 1,
    name,
  };

  users.push(createdUser);

  res.status(201).json(users[users.length - 1]);
});

app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  const { name } = req.body as RequestBody;
  if (!name) res.status(400).json({ message: "Name is Required" });

  const updatedUsers = users.map((user) => {
    if (user.id === userId) user.name = name;
    return user;
  });

  users = updatedUsers;

  res.status(200).json();
});

app.delete("/users/:id", (req, res) => {
  try {
    const userId = Number(req.params.id);

    const deletedUser = users.filter((user) => user.id !== userId);
    users = deletedUser;
    res.status(204).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
