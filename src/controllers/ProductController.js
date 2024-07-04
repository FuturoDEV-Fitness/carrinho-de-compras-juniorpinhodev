const pool = require('../database/db');

const createProduct = async (req, res) => {
    const { name, amount, color, voltage, description, category_id } = req.body;

    if (!name || !amount || !color || !voltage || !description || !category_id) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO products (name, amount, color, voltage, description, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, amount, color, voltage, description, category_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

const getAllProducts = async (req, res) => { //método para listar todos os produtos
    try {
        
        const result = await pool.query(
            'SELECT * FROM products'
        );
        
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};  

const getProductWithDetails = async (req, res) => { //método para listar um produto com detalhes
    const { id } = req.params;

    try {
        const result = await pool.query(
            `SELECT p.*, c.name AS category_name
             FROM products p
             JOIN categories c ON p.category_id = c.id
             WHERE p.id = $1`,
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao listar produto com detalhes:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductWithDetails,
};
