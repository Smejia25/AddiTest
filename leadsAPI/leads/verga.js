"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const products = [];
const createProducts = () => {
    for (let i = 2; i < 1000; i++) {
        const obj = {
            id: i,
            title: `Product ${i}`,
            price: Math.floor(Math.random() * 1000),
        };
        products.push(obj);
    }
};
createProducts();
router.get("/products", (_req, res, _next) => {
    res.header("Content-Type", "application/json");
    res.json(products);
});
router.post("/orders", (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body && req.body.products) {
        const reqProducts = [...req.body.products];
        const userId = req.body.userId;
        const products = yield fetch("http://localhost:3000/verga/products").then((req) => req.json());
        for (let i = 0; i < reqProducts.length; i++) {
            const price = products.find((item) => {
                return item.id === reqProducts[i];
            });
            const itemWithPrice = { id: reqProducts[i], price: price };
            reqProducts[i] = itemWithPrice;
        }
        const resBody = { userId, products: reqProducts };
        res.json(resBody);
    }
    else
        res.status(500);
}));
exports.default = router;
