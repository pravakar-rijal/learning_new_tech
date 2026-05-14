import express, {Request, Response} from 'express';
import userRoutes from './routes/userRoutes';

const PORT = 3000;
const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})
