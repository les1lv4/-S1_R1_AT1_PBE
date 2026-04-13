import ProductModel from "../models/ProductModel.js";
import ProductRepository from "../repositories/ProductRepository.js";
import CategoryRepository from "../repositories/CategoryRepository.js";
import { validarCamposObrigatorios, validarPreco, validarEstoque } from "../validators/product.validator.js"

class ProductService {
    async listar() {
        return await ProductRepository.getAll();
    }

    async criarProduto(data){ 
        validarCamposObrigatorios(data)
        validarPreco(data)
        validarEstoque(data)

        let categoria = await ProductRepository.getById(data.categoria_id);


        if (!categoria) {
            throw new Error("Categoria não existe!")
        }

       if (categoria.status === 0) {
        throw new Error("Não é possível cadastrar produto em categoria desativada!")
       }

       if (data.destaque) {
        const totalDestaque = await ProductRepository.countDestaques();

        if (totalDestaque >= 5) {
            throw new Error("Lmite de produtos em destaque foi atingido!")
        }
       }
        
       // Model -> Cuida da estrutura dos doas
       const produto = new ProductModel(data);

       // Repository -> Cuida do banco (INSERT, UPDATE, SLECT)
       return await ProductRepository.createProduct(produto);
    }

    async atualizar(id, data) {
        if (!id) {
            throw new Error("ID do Produto é obrigatório")
        }

        const produtoAtual = await ProductRepository.getById(id);

        if (!produtoAtual) {
            throw new Error("Produto não encontrado!")
        }

        validarCamposObrigatorios(data);
        validarPreco(data);
        validarEstoque(data);

        if (data.categoria_id) {
            const categoria = await CategoryRepository.getById(data.categoria_id)

        if (!categoria || categoria.status === 0) {
                throw new Error("Categoria inválida ou desativada!");
            }
        }

        if (data.destaque && !produtoAtual.destaque) {
            const totalDestaque = await ProductRepository.countDestaques();
    
            if (totalDestaque >= 5) {
                throw new Error("Limite de produtos em destaque foi atingido!")
            }
        }

        // Model -> Cuida da estrutura dos doas
       const produto = new ProductModel(data);

       // Repository -> Cuida do banco (INSERT, UPDATE, SLECT)
       return await ProductRepository.updateProduct(id, produto);
    }

    async deletar(id) {
        if (!id) {
            throw new Error("ID do produto é obrigatório")
        }

        return await ProductRepository.deleteProduct(id)
    }

}

export default new ProductService();

