"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var mongoose_1 = __importDefault(require("mongoose"));
var port = 3000;
console.log(process.env.MONGO_URL);
mongoose_1.default.connect(process.env.MONGO_URL).then(function () {
    console.log("Connected to Mongo");
    app_1.app.listen(port, function () {
        console.log("Server is running on port ".concat(port));
    });
});
