const {personsRouter} = require('./persons/persons.controller');
const {usersRouter} = require('./users/users.controller');
const {authRouter} = require("./auth/auth.controller");
const {nb4Router} = require('./forms/nb4/nb4.controller');
const {nb5Router} = require('./forms/nb5/nb5.controller');
const {nb6Router} = require('./forms/nb6/nb6.controller');
const {nb7Router} = require('./forms/nb7/nb7.controller');
const {nb136Router} = require('./forms/nb136/nb136.controller');
const {nb403Router} = require('./forms/nb403/nb403.controller');

module.exports = {personsRouter, usersRouter, authRouter, nb4Router, nb5Router, nb6Router, nb7Router, nb136Router, nb403Router};

