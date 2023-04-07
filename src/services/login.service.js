const { User } = require('../models');
const { httpErrorGen } = require('../utils');

const authLogin = async ({ email, password }) => {
    const catchUser = await User.findOne({ where: { email, password } });
    if (!catchUser) throw httpErrorGen(400, 'Invalid fields');
};

module.exports = {
  authLogin,
};