import cors from 'cors';
import express from 'express';
import { routes } from './routes';

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT ?? 3333, () => {
  console.log(`Sever running on port ${process.env.PORT ?? '3333'} 🚀`);
});
