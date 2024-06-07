"use strict";
/* Requirement 1 - Products Endpoint
Create a folder, initialize a local Git reposit
Requirement 1 - Products Endpoint
Create a folder, initialize a local Git repository, and create a feature branch.
Create new Node app
Create a REST API that returns JSON. Then endpoint should be a GET call called “/products”
The products endpoint should return 1000 products. Create the 1000 products using a loop.
Each product returned should have an:
id - an incrementing number,
title - the word “Product ” + id
price - a random whole number between 1 and 1000 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Requirement 2 - Orders Endpoint
Create a REST API that returns JSON. Then endpoint should be a POST call called “/orders”
The order request payload should have
userId - a number (example: “1234”)
products - a list of products that will be ordered (example: 2,4,6,8,10)
The order endpoint will call a product endpoint to look up the price for the products being ordered
Assume the product endpoint is on a different server, so you will have to call the products endpoint over HTTP.
The order response payload should have the same payload as the request payload but with the price of each product added to it. */
const express_1 = __importDefault(require("express"));
const leads_1 = __importDefault(require("./leads/leads"));
const app = (0, express_1.default)();
// IMPORTANT MIDDLEWARE IS EXECUTED IN DEFINITION ORDER , DO NOT DEFINE ROUTES BEFORE GLOBAL MIDDLEWARE, EXPRESS JSON IS NECESARY TO PARSE INCOMING REQUESTS
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false })); // this is for form submissions
app.use((err, _req, res, _next) => {
    res.status(500).send(err.message);
});
app.use("/leads", leads_1.default);
app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
});
