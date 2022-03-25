"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAttachments = exports.serializeAttachments = void 0;
const url_1 = require("url");
async function serializeAttachments(attachments) {
    const promises = attachments.map(async (a) => {
        const stringPath = typeof a.path === 'string' ? a.path : url_1.format(a.path);
        return Object.assign(Object.assign({ filename: null, cid: null, encoding: null, contentType: null, contentTransferEncoding: null, contentDisposition: null, headers: null }, a), { path: stringPath });
    });
    return Promise.all(promises);
}
exports.serializeAttachments = serializeAttachments;
function deserializeAttachments(serializedAttachments) {
    return serializedAttachments.map(a => {
        return {
            filename: nullToUndefined(a.filename),
            cid: nullToUndefined(a.cid),
            encoding: nullToUndefined(a.encoding),
            contentType: nullToUndefined(a.contentType),
            contentTransferEncoding: nullToUndefined(a.contentTransferEncoding),
            contentDisposition: nullToUndefined(a.contentDisposition),
            headers: nullToUndefined(a.headers),
            path: a.path,
        };
    });
}
exports.deserializeAttachments = deserializeAttachments;
function nullToUndefined(input) {
    return input == null ? undefined : input;
}
//# sourceMappingURL=attachment-utils.js.map