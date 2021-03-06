import express from 'express';
import _ from 'lodash';
import jsonValidation from 'json-validation';
import assert from 'assert'
import tableConfigs from '../Configs/tableConfigs';
import paths from '../paths';
import db from '../db';

var routersRouter = express.Router();

routersRouter.route('/')
	.post(
		function checkJSONValues(req, res, next) {
			var router = req.body;
			var router_schema = tableConfigs.router_schema;
			var jv = new jsonValidation.JSONValidation();

			var results = jv.validate(router, router_schema);

			!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next()
		},	

		function postRouter(req, res, next) {
			var router = req.body;
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						database.insertOne('routers', router, res)
							.then(
								() => {
									console.log('success');
									database.close();
								}
							)
							.catch(
								(err) => {
									console.log(err);
									database.close();
								}
							)
					}
				)
		})
	.get(
		function(req, res, next) {
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						var routerCollection = database.db.collection('routers');

						routerCollection.find().toArray(function(err, docs){
							res.json(docs);
							res.status(200);
							database.close();
						});
					},
					function(err){
						throw("Failed to connect to the database: " + err);
						database.close();
					})
		})
	.patch(
		function checkJSONValues(req, res, next){
			var router = req.body;
			var router_schema = tableConfigs.router_patch_schema;
			var jv = new jsonValidation.JSONValidation();

			var results = jv.validate(router, router_schema);

			!results.ok ? res.status(400).send("Invalid entries: " + results.errors.join(", ") + " at path " + results.path) : next()
		},
		function(req, res, next){
			var mac_address = req.body.mac_address;
			var router = req.body;
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					() => {
						let filter = {};
						filter["mac_address"] = { $eq: mac_address};

						database.findAndUpdate('routers', req, res, filter)
							.then(
								() => {
									console.log('success');
									database.close();
								})
							.catch((err) => {
								console.log(err);
								database.close();
							})				
					},
					function(err){
						throw("Failed to connect to the database: " + err);
						database.close();
					})
		});

routersRouter.route(paths.routerByMacAddress)
	.get(
		function(req, res, next){
			var mac_address = req.params.mac_address;
			var database = new db();

			database.connect(paths.mongodb)
				.then(
					function(){
						var routerCollection = database.db.collection('routers');

						// find router in routers db according to existing mac_address field and value from req 
						routerCollection.findOne({ "mac_address" : { $eq : mac_address }})
							.then((router) => {
								if(router){
									res.status(200);
									res.json(router);
								}
								else{
									// 404 indicates that the data doesnt exist in the database
									res.status(404).send("Router with MAC Address " + mac_address + " could not be found");
								}
								database.close();
							})
							.catch((err) => {
								res.status(500).send("Server Error: Failed to GET " + err);
								database.close();
							});
					},
					function(err){
						throw("Failed to connect to the database: " + err);
						database.close();
					}
				)
		})

export default routersRouter