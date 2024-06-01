const pool = require('./db');

const createProduct = async (name, description, price, userId) => {
    const result = await pool.query(
        'INSERT INTO products (name, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, userId]
    );
    return result.rows[0];
};

const getProductsByUserId = async (userId) => {
    const result = await pool.query('SELECT * FROM products WHERE user_id = $1', [userId]);
    return result.rows;
};

const updateProduct = async (id, name, description, price, userId) => {
    const result = await pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
        [name, description, price, id, userId]
    );
    return result.rows[0];
};

const deleteProduct = async (id, userId) => {
    const result = await pool.query(
        'DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING *',
        [id, userId]
    );
    return result.rows[0];
};


module.exports = {
    createProduct,
    getProductsByUserId,
    updateProduct,
    deleteProduct
};
