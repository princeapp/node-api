const pool = require('./db');

const createUser = async (username, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
    );
    return result.rows[0];
};

const findUserByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByUsername
};
