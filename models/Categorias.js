import pool from "../database/connection.js";

async function getAllCategories(){
    const [rows] = await pool.query('SELECT * FROM Categorias');
    return rows;
}

async function createCategories(categorias) {
    const {
        nome, 
        descricao
    } = categorias;

    const [result] = await pool.query(`INSERT INTO Categorias (
        nome, descricao
        ) VALUES (?, ?)`, 
        [
        nome, 
        descricao
        ]
    ) 

    return result.insertId
}

async function updateCategories(id, categorias) { 
    console.log("categorias")
     const  {
        nome, 
        descricao
    } = categorias;

    const [result] = await pool.query(`UPDATE Categorias SET 
        nome = ?,
        descricao = ?
        WHERE id = ?
        `, [
            nome,
            descricao,
            id
        ])

    return result.affectedRows;

}

async function deleteCategories(id) {
    const [result] = await pool.query(`DELETE FROM Categorias WHERE id = ?`, [id])

    return result.affectedRows;
} 

export default { getAllCategories, createCategories, updateCategories, deleteCategories }