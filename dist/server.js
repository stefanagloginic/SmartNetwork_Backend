'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jsonValidation = require('json-validation');

var _jsonValidation2 = _interopRequireDefault(_jsonValidation);

var _tableConfigs = require('./tableConfigs');

var _tableConfigs2 = _interopRequireDefault(_tableConfigs);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var smartrg_V1_Router = _express2.default.Router();

//check for port provided by env
var port = process.env.PORT || 3000;

// set up body parser for app to extract json from buffer stream
smartrg_V1_Router.use(_bodyParser2.default.urlencoded({
	extended: true
}));
smartrg_V1_Router.use(_bodyParser2.default.json());

var welcomeMessage = { message: 'Welcome to SmartNet' };

//root path
smartrg_V1_Router.get('/', function (req, res, next) {
	res.json(welcomeMessage);
});

smartrg_V1_Router.route('/heatmaps').post(function checkJSONValues(req, res, next) {
	var heatmap = req.body;
	var heatmap_schema = _tableConfigs2.default.heatmap_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(heatmap, heatmap_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postHeatmap(req, res, next) {
	res.status(200).send("Heatmap added to database");
});

smartrg_V1_Router.route('/addresses').post(function checkJSONValues(req, res, next) {
	var address = req.body;
	var address_schema = _tableConfigs2.default.address_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(address, address_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postAddress(req, res, next) {
	res.status(200).send("Address added to database");
});

smartrg_V1_Router.route('/routers').post(function checkJSONValues(req, res, next) {
	var router = req.body;
	var router_schema = _tableConfigs2.default.router_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(router, router_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postAddress(req, res, next) {
	res.status(200).send("Router added to database");
});

smartrg_V1_Router.route('/pindrops').post(function checkJSONValues(req, res, next) {
	var pindrop = req.body;
	var pindrop_schema = _tableConfigs2.default.pindrop_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(pindrop, pindrop_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postAddress(req, res, next) {
	res.status(200).send("Pindrop added to database");
});

smartrg_V1_Router.route('/connection-statistics').post(function checkJSONValues(req, res, next) {
	var connection_statistic = req.body;
	var conn_stat_schema = _tableConfigs2.default.conn_stat_schema;
	var jv = new _jsonValidation2.default.JSONValidation();

	var results = jv.validate(connection_statistic, conn_stat_schema);

	!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next();
}, function postAddress(req, res, next) {
	res.status(200).send("Connection Statistics added to database");
});

//telling main application to route all to smartrg/v1
app.use('/smartrg/v1', smartrg_V1_Router);

app.listen(port, function () {
	console.log('Server listening on port ' + port + '!');
});