# SmartNetwork_Backend
Backend for smartnetwork application

## WHEN YOU FIRST PULL CODE
* run command `npm install`

## TO RUN SERVER
In one terminal window
```
$ mongod
```
In other window
```
$ npm run build
$ npm start
```

Go to [http://cs1.smartrg.link:8080/smartRG/v1/](http://cs1.smartrg.link:8080/smartRG/v1/) to view root page

## DIAGRAM OF DATABASE STRUCTURE
![diagram](https://github.com/stefanagloginic/SmartNetwork_Backend/blob/master/image/backend_diagram.png)

## SMARTRG REST API
### NOTE: MAKE SURE SERVER IS RUNNING
| REQUEST | LINK | STATUS CODE |
| ------ | ------ | ------ |
| POST/GET/PATCH| All Routers: [http://cs1.smartrg.link:8080/smartRG/v1/routers](http://cs1.smartrg.link:8080/smartRG/v1/routers) | OK: 200 INVALID ENTRIES: 400 SERVER ERROR: 500 (Patch Only) NOT FOUND: 404|
| GET | Routers Given MAC Address: [http://cs1.smartrg.link:8080/smartRG/v1/routers/by-mac-address/MAC_ADDRESS_VALUE](http://cs1.smartrg.link:8080/smartRG/v1/routers/by-mac-address/:mac_address) | OK: 200 DATA NOT FOUND: 404 SERVER ERROR: 500 |
| POST/GET/PATCH | All Addresses: [http://cs1.smartrg.link:8080/smartRG/v1/addresses](http://cs1.smartrg.link:8080/smartRG/v1/addresses) | OK: 200 INVALID ENTRIES: 400 SERVER ERROR: 500 (Patch Only) NOT FOUND: 404 |
| GET | Address Given MAC Address: [http://cs1.smartrg.link:8080/smartRG/v1/addresses/by-mac-address/MAC_ADDRESS_VALUE](http://cs1.smartrg.link:8080/smartRG/v1/addresses/by-mac-address/:mac_address) | OK: 200 DATA NOT FOUND: 404 SERVER ERROR: 500 |
| POST/GET | All Heatmaps: [http://cs1.smartrg.link:8080/smartRG/v1/heatmaps](http://cs1.smartrg.link:8080/smartRG/v1/heatmaps) | OK: 200 INVALID ENTRIES: 400 SERVER ERROR: 500 |
| GET | Heatmap Given MAC Address: [http://localhost:8080/smartRG/v1/heatmaps/by-mac-address/:mac_address](http://cs1.smartrg.link:8080/smartRG/v1/heatmaps/by-mac-address/:mac_address) | OK: 200 DATA NOT FOUND: 404 SERVER ERROR: 500 |
| GET | Heatmap By ID: [http://cs1.smartrg.link:8080/smartRG/v1/heatmaps/by-id/:heatmap_id](http://cs1.smartrg.link:8080/smartRG/v1/heatmaps/by-id/:heatmap_id) | OK: 200 INVALID ENTRIES: 400 SERVER ERROR: 500 |
| POST/GET | All Connection Statistics: [http://cs1.smartrg.link:8080/smartRG/v1/connection-statistics](http://cs1.smartrg.link:8080/smartRG/v1/connection-statistics) | OK: 200 INVALID ENTRIES: 400 SERVER ERROR: 500 | 
| POST/GET | All Pindrops: [http://cs1.smartrg.link:8080/smartRG/v1/pindrops](http://cs1.smartrg.link:8080/smartRG/v1/pindrops) | OK: 200 INVALID ENTRIES: 400 SERVER ERROR: 500 |
* A helpful tool to use is [Postman](https://www.getpostman.com/) for making the POST/PATCH/GET requests

## REFERENCES 
* Setup for database class [Part 2: Using MongoDB with Node.js](https://www.mongodb.com/blog/post/the-modern-application-stack-part-2-using-mongodb-with-nodejs)
* MongoDB documentation [MongoDB](http://mongodb.github.io/node-mongodb-native/2.2/api/)
* Chainable Routing using express.js [Express Routing](https://expressjs.com/en/guide/routing.html)
* Schema for validation of fields [npm json-validation](https://npm.runkit.com/json-validation)
