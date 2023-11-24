"use strict";
/*

Author: F3NAI
Contributors:

*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const api_urls = __importStar(require("../api.config.json"));
const Priority_1 = __importDefault(require("../functions/Priority"));
function throwErr(e) {
    // because if i throw in the code itself it wont run the next code, just use this
    throw new Error(e);
}
class PushClient {
    constructor(input, config) {
        this.settings = {
            "token": "",
            "user": "",
        };
        this.config = {
            emergency: {
                expire: 120, // in seconds
                retry: 30 // in seconds
            }
        };
        const { token, user } = input;
        if (!token)
            throw new Error("PushClient Error: Missing TOKEN parameter while initializing!");
        if (!user)
            throw new Error("PushClient Error: Missing USER parameter while initializing!");
        if (config) {
            this.config = config;
        }
        this.settings = input;
        this.setup();
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response_1 = yield axios_1.default.post(api_urls.VALIDATE, this.settings);
                const data = yield response_1.data;
                if (response_1.status == 1) {
                    return;
                }
            }
            catch (err) {
                // ## if its not true;
                let ErrorMessage = "PushClient Error: FAILVALIDATION Server failed to validate your credentials: \n" + err;
                throw new Error(ErrorMessage);
            }
        });
    }
    send(params, userToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let sending = params;
            if (!sending.message) {
                throwErr("PushClient Error: NOMSG No message was specified. The notification was not sent!");
                return false;
            }
            sending.priority = (0, Priority_1.default)(sending.priority);
            sending.token = this.settings.token;
            sending.user = userToken || this.settings.user;
            if (sending.priority == 2 && !sending.retry && !sending.expire) {
                // The api requires for us to add 'retry' and 'expire' parameters if its an emergency priority notification
                sending.retry = this.config.emergency.retry;
                sending.expire = this.config.emergency.expire;
            }
            try {
                const SendRequest = yield axios_1.default.post(api_urls.PUSH_MSG, sending);
                const data = yield SendRequest.data;
                if (data.status == 1)
                    return true;
                return false;
                // ## If it returns something other than 1 (which is success) then we do these
            }
            catch (e) {
                let ErrorMessage = "PushClient Error: FAILREQSEND Request failed to send: \n" + e;
                throwErr(ErrorMessage);
                return false;
            }
        });
    }
}
module.exports = PushClient;
