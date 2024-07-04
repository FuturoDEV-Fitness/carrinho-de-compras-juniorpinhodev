const pool = require('../database/db');

const createProduct = async (req, res) => {
    const { name, amount, color, voltage, description, category_id } = req.body;
    if (!name || !category_id) {
        return res.status(400).json({ error: 'Nome e ID da categoria são obrigatórios.' });
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

module.exports = {
    createProduct,
};
