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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
var supertest_1 = __importDefault(require("supertest"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var request = (0, supertest_1.default)(app_1.app);
describe('Testing the testing environment', function () {
    it('should check that true is true', function () {
        expect(true).toBe(true);
    });
});
describe('Testing the app endpoints', function () {
    console.log(process.env.MONGO_URL_TEST, 'mongo url test');
    beforeAll(function (done) {
        console.log('This gets run before all tests in this suite');
        mongoose_1.default.connect(process.env.MONGO_URL_TEST).then(function () {
            console.log('Connected to the test database');
            done();
        });
    });
    it('should check that the GET /test endpoint returns a success message', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/test')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.message).toBe('Test successful');
                    return [2 /*return*/];
            }
        });
    }); });
    var validProduct = {
        name: 'Test Product',
        price: 200,
    };
    var _id = null;
    it('should check that the POST /products endpoint creates a new product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/products').send(validProduct)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    expect(response.body._id).toBeDefined();
                    expect(response.body.name).toBeDefined();
                    expect(response.body.price).toBeDefined();
                    _id = response.body._id;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check that the GET /products endpoint returns a list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/products')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check that the GET /products/:id returns a valid product with a valid id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/products/".concat(_id))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body._id).toBe(_id);
                    expect(response.body.name).toBe(validProduct.name);
                    expect(response.body.price).toBe(validProduct.price);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check that the GET /products/:id returns a 404 without a valid id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/products/999999999999999999999999")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    var validUpdate = {
        name: 'Test Product Updated',
    };
    it('should check that a valid PUT /products/:id update request gets executed correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.put("/products/".concat(_id)).send(validUpdate)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.name).toBe(validUpdate.name);
                    expect(typeof response.body.name).toBe('string');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check that a valid PUT /products/:id update request gets 404 on an invalid ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put("/products/444444444444444444444444")
                        .send(validUpdate)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check that the DELETE /products/:id returns a valid product with a valid id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, deleteProductResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete("/products/".concat(_id))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(204);
                    return [4 /*yield*/, request.get("/products/".concat(_id))];
                case 2:
                    deleteProductResponse = _a.sent();
                    expect(deleteProductResponse.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check that the DELETE /products/:id returns a 404 without a valid id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete("/products/999999999999999999999999")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function (done) {
        mongoose_1.default.connection
            .dropDatabase()
            .then(function () {
            return mongoose_1.default.connection.close();
        })
            .then(function () {
            done();
        });
    });
});
