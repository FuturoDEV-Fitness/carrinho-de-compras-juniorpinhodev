const pool = require('../database/db');


const createOrder = async (req, res) => { // Função para criar um pedido
    const { client_id, total, address, observations, items } = req.body;
    
    if (!client_id || !total || !items || !items.length) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        await pool.query('BEGIN'); // Iniciar transação
        
        // Inserir pedido
        const result = await pool.query(
            'INSERT INTO orders (client_id, total, address, observations) VALUES ($1, $2, $3, $4) RETURNING id',
            [client_id, total, address, observations]
        );
        
        const orderId = result.rows[0].id;
        
        // Inserir itens do pedido
        for (const item of items) {
            await pool.query(
                'INSERT INTO orders_items (order_id, product_id, amount, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.product_id, item.amount, item.price]
            );
        }
        
        // Confirmar transação
        await pool.query('COMMIT');
        
        res.status(201).json({ message: 'Pedido criado com sucesso.', orderId });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    createOrder,
};
