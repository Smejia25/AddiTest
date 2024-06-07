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
const mockLeads_1 = require("./mockLeads");
const router = express_1.default.Router();
const leads = mockLeads_1.MOCKLEADS;
router.get("/", (_req, res, _next) => {
    res.header("Content-Type", "application/json");
    res.json(leads);
});
router.post("/nationalRegistryCheck", (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body && req.body.id) {
        res.header("Content-Type", "application/json");
        console.log(req.body);
        const randomBoolean = Math.random() < 0.5;
        res.json({ check: randomBoolean });
    }
    else
        res.status(500);
}));
router.post("/judicialCheck", (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body && req.body.id) {
        res.header("Content-Type", "application/json");
        const randomBoolean = Math.random() < 0.5;
        res.json({ check: randomBoolean });
    }
    else
        res.status(500);
}));
router.post("/scoreCheck", (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body && req.body.id) {
        res.header("Content-Type", "application/json");
        const score = Math.floor(Math.random() * 100) + 40;
        res.json({ score });
    }
    else
        res.status(500);
}));
exports.default = router;
