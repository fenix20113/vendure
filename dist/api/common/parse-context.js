"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseContext = void 0;
const graphql_1 = require("@nestjs/graphql");
/**
 * Parses in the Nest ExecutionContext of the incoming request, accounting for both
 * GraphQL & REST requests.
 */
function parseContext(context) {
    const graphQlContext = graphql_1.GqlExecutionContext.create(context);
    const info = graphQlContext.getInfo();
    let req;
    let res;
    if (info) {
        const ctx = graphQlContext.getContext();
        req = ctx.req;
        res = ctx.res;
    }
    else {
        req = context.switchToHttp().getRequest();
        res = context.switchToHttp().getResponse();
    }
    return {
        req,
        res,
        info,
        isGraphQL: !!info,
    };
}
exports.parseContext = parseContext;
//# sourceMappingURL=parse-context.js.map