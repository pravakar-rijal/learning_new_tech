const bcrypt = require('bcryptjs');
const constants = require("../config/constants");

function hashPassword(password){
    const salt = bcrypt.genSaltSync(constants.saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}

module.exports = hashPassword;