import CategoryModel from "../models/CategoryModel.js";
import ProductRepository from "../repositories/ProductRepository.js";
import CategoryRepository from "../repositories/CategoryRepository.js"

class CategoryService {
    async getAllCategories() {
        return await CategoryRepository.getAllCategories()
    }

    async createCategories(data){
        const categoria = new CategoryModel(data)

        return await CategoryRepository.createCategories(categoria)
    }

    async updateCategories(id, data){
        const categoria = new CategoryModel(data)
        return await CategoryRepository.updateCategories(id, categoria)
    }

    async desativar(id) {
        if(!id || isNaN(id)) {
            throw new Error("ID da categoria é obrigatório!")
        }

        // Verificando se a categoria existe
        const categoria = CategoryModel.getById(id)
        
        if(!categoria) {
            throw new Error("Categoria não encontrada!")
        }

        // Desativando a categoria encontrada!
        await CategoryModel.updateStatus(id, 0);

        // Desativando produto de categoria
        await ProductRepository.desativarPorCategoria(id)

        return { message: "Categoria e produtos desativados com sucesso!"}
    }

    async deleteCategories(id){
    const totalProdutos = await ProductRepository.countByCategoria(id);

    if(totalProdutos > 0) {
        throw new Error("Não é possivel excluir categoria com produtos vinvulados!")
    }
    console.log(totalProdutos)
    console.log(id)

    return await CategoryRepository.deleteCategories(id)
}
}



export default new CategoryService();