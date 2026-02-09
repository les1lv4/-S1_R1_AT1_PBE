import pool from "../database/connection.js";

async function getAllProducts(){
    const [rows] = await pool.query('SELECT * FROM Produtos');
    return rows;
}

async function createProduct(produto) {
    const {
        nome, 
        descricao, 
        preco, 
        quantidade_estoque, 
        status, 
        destaque, 
        marca, 
        modelo, 
        garantia_meses,
        id_categoria
    } = produto;

    const [result] = await pool.query(`INSERT INTO produtos (
        nome, descricao, preco, quantidade_estoque, status, destaque, marca, modelo, garantia_meses, id_categoria
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [
        nome, 
        descricao, 
        preco, 
        quantidade_estoque, 
        status, 
        destaque, 
        marca, 
        modelo, 
        garantia_meses,
        id_categoria
        ]
    ) 

    return result.insertId
}

async function updateProduct(id, produto) { 
     const  {
        nome, 
        descricao, 
        preco, 
        quantidade_estoque, 
        status, 
        destaque, 
        marca, 
        modelo, 
        garantia_meses,
        id_categoria
    } = produto;

    console.log(id, produto)
    const [result] = await pool.query(`UPDATE produtos SET 
        nome = ?,
        descricao = ?,
        preco = ?,
        quantidade_estoque = ?,
        status = ?,
        destaque = ?,
        marca = ?,
        modelo = ?,
        garantia_meses = ?,
        id_categoria = ?
        WHERE id = ?
        `, [
            nome,
            descricao,
            preco,
            quantidade_estoque,
            status,
            destaque,
            marca,
            modelo,
            garantia_meses,
            id_categoria,
            id
        ])

    return result.affectedRows;

}

async function deleteProduct(id) {
    const [result] = await pool.query(`DELETE FROM produtos WHERE id = ?`, [id])

    return result.affectedRows;
} 

export default { getAllProducts, createProduct, updateProduct, deleteProduct }