import express from 'express';
import cors from 'cors'
import productroutes from './routes/product.routes.js'
import categoryroutes from './routes/category.routes.js'
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

// http://localhost:3000/produtos
app.use("/produtos", productroutes);
app.use("/categorias", categoryroutes);

app.use(errorHandler);

export default app;