"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestClient = void 0;
var singleton_1 = require("./lib/bootpay/singleton");
var axios_1 = require("axios");
var support_1 = require("./lib/bootpay/support");
var API_URL = {
    development: 'https://dev-api.bootpay.co.kr',
    stage: 'https://stage-api.bootpay.co.kr',
    production: 'https://api.bootpay.co.kr'
};
var BootpayRestClient = /** @class */ (function (_super) {
    __extends(BootpayRestClient, _super);
    function BootpayRestClient() {
        var _this = _super.call(this) || this;
        _this.mode = 'production';
        _this.$token = undefined;
        _this.$http = axios_1.default.create({
            timeout: 60000
        });
        _this.$http.interceptors.response.use(function (response) {
            if ((0, support_1.isPresent)(response.request) && (0, support_1.isPresent)(response.headers)) {
                return response.data;
            }
            else {
                return {
                    code: -100,
                    status: 500,
                    message: "\uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. ".concat(response),
                    data: response
                };
            }
        }, function (error) {
            if ((0, support_1.isPresent)(error.response)) {
                return Promise.reject(error.response.data);
            }
            else {
                return Promise.reject({
                    code: -100,
                    message: "\uD1B5\uC2E0\uC624\uB958\uAC00 \uBC1C\uC0DD\uD558\uC600\uC2B5\uB2C8\uB2E4. ".concat(error.message),
                    status: 500
                });
            }
        });
        return _this;
        // this.$http.interceptors.request.use((config: AxiosRequestConfig) => {
        //     if (isPresent(this.$token)) {
        //         config.headers.authorization = this.$token
        //     }
        //     config.headers['Content-Type'] = 'application/json'
        //     config.headers['Accept'] = 'application/json'
        //     return config
        // }, (error) => {
        //     return Promise.reject(error)
        // })
    }
    /**
     * rest api configure
     * Comment by rumi
     * @date: 2020-10-27
     * @param (applicationId, privateKey, mode)
     * @returns void
     */
    BootpayRestClient.prototype.setConfig = function (applicationId, privateKey, mode) {
        if (mode === void 0) { mode = 'production'; }
        this.applicationId = applicationId;
        this.privateKey = privateKey;
        this.mode = (0, support_1.isPresent)(mode) ? mode : 'production';
        if ((0, support_1.isBlank)(API_URL[this.mode])) {
            throw new Error("\uD658\uACBD\uC124\uC815 \uC124\uC815\uC774 \uC798\uBABB\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uC124\uC815\uB41C \uBAA8\uB4DC: ".concat(this.mode, ", \uAC00\uB2A5\uD55C \uBAA8\uB4DC: development, stage, production"));
        }
        return;
    };
    /**
     * getting access token
     * Comment by rumi
     * @date: 2020-10-27
     * @param void
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.post(this.getApiUrl('request/token'), {
                                application_id: this.applicationId,
                                private_key: this.privateKey
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 3:
                        this.$token = response.data.token;
                        return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * receipt verify
     * Comment by rumi
     * @date: 2020-10-27
     * @param receiptId
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.verify = function (receiptId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.get(this.getApiUrl("receipt/".concat(receiptId)))];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_2)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * Server Submit method
     * Comment by rumi
     * @date: 2020-10-27
     * @param receiptId
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.submit = function (receiptId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.post(this.getApiUrl('submit'), { receipt_id: receiptId })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_3)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * Payment Cancel
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayCancelData
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.cancel = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.post(this.getApiUrl('cancel'), {
                                receipt_id: data.receiptId,
                                price: data.price,
                                tax_free: data.taxFree,
                                name: data.name,
                                reason: data.reason,
                                refund: data.refund
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_4)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * Request Subscribe Card Billing Key
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpaySubscribeBillingData
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.requestSubscribeBillingKey = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.post(this.getApiUrl('request/card_rebill'), {
                                order_id: data.orderId,
                                pg: data.pg,
                                item_name: data.itemName,
                                card_no: data.cardNo,
                                card_pw: data.cardPw,
                                expire_year: data.expireYear,
                                expire_month: data.expireMonth,
                                identify_number: data.identifyNumber,
                                user_info: data.userInfo,
                                extra: (0, support_1.objectKeyToUnderscore)(data.extra)
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_5)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * destroy billing key
     * Comment by rumi
     * @date: 2020-10-27
     * @param billingKey: string
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.destroySubscribeBillingKey = function (billingKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.delete(this.getApiUrl("subscribe/billing/".concat(billingKey)))];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_6)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * subscribe payment by billing key
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayRequestSubscribeBillingPaymentData
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.requestSubscribeBillingPayment = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.post(this.getApiUrl('subscribe/billing'), {
                                billing_key: data.billingKey,
                                order_id: data.orderId,
                                item_name: data.itemName,
                                price: data.price,
                                tax_free: data.taxFree,
                                interest: data.interest,
                                quota: data.quota,
                                items: (0, support_1.objectKeyToUnderscore)(data.items),
                                user_info: (0, support_1.objectKeyToUnderscore)(data.userInfo),
                                feedback_url: data.feedbackUrl,
                                feedback_content_type: data.feedbackContentType,
                                extra: data.extra
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_7)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * reserve payment by billing key
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayReserveSubscribeBillingData
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.reserveSubscribeBilling = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.post(this.getApiUrl('subscribe/billing/reserve'), {
                                billing_key: data.billingKey,
                                order_id: data.orderId,
                                price: data.price,
                                tax_free: data.taxFree,
                                user_info: (0, support_1.objectKeyToUnderscore)(data.userInfo),
                                item_info: (0, support_1.objectKeyToUnderscore)(data.items),
                                item_name: data.itemName,
                                feedback_url: data.feedbackUrl,
                                feedback_content_type: data.feedbackContentType,
                                scheduler_type: data.schedulerType,
                                execute_at: data.executeAt
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_8)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * Cancel Reserve Subscribe Billing
     * Comment by rumi
     * @date: 2020-10-27
     * @param reserveId: string
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.destroyReserveSubscribeBilling = function (reserveId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.delete(this.getApiUrl("subscribe/billing/reserve/".concat(reserveId)))];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_9 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_9)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * Certificate Data
     * Comment by rumi
     * @date: 2020-10-27
     * @param receiptId: string
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.certificate = function (receiptId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.get(this.getApiUrl("certificate/".concat(receiptId)))];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_10 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_10)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * REST API로 결제 요청을 합니다
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: any
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.requestPayment = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.post(this.getApiUrl('request/payment'), {
                                pg: data.pg,
                                method: data.method,
                                methods: data.methods,
                                order_id: data.orderId,
                                price: data.price,
                                params: data.params,
                                tax_free: data.taxFree,
                                name: data.itemName,
                                user_info: (0, support_1.objectKeyToUnderscore)(data.userInfo),
                                items: (0, support_1.objectKeyToUnderscore)(data.items),
                                return_url: data.returnUrl,
                                extra: (0, support_1.objectKeyToUnderscore)(data.extra)
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_11 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_11)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    /**
     * get user token
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayRequestUserTokenData
     * @returns Promise<BootpayCommonResponse>
     */
    BootpayRestClient.prototype.requestUserToken = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.$http.post(this.getApiUrl('request/user/token'), {
                                user_id: data.userId,
                                email: data.email,
                                name: data.name,
                                gender: data.gender,
                                birth: data.birth,
                                phone: data.phone
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_12 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_12)];
                    case 3: return [2 /*return*/, Promise.resolve(response)];
                }
            });
        });
    };
    BootpayRestClient.prototype.getApiUrl = function (uri) {
        return [API_URL[this.mode], uri].join('/');
    };
    return BootpayRestClient;
}(singleton_1.BootpaySingleton));
exports.RestClient = BootpayRestClient.currentInstance();
