import Categorias  from '../models/Categorias.js'

async function index(req, res) {
    try{
        const categorias = await Categorias.getAllCategories();
        res.json(categorias);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao buscar categorias "})
    }
}

async function store(req, res) {
    try{
        const categorias = req.body;
        await Categorias.createCategories(categorias);
        res.status(201).json({ message: "Categorias cadastrado com sucesso!"})
    } catch (error) {
        res.status(500).json({ error: "Erro ao criara categorias"})
    }
}

async function update(req, res) {
    try{
        const { id } = req.params;
        const categorias = req.body;

        await Categorias.updateCategories(id, categorias);
        res.status(201).json({ message: "Categorias atualizado com sucesso!" })
    } catch (error) {
        res.json({ error: "Erro ao atualizar categorias!"})
    }
}

async function destroy(req, res) {
    try{
        const { id } = req.params;

        await Categorias.deleteCategories(id);
        res.status(200).json({ message: "Categorias removido com sucesso! "})
    } catch (error) {
        res.json({ message: "Erro ao remover categorias!"})
    }
}


export default { index, store, update, destroy }
