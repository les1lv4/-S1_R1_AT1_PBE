import CategoryService from "../services/CategoryService.js";

class CategoryController {
    async index(req, res) {
    try{
        const categorias = await CategoryService.getAllCategories();
        res.json(categorias);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar categorias "})
    }
    }

    async store(req, res) {
    try{
        const categorias = req.body;
        await CategoryService.createCategories(categorias);
        res.status(201).json({ message: "Categorias cadastrado com sucesso!"})
    } catch (error) {
        res.status(500).json({ error: "Erro ao criara categorias"})
    }
    }

    async update(req, res) {
    try{
        const { id } = req.params;
        const categorias = req.body;
        await CategoryService.updateCategories(id, categorias);
        res.status(201).json({ message: "Categorias atualizado com sucesso!" })
    } catch (error) {
        res.json({ error: "Erro ao atualizar categorias!"})
    }
    }

    async destroy(req, res) {
    try{
        const { id } = req.params;
        await CategoryService.deleteCategories(id);
        res.status(200).json({ message: "Categorias removido com sucesso! "})
    } catch (error) {
        res.json({ message: "Erro ao remover categorias!"})
    }
    }
}


export default new CategoryController();
