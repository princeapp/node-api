const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const Joi = require('joi');

const secretKey = 'your_secret_key';

const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
});

const register = async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const newUser = await userModel.createUser(req.body.username, hashedPassword);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).send('User already exists');
    }
};

const login = async (req, res) => {
    const user = await userModel.findUserByUsername(req.body.username);
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).send('Invalid Credentials');
    }

    const token = jwt.sign({ id: user.id }, secretKey);
    res.json({ token });
};

module.exports = {
    register,
    login
};
