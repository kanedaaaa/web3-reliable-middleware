"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./index");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    (0, index_1.main)();
    res.status(200).send("working");
});
app.listen(8080, () => {
    console.log("server is running at port 8080");
});
