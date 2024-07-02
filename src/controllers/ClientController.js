const pool = require('../database/db');

const createClient = async (req, res) => {
    const { name, email, cpf, contact } = req.body;
    if (!name || !email || !cpf || !contact) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO clients (name, email, cpf, contact) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, cpf, contact]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    createClient,
};
