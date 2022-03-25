"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSessionToken = void 0;
const ms_1 = __importDefault(require("ms"));
/**
 * Sets the authToken either as a cookie or as a response header, depending on the
 * config settings.
 */
function setSessionToken(options) {
    const { sessionToken, rememberMe, authOptions, req, res } = options;
    if (authOptions.tokenMethod === 'cookie') {
        if (req.session) {
            if (rememberMe) {
                req.sessionOptions.maxAge = ms_1.default('1y');
            }
            req.session.token = sessionToken;
        }
    }
    else {
        res.set(authOptions.authTokenHeaderKey, sessionToken);
    }
}
exports.setSessionToken = setSessionToken;
//# sourceMappingURL=set-session-token.js.map