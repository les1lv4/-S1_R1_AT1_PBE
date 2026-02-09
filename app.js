import express from 'express';
import ProdutosRoutes from './routes/ProdutosRoutes.js'
import CategoriasRoutes from './routes/CategoriasRoutes.js'


const app = express();
app.use(express.json());

// http://localhost:3000/produtos
app.use("/produtos", ProdutosRoutes);
app.use("/categorias", CategoriasRoutes);

export default app;