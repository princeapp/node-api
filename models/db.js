const { Pool } = require('pg');
const config = require('../config/db.config');

const pool = new Pool({ connectionString: config.connectionString });

module.exports = pool;
