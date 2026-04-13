import ProductService  from "../services/ProductService.js";

class ProductController {
    async index(req, res, next) {
        try {
            const produtos = await ProductService.listar();
            res.json(produtos)
        } catch (error) {
            // next() -> Normalmente ele é chamado para passar para o próximo middleware ou rota
            next(error); // next() -> função que vamos utilizar para chamar o errorHandler
        }
    }

    async store(req, res, next) {
        try {
        await ProductService.criarProduto(req.body);
        res.status(201).json({ message: "Produto cadastrado com sucesso!"})
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
        const { id } = req.params;

        await ProductService.atualizar(id, req.body);
        res.status(201).json({ message: "Produto atualizado com sucesso!" })
        } catch (error) {
            next(error)
        }
    }

    async destroy(req, res, next) {
        try {
        const { id } = req.params;

        await ProductService.deletar(id);
        res.status(201).json({ message: "Produto removido com sucesso!" })
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController();
