(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/operators'), require('apollo-angular'), require('@angular/common/http'), require('@vendure/common/lib/simple-deep-clone'), require('@apollo/client/core'), require('@vendure/common/lib/shared-utils'), require('rxjs'), require('graphql'), require('@vendure/common/lib/pick'), require('@angular/platform-browser'), require('@angular/platform-browser/animations'), require('@ngx-translate/core'), require('ngx-translate-messageformat-compiler'), require('@angular/router'), require('@vendure/common/lib/shared-constants'), require('lodash'), require('@angular/forms'), require('@biesbjerg/ngx-translate-extract-marker'), require('@apollo/client/link/context'), require('@apollo/client/link/core'), require('apollo-upload-client'), require('@vendure/common/lib/omit'), require('@angular/cdk/drag-drop'), require('@angular/cdk/overlay'), require('@clr/angular'), require('@clr/icons'), require('@clr/icons/shapes/all-shapes'), require('@ng-select/ng-select'), require('@webcomponents/custom-elements/custom-elements.min.js'), require('ngx-pagination'), require('dayjs'), require('@angular/cdk/portal'), require('prosemirror-commands'), require('prosemirror-dropcursor'), require('prosemirror-gapcursor'), require('prosemirror-history'), require('prosemirror-keymap'), require('prosemirror-menu'), require('prosemirror-model'), require('prosemirror-schema-basic'), require('prosemirror-schema-list'), require('prosemirror-state'), require('prosemirror-view'), require('prosemirror-inputrules')) :
    typeof define === 'function' && define.amd ? define('@vendure/admin-ui/core', ['exports', '@angular/core', '@angular/common', 'rxjs/operators', 'apollo-angular', '@angular/common/http', '@vendure/common/lib/simple-deep-clone', '@apollo/client/core', '@vendure/common/lib/shared-utils', 'rxjs', 'graphql', '@vendure/common/lib/pick', '@angular/platform-browser', '@angular/platform-browser/animations', '@ngx-translate/core', 'ngx-translate-messageformat-compiler', '@angular/router', '@vendure/common/lib/shared-constants', 'lodash', '@angular/forms', '@biesbjerg/ngx-translate-extract-marker', '@apollo/client/link/context', '@apollo/client/link/core', 'apollo-upload-client', '@vendure/common/lib/omit', '@angular/cdk/drag-drop', '@angular/cdk/overlay', '@clr/angular', '@clr/icons', '@clr/icons/shapes/all-shapes', '@ng-select/ng-select', '@webcomponents/custom-elements/custom-elements.min.js', 'ngx-pagination', 'dayjs', '@angular/cdk/portal', 'prosemirror-commands', 'prosemirror-dropcursor', 'prosemirror-gapcursor', 'prosemirror-history', 'prosemirror-keymap', 'prosemirror-menu', 'prosemirror-model', 'prosemirror-schema-basic', 'prosemirror-schema-list', 'prosemirror-state', 'prosemirror-view', 'prosemirror-inputrules'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vendure = global.vendure || {}, global.vendure['admin-ui'] = global.vendure['admin-ui'] || {}, global.vendure['admin-ui'].core = {}), global.ng.core, global.ng.common, global.rxjs.operators, global.apolloAngular, global.ng.common.http, global.simpleDeepClone, global.core, global.sharedUtils, global.rxjs, global.graphql, global.pick, global.ng.platformBrowser, global.ng.platformBrowser.animations, global.i1$2, global.i1$4, global.ng.router, global.sharedConstants, global.lodash, global.ng.forms, global.ngxTranslateExtractMarker, global.context, global.core$1, global.apolloUploadClient, global.omit, global.ng.cdk.dragDrop, global.ng.cdk.overlay, global.angular, null, null, global.ngSelect, null, global.ngxPagination, global.dayjs, global.ng.cdk.portal, global.prosemirrorCommands, global.prosemirrorDropcursor, global.prosemirrorGapcursor, global.prosemirrorHistory, global.prosemirrorKeymap, global.prosemirrorMenu, global.prosemirrorModel, global.prosemirrorSchemaBasic, global.prosemirrorSchemaList, global.prosemirrorState, global.prosemirrorView, global.prosemirrorInputrules));
}(this, (function (exports, i0, i1, operators, apolloAngular, i1$1, simpleDeepClone, core, sharedUtils, rxjs, graphql, pick, platformBrowser, animations, i1$2, i1$4, i1$3, sharedConstants, lodash, forms, ngxTranslateExtractMarker, context, core$1, apolloUploadClient, omit, dragDrop, overlay, angular, icons, allShapes, ngSelect, customElements_min_js, ngxPagination, dayjs, portal, prosemirrorCommands, prosemirrorDropcursor, prosemirrorGapcursor, prosemirrorHistory, prosemirrorKeymap, prosemirrorMenu, prosemirrorModel, prosemirrorSchemaBasic, prosemirrorSchemaList, prosemirrorState, prosemirrorView, prosemirrorInputrules) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var ROLE_FRAGMENT = apolloAngular.gql(templateObject_1$b || (templateObject_1$b = __makeTemplateObject(["\n    fragment Role on Role {\n        id\n        createdAt\n        updatedAt\n        code\n        description\n        permissions\n        channels {\n            id\n            code\n            token\n        }\n    }\n"], ["\n    fragment Role on Role {\n        id\n        createdAt\n        updatedAt\n        code\n        description\n        permissions\n        channels {\n            id\n            code\n            token\n        }\n    }\n"])));
    var ADMINISTRATOR_FRAGMENT = apolloAngular.gql(templateObject_2$b || (templateObject_2$b = __makeTemplateObject(["\n    fragment Administrator on Administrator {\n        id\n        createdAt\n        updatedAt\n        firstName\n        lastName\n        emailAddress\n        user {\n            id\n            identifier\n            lastLogin\n            roles {\n                ...Role\n            }\n        }\n    }\n    ", "\n"], ["\n    fragment Administrator on Administrator {\n        id\n        createdAt\n        updatedAt\n        firstName\n        lastName\n        emailAddress\n        user {\n            id\n            identifier\n            lastLogin\n            roles {\n                ...Role\n            }\n        }\n    }\n    ", "\n"])), ROLE_FRAGMENT);
    var GET_ADMINISTRATORS = apolloAngular.gql(templateObject_3$b || (templateObject_3$b = __makeTemplateObject(["\n    query GetAdministrators($options: AdministratorListOptions) {\n        administrators(options: $options) {\n            items {\n                ...Administrator\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetAdministrators($options: AdministratorListOptions) {\n        administrators(options: $options) {\n            items {\n                ...Administrator\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), ADMINISTRATOR_FRAGMENT);
    var GET_ACTIVE_ADMINISTRATOR = apolloAngular.gql(templateObject_4$a || (templateObject_4$a = __makeTemplateObject(["\n    query GetActiveAdministrator {\n        activeAdministrator {\n            ...Administrator\n        }\n    }\n    ", "\n"], ["\n    query GetActiveAdministrator {\n        activeAdministrator {\n            ...Administrator\n        }\n    }\n    ", "\n"])), ADMINISTRATOR_FRAGMENT);
    var GET_ADMINISTRATOR = apolloAngular.gql(templateObject_5$9 || (templateObject_5$9 = __makeTemplateObject(["\n    query GetAdministrator($id: ID!) {\n        administrator(id: $id) {\n            ...Administrator\n        }\n    }\n    ", "\n"], ["\n    query GetAdministrator($id: ID!) {\n        administrator(id: $id) {\n            ...Administrator\n        }\n    }\n    ", "\n"])), ADMINISTRATOR_FRAGMENT);
    var CREATE_ADMINISTRATOR = apolloAngular.gql(templateObject_6$9 || (templateObject_6$9 = __makeTemplateObject(["\n    mutation CreateAdministrator($input: CreateAdministratorInput!) {\n        createAdministrator(input: $input) {\n            ...Administrator\n        }\n    }\n    ", "\n"], ["\n    mutation CreateAdministrator($input: CreateAdministratorInput!) {\n        createAdministrator(input: $input) {\n            ...Administrator\n        }\n    }\n    ", "\n"])), ADMINISTRATOR_FRAGMENT);
    var UPDATE_ADMINISTRATOR = apolloAngular.gql(templateObject_7$9 || (templateObject_7$9 = __makeTemplateObject(["\n    mutation UpdateAdministrator($input: UpdateAdministratorInput!) {\n        updateAdministrator(input: $input) {\n            ...Administrator\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateAdministrator($input: UpdateAdministratorInput!) {\n        updateAdministrator(input: $input) {\n            ...Administrator\n        }\n    }\n    ", "\n"])), ADMINISTRATOR_FRAGMENT);
    var UPDATE_ACTIVE_ADMINISTRATOR = apolloAngular.gql(templateObject_8$8 || (templateObject_8$8 = __makeTemplateObject(["\n    mutation UpdateActiveAdministrator($input: UpdateActiveAdministratorInput!) {\n        updateActiveAdministrator(input: $input) {\n            ...Administrator\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateActiveAdministrator($input: UpdateActiveAdministratorInput!) {\n        updateActiveAdministrator(input: $input) {\n            ...Administrator\n        }\n    }\n    ", "\n"])), ADMINISTRATOR_FRAGMENT);
    var DELETE_ADMINISTRATOR = apolloAngular.gql(templateObject_9$8 || (templateObject_9$8 = __makeTemplateObject(["\n    mutation DeleteAdministrator($id: ID!) {\n        deleteAdministrator(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteAdministrator($id: ID!) {\n        deleteAdministrator(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var GET_ROLES = apolloAngular.gql(templateObject_10$6 || (templateObject_10$6 = __makeTemplateObject(["\n    query GetRoles($options: RoleListOptions) {\n        roles(options: $options) {\n            items {\n                ...Role\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetRoles($options: RoleListOptions) {\n        roles(options: $options) {\n            items {\n                ...Role\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), ROLE_FRAGMENT);
    var GET_ROLE = apolloAngular.gql(templateObject_11$5 || (templateObject_11$5 = __makeTemplateObject(["\n    query GetRole($id: ID!) {\n        role(id: $id) {\n            ...Role\n        }\n    }\n    ", "\n"], ["\n    query GetRole($id: ID!) {\n        role(id: $id) {\n            ...Role\n        }\n    }\n    ", "\n"])), ROLE_FRAGMENT);
    var CREATE_ROLE = apolloAngular.gql(templateObject_12$5 || (templateObject_12$5 = __makeTemplateObject(["\n    mutation CreateRole($input: CreateRoleInput!) {\n        createRole(input: $input) {\n            ...Role\n        }\n    }\n    ", "\n"], ["\n    mutation CreateRole($input: CreateRoleInput!) {\n        createRole(input: $input) {\n            ...Role\n        }\n    }\n    ", "\n"])), ROLE_FRAGMENT);
    var UPDATE_ROLE = apolloAngular.gql(templateObject_13$5 || (templateObject_13$5 = __makeTemplateObject(["\n    mutation UpdateRole($input: UpdateRoleInput!) {\n        updateRole(input: $input) {\n            ...Role\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateRole($input: UpdateRoleInput!) {\n        updateRole(input: $input) {\n            ...Role\n        }\n    }\n    ", "\n"])), ROLE_FRAGMENT);
    var DELETE_ROLE = apolloAngular.gql(templateObject_14$4 || (templateObject_14$4 = __makeTemplateObject(["\n    mutation DeleteRole($id: ID!) {\n        deleteRole(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteRole($id: ID!) {\n        deleteRole(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var ASSIGN_ROLE_TO_ADMINISTRATOR = apolloAngular.gql(templateObject_15$4 || (templateObject_15$4 = __makeTemplateObject(["\n    mutation AssignRoleToAdministrator($administratorId: ID!, $roleId: ID!) {\n        assignRoleToAdministrator(administratorId: $administratorId, roleId: $roleId) {\n            ...Administrator\n        }\n    }\n    ", "\n"], ["\n    mutation AssignRoleToAdministrator($administratorId: ID!, $roleId: ID!) {\n        assignRoleToAdministrator(administratorId: $administratorId, roleId: $roleId) {\n            ...Administrator\n        }\n    }\n    ", "\n"])), ADMINISTRATOR_FRAGMENT);
    var templateObject_1$b, templateObject_2$b, templateObject_3$b, templateObject_4$a, templateObject_5$9, templateObject_6$9, templateObject_7$9, templateObject_8$8, templateObject_9$8, templateObject_10$6, templateObject_11$5, templateObject_12$5, templateObject_13$5, templateObject_14$4, templateObject_15$4;

    var AdministratorDataService = /** @class */ (function () {
        function AdministratorDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        AdministratorDataService.prototype.getAdministrators = function (take, skip) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(GET_ADMINISTRATORS, {
                options: {
                    take: take,
                    skip: skip,
                },
            });
        };
        AdministratorDataService.prototype.getActiveAdministrator = function (fetchPolicy) {
            if (fetchPolicy === void 0) { fetchPolicy = 'cache-first'; }
            return this.baseDataService.query(GET_ACTIVE_ADMINISTRATOR, {}, fetchPolicy);
        };
        AdministratorDataService.prototype.getAdministrator = function (id) {
            return this.baseDataService.query(GET_ADMINISTRATOR, {
                id: id,
            });
        };
        AdministratorDataService.prototype.createAdministrator = function (input) {
            return this.baseDataService.mutate(CREATE_ADMINISTRATOR, { input: input });
        };
        AdministratorDataService.prototype.updateAdministrator = function (input) {
            return this.baseDataService.mutate(UPDATE_ADMINISTRATOR, { input: input });
        };
        AdministratorDataService.prototype.updateActiveAdministrator = function (input) {
            return this.baseDataService.mutate(UPDATE_ACTIVE_ADMINISTRATOR, { input: input });
        };
        AdministratorDataService.prototype.deleteAdministrator = function (id) {
            return this.baseDataService.mutate(DELETE_ADMINISTRATOR, { id: id });
        };
        AdministratorDataService.prototype.getRoles = function (take, skip) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(GET_ROLES, {
                options: {
                    take: take,
                    skip: skip,
                },
            });
        };
        AdministratorDataService.prototype.getRole = function (id) {
            return this.baseDataService.query(GET_ROLE, { id: id });
        };
        AdministratorDataService.prototype.createRole = function (input) {
            return this.baseDataService.mutate(CREATE_ROLE, { input: input });
        };
        AdministratorDataService.prototype.updateRole = function (input) {
            return this.baseDataService.mutate(UPDATE_ROLE, { input: input });
        };
        AdministratorDataService.prototype.deleteRole = function (id) {
            return this.baseDataService.mutate(DELETE_ROLE, { id: id });
        };
        return AdministratorDataService;
    }());

    var CONFIGURABLE_OPERATION_FRAGMENT = apolloAngular.gql(templateObject_1$a || (templateObject_1$a = __makeTemplateObject(["\n    fragment ConfigurableOperation on ConfigurableOperation {\n        args {\n            name\n            value\n        }\n        code\n    }\n"], ["\n    fragment ConfigurableOperation on ConfigurableOperation {\n        args {\n            name\n            value\n        }\n        code\n    }\n"])));
    var CONFIGURABLE_OPERATION_DEF_FRAGMENT = apolloAngular.gql(templateObject_2$a || (templateObject_2$a = __makeTemplateObject(["\n    fragment ConfigurableOperationDef on ConfigurableOperationDefinition {\n        args {\n            name\n            type\n            required\n            defaultValue\n            list\n            ui\n            label\n        }\n        code\n        description\n    }\n"], ["\n    fragment ConfigurableOperationDef on ConfigurableOperationDefinition {\n        args {\n            name\n            type\n            required\n            defaultValue\n            list\n            ui\n            label\n        }\n        code\n        description\n    }\n"])));
    var ERROR_RESULT_FRAGMENT = apolloAngular.gql(templateObject_3$a || (templateObject_3$a = __makeTemplateObject(["\n    fragment ErrorResult on ErrorResult {\n        errorCode\n        message\n    }\n"], ["\n    fragment ErrorResult on ErrorResult {\n        errorCode\n        message\n    }\n"])));
    var templateObject_1$a, templateObject_2$a, templateObject_3$a;

    var CURRENT_USER_FRAGMENT = apolloAngular.gql(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject(["\n    fragment CurrentUser on CurrentUser {\n        id\n        identifier\n        channels {\n            id\n            code\n            token\n            permissions\n        }\n    }\n"], ["\n    fragment CurrentUser on CurrentUser {\n        id\n        identifier\n        channels {\n            id\n            code\n            token\n            permissions\n        }\n    }\n"])));
    var ATTEMPT_LOGIN = apolloAngular.gql(templateObject_2$9 || (templateObject_2$9 = __makeTemplateObject(["\n    mutation AttemptLogin($username: String!, $password: String!, $rememberMe: Boolean!) {\n        login(username: $username, password: $password, rememberMe: $rememberMe) {\n            ...CurrentUser\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation AttemptLogin($username: String!, $password: String!, $rememberMe: Boolean!) {\n        login(username: $username, password: $password, rememberMe: $rememberMe) {\n            ...CurrentUser\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), CURRENT_USER_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var LOG_OUT = apolloAngular.gql(templateObject_3$9 || (templateObject_3$9 = __makeTemplateObject(["\n    mutation LogOut {\n        logout {\n            success\n        }\n    }\n"], ["\n    mutation LogOut {\n        logout {\n            success\n        }\n    }\n"])));
    var GET_CURRENT_USER = apolloAngular.gql(templateObject_4$9 || (templateObject_4$9 = __makeTemplateObject(["\n    query GetCurrentUser {\n        me {\n            ...CurrentUser\n        }\n    }\n    ", "\n"], ["\n    query GetCurrentUser {\n        me {\n            ...CurrentUser\n        }\n    }\n    ", "\n"])), CURRENT_USER_FRAGMENT);
    var templateObject_1$9, templateObject_2$9, templateObject_3$9, templateObject_4$9;

    var AuthDataService = /** @class */ (function () {
        function AuthDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        AuthDataService.prototype.currentUser = function () {
            return this.baseDataService.query(GET_CURRENT_USER);
        };
        AuthDataService.prototype.attemptLogin = function (username, password, rememberMe) {
            return this.baseDataService.mutate(ATTEMPT_LOGIN, {
                username: username,
                password: password,
                rememberMe: rememberMe,
            });
        };
        AuthDataService.prototype.logOut = function () {
            return this.baseDataService.mutate(LOG_OUT);
        };
        return AuthDataService;
    }());

    var PREFIX = 'vnd_';
    /**
     * Wrapper around the browser's LocalStorage / SessionStorage object, for persisting data to the browser.
     */
    var LocalStorageService = /** @class */ (function () {
        function LocalStorageService(location) {
            this.location = location;
        }
        /**
         * Set a key-value pair in the browser's LocalStorage
         */
        LocalStorageService.prototype.set = function (key, value) {
            var keyName = this.keyName(key);
            localStorage.setItem(keyName, JSON.stringify(value));
        };
        /**
         * Set a key-value pair specific to the current location (url)
         */
        LocalStorageService.prototype.setForCurrentLocation = function (key, value) {
            var compositeKey = this.getLocationBasedKey(key);
            this.set(compositeKey, value);
        };
        /**
         * Set a key-value pair in the browser's SessionStorage
         */
        LocalStorageService.prototype.setForSession = function (key, value) {
            var keyName = this.keyName(key);
            sessionStorage.setItem(keyName, JSON.stringify(value));
        };
        /**
         * Get the value of the given key from the SessionStorage or LocalStorage.
         */
        LocalStorageService.prototype.get = function (key) {
            var keyName = this.keyName(key);
            var item = sessionStorage.getItem(keyName) || localStorage.getItem(keyName);
            var result;
            try {
                result = JSON.parse(item || 'null');
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.error("Could not parse the localStorage value for \"" + key + "\" (" + item + ")");
            }
            return result;
        };
        /**
         * Get the value of the given key for the current location (url)
         */
        LocalStorageService.prototype.getForCurrentLocation = function (key) {
            var compositeKey = this.getLocationBasedKey(key);
            return this.get(compositeKey);
        };
        LocalStorageService.prototype.remove = function (key) {
            var keyName = this.keyName(key);
            sessionStorage.removeItem(keyName);
            localStorage.removeItem(keyName);
        };
        LocalStorageService.prototype.getLocationBasedKey = function (key) {
            var path = this.location.path();
            return key + path;
        };
        LocalStorageService.prototype.keyName = function (key) {
            return PREFIX + key;
        };
        return LocalStorageService;
    }());
    LocalStorageService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LocalStorageService_Factory() { return new LocalStorageService(i0.ɵɵinject(i1.Location)); }, token: LocalStorageService, providedIn: "root" });
    LocalStorageService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    LocalStorageService.ctorParameters = function () { return [
        { type: i1.Location }
    ]; };

    var REQUEST_STARTED = apolloAngular.gql(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n    mutation RequestStarted {\n        requestStarted @client\n    }\n"], ["\n    mutation RequestStarted {\n        requestStarted @client\n    }\n"])));
    var REQUEST_COMPLETED = apolloAngular.gql(templateObject_2$8 || (templateObject_2$8 = __makeTemplateObject(["\n    mutation RequestCompleted {\n        requestCompleted @client\n    }\n"], ["\n    mutation RequestCompleted {\n        requestCompleted @client\n    }\n"])));
    var USER_STATUS_FRAGMENT = apolloAngular.gql(templateObject_3$8 || (templateObject_3$8 = __makeTemplateObject(["\n    fragment UserStatus on UserStatus {\n        username\n        isLoggedIn\n        loginTime\n        activeChannelId\n        permissions\n        channels {\n            id\n            code\n            token\n            permissions\n        }\n    }\n"], ["\n    fragment UserStatus on UserStatus {\n        username\n        isLoggedIn\n        loginTime\n        activeChannelId\n        permissions\n        channels {\n            id\n            code\n            token\n            permissions\n        }\n    }\n"])));
    var SET_AS_LOGGED_IN = apolloAngular.gql(templateObject_4$8 || (templateObject_4$8 = __makeTemplateObject(["\n    mutation SetAsLoggedIn($input: UserStatusInput!) {\n        setAsLoggedIn(input: $input) @client {\n            ...UserStatus\n        }\n    }\n    ", "\n"], ["\n    mutation SetAsLoggedIn($input: UserStatusInput!) {\n        setAsLoggedIn(input: $input) @client {\n            ...UserStatus\n        }\n    }\n    ", "\n"])), USER_STATUS_FRAGMENT);
    var SET_AS_LOGGED_OUT = apolloAngular.gql(templateObject_5$8 || (templateObject_5$8 = __makeTemplateObject(["\n    mutation SetAsLoggedOut {\n        setAsLoggedOut @client {\n            ...UserStatus\n        }\n    }\n    ", "\n"], ["\n    mutation SetAsLoggedOut {\n        setAsLoggedOut @client {\n            ...UserStatus\n        }\n    }\n    ", "\n"])), USER_STATUS_FRAGMENT);
    var SET_UI_LANGUAGE = apolloAngular.gql(templateObject_6$8 || (templateObject_6$8 = __makeTemplateObject(["\n    mutation SetUiLanguage($languageCode: LanguageCode!) {\n        setUiLanguage(languageCode: $languageCode) @client\n    }\n"], ["\n    mutation SetUiLanguage($languageCode: LanguageCode!) {\n        setUiLanguage(languageCode: $languageCode) @client\n    }\n"])));
    var SET_UI_THEME = apolloAngular.gql(templateObject_7$8 || (templateObject_7$8 = __makeTemplateObject(["\n    mutation SetUiTheme($theme: String!) {\n        setUiTheme(theme: $theme) @client\n    }\n"], ["\n    mutation SetUiTheme($theme: String!) {\n        setUiTheme(theme: $theme) @client\n    }\n"])));
    var GET_NEWTORK_STATUS = apolloAngular.gql(templateObject_8$7 || (templateObject_8$7 = __makeTemplateObject(["\n    query GetNetworkStatus {\n        networkStatus @client {\n            inFlightRequests\n        }\n    }\n"], ["\n    query GetNetworkStatus {\n        networkStatus @client {\n            inFlightRequests\n        }\n    }\n"])));
    var GET_USER_STATUS = apolloAngular.gql(templateObject_9$7 || (templateObject_9$7 = __makeTemplateObject(["\n    query GetUserStatus {\n        userStatus @client {\n            ...UserStatus\n        }\n    }\n    ", "\n"], ["\n    query GetUserStatus {\n        userStatus @client {\n            ...UserStatus\n        }\n    }\n    ", "\n"])), USER_STATUS_FRAGMENT);
    var GET_UI_STATE = apolloAngular.gql(templateObject_10$5 || (templateObject_10$5 = __makeTemplateObject(["\n    query GetUiState {\n        uiState @client {\n            language\n            theme\n        }\n    }\n"], ["\n    query GetUiState {\n        uiState @client {\n            language\n            theme\n        }\n    }\n"])));
    var GET_CLIENT_STATE = apolloAngular.gql(templateObject_11$4 || (templateObject_11$4 = __makeTemplateObject(["\n    query GetClientState {\n        networkStatus @client {\n            inFlightRequests\n        }\n        userStatus @client {\n            ...UserStatus\n        }\n        uiState @client {\n            language\n            theme\n        }\n    }\n    ", "\n"], ["\n    query GetClientState {\n        networkStatus @client {\n            inFlightRequests\n        }\n        userStatus @client {\n            ...UserStatus\n        }\n        uiState @client {\n            language\n            theme\n        }\n    }\n    ", "\n"])), USER_STATUS_FRAGMENT);
    var SET_ACTIVE_CHANNEL = apolloAngular.gql(templateObject_12$4 || (templateObject_12$4 = __makeTemplateObject(["\n    mutation SetActiveChannel($channelId: ID!) {\n        setActiveChannel(channelId: $channelId) @client {\n            ...UserStatus\n        }\n    }\n    ", "\n"], ["\n    mutation SetActiveChannel($channelId: ID!) {\n        setActiveChannel(channelId: $channelId) @client {\n            ...UserStatus\n        }\n    }\n    ", "\n"])), USER_STATUS_FRAGMENT);
    var UPDATE_USER_CHANNELS = apolloAngular.gql(templateObject_13$4 || (templateObject_13$4 = __makeTemplateObject(["\n    mutation UpdateUserChannels($channels: [CurrentUserChannelInput!]!) {\n        updateUserChannels(channels: $channels) @client {\n            ...UserStatus\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateUserChannels($channels: [CurrentUserChannelInput!]!) {\n        updateUserChannels(channels: $channels) @client {\n            ...UserStatus\n        }\n    }\n    ", "\n"])), USER_STATUS_FRAGMENT);
    var templateObject_1$8, templateObject_2$8, templateObject_3$8, templateObject_4$8, templateObject_5$8, templateObject_6$8, templateObject_7$8, templateObject_8$7, templateObject_9$7, templateObject_10$5, templateObject_11$4, templateObject_12$4, templateObject_13$4;

    /**
     * This class wraps the Apollo Angular QueryRef object and exposes some getters
     * for convenience.
     */
    var QueryResult = /** @class */ (function () {
        function QueryResult(queryRef, apollo) {
            this.queryRef = queryRef;
            this.apollo = apollo;
            this.completed$ = new rxjs.Subject();
            this.valueChanges = queryRef.valueChanges;
        }
        /**
         * Refetch this query whenever the active Channel changes.
         */
        QueryResult.prototype.refetchOnChannelChange = function () {
            var _this = this;
            var userStatus$ = this.apollo.watchQuery({ query: GET_USER_STATUS })
                .valueChanges;
            var activeChannelId$ = userStatus$.pipe(operators.map(function (data) { return data.data.userStatus.activeChannelId; }), operators.filter(sharedUtils.notNullOrUndefined), operators.distinctUntilChanged(), operators.skip(1), operators.takeUntil(this.completed$));
            var loggedOut$ = userStatus$.pipe(operators.map(function (data) { return data.data.userStatus.isLoggedIn; }), operators.distinctUntilChanged(), operators.skip(1), operators.filter(function (isLoggedIn) { return !isLoggedIn; }), operators.takeUntil(this.completed$));
            this.valueChanges = rxjs.merge(activeChannelId$, this.queryRef.valueChanges).pipe(operators.tap(function (val) {
                if (typeof val === 'string') {
                    new Promise(function (resolve) { return setTimeout(resolve, 50); }).then(function () { return _this.queryRef.refetch(); });
                }
            }), operators.filter(function (val) { return typeof val !== 'string'; }), operators.takeUntil(loggedOut$), operators.takeUntil(this.completed$));
            this.queryRef.valueChanges = this.valueChanges;
            return this;
        };
        Object.defineProperty(QueryResult.prototype, "single$", {
            /**
             * Returns an Observable which emits a single result and then completes.
             */
            get: function () {
                var _this = this;
                return this.valueChanges.pipe(operators.filter(function (result) { return result.networkStatus === core.NetworkStatus.ready; }), operators.take(1), operators.map(function (result) { return result.data; }), operators.finalize(function () {
                    _this.completed$.next();
                    _this.completed$.complete();
                }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(QueryResult.prototype, "stream$", {
            /**
             * Returns an Observable which emits until unsubscribed.
             */
            get: function () {
                var _this = this;
                return this.valueChanges.pipe(operators.filter(function (result) { return result.networkStatus === core.NetworkStatus.ready; }), operators.map(function (result) { return result.data; }), operators.finalize(function () {
                    _this.completed$.next();
                    _this.completed$.complete();
                }));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(QueryResult.prototype, "ref", {
            get: function () {
                return this.queryRef;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Returns a single-result Observable after applying the map function.
         */
        QueryResult.prototype.mapSingle = function (mapFn) {
            return this.single$.pipe(operators.map(mapFn));
        };
        /**
         * Returns a multiple-result Observable after applying the map function.
         */
        QueryResult.prototype.mapStream = function (mapFn) {
            return this.stream$.pipe(operators.map(mapFn));
        };
        return QueryResult;
    }());

    var COUNTRY_FRAGMENT = apolloAngular.gql(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n    fragment Country on Country {\n        id\n        createdAt\n        updatedAt\n        code\n        name\n        enabled\n        translations {\n            id\n            languageCode\n            name\n        }\n    }\n"], ["\n    fragment Country on Country {\n        id\n        createdAt\n        updatedAt\n        code\n        name\n        enabled\n        translations {\n            id\n            languageCode\n            name\n        }\n    }\n"])));
    var GET_COUNTRY_LIST = apolloAngular.gql(templateObject_2$7 || (templateObject_2$7 = __makeTemplateObject(["\n    query GetCountryList($options: CountryListOptions) {\n        countries(options: $options) {\n            items {\n                id\n                code\n                name\n                enabled\n            }\n            totalItems\n        }\n    }\n"], ["\n    query GetCountryList($options: CountryListOptions) {\n        countries(options: $options) {\n            items {\n                id\n                code\n                name\n                enabled\n            }\n            totalItems\n        }\n    }\n"])));
    var GET_AVAILABLE_COUNTRIES = apolloAngular.gql(templateObject_3$7 || (templateObject_3$7 = __makeTemplateObject(["\n    query GetAvailableCountries {\n        countries(options: { filter: { enabled: { eq: true } } }) {\n            items {\n                id\n                code\n                name\n                enabled\n            }\n        }\n    }\n"], ["\n    query GetAvailableCountries {\n        countries(options: { filter: { enabled: { eq: true } } }) {\n            items {\n                id\n                code\n                name\n                enabled\n            }\n        }\n    }\n"])));
    var GET_COUNTRY = apolloAngular.gql(templateObject_4$7 || (templateObject_4$7 = __makeTemplateObject(["\n    query GetCountry($id: ID!) {\n        country(id: $id) {\n            ...Country\n        }\n    }\n    ", "\n"], ["\n    query GetCountry($id: ID!) {\n        country(id: $id) {\n            ...Country\n        }\n    }\n    ", "\n"])), COUNTRY_FRAGMENT);
    var CREATE_COUNTRY = apolloAngular.gql(templateObject_5$7 || (templateObject_5$7 = __makeTemplateObject(["\n    mutation CreateCountry($input: CreateCountryInput!) {\n        createCountry(input: $input) {\n            ...Country\n        }\n    }\n    ", "\n"], ["\n    mutation CreateCountry($input: CreateCountryInput!) {\n        createCountry(input: $input) {\n            ...Country\n        }\n    }\n    ", "\n"])), COUNTRY_FRAGMENT);
    var UPDATE_COUNTRY = apolloAngular.gql(templateObject_6$7 || (templateObject_6$7 = __makeTemplateObject(["\n    mutation UpdateCountry($input: UpdateCountryInput!) {\n        updateCountry(input: $input) {\n            ...Country\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateCountry($input: UpdateCountryInput!) {\n        updateCountry(input: $input) {\n            ...Country\n        }\n    }\n    ", "\n"])), COUNTRY_FRAGMENT);
    var DELETE_COUNTRY = apolloAngular.gql(templateObject_7$7 || (templateObject_7$7 = __makeTemplateObject(["\n    mutation DeleteCountry($id: ID!) {\n        deleteCountry(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteCountry($id: ID!) {\n        deleteCountry(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var ZONE_FRAGMENT = apolloAngular.gql(templateObject_8$6 || (templateObject_8$6 = __makeTemplateObject(["\n    fragment Zone on Zone {\n        id\n        name\n        members {\n            ...Country\n        }\n    }\n    ", "\n"], ["\n    fragment Zone on Zone {\n        id\n        name\n        members {\n            ...Country\n        }\n    }\n    ", "\n"])), COUNTRY_FRAGMENT);
    var GET_ZONES = apolloAngular.gql(templateObject_9$6 || (templateObject_9$6 = __makeTemplateObject(["\n    query GetZones {\n        zones {\n            id\n            createdAt\n            updatedAt\n            name\n            members {\n                createdAt\n                updatedAt\n                id\n                name\n                code\n                enabled\n            }\n        }\n    }\n"], ["\n    query GetZones {\n        zones {\n            id\n            createdAt\n            updatedAt\n            name\n            members {\n                createdAt\n                updatedAt\n                id\n                name\n                code\n                enabled\n            }\n        }\n    }\n"])));
    var GET_ZONE = apolloAngular.gql(templateObject_10$4 || (templateObject_10$4 = __makeTemplateObject(["\n    query GetZone($id: ID!) {\n        zone(id: $id) {\n            ...Zone\n        }\n    }\n    ", "\n"], ["\n    query GetZone($id: ID!) {\n        zone(id: $id) {\n            ...Zone\n        }\n    }\n    ", "\n"])), ZONE_FRAGMENT);
    var CREATE_ZONE = apolloAngular.gql(templateObject_11$3 || (templateObject_11$3 = __makeTemplateObject(["\n    mutation CreateZone($input: CreateZoneInput!) {\n        createZone(input: $input) {\n            ...Zone\n        }\n    }\n    ", "\n"], ["\n    mutation CreateZone($input: CreateZoneInput!) {\n        createZone(input: $input) {\n            ...Zone\n        }\n    }\n    ", "\n"])), ZONE_FRAGMENT);
    var UPDATE_ZONE = apolloAngular.gql(templateObject_12$3 || (templateObject_12$3 = __makeTemplateObject(["\n    mutation UpdateZone($input: UpdateZoneInput!) {\n        updateZone(input: $input) {\n            ...Zone\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateZone($input: UpdateZoneInput!) {\n        updateZone(input: $input) {\n            ...Zone\n        }\n    }\n    ", "\n"])), ZONE_FRAGMENT);
    var DELETE_ZONE = apolloAngular.gql(templateObject_13$3 || (templateObject_13$3 = __makeTemplateObject(["\n    mutation DeleteZone($id: ID!) {\n        deleteZone(id: $id) {\n            message\n            result\n        }\n    }\n"], ["\n    mutation DeleteZone($id: ID!) {\n        deleteZone(id: $id) {\n            message\n            result\n        }\n    }\n"])));
    var ADD_MEMBERS_TO_ZONE = apolloAngular.gql(templateObject_14$3 || (templateObject_14$3 = __makeTemplateObject(["\n    mutation AddMembersToZone($zoneId: ID!, $memberIds: [ID!]!) {\n        addMembersToZone(zoneId: $zoneId, memberIds: $memberIds) {\n            ...Zone\n        }\n    }\n    ", "\n"], ["\n    mutation AddMembersToZone($zoneId: ID!, $memberIds: [ID!]!) {\n        addMembersToZone(zoneId: $zoneId, memberIds: $memberIds) {\n            ...Zone\n        }\n    }\n    ", "\n"])), ZONE_FRAGMENT);
    var REMOVE_MEMBERS_FROM_ZONE = apolloAngular.gql(templateObject_15$3 || (templateObject_15$3 = __makeTemplateObject(["\n    mutation RemoveMembersFromZone($zoneId: ID!, $memberIds: [ID!]!) {\n        removeMembersFromZone(zoneId: $zoneId, memberIds: $memberIds) {\n            ...Zone\n        }\n    }\n    ", "\n"], ["\n    mutation RemoveMembersFromZone($zoneId: ID!, $memberIds: [ID!]!) {\n        removeMembersFromZone(zoneId: $zoneId, memberIds: $memberIds) {\n            ...Zone\n        }\n    }\n    ", "\n"])), ZONE_FRAGMENT);
    var TAX_CATEGORY_FRAGMENT = apolloAngular.gql(templateObject_16$3 || (templateObject_16$3 = __makeTemplateObject(["\n    fragment TaxCategory on TaxCategory {\n        id\n        createdAt\n        updatedAt\n        name\n        isDefault\n    }\n"], ["\n    fragment TaxCategory on TaxCategory {\n        id\n        createdAt\n        updatedAt\n        name\n        isDefault\n    }\n"])));
    var GET_TAX_CATEGORIES = apolloAngular.gql(templateObject_17$3 || (templateObject_17$3 = __makeTemplateObject(["\n    query GetTaxCategories {\n        taxCategories {\n            ...TaxCategory\n        }\n    }\n    ", "\n"], ["\n    query GetTaxCategories {\n        taxCategories {\n            ...TaxCategory\n        }\n    }\n    ", "\n"])), TAX_CATEGORY_FRAGMENT);
    var GET_TAX_CATEGORY = apolloAngular.gql(templateObject_18$3 || (templateObject_18$3 = __makeTemplateObject(["\n    query GetTaxCategory($id: ID!) {\n        taxCategory(id: $id) {\n            ...TaxCategory\n        }\n    }\n    ", "\n"], ["\n    query GetTaxCategory($id: ID!) {\n        taxCategory(id: $id) {\n            ...TaxCategory\n        }\n    }\n    ", "\n"])), TAX_CATEGORY_FRAGMENT);
    var CREATE_TAX_CATEGORY = apolloAngular.gql(templateObject_19$3 || (templateObject_19$3 = __makeTemplateObject(["\n    mutation CreateTaxCategory($input: CreateTaxCategoryInput!) {\n        createTaxCategory(input: $input) {\n            ...TaxCategory\n        }\n    }\n    ", "\n"], ["\n    mutation CreateTaxCategory($input: CreateTaxCategoryInput!) {\n        createTaxCategory(input: $input) {\n            ...TaxCategory\n        }\n    }\n    ", "\n"])), TAX_CATEGORY_FRAGMENT);
    var UPDATE_TAX_CATEGORY = apolloAngular.gql(templateObject_20$3 || (templateObject_20$3 = __makeTemplateObject(["\n    mutation UpdateTaxCategory($input: UpdateTaxCategoryInput!) {\n        updateTaxCategory(input: $input) {\n            ...TaxCategory\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateTaxCategory($input: UpdateTaxCategoryInput!) {\n        updateTaxCategory(input: $input) {\n            ...TaxCategory\n        }\n    }\n    ", "\n"])), TAX_CATEGORY_FRAGMENT);
    var DELETE_TAX_CATEGORY = apolloAngular.gql(templateObject_21$2 || (templateObject_21$2 = __makeTemplateObject(["\n    mutation DeleteTaxCategory($id: ID!) {\n        deleteTaxCategory(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteTaxCategory($id: ID!) {\n        deleteTaxCategory(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var TAX_RATE_FRAGMENT = apolloAngular.gql(templateObject_22$2 || (templateObject_22$2 = __makeTemplateObject(["\n    fragment TaxRate on TaxRate {\n        id\n        createdAt\n        updatedAt\n        name\n        enabled\n        value\n        category {\n            id\n            name\n        }\n        zone {\n            id\n            name\n        }\n        customerGroup {\n            id\n            name\n        }\n    }\n"], ["\n    fragment TaxRate on TaxRate {\n        id\n        createdAt\n        updatedAt\n        name\n        enabled\n        value\n        category {\n            id\n            name\n        }\n        zone {\n            id\n            name\n        }\n        customerGroup {\n            id\n            name\n        }\n    }\n"])));
    var GET_TAX_RATE_LIST = apolloAngular.gql(templateObject_23$2 || (templateObject_23$2 = __makeTemplateObject(["\n    query GetTaxRateList($options: TaxRateListOptions) {\n        taxRates(options: $options) {\n            items {\n                ...TaxRate\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetTaxRateList($options: TaxRateListOptions) {\n        taxRates(options: $options) {\n            items {\n                ...TaxRate\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), TAX_RATE_FRAGMENT);
    var GET_TAX_RATE = apolloAngular.gql(templateObject_24$2 || (templateObject_24$2 = __makeTemplateObject(["\n    query GetTaxRate($id: ID!) {\n        taxRate(id: $id) {\n            ...TaxRate\n        }\n    }\n    ", "\n"], ["\n    query GetTaxRate($id: ID!) {\n        taxRate(id: $id) {\n            ...TaxRate\n        }\n    }\n    ", "\n"])), TAX_RATE_FRAGMENT);
    var CREATE_TAX_RATE = apolloAngular.gql(templateObject_25$2 || (templateObject_25$2 = __makeTemplateObject(["\n    mutation CreateTaxRate($input: CreateTaxRateInput!) {\n        createTaxRate(input: $input) {\n            ...TaxRate\n        }\n    }\n    ", "\n"], ["\n    mutation CreateTaxRate($input: CreateTaxRateInput!) {\n        createTaxRate(input: $input) {\n            ...TaxRate\n        }\n    }\n    ", "\n"])), TAX_RATE_FRAGMENT);
    var UPDATE_TAX_RATE = apolloAngular.gql(templateObject_26$1 || (templateObject_26$1 = __makeTemplateObject(["\n    mutation UpdateTaxRate($input: UpdateTaxRateInput!) {\n        updateTaxRate(input: $input) {\n            ...TaxRate\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateTaxRate($input: UpdateTaxRateInput!) {\n        updateTaxRate(input: $input) {\n            ...TaxRate\n        }\n    }\n    ", "\n"])), TAX_RATE_FRAGMENT);
    var DELETE_TAX_RATE = apolloAngular.gql(templateObject_27$1 || (templateObject_27$1 = __makeTemplateObject(["\n    mutation DeleteTaxRate($id: ID!) {\n        deleteTaxRate(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteTaxRate($id: ID!) {\n        deleteTaxRate(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var CHANNEL_FRAGMENT = apolloAngular.gql(templateObject_28$1 || (templateObject_28$1 = __makeTemplateObject(["\n    fragment Channel on Channel {\n        id\n        createdAt\n        updatedAt\n        code\n        token\n        pricesIncludeTax\n        currencyCode\n        defaultLanguageCode\n        defaultShippingZone {\n            id\n            name\n        }\n        defaultTaxZone {\n            id\n            name\n        }\n    }\n"], ["\n    fragment Channel on Channel {\n        id\n        createdAt\n        updatedAt\n        code\n        token\n        pricesIncludeTax\n        currencyCode\n        defaultLanguageCode\n        defaultShippingZone {\n            id\n            name\n        }\n        defaultTaxZone {\n            id\n            name\n        }\n    }\n"])));
    var GET_CHANNELS = apolloAngular.gql(templateObject_29$1 || (templateObject_29$1 = __makeTemplateObject(["\n    query GetChannels {\n        channels {\n            ...Channel\n        }\n    }\n    ", "\n"], ["\n    query GetChannels {\n        channels {\n            ...Channel\n        }\n    }\n    ", "\n"])), CHANNEL_FRAGMENT);
    var GET_CHANNEL = apolloAngular.gql(templateObject_30$1 || (templateObject_30$1 = __makeTemplateObject(["\n    query GetChannel($id: ID!) {\n        channel(id: $id) {\n            ...Channel\n        }\n    }\n    ", "\n"], ["\n    query GetChannel($id: ID!) {\n        channel(id: $id) {\n            ...Channel\n        }\n    }\n    ", "\n"])), CHANNEL_FRAGMENT);
    var GET_ACTIVE_CHANNEL = apolloAngular.gql(templateObject_31$1 || (templateObject_31$1 = __makeTemplateObject(["\n    query GetActiveChannel {\n        activeChannel {\n            ...Channel\n        }\n    }\n    ", "\n"], ["\n    query GetActiveChannel {\n        activeChannel {\n            ...Channel\n        }\n    }\n    ", "\n"])), CHANNEL_FRAGMENT);
    var CREATE_CHANNEL = apolloAngular.gql(templateObject_32$1 || (templateObject_32$1 = __makeTemplateObject(["\n    mutation CreateChannel($input: CreateChannelInput!) {\n        createChannel(input: $input) {\n            ...Channel\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation CreateChannel($input: CreateChannelInput!) {\n        createChannel(input: $input) {\n            ...Channel\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), CHANNEL_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var UPDATE_CHANNEL = apolloAngular.gql(templateObject_33$1 || (templateObject_33$1 = __makeTemplateObject(["\n    mutation UpdateChannel($input: UpdateChannelInput!) {\n        updateChannel(input: $input) {\n            ...Channel\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation UpdateChannel($input: UpdateChannelInput!) {\n        updateChannel(input: $input) {\n            ...Channel\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), CHANNEL_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var DELETE_CHANNEL = apolloAngular.gql(templateObject_34$1 || (templateObject_34$1 = __makeTemplateObject(["\n    mutation DeleteChannel($id: ID!) {\n        deleteChannel(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteChannel($id: ID!) {\n        deleteChannel(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var PAYMENT_METHOD_FRAGMENT = apolloAngular.gql(templateObject_35$1 || (templateObject_35$1 = __makeTemplateObject(["\n    fragment PaymentMethod on PaymentMethod {\n        id\n        createdAt\n        updatedAt\n        name\n        code\n        description\n        enabled\n        checker {\n            ...ConfigurableOperation\n        }\n        handler {\n            ...ConfigurableOperation\n        }\n    }\n    ", "\n"], ["\n    fragment PaymentMethod on PaymentMethod {\n        id\n        createdAt\n        updatedAt\n        name\n        code\n        description\n        enabled\n        checker {\n            ...ConfigurableOperation\n        }\n        handler {\n            ...ConfigurableOperation\n        }\n    }\n    ", "\n"])), CONFIGURABLE_OPERATION_FRAGMENT);
    var GET_PAYMENT_METHOD_LIST = apolloAngular.gql(templateObject_36$1 || (templateObject_36$1 = __makeTemplateObject(["\n    query GetPaymentMethodList($options: PaymentMethodListOptions!) {\n        paymentMethods(options: $options) {\n            items {\n                ...PaymentMethod\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetPaymentMethodList($options: PaymentMethodListOptions!) {\n        paymentMethods(options: $options) {\n            items {\n                ...PaymentMethod\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), PAYMENT_METHOD_FRAGMENT);
    var GET_PAYMENT_METHOD_OPERATIONS = apolloAngular.gql(templateObject_37$1 || (templateObject_37$1 = __makeTemplateObject(["\n    query GetPaymentMethodOperations {\n        paymentMethodEligibilityCheckers {\n            ...ConfigurableOperationDef\n        }\n        paymentMethodHandlers {\n            ...ConfigurableOperationDef\n        }\n    }\n    ", "\n"], ["\n    query GetPaymentMethodOperations {\n        paymentMethodEligibilityCheckers {\n            ...ConfigurableOperationDef\n        }\n        paymentMethodHandlers {\n            ...ConfigurableOperationDef\n        }\n    }\n    ", "\n"])), CONFIGURABLE_OPERATION_DEF_FRAGMENT);
    var GET_PAYMENT_METHOD = apolloAngular.gql(templateObject_38$1 || (templateObject_38$1 = __makeTemplateObject(["\n    query GetPaymentMethod($id: ID!) {\n        paymentMethod(id: $id) {\n            ...PaymentMethod\n        }\n    }\n    ", "\n"], ["\n    query GetPaymentMethod($id: ID!) {\n        paymentMethod(id: $id) {\n            ...PaymentMethod\n        }\n    }\n    ", "\n"])), PAYMENT_METHOD_FRAGMENT);
    var CREATE_PAYMENT_METHOD = apolloAngular.gql(templateObject_39$1 || (templateObject_39$1 = __makeTemplateObject(["\n    mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n        createPaymentMethod(input: $input) {\n            ...PaymentMethod\n        }\n    }\n    ", "\n"], ["\n    mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {\n        createPaymentMethod(input: $input) {\n            ...PaymentMethod\n        }\n    }\n    ", "\n"])), PAYMENT_METHOD_FRAGMENT);
    var UPDATE_PAYMENT_METHOD = apolloAngular.gql(templateObject_40$1 || (templateObject_40$1 = __makeTemplateObject(["\n    mutation UpdatePaymentMethod($input: UpdatePaymentMethodInput!) {\n        updatePaymentMethod(input: $input) {\n            ...PaymentMethod\n        }\n    }\n    ", "\n"], ["\n    mutation UpdatePaymentMethod($input: UpdatePaymentMethodInput!) {\n        updatePaymentMethod(input: $input) {\n            ...PaymentMethod\n        }\n    }\n    ", "\n"])), PAYMENT_METHOD_FRAGMENT);
    var DELETE_PAYMENT_METHOD = apolloAngular.gql(templateObject_41$1 || (templateObject_41$1 = __makeTemplateObject(["\n    mutation DeletePaymentMethod($id: ID!, $force: Boolean) {\n        deletePaymentMethod(id: $id, force: $force) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeletePaymentMethod($id: ID!, $force: Boolean) {\n        deletePaymentMethod(id: $id, force: $force) {\n            result\n            message\n        }\n    }\n"])));
    var GLOBAL_SETTINGS_FRAGMENT = apolloAngular.gql(templateObject_42$1 || (templateObject_42$1 = __makeTemplateObject(["\n    fragment GlobalSettings on GlobalSettings {\n        id\n        availableLanguages\n        trackInventory\n        outOfStockThreshold\n        serverConfig {\n            permissions {\n                name\n                description\n                assignable\n            }\n            orderProcess {\n                name\n            }\n        }\n    }\n"], ["\n    fragment GlobalSettings on GlobalSettings {\n        id\n        availableLanguages\n        trackInventory\n        outOfStockThreshold\n        serverConfig {\n            permissions {\n                name\n                description\n                assignable\n            }\n            orderProcess {\n                name\n            }\n        }\n    }\n"])));
    var GET_GLOBAL_SETTINGS = apolloAngular.gql(templateObject_43 || (templateObject_43 = __makeTemplateObject(["\n    query GetGlobalSettings {\n        globalSettings {\n            ...GlobalSettings\n        }\n    }\n    ", "\n"], ["\n    query GetGlobalSettings {\n        globalSettings {\n            ...GlobalSettings\n        }\n    }\n    ", "\n"])), GLOBAL_SETTINGS_FRAGMENT);
    var UPDATE_GLOBAL_SETTINGS = apolloAngular.gql(templateObject_44 || (templateObject_44 = __makeTemplateObject(["\n    mutation UpdateGlobalSettings($input: UpdateGlobalSettingsInput!) {\n        updateGlobalSettings(input: $input) {\n            ...GlobalSettings\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation UpdateGlobalSettings($input: UpdateGlobalSettingsInput!) {\n        updateGlobalSettings(input: $input) {\n            ...GlobalSettings\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), GLOBAL_SETTINGS_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var CUSTOM_FIELD_CONFIG_FRAGMENT = apolloAngular.gql(templateObject_45 || (templateObject_45 = __makeTemplateObject(["\n    fragment CustomFieldConfig on CustomField {\n        name\n        type\n        list\n        description {\n            languageCode\n            value\n        }\n        label {\n            languageCode\n            value\n        }\n        readonly\n    }\n"], ["\n    fragment CustomFieldConfig on CustomField {\n        name\n        type\n        list\n        description {\n            languageCode\n            value\n        }\n        label {\n            languageCode\n            value\n        }\n        readonly\n    }\n"])));
    var STRING_CUSTOM_FIELD_FRAGMENT = apolloAngular.gql(templateObject_46 || (templateObject_46 = __makeTemplateObject(["\n    fragment StringCustomField on StringCustomFieldConfig {\n        ...CustomFieldConfig\n        pattern\n        options {\n            label {\n                languageCode\n                value\n            }\n            value\n        }\n    }\n    ", "\n"], ["\n    fragment StringCustomField on StringCustomFieldConfig {\n        ...CustomFieldConfig\n        pattern\n        options {\n            label {\n                languageCode\n                value\n            }\n            value\n        }\n    }\n    ", "\n"])), CUSTOM_FIELD_CONFIG_FRAGMENT);
    var LOCALE_STRING_CUSTOM_FIELD_FRAGMENT = apolloAngular.gql(templateObject_47 || (templateObject_47 = __makeTemplateObject(["\n    fragment LocaleStringCustomField on LocaleStringCustomFieldConfig {\n        ...CustomFieldConfig\n        pattern\n    }\n    ", "\n"], ["\n    fragment LocaleStringCustomField on LocaleStringCustomFieldConfig {\n        ...CustomFieldConfig\n        pattern\n    }\n    ", "\n"])), CUSTOM_FIELD_CONFIG_FRAGMENT);
    var BOOLEAN_CUSTOM_FIELD_FRAGMENT = apolloAngular.gql(templateObject_48 || (templateObject_48 = __makeTemplateObject(["\n    fragment BooleanCustomField on BooleanCustomFieldConfig {\n        ...CustomFieldConfig\n    }\n    ", "\n"], ["\n    fragment BooleanCustomField on BooleanCustomFieldConfig {\n        ...CustomFieldConfig\n    }\n    ", "\n"])), CUSTOM_FIELD_CONFIG_FRAGMENT);
    var INT_CUSTOM_FIELD_FRAGMENT = apolloAngular.gql(templateObject_49 || (templateObject_49 = __makeTemplateObject(["\n    fragment IntCustomField on IntCustomFieldConfig {\n        ...CustomFieldConfig\n        intMin: min\n        intMax: max\n        intStep: step\n    }\n    ", "\n"], ["\n    fragment IntCustomField on IntCustomFieldConfig {\n        ...CustomFieldConfig\n        intMin: min\n        intMax: max\n        intStep: step\n    }\n    ", "\n"])), CUSTOM_FIELD_CONFIG_FRAGMENT);
    var FLOAT_CUSTOM_FIELD_FRAGMENT = apolloAngular.gql(templateObject_50 || (templateObject_50 = __makeTemplateObject(["\n    fragment FloatCustomField on FloatCustomFieldConfig {\n        ...CustomFieldConfig\n        floatMin: min\n        floatMax: max\n        floatStep: step\n    }\n    ", "\n"], ["\n    fragment FloatCustomField on FloatCustomFieldConfig {\n        ...CustomFieldConfig\n        floatMin: min\n        floatMax: max\n        floatStep: step\n    }\n    ", "\n"])), CUSTOM_FIELD_CONFIG_FRAGMENT);
    var DATE_TIME_CUSTOM_FIELD_FRAGMENT = apolloAngular.gql(templateObject_51 || (templateObject_51 = __makeTemplateObject(["\n    fragment DateTimeCustomField on DateTimeCustomFieldConfig {\n        ...CustomFieldConfig\n        datetimeMin: min\n        datetimeMax: max\n        datetimeStep: step\n    }\n    ", "\n"], ["\n    fragment DateTimeCustomField on DateTimeCustomFieldConfig {\n        ...CustomFieldConfig\n        datetimeMin: min\n        datetimeMax: max\n        datetimeStep: step\n    }\n    ", "\n"])), CUSTOM_FIELD_CONFIG_FRAGMENT);
    var RELATION_CUSTOM_FIELD_FRAGMENT = apolloAngular.gql(templateObject_52 || (templateObject_52 = __makeTemplateObject(["\n    fragment RelationCustomField on RelationCustomFieldConfig {\n        ...CustomFieldConfig\n        entity\n        scalarFields\n    }\n    ", "\n"], ["\n    fragment RelationCustomField on RelationCustomFieldConfig {\n        ...CustomFieldConfig\n        entity\n        scalarFields\n    }\n    ", "\n"])), CUSTOM_FIELD_CONFIG_FRAGMENT);
    var ALL_CUSTOM_FIELDS_FRAGMENT = apolloAngular.gql(templateObject_53 || (templateObject_53 = __makeTemplateObject(["\n    fragment CustomFields on CustomField {\n        ... on StringCustomFieldConfig {\n            ...StringCustomField\n        }\n        ... on LocaleStringCustomFieldConfig {\n            ...LocaleStringCustomField\n        }\n        ... on BooleanCustomFieldConfig {\n            ...BooleanCustomField\n        }\n        ... on IntCustomFieldConfig {\n            ...IntCustomField\n        }\n        ... on FloatCustomFieldConfig {\n            ...FloatCustomField\n        }\n        ... on DateTimeCustomFieldConfig {\n            ...DateTimeCustomField\n        }\n        ... on RelationCustomFieldConfig {\n            ...RelationCustomField\n        }\n    }\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n"], ["\n    fragment CustomFields on CustomField {\n        ... on StringCustomFieldConfig {\n            ...StringCustomField\n        }\n        ... on LocaleStringCustomFieldConfig {\n            ...LocaleStringCustomField\n        }\n        ... on BooleanCustomFieldConfig {\n            ...BooleanCustomField\n        }\n        ... on IntCustomFieldConfig {\n            ...IntCustomField\n        }\n        ... on FloatCustomFieldConfig {\n            ...FloatCustomField\n        }\n        ... on DateTimeCustomFieldConfig {\n            ...DateTimeCustomField\n        }\n        ... on RelationCustomFieldConfig {\n            ...RelationCustomField\n        }\n    }\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n    ", "\n"])), STRING_CUSTOM_FIELD_FRAGMENT, LOCALE_STRING_CUSTOM_FIELD_FRAGMENT, BOOLEAN_CUSTOM_FIELD_FRAGMENT, INT_CUSTOM_FIELD_FRAGMENT, FLOAT_CUSTOM_FIELD_FRAGMENT, DATE_TIME_CUSTOM_FIELD_FRAGMENT, RELATION_CUSTOM_FIELD_FRAGMENT);
    var GET_SERVER_CONFIG = apolloAngular.gql(templateObject_54 || (templateObject_54 = __makeTemplateObject(["\n    query GetServerConfig {\n        globalSettings {\n            id\n            serverConfig {\n                orderProcess {\n                    name\n                    to\n                }\n                permittedAssetTypes\n                permissions {\n                    name\n                    description\n                    assignable\n                }\n                customFieldConfig {\n                    Address {\n                        ...CustomFields\n                    }\n                    Administrator {\n                        ...CustomFields\n                    }\n                    Asset {\n                        ...CustomFields\n                    }\n                    Channel {\n                        ...CustomFields\n                    }\n                    Collection {\n                        ...CustomFields\n                    }\n                    Customer {\n                        ...CustomFields\n                    }\n                    Facet {\n                        ...CustomFields\n                    }\n                    FacetValue {\n                        ...CustomFields\n                    }\n                    Fulfillment {\n                        ...CustomFields\n                    }\n                    GlobalSettings {\n                        ...CustomFields\n                    }\n                    Order {\n                        ...CustomFields\n                    }\n                    OrderLine {\n                        ...CustomFields\n                    }\n                    Product {\n                        ...CustomFields\n                    }\n                    ProductOption {\n                        ...CustomFields\n                    }\n                    ProductOptionGroup {\n                        ...CustomFields\n                    }\n                    ProductVariant {\n                        ...CustomFields\n                    }\n                    ShippingMethod {\n                        ...CustomFields\n                    }\n                    User {\n                        ...CustomFields\n                    }\n                }\n            }\n        }\n    }\n    ", "\n"], ["\n    query GetServerConfig {\n        globalSettings {\n            id\n            serverConfig {\n                orderProcess {\n                    name\n                    to\n                }\n                permittedAssetTypes\n                permissions {\n                    name\n                    description\n                    assignable\n                }\n                customFieldConfig {\n                    Address {\n                        ...CustomFields\n                    }\n                    Administrator {\n                        ...CustomFields\n                    }\n                    Asset {\n                        ...CustomFields\n                    }\n                    Channel {\n                        ...CustomFields\n                    }\n                    Collection {\n                        ...CustomFields\n                    }\n                    Customer {\n                        ...CustomFields\n                    }\n                    Facet {\n                        ...CustomFields\n                    }\n                    FacetValue {\n                        ...CustomFields\n                    }\n                    Fulfillment {\n                        ...CustomFields\n                    }\n                    GlobalSettings {\n                        ...CustomFields\n                    }\n                    Order {\n                        ...CustomFields\n                    }\n                    OrderLine {\n                        ...CustomFields\n                    }\n                    Product {\n                        ...CustomFields\n                    }\n                    ProductOption {\n                        ...CustomFields\n                    }\n                    ProductOptionGroup {\n                        ...CustomFields\n                    }\n                    ProductVariant {\n                        ...CustomFields\n                    }\n                    ShippingMethod {\n                        ...CustomFields\n                    }\n                    User {\n                        ...CustomFields\n                    }\n                }\n            }\n        }\n    }\n    ", "\n"])), ALL_CUSTOM_FIELDS_FRAGMENT);
    var JOB_INFO_FRAGMENT = apolloAngular.gql(templateObject_55 || (templateObject_55 = __makeTemplateObject(["\n    fragment JobInfo on Job {\n        id\n        createdAt\n        startedAt\n        settledAt\n        queueName\n        state\n        isSettled\n        progress\n        duration\n        data\n        result\n        error\n    }\n"], ["\n    fragment JobInfo on Job {\n        id\n        createdAt\n        startedAt\n        settledAt\n        queueName\n        state\n        isSettled\n        progress\n        duration\n        data\n        result\n        error\n    }\n"])));
    var GET_JOB_INFO = apolloAngular.gql(templateObject_56 || (templateObject_56 = __makeTemplateObject(["\n    query GetJobInfo($id: ID!) {\n        job(jobId: $id) {\n            ...JobInfo\n        }\n    }\n    ", "\n"], ["\n    query GetJobInfo($id: ID!) {\n        job(jobId: $id) {\n            ...JobInfo\n        }\n    }\n    ", "\n"])), JOB_INFO_FRAGMENT);
    var GET_JOBS_LIST = apolloAngular.gql(templateObject_57 || (templateObject_57 = __makeTemplateObject(["\n    query GetAllJobs($options: JobListOptions) {\n        jobs(options: $options) {\n            items {\n                ...JobInfo\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetAllJobs($options: JobListOptions) {\n        jobs(options: $options) {\n            items {\n                ...JobInfo\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), JOB_INFO_FRAGMENT);
    var GET_JOBS_BY_ID = apolloAngular.gql(templateObject_58 || (templateObject_58 = __makeTemplateObject(["\n    query GetJobsById($ids: [ID!]!) {\n        jobsById(jobIds: $ids) {\n            ...JobInfo\n        }\n    }\n    ", "\n"], ["\n    query GetJobsById($ids: [ID!]!) {\n        jobsById(jobIds: $ids) {\n            ...JobInfo\n        }\n    }\n    ", "\n"])), JOB_INFO_FRAGMENT);
    var GET_JOB_QUEUE_LIST = apolloAngular.gql(templateObject_59 || (templateObject_59 = __makeTemplateObject(["\n    query GetJobQueueList {\n        jobQueues {\n            name\n            running\n        }\n    }\n"], ["\n    query GetJobQueueList {\n        jobQueues {\n            name\n            running\n        }\n    }\n"])));
    var CANCEL_JOB = apolloAngular.gql(templateObject_60 || (templateObject_60 = __makeTemplateObject(["\n    mutation CancelJob($id: ID!) {\n        cancelJob(jobId: $id) {\n            ...JobInfo\n        }\n    }\n    ", "\n"], ["\n    mutation CancelJob($id: ID!) {\n        cancelJob(jobId: $id) {\n            ...JobInfo\n        }\n    }\n    ", "\n"])), JOB_INFO_FRAGMENT);
    var REINDEX = apolloAngular.gql(templateObject_61 || (templateObject_61 = __makeTemplateObject(["\n    mutation Reindex {\n        reindex {\n            ...JobInfo\n        }\n    }\n    ", "\n"], ["\n    mutation Reindex {\n        reindex {\n            ...JobInfo\n        }\n    }\n    ", "\n"])), JOB_INFO_FRAGMENT);
    var templateObject_1$7, templateObject_2$7, templateObject_3$7, templateObject_4$7, templateObject_5$7, templateObject_6$7, templateObject_7$7, templateObject_8$6, templateObject_9$6, templateObject_10$4, templateObject_11$3, templateObject_12$3, templateObject_13$3, templateObject_14$3, templateObject_15$3, templateObject_16$3, templateObject_17$3, templateObject_18$3, templateObject_19$3, templateObject_20$3, templateObject_21$2, templateObject_22$2, templateObject_23$2, templateObject_24$2, templateObject_25$2, templateObject_26$1, templateObject_27$1, templateObject_28$1, templateObject_29$1, templateObject_30$1, templateObject_31$1, templateObject_32$1, templateObject_33$1, templateObject_34$1, templateObject_35$1, templateObject_36$1, templateObject_37$1, templateObject_38$1, templateObject_39$1, templateObject_40$1, templateObject_41$1, templateObject_42$1, templateObject_43, templateObject_44, templateObject_45, templateObject_46, templateObject_47, templateObject_48, templateObject_49, templateObject_50, templateObject_51, templateObject_52, templateObject_53, templateObject_54, templateObject_55, templateObject_56, templateObject_57, templateObject_58, templateObject_59, templateObject_60, templateObject_61;

    function initializeServerConfigService(serverConfigService) {
        return serverConfigService.init();
    }
    /**
     * A service which fetches the config from the server upon initialization, and then provides that config
     * to the components which require it.
     */
    var ServerConfigService = /** @class */ (function () {
        function ServerConfigService(injector) {
            this.injector = injector;
            this._serverConfig = {};
        }
        Object.defineProperty(ServerConfigService.prototype, "baseDataService", {
            get: function () {
                return this.injector.get(BaseDataService);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Fetches the ServerConfig. Should be run as part of the app bootstrap process by attaching
         * to the Angular APP_INITIALIZER token.
         */
        ServerConfigService.prototype.init = function () {
            var _this = this;
            return function () { return _this.getServerConfig(); };
        };
        /**
         * Fetch the ServerConfig. Should be run on app init (in case user is already logged in) and on successful login.
         */
        ServerConfigService.prototype.getServerConfig = function () {
            var _this = this;
            return this.baseDataService
                .query(GET_SERVER_CONFIG)
                .single$.toPromise()
                .then(function (result) {
                _this._serverConfig = result.globalSettings.serverConfig;
            }, function (err) {
                // Let the error fall through to be caught by the http interceptor.
            });
        };
        ServerConfigService.prototype.getAvailableLanguages = function () {
            return this.baseDataService
                .query(GET_GLOBAL_SETTINGS, {}, 'cache-first')
                .mapSingle(function (res) { return res.globalSettings.availableLanguages; });
        };
        /**
         * When any of the GlobalSettings are modified, this method should be called to update the Apollo cache.
         */
        ServerConfigService.prototype.refreshGlobalSettings = function () {
            return this.baseDataService.query(GET_GLOBAL_SETTINGS, {}, 'network-only')
                .single$;
        };
        /**
         * Retrieves the custom field configs for the given entity type.
         */
        ServerConfigService.prototype.getCustomFieldsFor = function (type) {
            return this.serverConfig.customFieldConfig[type] || [];
        };
        ServerConfigService.prototype.getOrderProcessStates = function () {
            return this.serverConfig.orderProcess;
        };
        ServerConfigService.prototype.getPermittedAssetTypes = function () {
            return this.serverConfig.permittedAssetTypes;
        };
        ServerConfigService.prototype.getPermissionDefinitions = function () {
            return this.serverConfig.permissions;
        };
        Object.defineProperty(ServerConfigService.prototype, "serverConfig", {
            get: function () {
                return this._serverConfig;
            },
            enumerable: false,
            configurable: true
        });
        return ServerConfigService;
    }());
    ServerConfigService.decorators = [
        { type: i0.Injectable }
    ];
    ServerConfigService.ctorParameters = function () { return [
        { type: i0.Injector }
    ]; };

    /**
     * Given a GraphQL AST (DocumentNode), this function looks for fragment definitions and adds and configured
     * custom fields to those fragments.
     */
    function addCustomFields(documentNode, customFields) {
        var e_1, _a;
        var fragmentDefs = documentNode.definitions.filter(isFragmentDefinition);
        try {
            for (var fragmentDefs_1 = __values(fragmentDefs), fragmentDefs_1_1 = fragmentDefs_1.next(); !fragmentDefs_1_1.done; fragmentDefs_1_1 = fragmentDefs_1.next()) {
                var fragmentDef = fragmentDefs_1_1.value;
                var entityType = fragmentDef.typeCondition.name.value;
                if (entityType === 'OrderAddress') {
                    // OrderAddress is a special case of the Address entity, and shares its custom fields
                    // so we treat it as an alias
                    entityType = 'Address';
                }
                var customFieldsForType = customFields[entityType];
                if (customFieldsForType && customFieldsForType.length) {
                    fragmentDef.selectionSet.selections.push({
                        name: {
                            kind: graphql.Kind.NAME,
                            value: 'customFields',
                        },
                        kind: graphql.Kind.FIELD,
                        selectionSet: {
                            kind: graphql.Kind.SELECTION_SET,
                            selections: customFieldsForType.map(function (customField) {
                                return Object.assign({ kind: graphql.Kind.FIELD, name: {
                                        kind: graphql.Kind.NAME,
                                        value: customField.name,
                                    } }, (customField.type === 'relation'
                                    ? {
                                        selectionSet: {
                                            kind: graphql.Kind.SELECTION_SET,
                                            selections: customField.scalarFields.map(function (f) { return ({
                                                kind: graphql.Kind.FIELD,
                                                name: { kind: graphql.Kind.NAME, value: f },
                                            }); }),
                                        },
                                    }
                                    : {}));
                            }),
                        },
                    });
                    var localeStrings = customFieldsForType.filter(function (field) { return field.type === 'localeString'; });
                    var translationsField = fragmentDef.selectionSet.selections
                        .filter(isFieldNode)
                        .find(function (field) { return field.name.value === 'translations'; });
                    if (localeStrings.length && translationsField && translationsField.selectionSet) {
                        translationsField.selectionSet.selections.push({
                            name: {
                                kind: graphql.Kind.NAME,
                                value: 'customFields',
                            },
                            kind: graphql.Kind.FIELD,
                            selectionSet: {
                                kind: graphql.Kind.SELECTION_SET,
                                selections: localeStrings.map(function (customField) {
                                    return {
                                        kind: graphql.Kind.FIELD,
                                        name: {
                                            kind: graphql.Kind.NAME,
                                            value: customField.name,
                                        },
                                    };
                                }),
                            },
                        });
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (fragmentDefs_1_1 && !fragmentDefs_1_1.done && (_a = fragmentDefs_1.return)) _a.call(fragmentDefs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return documentNode;
    }
    function isFragmentDefinition(value) {
        return value.kind === graphql.Kind.FRAGMENT_DEFINITION;
    }
    function isFieldNode(value) {
        return value.kind === graphql.Kind.FIELD;
    }

    var CREATE_ENTITY_REGEX = /Create([A-Za-z]+)Input/;
    var UPDATE_ENTITY_REGEX = /Update([A-Za-z]+)Input/;
    /**
     * Checks the current documentNode for an operation with a variable named "Create<Entity>Input" or "Update<Entity>Input"
     * and if a match is found, returns the <Entity> name.
     */
    function isEntityCreateOrUpdateMutation(documentNode) {
        var e_1, _a;
        var operationDef = graphql.getOperationAST(documentNode, null);
        if (operationDef && operationDef.variableDefinitions) {
            try {
                for (var _b = __values(operationDef.variableDefinitions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var variableDef = _c.value;
                    var namedType = extractInputType(variableDef.type);
                    var inputTypeName = namedType.name.value;
                    // special cases which don't follow the usual pattern
                    if (inputTypeName === 'UpdateActiveAdministratorInput') {
                        return 'Administrator';
                    }
                    var createMatch = inputTypeName.match(CREATE_ENTITY_REGEX);
                    if (createMatch) {
                        return createMatch[1];
                    }
                    var updateMatch = inputTypeName.match(UPDATE_ENTITY_REGEX);
                    if (updateMatch) {
                        return updateMatch[1];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    }
    function extractInputType(type) {
        if (type.kind === 'NonNullType') {
            return extractInputType(type.type);
        }
        if (type.kind === 'ListType') {
            return extractInputType(type.type);
        }
        return type;
    }
    /**
     * Removes any `readonly` custom fields from an entity (including its translations).
     * To be used before submitting the entity for a create or update request.
     */
    function removeReadonlyCustomFields(variables, customFieldConfig) {
        if (variables.input) {
            removeReadonly(variables.input, customFieldConfig);
        }
        return removeReadonly(variables, customFieldConfig);
    }
    function removeReadonly(input, customFieldConfig) {
        var e_2, _a, e_3, _b;
        try {
            for (var customFieldConfig_1 = __values(customFieldConfig), customFieldConfig_1_1 = customFieldConfig_1.next(); !customFieldConfig_1_1.done; customFieldConfig_1_1 = customFieldConfig_1.next()) {
                var field = customFieldConfig_1_1.value;
                if (field.readonly) {
                    if (field.type === 'localeString') {
                        if (hasTranslations(input)) {
                            try {
                                for (var _c = (e_3 = void 0, __values(input.translations)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var translation = _d.value;
                                    if (hasCustomFields$1(translation) &&
                                        translation.customFields[field.name] !== undefined) {
                                        delete translation.customFields[field.name];
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                    }
                    else {
                        if (hasCustomFields$1(input) && input.customFields[field.name] !== undefined) {
                            delete input.customFields[field.name];
                        }
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (customFieldConfig_1_1 && !customFieldConfig_1_1.done && (_a = customFieldConfig_1.return)) _a.call(customFieldConfig_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return input;
    }
    function hasCustomFields$1(input) {
        return input != null && input.hasOwnProperty('customFields');
    }
    function hasTranslations(input) {
        return input != null && input.hasOwnProperty('translations');
    }

    /**
     * Transforms any custom field "relation" type inputs into the corresponding `<name>Id` format,
     * as expected by the server.
     */
    function transformRelationCustomFieldInputs(variables, customFieldConfig) {
        if (variables.input) {
            transformRelations(variables.input, customFieldConfig);
        }
        return transformRelations(variables, customFieldConfig);
    }
    /**
     * @description
     * When persisting custom fields, we need to send just the IDs of the relations,
     * rather than the objects themselves.
     */
    function transformRelations(input, customFieldConfig) {
        var e_1, _a;
        try {
            for (var customFieldConfig_1 = __values(customFieldConfig), customFieldConfig_1_1 = customFieldConfig_1.next(); !customFieldConfig_1_1.done; customFieldConfig_1_1 = customFieldConfig_1.next()) {
                var field = customFieldConfig_1_1.value;
                if (field.type === 'relation') {
                    if (hasCustomFields(input)) {
                        var entityValue = input.customFields[field.name];
                        if (input.customFields.hasOwnProperty(field.name)) {
                            delete input.customFields[field.name];
                            input.customFields[sharedUtils.getGraphQlInputName(field)] =
                                field.list && Array.isArray(entityValue)
                                    ? entityValue.map(function (v) { return v === null || v === void 0 ? void 0 : v.id; })
                                    : entityValue === null
                                        ? null
                                        : entityValue === null || entityValue === void 0 ? void 0 : entityValue.id;
                        }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (customFieldConfig_1_1 && !customFieldConfig_1_1.done && (_a = customFieldConfig_1.return)) _a.call(customFieldConfig_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return input;
    }
    function hasCustomFields(input) {
        return input != null && input.hasOwnProperty('customFields');
    }

    var BaseDataService = /** @class */ (function () {
        function BaseDataService(apollo, httpClient, localStorageService, serverConfigService) {
            this.apollo = apollo;
            this.httpClient = httpClient;
            this.localStorageService = localStorageService;
            this.serverConfigService = serverConfigService;
        }
        Object.defineProperty(BaseDataService.prototype, "customFields", {
            get: function () {
                return this.serverConfigService.serverConfig.customFieldConfig || {};
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Performs a GraphQL watch query
         */
        BaseDataService.prototype.query = function (query, variables, fetchPolicy) {
            if (fetchPolicy === void 0) { fetchPolicy = 'cache-and-network'; }
            var withCustomFields = addCustomFields(query, this.customFields);
            var queryRef = this.apollo.watchQuery({
                query: withCustomFields,
                variables: variables,
                fetchPolicy: fetchPolicy,
            });
            var queryResult = new QueryResult(queryRef, this.apollo);
            return queryResult;
        };
        /**
         * Performs a GraphQL mutation
         */
        BaseDataService.prototype.mutate = function (mutation, variables, update) {
            var withCustomFields = addCustomFields(mutation, this.customFields);
            var withoutReadonlyFields = this.prepareCustomFields(mutation, variables);
            return this.apollo
                .mutate({
                mutation: withCustomFields,
                variables: withoutReadonlyFields,
                update: update,
            })
                .pipe(operators.map(function (result) { return result.data; }));
        };
        BaseDataService.prototype.prepareCustomFields = function (mutation, variables) {
            var entity = isEntityCreateOrUpdateMutation(mutation);
            if (entity) {
                var customFieldConfig = this.customFields[entity];
                if (variables && customFieldConfig) {
                    var variablesClone = simpleDeepClone.simpleDeepClone(variables);
                    variablesClone = removeReadonlyCustomFields(variablesClone, customFieldConfig);
                    variablesClone = transformRelationCustomFieldInputs(variablesClone, customFieldConfig);
                    return variablesClone;
                }
            }
            return variables;
        };
        return BaseDataService;
    }());
    BaseDataService.decorators = [
        { type: i0.Injectable }
    ];
    BaseDataService.ctorParameters = function () { return [
        { type: apolloAngular.Apollo },
        { type: i1$1.HttpClient },
        { type: LocalStorageService },
        { type: ServerConfigService }
    ]; };

    /**
     * Note: local queries all have a fetch-policy of "cache-first" explicitly specified due to:
     * https://github.com/apollographql/apollo-link-state/issues/236
     */
    var ClientDataService = /** @class */ (function () {
        function ClientDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        ClientDataService.prototype.startRequest = function () {
            return this.baseDataService.mutate(REQUEST_STARTED);
        };
        ClientDataService.prototype.completeRequest = function () {
            return this.baseDataService.mutate(REQUEST_COMPLETED);
        };
        ClientDataService.prototype.getNetworkStatus = function () {
            return this.baseDataService.query(GET_NEWTORK_STATUS, {}, 'cache-first');
        };
        ClientDataService.prototype.loginSuccess = function (username, activeChannelId, channels) {
            return this.baseDataService.mutate(SET_AS_LOGGED_IN, {
                input: {
                    username: username,
                    loginTime: Date.now().toString(),
                    activeChannelId: activeChannelId,
                    channels: channels,
                },
            });
        };
        ClientDataService.prototype.logOut = function () {
            return this.baseDataService.mutate(SET_AS_LOGGED_OUT);
        };
        ClientDataService.prototype.userStatus = function () {
            return this.baseDataService.query(GET_USER_STATUS, {}, 'cache-first');
        };
        ClientDataService.prototype.uiState = function () {
            return this.baseDataService.query(GET_UI_STATE, {}, 'cache-first');
        };
        ClientDataService.prototype.setUiLanguage = function (languageCode) {
            return this.baseDataService.mutate(SET_UI_LANGUAGE, {
                languageCode: languageCode,
            });
        };
        ClientDataService.prototype.setUiTheme = function (theme) {
            return this.baseDataService.mutate(SET_UI_THEME, {
                theme: theme,
            });
        };
        ClientDataService.prototype.setActiveChannel = function (channelId) {
            return this.baseDataService.mutate(SET_ACTIVE_CHANNEL, {
                channelId: channelId,
            });
        };
        ClientDataService.prototype.updateUserChannels = function (channels) {
            return this.baseDataService.mutate(UPDATE_USER_CHANNELS, {
                channels: channels,
            });
        };
        return ClientDataService;
    }());

    var ASSET_FRAGMENT = apolloAngular.gql(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n    fragment Asset on Asset {\n        id\n        createdAt\n        updatedAt\n        name\n        fileSize\n        mimeType\n        type\n        preview\n        source\n        width\n        height\n        focalPoint {\n            x\n            y\n        }\n    }\n"], ["\n    fragment Asset on Asset {\n        id\n        createdAt\n        updatedAt\n        name\n        fileSize\n        mimeType\n        type\n        preview\n        source\n        width\n        height\n        focalPoint {\n            x\n            y\n        }\n    }\n"])));
    var TAG_FRAGMENT = apolloAngular.gql(templateObject_2$6 || (templateObject_2$6 = __makeTemplateObject(["\n    fragment Tag on Tag {\n        id\n        value\n    }\n"], ["\n    fragment Tag on Tag {\n        id\n        value\n    }\n"])));
    var PRODUCT_OPTION_GROUP_FRAGMENT = apolloAngular.gql(templateObject_3$6 || (templateObject_3$6 = __makeTemplateObject(["\n    fragment ProductOptionGroup on ProductOptionGroup {\n        id\n        code\n        languageCode\n        name\n        translations {\n            id\n            languageCode\n            name\n        }\n    }\n"], ["\n    fragment ProductOptionGroup on ProductOptionGroup {\n        id\n        code\n        languageCode\n        name\n        translations {\n            id\n            languageCode\n            name\n        }\n    }\n"])));
    var PRODUCT_OPTION_FRAGMENT = apolloAngular.gql(templateObject_4$6 || (templateObject_4$6 = __makeTemplateObject(["\n    fragment ProductOption on ProductOption {\n        id\n        code\n        languageCode\n        name\n        groupId\n        translations {\n            id\n            languageCode\n            name\n        }\n    }\n"], ["\n    fragment ProductOption on ProductOption {\n        id\n        code\n        languageCode\n        name\n        groupId\n        translations {\n            id\n            languageCode\n            name\n        }\n    }\n"])));
    var PRODUCT_VARIANT_FRAGMENT = apolloAngular.gql(templateObject_5$6 || (templateObject_5$6 = __makeTemplateObject(["\n    fragment ProductVariant on ProductVariant {\n        id\n        createdAt\n        updatedAt\n        enabled\n        languageCode\n        name\n        price\n        currencyCode\n        priceWithTax\n        stockOnHand\n        stockAllocated\n        trackInventory\n        outOfStockThreshold\n        useGlobalOutOfStockThreshold\n        taxRateApplied {\n            id\n            name\n            value\n        }\n        taxCategory {\n            id\n            name\n        }\n        sku\n        options {\n            ...ProductOption\n        }\n        facetValues {\n            id\n            code\n            name\n            facet {\n                id\n                name\n            }\n        }\n        featuredAsset {\n            ...Asset\n        }\n        assets {\n            ...Asset\n        }\n        translations {\n            id\n            languageCode\n            name\n        }\n        channels {\n            id\n            code\n        }\n    }\n    ", "\n    ", "\n"], ["\n    fragment ProductVariant on ProductVariant {\n        id\n        createdAt\n        updatedAt\n        enabled\n        languageCode\n        name\n        price\n        currencyCode\n        priceWithTax\n        stockOnHand\n        stockAllocated\n        trackInventory\n        outOfStockThreshold\n        useGlobalOutOfStockThreshold\n        taxRateApplied {\n            id\n            name\n            value\n        }\n        taxCategory {\n            id\n            name\n        }\n        sku\n        options {\n            ...ProductOption\n        }\n        facetValues {\n            id\n            code\n            name\n            facet {\n                id\n                name\n            }\n        }\n        featuredAsset {\n            ...Asset\n        }\n        assets {\n            ...Asset\n        }\n        translations {\n            id\n            languageCode\n            name\n        }\n        channels {\n            id\n            code\n        }\n    }\n    ", "\n    ", "\n"])), PRODUCT_OPTION_FRAGMENT, ASSET_FRAGMENT);
    var PRODUCT_WITH_VARIANTS_FRAGMENT = apolloAngular.gql(templateObject_6$6 || (templateObject_6$6 = __makeTemplateObject(["\n    fragment ProductWithVariants on Product {\n        id\n        createdAt\n        updatedAt\n        enabled\n        languageCode\n        name\n        slug\n        description\n        featuredAsset {\n            ...Asset\n        }\n        assets {\n            ...Asset\n        }\n        translations {\n            id\n            languageCode\n            name\n            slug\n            description\n        }\n        optionGroups {\n            ...ProductOptionGroup\n        }\n        variants {\n            ...ProductVariant\n        }\n        facetValues {\n            id\n            code\n            name\n            facet {\n                id\n                name\n            }\n        }\n        channels {\n            id\n            code\n        }\n    }\n    ", "\n    ", "\n    ", "\n"], ["\n    fragment ProductWithVariants on Product {\n        id\n        createdAt\n        updatedAt\n        enabled\n        languageCode\n        name\n        slug\n        description\n        featuredAsset {\n            ...Asset\n        }\n        assets {\n            ...Asset\n        }\n        translations {\n            id\n            languageCode\n            name\n            slug\n            description\n        }\n        optionGroups {\n            ...ProductOptionGroup\n        }\n        variants {\n            ...ProductVariant\n        }\n        facetValues {\n            id\n            code\n            name\n            facet {\n                id\n                name\n            }\n        }\n        channels {\n            id\n            code\n        }\n    }\n    ", "\n    ", "\n    ", "\n"])), PRODUCT_OPTION_GROUP_FRAGMENT, PRODUCT_VARIANT_FRAGMENT, ASSET_FRAGMENT);
    var PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT = apolloAngular.gql(templateObject_7$6 || (templateObject_7$6 = __makeTemplateObject(["\n    fragment ProductOptionGroupWithOptions on ProductOptionGroup {\n        id\n        createdAt\n        updatedAt\n        languageCode\n        code\n        name\n        translations {\n            id\n            name\n        }\n        options {\n            id\n            languageCode\n            name\n            code\n            translations {\n                name\n            }\n        }\n    }\n"], ["\n    fragment ProductOptionGroupWithOptions on ProductOptionGroup {\n        id\n        createdAt\n        updatedAt\n        languageCode\n        code\n        name\n        translations {\n            id\n            name\n        }\n        options {\n            id\n            languageCode\n            name\n            code\n            translations {\n                name\n            }\n        }\n    }\n"])));
    var UPDATE_PRODUCT = apolloAngular.gql(templateObject_8$5 || (templateObject_8$5 = __makeTemplateObject(["\n    mutation UpdateProduct($input: UpdateProductInput!) {\n        updateProduct(input: $input) {\n            ...ProductWithVariants\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateProduct($input: UpdateProductInput!) {\n        updateProduct(input: $input) {\n            ...ProductWithVariants\n        }\n    }\n    ", "\n"])), PRODUCT_WITH_VARIANTS_FRAGMENT);
    var CREATE_PRODUCT = apolloAngular.gql(templateObject_9$5 || (templateObject_9$5 = __makeTemplateObject(["\n    mutation CreateProduct($input: CreateProductInput!) {\n        createProduct(input: $input) {\n            ...ProductWithVariants\n        }\n    }\n    ", "\n"], ["\n    mutation CreateProduct($input: CreateProductInput!) {\n        createProduct(input: $input) {\n            ...ProductWithVariants\n        }\n    }\n    ", "\n"])), PRODUCT_WITH_VARIANTS_FRAGMENT);
    var DELETE_PRODUCT = apolloAngular.gql(templateObject_10$3 || (templateObject_10$3 = __makeTemplateObject(["\n    mutation DeleteProduct($id: ID!) {\n        deleteProduct(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteProduct($id: ID!) {\n        deleteProduct(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var CREATE_PRODUCT_VARIANTS = apolloAngular.gql(templateObject_11$2 || (templateObject_11$2 = __makeTemplateObject(["\n    mutation CreateProductVariants($input: [CreateProductVariantInput!]!) {\n        createProductVariants(input: $input) {\n            ...ProductVariant\n        }\n    }\n    ", "\n"], ["\n    mutation CreateProductVariants($input: [CreateProductVariantInput!]!) {\n        createProductVariants(input: $input) {\n            ...ProductVariant\n        }\n    }\n    ", "\n"])), PRODUCT_VARIANT_FRAGMENT);
    var UPDATE_PRODUCT_VARIANTS = apolloAngular.gql(templateObject_12$2 || (templateObject_12$2 = __makeTemplateObject(["\n    mutation UpdateProductVariants($input: [UpdateProductVariantInput!]!) {\n        updateProductVariants(input: $input) {\n            ...ProductVariant\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateProductVariants($input: [UpdateProductVariantInput!]!) {\n        updateProductVariants(input: $input) {\n            ...ProductVariant\n        }\n    }\n    ", "\n"])), PRODUCT_VARIANT_FRAGMENT);
    var CREATE_PRODUCT_OPTION_GROUP = apolloAngular.gql(templateObject_13$2 || (templateObject_13$2 = __makeTemplateObject(["\n    mutation CreateProductOptionGroup($input: CreateProductOptionGroupInput!) {\n        createProductOptionGroup(input: $input) {\n            ...ProductOptionGroupWithOptions\n        }\n    }\n    ", "\n"], ["\n    mutation CreateProductOptionGroup($input: CreateProductOptionGroupInput!) {\n        createProductOptionGroup(input: $input) {\n            ...ProductOptionGroupWithOptions\n        }\n    }\n    ", "\n"])), PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT);
    var GET_PRODUCT_OPTION_GROUP = apolloAngular.gql(templateObject_14$2 || (templateObject_14$2 = __makeTemplateObject(["\n    query GetProductOptionGroup($id: ID!) {\n        productOptionGroup(id: $id) {\n            ...ProductOptionGroupWithOptions\n        }\n    }\n    ", "\n"], ["\n    query GetProductOptionGroup($id: ID!) {\n        productOptionGroup(id: $id) {\n            ...ProductOptionGroupWithOptions\n        }\n    }\n    ", "\n"])), PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT);
    var ADD_OPTION_TO_GROUP = apolloAngular.gql(templateObject_15$2 || (templateObject_15$2 = __makeTemplateObject(["\n    mutation AddOptionToGroup($input: CreateProductOptionInput!) {\n        createProductOption(input: $input) {\n            id\n            createdAt\n            updatedAt\n            name\n            code\n            groupId\n        }\n    }\n"], ["\n    mutation AddOptionToGroup($input: CreateProductOptionInput!) {\n        createProductOption(input: $input) {\n            id\n            createdAt\n            updatedAt\n            name\n            code\n            groupId\n        }\n    }\n"])));
    var ADD_OPTION_GROUP_TO_PRODUCT = apolloAngular.gql(templateObject_16$2 || (templateObject_16$2 = __makeTemplateObject(["\n    mutation AddOptionGroupToProduct($productId: ID!, $optionGroupId: ID!) {\n        addOptionGroupToProduct(productId: $productId, optionGroupId: $optionGroupId) {\n            id\n            createdAt\n            updatedAt\n            optionGroups {\n                id\n                createdAt\n                updatedAt\n                code\n                options {\n                    id\n                    createdAt\n                    updatedAt\n                    code\n                }\n            }\n        }\n    }\n"], ["\n    mutation AddOptionGroupToProduct($productId: ID!, $optionGroupId: ID!) {\n        addOptionGroupToProduct(productId: $productId, optionGroupId: $optionGroupId) {\n            id\n            createdAt\n            updatedAt\n            optionGroups {\n                id\n                createdAt\n                updatedAt\n                code\n                options {\n                    id\n                    createdAt\n                    updatedAt\n                    code\n                }\n            }\n        }\n    }\n"])));
    var REMOVE_OPTION_GROUP_FROM_PRODUCT = apolloAngular.gql(templateObject_17$2 || (templateObject_17$2 = __makeTemplateObject(["\n    mutation RemoveOptionGroupFromProduct($productId: ID!, $optionGroupId: ID!) {\n        removeOptionGroupFromProduct(productId: $productId, optionGroupId: $optionGroupId) {\n            ... on Product {\n                id\n                createdAt\n                updatedAt\n                optionGroups {\n                    id\n                    createdAt\n                    updatedAt\n                    code\n                    options {\n                        id\n                        createdAt\n                        updatedAt\n                        code\n                    }\n                }\n            }\n            ...ErrorResult\n        }\n    }\n    ", "\n"], ["\n    mutation RemoveOptionGroupFromProduct($productId: ID!, $optionGroupId: ID!) {\n        removeOptionGroupFromProduct(productId: $productId, optionGroupId: $optionGroupId) {\n            ... on Product {\n                id\n                createdAt\n                updatedAt\n                optionGroups {\n                    id\n                    createdAt\n                    updatedAt\n                    code\n                    options {\n                        id\n                        createdAt\n                        updatedAt\n                        code\n                    }\n                }\n            }\n            ...ErrorResult\n        }\n    }\n    ", "\n"])), ERROR_RESULT_FRAGMENT);
    var GET_PRODUCT_WITH_VARIANTS = apolloAngular.gql(templateObject_18$2 || (templateObject_18$2 = __makeTemplateObject(["\n    query GetProductWithVariants($id: ID!) {\n        product(id: $id) {\n            ...ProductWithVariants\n        }\n    }\n    ", "\n"], ["\n    query GetProductWithVariants($id: ID!) {\n        product(id: $id) {\n            ...ProductWithVariants\n        }\n    }\n    ", "\n"])), PRODUCT_WITH_VARIANTS_FRAGMENT);
    var GET_PRODUCT_SIMPLE = apolloAngular.gql(templateObject_19$2 || (templateObject_19$2 = __makeTemplateObject(["\n    query GetProductSimple($id: ID!) {\n        product(id: $id) {\n            id\n            name\n            featuredAsset {\n                ...Asset\n            }\n        }\n    }\n    ", "\n"], ["\n    query GetProductSimple($id: ID!) {\n        product(id: $id) {\n            id\n            name\n            featuredAsset {\n                ...Asset\n            }\n        }\n    }\n    ", "\n"])), ASSET_FRAGMENT);
    var GET_PRODUCT_LIST = apolloAngular.gql(templateObject_20$2 || (templateObject_20$2 = __makeTemplateObject(["\n    query GetProductList($options: ProductListOptions) {\n        products(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                enabled\n                languageCode\n                name\n                slug\n                featuredAsset {\n                    id\n                    createdAt\n                    updatedAt\n                    preview\n                }\n            }\n            totalItems\n        }\n    }\n"], ["\n    query GetProductList($options: ProductListOptions) {\n        products(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                enabled\n                languageCode\n                name\n                slug\n                featuredAsset {\n                    id\n                    createdAt\n                    updatedAt\n                    preview\n                }\n            }\n            totalItems\n        }\n    }\n"])));
    var GET_PRODUCT_OPTION_GROUPS = apolloAngular.gql(templateObject_21$1 || (templateObject_21$1 = __makeTemplateObject(["\n    query GetProductOptionGroups($filterTerm: String) {\n        productOptionGroups(filterTerm: $filterTerm) {\n            id\n            createdAt\n            updatedAt\n            languageCode\n            code\n            name\n            options {\n                id\n                createdAt\n                updatedAt\n                languageCode\n                code\n                name\n            }\n        }\n    }\n"], ["\n    query GetProductOptionGroups($filterTerm: String) {\n        productOptionGroups(filterTerm: $filterTerm) {\n            id\n            createdAt\n            updatedAt\n            languageCode\n            code\n            name\n            options {\n                id\n                createdAt\n                updatedAt\n                languageCode\n                code\n                name\n            }\n        }\n    }\n"])));
    var GET_ASSET_LIST = apolloAngular.gql(templateObject_22$1 || (templateObject_22$1 = __makeTemplateObject(["\n    query GetAssetList($options: AssetListOptions) {\n        assets(options: $options) {\n            items {\n                ...Asset\n                tags {\n                    ...Tag\n                }\n            }\n            totalItems\n        }\n    }\n    ", "\n    ", "\n"], ["\n    query GetAssetList($options: AssetListOptions) {\n        assets(options: $options) {\n            items {\n                ...Asset\n                tags {\n                    ...Tag\n                }\n            }\n            totalItems\n        }\n    }\n    ", "\n    ", "\n"])), ASSET_FRAGMENT, TAG_FRAGMENT);
    var GET_ASSET = apolloAngular.gql(templateObject_23$1 || (templateObject_23$1 = __makeTemplateObject(["\n    query GetAsset($id: ID!) {\n        asset(id: $id) {\n            ...Asset\n            tags {\n                ...Tag\n            }\n        }\n    }\n    ", "\n    ", "\n"], ["\n    query GetAsset($id: ID!) {\n        asset(id: $id) {\n            ...Asset\n            tags {\n                ...Tag\n            }\n        }\n    }\n    ", "\n    ", "\n"])), ASSET_FRAGMENT, TAG_FRAGMENT);
    var CREATE_ASSETS = apolloAngular.gql(templateObject_24$1 || (templateObject_24$1 = __makeTemplateObject(["\n    mutation CreateAssets($input: [CreateAssetInput!]!) {\n        createAssets(input: $input) {\n            ...Asset\n            ... on Asset {\n                tags {\n                    ...Tag\n                }\n            }\n            ... on ErrorResult {\n                message\n            }\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation CreateAssets($input: [CreateAssetInput!]!) {\n        createAssets(input: $input) {\n            ...Asset\n            ... on Asset {\n                tags {\n                    ...Tag\n                }\n            }\n            ... on ErrorResult {\n                message\n            }\n        }\n    }\n    ", "\n    ", "\n"])), ASSET_FRAGMENT, TAG_FRAGMENT);
    var UPDATE_ASSET = apolloAngular.gql(templateObject_25$1 || (templateObject_25$1 = __makeTemplateObject(["\n    mutation UpdateAsset($input: UpdateAssetInput!) {\n        updateAsset(input: $input) {\n            ...Asset\n            tags {\n                ...Tag\n            }\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation UpdateAsset($input: UpdateAssetInput!) {\n        updateAsset(input: $input) {\n            ...Asset\n            tags {\n                ...Tag\n            }\n        }\n    }\n    ", "\n    ", "\n"])), ASSET_FRAGMENT, TAG_FRAGMENT);
    var DELETE_ASSETS = apolloAngular.gql(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n    mutation DeleteAssets($input: DeleteAssetsInput!) {\n        deleteAssets(input: $input) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteAssets($input: DeleteAssetsInput!) {\n        deleteAssets(input: $input) {\n            result\n            message\n        }\n    }\n"])));
    var SEARCH_PRODUCTS = apolloAngular.gql(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n    query SearchProducts($input: SearchInput!) {\n        search(input: $input) {\n            totalItems\n            items {\n                enabled\n                productId\n                productName\n                productAsset {\n                    id\n                    preview\n                    focalPoint {\n                        x\n                        y\n                    }\n                }\n                productVariantId\n                productVariantName\n                productVariantAsset {\n                    id\n                    preview\n                    focalPoint {\n                        x\n                        y\n                    }\n                }\n                sku\n                channelIds\n            }\n            facetValues {\n                count\n                facetValue {\n                    id\n                    createdAt\n                    updatedAt\n                    name\n                    facet {\n                        id\n                        createdAt\n                        updatedAt\n                        name\n                    }\n                }\n            }\n        }\n    }\n"], ["\n    query SearchProducts($input: SearchInput!) {\n        search(input: $input) {\n            totalItems\n            items {\n                enabled\n                productId\n                productName\n                productAsset {\n                    id\n                    preview\n                    focalPoint {\n                        x\n                        y\n                    }\n                }\n                productVariantId\n                productVariantName\n                productVariantAsset {\n                    id\n                    preview\n                    focalPoint {\n                        x\n                        y\n                    }\n                }\n                sku\n                channelIds\n            }\n            facetValues {\n                count\n                facetValue {\n                    id\n                    createdAt\n                    updatedAt\n                    name\n                    facet {\n                        id\n                        createdAt\n                        updatedAt\n                        name\n                    }\n                }\n            }\n        }\n    }\n"])));
    var PRODUCT_SELECTOR_SEARCH = apolloAngular.gql(templateObject_28 || (templateObject_28 = __makeTemplateObject(["\n    query ProductSelectorSearch($term: String!, $take: Int!) {\n        search(input: { groupByProduct: false, term: $term, take: $take }) {\n            items {\n                productVariantId\n                productVariantName\n                productAsset {\n                    id\n                    preview\n                    focalPoint {\n                        x\n                        y\n                    }\n                }\n                price {\n                    ... on SinglePrice {\n                        value\n                    }\n                }\n                priceWithTax {\n                    ... on SinglePrice {\n                        value\n                    }\n                }\n                sku\n            }\n        }\n    }\n"], ["\n    query ProductSelectorSearch($term: String!, $take: Int!) {\n        search(input: { groupByProduct: false, term: $term, take: $take }) {\n            items {\n                productVariantId\n                productVariantName\n                productAsset {\n                    id\n                    preview\n                    focalPoint {\n                        x\n                        y\n                    }\n                }\n                price {\n                    ... on SinglePrice {\n                        value\n                    }\n                }\n                priceWithTax {\n                    ... on SinglePrice {\n                        value\n                    }\n                }\n                sku\n            }\n        }\n    }\n"])));
    var UPDATE_PRODUCT_OPTION = apolloAngular.gql(templateObject_29 || (templateObject_29 = __makeTemplateObject(["\n    mutation UpdateProductOption($input: UpdateProductOptionInput!) {\n        updateProductOption(input: $input) {\n            ...ProductOption\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateProductOption($input: UpdateProductOptionInput!) {\n        updateProductOption(input: $input) {\n            ...ProductOption\n        }\n    }\n    ", "\n"])), PRODUCT_OPTION_FRAGMENT);
    var DELETE_PRODUCT_VARIANT = apolloAngular.gql(templateObject_30 || (templateObject_30 = __makeTemplateObject(["\n    mutation DeleteProductVariant($id: ID!) {\n        deleteProductVariant(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteProductVariant($id: ID!) {\n        deleteProductVariant(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var GET_PRODUCT_VARIANT_OPTIONS = apolloAngular.gql(templateObject_31 || (templateObject_31 = __makeTemplateObject(["\n    query GetProductVariantOptions($id: ID!) {\n        product(id: $id) {\n            id\n            createdAt\n            updatedAt\n            name\n            optionGroups {\n                id\n                name\n                code\n                options {\n                    ...ProductOption\n                }\n            }\n            variants {\n                id\n                createdAt\n                updatedAt\n                enabled\n                name\n                sku\n                price\n                stockOnHand\n                enabled\n                options {\n                    id\n                    createdAt\n                    updatedAt\n                    name\n                    code\n                    groupId\n                }\n            }\n        }\n    }\n    ", "\n"], ["\n    query GetProductVariantOptions($id: ID!) {\n        product(id: $id) {\n            id\n            createdAt\n            updatedAt\n            name\n            optionGroups {\n                id\n                name\n                code\n                options {\n                    ...ProductOption\n                }\n            }\n            variants {\n                id\n                createdAt\n                updatedAt\n                enabled\n                name\n                sku\n                price\n                stockOnHand\n                enabled\n                options {\n                    id\n                    createdAt\n                    updatedAt\n                    name\n                    code\n                    groupId\n                }\n            }\n        }\n    }\n    ", "\n"])), PRODUCT_OPTION_FRAGMENT);
    var ASSIGN_PRODUCTS_TO_CHANNEL = apolloAngular.gql(templateObject_32 || (templateObject_32 = __makeTemplateObject(["\n    mutation AssignProductsToChannel($input: AssignProductsToChannelInput!) {\n        assignProductsToChannel(input: $input) {\n            id\n            channels {\n                id\n                code\n            }\n        }\n    }\n"], ["\n    mutation AssignProductsToChannel($input: AssignProductsToChannelInput!) {\n        assignProductsToChannel(input: $input) {\n            id\n            channels {\n                id\n                code\n            }\n        }\n    }\n"])));
    var ASSIGN_VARIANTS_TO_CHANNEL = apolloAngular.gql(templateObject_33 || (templateObject_33 = __makeTemplateObject(["\n    mutation AssignVariantsToChannel($input: AssignProductVariantsToChannelInput!) {\n        assignProductVariantsToChannel(input: $input) {\n            id\n            channels {\n                id\n                code\n            }\n        }\n    }\n"], ["\n    mutation AssignVariantsToChannel($input: AssignProductVariantsToChannelInput!) {\n        assignProductVariantsToChannel(input: $input) {\n            id\n            channels {\n                id\n                code\n            }\n        }\n    }\n"])));
    var REMOVE_PRODUCTS_FROM_CHANNEL = apolloAngular.gql(templateObject_34 || (templateObject_34 = __makeTemplateObject(["\n    mutation RemoveProductsFromChannel($input: RemoveProductsFromChannelInput!) {\n        removeProductsFromChannel(input: $input) {\n            id\n            channels {\n                id\n                code\n            }\n        }\n    }\n"], ["\n    mutation RemoveProductsFromChannel($input: RemoveProductsFromChannelInput!) {\n        removeProductsFromChannel(input: $input) {\n            id\n            channels {\n                id\n                code\n            }\n        }\n    }\n"])));
    var REMOVE_VARIANTS_FROM_CHANNEL = apolloAngular.gql(templateObject_35 || (templateObject_35 = __makeTemplateObject(["\n    mutation RemoveVariantsFromChannel($input: RemoveProductVariantsFromChannelInput!) {\n        removeProductVariantsFromChannel(input: $input) {\n            id\n            channels {\n                id\n                code\n            }\n        }\n    }\n"], ["\n    mutation RemoveVariantsFromChannel($input: RemoveProductVariantsFromChannelInput!) {\n        removeProductVariantsFromChannel(input: $input) {\n            id\n            channels {\n                id\n                code\n            }\n        }\n    }\n"])));
    var GET_PRODUCT_VARIANT = apolloAngular.gql(templateObject_36 || (templateObject_36 = __makeTemplateObject(["\n    query GetProductVariant($id: ID!) {\n        productVariant(id: $id) {\n            id\n            name\n            sku\n            featuredAsset {\n                id\n                preview\n                focalPoint {\n                    x\n                    y\n                }\n            }\n            product {\n                id\n                featuredAsset {\n                    id\n                    preview\n                    focalPoint {\n                        x\n                        y\n                    }\n                }\n            }\n        }\n    }\n"], ["\n    query GetProductVariant($id: ID!) {\n        productVariant(id: $id) {\n            id\n            name\n            sku\n            featuredAsset {\n                id\n                preview\n                focalPoint {\n                    x\n                    y\n                }\n            }\n            product {\n                id\n                featuredAsset {\n                    id\n                    preview\n                    focalPoint {\n                        x\n                        y\n                    }\n                }\n            }\n        }\n    }\n"])));
    var GET_PRODUCT_VARIANT_LIST = apolloAngular.gql(templateObject_37 || (templateObject_37 = __makeTemplateObject(["\n    query GetProductVariantList($options: ProductVariantListOptions!) {\n        productVariants(options: $options) {\n            items {\n                id\n                name\n                sku\n                featuredAsset {\n                    id\n                    preview\n                    focalPoint {\n                        x\n                        y\n                    }\n                }\n                product {\n                    id\n                    featuredAsset {\n                        id\n                        preview\n                        focalPoint {\n                            x\n                            y\n                        }\n                    }\n                }\n            }\n            totalItems\n        }\n    }\n"], ["\n    query GetProductVariantList($options: ProductVariantListOptions!) {\n        productVariants(options: $options) {\n            items {\n                id\n                name\n                sku\n                featuredAsset {\n                    id\n                    preview\n                    focalPoint {\n                        x\n                        y\n                    }\n                }\n                product {\n                    id\n                    featuredAsset {\n                        id\n                        preview\n                        focalPoint {\n                            x\n                            y\n                        }\n                    }\n                }\n            }\n            totalItems\n        }\n    }\n"])));
    var GET_TAG_LIST = apolloAngular.gql(templateObject_38 || (templateObject_38 = __makeTemplateObject(["\n    query GetTagList($options: TagListOptions) {\n        tags(options: $options) {\n            items {\n                ...Tag\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetTagList($options: TagListOptions) {\n        tags(options: $options) {\n            items {\n                ...Tag\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), TAG_FRAGMENT);
    var GET_TAG = apolloAngular.gql(templateObject_39 || (templateObject_39 = __makeTemplateObject(["\n    query GetTag($id: ID!) {\n        tag(id: $id) {\n            ...Tag\n        }\n    }\n    ", "\n"], ["\n    query GetTag($id: ID!) {\n        tag(id: $id) {\n            ...Tag\n        }\n    }\n    ", "\n"])), TAG_FRAGMENT);
    var CREATE_TAG = apolloAngular.gql(templateObject_40 || (templateObject_40 = __makeTemplateObject(["\n    mutation CreateTag($input: CreateTagInput!) {\n        createTag(input: $input) {\n            ...Tag\n        }\n    }\n    ", "\n"], ["\n    mutation CreateTag($input: CreateTagInput!) {\n        createTag(input: $input) {\n            ...Tag\n        }\n    }\n    ", "\n"])), TAG_FRAGMENT);
    var UPDATE_TAG = apolloAngular.gql(templateObject_41 || (templateObject_41 = __makeTemplateObject(["\n    mutation UpdateTag($input: UpdateTagInput!) {\n        updateTag(input: $input) {\n            ...Tag\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateTag($input: UpdateTagInput!) {\n        updateTag(input: $input) {\n            ...Tag\n        }\n    }\n    ", "\n"])), TAG_FRAGMENT);
    var DELETE_TAG = apolloAngular.gql(templateObject_42 || (templateObject_42 = __makeTemplateObject(["\n    mutation DeleteTag($id: ID!) {\n        deleteTag(id: $id) {\n            message\n            result\n        }\n    }\n"], ["\n    mutation DeleteTag($id: ID!) {\n        deleteTag(id: $id) {\n            message\n            result\n        }\n    }\n"])));
    var templateObject_1$6, templateObject_2$6, templateObject_3$6, templateObject_4$6, templateObject_5$6, templateObject_6$6, templateObject_7$6, templateObject_8$5, templateObject_9$5, templateObject_10$3, templateObject_11$2, templateObject_12$2, templateObject_13$2, templateObject_14$2, templateObject_15$2, templateObject_16$2, templateObject_17$2, templateObject_18$2, templateObject_19$2, templateObject_20$2, templateObject_21$1, templateObject_22$1, templateObject_23$1, templateObject_24$1, templateObject_25$1, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42;

    var GET_COLLECTION_FILTERS = apolloAngular.gql(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n    query GetCollectionFilters {\n        collectionFilters {\n            ...ConfigurableOperationDef\n        }\n    }\n    ", "\n"], ["\n    query GetCollectionFilters {\n        collectionFilters {\n            ...ConfigurableOperationDef\n        }\n    }\n    ", "\n"])), CONFIGURABLE_OPERATION_DEF_FRAGMENT);
    var COLLECTION_FRAGMENT = apolloAngular.gql(templateObject_2$5 || (templateObject_2$5 = __makeTemplateObject(["\n    fragment Collection on Collection {\n        id\n        createdAt\n        updatedAt\n        name\n        slug\n        description\n        isPrivate\n        languageCode\n        featuredAsset {\n            ...Asset\n        }\n        assets {\n            ...Asset\n        }\n        filters {\n            ...ConfigurableOperation\n        }\n        translations {\n            id\n            languageCode\n            name\n            slug\n            description\n        }\n        parent {\n            id\n            name\n        }\n        children {\n            id\n            name\n        }\n    }\n    ", "\n    ", "\n"], ["\n    fragment Collection on Collection {\n        id\n        createdAt\n        updatedAt\n        name\n        slug\n        description\n        isPrivate\n        languageCode\n        featuredAsset {\n            ...Asset\n        }\n        assets {\n            ...Asset\n        }\n        filters {\n            ...ConfigurableOperation\n        }\n        translations {\n            id\n            languageCode\n            name\n            slug\n            description\n        }\n        parent {\n            id\n            name\n        }\n        children {\n            id\n            name\n        }\n    }\n    ", "\n    ", "\n"])), ASSET_FRAGMENT, CONFIGURABLE_OPERATION_FRAGMENT);
    var GET_COLLECTION_LIST = apolloAngular.gql(templateObject_3$5 || (templateObject_3$5 = __makeTemplateObject(["\n    query GetCollectionList($options: CollectionListOptions) {\n        collections(options: $options) {\n            items {\n                id\n                name\n                slug\n                description\n                isPrivate\n                featuredAsset {\n                    ...Asset\n                }\n                parent {\n                    id\n                }\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetCollectionList($options: CollectionListOptions) {\n        collections(options: $options) {\n            items {\n                id\n                name\n                slug\n                description\n                isPrivate\n                featuredAsset {\n                    ...Asset\n                }\n                parent {\n                    id\n                }\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), ASSET_FRAGMENT);
    var GET_COLLECTION = apolloAngular.gql(templateObject_4$5 || (templateObject_4$5 = __makeTemplateObject(["\n    query GetCollection($id: ID!) {\n        collection(id: $id) {\n            ...Collection\n        }\n    }\n    ", "\n"], ["\n    query GetCollection($id: ID!) {\n        collection(id: $id) {\n            ...Collection\n        }\n    }\n    ", "\n"])), COLLECTION_FRAGMENT);
    var CREATE_COLLECTION = apolloAngular.gql(templateObject_5$5 || (templateObject_5$5 = __makeTemplateObject(["\n    mutation CreateCollection($input: CreateCollectionInput!) {\n        createCollection(input: $input) {\n            ...Collection\n        }\n    }\n    ", "\n"], ["\n    mutation CreateCollection($input: CreateCollectionInput!) {\n        createCollection(input: $input) {\n            ...Collection\n        }\n    }\n    ", "\n"])), COLLECTION_FRAGMENT);
    var UPDATE_COLLECTION = apolloAngular.gql(templateObject_6$5 || (templateObject_6$5 = __makeTemplateObject(["\n    mutation UpdateCollection($input: UpdateCollectionInput!) {\n        updateCollection(input: $input) {\n            ...Collection\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateCollection($input: UpdateCollectionInput!) {\n        updateCollection(input: $input) {\n            ...Collection\n        }\n    }\n    ", "\n"])), COLLECTION_FRAGMENT);
    var MOVE_COLLECTION = apolloAngular.gql(templateObject_7$5 || (templateObject_7$5 = __makeTemplateObject(["\n    mutation MoveCollection($input: MoveCollectionInput!) {\n        moveCollection(input: $input) {\n            ...Collection\n        }\n    }\n    ", "\n"], ["\n    mutation MoveCollection($input: MoveCollectionInput!) {\n        moveCollection(input: $input) {\n            ...Collection\n        }\n    }\n    ", "\n"])), COLLECTION_FRAGMENT);
    var DELETE_COLLECTION = apolloAngular.gql(templateObject_8$4 || (templateObject_8$4 = __makeTemplateObject(["\n    mutation DeleteCollection($id: ID!) {\n        deleteCollection(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteCollection($id: ID!) {\n        deleteCollection(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var GET_COLLECTION_CONTENTS = apolloAngular.gql(templateObject_9$4 || (templateObject_9$4 = __makeTemplateObject(["\n    query GetCollectionContents($id: ID!, $options: ProductVariantListOptions) {\n        collection(id: $id) {\n            id\n            name\n            productVariants(options: $options) {\n                items {\n                    id\n                    productId\n                    name\n                }\n                totalItems\n            }\n        }\n    }\n"], ["\n    query GetCollectionContents($id: ID!, $options: ProductVariantListOptions) {\n        collection(id: $id) {\n            id\n            name\n            productVariants(options: $options) {\n                items {\n                    id\n                    productId\n                    name\n                }\n                totalItems\n            }\n        }\n    }\n"])));
    var templateObject_1$5, templateObject_2$5, templateObject_3$5, templateObject_4$5, templateObject_5$5, templateObject_6$5, templateObject_7$5, templateObject_8$4, templateObject_9$4;

    var CollectionDataService = /** @class */ (function () {
        function CollectionDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        CollectionDataService.prototype.getCollectionFilters = function () {
            return this.baseDataService.query(GET_COLLECTION_FILTERS);
        };
        CollectionDataService.prototype.getCollections = function (take, skip) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(GET_COLLECTION_LIST, {
                options: {
                    take: take,
                    skip: skip,
                },
            });
        };
        CollectionDataService.prototype.getCollection = function (id) {
            return this.baseDataService.query(GET_COLLECTION, {
                id: id,
            });
        };
        CollectionDataService.prototype.createCollection = function (input) {
            return this.baseDataService.mutate(CREATE_COLLECTION, {
                input: pick.pick(input, [
                    'translations',
                    'parentId',
                    'assetIds',
                    'featuredAssetId',
                    'filters',
                    'customFields',
                ]),
            });
        };
        CollectionDataService.prototype.updateCollection = function (input) {
            return this.baseDataService.mutate(UPDATE_COLLECTION, {
                input: pick.pick(input, [
                    'id',
                    'isPrivate',
                    'translations',
                    'assetIds',
                    'featuredAssetId',
                    'filters',
                    'customFields',
                ]),
            });
        };
        CollectionDataService.prototype.moveCollection = function (inputs) {
            var _this = this;
            return rxjs.from(inputs).pipe(operators.concatMap(function (input) { return _this.baseDataService.mutate(MOVE_COLLECTION, { input: input }); }), operators.bufferCount(inputs.length));
        };
        CollectionDataService.prototype.deleteCollection = function (id) {
            return this.baseDataService.mutate(DELETE_COLLECTION, {
                id: id,
            });
        };
        CollectionDataService.prototype.getCollectionContents = function (id, take, skip, filterTerm) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            var filter = filterTerm
                ? { name: { contains: filterTerm } }
                : undefined;
            return this.baseDataService.query(GET_COLLECTION_CONTENTS, {
                id: id,
                options: {
                    skip: skip,
                    take: take,
                    filter: filter,
                },
            });
        };
        return CollectionDataService;
    }());

    var ADDRESS_FRAGMENT = apolloAngular.gql(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n    fragment Address on Address {\n        id\n        createdAt\n        updatedAt\n        fullName\n        company\n        streetLine1\n        streetLine2\n        city\n        province\n        postalCode\n        country {\n            id\n            code\n            name\n        }\n        phoneNumber\n        defaultShippingAddress\n        defaultBillingAddress\n    }\n"], ["\n    fragment Address on Address {\n        id\n        createdAt\n        updatedAt\n        fullName\n        company\n        streetLine1\n        streetLine2\n        city\n        province\n        postalCode\n        country {\n            id\n            code\n            name\n        }\n        phoneNumber\n        defaultShippingAddress\n        defaultBillingAddress\n    }\n"])));
    var CUSTOMER_FRAGMENT = apolloAngular.gql(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n    fragment Customer on Customer {\n        id\n        createdAt\n        updatedAt\n        title\n        firstName\n        lastName\n        phoneNumber\n        emailAddress\n        user {\n            id\n            identifier\n            verified\n            lastLogin\n        }\n        addresses {\n            ...Address\n        }\n    }\n    ", "\n"], ["\n    fragment Customer on Customer {\n        id\n        createdAt\n        updatedAt\n        title\n        firstName\n        lastName\n        phoneNumber\n        emailAddress\n        user {\n            id\n            identifier\n            verified\n            lastLogin\n        }\n        addresses {\n            ...Address\n        }\n    }\n    ", "\n"])), ADDRESS_FRAGMENT);
    var GET_CUSTOMER_LIST = apolloAngular.gql(templateObject_3$4 || (templateObject_3$4 = __makeTemplateObject(["\n    query GetCustomerList($options: CustomerListOptions) {\n        customers(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                title\n                firstName\n                lastName\n                emailAddress\n                user {\n                    id\n                    verified\n                }\n            }\n            totalItems\n        }\n    }\n"], ["\n    query GetCustomerList($options: CustomerListOptions) {\n        customers(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                title\n                firstName\n                lastName\n                emailAddress\n                user {\n                    id\n                    verified\n                }\n            }\n            totalItems\n        }\n    }\n"])));
    var GET_CUSTOMER = apolloAngular.gql(templateObject_4$4 || (templateObject_4$4 = __makeTemplateObject(["\n    query GetCustomer($id: ID!, $orderListOptions: OrderListOptions) {\n        customer(id: $id) {\n            ...Customer\n            groups {\n                id\n                name\n            }\n            orders(options: $orderListOptions) {\n                items {\n                    id\n                    code\n                    state\n                    total\n                    currencyCode\n                    updatedAt\n                }\n                totalItems\n            }\n        }\n    }\n    ", "\n"], ["\n    query GetCustomer($id: ID!, $orderListOptions: OrderListOptions) {\n        customer(id: $id) {\n            ...Customer\n            groups {\n                id\n                name\n            }\n            orders(options: $orderListOptions) {\n                items {\n                    id\n                    code\n                    state\n                    total\n                    currencyCode\n                    updatedAt\n                }\n                totalItems\n            }\n        }\n    }\n    ", "\n"])), CUSTOMER_FRAGMENT);
    var CREATE_CUSTOMER = apolloAngular.gql(templateObject_5$4 || (templateObject_5$4 = __makeTemplateObject(["\n    mutation CreateCustomer($input: CreateCustomerInput!, $password: String) {\n        createCustomer(input: $input, password: $password) {\n            ...Customer\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation CreateCustomer($input: CreateCustomerInput!, $password: String) {\n        createCustomer(input: $input, password: $password) {\n            ...Customer\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), CUSTOMER_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var UPDATE_CUSTOMER = apolloAngular.gql(templateObject_6$4 || (templateObject_6$4 = __makeTemplateObject(["\n    mutation UpdateCustomer($input: UpdateCustomerInput!) {\n        updateCustomer(input: $input) {\n            ...Customer\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation UpdateCustomer($input: UpdateCustomerInput!) {\n        updateCustomer(input: $input) {\n            ...Customer\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), CUSTOMER_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var DELETE_CUSTOMER = apolloAngular.gql(templateObject_7$4 || (templateObject_7$4 = __makeTemplateObject(["\n    mutation DeleteCustomer($id: ID!) {\n        deleteCustomer(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteCustomer($id: ID!) {\n        deleteCustomer(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var CREATE_CUSTOMER_ADDRESS = apolloAngular.gql(templateObject_8$3 || (templateObject_8$3 = __makeTemplateObject(["\n    mutation CreateCustomerAddress($customerId: ID!, $input: CreateAddressInput!) {\n        createCustomerAddress(customerId: $customerId, input: $input) {\n            ...Address\n        }\n    }\n    ", "\n"], ["\n    mutation CreateCustomerAddress($customerId: ID!, $input: CreateAddressInput!) {\n        createCustomerAddress(customerId: $customerId, input: $input) {\n            ...Address\n        }\n    }\n    ", "\n"])), ADDRESS_FRAGMENT);
    var UPDATE_CUSTOMER_ADDRESS = apolloAngular.gql(templateObject_9$3 || (templateObject_9$3 = __makeTemplateObject(["\n    mutation UpdateCustomerAddress($input: UpdateAddressInput!) {\n        updateCustomerAddress(input: $input) {\n            ...Address\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateCustomerAddress($input: UpdateAddressInput!) {\n        updateCustomerAddress(input: $input) {\n            ...Address\n        }\n    }\n    ", "\n"])), ADDRESS_FRAGMENT);
    var CREATE_CUSTOMER_GROUP = apolloAngular.gql(templateObject_10$2 || (templateObject_10$2 = __makeTemplateObject(["\n    mutation CreateCustomerGroup($input: CreateCustomerGroupInput!) {\n        createCustomerGroup(input: $input) {\n            id\n            createdAt\n            updatedAt\n            name\n        }\n    }\n"], ["\n    mutation CreateCustomerGroup($input: CreateCustomerGroupInput!) {\n        createCustomerGroup(input: $input) {\n            id\n            createdAt\n            updatedAt\n            name\n        }\n    }\n"])));
    var UPDATE_CUSTOMER_GROUP = apolloAngular.gql(templateObject_11$1 || (templateObject_11$1 = __makeTemplateObject(["\n    mutation UpdateCustomerGroup($input: UpdateCustomerGroupInput!) {\n        updateCustomerGroup(input: $input) {\n            id\n            createdAt\n            updatedAt\n            name\n        }\n    }\n"], ["\n    mutation UpdateCustomerGroup($input: UpdateCustomerGroupInput!) {\n        updateCustomerGroup(input: $input) {\n            id\n            createdAt\n            updatedAt\n            name\n        }\n    }\n"])));
    var DELETE_CUSTOMER_GROUP = apolloAngular.gql(templateObject_12$1 || (templateObject_12$1 = __makeTemplateObject(["\n    mutation DeleteCustomerGroup($id: ID!) {\n        deleteCustomerGroup(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteCustomerGroup($id: ID!) {\n        deleteCustomerGroup(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var GET_CUSTOMER_GROUPS = apolloAngular.gql(templateObject_13$1 || (templateObject_13$1 = __makeTemplateObject(["\n    query GetCustomerGroups($options: CustomerGroupListOptions) {\n        customerGroups(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n            }\n            totalItems\n        }\n    }\n"], ["\n    query GetCustomerGroups($options: CustomerGroupListOptions) {\n        customerGroups(options: $options) {\n            items {\n                id\n                createdAt\n                updatedAt\n                name\n            }\n            totalItems\n        }\n    }\n"])));
    var GET_CUSTOMER_GROUP_WITH_CUSTOMERS = apolloAngular.gql(templateObject_14$1 || (templateObject_14$1 = __makeTemplateObject(["\n    query GetCustomerGroupWithCustomers($id: ID!, $options: CustomerListOptions) {\n        customerGroup(id: $id) {\n            id\n            createdAt\n            updatedAt\n            name\n            customers(options: $options) {\n                items {\n                    id\n                    createdAt\n                    updatedAt\n                    emailAddress\n                    firstName\n                    lastName\n                }\n                totalItems\n            }\n        }\n    }\n"], ["\n    query GetCustomerGroupWithCustomers($id: ID!, $options: CustomerListOptions) {\n        customerGroup(id: $id) {\n            id\n            createdAt\n            updatedAt\n            name\n            customers(options: $options) {\n                items {\n                    id\n                    createdAt\n                    updatedAt\n                    emailAddress\n                    firstName\n                    lastName\n                }\n                totalItems\n            }\n        }\n    }\n"])));
    var ADD_CUSTOMERS_TO_GROUP = apolloAngular.gql(templateObject_15$1 || (templateObject_15$1 = __makeTemplateObject(["\n    mutation AddCustomersToGroup($groupId: ID!, $customerIds: [ID!]!) {\n        addCustomersToGroup(customerGroupId: $groupId, customerIds: $customerIds) {\n            id\n            createdAt\n            updatedAt\n            name\n        }\n    }\n"], ["\n    mutation AddCustomersToGroup($groupId: ID!, $customerIds: [ID!]!) {\n        addCustomersToGroup(customerGroupId: $groupId, customerIds: $customerIds) {\n            id\n            createdAt\n            updatedAt\n            name\n        }\n    }\n"])));
    var REMOVE_CUSTOMERS_FROM_GROUP = apolloAngular.gql(templateObject_16$1 || (templateObject_16$1 = __makeTemplateObject(["\n    mutation RemoveCustomersFromGroup($groupId: ID!, $customerIds: [ID!]!) {\n        removeCustomersFromGroup(customerGroupId: $groupId, customerIds: $customerIds) {\n            id\n            createdAt\n            updatedAt\n            name\n        }\n    }\n"], ["\n    mutation RemoveCustomersFromGroup($groupId: ID!, $customerIds: [ID!]!) {\n        removeCustomersFromGroup(customerGroupId: $groupId, customerIds: $customerIds) {\n            id\n            createdAt\n            updatedAt\n            name\n        }\n    }\n"])));
    var GET_CUSTOMER_HISTORY = apolloAngular.gql(templateObject_17$1 || (templateObject_17$1 = __makeTemplateObject(["\n    query GetCustomerHistory($id: ID!, $options: HistoryEntryListOptions) {\n        customer(id: $id) {\n            id\n            history(options: $options) {\n                totalItems\n                items {\n                    id\n                    type\n                    createdAt\n                    isPublic\n                    administrator {\n                        id\n                        firstName\n                        lastName\n                    }\n                    data\n                }\n            }\n        }\n    }\n"], ["\n    query GetCustomerHistory($id: ID!, $options: HistoryEntryListOptions) {\n        customer(id: $id) {\n            id\n            history(options: $options) {\n                totalItems\n                items {\n                    id\n                    type\n                    createdAt\n                    isPublic\n                    administrator {\n                        id\n                        firstName\n                        lastName\n                    }\n                    data\n                }\n            }\n        }\n    }\n"])));
    var ADD_NOTE_TO_CUSTOMER = apolloAngular.gql(templateObject_18$1 || (templateObject_18$1 = __makeTemplateObject(["\n    mutation AddNoteToCustomer($input: AddNoteToCustomerInput!) {\n        addNoteToCustomer(input: $input) {\n            id\n        }\n    }\n"], ["\n    mutation AddNoteToCustomer($input: AddNoteToCustomerInput!) {\n        addNoteToCustomer(input: $input) {\n            id\n        }\n    }\n"])));
    var UPDATE_CUSTOMER_NOTE = apolloAngular.gql(templateObject_19$1 || (templateObject_19$1 = __makeTemplateObject(["\n    mutation UpdateCustomerNote($input: UpdateCustomerNoteInput!) {\n        updateCustomerNote(input: $input) {\n            id\n            data\n            isPublic\n        }\n    }\n"], ["\n    mutation UpdateCustomerNote($input: UpdateCustomerNoteInput!) {\n        updateCustomerNote(input: $input) {\n            id\n            data\n            isPublic\n        }\n    }\n"])));
    var DELETE_CUSTOMER_NOTE = apolloAngular.gql(templateObject_20$1 || (templateObject_20$1 = __makeTemplateObject(["\n    mutation DeleteCustomerNote($id: ID!) {\n        deleteCustomerNote(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteCustomerNote($id: ID!) {\n        deleteCustomerNote(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var templateObject_1$4, templateObject_2$4, templateObject_3$4, templateObject_4$4, templateObject_5$4, templateObject_6$4, templateObject_7$4, templateObject_8$3, templateObject_9$3, templateObject_10$2, templateObject_11$1, templateObject_12$1, templateObject_13$1, templateObject_14$1, templateObject_15$1, templateObject_16$1, templateObject_17$1, templateObject_18$1, templateObject_19$1, templateObject_20$1;

    var CustomerDataService = /** @class */ (function () {
        function CustomerDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        CustomerDataService.prototype.getCustomerList = function (take, skip, filterTerm) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            var filter = filterTerm
                ? {
                    filter: {
                        emailAddress: {
                            contains: filterTerm,
                        },
                    },
                }
                : {};
            return this.baseDataService.query(GET_CUSTOMER_LIST, {
                options: Object.assign({ take: take,
                    skip: skip }, filter),
            });
        };
        CustomerDataService.prototype.getCustomer = function (id, orderListOptions) {
            return this.baseDataService.query(GET_CUSTOMER, {
                id: id,
                orderListOptions: orderListOptions,
            });
        };
        CustomerDataService.prototype.createCustomer = function (input, password) {
            return this.baseDataService.mutate(CREATE_CUSTOMER, {
                input: input,
                password: password,
            });
        };
        CustomerDataService.prototype.updateCustomer = function (input) {
            return this.baseDataService.mutate(UPDATE_CUSTOMER, {
                input: input,
            });
        };
        CustomerDataService.prototype.deleteCustomer = function (id) {
            return this.baseDataService.mutate(DELETE_CUSTOMER, { id: id });
        };
        CustomerDataService.prototype.createCustomerAddress = function (customerId, input) {
            return this.baseDataService.mutate(CREATE_CUSTOMER_ADDRESS, {
                customerId: customerId,
                input: input,
            });
        };
        CustomerDataService.prototype.updateCustomerAddress = function (input) {
            return this.baseDataService.mutate(UPDATE_CUSTOMER_ADDRESS, {
                input: input,
            });
        };
        CustomerDataService.prototype.createCustomerGroup = function (input) {
            return this.baseDataService.mutate(CREATE_CUSTOMER_GROUP, {
                input: input,
            });
        };
        CustomerDataService.prototype.updateCustomerGroup = function (input) {
            return this.baseDataService.mutate(UPDATE_CUSTOMER_GROUP, {
                input: input,
            });
        };
        CustomerDataService.prototype.deleteCustomerGroup = function (id) {
            return this.baseDataService.mutate(DELETE_CUSTOMER_GROUP, { id: id });
        };
        CustomerDataService.prototype.getCustomerGroupList = function (options) {
            return this.baseDataService.query(GET_CUSTOMER_GROUPS, {
                options: options,
            });
        };
        CustomerDataService.prototype.getCustomerGroupWithCustomers = function (id, options) {
            return this.baseDataService.query(GET_CUSTOMER_GROUP_WITH_CUSTOMERS, {
                id: id,
                options: options,
            });
        };
        CustomerDataService.prototype.addCustomersToGroup = function (groupId, customerIds) {
            return this.baseDataService.mutate(ADD_CUSTOMERS_TO_GROUP, {
                groupId: groupId,
                customerIds: customerIds,
            });
        };
        CustomerDataService.prototype.removeCustomersFromGroup = function (groupId, customerIds) {
            return this.baseDataService.mutate(REMOVE_CUSTOMERS_FROM_GROUP, {
                groupId: groupId,
                customerIds: customerIds,
            });
        };
        CustomerDataService.prototype.getCustomerHistory = function (id, options) {
            return this.baseDataService.query(GET_CUSTOMER_HISTORY, {
                id: id,
                options: options,
            });
        };
        CustomerDataService.prototype.addNoteToCustomer = function (customerId, note) {
            return this.baseDataService.mutate(ADD_NOTE_TO_CUSTOMER, {
                input: {
                    note: note,
                    isPublic: false,
                    id: customerId,
                },
            });
        };
        CustomerDataService.prototype.updateCustomerNote = function (input) {
            return this.baseDataService.mutate(UPDATE_CUSTOMER_NOTE, {
                input: input,
            });
        };
        CustomerDataService.prototype.deleteCustomerNote = function (id) {
            return this.baseDataService.mutate(DELETE_CUSTOMER_NOTE, {
                id: id,
            });
        };
        return CustomerDataService;
    }());

    var FACET_VALUE_FRAGMENT = apolloAngular.gql(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n    fragment FacetValue on FacetValue {\n        id\n        createdAt\n        updatedAt\n        languageCode\n        code\n        name\n        translations {\n            id\n            languageCode\n            name\n        }\n        facet {\n            id\n            createdAt\n            updatedAt\n            name\n        }\n    }\n"], ["\n    fragment FacetValue on FacetValue {\n        id\n        createdAt\n        updatedAt\n        languageCode\n        code\n        name\n        translations {\n            id\n            languageCode\n            name\n        }\n        facet {\n            id\n            createdAt\n            updatedAt\n            name\n        }\n    }\n"])));
    var FACET_WITH_VALUES_FRAGMENT = apolloAngular.gql(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n    fragment FacetWithValues on Facet {\n        id\n        createdAt\n        updatedAt\n        languageCode\n        isPrivate\n        code\n        name\n        translations {\n            id\n            languageCode\n            name\n        }\n        values {\n            ...FacetValue\n        }\n    }\n    ", "\n"], ["\n    fragment FacetWithValues on Facet {\n        id\n        createdAt\n        updatedAt\n        languageCode\n        isPrivate\n        code\n        name\n        translations {\n            id\n            languageCode\n            name\n        }\n        values {\n            ...FacetValue\n        }\n    }\n    ", "\n"])), FACET_VALUE_FRAGMENT);
    var CREATE_FACET = apolloAngular.gql(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n    mutation CreateFacet($input: CreateFacetInput!) {\n        createFacet(input: $input) {\n            ...FacetWithValues\n        }\n    }\n    ", "\n"], ["\n    mutation CreateFacet($input: CreateFacetInput!) {\n        createFacet(input: $input) {\n            ...FacetWithValues\n        }\n    }\n    ", "\n"])), FACET_WITH_VALUES_FRAGMENT);
    var UPDATE_FACET = apolloAngular.gql(templateObject_4$3 || (templateObject_4$3 = __makeTemplateObject(["\n    mutation UpdateFacet($input: UpdateFacetInput!) {\n        updateFacet(input: $input) {\n            ...FacetWithValues\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateFacet($input: UpdateFacetInput!) {\n        updateFacet(input: $input) {\n            ...FacetWithValues\n        }\n    }\n    ", "\n"])), FACET_WITH_VALUES_FRAGMENT);
    var DELETE_FACET = apolloAngular.gql(templateObject_5$3 || (templateObject_5$3 = __makeTemplateObject(["\n    mutation DeleteFacet($id: ID!, $force: Boolean) {\n        deleteFacet(id: $id, force: $force) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteFacet($id: ID!, $force: Boolean) {\n        deleteFacet(id: $id, force: $force) {\n            result\n            message\n        }\n    }\n"])));
    var CREATE_FACET_VALUES = apolloAngular.gql(templateObject_6$3 || (templateObject_6$3 = __makeTemplateObject(["\n    mutation CreateFacetValues($input: [CreateFacetValueInput!]!) {\n        createFacetValues(input: $input) {\n            ...FacetValue\n        }\n    }\n    ", "\n"], ["\n    mutation CreateFacetValues($input: [CreateFacetValueInput!]!) {\n        createFacetValues(input: $input) {\n            ...FacetValue\n        }\n    }\n    ", "\n"])), FACET_VALUE_FRAGMENT);
    var UPDATE_FACET_VALUES = apolloAngular.gql(templateObject_7$3 || (templateObject_7$3 = __makeTemplateObject(["\n    mutation UpdateFacetValues($input: [UpdateFacetValueInput!]!) {\n        updateFacetValues(input: $input) {\n            ...FacetValue\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateFacetValues($input: [UpdateFacetValueInput!]!) {\n        updateFacetValues(input: $input) {\n            ...FacetValue\n        }\n    }\n    ", "\n"])), FACET_VALUE_FRAGMENT);
    var DELETE_FACET_VALUES = apolloAngular.gql(templateObject_8$2 || (templateObject_8$2 = __makeTemplateObject(["\n    mutation DeleteFacetValues($ids: [ID!]!, $force: Boolean) {\n        deleteFacetValues(ids: $ids, force: $force) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteFacetValues($ids: [ID!]!, $force: Boolean) {\n        deleteFacetValues(ids: $ids, force: $force) {\n            result\n            message\n        }\n    }\n"])));
    var GET_FACET_LIST = apolloAngular.gql(templateObject_9$2 || (templateObject_9$2 = __makeTemplateObject(["\n    query GetFacetList($options: FacetListOptions) {\n        facets(options: $options) {\n            items {\n                ...FacetWithValues\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetFacetList($options: FacetListOptions) {\n        facets(options: $options) {\n            items {\n                ...FacetWithValues\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), FACET_WITH_VALUES_FRAGMENT);
    var GET_FACET_WITH_VALUES = apolloAngular.gql(templateObject_10$1 || (templateObject_10$1 = __makeTemplateObject(["\n    query GetFacetWithValues($id: ID!) {\n        facet(id: $id) {\n            ...FacetWithValues\n        }\n    }\n    ", "\n"], ["\n    query GetFacetWithValues($id: ID!) {\n        facet(id: $id) {\n            ...FacetWithValues\n        }\n    }\n    ", "\n"])), FACET_WITH_VALUES_FRAGMENT);
    var templateObject_1$3, templateObject_2$3, templateObject_3$3, templateObject_4$3, templateObject_5$3, templateObject_6$3, templateObject_7$3, templateObject_8$2, templateObject_9$2, templateObject_10$1;

    var FacetDataService = /** @class */ (function () {
        function FacetDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        FacetDataService.prototype.getFacets = function (take, skip) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(GET_FACET_LIST, {
                options: {
                    take: take,
                    skip: skip,
                },
            });
        };
        FacetDataService.prototype.getAllFacets = function () {
            return this.baseDataService.query(GET_FACET_LIST, {});
        };
        FacetDataService.prototype.getFacet = function (id) {
            return this.baseDataService.query(GET_FACET_WITH_VALUES, {
                id: id,
            });
        };
        FacetDataService.prototype.createFacet = function (facet) {
            var input = {
                input: pick.pick(facet, ['code', 'isPrivate', 'translations', 'values', 'customFields']),
            };
            return this.baseDataService.mutate(CREATE_FACET, input);
        };
        FacetDataService.prototype.updateFacet = function (facet) {
            var input = {
                input: pick.pick(facet, ['id', 'code', 'isPrivate', 'translations', 'customFields']),
            };
            return this.baseDataService.mutate(UPDATE_FACET, input);
        };
        FacetDataService.prototype.deleteFacet = function (id, force) {
            return this.baseDataService.mutate(DELETE_FACET, {
                id: id,
                force: force,
            });
        };
        FacetDataService.prototype.createFacetValues = function (facetValues) {
            var input = {
                input: facetValues.map(pick.pick(['facetId', 'code', 'translations', 'customFields'])),
            };
            return this.baseDataService.mutate(CREATE_FACET_VALUES, input);
        };
        FacetDataService.prototype.updateFacetValues = function (facetValues) {
            var input = {
                input: facetValues.map(pick.pick(['id', 'code', 'translations', 'customFields'])),
            };
            return this.baseDataService.mutate(UPDATE_FACET_VALUES, input);
        };
        FacetDataService.prototype.deleteFacetValues = function (ids, force) {
            return this.baseDataService.mutate(DELETE_FACET_VALUES, {
                ids: ids,
                force: force,
            });
        };
        return FacetDataService;
    }());

    var DISCOUNT_FRAGMENT = apolloAngular.gql(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n    fragment Discount on Discount {\n        adjustmentSource\n        amount\n        amountWithTax\n        description\n        type\n    }\n"], ["\n    fragment Discount on Discount {\n        adjustmentSource\n        amount\n        amountWithTax\n        description\n        type\n    }\n"])));
    var REFUND_FRAGMENT = apolloAngular.gql(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n    fragment Refund on Refund {\n        id\n        state\n        items\n        shipping\n        adjustment\n        transactionId\n        paymentId\n    }\n"], ["\n    fragment Refund on Refund {\n        id\n        state\n        items\n        shipping\n        adjustment\n        transactionId\n        paymentId\n    }\n"])));
    var ORDER_ADDRESS_FRAGMENT = apolloAngular.gql(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n    fragment OrderAddress on OrderAddress {\n        fullName\n        company\n        streetLine1\n        streetLine2\n        city\n        province\n        postalCode\n        country\n        countryCode\n        phoneNumber\n    }\n"], ["\n    fragment OrderAddress on OrderAddress {\n        fullName\n        company\n        streetLine1\n        streetLine2\n        city\n        province\n        postalCode\n        country\n        countryCode\n        phoneNumber\n    }\n"])));
    var ORDER_FRAGMENT = apolloAngular.gql(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n    fragment Order on Order {\n        id\n        createdAt\n        updatedAt\n        orderPlacedAt\n        code\n        state\n        nextStates\n        total\n        currencyCode\n        customer {\n            id\n            firstName\n            lastName\n        }\n        shippingLines {\n            shippingMethod {\n                name\n            }\n        }\n    }\n"], ["\n    fragment Order on Order {\n        id\n        createdAt\n        updatedAt\n        orderPlacedAt\n        code\n        state\n        nextStates\n        total\n        currencyCode\n        customer {\n            id\n            firstName\n            lastName\n        }\n        shippingLines {\n            shippingMethod {\n                name\n            }\n        }\n    }\n"])));
    var FULFILLMENT_FRAGMENT = apolloAngular.gql(templateObject_5$2 || (templateObject_5$2 = __makeTemplateObject(["\n    fragment Fulfillment on Fulfillment {\n        id\n        state\n        nextStates\n        createdAt\n        updatedAt\n        method\n        orderItems {\n            id\n        }\n        trackingCode\n    }\n"], ["\n    fragment Fulfillment on Fulfillment {\n        id\n        state\n        nextStates\n        createdAt\n        updatedAt\n        method\n        orderItems {\n            id\n        }\n        trackingCode\n    }\n"])));
    var ORDER_LINE_FRAGMENT = apolloAngular.gql(templateObject_6$2 || (templateObject_6$2 = __makeTemplateObject(["\n    fragment OrderLine on OrderLine {\n        id\n        featuredAsset {\n            preview\n        }\n        productVariant {\n            id\n            name\n            sku\n            trackInventory\n            stockOnHand\n        }\n        discounts {\n            ...Discount\n        }\n        unitPrice\n        unitPriceWithTax\n        proratedUnitPrice\n        proratedUnitPriceWithTax\n        quantity\n        items {\n            id\n            unitPrice\n            unitPriceWithTax\n            taxRate\n            refundId\n            cancelled\n            fulfillment {\n                ...Fulfillment\n            }\n        }\n        linePrice\n        lineTax\n        linePriceWithTax\n        discountedLinePrice\n        discountedLinePriceWithTax\n    }\n"], ["\n    fragment OrderLine on OrderLine {\n        id\n        featuredAsset {\n            preview\n        }\n        productVariant {\n            id\n            name\n            sku\n            trackInventory\n            stockOnHand\n        }\n        discounts {\n            ...Discount\n        }\n        unitPrice\n        unitPriceWithTax\n        proratedUnitPrice\n        proratedUnitPriceWithTax\n        quantity\n        items {\n            id\n            unitPrice\n            unitPriceWithTax\n            taxRate\n            refundId\n            cancelled\n            fulfillment {\n                ...Fulfillment\n            }\n        }\n        linePrice\n        lineTax\n        linePriceWithTax\n        discountedLinePrice\n        discountedLinePriceWithTax\n    }\n"])));
    var ORDER_DETAIL_FRAGMENT = apolloAngular.gql(templateObject_7$2 || (templateObject_7$2 = __makeTemplateObject(["\n    fragment OrderDetail on Order {\n        id\n        createdAt\n        updatedAt\n        code\n        state\n        nextStates\n        active\n        customer {\n            id\n            firstName\n            lastName\n        }\n        lines {\n            ...OrderLine\n        }\n        surcharges {\n            id\n            sku\n            description\n            price\n            priceWithTax\n            taxRate\n        }\n        discounts {\n            ...Discount\n        }\n        promotions {\n            id\n            couponCode\n        }\n        subTotal\n        subTotalWithTax\n        total\n        totalWithTax\n        currencyCode\n        shipping\n        shippingWithTax\n        shippingLines {\n            shippingMethod {\n                id\n                code\n                name\n                fulfillmentHandlerCode\n                description\n            }\n        }\n        taxSummary {\n            description\n            taxBase\n            taxRate\n            taxTotal\n        }\n        shippingAddress {\n            ...OrderAddress\n        }\n        billingAddress {\n            ...OrderAddress\n        }\n        payments {\n            id\n            createdAt\n            transactionId\n            amount\n            method\n            state\n            nextStates\n            errorMessage\n            metadata\n            refunds {\n                id\n                createdAt\n                state\n                items\n                adjustment\n                total\n                paymentId\n                reason\n                transactionId\n                method\n                metadata\n                orderItems {\n                    id\n                }\n            }\n        }\n        fulfillments {\n            ...Fulfillment\n        }\n        modifications {\n            id\n            createdAt\n            isSettled\n            priceChange\n            note\n            payment {\n                id\n                amount\n            }\n            orderItems {\n                id\n            }\n            refund {\n                id\n                paymentId\n                total\n            }\n            surcharges {\n                id\n            }\n        }\n    }\n    ", "\n    ", "\n    ", "\n    ", "\n"], ["\n    fragment OrderDetail on Order {\n        id\n        createdAt\n        updatedAt\n        code\n        state\n        nextStates\n        active\n        customer {\n            id\n            firstName\n            lastName\n        }\n        lines {\n            ...OrderLine\n        }\n        surcharges {\n            id\n            sku\n            description\n            price\n            priceWithTax\n            taxRate\n        }\n        discounts {\n            ...Discount\n        }\n        promotions {\n            id\n            couponCode\n        }\n        subTotal\n        subTotalWithTax\n        total\n        totalWithTax\n        currencyCode\n        shipping\n        shippingWithTax\n        shippingLines {\n            shippingMethod {\n                id\n                code\n                name\n                fulfillmentHandlerCode\n                description\n            }\n        }\n        taxSummary {\n            description\n            taxBase\n            taxRate\n            taxTotal\n        }\n        shippingAddress {\n            ...OrderAddress\n        }\n        billingAddress {\n            ...OrderAddress\n        }\n        payments {\n            id\n            createdAt\n            transactionId\n            amount\n            method\n            state\n            nextStates\n            errorMessage\n            metadata\n            refunds {\n                id\n                createdAt\n                state\n                items\n                adjustment\n                total\n                paymentId\n                reason\n                transactionId\n                method\n                metadata\n                orderItems {\n                    id\n                }\n            }\n        }\n        fulfillments {\n            ...Fulfillment\n        }\n        modifications {\n            id\n            createdAt\n            isSettled\n            priceChange\n            note\n            payment {\n                id\n                amount\n            }\n            orderItems {\n                id\n            }\n            refund {\n                id\n                paymentId\n                total\n            }\n            surcharges {\n                id\n            }\n        }\n    }\n    ", "\n    ", "\n    ", "\n    ", "\n"])), DISCOUNT_FRAGMENT, ORDER_ADDRESS_FRAGMENT, FULFILLMENT_FRAGMENT, ORDER_LINE_FRAGMENT);
    var GET_ORDERS_LIST = apolloAngular.gql(templateObject_8$1 || (templateObject_8$1 = __makeTemplateObject(["\n    query GetOrderList($options: OrderListOptions) {\n        orders(options: $options) {\n            items {\n                ...Order\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetOrderList($options: OrderListOptions) {\n        orders(options: $options) {\n            items {\n                ...Order\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), ORDER_FRAGMENT);
    var GET_ORDER = apolloAngular.gql(templateObject_9$1 || (templateObject_9$1 = __makeTemplateObject(["\n    query GetOrder($id: ID!) {\n        order(id: $id) {\n            ...OrderDetail\n        }\n    }\n    ", "\n"], ["\n    query GetOrder($id: ID!) {\n        order(id: $id) {\n            ...OrderDetail\n        }\n    }\n    ", "\n"])), ORDER_DETAIL_FRAGMENT);
    var SETTLE_PAYMENT = apolloAngular.gql(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    mutation SettlePayment($id: ID!) {\n        settlePayment(id: $id) {\n            ... on Payment {\n                id\n                transactionId\n                amount\n                method\n                state\n                metadata\n            }\n            ...ErrorResult\n            ... on SettlePaymentError {\n                paymentErrorMessage\n            }\n            ... on PaymentStateTransitionError {\n                transitionError\n            }\n            ... on OrderStateTransitionError {\n                transitionError\n            }\n        }\n    }\n    ", "\n"], ["\n    mutation SettlePayment($id: ID!) {\n        settlePayment(id: $id) {\n            ... on Payment {\n                id\n                transactionId\n                amount\n                method\n                state\n                metadata\n            }\n            ...ErrorResult\n            ... on SettlePaymentError {\n                paymentErrorMessage\n            }\n            ... on PaymentStateTransitionError {\n                transitionError\n            }\n            ... on OrderStateTransitionError {\n                transitionError\n            }\n        }\n    }\n    ", "\n"])), ERROR_RESULT_FRAGMENT);
    var TRANSITION_PAYMENT_TO_STATE = apolloAngular.gql(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    mutation TransitionPaymentToState($id: ID!, $state: String!) {\n        transitionPaymentToState(id: $id, state: $state) {\n            ... on Payment {\n                id\n                transactionId\n                amount\n                method\n                state\n                metadata\n            }\n            ...ErrorResult\n            ... on PaymentStateTransitionError {\n                transitionError\n            }\n        }\n    }\n    ", "\n"], ["\n    mutation TransitionPaymentToState($id: ID!, $state: String!) {\n        transitionPaymentToState(id: $id, state: $state) {\n            ... on Payment {\n                id\n                transactionId\n                amount\n                method\n                state\n                metadata\n            }\n            ...ErrorResult\n            ... on PaymentStateTransitionError {\n                transitionError\n            }\n        }\n    }\n    ", "\n"])), ERROR_RESULT_FRAGMENT);
    var CREATE_FULFILLMENT = apolloAngular.gql(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    mutation CreateFulfillment($input: FulfillOrderInput!) {\n        addFulfillmentToOrder(input: $input) {\n            ...Fulfillment\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation CreateFulfillment($input: FulfillOrderInput!) {\n        addFulfillmentToOrder(input: $input) {\n            ...Fulfillment\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), FULFILLMENT_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var CANCEL_ORDER = apolloAngular.gql(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    mutation CancelOrder($input: CancelOrderInput!) {\n        cancelOrder(input: $input) {\n            ...OrderDetail\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation CancelOrder($input: CancelOrderInput!) {\n        cancelOrder(input: $input) {\n            ...OrderDetail\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), ORDER_DETAIL_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var REFUND_ORDER = apolloAngular.gql(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    mutation RefundOrder($input: RefundOrderInput!) {\n        refundOrder(input: $input) {\n            ...Refund\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation RefundOrder($input: RefundOrderInput!) {\n        refundOrder(input: $input) {\n            ...Refund\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), REFUND_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var SETTLE_REFUND = apolloAngular.gql(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    mutation SettleRefund($input: SettleRefundInput!) {\n        settleRefund(input: $input) {\n            ...Refund\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation SettleRefund($input: SettleRefundInput!) {\n        settleRefund(input: $input) {\n            ...Refund\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), REFUND_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var GET_ORDER_HISTORY = apolloAngular.gql(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    query GetOrderHistory($id: ID!, $options: HistoryEntryListOptions) {\n        order(id: $id) {\n            id\n            history(options: $options) {\n                totalItems\n                items {\n                    id\n                    type\n                    createdAt\n                    isPublic\n                    administrator {\n                        id\n                        firstName\n                        lastName\n                    }\n                    data\n                }\n            }\n        }\n    }\n"], ["\n    query GetOrderHistory($id: ID!, $options: HistoryEntryListOptions) {\n        order(id: $id) {\n            id\n            history(options: $options) {\n                totalItems\n                items {\n                    id\n                    type\n                    createdAt\n                    isPublic\n                    administrator {\n                        id\n                        firstName\n                        lastName\n                    }\n                    data\n                }\n            }\n        }\n    }\n"])));
    var ADD_NOTE_TO_ORDER = apolloAngular.gql(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n    mutation AddNoteToOrder($input: AddNoteToOrderInput!) {\n        addNoteToOrder(input: $input) {\n            id\n        }\n    }\n"], ["\n    mutation AddNoteToOrder($input: AddNoteToOrderInput!) {\n        addNoteToOrder(input: $input) {\n            id\n        }\n    }\n"])));
    var UPDATE_ORDER_NOTE = apolloAngular.gql(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n    mutation UpdateOrderNote($input: UpdateOrderNoteInput!) {\n        updateOrderNote(input: $input) {\n            id\n            data\n            isPublic\n        }\n    }\n"], ["\n    mutation UpdateOrderNote($input: UpdateOrderNoteInput!) {\n        updateOrderNote(input: $input) {\n            id\n            data\n            isPublic\n        }\n    }\n"])));
    var DELETE_ORDER_NOTE = apolloAngular.gql(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n    mutation DeleteOrderNote($id: ID!) {\n        deleteOrderNote(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteOrderNote($id: ID!) {\n        deleteOrderNote(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var TRANSITION_ORDER_TO_STATE = apolloAngular.gql(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n    mutation TransitionOrderToState($id: ID!, $state: String!) {\n        transitionOrderToState(id: $id, state: $state) {\n            ...Order\n            ...ErrorResult\n            ... on OrderStateTransitionError {\n                transitionError\n            }\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation TransitionOrderToState($id: ID!, $state: String!) {\n        transitionOrderToState(id: $id, state: $state) {\n            ...Order\n            ...ErrorResult\n            ... on OrderStateTransitionError {\n                transitionError\n            }\n        }\n    }\n    ", "\n    ", "\n"])), ORDER_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var UPDATE_ORDER_CUSTOM_FIELDS = apolloAngular.gql(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n    mutation UpdateOrderCustomFields($input: UpdateOrderInput!) {\n        setOrderCustomFields(input: $input) {\n            ...Order\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateOrderCustomFields($input: UpdateOrderInput!) {\n        setOrderCustomFields(input: $input) {\n            ...Order\n        }\n    }\n    ", "\n"])), ORDER_FRAGMENT);
    var TRANSITION_FULFILLMENT_TO_STATE = apolloAngular.gql(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n    mutation TransitionFulfillmentToState($id: ID!, $state: String!) {\n        transitionFulfillmentToState(id: $id, state: $state) {\n            ...Fulfillment\n            ...ErrorResult\n            ... on FulfillmentStateTransitionError {\n                transitionError\n            }\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation TransitionFulfillmentToState($id: ID!, $state: String!) {\n        transitionFulfillmentToState(id: $id, state: $state) {\n            ...Fulfillment\n            ...ErrorResult\n            ... on FulfillmentStateTransitionError {\n                transitionError\n            }\n        }\n    }\n    ", "\n    ", "\n"])), FULFILLMENT_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var GET_ORDER_SUMMARY = apolloAngular.gql(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n    query GetOrderSummary($start: DateTime!, $end: DateTime!) {\n        orders(options: { filter: { orderPlacedAt: { between: { start: $start, end: $end } } } }) {\n            totalItems\n            items {\n                id\n                total\n                currencyCode\n            }\n        }\n    }\n"], ["\n    query GetOrderSummary($start: DateTime!, $end: DateTime!) {\n        orders(options: { filter: { orderPlacedAt: { between: { start: $start, end: $end } } } }) {\n            totalItems\n            items {\n                id\n                total\n                currencyCode\n            }\n        }\n    }\n"])));
    var MODIFY_ORDER = apolloAngular.gql(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n    mutation ModifyOrder($input: ModifyOrderInput!) {\n        modifyOrder(input: $input) {\n            ...OrderDetail\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation ModifyOrder($input: ModifyOrderInput!) {\n        modifyOrder(input: $input) {\n            ...OrderDetail\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), ORDER_DETAIL_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var ADD_MANUAL_PAYMENT_TO_ORDER = apolloAngular.gql(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n    mutation AddManualPayment($input: ManualPaymentInput!) {\n        addManualPaymentToOrder(input: $input) {\n            ...OrderDetail\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation AddManualPayment($input: ManualPaymentInput!) {\n        addManualPaymentToOrder(input: $input) {\n            ...OrderDetail\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), ORDER_DETAIL_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var templateObject_1$2, templateObject_2$2, templateObject_3$2, templateObject_4$2, templateObject_5$2, templateObject_6$2, templateObject_7$2, templateObject_8$1, templateObject_9$1, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25;

    var OrderDataService = /** @class */ (function () {
        function OrderDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        OrderDataService.prototype.getOrders = function (options) {
            if (options === void 0) { options = { take: 10 }; }
            return this.baseDataService.query(GET_ORDERS_LIST, {
                options: options,
            });
        };
        OrderDataService.prototype.getOrder = function (id) {
            return this.baseDataService.query(GET_ORDER, { id: id });
        };
        OrderDataService.prototype.getOrderHistory = function (id, options) {
            return this.baseDataService.query(GET_ORDER_HISTORY, {
                id: id,
                options: options,
            });
        };
        OrderDataService.prototype.settlePayment = function (id) {
            return this.baseDataService.mutate(SETTLE_PAYMENT, {
                id: id,
            });
        };
        OrderDataService.prototype.transitionPaymentToState = function (id, state) {
            return this.baseDataService.mutate(TRANSITION_PAYMENT_TO_STATE, {
                id: id,
                state: state,
            });
        };
        OrderDataService.prototype.createFulfillment = function (input) {
            return this.baseDataService.mutate(CREATE_FULFILLMENT, {
                input: input,
            });
        };
        OrderDataService.prototype.transitionFulfillmentToState = function (id, state) {
            return this.baseDataService.mutate(TRANSITION_FULFILLMENT_TO_STATE, {
                id: id,
                state: state,
            });
        };
        OrderDataService.prototype.cancelOrder = function (input) {
            return this.baseDataService.mutate(CANCEL_ORDER, {
                input: input,
            });
        };
        OrderDataService.prototype.refundOrder = function (input) {
            return this.baseDataService.mutate(REFUND_ORDER, {
                input: input,
            });
        };
        OrderDataService.prototype.settleRefund = function (input, orderId) {
            return this.baseDataService.mutate(SETTLE_REFUND, {
                input: input,
            });
        };
        OrderDataService.prototype.addNoteToOrder = function (input) {
            return this.baseDataService.mutate(ADD_NOTE_TO_ORDER, {
                input: input,
            });
        };
        OrderDataService.prototype.updateOrderNote = function (input) {
            return this.baseDataService.mutate(UPDATE_ORDER_NOTE, {
                input: input,
            });
        };
        OrderDataService.prototype.deleteOrderNote = function (id) {
            return this.baseDataService.mutate(DELETE_ORDER_NOTE, {
                id: id,
            });
        };
        OrderDataService.prototype.transitionToState = function (id, state) {
            return this.baseDataService.mutate(TRANSITION_ORDER_TO_STATE, {
                id: id,
                state: state,
            });
        };
        OrderDataService.prototype.updateOrderCustomFields = function (input) {
            return this.baseDataService.mutate(UPDATE_ORDER_CUSTOM_FIELDS, {
                input: input,
            });
        };
        OrderDataService.prototype.getOrderSummary = function (start, end) {
            return this.baseDataService.query(GET_ORDER_SUMMARY, {
                start: start.toISOString(),
                end: end.toISOString(),
            });
        };
        OrderDataService.prototype.modifyOrder = function (input) {
            return this.baseDataService.mutate(MODIFY_ORDER, {
                input: input,
            });
        };
        OrderDataService.prototype.addManualPaymentToOrder = function (input) {
            return this.baseDataService.mutate(ADD_MANUAL_PAYMENT_TO_ORDER, { input: input });
        };
        return OrderDataService;
    }());

    /**
     * @description
     * The state of a Job in the JobQueue
     *
     * @docsCategory common
     */
    exports.JobState = void 0;
    (function (JobState) {
        JobState["PENDING"] = "PENDING";
        JobState["RUNNING"] = "RUNNING";
        JobState["COMPLETED"] = "COMPLETED";
        JobState["RETRYING"] = "RETRYING";
        JobState["FAILED"] = "FAILED";
        JobState["CANCELLED"] = "CANCELLED";
    })(exports.JobState || (exports.JobState = {}));
    exports.StockMovementType = void 0;
    (function (StockMovementType) {
        StockMovementType["ADJUSTMENT"] = "ADJUSTMENT";
        StockMovementType["ALLOCATION"] = "ALLOCATION";
        StockMovementType["RELEASE"] = "RELEASE";
        StockMovementType["SALE"] = "SALE";
        StockMovementType["CANCELLATION"] = "CANCELLATION";
        StockMovementType["RETURN"] = "RETURN";
    })(exports.StockMovementType || (exports.StockMovementType = {}));
    exports.AssetType = void 0;
    (function (AssetType) {
        AssetType["IMAGE"] = "IMAGE";
        AssetType["VIDEO"] = "VIDEO";
        AssetType["BINARY"] = "BINARY";
    })(exports.AssetType || (exports.AssetType = {}));
    exports.GlobalFlag = void 0;
    (function (GlobalFlag) {
        GlobalFlag["TRUE"] = "TRUE";
        GlobalFlag["FALSE"] = "FALSE";
        GlobalFlag["INHERIT"] = "INHERIT";
    })(exports.GlobalFlag || (exports.GlobalFlag = {}));
    exports.AdjustmentType = void 0;
    (function (AdjustmentType) {
        AdjustmentType["PROMOTION"] = "PROMOTION";
        AdjustmentType["DISTRIBUTED_ORDER_PROMOTION"] = "DISTRIBUTED_ORDER_PROMOTION";
    })(exports.AdjustmentType || (exports.AdjustmentType = {}));
    exports.DeletionResult = void 0;
    (function (DeletionResult) {
        /** The entity was successfully deleted */
        DeletionResult["DELETED"] = "DELETED";
        /** Deletion did not take place, reason given in message */
        DeletionResult["NOT_DELETED"] = "NOT_DELETED";
    })(exports.DeletionResult || (exports.DeletionResult = {}));
    /**
     * @description
     * Permissions for administrators and customers. Used to control access to
     * GraphQL resolvers via the {@link Allow} decorator.
     *
     * @docsCategory common
     */
    exports.Permission = void 0;
    (function (Permission) {
        /** Authenticated means simply that the user is logged in */
        Permission["Authenticated"] = "Authenticated";
        /** Grants permission to create Administrator */
        Permission["CreateAdministrator"] = "CreateAdministrator";
        /** Grants permission to create Asset */
        Permission["CreateAsset"] = "CreateAsset";
        /** Grants permission to create Products, Facets, Assets, Collections */
        Permission["CreateCatalog"] = "CreateCatalog";
        /** Grants permission to create Channel */
        Permission["CreateChannel"] = "CreateChannel";
        /** Grants permission to create Collection */
        Permission["CreateCollection"] = "CreateCollection";
        /** Grants permission to create Country */
        Permission["CreateCountry"] = "CreateCountry";
        /** Grants permission to create Customer */
        Permission["CreateCustomer"] = "CreateCustomer";
        /** Grants permission to create CustomerGroup */
        Permission["CreateCustomerGroup"] = "CreateCustomerGroup";
        /** Grants permission to create Facet */
        Permission["CreateFacet"] = "CreateFacet";
        /** Grants permission to create Order */
        Permission["CreateOrder"] = "CreateOrder";
        /** Grants permission to create PaymentMethod */
        Permission["CreatePaymentMethod"] = "CreatePaymentMethod";
        /** Grants permission to create Product */
        Permission["CreateProduct"] = "CreateProduct";
        /** Grants permission to create Promotion */
        Permission["CreatePromotion"] = "CreatePromotion";
        /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
        Permission["CreateSettings"] = "CreateSettings";
        /** Grants permission to create ShippingMethod */
        Permission["CreateShippingMethod"] = "CreateShippingMethod";
        /** Grants permission to create System */
        Permission["CreateSystem"] = "CreateSystem";
        /** Grants permission to create Tag */
        Permission["CreateTag"] = "CreateTag";
        /** Grants permission to create TaxCategory */
        Permission["CreateTaxCategory"] = "CreateTaxCategory";
        /** Grants permission to create TaxRate */
        Permission["CreateTaxRate"] = "CreateTaxRate";
        /** Grants permission to create Zone */
        Permission["CreateZone"] = "CreateZone";
        /** Grants permission to delete Administrator */
        Permission["DeleteAdministrator"] = "DeleteAdministrator";
        /** Grants permission to delete Asset */
        Permission["DeleteAsset"] = "DeleteAsset";
        /** Grants permission to delete Products, Facets, Assets, Collections */
        Permission["DeleteCatalog"] = "DeleteCatalog";
        /** Grants permission to delete Channel */
        Permission["DeleteChannel"] = "DeleteChannel";
        /** Grants permission to delete Collection */
        Permission["DeleteCollection"] = "DeleteCollection";
        /** Grants permission to delete Country */
        Permission["DeleteCountry"] = "DeleteCountry";
        /** Grants permission to delete Customer */
        Permission["DeleteCustomer"] = "DeleteCustomer";
        /** Grants permission to delete CustomerGroup */
        Permission["DeleteCustomerGroup"] = "DeleteCustomerGroup";
        /** Grants permission to delete Facet */
        Permission["DeleteFacet"] = "DeleteFacet";
        /** Grants permission to delete Order */
        Permission["DeleteOrder"] = "DeleteOrder";
        /** Grants permission to delete PaymentMethod */
        Permission["DeletePaymentMethod"] = "DeletePaymentMethod";
        /** Grants permission to delete Product */
        Permission["DeleteProduct"] = "DeleteProduct";
        /** Grants permission to delete Promotion */
        Permission["DeletePromotion"] = "DeletePromotion";
        /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
        Permission["DeleteSettings"] = "DeleteSettings";
        /** Grants permission to delete ShippingMethod */
        Permission["DeleteShippingMethod"] = "DeleteShippingMethod";
        /** Grants permission to delete System */
        Permission["DeleteSystem"] = "DeleteSystem";
        /** Grants permission to delete Tag */
        Permission["DeleteTag"] = "DeleteTag";
        /** Grants permission to delete TaxCategory */
        Permission["DeleteTaxCategory"] = "DeleteTaxCategory";
        /** Grants permission to delete TaxRate */
        Permission["DeleteTaxRate"] = "DeleteTaxRate";
        /** Grants permission to delete Zone */
        Permission["DeleteZone"] = "DeleteZone";
        /** Owner means the user owns this entity, e.g. a Customer's own Order */
        Permission["Owner"] = "Owner";
        Permission["Placeholder"] = "Placeholder";
        /** Public means any unauthenticated user may perform the operation */
        Permission["Public"] = "Public";
        /** Grants permission to read Administrator */
        Permission["ReadAdministrator"] = "ReadAdministrator";
        /** Grants permission to read Asset */
        Permission["ReadAsset"] = "ReadAsset";
        /** Grants permission to read Products, Facets, Assets, Collections */
        Permission["ReadCatalog"] = "ReadCatalog";
        /** Grants permission to read Channel */
        Permission["ReadChannel"] = "ReadChannel";
        /** Grants permission to read Collection */
        Permission["ReadCollection"] = "ReadCollection";
        /** Grants permission to read Country */
        Permission["ReadCountry"] = "ReadCountry";
        /** Grants permission to read Customer */
        Permission["ReadCustomer"] = "ReadCustomer";
        /** Grants permission to read CustomerGroup */
        Permission["ReadCustomerGroup"] = "ReadCustomerGroup";
        /** Grants permission to read Facet */
        Permission["ReadFacet"] = "ReadFacet";
        /** Grants permission to read Order */
        Permission["ReadOrder"] = "ReadOrder";
        /** Grants permission to read PaymentMethod */
        Permission["ReadPaymentMethod"] = "ReadPaymentMethod";
        /** Grants permission to read Product */
        Permission["ReadProduct"] = "ReadProduct";
        /** Grants permission to read Promotion */
        Permission["ReadPromotion"] = "ReadPromotion";
        /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
        Permission["ReadSettings"] = "ReadSettings";
        /** Grants permission to read ShippingMethod */
        Permission["ReadShippingMethod"] = "ReadShippingMethod";
        /** Grants permission to read System */
        Permission["ReadSystem"] = "ReadSystem";
        /** Grants permission to read Tag */
        Permission["ReadTag"] = "ReadTag";
        /** Grants permission to read TaxCategory */
        Permission["ReadTaxCategory"] = "ReadTaxCategory";
        /** Grants permission to read TaxRate */
        Permission["ReadTaxRate"] = "ReadTaxRate";
        /** Grants permission to read Zone */
        Permission["ReadZone"] = "ReadZone";
        /** SuperAdmin has unrestricted access to all operations */
        Permission["SuperAdmin"] = "SuperAdmin";
        /** Grants permission to update Administrator */
        Permission["UpdateAdministrator"] = "UpdateAdministrator";
        /** Grants permission to update Asset */
        Permission["UpdateAsset"] = "UpdateAsset";
        /** Grants permission to update Products, Facets, Assets, Collections */
        Permission["UpdateCatalog"] = "UpdateCatalog";
        /** Grants permission to update Channel */
        Permission["UpdateChannel"] = "UpdateChannel";
        /** Grants permission to update Collection */
        Permission["UpdateCollection"] = "UpdateCollection";
        /** Grants permission to update Country */
        Permission["UpdateCountry"] = "UpdateCountry";
        /** Grants permission to update Customer */
        Permission["UpdateCustomer"] = "UpdateCustomer";
        /** Grants permission to update CustomerGroup */
        Permission["UpdateCustomerGroup"] = "UpdateCustomerGroup";
        /** Grants permission to update Facet */
        Permission["UpdateFacet"] = "UpdateFacet";
        /** Grants permission to update GlobalSettings */
        Permission["UpdateGlobalSettings"] = "UpdateGlobalSettings";
        /** Grants permission to update Order */
        Permission["UpdateOrder"] = "UpdateOrder";
        /** Grants permission to update PaymentMethod */
        Permission["UpdatePaymentMethod"] = "UpdatePaymentMethod";
        /** Grants permission to update Product */
        Permission["UpdateProduct"] = "UpdateProduct";
        /** Grants permission to update Promotion */
        Permission["UpdatePromotion"] = "UpdatePromotion";
        /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
        Permission["UpdateSettings"] = "UpdateSettings";
        /** Grants permission to update ShippingMethod */
        Permission["UpdateShippingMethod"] = "UpdateShippingMethod";
        /** Grants permission to update System */
        Permission["UpdateSystem"] = "UpdateSystem";
        /** Grants permission to update Tag */
        Permission["UpdateTag"] = "UpdateTag";
        /** Grants permission to update TaxCategory */
        Permission["UpdateTaxCategory"] = "UpdateTaxCategory";
        /** Grants permission to update TaxRate */
        Permission["UpdateTaxRate"] = "UpdateTaxRate";
        /** Grants permission to update Zone */
        Permission["UpdateZone"] = "UpdateZone";
    })(exports.Permission || (exports.Permission = {}));
    exports.SortOrder = void 0;
    (function (SortOrder) {
        SortOrder["ASC"] = "ASC";
        SortOrder["DESC"] = "DESC";
    })(exports.SortOrder || (exports.SortOrder = {}));
    exports.ErrorCode = void 0;
    (function (ErrorCode) {
        ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
        ErrorCode["MIME_TYPE_ERROR"] = "MIME_TYPE_ERROR";
        ErrorCode["LANGUAGE_NOT_AVAILABLE_ERROR"] = "LANGUAGE_NOT_AVAILABLE_ERROR";
        ErrorCode["CHANNEL_DEFAULT_LANGUAGE_ERROR"] = "CHANNEL_DEFAULT_LANGUAGE_ERROR";
        ErrorCode["SETTLE_PAYMENT_ERROR"] = "SETTLE_PAYMENT_ERROR";
        ErrorCode["EMPTY_ORDER_LINE_SELECTION_ERROR"] = "EMPTY_ORDER_LINE_SELECTION_ERROR";
        ErrorCode["ITEMS_ALREADY_FULFILLED_ERROR"] = "ITEMS_ALREADY_FULFILLED_ERROR";
        ErrorCode["INVALID_FULFILLMENT_HANDLER_ERROR"] = "INVALID_FULFILLMENT_HANDLER_ERROR";
        ErrorCode["CREATE_FULFILLMENT_ERROR"] = "CREATE_FULFILLMENT_ERROR";
        ErrorCode["INSUFFICIENT_STOCK_ON_HAND_ERROR"] = "INSUFFICIENT_STOCK_ON_HAND_ERROR";
        ErrorCode["MULTIPLE_ORDER_ERROR"] = "MULTIPLE_ORDER_ERROR";
        ErrorCode["CANCEL_ACTIVE_ORDER_ERROR"] = "CANCEL_ACTIVE_ORDER_ERROR";
        ErrorCode["PAYMENT_ORDER_MISMATCH_ERROR"] = "PAYMENT_ORDER_MISMATCH_ERROR";
        ErrorCode["REFUND_ORDER_STATE_ERROR"] = "REFUND_ORDER_STATE_ERROR";
        ErrorCode["NOTHING_TO_REFUND_ERROR"] = "NOTHING_TO_REFUND_ERROR";
        ErrorCode["ALREADY_REFUNDED_ERROR"] = "ALREADY_REFUNDED_ERROR";
        ErrorCode["QUANTITY_TOO_GREAT_ERROR"] = "QUANTITY_TOO_GREAT_ERROR";
        ErrorCode["REFUND_STATE_TRANSITION_ERROR"] = "REFUND_STATE_TRANSITION_ERROR";
        ErrorCode["PAYMENT_STATE_TRANSITION_ERROR"] = "PAYMENT_STATE_TRANSITION_ERROR";
        ErrorCode["FULFILLMENT_STATE_TRANSITION_ERROR"] = "FULFILLMENT_STATE_TRANSITION_ERROR";
        ErrorCode["ORDER_MODIFICATION_STATE_ERROR"] = "ORDER_MODIFICATION_STATE_ERROR";
        ErrorCode["NO_CHANGES_SPECIFIED_ERROR"] = "NO_CHANGES_SPECIFIED_ERROR";
        ErrorCode["PAYMENT_METHOD_MISSING_ERROR"] = "PAYMENT_METHOD_MISSING_ERROR";
        ErrorCode["REFUND_PAYMENT_ID_MISSING_ERROR"] = "REFUND_PAYMENT_ID_MISSING_ERROR";
        ErrorCode["MANUAL_PAYMENT_STATE_ERROR"] = "MANUAL_PAYMENT_STATE_ERROR";
        ErrorCode["PRODUCT_OPTION_IN_USE_ERROR"] = "PRODUCT_OPTION_IN_USE_ERROR";
        ErrorCode["MISSING_CONDITIONS_ERROR"] = "MISSING_CONDITIONS_ERROR";
        ErrorCode["NATIVE_AUTH_STRATEGY_ERROR"] = "NATIVE_AUTH_STRATEGY_ERROR";
        ErrorCode["INVALID_CREDENTIALS_ERROR"] = "INVALID_CREDENTIALS_ERROR";
        ErrorCode["ORDER_STATE_TRANSITION_ERROR"] = "ORDER_STATE_TRANSITION_ERROR";
        ErrorCode["EMAIL_ADDRESS_CONFLICT_ERROR"] = "EMAIL_ADDRESS_CONFLICT_ERROR";
        ErrorCode["ORDER_LIMIT_ERROR"] = "ORDER_LIMIT_ERROR";
        ErrorCode["NEGATIVE_QUANTITY_ERROR"] = "NEGATIVE_QUANTITY_ERROR";
        ErrorCode["INSUFFICIENT_STOCK_ERROR"] = "INSUFFICIENT_STOCK_ERROR";
    })(exports.ErrorCode || (exports.ErrorCode = {}));
    exports.LogicalOperator = void 0;
    (function (LogicalOperator) {
        LogicalOperator["AND"] = "AND";
        LogicalOperator["OR"] = "OR";
    })(exports.LogicalOperator || (exports.LogicalOperator = {}));
    /**
     * @description
     * ISO 4217 currency code
     *
     * @docsCategory common
     */
    exports.CurrencyCode = void 0;
    (function (CurrencyCode) {
        /** United Arab Emirates dirham */
        CurrencyCode["AED"] = "AED";
        /** Afghan afghani */
        CurrencyCode["AFN"] = "AFN";
        /** Albanian lek */
        CurrencyCode["ALL"] = "ALL";
        /** Armenian dram */
        CurrencyCode["AMD"] = "AMD";
        /** Netherlands Antillean guilder */
        CurrencyCode["ANG"] = "ANG";
        /** Angolan kwanza */
        CurrencyCode["AOA"] = "AOA";
        /** Argentine peso */
        CurrencyCode["ARS"] = "ARS";
        /** Australian dollar */
        CurrencyCode["AUD"] = "AUD";
        /** Aruban florin */
        CurrencyCode["AWG"] = "AWG";
        /** Azerbaijani manat */
        CurrencyCode["AZN"] = "AZN";
        /** Bosnia and Herzegovina convertible mark */
        CurrencyCode["BAM"] = "BAM";
        /** Barbados dollar */
        CurrencyCode["BBD"] = "BBD";
        /** Bangladeshi taka */
        CurrencyCode["BDT"] = "BDT";
        /** Bulgarian lev */
        CurrencyCode["BGN"] = "BGN";
        /** Bahraini dinar */
        CurrencyCode["BHD"] = "BHD";
        /** Burundian franc */
        CurrencyCode["BIF"] = "BIF";
        /** Bermudian dollar */
        CurrencyCode["BMD"] = "BMD";
        /** Brunei dollar */
        CurrencyCode["BND"] = "BND";
        /** Boliviano */
        CurrencyCode["BOB"] = "BOB";
        /** Brazilian real */
        CurrencyCode["BRL"] = "BRL";
        /** Bahamian dollar */
        CurrencyCode["BSD"] = "BSD";
        /** Bhutanese ngultrum */
        CurrencyCode["BTN"] = "BTN";
        /** Botswana pula */
        CurrencyCode["BWP"] = "BWP";
        /** Belarusian ruble */
        CurrencyCode["BYN"] = "BYN";
        /** Belize dollar */
        CurrencyCode["BZD"] = "BZD";
        /** Canadian dollar */
        CurrencyCode["CAD"] = "CAD";
        /** Congolese franc */
        CurrencyCode["CDF"] = "CDF";
        /** Swiss franc */
        CurrencyCode["CHF"] = "CHF";
        /** Chilean peso */
        CurrencyCode["CLP"] = "CLP";
        /** Renminbi (Chinese) yuan */
        CurrencyCode["CNY"] = "CNY";
        /** Colombian peso */
        CurrencyCode["COP"] = "COP";
        /** Costa Rican colon */
        CurrencyCode["CRC"] = "CRC";
        /** Cuban convertible peso */
        CurrencyCode["CUC"] = "CUC";
        /** Cuban peso */
        CurrencyCode["CUP"] = "CUP";
        /** Cape Verde escudo */
        CurrencyCode["CVE"] = "CVE";
        /** Czech koruna */
        CurrencyCode["CZK"] = "CZK";
        /** Djiboutian franc */
        CurrencyCode["DJF"] = "DJF";
        /** Danish krone */
        CurrencyCode["DKK"] = "DKK";
        /** Dominican peso */
        CurrencyCode["DOP"] = "DOP";
        /** Algerian dinar */
        CurrencyCode["DZD"] = "DZD";
        /** Egyptian pound */
        CurrencyCode["EGP"] = "EGP";
        /** Eritrean nakfa */
        CurrencyCode["ERN"] = "ERN";
        /** Ethiopian birr */
        CurrencyCode["ETB"] = "ETB";
        /** Euro */
        CurrencyCode["EUR"] = "EUR";
        /** Fiji dollar */
        CurrencyCode["FJD"] = "FJD";
        /** Falkland Islands pound */
        CurrencyCode["FKP"] = "FKP";
        /** Pound sterling */
        CurrencyCode["GBP"] = "GBP";
        /** Georgian lari */
        CurrencyCode["GEL"] = "GEL";
        /** Ghanaian cedi */
        CurrencyCode["GHS"] = "GHS";
        /** Gibraltar pound */
        CurrencyCode["GIP"] = "GIP";
        /** Gambian dalasi */
        CurrencyCode["GMD"] = "GMD";
        /** Guinean franc */
        CurrencyCode["GNF"] = "GNF";
        /** Guatemalan quetzal */
        CurrencyCode["GTQ"] = "GTQ";
        /** Guyanese dollar */
        CurrencyCode["GYD"] = "GYD";
        /** Hong Kong dollar */
        CurrencyCode["HKD"] = "HKD";
        /** Honduran lempira */
        CurrencyCode["HNL"] = "HNL";
        /** Croatian kuna */
        CurrencyCode["HRK"] = "HRK";
        /** Haitian gourde */
        CurrencyCode["HTG"] = "HTG";
        /** Hungarian forint */
        CurrencyCode["HUF"] = "HUF";
        /** Indonesian rupiah */
        CurrencyCode["IDR"] = "IDR";
        /** Israeli new shekel */
        CurrencyCode["ILS"] = "ILS";
        /** Indian rupee */
        CurrencyCode["INR"] = "INR";
        /** Iraqi dinar */
        CurrencyCode["IQD"] = "IQD";
        /** Iranian rial */
        CurrencyCode["IRR"] = "IRR";
        /** Icelandic króna */
        CurrencyCode["ISK"] = "ISK";
        /** Jamaican dollar */
        CurrencyCode["JMD"] = "JMD";
        /** Jordanian dinar */
        CurrencyCode["JOD"] = "JOD";
        /** Japanese yen */
        CurrencyCode["JPY"] = "JPY";
        /** Kenyan shilling */
        CurrencyCode["KES"] = "KES";
        /** Kyrgyzstani som */
        CurrencyCode["KGS"] = "KGS";
        /** Cambodian riel */
        CurrencyCode["KHR"] = "KHR";
        /** Comoro franc */
        CurrencyCode["KMF"] = "KMF";
        /** North Korean won */
        CurrencyCode["KPW"] = "KPW";
        /** South Korean won */
        CurrencyCode["KRW"] = "KRW";
        /** Kuwaiti dinar */
        CurrencyCode["KWD"] = "KWD";
        /** Cayman Islands dollar */
        CurrencyCode["KYD"] = "KYD";
        /** Kazakhstani tenge */
        CurrencyCode["KZT"] = "KZT";
        /** Lao kip */
        CurrencyCode["LAK"] = "LAK";
        /** Lebanese pound */
        CurrencyCode["LBP"] = "LBP";
        /** Sri Lankan rupee */
        CurrencyCode["LKR"] = "LKR";
        /** Liberian dollar */
        CurrencyCode["LRD"] = "LRD";
        /** Lesotho loti */
        CurrencyCode["LSL"] = "LSL";
        /** Libyan dinar */
        CurrencyCode["LYD"] = "LYD";
        /** Moroccan dirham */
        CurrencyCode["MAD"] = "MAD";
        /** Moldovan leu */
        CurrencyCode["MDL"] = "MDL";
        /** Malagasy ariary */
        CurrencyCode["MGA"] = "MGA";
        /** Macedonian denar */
        CurrencyCode["MKD"] = "MKD";
        /** Myanmar kyat */
        CurrencyCode["MMK"] = "MMK";
        /** Mongolian tögrög */
        CurrencyCode["MNT"] = "MNT";
        /** Macanese pataca */
        CurrencyCode["MOP"] = "MOP";
        /** Mauritanian ouguiya */
        CurrencyCode["MRU"] = "MRU";
        /** Mauritian rupee */
        CurrencyCode["MUR"] = "MUR";
        /** Maldivian rufiyaa */
        CurrencyCode["MVR"] = "MVR";
        /** Malawian kwacha */
        CurrencyCode["MWK"] = "MWK";
        /** Mexican peso */
        CurrencyCode["MXN"] = "MXN";
        /** Malaysian ringgit */
        CurrencyCode["MYR"] = "MYR";
        /** Mozambican metical */
        CurrencyCode["MZN"] = "MZN";
        /** Namibian dollar */
        CurrencyCode["NAD"] = "NAD";
        /** Nigerian naira */
        CurrencyCode["NGN"] = "NGN";
        /** Nicaraguan córdoba */
        CurrencyCode["NIO"] = "NIO";
        /** Norwegian krone */
        CurrencyCode["NOK"] = "NOK";
        /** Nepalese rupee */
        CurrencyCode["NPR"] = "NPR";
        /** New Zealand dollar */
        CurrencyCode["NZD"] = "NZD";
        /** Omani rial */
        CurrencyCode["OMR"] = "OMR";
        /** Panamanian balboa */
        CurrencyCode["PAB"] = "PAB";
        /** Peruvian sol */
        CurrencyCode["PEN"] = "PEN";
        /** Papua New Guinean kina */
        CurrencyCode["PGK"] = "PGK";
        /** Philippine peso */
        CurrencyCode["PHP"] = "PHP";
        /** Pakistani rupee */
        CurrencyCode["PKR"] = "PKR";
        /** Polish złoty */
        CurrencyCode["PLN"] = "PLN";
        /** Paraguayan guaraní */
        CurrencyCode["PYG"] = "PYG";
        /** Qatari riyal */
        CurrencyCode["QAR"] = "QAR";
        /** Romanian leu */
        CurrencyCode["RON"] = "RON";
        /** Serbian dinar */
        CurrencyCode["RSD"] = "RSD";
        /** Russian ruble */
        CurrencyCode["RUB"] = "RUB";
        /** Rwandan franc */
        CurrencyCode["RWF"] = "RWF";
        /** Saudi riyal */
        CurrencyCode["SAR"] = "SAR";
        /** Solomon Islands dollar */
        CurrencyCode["SBD"] = "SBD";
        /** Seychelles rupee */
        CurrencyCode["SCR"] = "SCR";
        /** Sudanese pound */
        CurrencyCode["SDG"] = "SDG";
        /** Swedish krona/kronor */
        CurrencyCode["SEK"] = "SEK";
        /** Singapore dollar */
        CurrencyCode["SGD"] = "SGD";
        /** Saint Helena pound */
        CurrencyCode["SHP"] = "SHP";
        /** Sierra Leonean leone */
        CurrencyCode["SLL"] = "SLL";
        /** Somali shilling */
        CurrencyCode["SOS"] = "SOS";
        /** Surinamese dollar */
        CurrencyCode["SRD"] = "SRD";
        /** South Sudanese pound */
        CurrencyCode["SSP"] = "SSP";
        /** São Tomé and Príncipe dobra */
        CurrencyCode["STN"] = "STN";
        /** Salvadoran colón */
        CurrencyCode["SVC"] = "SVC";
        /** Syrian pound */
        CurrencyCode["SYP"] = "SYP";
        /** Swazi lilangeni */
        CurrencyCode["SZL"] = "SZL";
        /** Thai baht */
        CurrencyCode["THB"] = "THB";
        /** Tajikistani somoni */
        CurrencyCode["TJS"] = "TJS";
        /** Turkmenistan manat */
        CurrencyCode["TMT"] = "TMT";
        /** Tunisian dinar */
        CurrencyCode["TND"] = "TND";
        /** Tongan paʻanga */
        CurrencyCode["TOP"] = "TOP";
        /** Turkish lira */
        CurrencyCode["TRY"] = "TRY";
        /** Trinidad and Tobago dollar */
        CurrencyCode["TTD"] = "TTD";
        /** New Taiwan dollar */
        CurrencyCode["TWD"] = "TWD";
        /** Tanzanian shilling */
        CurrencyCode["TZS"] = "TZS";
        /** Ukrainian hryvnia */
        CurrencyCode["UAH"] = "UAH";
        /** Ugandan shilling */
        CurrencyCode["UGX"] = "UGX";
        /** United States dollar */
        CurrencyCode["USD"] = "USD";
        /** Uruguayan peso */
        CurrencyCode["UYU"] = "UYU";
        /** Uzbekistan som */
        CurrencyCode["UZS"] = "UZS";
        /** Venezuelan bolívar soberano */
        CurrencyCode["VES"] = "VES";
        /** Vietnamese đồng */
        CurrencyCode["VND"] = "VND";
        /** Vanuatu vatu */
        CurrencyCode["VUV"] = "VUV";
        /** Samoan tala */
        CurrencyCode["WST"] = "WST";
        /** CFA franc BEAC */
        CurrencyCode["XAF"] = "XAF";
        /** East Caribbean dollar */
        CurrencyCode["XCD"] = "XCD";
        /** CFA franc BCEAO */
        CurrencyCode["XOF"] = "XOF";
        /** CFP franc (franc Pacifique) */
        CurrencyCode["XPF"] = "XPF";
        /** Yemeni rial */
        CurrencyCode["YER"] = "YER";
        /** South African rand */
        CurrencyCode["ZAR"] = "ZAR";
        /** Zambian kwacha */
        CurrencyCode["ZMW"] = "ZMW";
        /** Zimbabwean dollar */
        CurrencyCode["ZWL"] = "ZWL";
    })(exports.CurrencyCode || (exports.CurrencyCode = {}));
    exports.HistoryEntryType = void 0;
    (function (HistoryEntryType) {
        HistoryEntryType["CUSTOMER_REGISTERED"] = "CUSTOMER_REGISTERED";
        HistoryEntryType["CUSTOMER_VERIFIED"] = "CUSTOMER_VERIFIED";
        HistoryEntryType["CUSTOMER_DETAIL_UPDATED"] = "CUSTOMER_DETAIL_UPDATED";
        HistoryEntryType["CUSTOMER_ADDED_TO_GROUP"] = "CUSTOMER_ADDED_TO_GROUP";
        HistoryEntryType["CUSTOMER_REMOVED_FROM_GROUP"] = "CUSTOMER_REMOVED_FROM_GROUP";
        HistoryEntryType["CUSTOMER_ADDRESS_CREATED"] = "CUSTOMER_ADDRESS_CREATED";
        HistoryEntryType["CUSTOMER_ADDRESS_UPDATED"] = "CUSTOMER_ADDRESS_UPDATED";
        HistoryEntryType["CUSTOMER_ADDRESS_DELETED"] = "CUSTOMER_ADDRESS_DELETED";
        HistoryEntryType["CUSTOMER_PASSWORD_UPDATED"] = "CUSTOMER_PASSWORD_UPDATED";
        HistoryEntryType["CUSTOMER_PASSWORD_RESET_REQUESTED"] = "CUSTOMER_PASSWORD_RESET_REQUESTED";
        HistoryEntryType["CUSTOMER_PASSWORD_RESET_VERIFIED"] = "CUSTOMER_PASSWORD_RESET_VERIFIED";
        HistoryEntryType["CUSTOMER_EMAIL_UPDATE_REQUESTED"] = "CUSTOMER_EMAIL_UPDATE_REQUESTED";
        HistoryEntryType["CUSTOMER_EMAIL_UPDATE_VERIFIED"] = "CUSTOMER_EMAIL_UPDATE_VERIFIED";
        HistoryEntryType["CUSTOMER_NOTE"] = "CUSTOMER_NOTE";
        HistoryEntryType["ORDER_STATE_TRANSITION"] = "ORDER_STATE_TRANSITION";
        HistoryEntryType["ORDER_PAYMENT_TRANSITION"] = "ORDER_PAYMENT_TRANSITION";
        HistoryEntryType["ORDER_FULFILLMENT"] = "ORDER_FULFILLMENT";
        HistoryEntryType["ORDER_CANCELLATION"] = "ORDER_CANCELLATION";
        HistoryEntryType["ORDER_REFUND_TRANSITION"] = "ORDER_REFUND_TRANSITION";
        HistoryEntryType["ORDER_FULFILLMENT_TRANSITION"] = "ORDER_FULFILLMENT_TRANSITION";
        HistoryEntryType["ORDER_NOTE"] = "ORDER_NOTE";
        HistoryEntryType["ORDER_COUPON_APPLIED"] = "ORDER_COUPON_APPLIED";
        HistoryEntryType["ORDER_COUPON_REMOVED"] = "ORDER_COUPON_REMOVED";
        HistoryEntryType["ORDER_MODIFIED"] = "ORDER_MODIFIED";
    })(exports.HistoryEntryType || (exports.HistoryEntryType = {}));
    /**
     * @description
     * Languages in the form of a ISO 639-1 language code with optional
     * region or script modifier (e.g. de_AT). The selection available is based
     * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
     * and includes the major spoken languages of the world and any widely-used variants.
     *
     * @docsCategory common
     */
    exports.LanguageCode = void 0;
    (function (LanguageCode) {
        /** Afrikaans */
        LanguageCode["af"] = "af";
        /** Akan */
        LanguageCode["ak"] = "ak";
        /** Amharic */
        LanguageCode["am"] = "am";
        /** Arabic */
        LanguageCode["ar"] = "ar";
        /** Assamese */
        LanguageCode["as"] = "as";
        /** Azerbaijani */
        LanguageCode["az"] = "az";
        /** Belarusian */
        LanguageCode["be"] = "be";
        /** Bulgarian */
        LanguageCode["bg"] = "bg";
        /** Bambara */
        LanguageCode["bm"] = "bm";
        /** Bangla */
        LanguageCode["bn"] = "bn";
        /** Tibetan */
        LanguageCode["bo"] = "bo";
        /** Breton */
        LanguageCode["br"] = "br";
        /** Bosnian */
        LanguageCode["bs"] = "bs";
        /** Catalan */
        LanguageCode["ca"] = "ca";
        /** Chechen */
        LanguageCode["ce"] = "ce";
        /** Corsican */
        LanguageCode["co"] = "co";
        /** Czech */
        LanguageCode["cs"] = "cs";
        /** Church Slavic */
        LanguageCode["cu"] = "cu";
        /** Welsh */
        LanguageCode["cy"] = "cy";
        /** Danish */
        LanguageCode["da"] = "da";
        /** German */
        LanguageCode["de"] = "de";
        /** Austrian German */
        LanguageCode["de_AT"] = "de_AT";
        /** Swiss High German */
        LanguageCode["de_CH"] = "de_CH";
        /** Dzongkha */
        LanguageCode["dz"] = "dz";
        /** Ewe */
        LanguageCode["ee"] = "ee";
        /** Greek */
        LanguageCode["el"] = "el";
        /** English */
        LanguageCode["en"] = "en";
        /** Australian English */
        LanguageCode["en_AU"] = "en_AU";
        /** Canadian English */
        LanguageCode["en_CA"] = "en_CA";
        /** British English */
        LanguageCode["en_GB"] = "en_GB";
        /** American English */
        LanguageCode["en_US"] = "en_US";
        /** Esperanto */
        LanguageCode["eo"] = "eo";
        /** Spanish */
        LanguageCode["es"] = "es";
        /** European Spanish */
        LanguageCode["es_ES"] = "es_ES";
        /** Mexican Spanish */
        LanguageCode["es_MX"] = "es_MX";
        /** Estonian */
        LanguageCode["et"] = "et";
        /** Basque */
        LanguageCode["eu"] = "eu";
        /** Persian */
        LanguageCode["fa"] = "fa";
        /** Dari */
        LanguageCode["fa_AF"] = "fa_AF";
        /** Fulah */
        LanguageCode["ff"] = "ff";
        /** Finnish */
        LanguageCode["fi"] = "fi";
        /** Faroese */
        LanguageCode["fo"] = "fo";
        /** French */
        LanguageCode["fr"] = "fr";
        /** Canadian French */
        LanguageCode["fr_CA"] = "fr_CA";
        /** Swiss French */
        LanguageCode["fr_CH"] = "fr_CH";
        /** Western Frisian */
        LanguageCode["fy"] = "fy";
        /** Irish */
        LanguageCode["ga"] = "ga";
        /** Scottish Gaelic */
        LanguageCode["gd"] = "gd";
        /** Galician */
        LanguageCode["gl"] = "gl";
        /** Gujarati */
        LanguageCode["gu"] = "gu";
        /** Manx */
        LanguageCode["gv"] = "gv";
        /** Hausa */
        LanguageCode["ha"] = "ha";
        /** Hebrew */
        LanguageCode["he"] = "he";
        /** Hindi */
        LanguageCode["hi"] = "hi";
        /** Croatian */
        LanguageCode["hr"] = "hr";
        /** Haitian Creole */
        LanguageCode["ht"] = "ht";
        /** Hungarian */
        LanguageCode["hu"] = "hu";
        /** Armenian */
        LanguageCode["hy"] = "hy";
        /** Interlingua */
        LanguageCode["ia"] = "ia";
        /** Indonesian */
        LanguageCode["id"] = "id";
        /** Igbo */
        LanguageCode["ig"] = "ig";
        /** Sichuan Yi */
        LanguageCode["ii"] = "ii";
        /** Icelandic */
        LanguageCode["is"] = "is";
        /** Italian */
        LanguageCode["it"] = "it";
        /** Japanese */
        LanguageCode["ja"] = "ja";
        /** Javanese */
        LanguageCode["jv"] = "jv";
        /** Georgian */
        LanguageCode["ka"] = "ka";
        /** Kikuyu */
        LanguageCode["ki"] = "ki";
        /** Kazakh */
        LanguageCode["kk"] = "kk";
        /** Kalaallisut */
        LanguageCode["kl"] = "kl";
        /** Khmer */
        LanguageCode["km"] = "km";
        /** Kannada */
        LanguageCode["kn"] = "kn";
        /** Korean */
        LanguageCode["ko"] = "ko";
        /** Kashmiri */
        LanguageCode["ks"] = "ks";
        /** Kurdish */
        LanguageCode["ku"] = "ku";
        /** Cornish */
        LanguageCode["kw"] = "kw";
        /** Kyrgyz */
        LanguageCode["ky"] = "ky";
        /** Latin */
        LanguageCode["la"] = "la";
        /** Luxembourgish */
        LanguageCode["lb"] = "lb";
        /** Ganda */
        LanguageCode["lg"] = "lg";
        /** Lingala */
        LanguageCode["ln"] = "ln";
        /** Lao */
        LanguageCode["lo"] = "lo";
        /** Lithuanian */
        LanguageCode["lt"] = "lt";
        /** Luba-Katanga */
        LanguageCode["lu"] = "lu";
        /** Latvian */
        LanguageCode["lv"] = "lv";
        /** Malagasy */
        LanguageCode["mg"] = "mg";
        /** Maori */
        LanguageCode["mi"] = "mi";
        /** Macedonian */
        LanguageCode["mk"] = "mk";
        /** Malayalam */
        LanguageCode["ml"] = "ml";
        /** Mongolian */
        LanguageCode["mn"] = "mn";
        /** Marathi */
        LanguageCode["mr"] = "mr";
        /** Malay */
        LanguageCode["ms"] = "ms";
        /** Maltese */
        LanguageCode["mt"] = "mt";
        /** Burmese */
        LanguageCode["my"] = "my";
        /** Norwegian Bokmål */
        LanguageCode["nb"] = "nb";
        /** North Ndebele */
        LanguageCode["nd"] = "nd";
        /** Nepali */
        LanguageCode["ne"] = "ne";
        /** Dutch */
        LanguageCode["nl"] = "nl";
        /** Flemish */
        LanguageCode["nl_BE"] = "nl_BE";
        /** Norwegian Nynorsk */
        LanguageCode["nn"] = "nn";
        /** Nyanja */
        LanguageCode["ny"] = "ny";
        /** Oromo */
        LanguageCode["om"] = "om";
        /** Odia */
        LanguageCode["or"] = "or";
        /** Ossetic */
        LanguageCode["os"] = "os";
        /** Punjabi */
        LanguageCode["pa"] = "pa";
        /** Polish */
        LanguageCode["pl"] = "pl";
        /** Pashto */
        LanguageCode["ps"] = "ps";
        /** Portuguese */
        LanguageCode["pt"] = "pt";
        /** Brazilian Portuguese */
        LanguageCode["pt_BR"] = "pt_BR";
        /** European Portuguese */
        LanguageCode["pt_PT"] = "pt_PT";
        /** Quechua */
        LanguageCode["qu"] = "qu";
        /** Romansh */
        LanguageCode["rm"] = "rm";
        /** Rundi */
        LanguageCode["rn"] = "rn";
        /** Romanian */
        LanguageCode["ro"] = "ro";
        /** Moldavian */
        LanguageCode["ro_MD"] = "ro_MD";
        /** Russian */
        LanguageCode["ru"] = "ru";
        /** Kinyarwanda */
        LanguageCode["rw"] = "rw";
        /** Sanskrit */
        LanguageCode["sa"] = "sa";
        /** Sindhi */
        LanguageCode["sd"] = "sd";
        /** Northern Sami */
        LanguageCode["se"] = "se";
        /** Sango */
        LanguageCode["sg"] = "sg";
        /** Sinhala */
        LanguageCode["si"] = "si";
        /** Slovak */
        LanguageCode["sk"] = "sk";
        /** Slovenian */
        LanguageCode["sl"] = "sl";
        /** Samoan */
        LanguageCode["sm"] = "sm";
        /** Shona */
        LanguageCode["sn"] = "sn";
        /** Somali */
        LanguageCode["so"] = "so";
        /** Albanian */
        LanguageCode["sq"] = "sq";
        /** Serbian */
        LanguageCode["sr"] = "sr";
        /** Southern Sotho */
        LanguageCode["st"] = "st";
        /** Sundanese */
        LanguageCode["su"] = "su";
        /** Swedish */
        LanguageCode["sv"] = "sv";
        /** Swahili */
        LanguageCode["sw"] = "sw";
        /** Congo Swahili */
        LanguageCode["sw_CD"] = "sw_CD";
        /** Tamil */
        LanguageCode["ta"] = "ta";
        /** Telugu */
        LanguageCode["te"] = "te";
        /** Tajik */
        LanguageCode["tg"] = "tg";
        /** Thai */
        LanguageCode["th"] = "th";
        /** Tigrinya */
        LanguageCode["ti"] = "ti";
        /** Turkmen */
        LanguageCode["tk"] = "tk";
        /** Tongan */
        LanguageCode["to"] = "to";
        /** Turkish */
        LanguageCode["tr"] = "tr";
        /** Tatar */
        LanguageCode["tt"] = "tt";
        /** Uyghur */
        LanguageCode["ug"] = "ug";
        /** Ukrainian */
        LanguageCode["uk"] = "uk";
        /** Urdu */
        LanguageCode["ur"] = "ur";
        /** Uzbek */
        LanguageCode["uz"] = "uz";
        /** Vietnamese */
        LanguageCode["vi"] = "vi";
        /** Volapük */
        LanguageCode["vo"] = "vo";
        /** Wolof */
        LanguageCode["wo"] = "wo";
        /** Xhosa */
        LanguageCode["xh"] = "xh";
        /** Yiddish */
        LanguageCode["yi"] = "yi";
        /** Yoruba */
        LanguageCode["yo"] = "yo";
        /** Chinese */
        LanguageCode["zh"] = "zh";
        /** Simplified Chinese */
        LanguageCode["zh_Hans"] = "zh_Hans";
        /** Traditional Chinese */
        LanguageCode["zh_Hant"] = "zh_Hant";
        /** Zulu */
        LanguageCode["zu"] = "zu";
    })(exports.LanguageCode || (exports.LanguageCode = {}));

    var ProductDataService = /** @class */ (function () {
        function ProductDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        ProductDataService.prototype.searchProducts = function (term, take, skip) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(SEARCH_PRODUCTS, {
                input: {
                    term: term,
                    take: take,
                    skip: skip,
                    groupByProduct: true,
                },
            });
        };
        ProductDataService.prototype.productSelectorSearch = function (term, take) {
            return this.baseDataService.query(PRODUCT_SELECTOR_SEARCH, {
                take: take,
                term: term,
            });
        };
        ProductDataService.prototype.reindex = function () {
            return this.baseDataService.mutate(REINDEX);
        };
        ProductDataService.prototype.getProducts = function (options) {
            return this.baseDataService.query(GET_PRODUCT_LIST, {
                options: options,
            });
        };
        ProductDataService.prototype.getProduct = function (id) {
            return this.baseDataService.query(GET_PRODUCT_WITH_VARIANTS, {
                id: id,
            });
        };
        ProductDataService.prototype.getProductSimple = function (id) {
            return this.baseDataService.query(GET_PRODUCT_SIMPLE, {
                id: id,
            });
        };
        ProductDataService.prototype.getProductVariants = function (options) {
            return this.baseDataService.query(GET_PRODUCT_VARIANT_LIST, { options: options });
        };
        ProductDataService.prototype.getProductVariant = function (id) {
            return this.baseDataService.query(GET_PRODUCT_VARIANT, { id: id });
        };
        ProductDataService.prototype.getProductVariantsOptions = function (id) {
            return this.baseDataService.query(GET_PRODUCT_VARIANT_OPTIONS, {
                id: id,
            });
        };
        ProductDataService.prototype.getProductOptionGroup = function (id) {
            return this.baseDataService.query(GET_PRODUCT_OPTION_GROUP, {
                id: id,
            });
        };
        ProductDataService.prototype.createProduct = function (product) {
            var input = {
                input: pick.pick(product, [
                    'enabled',
                    'translations',
                    'customFields',
                    'assetIds',
                    'featuredAssetId',
                    'facetValueIds',
                ]),
            };
            return this.baseDataService.mutate(CREATE_PRODUCT, input);
        };
        ProductDataService.prototype.updateProduct = function (product) {
            var input = {
                input: pick.pick(product, [
                    'id',
                    'enabled',
                    'translations',
                    'customFields',
                    'assetIds',
                    'featuredAssetId',
                    'facetValueIds',
                ]),
            };
            return this.baseDataService.mutate(UPDATE_PRODUCT, input);
        };
        ProductDataService.prototype.deleteProduct = function (id) {
            return this.baseDataService.mutate(DELETE_PRODUCT, {
                id: id,
            });
        };
        ProductDataService.prototype.createProductVariants = function (input) {
            return this.baseDataService.mutate(CREATE_PRODUCT_VARIANTS, {
                input: input,
            });
        };
        ProductDataService.prototype.updateProductVariants = function (variants) {
            var input = {
                input: variants.map(pick.pick([
                    'id',
                    'enabled',
                    'translations',
                    'sku',
                    'price',
                    'taxCategoryId',
                    'facetValueIds',
                    'featuredAssetId',
                    'assetIds',
                    'trackInventory',
                    'outOfStockThreshold',
                    'useGlobalOutOfStockThreshold',
                    'stockOnHand',
                    'customFields',
                ])),
            };
            return this.baseDataService.mutate(UPDATE_PRODUCT_VARIANTS, input);
        };
        ProductDataService.prototype.deleteProductVariant = function (id) {
            return this.baseDataService.mutate(DELETE_PRODUCT_VARIANT, {
                id: id,
            });
        };
        ProductDataService.prototype.createProductOptionGroups = function (productOptionGroup) {
            var input = {
                input: productOptionGroup,
            };
            return this.baseDataService.mutate(CREATE_PRODUCT_OPTION_GROUP, input);
        };
        ProductDataService.prototype.addOptionGroupToProduct = function (variables) {
            return this.baseDataService.mutate(ADD_OPTION_GROUP_TO_PRODUCT, variables);
        };
        ProductDataService.prototype.addOptionToGroup = function (input) {
            return this.baseDataService.mutate(ADD_OPTION_TO_GROUP, { input: input });
        };
        ProductDataService.prototype.removeOptionGroupFromProduct = function (variables) {
            return this.baseDataService.mutate(REMOVE_OPTION_GROUP_FROM_PRODUCT, variables);
        };
        ProductDataService.prototype.updateProductOption = function (input) {
            return this.baseDataService.mutate(UPDATE_PRODUCT_OPTION, {
                input: pick.pick(input, ['id', 'code', 'translations', 'customFields']),
            });
        };
        ProductDataService.prototype.getProductOptionGroups = function (filterTerm) {
            return this.baseDataService.query(GET_PRODUCT_OPTION_GROUPS, {
                filterTerm: filterTerm,
            });
        };
        ProductDataService.prototype.getAssetList = function (take, skip) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(GET_ASSET_LIST, {
                options: {
                    skip: skip,
                    take: take,
                    sort: {
                        createdAt: exports.SortOrder.DESC,
                    },
                },
            });
        };
        ProductDataService.prototype.getAsset = function (id) {
            return this.baseDataService.query(GET_ASSET, {
                id: id,
            });
        };
        ProductDataService.prototype.createAssets = function (files) {
            return this.baseDataService.mutate(CREATE_ASSETS, {
                input: files.map(function (file) { return ({ file: file }); }),
            });
        };
        ProductDataService.prototype.updateAsset = function (input) {
            return this.baseDataService.mutate(UPDATE_ASSET, {
                input: input,
            });
        };
        ProductDataService.prototype.deleteAssets = function (ids, force) {
            return this.baseDataService.mutate(DELETE_ASSETS, {
                input: {
                    assetIds: ids,
                    force: force,
                },
            });
        };
        ProductDataService.prototype.assignProductsToChannel = function (input) {
            return this.baseDataService.mutate(ASSIGN_PRODUCTS_TO_CHANNEL, {
                input: input,
            });
        };
        ProductDataService.prototype.removeProductsFromChannel = function (input) {
            return this.baseDataService.mutate(REMOVE_PRODUCTS_FROM_CHANNEL, {
                input: input,
            });
        };
        ProductDataService.prototype.assignVariantsToChannel = function (input) {
            return this.baseDataService.mutate(ASSIGN_VARIANTS_TO_CHANNEL, {
                input: input,
            });
        };
        ProductDataService.prototype.removeVariantsFromChannel = function (input) {
            return this.baseDataService.mutate(REMOVE_VARIANTS_FROM_CHANNEL, {
                input: input,
            });
        };
        ProductDataService.prototype.getTag = function (id) {
            return this.baseDataService.query(GET_TAG, { id: id });
        };
        ProductDataService.prototype.getTagList = function (options) {
            return this.baseDataService.query(GET_TAG_LIST, { options: options });
        };
        ProductDataService.prototype.createTag = function (input) {
            return this.baseDataService.mutate(CREATE_TAG, { input: input });
        };
        ProductDataService.prototype.updateTag = function (input) {
            return this.baseDataService.mutate(UPDATE_TAG, { input: input });
        };
        ProductDataService.prototype.deleteTag = function (id) {
            return this.baseDataService.mutate(DELETE_TAG, { id: id });
        };
        return ProductDataService;
    }());

    var PROMOTION_FRAGMENT = apolloAngular.gql(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n    fragment Promotion on Promotion {\n        id\n        createdAt\n        updatedAt\n        name\n        enabled\n        couponCode\n        perCustomerUsageLimit\n        startsAt\n        endsAt\n        conditions {\n            ...ConfigurableOperation\n        }\n        actions {\n            ...ConfigurableOperation\n        }\n    }\n    ", "\n"], ["\n    fragment Promotion on Promotion {\n        id\n        createdAt\n        updatedAt\n        name\n        enabled\n        couponCode\n        perCustomerUsageLimit\n        startsAt\n        endsAt\n        conditions {\n            ...ConfigurableOperation\n        }\n        actions {\n            ...ConfigurableOperation\n        }\n    }\n    ", "\n"])), CONFIGURABLE_OPERATION_FRAGMENT);
    var GET_PROMOTION_LIST = apolloAngular.gql(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n    query GetPromotionList($options: PromotionListOptions) {\n        promotions(options: $options) {\n            items {\n                ...Promotion\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetPromotionList($options: PromotionListOptions) {\n        promotions(options: $options) {\n            items {\n                ...Promotion\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), PROMOTION_FRAGMENT);
    var GET_PROMOTION = apolloAngular.gql(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n    query GetPromotion($id: ID!) {\n        promotion(id: $id) {\n            ...Promotion\n        }\n    }\n    ", "\n"], ["\n    query GetPromotion($id: ID!) {\n        promotion(id: $id) {\n            ...Promotion\n        }\n    }\n    ", "\n"])), PROMOTION_FRAGMENT);
    var GET_ADJUSTMENT_OPERATIONS = apolloAngular.gql(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n    query GetAdjustmentOperations {\n        promotionConditions {\n            ...ConfigurableOperationDef\n        }\n        promotionActions {\n            ...ConfigurableOperationDef\n        }\n    }\n    ", "\n"], ["\n    query GetAdjustmentOperations {\n        promotionConditions {\n            ...ConfigurableOperationDef\n        }\n        promotionActions {\n            ...ConfigurableOperationDef\n        }\n    }\n    ", "\n"])), CONFIGURABLE_OPERATION_DEF_FRAGMENT);
    var CREATE_PROMOTION = apolloAngular.gql(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n    mutation CreatePromotion($input: CreatePromotionInput!) {\n        createPromotion(input: $input) {\n            ...Promotion\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"], ["\n    mutation CreatePromotion($input: CreatePromotionInput!) {\n        createPromotion(input: $input) {\n            ...Promotion\n            ...ErrorResult\n        }\n    }\n    ", "\n    ", "\n"])), PROMOTION_FRAGMENT, ERROR_RESULT_FRAGMENT);
    var UPDATE_PROMOTION = apolloAngular.gql(templateObject_6$1 || (templateObject_6$1 = __makeTemplateObject(["\n    mutation UpdatePromotion($input: UpdatePromotionInput!) {\n        updatePromotion(input: $input) {\n            ...Promotion\n        }\n    }\n    ", "\n"], ["\n    mutation UpdatePromotion($input: UpdatePromotionInput!) {\n        updatePromotion(input: $input) {\n            ...Promotion\n        }\n    }\n    ", "\n"])), PROMOTION_FRAGMENT);
    var DELETE_PROMOTION = apolloAngular.gql(templateObject_7$1 || (templateObject_7$1 = __makeTemplateObject(["\n    mutation DeletePromotion($id: ID!) {\n        deletePromotion(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeletePromotion($id: ID!) {\n        deletePromotion(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var templateObject_1$1, templateObject_2$1, templateObject_3$1, templateObject_4$1, templateObject_5$1, templateObject_6$1, templateObject_7$1;

    var PromotionDataService = /** @class */ (function () {
        function PromotionDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        PromotionDataService.prototype.getPromotions = function (take, skip) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(GET_PROMOTION_LIST, {
                options: {
                    take: take,
                    skip: skip,
                },
            });
        };
        PromotionDataService.prototype.getPromotion = function (id) {
            return this.baseDataService.query(GET_PROMOTION, {
                id: id,
            });
        };
        PromotionDataService.prototype.getPromotionActionsAndConditions = function () {
            return this.baseDataService.query(GET_ADJUSTMENT_OPERATIONS);
        };
        PromotionDataService.prototype.createPromotion = function (input) {
            return this.baseDataService.mutate(CREATE_PROMOTION, {
                input: input,
            });
        };
        PromotionDataService.prototype.updatePromotion = function (input) {
            return this.baseDataService.mutate(UPDATE_PROMOTION, {
                input: input,
            });
        };
        PromotionDataService.prototype.deletePromotion = function (id) {
            return this.baseDataService.mutate(DELETE_PROMOTION, { id: id });
        };
        return PromotionDataService;
    }());

    var SettingsDataService = /** @class */ (function () {
        function SettingsDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        SettingsDataService.prototype.getCountries = function (take, skip, filterTerm) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(GET_COUNTRY_LIST, {
                options: {
                    take: take,
                    skip: skip,
                    filter: {
                        name: filterTerm ? { contains: filterTerm } : null,
                    },
                },
            });
        };
        SettingsDataService.prototype.getAvailableCountries = function () {
            return this.baseDataService.query(GET_AVAILABLE_COUNTRIES);
        };
        SettingsDataService.prototype.getCountry = function (id) {
            return this.baseDataService.query(GET_COUNTRY, { id: id });
        };
        SettingsDataService.prototype.createCountry = function (input) {
            return this.baseDataService.mutate(CREATE_COUNTRY, {
                input: pick.pick(input, ['code', 'enabled', 'translations']),
            });
        };
        SettingsDataService.prototype.updateCountry = function (input) {
            return this.baseDataService.mutate(UPDATE_COUNTRY, {
                input: pick.pick(input, ['id', 'code', 'enabled', 'translations']),
            });
        };
        SettingsDataService.prototype.deleteCountry = function (id) {
            return this.baseDataService.mutate(DELETE_COUNTRY, {
                id: id,
            });
        };
        SettingsDataService.prototype.getZones = function () {
            return this.baseDataService.query(GET_ZONES);
        };
        SettingsDataService.prototype.getZone = function (id) {
            return this.baseDataService.query(GET_ZONES, { id: id });
        };
        SettingsDataService.prototype.createZone = function (input) {
            return this.baseDataService.mutate(CREATE_ZONE, {
                input: input,
            });
        };
        SettingsDataService.prototype.updateZone = function (input) {
            return this.baseDataService.mutate(UPDATE_ZONE, {
                input: input,
            });
        };
        SettingsDataService.prototype.deleteZone = function (id) {
            return this.baseDataService.mutate(DELETE_ZONE, {
                id: id,
            });
        };
        SettingsDataService.prototype.addMembersToZone = function (zoneId, memberIds) {
            return this.baseDataService.mutate(ADD_MEMBERS_TO_ZONE, {
                zoneId: zoneId,
                memberIds: memberIds,
            });
        };
        SettingsDataService.prototype.removeMembersFromZone = function (zoneId, memberIds) {
            return this.baseDataService.mutate(REMOVE_MEMBERS_FROM_ZONE, {
                zoneId: zoneId,
                memberIds: memberIds,
            });
        };
        SettingsDataService.prototype.getTaxCategories = function () {
            return this.baseDataService.query(GET_TAX_CATEGORIES);
        };
        SettingsDataService.prototype.getTaxCategory = function (id) {
            return this.baseDataService.query(GET_TAX_CATEGORY, {
                id: id,
            });
        };
        SettingsDataService.prototype.createTaxCategory = function (input) {
            return this.baseDataService.mutate(CREATE_TAX_CATEGORY, {
                input: input,
            });
        };
        SettingsDataService.prototype.updateTaxCategory = function (input) {
            return this.baseDataService.mutate(UPDATE_TAX_CATEGORY, {
                input: input,
            });
        };
        SettingsDataService.prototype.deleteTaxCategory = function (id) {
            return this.baseDataService.mutate(DELETE_TAX_CATEGORY, {
                id: id,
            });
        };
        SettingsDataService.prototype.getTaxRates = function (take, skip, fetchPolicy) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(GET_TAX_RATE_LIST, {
                options: {
                    take: take,
                    skip: skip,
                },
            }, fetchPolicy);
        };
        SettingsDataService.prototype.getTaxRate = function (id) {
            return this.baseDataService.query(GET_TAX_RATE, {
                id: id,
            });
        };
        SettingsDataService.prototype.createTaxRate = function (input) {
            return this.baseDataService.mutate(CREATE_TAX_RATE, {
                input: input,
            });
        };
        SettingsDataService.prototype.updateTaxRate = function (input) {
            return this.baseDataService.mutate(UPDATE_TAX_RATE, {
                input: input,
            });
        };
        SettingsDataService.prototype.deleteTaxRate = function (id) {
            return this.baseDataService.mutate(DELETE_TAX_RATE, {
                id: id,
            });
        };
        SettingsDataService.prototype.getChannels = function () {
            return this.baseDataService.query(GET_CHANNELS);
        };
        SettingsDataService.prototype.getChannel = function (id) {
            return this.baseDataService.query(GET_CHANNEL, {
                id: id,
            });
        };
        SettingsDataService.prototype.getActiveChannel = function (fetchPolicy) {
            return this.baseDataService.query(GET_ACTIVE_CHANNEL, {}, fetchPolicy);
        };
        SettingsDataService.prototype.createChannel = function (input) {
            return this.baseDataService.mutate(CREATE_CHANNEL, {
                input: input,
            });
        };
        SettingsDataService.prototype.updateChannel = function (input) {
            return this.baseDataService.mutate(UPDATE_CHANNEL, {
                input: input,
            });
        };
        SettingsDataService.prototype.deleteChannel = function (id) {
            return this.baseDataService.mutate(DELETE_CHANNEL, {
                id: id,
            });
        };
        SettingsDataService.prototype.getPaymentMethods = function (take, skip) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(GET_PAYMENT_METHOD_LIST, {
                options: {
                    skip: skip,
                    take: take,
                },
            });
        };
        SettingsDataService.prototype.getPaymentMethod = function (id) {
            return this.baseDataService.query(GET_PAYMENT_METHOD, {
                id: id,
            });
        };
        SettingsDataService.prototype.createPaymentMethod = function (input) {
            return this.baseDataService.mutate(CREATE_PAYMENT_METHOD, {
                input: input,
            });
        };
        SettingsDataService.prototype.updatePaymentMethod = function (input) {
            return this.baseDataService.mutate(UPDATE_PAYMENT_METHOD, {
                input: input,
            });
        };
        SettingsDataService.prototype.deletePaymentMethod = function (id, force) {
            return this.baseDataService.mutate(DELETE_PAYMENT_METHOD, {
                id: id,
                force: force,
            });
        };
        SettingsDataService.prototype.getPaymentMethodOperations = function () {
            return this.baseDataService.query(GET_PAYMENT_METHOD_OPERATIONS);
        };
        SettingsDataService.prototype.getGlobalSettings = function (fetchPolicy) {
            return this.baseDataService.query(GET_GLOBAL_SETTINGS, undefined, fetchPolicy);
        };
        SettingsDataService.prototype.updateGlobalSettings = function (input) {
            return this.baseDataService.mutate(UPDATE_GLOBAL_SETTINGS, {
                input: input,
            });
        };
        SettingsDataService.prototype.getJob = function (id) {
            return this.baseDataService.query(GET_JOB_INFO, { id: id });
        };
        SettingsDataService.prototype.pollJobs = function (ids) {
            return this.baseDataService.query(GET_JOBS_BY_ID, {
                ids: ids,
            });
        };
        SettingsDataService.prototype.getAllJobs = function (options) {
            return this.baseDataService.query(GET_JOBS_LIST, {
                options: options,
            });
        };
        SettingsDataService.prototype.getJobQueues = function () {
            return this.baseDataService.query(GET_JOB_QUEUE_LIST);
        };
        SettingsDataService.prototype.getRunningJobs = function () {
            return this.baseDataService.query(GET_JOBS_LIST, {
                options: {
                    filter: {
                        state: {
                            eq: exports.JobState.RUNNING,
                        },
                    },
                },
            });
        };
        SettingsDataService.prototype.cancelJob = function (id) {
            return this.baseDataService.mutate(CANCEL_JOB, {
                id: id,
            });
        };
        return SettingsDataService;
    }());

    var SHIPPING_METHOD_FRAGMENT = apolloAngular.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment ShippingMethod on ShippingMethod {\n        id\n        createdAt\n        updatedAt\n        code\n        name\n        description\n        fulfillmentHandlerCode\n        checker {\n            ...ConfigurableOperation\n        }\n        calculator {\n            ...ConfigurableOperation\n        }\n        translations {\n            id\n            languageCode\n            name\n            description\n        }\n    }\n    ", "\n"], ["\n    fragment ShippingMethod on ShippingMethod {\n        id\n        createdAt\n        updatedAt\n        code\n        name\n        description\n        fulfillmentHandlerCode\n        checker {\n            ...ConfigurableOperation\n        }\n        calculator {\n            ...ConfigurableOperation\n        }\n        translations {\n            id\n            languageCode\n            name\n            description\n        }\n    }\n    ", "\n"])), CONFIGURABLE_OPERATION_FRAGMENT);
    var GET_SHIPPING_METHOD_LIST = apolloAngular.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query GetShippingMethodList($options: ShippingMethodListOptions) {\n        shippingMethods(options: $options) {\n            items {\n                ...ShippingMethod\n            }\n            totalItems\n        }\n    }\n    ", "\n"], ["\n    query GetShippingMethodList($options: ShippingMethodListOptions) {\n        shippingMethods(options: $options) {\n            items {\n                ...ShippingMethod\n            }\n            totalItems\n        }\n    }\n    ", "\n"])), SHIPPING_METHOD_FRAGMENT);
    var GET_SHIPPING_METHOD = apolloAngular.gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    query GetShippingMethod($id: ID!) {\n        shippingMethod(id: $id) {\n            ...ShippingMethod\n        }\n    }\n    ", "\n"], ["\n    query GetShippingMethod($id: ID!) {\n        shippingMethod(id: $id) {\n            ...ShippingMethod\n        }\n    }\n    ", "\n"])), SHIPPING_METHOD_FRAGMENT);
    var GET_SHIPPING_METHOD_OPERATIONS = apolloAngular.gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    query GetShippingMethodOperations {\n        shippingEligibilityCheckers {\n            ...ConfigurableOperationDef\n        }\n        shippingCalculators {\n            ...ConfigurableOperationDef\n        }\n        fulfillmentHandlers {\n            ...ConfigurableOperationDef\n        }\n    }\n    ", "\n"], ["\n    query GetShippingMethodOperations {\n        shippingEligibilityCheckers {\n            ...ConfigurableOperationDef\n        }\n        shippingCalculators {\n            ...ConfigurableOperationDef\n        }\n        fulfillmentHandlers {\n            ...ConfigurableOperationDef\n        }\n    }\n    ", "\n"])), CONFIGURABLE_OPERATION_DEF_FRAGMENT);
    var CREATE_SHIPPING_METHOD = apolloAngular.gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    mutation CreateShippingMethod($input: CreateShippingMethodInput!) {\n        createShippingMethod(input: $input) {\n            ...ShippingMethod\n        }\n    }\n    ", "\n"], ["\n    mutation CreateShippingMethod($input: CreateShippingMethodInput!) {\n        createShippingMethod(input: $input) {\n            ...ShippingMethod\n        }\n    }\n    ", "\n"])), SHIPPING_METHOD_FRAGMENT);
    var UPDATE_SHIPPING_METHOD = apolloAngular.gql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    mutation UpdateShippingMethod($input: UpdateShippingMethodInput!) {\n        updateShippingMethod(input: $input) {\n            ...ShippingMethod\n        }\n    }\n    ", "\n"], ["\n    mutation UpdateShippingMethod($input: UpdateShippingMethodInput!) {\n        updateShippingMethod(input: $input) {\n            ...ShippingMethod\n        }\n    }\n    ", "\n"])), SHIPPING_METHOD_FRAGMENT);
    var DELETE_SHIPPING_METHOD = apolloAngular.gql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    mutation DeleteShippingMethod($id: ID!) {\n        deleteShippingMethod(id: $id) {\n            result\n            message\n        }\n    }\n"], ["\n    mutation DeleteShippingMethod($id: ID!) {\n        deleteShippingMethod(id: $id) {\n            result\n            message\n        }\n    }\n"])));
    var TEST_SHIPPING_METHOD = apolloAngular.gql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    query TestShippingMethod($input: TestShippingMethodInput!) {\n        testShippingMethod(input: $input) {\n            eligible\n            quote {\n                price\n                priceWithTax\n                metadata\n            }\n        }\n    }\n"], ["\n    query TestShippingMethod($input: TestShippingMethodInput!) {\n        testShippingMethod(input: $input) {\n            eligible\n            quote {\n                price\n                priceWithTax\n                metadata\n            }\n        }\n    }\n"])));
    var TEST_ELIGIBLE_SHIPPING_METHODS = apolloAngular.gql(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    query TestEligibleShippingMethods($input: TestEligibleShippingMethodsInput!) {\n        testEligibleShippingMethods(input: $input) {\n            id\n            name\n            code\n            description\n            price\n            priceWithTax\n            metadata\n        }\n    }\n"], ["\n    query TestEligibleShippingMethods($input: TestEligibleShippingMethodsInput!) {\n        testEligibleShippingMethods(input: $input) {\n            id\n            name\n            code\n            description\n            price\n            priceWithTax\n            metadata\n        }\n    }\n"])));
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;

    var ShippingMethodDataService = /** @class */ (function () {
        function ShippingMethodDataService(baseDataService) {
            this.baseDataService = baseDataService;
        }
        ShippingMethodDataService.prototype.getShippingMethods = function (take, skip) {
            if (take === void 0) { take = 10; }
            if (skip === void 0) { skip = 0; }
            return this.baseDataService.query(GET_SHIPPING_METHOD_LIST, {
                options: {
                    take: take,
                    skip: skip,
                },
            });
        };
        ShippingMethodDataService.prototype.getShippingMethod = function (id) {
            return this.baseDataService.query(GET_SHIPPING_METHOD, {
                id: id,
            });
        };
        ShippingMethodDataService.prototype.getShippingMethodOperations = function () {
            return this.baseDataService.query(GET_SHIPPING_METHOD_OPERATIONS);
        };
        ShippingMethodDataService.prototype.createShippingMethod = function (input) {
            var variables = {
                input: pick.pick(input, [
                    'code',
                    'checker',
                    'calculator',
                    'fulfillmentHandler',
                    'customFields',
                    'translations',
                ]),
            };
            return this.baseDataService.mutate(CREATE_SHIPPING_METHOD, variables);
        };
        ShippingMethodDataService.prototype.updateShippingMethod = function (input) {
            var variables = {
                input: pick.pick(input, [
                    'id',
                    'code',
                    'checker',
                    'calculator',
                    'fulfillmentHandler',
                    'customFields',
                    'translations',
                ]),
            };
            return this.baseDataService.mutate(UPDATE_SHIPPING_METHOD, variables);
        };
        ShippingMethodDataService.prototype.deleteShippingMethod = function (id) {
            return this.baseDataService.mutate(DELETE_SHIPPING_METHOD, {
                id: id,
            });
        };
        ShippingMethodDataService.prototype.testShippingMethod = function (input) {
            return this.baseDataService.query(TEST_SHIPPING_METHOD, {
                input: input,
            });
        };
        ShippingMethodDataService.prototype.testEligibleShippingMethods = function (input) {
            return this.baseDataService.query(TEST_ELIGIBLE_SHIPPING_METHODS, {
                input: input,
            });
        };
        return ShippingMethodDataService;
    }());

    var DataService = /** @class */ (function () {
        function DataService(baseDataService) {
            this.baseDataService = baseDataService;
            this.promotion = new PromotionDataService(baseDataService);
            this.administrator = new AdministratorDataService(baseDataService);
            this.auth = new AuthDataService(baseDataService);
            this.collection = new CollectionDataService(baseDataService);
            this.product = new ProductDataService(baseDataService);
            this.client = new ClientDataService(baseDataService);
            this.facet = new FacetDataService(baseDataService);
            this.order = new OrderDataService(baseDataService);
            this.settings = new SettingsDataService(baseDataService);
            this.customer = new CustomerDataService(baseDataService);
            this.shippingMethod = new ShippingMethodDataService(baseDataService);
        }
        /**
         * Perform a GraphQL query.
         */
        DataService.prototype.query = function (query, variables, fetchPolicy) {
            if (fetchPolicy === void 0) { fetchPolicy = 'cache-and-network'; }
            return this.baseDataService.query(query, variables, fetchPolicy);
        };
        /**
         * Perform a GraphQL mutation.
         */
        DataService.prototype.mutate = function (mutation, variables, update) {
            return this.baseDataService.mutate(mutation, variables, update);
        };
        return DataService;
    }());
    DataService.decorators = [
        { type: i0.Injectable }
    ];
    DataService.ctorParameters = function () { return [
        { type: BaseDataService }
    ]; };

    var AppComponent = /** @class */ (function () {
        function AppComponent(dataService, document) {
            this.dataService = dataService;
            this.document = document;
            this._document = document;
        }
        AppComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.loading$ = this.dataService.client
                .getNetworkStatus()
                .stream$.pipe(operators.map(function (data) { return 0 < data.networkStatus.inFlightRequests; }));
            this.dataService.client
                .uiState()
                .mapStream(function (data) { return data.uiState.theme; })
                .subscribe(function (theme) {
                var _a;
                (_a = _this._document) === null || _a === void 0 ? void 0 : _a.body.setAttribute('data-theme', theme);
            });
        };
        return AppComponent;
    }());
    AppComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-root',
                    template: "<div class=\"progress loop\" [class.visible]=\"loading$ | async\"></div>\n<router-outlet></router-outlet>\n<vdr-overlay-host></vdr-overlay-host>\n",
                    styles: [".progress{position:absolute;overflow:hidden;height:4px;background-color:var(--color-grey-500);opacity:0;transition:opacity .1s}.progress.visible{opacity:1}"]
                },] }
    ];
    AppComponent.ctorParameters = function () { return [
        { type: DataService },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] }
    ]; };

    var vendureUiConfig;
    function loadAppConfig() {
        return fetch('./vendure-ui-config.json')
            .then(function (res) { return res.json(); })
            .then(function (config) {
            vendureUiConfig = config;
        });
    }
    function getAppConfig() {
        if (!vendureUiConfig) {
            throw new Error("vendure ui config not loaded");
        }
        return vendureUiConfig;
    }

    function getDefaultUiLanguage() {
        return getAppConfig().defaultLanguage;
    }

    /**
     * This service handles logic relating to authentication of the current user.
     */
    var AuthService = /** @class */ (function () {
        function AuthService(localStorageService, dataService, serverConfigService) {
            this.localStorageService = localStorageService;
            this.dataService = dataService;
            this.serverConfigService = serverConfigService;
        }
        /**
         * Attempts to log in via the REST login endpoint and updates the app
         * state on success.
         */
        AuthService.prototype.logIn = function (username, password, rememberMe) {
            var _this = this;
            return this.dataService.auth.attemptLogin(username, password, rememberMe).pipe(operators.switchMap(function (response) {
                if (response.login.__typename === 'CurrentUser') {
                    _this.setChannelToken(response.login.channels);
                }
                return _this.serverConfigService.getServerConfig().then(function () { return response.login; });
            }), operators.switchMap(function (login) {
                if (login.__typename === 'CurrentUser') {
                    var id = _this.getActiveChannel(login.channels).id;
                    return _this.dataService.client
                        .loginSuccess(username, id, login.channels)
                        .pipe(operators.map(function () { return login; }));
                }
                return rxjs.of(login);
            }));
        };
        /**
         * Update the user status to being logged out.
         */
        AuthService.prototype.logOut = function () {
            var _this = this;
            return this.dataService.client.userStatus().single$.pipe(operators.switchMap(function (status) {
                if (status.userStatus.isLoggedIn) {
                    return _this.dataService.client
                        .logOut()
                        .pipe(operators.mergeMap(function () { return _this.dataService.auth.logOut(); }));
                }
                else {
                    return [];
                }
            }), operators.mapTo(true));
        };
        /**
         * Checks the app state to see if the user is already logged in,
         * and if not, attempts to validate any auth token found.
         */
        AuthService.prototype.checkAuthenticatedStatus = function () {
            var _this = this;
            return this.dataService.client.userStatus().single$.pipe(operators.mergeMap(function (data) {
                if (!data.userStatus.isLoggedIn) {
                    return _this.validateAuthToken();
                }
                else {
                    return rxjs.of(true);
                }
            }));
        };
        /**
         * Checks for an auth token and if found, attempts to validate
         * that token against the API.
         */
        AuthService.prototype.validateAuthToken = function () {
            var _this = this;
            return this.dataService.auth.currentUser().single$.pipe(operators.mergeMap(function (result) {
                if (!result.me) {
                    return rxjs.of(false);
                }
                _this.setChannelToken(result.me.channels);
                var id = _this.getActiveChannel(result.me.channels).id;
                return _this.dataService.client.loginSuccess(result.me.identifier, id, result.me.channels);
            }), operators.mapTo(true), operators.catchError(function (err) { return rxjs.of(false); }));
        };
        AuthService.prototype.getActiveChannel = function (userChannels) {
            var lastActiveChannelToken = this.localStorageService.get('activeChannelToken');
            if (lastActiveChannelToken) {
                var lastActiveChannel = userChannels.find(function (c) { return c.token === lastActiveChannelToken; });
                if (lastActiveChannel) {
                    return lastActiveChannel;
                }
            }
            var defaultChannel = userChannels.find(function (c) { return c.code === sharedConstants.DEFAULT_CHANNEL_CODE; });
            return defaultChannel || userChannels[0];
        };
        AuthService.prototype.setChannelToken = function (userChannels) {
            this.localStorageService.set('activeChannelToken', this.getActiveChannel(userChannels).token);
        };
        return AuthService;
    }());
    AuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.ɵɵinject(LocalStorageService), i0.ɵɵinject(DataService), i0.ɵɵinject(ServerConfigService)); }, token: AuthService, providedIn: "root" });
    AuthService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    AuthService.ctorParameters = function () { return [
        { type: LocalStorageService },
        { type: DataService },
        { type: ServerConfigService }
    ]; };

    var I18nService = /** @class */ (function () {
        function I18nService(ngxTranslate) {
            this.ngxTranslate = ngxTranslate;
            this._availableLanguages = [];
        }
        Object.defineProperty(I18nService.prototype, "availableLanguages", {
            get: function () {
                return __spread(this._availableLanguages);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Set the default language
         */
        I18nService.prototype.setDefaultLanguage = function (languageCode) {
            this.ngxTranslate.setDefaultLang(languageCode);
        };
        /**
         * Set the UI language
         */
        I18nService.prototype.setLanguage = function (language) {
            this.ngxTranslate.use(language);
        };
        /**
         * Set the available UI languages
         */
        I18nService.prototype.setAvailableLanguages = function (languages) {
            this._availableLanguages = languages;
        };
        /**
         * Translate the given key.
         */
        I18nService.prototype.translate = function (key, params) {
            return this.ngxTranslate.instant(key, params);
        };
        return I18nService;
    }());
    I18nService.ɵprov = i0.ɵɵdefineInjectable({ factory: function I18nService_Factory() { return new I18nService(i0.ɵɵinject(i1$2.TranslateService)); }, token: I18nService, providedIn: "root" });
    I18nService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    I18nService.ctorParameters = function () { return [
        { type: i1$2.TranslateService }
    ]; };

    /**
     * This component should only be instatiated dynamically by the ModalService. It should not be used
     * directly in templates. See {@link ModalService.fromComponent} method for more detail.
     */
    var ModalDialogComponent = /** @class */ (function () {
        function ModalDialogComponent() {
            this.titleTemplateRef$ = new rxjs.Subject();
            this.buttonsTemplateRef$ = new rxjs.Subject();
        }
        /**
         * This callback is invoked when the childComponentType is instantiated in the
         * template by the {@link DialogComponentOutletComponent}.
         * Once we have the instance, we can set the resolveWith function and any
         * locals which were specified in the config.
         */
        ModalDialogComponent.prototype.onCreate = function (componentInstance) {
            var _this = this;
            componentInstance.resolveWith = function (result) {
                _this.closeModal(result);
            };
            if (this.options && this.options.locals) {
                // tslint:disable-next-line
                for (var key in this.options.locals) {
                    componentInstance[key] = this.options.locals[key];
                }
            }
        };
        /**
         * This should be called by the {@link DialogTitleDirective} only
         */
        ModalDialogComponent.prototype.registerTitleTemplate = function (titleTemplateRef) {
            this.titleTemplateRef$.next(titleTemplateRef);
        };
        /**
         * This should be called by the {@link DialogButtonsDirective} only
         */
        ModalDialogComponent.prototype.registerButtonsTemplate = function (buttonsTemplateRef) {
            this.buttonsTemplateRef$.next(buttonsTemplateRef);
        };
        /**
         * Called when the modal is closed by clicking the X or the mask.
         */
        ModalDialogComponent.prototype.modalOpenChange = function (status) {
            if (status === false) {
                this.closeModal();
            }
        };
        return ModalDialogComponent;
    }());
    ModalDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-modal-dialog',
                    template: "<clr-modal\n    [clrModalOpen]=\"true\"\n    (clrModalOpenChange)=\"modalOpenChange($event)\"\n    [clrModalClosable]=\"options?.closable\"\n    [clrModalSize]=\"options?.size\"\n    [ngClass]=\"'modal-valign-' + (options?.verticalAlign || 'center')\"\n>\n    <h3 class=\"modal-title\"><ng-container *ngTemplateOutlet=\"(titleTemplateRef$ | async)\"></ng-container></h3>\n    <div class=\"modal-body\">\n        <vdr-dialog-component-outlet\n            [component]=\"childComponentType\"\n            (create)=\"onCreate($event)\"\n        ></vdr-dialog-component-outlet>\n    </div>\n    <div class=\"modal-footer\">\n        <ng-container *ngTemplateOutlet=\"(buttonsTemplateRef$ | async)\"></ng-container>\n    </div>\n</clr-modal>\n",
                    styles: ["::ng-deep clr-modal.modal-valign-top .modal{justify-content:flex-start}::ng-deep clr-modal.modal-valign-bottom .modal{justify-content:flex-end}.modal-body{display:flex;flex-direction:column}"]
                },] }
    ];

    /**
     * Used by ModalService.dialog() to host a generic configurable modal dialog.
     */
    var SimpleDialogComponent = /** @class */ (function () {
        function SimpleDialogComponent() {
            this.title = '';
            this.body = '';
            this.translationVars = {};
            this.buttons = [];
        }
        return SimpleDialogComponent;
    }());
    SimpleDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-simple-dialog',
                    template: "<ng-template vdrDialogTitle>{{ title | translate:translationVars }}</ng-template>\n{{ body | translate:translationVars }}\n<ng-template vdrDialogButtons>\n    <ng-container *ngFor=\"let button of buttons\">\n        <button\n            class=\"btn\"\n            [class.btn-primary]=\"button.type === 'primary'\"\n            [class.btn-danger]=\"button.type === 'danger'\"\n            (click)=\"resolveWith(button.returnValue)\"\n        >\n            {{ button.label | translate:translationVars }}\n        </button>\n    </ng-container>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    /**
     * The OverlayHostService is used to get a reference to the ViewConainerRef of the
     * OverlayHost component, so that other components may insert components & elements
     * into the DOM at that point.
     */
    var OverlayHostService = /** @class */ (function () {
        function OverlayHostService() {
            this.promiseResolveFns = [];
        }
        /**
         * Used to pass in the ViewContainerRed from the OverlayHost component.
         * Should not be used by any other component.
         */
        OverlayHostService.prototype.registerHostView = function (viewContainerRef) {
            this.hostView = viewContainerRef;
            if (0 < this.promiseResolveFns.length) {
                this.resolveHostView();
            }
        };
        /**
         * Returns a promise which resolves to the ViewContainerRef of the OverlayHost
         * component. This can then be used to insert components and elements into the
         * DOM at that point.
         */
        OverlayHostService.prototype.getHostView = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this.promiseResolveFns.push(resolve);
                if (_this.hostView !== undefined) {
                    _this.resolveHostView();
                }
            });
        };
        OverlayHostService.prototype.resolveHostView = function () {
            var _this = this;
            this.promiseResolveFns.forEach(function (resolve) { return resolve(_this.hostView); });
            this.promiseResolveFns = [];
        };
        return OverlayHostService;
    }());
    OverlayHostService.ɵprov = i0.ɵɵdefineInjectable({ factory: function OverlayHostService_Factory() { return new OverlayHostService(); }, token: OverlayHostService, providedIn: "root" });
    OverlayHostService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    /**
     * This service is responsible for instantiating a ModalDialog component and
     * embedding the specified component within.
     */
    var ModalService = /** @class */ (function () {
        function ModalService(componentFactoryResolver, overlayHostService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.overlayHostService = overlayHostService;
        }
        /**
         * Create a modal from a component. The component must implement the {@link Dialog} interface.
         * Additionally, the component should include templates for the title and the buttons to be
         * displayed in the modal dialog. See example:
         *
         * @example
         * ```
         * class MyDialog implements Dialog {
         *  resolveWith: (result?: any) => void;
         *
         *  okay() {
         *    doSomeWork().subscribe(result => {
         *      this.resolveWith(result);
         *    })
         *  }
         *
         *  cancel() {
         *    this.resolveWith(false);
         *  }
         * }
         * ```
         *
         * ```
         * <ng-template vdrDialogTitle>Title of the modal</ng-template>
         *
         * <p>
         *     My Content
         * </p>
         *
         * <ng-template vdrDialogButtons>
         *     <button type="button"
         *             class="btn"
         *             (click)="cancel()">Cancel</button>
         *     <button type="button"
         *             class="btn btn-primary"
         *             (click)="okay()">Okay</button>
         * </ng-template>
         * ```
         */
        ModalService.prototype.fromComponent = function (component, options) {
            var modalFactory = this.componentFactoryResolver.resolveComponentFactory(ModalDialogComponent);
            return rxjs.from(this.overlayHostService.getHostView()).pipe(operators.mergeMap(function (hostView) {
                var modalComponentRef = hostView.createComponent(modalFactory);
                var modalInstance = modalComponentRef.instance;
                modalInstance.childComponentType = component;
                modalInstance.options = options;
                return new rxjs.Observable(function (subscriber) {
                    modalInstance.closeModal = function (result) {
                        modalComponentRef.destroy();
                        subscriber.next(result);
                        subscriber.complete();
                    };
                });
            }));
        };
        /**
         * Displays a modal dialog with the provided title, body and buttons.
         */
        ModalService.prototype.dialog = function (config) {
            return this.fromComponent(SimpleDialogComponent, {
                locals: config,
            });
        };
        return ModalService;
    }());
    ModalService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ModalService_Factory() { return new ModalService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(OverlayHostService)); }, token: ModalService, providedIn: "root" });
    ModalService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ModalService.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver },
        { type: OverlayHostService }
    ]; };

    var UiLanguageSwitcherDialogComponent = /** @class */ (function () {
        function UiLanguageSwitcherDialogComponent() {
            this.availableLanguages = [];
        }
        UiLanguageSwitcherDialogComponent.prototype.setLanguage = function (languageCode) {
            this.resolveWith(languageCode);
        };
        return UiLanguageSwitcherDialogComponent;
    }());
    UiLanguageSwitcherDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-ui-language-switcher',
                    template: "<ng-template vdrDialogTitle>{{ 'common.select-display-language' | translate }}</ng-template>\n\n<div *ngFor=\"let code of availableLanguages\" >\n    <button class=\"btn btn-link btn-sm\" (click)=\"setLanguage(code)\">\n        <clr-icon [attr.shape]=\"code === currentLanguage ? 'dot-circle' : 'circle'\"></clr-icon>\n        {{ code | uppercase }} ({{ 'lang.' + code | translate }})\n    </button>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    var AppShellComponent = /** @class */ (function () {
        function AppShellComponent(authService, dataService, router, i18nService, modalService, localStorageService) {
            this.authService = authService;
            this.dataService = dataService;
            this.router = router;
            this.i18nService = i18nService;
            this.modalService = modalService;
            this.localStorageService = localStorageService;
            this.availableLanguages = [];
        }
        AppShellComponent.prototype.ngOnInit = function () {
            this.userName$ = this.dataService.client
                .userStatus()
                .single$.pipe(operators.map(function (data) { return data.userStatus.username; }));
            this.uiLanguage$ = this.dataService.client.uiState().stream$.pipe(operators.map(function (data) { return data.uiState.language; }));
            this.availableLanguages = this.i18nService.availableLanguages;
        };
        AppShellComponent.prototype.selectUiLanguage = function () {
            var _this = this;
            this.uiLanguage$
                .pipe(operators.take(1), operators.switchMap(function (currentLanguage) { return _this.modalService.fromComponent(UiLanguageSwitcherDialogComponent, {
                closable: true,
                size: 'sm',
                locals: {
                    availableLanguages: _this.availableLanguages,
                    currentLanguage: currentLanguage,
                },
            }); }), operators.switchMap(function (value) { return (value ? _this.dataService.client.setUiLanguage(value) : rxjs.EMPTY); }))
                .subscribe(function (result) {
                if (result.setUiLanguage) {
                    _this.i18nService.setLanguage(result.setUiLanguage);
                    _this.localStorageService.set('uiLanguageCode', result.setUiLanguage);
                }
            });
        };
        AppShellComponent.prototype.logOut = function () {
            var _this = this;
            this.authService.logOut().subscribe(function () {
                var loginUrl = getAppConfig().loginUrl;
                if (loginUrl) {
                    window.location.href = loginUrl;
                }
                else {
                    _this.router.navigate(['/login']);
                }
            });
        };
        return AppShellComponent;
    }());
    AppShellComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-app-shell',
                    template: "<clr-main-container>\n    <clr-header>\n        <div class=\"branding\">\n            <a [routerLink]=\"['/']\"><img src=\"assets/logo-75px.png\" class=\"logo\" /></a>\n        </div>\n        <div class=\"header-nav\"></div>\n        <div class=\"header-actions\">\n            <vdr-channel-switcher *vdrIfMultichannel></vdr-channel-switcher>\n            <vdr-user-menu [userName]=\"userName$ | async\"\n                           [uiLanguage]=\"uiLanguage$ | async\"\n                           [availableLanguages]=\"availableLanguages\"\n                           (selectUiLanguage)=\"selectUiLanguage()\"\n                           (logOut)=\"logOut()\"></vdr-user-menu>\n        </div>\n    </clr-header>\n    <nav class=\"subnav\"><vdr-breadcrumb></vdr-breadcrumb></nav>\n\n    <div class=\"content-container\">\n        <div class=\"content-area\"><router-outlet></router-outlet></div>\n        <vdr-main-nav></vdr-main-nav>\n    </div>\n</clr-main-container>\n",
                    styles: [".branding{min-width:0}.logo{width:60px}@media screen and (min-width:768px){vdr-breadcrumb{margin-left:10.8rem}}.header-actions{align-items:center}.content-area{position:relative}"]
                },] }
    ];
    AppShellComponent.ctorParameters = function () { return [
        { type: AuthService },
        { type: DataService },
        { type: i1$3.Router },
        { type: I18nService },
        { type: ModalService },
        { type: LocalStorageService }
    ]; };

    /**
     * A breadcrumbs component which reads the route config and any route that has a `data.breadcrumb` property will
     * be displayed in the breadcrumb trail.
     *
     * The `breadcrumb` property can be a string or a function. If a function, it will be passed the route's `data`
     * object (which will include all resolved keys) and any route params, and should return a BreadcrumbValue.
     *
     * See the test config to get an idea of allowable configs for breadcrumbs.
     */
    var BreadcrumbComponent = /** @class */ (function () {
        function BreadcrumbComponent(router, route, dataService) {
            var _this = this;
            this.router = router;
            this.route = route;
            this.dataService = dataService;
            this.destroy$ = new rxjs.Subject();
            this.breadcrumbs$ = this.router.events.pipe(operators.filter(function (event) { return event instanceof i1$3.NavigationEnd; }), operators.takeUntil(this.destroy$), operators.startWith(true), operators.switchMap(function () { return _this.generateBreadcrumbs(_this.route.root); }));
        }
        BreadcrumbComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        BreadcrumbComponent.prototype.generateBreadcrumbs = function (rootRoute) {
            var _this = this;
            var breadcrumbParts = this.assembleBreadcrumbParts(rootRoute);
            var breadcrumbObservables$ = breadcrumbParts.map(function (_a) {
                var value$ = _a.value$, path = _a.path;
                return value$.pipe(operators.map(function (value) {
                    if (isBreadcrumbLabelLinkPair(value)) {
                        return {
                            label: value.label,
                            link: _this.normalizeRelativeLinks(value.link, path),
                        };
                    }
                    else if (isBreadcrumbPairArray(value)) {
                        return value.map(function (val) { return ({
                            label: val.label,
                            link: _this.normalizeRelativeLinks(val.link, path),
                        }); });
                    }
                    else {
                        return {
                            label: value,
                            link: '/' + path.join('/'),
                        };
                    }
                }));
            });
            return rxjs.combineLatest(breadcrumbObservables$).pipe(operators.map(function (links) { return lodash.flatten(links); }));
        };
        /**
         * Walks the route definition tree to assemble an array from which the breadcrumbs can be derived.
         */
        BreadcrumbComponent.prototype.assembleBreadcrumbParts = function (rootRoute) {
            var _this = this;
            var breadcrumbParts = [];
            var inferredUrl = '';
            var segmentPaths = [];
            var currentRoute = rootRoute;
            do {
                var childRoutes = currentRoute.children;
                currentRoute = null;
                childRoutes.forEach(function (route) {
                    if (route.outlet === i1$3.PRIMARY_OUTLET) {
                        var routeSnapshot = route.snapshot;
                        var breadcrumbDef = route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb'];
                        segmentPaths.push(routeSnapshot.url.map(function (segment) { return segment.path; }).join('/'));
                        if (breadcrumbDef) {
                            if (isBreadcrumbFunction(breadcrumbDef)) {
                                breadcrumbDef = breadcrumbDef(routeSnapshot.data, routeSnapshot.params, _this.dataService);
                            }
                            var observableValue = isObservable(breadcrumbDef)
                                ? breadcrumbDef
                                : rxjs.of(breadcrumbDef);
                            breadcrumbParts.push({ value$: observableValue, path: segmentPaths.slice() });
                        }
                        currentRoute = route;
                    }
                });
            } while (currentRoute);
            return breadcrumbParts;
        };
        /**
         * Accounts for relative routes in the link array, i.e. arrays whose first element is either:
         * * `./`   - this appends the rest of the link segments to the current active route
         * * `../`  - this removes the last segment of the current active route, and appends the link segments
         *            to the parent route.
         */
        BreadcrumbComponent.prototype.normalizeRelativeLinks = function (link, segmentPaths) {
            var clone = link.slice();
            if (clone[0] === './') {
                clone[0] = segmentPaths.join('/');
            }
            if (clone[0] === '../') {
                clone[0] = segmentPaths.slice(0, -1).join('/');
            }
            return clone.filter(function (segment) { return segment !== ''; });
        };
        return BreadcrumbComponent;
    }());
    BreadcrumbComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-breadcrumb',
                    template: "<nav role=\"navigation\">\n    <ul class=\"breadcrumbs\">\n        <li *ngFor=\"let breadcrumb of (breadcrumbs$ | async); let isLast = last\">\n            <a [routerLink]=\"breadcrumb.link\" *ngIf=\"!isLast\">{{ breadcrumb.label | translate }}</a>\n            <ng-container *ngIf=\"isLast\">{{ breadcrumb.label | translate }}</ng-container>\n        </li>\n    </ul>\n</nav>\n",
                    styles: ["@charset \"UTF-8\";:host{display:block;padding:0 1rem}.breadcrumbs{list-style-type:none}.breadcrumbs li{font-size:16px;display:inline-block;margin-right:10px}.breadcrumbs li:not(:last-child):after{content:\"\u203A\";top:0;color:var(--color-grey-400);margin-left:10px}"]
                },] }
    ];
    BreadcrumbComponent.ctorParameters = function () { return [
        { type: i1$3.Router },
        { type: i1$3.ActivatedRoute },
        { type: DataService }
    ]; };
    function isBreadcrumbFunction(value) {
        return typeof value === 'function';
    }
    function isObservable(value) {
        return value instanceof rxjs.Observable;
    }
    function isBreadcrumbLabelLinkPair(value) {
        return value.hasOwnProperty('label') && value.hasOwnProperty('link');
    }
    function isBreadcrumbPairArray(value) {
        return Array.isArray(value) && isBreadcrumbLabelLinkPair(value[0]);
    }

    var ChannelSwitcherComponent = /** @class */ (function () {
        function ChannelSwitcherComponent(dataService, localStorageService) {
            this.dataService = dataService;
            this.localStorageService = localStorageService;
            this.displayFilterThreshold = 10;
            this.filterControl = new forms.FormControl('');
        }
        ChannelSwitcherComponent.prototype.ngOnInit = function () {
            var channels$ = this.dataService.client.userStatus().mapStream(function (data) { return data.userStatus.channels; });
            var filterTerm$ = this.filterControl.valueChanges.pipe(operators.startWith(''));
            this.channels$ = rxjs.combineLatest(channels$, filterTerm$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), channels = _b[0], filterTerm = _b[1];
                return filterTerm
                    ? channels.filter(function (c) { return c.code.toLocaleLowerCase().includes(filterTerm.toLocaleLowerCase()); })
                    : channels;
            }));
            this.channelCount$ = channels$.pipe(operators.map(function (channels) { return channels.length; }));
            var activeChannel$ = this.dataService.client
                .userStatus()
                .mapStream(function (data) { return data.userStatus.channels.find(function (c) { return c.id === data.userStatus.activeChannelId; }); })
                .pipe(operators.filter(sharedUtils.notNullOrUndefined));
            this.activeChannelCode$ = activeChannel$.pipe(operators.map(function (channel) { return channel.code; }));
        };
        ChannelSwitcherComponent.prototype.setActiveChannel = function (channelId) {
            var _this = this;
            this.dataService.client.setActiveChannel(channelId).subscribe(function (_a) {
                var setActiveChannel = _a.setActiveChannel;
                var activeChannel = setActiveChannel.channels.find(function (c) { return c.id === channelId; });
                if (activeChannel) {
                    _this.localStorageService.set('activeChannelToken', activeChannel.token);
                }
                _this.filterControl.patchValue('');
            });
        };
        return ChannelSwitcherComponent;
    }());
    ChannelSwitcherComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-channel-switcher',
                    template: "<ng-container>\n    <vdr-dropdown>\n        <button class=\"btn btn-link active-channel\" vdrDropdownTrigger>\n            <vdr-channel-badge [channelCode]=\"activeChannelCode$ | async\"></vdr-channel-badge>\n            <span class=\"active-channel\">{{\n                activeChannelCode$ | async | channelCodeToLabel | translate\n            }}</span>\n            <span class=\"trigger\"><clr-icon shape=\"caret down\"></clr-icon></span>\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <input\n                *ngIf=\"((channelCount$ | async) || 0) >= displayFilterThreshold\"\n                [formControl]=\"filterControl\"\n                type=\"text\"\n                class=\"ml2 mr2\"\n                [placeholder]=\"'common.filter' | translate\"\n            />\n            <button\n                *ngFor=\"let channel of channels$ | async\"\n                type=\"button\"\n                vdrDropdownItem\n                (click)=\"setActiveChannel(channel.id)\"\n            >\n                <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n                {{ channel.code | channelCodeToLabel | translate }}\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</ng-container>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;align-items:center;margin:0 .5rem;height:2.5rem}.active-channel{color:var(--color-grey-200)}.active-channel clr-icon{color:#fff}"]
                },] }
    ];
    ChannelSwitcherComponent.ctorParameters = function () { return [
        { type: DataService },
        { type: LocalStorageService }
    ]; };

    /**
     * Returns the location of the server, e.g. "http://localhost:3000"
     */
    function getServerLocation() {
        var _a = getAppConfig(), apiHost = _a.apiHost, apiPort = _a.apiPort, adminApiPath = _a.adminApiPath, tokenMethod = _a.tokenMethod;
        var host = apiHost === 'auto' ? location.protocol + "//" + location.hostname : apiHost;
        var port = apiPort
            ? apiPort === 'auto'
                ? location.port === ''
                    ? ''
                    : ":" + location.port
                : ":" + apiPort
            : '';
        return "" + host + port;
    }

    var HealthCheckService = /** @class */ (function () {
        function HealthCheckService(httpClient) {
            var _this = this;
            this.httpClient = httpClient;
            this.pollingDelayMs = 60 * 1000;
            this._refresh = new rxjs.Subject();
            this.healthCheckEndpoint = getServerLocation() + '/health';
            var refresh$ = this._refresh.pipe(operators.throttleTime(1000));
            var result$ = rxjs.merge(rxjs.timer(0, this.pollingDelayMs), refresh$).pipe(operators.switchMap(function () { return _this.checkHealth(); }), operators.shareReplay(1));
            this.status$ = result$.pipe(operators.map(function (res) { return res.status; }));
            this.details$ = result$.pipe(operators.map(function (res) { return Object.keys(res.details).map(function (key) {
                return { key: key, result: res.details[key] };
            }); }));
            this.lastCheck$ = result$.pipe(operators.map(function (res) { return res.lastChecked; }));
        }
        HealthCheckService.prototype.refresh = function () {
            this._refresh.next();
        };
        HealthCheckService.prototype.checkHealth = function () {
            return this.httpClient.get(this.healthCheckEndpoint).pipe(operators.catchError(function (err) { return rxjs.of(err.error); }), operators.map(function (res) { return (Object.assign(Object.assign({}, res), { lastChecked: new Date() })); }));
        };
        return HealthCheckService;
    }());
    HealthCheckService.ɵprov = i0.ɵɵdefineInjectable({ factory: function HealthCheckService_Factory() { return new HealthCheckService(i0.ɵɵinject(i1$1.HttpClient)); }, token: HealthCheckService, providedIn: "root" });
    HealthCheckService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    HealthCheckService.ctorParameters = function () { return [
        { type: i1$1.HttpClient }
    ]; };

    var JobQueueService = /** @class */ (function () {
        function JobQueueService(dataService) {
            var _this = this;
            this.dataService = dataService;
            this.updateJob$ = new rxjs.Subject();
            this.onCompleteHandlers = new Map();
            this.checkForJobs();
            this.activeJobs$ = this.updateJob$.pipe(operators.scan(function (jobMap, job) { return _this.handleJob(jobMap, job); }, new Map()), operators.map(function (jobMap) { return Array.from(jobMap.values()); }), operators.debounceTime(500), operators.shareReplay(1));
            this.subscription = this.activeJobs$
                .pipe(operators.switchMap(function (jobs) {
                if (jobs.length) {
                    return rxjs.interval(2500).pipe(operators.mapTo(jobs));
                }
                else {
                    return rxjs.of([]);
                }
            }))
                .subscribe(function (jobs) {
                if (jobs.length) {
                    _this.dataService.settings.pollJobs(jobs.map(function (j) { return j.id; })).single$.subscribe(function (data) {
                        data.jobsById.forEach(function (job) {
                            _this.updateJob$.next(job);
                        });
                    });
                }
            });
        }
        JobQueueService.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        /**
         * After a given delay, checks the server for any active jobs.
         */
        JobQueueService.prototype.checkForJobs = function (delay) {
            var _this = this;
            if (delay === void 0) { delay = 1000; }
            rxjs.timer(delay)
                .pipe(operators.switchMap(function () { return _this.dataService.client.userStatus().mapSingle(function (data) { return data.userStatus; }); }), operators.switchMap(function (userStatus) {
                if (userStatus.permissions.includes(exports.Permission.ReadSettings) && userStatus.isLoggedIn) {
                    return _this.dataService.settings.getRunningJobs().single$;
                }
                else {
                    return rxjs.EMPTY;
                }
            }))
                .subscribe(function (data) { return data.jobs.items.forEach(function (job) { return _this.updateJob$.next(job); }); });
        };
        JobQueueService.prototype.addJob = function (jobId, onComplete) {
            var _this = this;
            this.dataService.settings.getJob(jobId).single$.subscribe(function (_a) {
                var job = _a.job;
                if (job) {
                    _this.updateJob$.next(job);
                    if (onComplete) {
                        _this.onCompleteHandlers.set(jobId, onComplete);
                    }
                }
            });
        };
        JobQueueService.prototype.handleJob = function (jobMap, job) {
            switch (job.state) {
                case exports.JobState.RUNNING:
                case exports.JobState.PENDING:
                    jobMap.set(job.id, job);
                    break;
                case exports.JobState.COMPLETED:
                case exports.JobState.FAILED:
                case exports.JobState.CANCELLED:
                    jobMap.delete(job.id);
                    var handler = this.onCompleteHandlers.get(job.id);
                    if (handler) {
                        handler(job);
                        this.onCompleteHandlers.delete(job.id);
                    }
                    break;
            }
            return jobMap;
        };
        return JobQueueService;
    }());
    JobQueueService.ɵprov = i0.ɵɵdefineInjectable({ factory: function JobQueueService_Factory() { return new JobQueueService(i0.ɵɵinject(DataService)); }, token: JobQueueService, providedIn: "root" });
    JobQueueService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    JobQueueService.ctorParameters = function () { return [
        { type: DataService }
    ]; };

    /**
     * @description
     * Add a section to the main nav menu. Providing the `before` argument will
     * move the section before any existing section with the specified id. If
     * omitted (or if the id is not found) the section will be appended to the
     * existing set of sections.
     * This should be used in the NgModule `providers` array of your ui extension module.
     *
     * @example
     * ```TypeScript
     * \@NgModule({
     *   imports: [SharedModule],
     *   providers: [
     *     addNavMenuSection({
     *       id: 'reviews',
     *       label: 'Product Reviews',
     *       routerLink: ['/extensions/reviews'],
     *       icon: 'star',
     *     },
     *     'settings'),
     *   ],
     * })
     * export class MyUiExtensionModule {}
     * ```
     */
    function addNavMenuSection(config, before) {
        return {
            provide: i0.APP_INITIALIZER,
            multi: true,
            useFactory: function (navBuilderService) { return function () {
                navBuilderService.addNavMenuSection(config, before);
            }; },
            deps: [NavBuilderService],
        };
    }
    /**
     * @description
     * Add a menu item to an existing section specified by `sectionId`. The id of the section
     * can be found by inspecting the DOM and finding the `data-section-id` attribute.
     * Providing the `before` argument will move the item before any existing item with the specified id.
     * If omitted (or if the name is not found) the item will be appended to the
     * end of the section.
     *
     * This should be used in the NgModule `providers` array of your ui extension module.
     *
     * @example
     * ```TypeScript
     * \@NgModule({
     *   imports: [SharedModule],
     *   providers: [
     *     addNavMenuItem({
     *       id: 'reports',
     *       label: 'Reports',
     *       items: [{
     *           // ...
     *       }],
     *     },
     *     'marketing'),
     *   ],
     * })
     * export class MyUiExtensionModule {}
     * ```
     */
    function addNavMenuItem(config, sectionId, before) {
        return {
            provide: i0.APP_INITIALIZER,
            multi: true,
            useFactory: function (navBuilderService) { return function () {
                navBuilderService.addNavMenuItem(config, sectionId, before);
            }; },
            deps: [NavBuilderService],
        };
    }
    /**
     * @description
     * Adds a button to the ActionBar at the top right of each list or detail view. The locationId can
     * be determined by inspecting the DOM and finding the <vdr-action-bar> element and its
     * `data-location-id` attribute.
     *
     * This should be used in the NgModule `providers` array of your ui extension module.
     *
     * @example
     * ```TypeScript
     * \@NgModule({
     *   imports: [SharedModule],
     *   providers: [
     *     addActionBarItem({
     *      id: 'print-invoice'
     *      label: 'Print Invoice',
     *      locationId: 'order-detail',
     *      routerLink: ['/extensions/invoicing'],
     *     }),
     *   ],
     * })
     * export class MyUiExtensionModule {}
     * ```
     */
    function addActionBarItem(config) {
        return {
            provide: i0.APP_INITIALIZER,
            multi: true,
            useFactory: function (navBuilderService) { return function () {
                navBuilderService.addActionBarItem(config);
            }; },
            deps: [NavBuilderService],
        };
    }
    /**
     * This service is used to define the contents of configurable menus in the application.
     */
    var NavBuilderService = /** @class */ (function () {
        function NavBuilderService() {
            this.sectionBadges = {};
            this.initialNavMenuConfig$ = new rxjs.BehaviorSubject([]);
            this.addedNavMenuSections = [];
            this.addedNavMenuItems = [];
            this.addedActionBarItems = [];
            this.setupStreams();
        }
        /**
         * Used to define the initial sections and items of the main nav menu.
         */
        NavBuilderService.prototype.defineNavMenuSections = function (config) {
            this.initialNavMenuConfig$.next(config);
        };
        /**
         * Add a section to the main nav menu. Providing the `before` argument will
         * move the section before any existing section with the specified id. If
         * omitted (or if the id is not found) the section will be appended to the
         * existing set of sections.
         *
         * Providing the `id` of an existing section will replace that section.
         */
        NavBuilderService.prototype.addNavMenuSection = function (config, before) {
            this.addedNavMenuSections.push({ config: config, before: before });
        };
        /**
         * Add a menu item to an existing section specified by `sectionId`. The id of the section
         * can be found by inspecting the DOM and finding the `data-section-id` attribute.
         * Providing the `before` argument will move the item before any existing item with the specified id.
         * If omitted (or if the name is not found) the item will be appended to the
         * end of the section.
         *
         * Providing the `id` of an existing item in that section will replace
         * that item.
         */
        NavBuilderService.prototype.addNavMenuItem = function (config, sectionId, before) {
            this.addedNavMenuItems.push({ config: config, sectionId: sectionId, before: before });
        };
        /**
         * Adds a button to the ActionBar at the top right of each list or detail view. The locationId can
         * be determined by inspecting the DOM and finding the <vdr-action-bar> element and its
         * `data-location-id` attribute.
         */
        NavBuilderService.prototype.addActionBarItem = function (config) {
            this.addedActionBarItems.push(Object.assign({ requiresPermission: exports.Permission.Authenticated }, config));
        };
        NavBuilderService.prototype.getRouterLink = function (config, route) {
            if (typeof config.routerLink === 'function') {
                return config.routerLink(route);
            }
            if (Array.isArray(config.routerLink)) {
                return config.routerLink;
            }
            return null;
        };
        NavBuilderService.prototype.setupStreams = function () {
            var _this = this;
            var sectionAdditions$ = rxjs.of(this.addedNavMenuSections);
            var itemAdditions$ = rxjs.of(this.addedNavMenuItems);
            var combinedConfig$ = rxjs.combineLatest(this.initialNavMenuConfig$, sectionAdditions$).pipe(operators.map(function (_a) {
                var e_1, _b;
                var _c = __read(_a, 2), initialConfig = _c[0], additions = _c[1];
                var _loop_1 = function (config, before) {
                    if (!config.requiresPermission) {
                        config.requiresPermission = exports.Permission.Authenticated;
                    }
                    var existingIndex = initialConfig.findIndex(function (c) { return c.id === config.id; });
                    if (-1 < existingIndex) {
                        initialConfig[existingIndex] = config;
                    }
                    var beforeIndex = initialConfig.findIndex(function (c) { return c.id === before; });
                    if (-1 < beforeIndex) {
                        if (-1 < existingIndex) {
                            initialConfig.splice(existingIndex, 1);
                        }
                        initialConfig.splice(beforeIndex, 0, config);
                    }
                    else if (existingIndex === -1) {
                        initialConfig.push(config);
                    }
                };
                try {
                    for (var additions_1 = __values(additions), additions_1_1 = additions_1.next(); !additions_1_1.done; additions_1_1 = additions_1.next()) {
                        var _d = additions_1_1.value, config = _d.config, before = _d.before;
                        _loop_1(config, before);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (additions_1_1 && !additions_1_1.done && (_b = additions_1.return)) _b.call(additions_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return initialConfig;
            }), operators.shareReplay(1));
            this.navMenuConfig$ = rxjs.combineLatest(combinedConfig$, itemAdditions$).pipe(operators.map(function (_a) {
                var e_2, _b, e_3, _c;
                var _d = __read(_a, 2), sections = _d[0], additionalItems = _d[1];
                var _loop_2 = function (item) {
                    var section = sections.find(function (s) { return s.id === item.sectionId; });
                    if (!section) {
                        // tslint:disable-next-line:no-console
                        console.error("Could not add menu item \"" + item.config.id + "\", section \"" + item.sectionId + "\" does not exist");
                    }
                    else {
                        var config_1 = item.config, sectionId = item.sectionId, before_1 = item.before;
                        var existingIndex = section.items.findIndex(function (i) { return i.id === config_1.id; });
                        if (-1 < existingIndex) {
                            section.items[existingIndex] = config_1;
                        }
                        var beforeIndex = section.items.findIndex(function (i) { return i.id === before_1; });
                        if (-1 < beforeIndex) {
                            if (-1 < existingIndex) {
                                section.items.splice(existingIndex, 1);
                            }
                            section.items.splice(beforeIndex, 0, config_1);
                        }
                        else if (existingIndex === -1) {
                            section.items.push(config_1);
                        }
                    }
                };
                try {
                    for (var additionalItems_1 = __values(additionalItems), additionalItems_1_1 = additionalItems_1.next(); !additionalItems_1_1.done; additionalItems_1_1 = additionalItems_1.next()) {
                        var item = additionalItems_1_1.value;
                        _loop_2(item);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (additionalItems_1_1 && !additionalItems_1_1.done && (_b = additionalItems_1.return)) _b.call(additionalItems_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                try {
                    // Aggregate any badges defined for the nav items in each section
                    for (var sections_1 = __values(sections), sections_1_1 = sections_1.next(); !sections_1_1.done; sections_1_1 = sections_1.next()) {
                        var section = sections_1_1.value;
                        var itemBadgeStatuses = section.items
                            .map(function (i) { return i.statusBadge; })
                            .filter(sharedUtils.notNullOrUndefined);
                        _this.sectionBadges[section.id] = rxjs.combineLatest(itemBadgeStatuses).pipe(operators.map(function (badges) {
                            var propagatingBadges = badges.filter(function (b) { return b.propagateToSection; });
                            if (propagatingBadges.length === 0) {
                                return 'none';
                            }
                            var statuses = propagatingBadges.map(function (b) { return b.type; });
                            if (statuses.includes('error')) {
                                return 'error';
                            }
                            else if (statuses.includes('warning')) {
                                return 'warning';
                            }
                            else if (statuses.includes('info')) {
                                return 'info';
                            }
                            else {
                                return 'none';
                            }
                        }));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (sections_1_1 && !sections_1_1.done && (_c = sections_1.return)) _c.call(sections_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return sections;
            }));
            this.actionBarConfig$ = rxjs.of(this.addedActionBarItems);
        };
        return NavBuilderService;
    }());
    NavBuilderService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NavBuilderService_Factory() { return new NavBuilderService(); }, token: NavBuilderService, providedIn: "root" });
    NavBuilderService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    NavBuilderService.ctorParameters = function () { return []; };

    var MainNavComponent = /** @class */ (function () {
        function MainNavComponent(route, router, navBuilderService, healthCheckService, jobQueueService, dataService) {
            this.route = route;
            this.router = router;
            this.navBuilderService = navBuilderService;
            this.healthCheckService = healthCheckService;
            this.jobQueueService = jobQueueService;
            this.dataService = dataService;
        }
        MainNavComponent.prototype.shouldDisplayLink = function (menuItem) {
            if (!this.userPermissions) {
                return false;
            }
            if (!menuItem.requiresPermission) {
                return true;
            }
            if (typeof menuItem.requiresPermission === 'string') {
                return this.userPermissions.includes(menuItem.requiresPermission);
            }
            if (typeof menuItem.requiresPermission === 'function') {
                return menuItem.requiresPermission(this.userPermissions);
            }
        };
        MainNavComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.defineNavMenu();
            this.subscription = this.dataService.client
                .userStatus()
                .mapStream(function (_a) {
                var userStatus = _a.userStatus;
                _this.userPermissions = userStatus.permissions;
            })
                .subscribe();
        };
        MainNavComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        MainNavComponent.prototype.getRouterLink = function (item) {
            return this.navBuilderService.getRouterLink(item, this.route);
        };
        MainNavComponent.prototype.defineNavMenu = function () {
            function allow() {
                var permissions = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    permissions[_i] = arguments[_i];
                }
                return function (userPermissions) {
                    var e_1, _a;
                    try {
                        for (var permissions_1 = __values(permissions), permissions_1_1 = permissions_1.next(); !permissions_1_1.done; permissions_1_1 = permissions_1.next()) {
                            var permission = permissions_1_1.value;
                            if (userPermissions.includes(permission)) {
                                return true;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (permissions_1_1 && !permissions_1_1.done && (_a = permissions_1.return)) _a.call(permissions_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return false;
                };
            }
            this.navBuilderService.defineNavMenuSections([
                {
                    requiresPermission: allow(exports.Permission.ReadCatalog, exports.Permission.ReadProduct, exports.Permission.ReadFacet, exports.Permission.ReadCollection, exports.Permission.ReadAsset),
                    id: 'catalog',
                    label: ngxTranslateExtractMarker.marker('nav.catalog'),
                    items: [
                        {
                            requiresPermission: allow(exports.Permission.ReadCatalog, exports.Permission.ReadProduct),
                            id: 'products',
                            label: ngxTranslateExtractMarker.marker('nav.products'),
                            icon: 'library',
                            routerLink: ['/catalog', 'products'],
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadCatalog, exports.Permission.ReadFacet),
                            id: 'facets',
                            label: ngxTranslateExtractMarker.marker('nav.facets'),
                            icon: 'tag',
                            routerLink: ['/catalog', 'facets'],
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadCatalog, exports.Permission.ReadCollection),
                            id: 'collections',
                            label: ngxTranslateExtractMarker.marker('nav.collections'),
                            icon: 'folder-open',
                            routerLink: ['/catalog', 'collections'],
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadCatalog, exports.Permission.ReadAsset),
                            id: 'assets',
                            label: ngxTranslateExtractMarker.marker('nav.assets'),
                            icon: 'image-gallery',
                            routerLink: ['/catalog', 'assets'],
                        },
                    ],
                },
                {
                    id: 'sales',
                    label: ngxTranslateExtractMarker.marker('nav.sales'),
                    requiresPermission: allow(exports.Permission.ReadOrder),
                    items: [
                        {
                            requiresPermission: allow(exports.Permission.ReadOrder),
                            id: 'orders',
                            label: ngxTranslateExtractMarker.marker('nav.orders'),
                            routerLink: ['/orders'],
                            icon: 'shopping-cart',
                        },
                    ],
                },
                {
                    id: 'customers',
                    label: ngxTranslateExtractMarker.marker('nav.customers'),
                    requiresPermission: allow(exports.Permission.ReadCustomer, exports.Permission.ReadCustomerGroup),
                    items: [
                        {
                            requiresPermission: allow(exports.Permission.ReadCustomer),
                            id: 'customers',
                            label: ngxTranslateExtractMarker.marker('nav.customers'),
                            routerLink: ['/customer', 'customers'],
                            icon: 'user',
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadCustomerGroup),
                            id: 'customer-groups',
                            label: ngxTranslateExtractMarker.marker('nav.customer-groups'),
                            routerLink: ['/customer', 'groups'],
                            icon: 'users',
                        },
                    ],
                },
                {
                    id: 'marketing',
                    label: ngxTranslateExtractMarker.marker('nav.marketing'),
                    requiresPermission: allow(exports.Permission.ReadPromotion),
                    items: [
                        {
                            requiresPermission: allow(exports.Permission.ReadPromotion),
                            id: 'promotions',
                            label: ngxTranslateExtractMarker.marker('nav.promotions'),
                            routerLink: ['/marketing', 'promotions'],
                            icon: 'asterisk',
                        },
                    ],
                },
                {
                    id: 'settings',
                    label: ngxTranslateExtractMarker.marker('nav.settings'),
                    requiresPermission: allow(exports.Permission.ReadSettings, exports.Permission.ReadChannel, exports.Permission.ReadAdministrator, exports.Permission.ReadShippingMethod, exports.Permission.ReadPaymentMethod, exports.Permission.ReadTaxCategory, exports.Permission.ReadTaxRate, exports.Permission.ReadCountry, exports.Permission.ReadZone, exports.Permission.UpdateGlobalSettings),
                    collapsible: true,
                    collapsedByDefault: true,
                    items: [
                        {
                            requiresPermission: allow(exports.Permission.ReadChannel),
                            id: 'channels',
                            label: ngxTranslateExtractMarker.marker('nav.channels'),
                            routerLink: ['/settings', 'channels'],
                            icon: 'layers',
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadAdministrator),
                            id: 'administrators',
                            label: ngxTranslateExtractMarker.marker('nav.administrators'),
                            routerLink: ['/settings', 'administrators'],
                            icon: 'administrator',
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadAdministrator),
                            id: 'roles',
                            label: ngxTranslateExtractMarker.marker('nav.roles'),
                            routerLink: ['/settings', 'roles'],
                            icon: 'users',
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadShippingMethod),
                            id: 'shipping-methods',
                            label: ngxTranslateExtractMarker.marker('nav.shipping-methods'),
                            routerLink: ['/settings', 'shipping-methods'],
                            icon: 'truck',
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadPaymentMethod),
                            id: 'payment-methods',
                            label: ngxTranslateExtractMarker.marker('nav.payment-methods'),
                            routerLink: ['/settings', 'payment-methods'],
                            icon: 'credit-card',
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadTaxCategory),
                            id: 'tax-categories',
                            label: ngxTranslateExtractMarker.marker('nav.tax-categories'),
                            routerLink: ['/settings', 'tax-categories'],
                            icon: 'view-list',
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadTaxRate),
                            id: 'tax-rates',
                            label: ngxTranslateExtractMarker.marker('nav.tax-rates'),
                            routerLink: ['/settings', 'tax-rates'],
                            icon: 'calculator',
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadCountry),
                            id: 'countries',
                            label: ngxTranslateExtractMarker.marker('nav.countries'),
                            routerLink: ['/settings', 'countries'],
                            icon: 'flag',
                        },
                        {
                            requiresPermission: allow(exports.Permission.ReadZone),
                            id: 'zones',
                            label: ngxTranslateExtractMarker.marker('nav.zones'),
                            routerLink: ['/settings', 'zones'],
                            icon: 'world',
                        },
                        {
                            requiresPermission: allow(exports.Permission.UpdateGlobalSettings),
                            id: 'global-settings',
                            label: ngxTranslateExtractMarker.marker('nav.global-settings'),
                            routerLink: ['/settings', 'global-settings'],
                            icon: 'cog',
                        },
                    ],
                },
                {
                    id: 'system',
                    label: ngxTranslateExtractMarker.marker('nav.system'),
                    requiresPermission: exports.Permission.ReadSystem,
                    collapsible: true,
                    collapsedByDefault: true,
                    items: [
                        {
                            id: 'job-queue',
                            label: ngxTranslateExtractMarker.marker('nav.job-queue'),
                            routerLink: ['/system', 'jobs'],
                            icon: 'tick-chart',
                            statusBadge: this.jobQueueService.activeJobs$.pipe(operators.startWith([]), operators.map(function (jobs) { return ({
                                type: jobs.length === 0 ? 'none' : 'info',
                                propagateToSection: jobs.length > 0,
                            }); })),
                        },
                        {
                            id: 'system-status',
                            label: ngxTranslateExtractMarker.marker('nav.system-status'),
                            routerLink: ['/system', 'system-status'],
                            icon: 'rack-server',
                            statusBadge: this.healthCheckService.status$.pipe(operators.map(function (status) { return ({
                                type: status === 'ok' ? 'success' : 'error',
                                propagateToSection: status === 'error',
                            }); })),
                        },
                    ],
                },
            ]);
        };
        return MainNavComponent;
    }());
    MainNavComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-main-nav',
                    template: "<nav class=\"sidenav\" [clr-nav-level]=\"2\">\n    <section class=\"sidenav-content\">\n        <ng-container *ngFor=\"let section of navBuilderService.navMenuConfig$ | async\">\n            <section\n                class=\"nav-group\"\n                [attr.data-section-id]=\"section.id\"\n                [class.collapsible]=\"section.collapsible\"\n                *ngIf=\"shouldDisplayLink(section)\"\n            >\n                <ng-container *ngIf=\"navBuilderService.sectionBadges[section.id] | async as sectionBadge\">\n                    <div *ngIf=\"sectionBadge !== 'none'\" class=\"status-badge\" [class]=\"sectionBadge\"></div>\n                </ng-container>\n                <input [id]=\"section.id\" type=\"checkbox\" [checked]=\"section.collapsedByDefault\" />\n                <label [for]=\"section.id\">{{ section.label | translate }}</label>\n                <ul class=\"nav-list\">\n                    <ng-container *ngFor=\"let item of section.items\">\n                        <li *ngIf=\"shouldDisplayLink(item)\">\n                            <a\n                                class=\"nav-link\"\n                                [attr.data-item-id]=\"section.id\"\n                                [routerLink]=\"getRouterLink(item)\"\n                                routerLinkActive=\"active\"\n                            >\n                                <ng-container *ngIf=\"item.statusBadge | async as itemBadge\">\n                                    <div\n                                        *ngIf=\"itemBadge.type !== 'none'\"\n                                        class=\"status-badge\"\n                                        [class]=\"itemBadge.type\"\n                                    ></div>\n                                </ng-container>\n                                <clr-icon [attr.shape]=\"item.icon || 'block'\" size=\"20\"></clr-icon>\n                                {{ item.label | translate }}\n                            </a>\n                        </li>\n                    </ng-container>\n                </ul>\n            </section>\n        </ng-container>\n    </section>\n</nav>\n",
                    styles: [":host{order:-1;background-color:var(--clr-nav-background-color)}nav.sidenav{height:100%;width:10.8rem;border-right-color:var(--clr-sidenav-border-color)}.nav-list clr-icon{margin-right:12px}.nav-group,.nav-link{position:relative}.status-badge{width:10px;height:10px;position:absolute;border-radius:50%;border:1px solid var(--color-component-border-100)}.status-badge.info{background-color:var(--color-primary-600)}.status-badge.success{background-color:var(--color-success-500)}.status-badge.warning{background-color:var(--color-warning-500)}.status-badge.error{background-color:var(--color-error-400)}.nav-group .status-badge{left:10px;top:6px}.nav-link .status-badge{left:25px;top:3px}"]
                },] }
    ];
    MainNavComponent.ctorParameters = function () { return [
        { type: i1$3.ActivatedRoute },
        { type: i1$3.Router },
        { type: NavBuilderService },
        { type: HealthCheckService },
        { type: JobQueueService },
        { type: DataService }
    ]; };

    var NotificationComponent = /** @class */ (function () {
        function NotificationComponent() {
            this.offsetTop = 0;
            this.message = '';
            this.translationVars = {};
            this.type = 'info';
            this.isVisible = true;
            this.onClickFn = function () {
                /* */
            };
        }
        NotificationComponent.prototype.registerOnClickFn = function (fn) {
            this.onClickFn = fn;
        };
        NotificationComponent.prototype.onClick = function () {
            if (this.isVisible) {
                this.onClickFn();
            }
        };
        /**
         * Fade out the toast. When promise resolves, toast is invisible and
         * can be removed.
         */
        NotificationComponent.prototype.fadeOut = function () {
            this.isVisible = false;
            return new Promise(function (resolve) { return setTimeout(resolve, 1000); });
        };
        /**
         * Returns the height of the toast element in px.
         */
        NotificationComponent.prototype.getHeight = function () {
            if (!this.wrapper) {
                return 0;
            }
            var el = this.wrapper.nativeElement;
            return el.getBoundingClientRect().height;
        };
        NotificationComponent.prototype.getIcon = function () {
            switch (this.type) {
                case 'info':
                    return 'info-circle';
                case 'success':
                    return 'check-circle';
                case 'error':
                    return 'exclamation-circle';
                case 'warning':
                    return 'exclamation-triangle';
            }
        };
        NotificationComponent.prototype.stringifyMessage = function (message) {
            if (typeof message === 'string') {
                return message;
            }
            else {
                return JSON.stringify(message, null, 2);
            }
        };
        return NotificationComponent;
    }());
    NotificationComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-notification',
                    template: "<div\n    class=\"notification-wrapper\"\n    #wrapper\n    [style.top.px]=\"offsetTop\"\n    [ngClass]=\"{\n        visible: isVisible,\n        info: type === 'info',\n        success: type === 'success',\n        error: type === 'error',\n        warning: type === 'warning'\n    }\"\n>\n    <clr-icon [attr.shape]=\"getIcon()\" size=\"24\"></clr-icon>\n    {{ stringifyMessage(message) | translate: translationVars }}\n</div>\n",
                    styles: ["@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:.95}}@keyframes fadeIn{0%{opacity:0}to{opacity:.95}}:host{position:relative;z-index:1050}:host>.notification-wrapper{display:block;position:fixed;z-index:1001;top:0;right:10px;border-radius:3px;max-width:98vw;word-wrap:break-word;padding:10px;background-color:var(--color-grey-500);color:#fff;transition:opacity 1s,top .3s;opacity:0;white-space:pre-line}:host>.notification-wrapper.success{background-color:var(--color-success-500)}:host>.notification-wrapper.error{background-color:var(--color-error-500)}:host>.notification-wrapper.warning{background-color:var(--color-warning-500)}:host>.notification-wrapper.info{background-color:var(--color-secondary-500)}:host>.notification-wrapper.visible{opacity:.95;-webkit-animation:fadeIn .3s .3s backwards;animation:fadeIn .3s .3s backwards}"]
                },] }
    ];
    NotificationComponent.propDecorators = {
        wrapper: [{ type: i0.ViewChild, args: ['wrapper', { static: true },] }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    /**
     * The OverlayHostComponent is a placeholder component which provides a location in the DOM into which overlay
     * elements (modals, notify notifications etc) may be injected dynamically.
     */
    var OverlayHostComponent = /** @class */ (function () {
        function OverlayHostComponent(viewContainerRef, overlayHostService) {
            overlayHostService.registerHostView(viewContainerRef);
        }
        return OverlayHostComponent;
    }());
    OverlayHostComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-overlay-host',
                    template: '<!-- -->'
                },] }
    ];
    OverlayHostComponent.ctorParameters = function () { return [
        { type: i0.ViewContainerRef },
        { type: OverlayHostService }
    ]; };

    var ThemeSwitcherComponent = /** @class */ (function () {
        function ThemeSwitcherComponent(dataService, localStorageService) {
            this.dataService = dataService;
            this.localStorageService = localStorageService;
        }
        ThemeSwitcherComponent.prototype.ngOnInit = function () {
            this.activeTheme$ = this.dataService.client.uiState().mapStream(function (data) { return data.uiState.theme; });
        };
        ThemeSwitcherComponent.prototype.toggleTheme = function (current) {
            var _this = this;
            var newTheme = current === 'default' ? 'dark' : 'default';
            this.dataService.client.setUiTheme(newTheme).subscribe(function () {
                _this.localStorageService.set('activeTheme', newTheme);
            });
        };
        return ThemeSwitcherComponent;
    }());
    ThemeSwitcherComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-theme-switcher',
                    template: "<button *ngIf=\"activeTheme$ | async as activeTheme\" class=\"theme-toggle\" (click)=\"toggleTheme(activeTheme)\">\n    <span>{{ 'common.theme' | translate }}</span>\n    <div class=\"theme-icon default\" [class.active]=\"activeTheme === 'default'\">\n        <clr-icon shape=\"sun\" class=\"is-solid\"></clr-icon>\n    </div>\n    <div class=\"theme-icon dark\" [class.active]=\"activeTheme === 'dark'\">\n        <clr-icon shape=\"moon\" class=\"is-solid\"></clr-icon>\n    </div>\n</button>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:inline-flex;justify-content:center;align-items:center}button.theme-toggle{position:relative;padding-left:20px;border:none;background:transparent;color:var(--clr-dropdown-item-color);cursor:pointer}.theme-icon{position:absolute;top:0;left:6px;z-index:0;opacity:.2;color:var(--color-text-300);transition:opacity .3s,left .3s}.theme-icon.active{z-index:1;left:0;opacity:1}.theme-icon.default.active{color:#d6ae3f}.theme-icon.dark.active{color:#ffdf3a}"]
                },] }
    ];
    ThemeSwitcherComponent.ctorParameters = function () { return [
        { type: DataService },
        { type: LocalStorageService }
    ]; };

    var UserMenuComponent = /** @class */ (function () {
        function UserMenuComponent() {
            this.userName = '';
            this.availableLanguages = [];
            this.logOut = new i0.EventEmitter();
            this.selectUiLanguage = new i0.EventEmitter();
        }
        return UserMenuComponent;
    }());
    UserMenuComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-user-menu',
                    template: "<vdr-dropdown>\n    <button class=\"btn btn-link trigger\" vdrDropdownTrigger>\n        <span class=\"user-name\">{{ userName }}</span>\n        <clr-icon shape=\"user\" size=\"24\"></clr-icon>\n        <clr-icon shape=\"caret down\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n        <a [routerLink]=\"['/settings', 'profile']\" vdrDropdownItem>\n            <clr-icon shape=\"user\" class=\"is-solid\"></clr-icon> {{ 'settings.profile' | translate }}\n        </a>\n        <ng-container *ngIf=\"1 < availableLanguages.length\">\n            <button\n                type=\"button\"\n                vdrDropdownItem\n                (click)=\"selectUiLanguage.emit()\"\n                [title]=\"'common.select-display-language' | translate\"\n            >\n                <clr-icon shape=\"language\"></clr-icon> {{ 'lang.' + uiLanguage | translate }}\n            </button>\n        </ng-container>\n        <div class=\"dropdown-item\">\n            <vdr-theme-switcher></vdr-theme-switcher>\n        </div>\n        <div class=\"dropdown-divider\"></div>\n        <button type=\"button\" vdrDropdownItem (click)=\"logOut.emit()\">\n            <clr-icon shape=\"logout\"></clr-icon> {{ 'common.log-out' | translate }}\n        </button>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                    styles: [":host{display:flex;align-items:center;margin:0 .5rem;height:2.5rem}.user-name{color:var(--color-grey-200);margin-right:12px}@media screen and (max-width:768px){.user-name{display:none}}.trigger clr-icon{color:#fff}"]
                },] }
    ];
    UserMenuComponent.propDecorators = {
        userName: [{ type: i0.Input }],
        availableLanguages: [{ type: i0.Input }],
        uiLanguage: [{ type: i0.Input }],
        logOut: [{ type: i0.Output }],
        selectUiLanguage: [{ type: i0.Output }]
    };

    // tslint:disable
    var result = {
        "possibleTypes": {
            "CreateAssetResult": [
                "Asset",
                "MimeTypeError"
            ],
            "NativeAuthenticationResult": [
                "CurrentUser",
                "InvalidCredentialsError",
                "NativeAuthStrategyError"
            ],
            "AuthenticationResult": [
                "CurrentUser",
                "InvalidCredentialsError"
            ],
            "CreateChannelResult": [
                "Channel",
                "LanguageNotAvailableError"
            ],
            "UpdateChannelResult": [
                "Channel",
                "LanguageNotAvailableError"
            ],
            "CreateCustomerResult": [
                "Customer",
                "EmailAddressConflictError"
            ],
            "UpdateCustomerResult": [
                "Customer",
                "EmailAddressConflictError"
            ],
            "UpdateGlobalSettingsResult": [
                "GlobalSettings",
                "ChannelDefaultLanguageError"
            ],
            "TransitionOrderToStateResult": [
                "Order",
                "OrderStateTransitionError"
            ],
            "SettlePaymentResult": [
                "Payment",
                "SettlePaymentError",
                "PaymentStateTransitionError",
                "OrderStateTransitionError"
            ],
            "AddFulfillmentToOrderResult": [
                "Fulfillment",
                "EmptyOrderLineSelectionError",
                "ItemsAlreadyFulfilledError",
                "InsufficientStockOnHandError",
                "InvalidFulfillmentHandlerError",
                "FulfillmentStateTransitionError",
                "CreateFulfillmentError"
            ],
            "CancelOrderResult": [
                "Order",
                "EmptyOrderLineSelectionError",
                "QuantityTooGreatError",
                "MultipleOrderError",
                "CancelActiveOrderError",
                "OrderStateTransitionError"
            ],
            "RefundOrderResult": [
                "Refund",
                "QuantityTooGreatError",
                "NothingToRefundError",
                "OrderStateTransitionError",
                "MultipleOrderError",
                "PaymentOrderMismatchError",
                "RefundOrderStateError",
                "AlreadyRefundedError",
                "RefundStateTransitionError"
            ],
            "SettleRefundResult": [
                "Refund",
                "RefundStateTransitionError"
            ],
            "TransitionFulfillmentToStateResult": [
                "Fulfillment",
                "FulfillmentStateTransitionError"
            ],
            "TransitionPaymentToStateResult": [
                "Payment",
                "PaymentStateTransitionError"
            ],
            "ModifyOrderResult": [
                "Order",
                "NoChangesSpecifiedError",
                "OrderModificationStateError",
                "PaymentMethodMissingError",
                "RefundPaymentIdMissingError",
                "OrderLimitError",
                "NegativeQuantityError",
                "InsufficientStockError"
            ],
            "AddManualPaymentToOrderResult": [
                "Order",
                "ManualPaymentStateError"
            ],
            "RemoveOptionGroupFromProductResult": [
                "Product",
                "ProductOptionInUseError"
            ],
            "CreatePromotionResult": [
                "Promotion",
                "MissingConditionsError"
            ],
            "UpdatePromotionResult": [
                "Promotion",
                "MissingConditionsError"
            ],
            "StockMovement": [
                "StockAdjustment",
                "Allocation",
                "Sale",
                "Cancellation",
                "Return",
                "Release"
            ],
            "StockMovementItem": [
                "StockAdjustment",
                "Allocation",
                "Sale",
                "Cancellation",
                "Return",
                "Release"
            ],
            "PaginatedList": [
                "AdministratorList",
                "CustomerGroupList",
                "JobList",
                "PaymentMethodList",
                "AssetList",
                "CollectionList",
                "ProductVariantList",
                "CountryList",
                "CustomerList",
                "FacetList",
                "HistoryEntryList",
                "OrderList",
                "ProductList",
                "PromotionList",
                "RoleList",
                "ShippingMethodList",
                "TagList",
                "TaxRateList"
            ],
            "Node": [
                "Administrator",
                "Asset",
                "Collection",
                "Customer",
                "Facet",
                "HistoryEntry",
                "Job",
                "Order",
                "Fulfillment",
                "Payment",
                "OrderModification",
                "PaymentMethod",
                "Product",
                "ProductVariant",
                "StockAdjustment",
                "Allocation",
                "Sale",
                "Cancellation",
                "Return",
                "Release",
                "Address",
                "Channel",
                "Country",
                "CustomerGroup",
                "FacetValue",
                "OrderItem",
                "OrderLine",
                "Refund",
                "Surcharge",
                "ProductOptionGroup",
                "ProductOption",
                "Promotion",
                "Role",
                "ShippingMethod",
                "Tag",
                "TaxCategory",
                "TaxRate",
                "User",
                "AuthenticationMethod",
                "Zone"
            ],
            "ErrorResult": [
                "MimeTypeError",
                "LanguageNotAvailableError",
                "ChannelDefaultLanguageError",
                "SettlePaymentError",
                "EmptyOrderLineSelectionError",
                "ItemsAlreadyFulfilledError",
                "InvalidFulfillmentHandlerError",
                "CreateFulfillmentError",
                "InsufficientStockOnHandError",
                "MultipleOrderError",
                "CancelActiveOrderError",
                "PaymentOrderMismatchError",
                "RefundOrderStateError",
                "NothingToRefundError",
                "AlreadyRefundedError",
                "QuantityTooGreatError",
                "RefundStateTransitionError",
                "PaymentStateTransitionError",
                "FulfillmentStateTransitionError",
                "OrderModificationStateError",
                "NoChangesSpecifiedError",
                "PaymentMethodMissingError",
                "RefundPaymentIdMissingError",
                "ManualPaymentStateError",
                "ProductOptionInUseError",
                "MissingConditionsError",
                "NativeAuthStrategyError",
                "InvalidCredentialsError",
                "OrderStateTransitionError",
                "EmailAddressConflictError",
                "OrderLimitError",
                "NegativeQuantityError",
                "InsufficientStockError"
            ],
            "CustomField": [
                "StringCustomFieldConfig",
                "LocaleStringCustomFieldConfig",
                "IntCustomFieldConfig",
                "FloatCustomFieldConfig",
                "BooleanCustomFieldConfig",
                "DateTimeCustomFieldConfig",
                "RelationCustomFieldConfig"
            ],
            "CustomFieldConfig": [
                "StringCustomFieldConfig",
                "LocaleStringCustomFieldConfig",
                "IntCustomFieldConfig",
                "FloatCustomFieldConfig",
                "BooleanCustomFieldConfig",
                "DateTimeCustomFieldConfig",
                "RelationCustomFieldConfig"
            ],
            "SearchResultPrice": [
                "PriceRange",
                "SinglePrice"
            ]
        }
    };

    // Allows the introspectionResult to be imported as a named symbol

    /**
     * This link checks each operation and if it is a mutation, it tells the JobQueueService
     * to poll for active jobs. This is because certain mutations trigger background jobs
     * which should be made known in the UI.
     */
    var CheckJobsLink = /** @class */ (function (_super) {
        __extends(CheckJobsLink, _super);
        /**
         * We inject the Injector rather than the JobQueueService directly in order
         * to avoid a circular dependency error.
         */
        function CheckJobsLink(injector) {
            var _this = _super.call(this, function (operation, forward) {
                if (_this.isMutation(operation)) {
                    _this.jobQueueService.checkForJobs();
                }
                return forward ? forward(operation) : null;
            }) || this;
            _this.injector = injector;
            return _this;
        }
        Object.defineProperty(CheckJobsLink.prototype, "jobQueueService", {
            get: function () {
                if (!this._jobQueueService) {
                    this._jobQueueService = this.injector.get(JobQueueService);
                }
                return this._jobQueueService;
            },
            enumerable: false,
            configurable: true
        });
        CheckJobsLink.prototype.isMutation = function (operation) {
            return !!operation.query.definitions.find(function (d) { return d.kind === 'OperationDefinition' && d.operation === 'mutation'; });
        };
        return CheckJobsLink;
    }(core.ApolloLink));

    function getClientDefaults(localStorageService) {
        var currentLanguage = localStorageService.get('uiLanguageCode') || getDefaultUiLanguage();
        var activeTheme = localStorageService.get('activeTheme') || 'default';
        return {
            networkStatus: {
                inFlightRequests: 0,
                __typename: 'NetworkStatus',
            },
            userStatus: {
                username: '',
                isLoggedIn: false,
                loginTime: '',
                activeChannelId: null,
                permissions: [],
                channels: [],
                __typename: 'UserStatus',
            },
            uiState: {
                language: currentLanguage,
                theme: activeTheme,
                __typename: 'UiState',
            },
        };
    }

    var ɵ0$2 = function (_, args, _a) {
        var cache = _a.cache;
        return updateRequestsInFlight(cache, 1);
    }, ɵ1 = function (_, args, _a) {
        var cache = _a.cache;
        return updateRequestsInFlight(cache, -1);
    }, ɵ2 = function (_, args, _a) {
        var cache = _a.cache;
        var _b = args.input, username = _b.username, loginTime = _b.loginTime, channels = _b.channels, activeChannelId = _b.activeChannelId;
        // tslint:disable-next-line:no-non-null-assertion
        var permissions = channels.find(function (c) { return c.id === activeChannelId; }).permissions;
        var data = {
            userStatus: {
                __typename: 'UserStatus',
                username: username,
                loginTime: loginTime,
                isLoggedIn: true,
                permissions: permissions,
                channels: channels,
                activeChannelId: activeChannelId,
            },
        };
        cache.writeQuery({ query: GET_USER_STATUS, data: data });
        return data.userStatus;
    }, ɵ3 = function (_, args, _a) {
        var cache = _a.cache;
        var data = {
            userStatus: {
                __typename: 'UserStatus',
                username: '',
                loginTime: '',
                isLoggedIn: false,
                permissions: [],
                channels: [],
                activeChannelId: null,
            },
        };
        cache.writeQuery({ query: GET_USER_STATUS, data: data });
        return data.userStatus;
    }, ɵ4 = function (_, args, _a) {
        var cache = _a.cache;
        // tslint:disable-next-line:no-non-null-assertion
        var previous = cache.readQuery({ query: GET_UI_STATE });
        var data = {
            uiState: {
                __typename: 'UiState',
                language: args.languageCode,
                theme: previous.uiState.theme,
            },
        };
        cache.writeQuery({ query: GET_UI_STATE, data: data });
        return args.languageCode;
    }, ɵ5 = function (_, args, _a) {
        var cache = _a.cache;
        // tslint:disable-next-line:no-non-null-assertion
        var previous = cache.readQuery({ query: GET_UI_STATE });
        var data = {
            uiState: {
                __typename: 'UiState',
                language: previous.uiState.language,
                theme: args.theme,
            },
        };
        cache.writeQuery({ query: GET_UI_STATE, data: data });
        return args.theme;
    }, ɵ6 = function (_, args, _a) {
        var cache = _a.cache;
        // tslint:disable-next-line:no-non-null-assertion
        var previous = cache.readQuery({ query: GET_USER_STATUS });
        var activeChannel = previous.userStatus.channels.find(function (c) { return c.id === args.channelId; });
        if (!activeChannel) {
            throw new Error('setActiveChannel: Could not find Channel with ID ' + args.channelId);
        }
        var permissions = activeChannel.permissions;
        var data = {
            userStatus: Object.assign(Object.assign({}, previous.userStatus), { permissions: permissions, activeChannelId: activeChannel.id }),
        };
        cache.writeQuery({ query: GET_USER_STATUS, data: data });
        return data.userStatus;
    }, ɵ7 = function (_, args, _a) {
        var cache = _a.cache;
        // tslint:disable-next-line:no-non-null-assertion
        var previous = cache.readQuery({ query: GET_USER_STATUS });
        var data = {
            userStatus: Object.assign(Object.assign({}, previous.userStatus), { channels: Array.isArray(args.channels) ? args.channels : [args.channels] }),
        };
        cache.writeQuery({ query: GET_USER_STATUS, data: data });
        return data.userStatus;
    };
    var clientResolvers = {
        Mutation: {
            requestStarted: ɵ0$2,
            requestCompleted: ɵ1,
            setAsLoggedIn: ɵ2,
            setAsLoggedOut: ɵ3,
            setUiLanguage: ɵ4,
            setUiTheme: ɵ5,
            setActiveChannel: ɵ6,
            updateUserChannels: ɵ7,
        },
    };
    function updateRequestsInFlight(cache, increment) {
        var previous = cache.readQuery({ query: GET_NEWTORK_STATUS });
        var inFlightRequests = previous ? previous.networkStatus.inFlightRequests + increment : increment;
        var data = {
            networkStatus: {
                __typename: 'NetworkStatus',
                inFlightRequests: inFlightRequests,
            },
        };
        cache.writeQuery({ query: GET_NEWTORK_STATUS, data: data });
        return inFlightRequests;
    }

    /**
     * The "__typename" property added by Apollo Client causes errors when posting the entity
     * back in a mutation. Therefore this link will remove all such keys before the object
     * reaches the API layer.
     *
     * See: https://github.com/apollographql/apollo-client/issues/1913#issuecomment-393721604
     */
    var OmitTypenameLink = /** @class */ (function (_super) {
        __extends(OmitTypenameLink, _super);
        function OmitTypenameLink() {
            return _super.call(this, function (operation, forward) {
                if (operation.variables) {
                    operation.variables = omit.omit(operation.variables, ['__typename'], true);
                }
                return forward ? forward(operation) : null;
            }) || this;
        }
        return OmitTypenameLink;
    }(core.ApolloLink));

    /**
     * An adapter that allows the Angular HttpClient to be used as a replacement for the global `fetch` function.
     * This is used to supply a custom fetch function to the apollo-upload-client whilst also allowing the
     * use of Angular's http infrastructure such as interceptors.
     */
    var FetchAdapter = /** @class */ (function () {
        function FetchAdapter(httpClient) {
            var _this = this;
            this.httpClient = httpClient;
            this.fetch = function (input, init) {
                var url = typeof input === 'string' ? input : input.url;
                var method = typeof input === 'string' ? (init.method ? init.method : 'GET') : input.method;
                return _this.httpClient
                    .request(method, url, {
                    body: init.body,
                    headers: init.headers,
                    observe: 'response',
                    responseType: 'json',
                    withCredentials: true,
                })
                    .toPromise()
                    .then(function (result) {
                    return new Response(JSON.stringify(result.body), {
                        status: result.status,
                        statusText: result.statusText,
                    });
                });
            };
        }
        return FetchAdapter;
    }());
    FetchAdapter.decorators = [
        { type: i0.Injectable }
    ];
    FetchAdapter.ctorParameters = function () { return [
        { type: i1$1.HttpClient }
    ]; };

    // How many ms before the toast is dismissed.
    var TOAST_DURATION = 3000;
    /**
     * Provides toast notification functionality.
     */
    var NotificationService = /** @class */ (function () {
        function NotificationService(i18nService, resolver, overlayHostService) {
            this.i18nService = i18nService;
            this.resolver = resolver;
            this.overlayHostService = overlayHostService;
            this.openToastRefs = [];
        }
        Object.defineProperty(NotificationService.prototype, "hostView", {
            get: function () {
                return this.overlayHostService.getHostView();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Display a success toast notification
         */
        NotificationService.prototype.success = function (message, translationVars) {
            this.notify({
                message: message,
                translationVars: translationVars,
                type: 'success',
            });
        };
        /**
         * Display an info toast notification
         */
        NotificationService.prototype.info = function (message, translationVars) {
            this.notify({
                message: message,
                translationVars: translationVars,
                type: 'info',
            });
        };
        /**
         * Display a warning toast notification
         */
        NotificationService.prototype.warning = function (message, translationVars) {
            this.notify({
                message: message,
                translationVars: translationVars,
                type: 'warning',
            });
        };
        /**
         * Display an error toast notification
         */
        NotificationService.prototype.error = function (message, translationVars) {
            this.notify({
                message: message,
                translationVars: translationVars,
                type: 'error',
                duration: 20000,
            });
        };
        /**
         * Display a toast notification.
         */
        NotificationService.prototype.notify = function (config) {
            this.createToast(config);
        };
        /**
         * Load a ToastComponent into the DOM host location.
         */
        NotificationService.prototype.createToast = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var toastFactory, hostView, ref, toast, dismissFn, timerId;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            toastFactory = this.resolver.resolveComponentFactory(NotificationComponent);
                            return [4 /*yield*/, this.hostView];
                        case 1:
                            hostView = _a.sent();
                            ref = hostView.createComponent(toastFactory);
                            toast = ref.instance;
                            dismissFn = this.createDismissFunction(ref);
                            toast.type = config.type || 'info';
                            toast.message = config.message;
                            toast.translationVars = this.translateTranslationVars(config.translationVars || {});
                            toast.registerOnClickFn(dismissFn);
                            if (!config.duration || 0 < config.duration) {
                                timerId = setTimeout(dismissFn, config.duration || TOAST_DURATION);
                            }
                            this.openToastRefs.unshift({ ref: ref, timerId: timerId });
                            setTimeout(function () { return _this.calculatePositions(); });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Returns a function which will destroy the toast component and
         * remove it from the openToastRefs array.
         */
        NotificationService.prototype.createDismissFunction = function (ref) {
            var _this = this;
            return function () {
                var toast = ref.instance;
                var index = _this.openToastRefs.map(function (o) { return o.ref; }).indexOf(ref);
                if (_this.openToastRefs[index]) {
                    clearTimeout(_this.openToastRefs[index].timerId);
                }
                toast.fadeOut().then(function () {
                    ref.destroy();
                    _this.openToastRefs.splice(index, 1);
                    _this.calculatePositions();
                });
            };
        };
        /**
         * Calculate and set the top offsets for each of the open toasts.
         */
        NotificationService.prototype.calculatePositions = function () {
            var cumulativeHeight = 10;
            this.openToastRefs.forEach(function (obj) {
                var toast = obj.ref.instance;
                toast.offsetTop = cumulativeHeight;
                cumulativeHeight += toast.getHeight() + 6;
            });
        };
        NotificationService.prototype.translateTranslationVars = function (translationVars) {
            var e_1, _a;
            try {
                for (var _b = __values(Object.entries(translationVars)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], val = _d[1];
                    if (typeof val === 'string') {
                        translationVars[key] = this.i18nService.translate(val);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return translationVars;
        };
        return NotificationService;
    }());
    NotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NotificationService_Factory() { return new NotificationService(i0.ɵɵinject(I18nService), i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(OverlayHostService)); }, token: NotificationService, providedIn: "root" });
    NotificationService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    NotificationService.ctorParameters = function () { return [
        { type: I18nService },
        { type: i0.ComponentFactoryResolver },
        { type: OverlayHostService }
    ]; };

    var AUTH_REDIRECT_PARAM = 'redirectTo';
    /**
     * The default interceptor examines all HTTP requests & responses and automatically updates the requesting state
     * and shows error notifications.
     */
    var DefaultInterceptor = /** @class */ (function () {
        function DefaultInterceptor(dataService, injector, authService, router, localStorageService) {
            this.dataService = dataService;
            this.injector = injector;
            this.authService = authService;
            this.router = router;
            this.localStorageService = localStorageService;
            this.tokenMethod = 'cookie';
            this.tokenMethod = getAppConfig().tokenMethod;
            this.authTokenHeaderKey = getAppConfig().authTokenHeaderKey || sharedConstants.DEFAULT_AUTH_TOKEN_HEADER_KEY;
        }
        DefaultInterceptor.prototype.intercept = function (req, next) {
            var _this = this;
            this.dataService.client.startRequest().subscribe();
            return next.handle(req).pipe(operators.tap(function (event) {
                if (event instanceof i1$1.HttpResponse) {
                    _this.checkForAuthToken(event);
                    _this.notifyOnError(event);
                    _this.dataService.client.completeRequest().subscribe();
                }
            }, function (err) {
                if (err instanceof i1$1.HttpErrorResponse) {
                    _this.notifyOnError(err);
                    _this.dataService.client.completeRequest().subscribe();
                }
                else {
                    _this.displayErrorNotification(err.message);
                }
            }));
        };
        DefaultInterceptor.prototype.notifyOnError = function (response) {
            var _this = this;
            var _a, _b, _c;
            if (response instanceof i1$1.HttpErrorResponse) {
                if (response.status === 0) {
                    var _d = getAppConfig(), apiHost = _d.apiHost, apiPort = _d.apiPort;
                    this.displayErrorNotification(ngxTranslateExtractMarker.marker("error.could-not-connect-to-server"), {
                        url: apiHost + ":" + apiPort,
                    });
                }
                else if (response.status === 503 && ((_a = response.url) === null || _a === void 0 ? void 0 : _a.endsWith('/health'))) {
                    this.displayErrorNotification(ngxTranslateExtractMarker.marker("error.health-check-failed"));
                }
                else {
                    this.displayErrorNotification(this.extractErrorFromHttpResponse(response));
                }
            }
            else {
                // GraphQL errors still return 200 OK responses, but have the actual error message
                // inside the body of the response.
                var graqhQLErrors_1 = response.body.errors;
                if (graqhQLErrors_1 && Array.isArray(graqhQLErrors_1)) {
                    var firstCode = (_c = (_b = graqhQLErrors_1[0]) === null || _b === void 0 ? void 0 : _b.extensions) === null || _c === void 0 ? void 0 : _c.code;
                    if (firstCode === 'FORBIDDEN') {
                        this.authService.logOut().subscribe(function () {
                            var _d;
                            if (!window.location.pathname.includes('login')) {
                                var path = graqhQLErrors_1[0].path.join(' > ');
                                _this.displayErrorNotification(ngxTranslateExtractMarker.marker("error.403-forbidden"), { path: path });
                            }
                            _this.router.navigate(['/login'], {
                                queryParams: (_d = {},
                                    _d[AUTH_REDIRECT_PARAM] = btoa(_this.router.url),
                                    _d),
                            });
                        });
                    }
                    else if (firstCode === 'CHANNEL_NOT_FOUND') {
                        var message = graqhQLErrors_1.map(function (err) { return err.message; }).join('\n');
                        this.displayErrorNotification(message);
                        this.localStorageService.remove('activeChannelToken');
                    }
                    else {
                        var message = graqhQLErrors_1.map(function (err) { return err.message; }).join('\n');
                        this.displayErrorNotification(message);
                    }
                }
            }
        };
        DefaultInterceptor.prototype.extractErrorFromHttpResponse = function (response) {
            var errors = response.error.errors;
            if (Array.isArray(errors)) {
                return errors.map(function (e) { return e.message; }).join('\n');
            }
            else {
                return response.message;
            }
        };
        /**
         * We need to lazily inject the NotificationService since it depends on the I18nService which
         * eventually depends on the HttpClient (used to load messages from json files). If we were to
         * directly inject NotificationService into the constructor, we get a cyclic dependency.
         */
        DefaultInterceptor.prototype.displayErrorNotification = function (message, vars) {
            var notificationService = this.injector.get(NotificationService);
            notificationService.error(message, vars);
        };
        /**
         * If the server is configured to use the "bearer" tokenMethod, each response should be checked
         * for the existence of an auth token.
         */
        DefaultInterceptor.prototype.checkForAuthToken = function (response) {
            if (this.tokenMethod === 'bearer') {
                var authToken = response.headers.get(this.authTokenHeaderKey);
                if (authToken) {
                    this.localStorageService.set('authToken', authToken);
                }
            }
        };
        return DefaultInterceptor;
    }());
    DefaultInterceptor.decorators = [
        { type: i0.Injectable }
    ];
    DefaultInterceptor.ctorParameters = function () { return [
        { type: DataService },
        { type: i0.Injector },
        { type: AuthService },
        { type: i1$3.Router },
        { type: LocalStorageService }
    ]; };

    function createApollo(localStorageService, fetchAdapter, injector) {
        var _a = getAppConfig(), adminApiPath = _a.adminApiPath, tokenMethod = _a.tokenMethod;
        var serverLocation = getServerLocation();
        var apolloCache = new core.InMemoryCache({
            possibleTypes: result.possibleTypes,
            typePolicies: {
                GlobalSettings: {
                    fields: {
                        serverConfig: {
                            merge: function (existing, incoming) { return (Object.assign(Object.assign({}, existing), incoming)); },
                        },
                    },
                },
            },
        });
        apolloCache.writeQuery({
            query: GET_CLIENT_STATE,
            data: getClientDefaults(localStorageService),
        });
        if (!false) {
            // TODO: enable only for dev mode
            // make the Apollo Cache inspectable in the console for debug purposes
            window['apolloCache'] = apolloCache;
        }
        return {
            link: core$1.ApolloLink.from([
                new OmitTypenameLink(),
                new CheckJobsLink(injector),
                context.setContext(function () {
                    var headers = {};
                    var channelToken = localStorageService.get('activeChannelToken');
                    if (channelToken) {
                        headers['vendure-token'] = channelToken;
                    }
                    if (tokenMethod === 'bearer') {
                        var authToken = localStorageService.get('authToken');
                        if (authToken) {
                            headers.authorization = "Bearer " + authToken;
                        }
                    }
                    return { headers: headers };
                }),
                apolloUploadClient.createUploadLink({
                    uri: serverLocation + "/" + adminApiPath,
                    fetch: fetchAdapter.fetch,
                }),
            ]),
            cache: apolloCache,
            resolvers: clientResolvers,
        };
    }
    var ɵ0$1 = initializeServerConfigService;
    /**
     * The DataModule is responsible for all API calls *and* serves as the source of truth for global app
     * state via the apollo-link-state package.
     */
    var DataModule = /** @class */ (function () {
        function DataModule() {
        }
        return DataModule;
    }());
    DataModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i1$1.HttpClientModule],
                    exports: [],
                    declarations: [],
                    providers: [
                        BaseDataService,
                        DataService,
                        FetchAdapter,
                        ServerConfigService,
                        {
                            provide: apolloAngular.APOLLO_OPTIONS,
                            useFactory: createApollo,
                            deps: [LocalStorageService, FetchAdapter, i0.Injector],
                        },
                        { provide: i1$1.HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
                        {
                            provide: i0.APP_INITIALIZER,
                            multi: true,
                            useFactory: ɵ0$1,
                            deps: [ServerConfigService],
                        },
                    ],
                },] }
    ];

    /**
     * A loader for ngx-translate which extends the HttpLoader functionality by stripping out any
     * values which are empty strings. This means that during development, translation keys which have
     * been extracted but not yet defined will fall back to the raw key text rather than displaying nothing.
     *
     * Originally from https://github.com/ngx-translate/core/issues/662#issuecomment-377010232
     */
    var CustomHttpTranslationLoader = /** @class */ (function () {
        function CustomHttpTranslationLoader(http, prefix, suffix) {
            if (prefix === void 0) { prefix = '/assets/i18n/'; }
            if (suffix === void 0) { suffix = '.json'; }
            this.http = http;
            this.prefix = prefix;
            this.suffix = suffix;
        }
        CustomHttpTranslationLoader.prototype.getTranslation = function (lang) {
            var _this = this;
            return this.http
                .get("" + this.prefix + lang + this.suffix)
                .pipe(operators.map(function (res) { return _this.process(res); }));
        };
        CustomHttpTranslationLoader.prototype.process = function (object) {
            var newObject = {};
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    var value = object[key];
                    if (typeof value !== 'string') {
                        newObject[key] = this.process(value);
                    }
                    else if (typeof value === 'string' && value === '') {
                        // do not copy empty strings
                    }
                    else {
                        newObject[key] = object[key];
                    }
                }
            }
            return newObject;
        };
        return CustomHttpTranslationLoader;
    }());

    /**
     * Work-around for Angular 9 compat.
     * See https://github.com/lephyrus/ngx-translate-messageformat-compiler/issues/53#issuecomment-583677994
     *
     * Also logs errors which would otherwise get swallowed by ngx-translate. This is important
     * because it is quite easy to make errors in messageformat syntax, and without clear
     * error messages it's very hard to debug.
     */
    var InjectableTranslateMessageFormatCompiler = /** @class */ (function (_super) {
        __extends(InjectableTranslateMessageFormatCompiler, _super);
        function InjectableTranslateMessageFormatCompiler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InjectableTranslateMessageFormatCompiler.prototype.compileTranslations = function (value, lang) {
            try {
                return _super.prototype.compileTranslations.call(this, value, lang);
            }
            catch (e) {
                console.error("There was an error with the " + lang + " translations:");
                console.log(e);
                console.log("Check the messageformat docs: https://messageformat.github.io/messageformat/page-guide");
            }
        };
        return InjectableTranslateMessageFormatCompiler;
    }(i1$4.TranslateMessageFormatCompiler));
    InjectableTranslateMessageFormatCompiler.ɵprov = i0.ɵɵdefineInjectable({ factory: function InjectableTranslateMessageFormatCompiler_Factory() { return new InjectableTranslateMessageFormatCompiler(i0.ɵɵinject(i1$4.MESSAGE_FORMAT_CONFIG, 8)); }, token: InjectableTranslateMessageFormatCompiler, providedIn: "root" });
    InjectableTranslateMessageFormatCompiler.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    var ComponentRegistryService = /** @class */ (function () {
        function ComponentRegistryService() {
            this.inputComponentMap = new Map();
        }
        ComponentRegistryService.prototype.registerInputComponent = function (id, component) {
            if (this.inputComponentMap.has(id)) {
                throw new Error("Cannot register an InputComponent with the id \"" + id + "\", as one with that id already exists");
            }
            this.inputComponentMap.set(id, component);
        };
        ComponentRegistryService.prototype.getInputComponent = function (id) {
            return this.inputComponentMap.get(id);
        };
        return ComponentRegistryService;
    }());
    ComponentRegistryService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ComponentRegistryService_Factory() { return new ComponentRegistryService(); }, token: ComponentRegistryService, providedIn: "root" });
    ComponentRegistryService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    /**
     * This service allows the registration of custom controls for customFields.
     */
    var CustomFieldComponentService = /** @class */ (function () {
        function CustomFieldComponentService(componentFactoryResolver, componentRegistryService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.componentRegistryService = componentRegistryService;
        }
        /**
         * Register a CustomFieldControl component to be used with the specified customField and entity.
         */
        CustomFieldComponentService.prototype.registerCustomFieldComponent = function (entity, fieldName, component) {
            var id = this.generateId(entity, fieldName, true);
            this.componentRegistryService.registerInputComponent(id, component);
        };
        /**
         * Checks whether a custom component is registered for the given entity custom field,
         * and if so returns the ID of that component.
         */
        CustomFieldComponentService.prototype.customFieldComponentExists = function (entity, fieldName) {
            var id = this.generateId(entity, fieldName, true);
            return this.componentRegistryService.getInputComponent(id) ? id : undefined;
        };
        CustomFieldComponentService.prototype.generateId = function (entity, fieldName, isCustomField) {
            var id = entity;
            if (isCustomField) {
                id += '-customFields';
            }
            id += '-' + fieldName;
            return id;
        };
        return CustomFieldComponentService;
    }());
    CustomFieldComponentService.ɵprov = i0.ɵɵdefineInjectable({ factory: function CustomFieldComponentService_Factory() { return new CustomFieldComponentService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(ComponentRegistryService)); }, token: CustomFieldComponentService, providedIn: "root" });
    CustomFieldComponentService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    CustomFieldComponentService.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver },
        { type: ComponentRegistryService }
    ]; };

    var BooleanFormInputComponent = /** @class */ (function () {
        function BooleanFormInputComponent() {
        }
        return BooleanFormInputComponent;
    }());
    BooleanFormInputComponent.id = 'boolean-form-input';
    BooleanFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-boolean-form-input',
                    template: "<clr-checkbox-wrapper>\n    <input\n        type=\"checkbox\"\n        clrCheckbox\n        [formControl]=\"formControl\"\n        [vdrDisabled]=\"!!readonly\"\n    />\n</clr-checkbox-wrapper>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    var CurrencyFormInputComponent = /** @class */ (function () {
        function CurrencyFormInputComponent(dataService) {
            this.dataService = dataService;
            this.currencyCode$ = this.dataService.settings
                .getActiveChannel()
                .mapStream(function (data) { return data.activeChannel.currencyCode; });
        }
        return CurrencyFormInputComponent;
    }());
    CurrencyFormInputComponent.id = 'currency-form-input';
    CurrencyFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-currency-form-input',
                    template: "<vdr-currency-input\n    [formControl]=\"formControl\"\n    [readonly]=\"readonly\"\n    [currencyCode]=\"currencyCode$ | async\"\n></vdr-currency-input>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    CurrencyFormInputComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };
    CurrencyFormInputComponent.propDecorators = {
        readonly: [{ type: i0.Input }]
    };

    var CustomerGroupFormInputComponent = /** @class */ (function () {
        function CustomerGroupFormInputComponent(dataService) {
            this.dataService = dataService;
        }
        CustomerGroupFormInputComponent.prototype.ngOnInit = function () {
            this.customerGroups$ = this.dataService.customer
                .getCustomerGroupList({
                take: 1000,
            })
                .mapSingle(function (res) { return res.customerGroups.items; })
                .pipe(operators.startWith([]));
        };
        CustomerGroupFormInputComponent.prototype.selectGroup = function (group) {
            this.formControl.setValue(group.id);
        };
        return CustomerGroupFormInputComponent;
    }());
    CustomerGroupFormInputComponent.id = 'customer-group-form-input';
    CustomerGroupFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-customer-group-form-input',
                    template: "<ng-select\n    [items]=\"customerGroups$ | async\"\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"false\"\n    bindValue=\"id\"\n    [clearable]=\"true\"\n    [searchable]=\"false\"\n    [ngModel]=\"formControl.value\"\n    (change)=\"selectGroup($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n</ng-select>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    CustomerGroupFormInputComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };
    CustomerGroupFormInputComponent.propDecorators = {
        readonly: [{ type: i0.Input }]
    };

    var DateFormInputComponent = /** @class */ (function () {
        function DateFormInputComponent() {
        }
        return DateFormInputComponent;
    }());
    DateFormInputComponent.id = 'date-form-input';
    DateFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-date-form-input',
                    template: "<vdr-datetime-picker\n    [formControl]=\"formControl\"\n    [min]=\"config?.min\"\n    [max]=\"config?.max\"\n    [yearRange]=\"config?.yearRange\"\n    [readonly]=\"readonly\"\n>\n</vdr-datetime-picker>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    DateFormInputComponent.propDecorators = {
        readonly: [{ type: i0.Input }]
    };

    var FacetValueFormInputComponent = /** @class */ (function () {
        function FacetValueFormInputComponent(dataService) {
            this.dataService = dataService;
            this.isListInput = true;
        }
        FacetValueFormInputComponent.prototype.ngOnInit = function () {
            this.facets$ = this.dataService.facet
                .getAllFacets()
                .mapSingle(function (data) { return data.facets.items; })
                .pipe(operators.shareReplay(1));
        };
        return FacetValueFormInputComponent;
    }());
    FacetValueFormInputComponent.id = 'facet-value-form-input';
    FacetValueFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-facet-value-form-input',
                    template: "<vdr-facet-value-selector\n    *ngIf=\"facets$ | async as facets\"\n    [readonly]=\"readonly\"\n    [facets]=\"facets\"\n    [formControl]=\"formControl\"\n></vdr-facet-value-selector>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    FacetValueFormInputComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };

    var NumberFormInputComponent = /** @class */ (function () {
        function NumberFormInputComponent() {
        }
        return NumberFormInputComponent;
    }());
    NumberFormInputComponent.id = 'number-form-input';
    NumberFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-number-form-input',
                    template: "<vdr-affixed-input [suffix]=\"config?.suffix\" [prefix]=\"config?.prefix\">\n    <input\n        type=\"number\"\n        [readonly]=\"readonly\"\n        [min]=\"config?.min\"\n        [max]=\"config?.max\"\n        [step]=\"config?.step\"\n        [formControl]=\"formControl\"\n    />\n</vdr-affixed-input>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    NumberFormInputComponent.propDecorators = {
        readonly: [{ type: i0.Input }]
    };

    var PasswordFormInputComponent = /** @class */ (function () {
        function PasswordFormInputComponent() {
        }
        return PasswordFormInputComponent;
    }());
    PasswordFormInputComponent.id = 'password-form-input';
    PasswordFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-password-form-input',
                    template: "<input\n    type=\"password\"\n    [readonly]=\"readonly\"\n    [formControl]=\"formControl\"\n/>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    var ProductSelectorFormInputComponent = /** @class */ (function () {
        function ProductSelectorFormInputComponent(dataService) {
            this.dataService = dataService;
            this.isListInput = true;
        }
        ProductSelectorFormInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.formControl.setValidators([
                function (control) {
                    if (!control.value || !control.value.length) {
                        return {
                            atLeastOne: { length: control.value.length },
                        };
                    }
                    return null;
                },
            ]);
            this.selection$ = this.formControl.valueChanges.pipe(operators.startWith(this.formControl.value), operators.switchMap(function (value) {
                if (Array.isArray(value) && 0 < value.length) {
                    return rxjs.forkJoin(value.map(function (id) { return _this.dataService.product
                        .getProductVariant(id)
                        .mapSingle(function (data) { return data.productVariant; }); }));
                }
                return rxjs.of([]);
            }), operators.map(function (variants) { return variants.filter(sharedUtils.notNullOrUndefined); }));
        };
        ProductSelectorFormInputComponent.prototype.addProductVariant = function (product) {
            var value = this.formControl.value;
            this.formControl.setValue(__spread(new Set(__spread(value, [product.productVariantId]))));
        };
        ProductSelectorFormInputComponent.prototype.removeProductVariant = function (id) {
            var value = this.formControl.value;
            this.formControl.setValue(value.filter(function (_id) { return _id !== id; }));
        };
        return ProductSelectorFormInputComponent;
    }());
    ProductSelectorFormInputComponent.id = 'product-selector-form-input';
    ProductSelectorFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-selector-form-input',
                    template: "<ul class=\"list-unstyled\">\n    <li *ngFor=\"let variant of selection$ | async\" class=\"variant\">\n        <div class=\"thumb\">\n            <img [src]=\"variant.product.featuredAsset | assetPreview: 32\" />\n        </div>\n        <div class=\"detail\">\n            <div>{{ variant.name }}</div>\n            <div class=\"sku\">{{ variant.sku }}</div>\n        </div>\n        <div class=\"flex-spacer\"></div>\n        <button\n            class=\"btn btn-link btn-sm btn-warning\"\n            (click)=\"removeProductVariant(variant.id)\"\n            [title]=\"'common.remove-item-from-list' | translate\"\n        >\n            <clr-icon shape=\"times\"></clr-icon>\n        </button>\n    </li>\n</ul>\n<vdr-product-selector (productSelected)=\"addProductVariant($event)\"></vdr-product-selector>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".variant{margin-bottom:6px;display:flex;align-items:center;transition:background-color .2s}.variant:hover{background-color:var(--color-component-bg-200)}.thumb{margin-right:6px}.sku{color:var(--color-grey-400);font-size:smaller;line-height:1em}"]
                },] }
    ];
    ProductSelectorFormInputComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };

    var RelationFormInputComponent = /** @class */ (function () {
        function RelationFormInputComponent() {
        }
        return RelationFormInputComponent;
    }());
    RelationFormInputComponent.id = 'relation-form-input';
    RelationFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-relation-form-input',
                    template: "<div [ngSwitch]=\"config.entity\">\n    <vdr-relation-asset-input\n        *ngSwitchCase=\"'Asset'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-asset-input>\n    <vdr-relation-product-input\n        *ngSwitchCase=\"'Product'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-product-input>\n    <vdr-relation-customer-input\n        *ngSwitchCase=\"'Customer'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-customer-input>\n    <vdr-relation-product-variant-input\n        *ngSwitchCase=\"'ProductVariant'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-product-variant-input>\n    <ng-template ngSwitchDefault>\n        No input component configured for \"{{ config.entity }}\" type\n    </ng-template>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;background-color:var(--color-component-bg-200);padding:3px}"]
                },] }
    ];
    RelationFormInputComponent.propDecorators = {
        readonly: [{ type: i0.Input }]
    };

    var SelectFormInputComponent = /** @class */ (function () {
        function SelectFormInputComponent() {
        }
        return SelectFormInputComponent;
    }());
    SelectFormInputComponent.id = 'select-form-input';
    SelectFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-select-form-input',
                    template: "<select clrSelect [formControl]=\"formControl\" [vdrDisabled]=\"readonly\">\n    <option *ngFor=\"let option of config.options\" [value]=\"option.value\">\n        {{ (option | customFieldLabel) || option.label || option.value }}\n    </option>\n</select>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["select{width:100%}"]
                },] }
    ];
    SelectFormInputComponent.propDecorators = {
        readonly: [{ type: i0.Input }]
    };

    var TextFormInputComponent = /** @class */ (function () {
        function TextFormInputComponent() {
        }
        return TextFormInputComponent;
    }());
    TextFormInputComponent.id = 'text-form-input';
    TextFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-text-form-input',
                    template: "<input\n    type=\"text\"\n    [readonly]=\"readonly\"\n    [formControl]=\"formControl\"\n/>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    var defaultFormInputs = [
        BooleanFormInputComponent,
        CurrencyFormInputComponent,
        DateFormInputComponent,
        FacetValueFormInputComponent,
        NumberFormInputComponent,
        SelectFormInputComponent,
        TextFormInputComponent,
        ProductSelectorFormInputComponent,
        CustomerGroupFormInputComponent,
        PasswordFormInputComponent,
        RelationFormInputComponent,
    ];
    /**
     * @description
     * Registers a custom FormInputComponent which can be used to control the argument inputs
     * of a {@link ConfigurableOperationDef} (e.g. CollectionFilter, ShippingMethod etc)
     *
     * @example
     * ```TypeScript
     * \@NgModule({
     *   imports: [SharedModule],
     *   declarations: [MyCustomFieldControl],
     *   providers: [
     *       registerFormInputComponent('my-custom-input', MyCustomFieldControl),
     *   ],
     * })
     * export class MyUiExtensionModule {}
     * ```
     */
    function registerFormInputComponent(id, component) {
        return {
            provide: i0.APP_INITIALIZER,
            multi: true,
            useFactory: function (registry) { return function () {
                registry.registerInputComponent(id, component);
            }; },
            deps: [ComponentRegistryService],
        };
    }
    /**
     * @description
     * Registers a custom component to act as the form input control for the given custom field.
     * This should be used in the NgModule `providers` array of your ui extension module.
     *
     * @example
     * ```TypeScript
     * \@NgModule({
     *   imports: [SharedModule],
     *   declarations: [MyCustomFieldControl],
     *   providers: [
     *       registerCustomFieldComponent('Product', 'someCustomField', MyCustomFieldControl),
     *   ],
     * })
     * export class MyUiExtensionModule {}
     * ```
     */
    function registerCustomFieldComponent(entity, fieldName, component) {
        return {
            provide: i0.APP_INITIALIZER,
            multi: true,
            useFactory: function (customFieldComponentService) { return function () {
                customFieldComponentService.registerCustomFieldComponent(entity, fieldName, component);
            }; },
            deps: [CustomFieldComponentService],
        };
    }
    /**
     * Registers the default form input components.
     */
    function registerDefaultFormInputs() {
        return defaultFormInputs.map(function (cmp) { return registerFormInputComponent(cmp.id, cmp); });
    }

    var ActionBarItemsComponent = /** @class */ (function () {
        function ActionBarItemsComponent(navBuilderService, route, dataService, notificationService) {
            this.navBuilderService = navBuilderService;
            this.route = route;
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.locationId$ = new rxjs.BehaviorSubject('');
        }
        ActionBarItemsComponent.prototype.ngOnInit = function () {
            this.items$ = rxjs.combineLatest(this.navBuilderService.actionBarConfig$, this.locationId$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), items = _b[0], locationId = _b[1];
                return items.filter(function (config) { return config.locationId === locationId; });
            }));
        };
        ActionBarItemsComponent.prototype.ngOnChanges = function (changes) {
            if ('locationId' in changes) {
                this.locationId$.next(changes['locationId'].currentValue);
            }
        };
        ActionBarItemsComponent.prototype.handleClick = function (event, item) {
            if (typeof item.onClick === 'function') {
                item.onClick(event, {
                    route: this.route,
                    dataService: this.dataService,
                    notificationService: this.notificationService,
                });
            }
        };
        ActionBarItemsComponent.prototype.getRouterLink = function (item) {
            return this.navBuilderService.getRouterLink(item, this.route);
        };
        ActionBarItemsComponent.prototype.getButtonStyles = function (item) {
            var styles = ['btn'];
            if (item.buttonStyle && item.buttonStyle === 'link') {
                styles.push('btn-link');
                return styles;
            }
            styles.push(this.getButtonColorClass(item));
            return styles;
        };
        ActionBarItemsComponent.prototype.getButtonColorClass = function (item) {
            switch (item.buttonColor) {
                case undefined:
                case 'primary':
                    return item.buttonStyle === 'outline' ? 'btn-outline' : 'btn-primary';
                case 'success':
                    return item.buttonStyle === 'outline' ? 'btn-success-outline' : 'btn-success';
                case 'warning':
                    return item.buttonStyle === 'outline' ? 'btn-warning-outline' : 'btn-warning';
                default:
                    sharedUtils.assertNever(item.buttonColor);
                    return '';
            }
        };
        return ActionBarItemsComponent;
    }());
    ActionBarItemsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-action-bar-items',
                    template: "<ng-container *ngFor=\"let item of items$ | async\">\n    <button *vdrIfPermissions=\"item.requiresPermission\"\n            [routerLink]=\"getRouterLink(item)\"\n            [disabled]=\"item.disabled ? (item.disabled | async) : false\"\n            (click)=\"handleClick($event, item)\"\n            [ngClass]=\"getButtonStyles(item)\">\n        <clr-icon *ngIf=\"item.icon\" [attr.shape]=\"item.icon\"></clr-icon>\n        {{ item.label | translate }}\n    </button>\n</ng-container>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    ActionBarItemsComponent.ctorParameters = function () { return [
        { type: NavBuilderService },
        { type: i1$3.ActivatedRoute },
        { type: DataService },
        { type: NotificationService }
    ]; };
    ActionBarItemsComponent.propDecorators = {
        locationId: [{ type: i0.HostBinding, args: ['attr.data-location-id',] }, { type: i0.Input }]
    };

    var ActionBarLeftComponent = /** @class */ (function () {
        function ActionBarLeftComponent() {
            this.grow = false;
        }
        return ActionBarLeftComponent;
    }());
    ActionBarLeftComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-ab-left',
                    template: "\n        <ng-content></ng-content>\n    "
                },] }
    ];
    ActionBarLeftComponent.propDecorators = {
        grow: [{ type: i0.Input }]
    };
    var ActionBarRightComponent = /** @class */ (function () {
        function ActionBarRightComponent() {
            this.grow = false;
        }
        return ActionBarRightComponent;
    }());
    ActionBarRightComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-ab-right',
                    template: "\n        <ng-content></ng-content>\n    "
                },] }
    ];
    ActionBarRightComponent.propDecorators = {
        grow: [{ type: i0.Input }]
    };
    var ActionBarComponent = /** @class */ (function () {
        function ActionBarComponent() {
        }
        return ActionBarComponent;
    }());
    ActionBarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-action-bar',
                    template: "<div class=\"left-content\" [class.grow]=\"left?.grow\"><ng-content select=\"vdr-ab-left\"></ng-content></div>\n<div class=\"right-content\" [class.grow]=\"right?.grow\"><ng-content select=\"vdr-ab-right\"></ng-content></div>\n",
                    styles: [":host{display:flex;justify-content:space-between;align-items:flex-start;background-color:var(--color-component-bg-100);position:sticky;top:-24px;z-index:25;border-bottom:1px solid var(--color-component-border-200)}:host>.grow{flex:1}"]
                },] }
    ];
    ActionBarComponent.propDecorators = {
        left: [{ type: i0.ContentChild, args: [ActionBarLeftComponent,] }],
        right: [{ type: i0.ContentChild, args: [ActionBarRightComponent,] }]
    };

    var AddressFormComponent = /** @class */ (function () {
        function AddressFormComponent() {
        }
        return AddressFormComponent;
    }());
    AddressFormComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-address-form',
                    template: "<form [formGroup]=\"formGroup\">\n    <clr-input-container>\n        <label>{{ 'customer.full-name' | translate }}</label>\n        <input formControlName=\"fullName\" type=\"text\" clrInput />\n    </clr-input-container>\n\n    <div class=\"clr-row\">\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.street-line-1' | translate }}</label>\n                <input formControlName=\"streetLine1\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.street-line-2' | translate }}</label>\n                <input formControlName=\"streetLine2\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n    </div>\n    <div class=\"clr-row\">\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.city' | translate }}</label>\n                <input formControlName=\"city\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.province' | translate }}</label>\n                <input formControlName=\"province\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n    </div>\n    <div class=\"clr-row\">\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.postal-code' | translate }}</label>\n                <input formControlName=\"postalCode\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.country' | translate }}</label>\n                <select name=\"countryCode\" formControlName=\"countryCode\" clrInput clrSelect>\n                    <option *ngFor=\"let country of availableCountries\" [value]=\"country.code\">\n                        {{ country.name }}\n                    </option>\n                </select>\n            </clr-input-container>\n        </div>\n    </div>\n    <clr-input-container>\n        <label>{{ 'customer.phone-number' | translate }}</label>\n        <input formControlName=\"phoneNumber\" type=\"text\" clrInput />\n    </clr-input-container>\n    <section formGroupName=\"customFields\" *ngIf=\"formGroup.get('customFields') as customFieldsGroup\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <ng-container *ngFor=\"let customField of customFields\">\n            <vdr-custom-field-control\n                entityName=\"Address\"\n                [customFieldsFormGroup]=\"customFieldsGroup\"\n                [customField]=\"customField\"\n            ></vdr-custom-field-control>\n        </ng-container>\n    </section>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    AddressFormComponent.propDecorators = {
        customFields: [{ type: i0.Input }],
        formGroup: [{ type: i0.Input }],
        availableCountries: [{ type: i0.Input }]
    };

    /**
     * A wrapper around an <input> element which adds a prefix and/or a suffix element.
     */
    var AffixedInputComponent = /** @class */ (function () {
        function AffixedInputComponent() {
        }
        return AffixedInputComponent;
    }());
    AffixedInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-affixed-input',
                    template: "<div [class.has-prefix]=\"!!prefix\" [class.has-suffix]=\"!!suffix\">\n    <ng-content></ng-content>\n</div>\n<div class=\"affix prefix\" *ngIf=\"prefix\">{{ prefix }}</div>\n<div class=\"affix suffix\" *ngIf=\"suffix\">{{ suffix }}</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:inline-flex}.affix{color:var(--color-grey-800);display:flex;align-items:center;background-color:var(--color-grey-200);border:1px solid var(--color-component-border-300);top:1px;padding:3px;line-height:.58333rem;transition:border .2s}::ng-deep .has-prefix input{border-top-left-radius:0!important;border-bottom-left-radius:0!important}.prefix{order:-1;border-radius:3px 0 0 3px;border-right:none}::ng-deep .has-suffix input{border-top-right-radius:0!important;border-bottom-right-radius:0!important}.suffix{border-radius:0 3px 3px 0;border-left:none}"]
                },] }
    ];
    AffixedInputComponent.propDecorators = {
        prefix: [{ type: i0.Input }],
        suffix: [{ type: i0.Input }]
    };

    /**
     * A form input control which displays a number input with a percentage sign suffix.
     */
    var PercentageSuffixInputComponent = /** @class */ (function () {
        function PercentageSuffixInputComponent() {
            this.disabled = false;
            this.readonly = false;
        }
        PercentageSuffixInputComponent.prototype.ngOnChanges = function (changes) {
            if ('value' in changes) {
                this.writeValue(changes['value'].currentValue);
            }
        };
        PercentageSuffixInputComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        PercentageSuffixInputComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        PercentageSuffixInputComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        PercentageSuffixInputComponent.prototype.onInput = function (value) {
            this.onChange(value);
        };
        PercentageSuffixInputComponent.prototype.writeValue = function (value) {
            var numericValue = +value;
            if (!Number.isNaN(numericValue)) {
                this._value = numericValue;
            }
        };
        return PercentageSuffixInputComponent;
    }());
    PercentageSuffixInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-percentage-suffix-input',
                    template: "\n        <vdr-affixed-input suffix=\"%\">\n            <input\n                type=\"number\"\n                step=\"1\"\n                [value]=\"_value\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                (input)=\"onInput($event.target.value)\"\n                (focus)=\"onTouch()\"\n            />\n        </vdr-affixed-input>\n    ",
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: PercentageSuffixInputComponent,
                            multi: true,
                        },
                    ],
                    styles: ["\n            :host {\n                padding: 0;\n            }\n        "]
                },] }
    ];
    PercentageSuffixInputComponent.propDecorators = {
        disabled: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        value: [{ type: i0.Input }]
    };

    /**
     * A component for selecting files to upload as new Assets.
     */
    var AssetFileInputComponent = /** @class */ (function () {
        function AssetFileInputComponent(serverConfig) {
            this.serverConfig = serverConfig;
            /**
             * CSS selector of the DOM element which will be masked by the file
             * drop zone. Defaults to `body`.
             */
            this.dropZoneTarget = 'body';
            this.uploading = false;
            this.selectFiles = new i0.EventEmitter();
            this.dragging = false;
            this.overDropZone = false;
            this.dropZoneStyle = {
                'width.px': 0,
                'height.px': 0,
                'top.px': 0,
                'left.px': 0,
            };
        }
        AssetFileInputComponent.prototype.ngOnInit = function () {
            this.accept = this.serverConfig.serverConfig.permittedAssetTypes.join(',');
            this.fitDropZoneToTarget();
        };
        AssetFileInputComponent.prototype.onDragEnter = function () {
            this.dragging = true;
            this.fitDropZoneToTarget();
        };
        // DragEvent is not supported in Safari, see https://github.com/vendure-ecommerce/vendure/pull/284
        AssetFileInputComponent.prototype.onDragLeave = function (event) {
            if (!event.clientX && !event.clientY) {
                this.dragging = false;
            }
        };
        /**
         * Preventing this event is required to make dropping work.
         * See https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#Define_a_drop_zone
         */
        AssetFileInputComponent.prototype.onDragOver = function (event) {
            event.preventDefault();
        };
        // DragEvent is not supported in Safari, see https://github.com/vendure-ecommerce/vendure/pull/284
        AssetFileInputComponent.prototype.onDrop = function (event) {
            event.preventDefault();
            this.dragging = false;
            this.overDropZone = false;
            var files = Array.from(event.dataTransfer ? event.dataTransfer.items : [])
                .map(function (i) { return i.getAsFile(); })
                .filter(sharedUtils.notNullOrUndefined);
            this.selectFiles.emit(files);
        };
        AssetFileInputComponent.prototype.select = function (event) {
            var files = event.target.files;
            if (files) {
                this.selectFiles.emit(Array.from(files));
            }
        };
        AssetFileInputComponent.prototype.fitDropZoneToTarget = function () {
            var target = document.querySelector(this.dropZoneTarget);
            if (target) {
                var rect = target.getBoundingClientRect();
                this.dropZoneStyle['width.px'] = rect.width;
                this.dropZoneStyle['height.px'] = rect.height;
                this.dropZoneStyle['top.px'] = rect.top;
                this.dropZoneStyle['left.px'] = rect.left;
            }
        };
        return AssetFileInputComponent;
    }());
    AssetFileInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-asset-file-input',
                    template: "<input type=\"file\" class=\"file-input\" #fileInput (change)=\"select($event)\" multiple [accept]=\"accept\" />\n<button class=\"btn btn-primary\" (click)=\"fileInput.click()\" [disabled]=\"uploading\">\n    <ng-container *ngIf=\"uploading; else selectable\">\n        <clr-spinner clrInline></clr-spinner>\n        {{ 'asset.uploading' | translate }}\n    </ng-container>\n    <ng-template #selectable>\n        <clr-icon shape=\"upload-cloud\"></clr-icon>\n        {{ 'asset.upload-assets' | translate }}\n    </ng-template>\n</button>\n<div\n    class=\"drop-zone\"\n    [ngStyle]=\"dropZoneStyle\"\n    [class.visible]=\"dragging\"\n    [class.dragging-over]=\"overDropZone\"\n    (dragenter)=\"overDropZone = true\"\n    (dragleave)=\"overDropZone = false\"\n    (dragover)=\"onDragOver($event)\"\n    (drop)=\"onDrop($event)\"\n    #dropZone\n>\n    <div class=\"drop-label\" (dragenter)=\"overDropZone = true\">\n        <clr-icon shape=\"upload-cloud\" size=\"32\"></clr-icon>\n        {{ 'catalog.drop-files-to-upload' | translate }}\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".file-input{display:none}.drop-zone{position:fixed;background-color:var(--color-primary-500);border:3px dashed var(--color-component-border-300);opacity:0;visibility:hidden;z-index:1000;transition:opacity .2s,background-color .2s,visibility 0s .2s;display:flex;align-items:center;justify-content:center}.drop-zone.visible{opacity:.3;visibility:visible;transition:opacity .2s,background-color .2s,border .2s,visibility 0s}.drop-zone .drop-label{background-color:hsla(0,0%,100%,.8);border-radius:3px;padding:24px;font-size:32px;pointer-events:none;opacity:.5;transition:opacity .2s}.drop-zone.dragging-over{border-color:#fff;background-color:var(--color-primary-500);opacity:.7;transition:background-color .2s,border .2s}.drop-zone.dragging-over .drop-label{opacity:1}"]
                },] }
    ];
    AssetFileInputComponent.ctorParameters = function () { return [
        { type: ServerConfigService }
    ]; };
    AssetFileInputComponent.propDecorators = {
        dropZoneTarget: [{ type: i0.Input }],
        uploading: [{ type: i0.Input }],
        selectFiles: [{ type: i0.Output }],
        onDragEnter: [{ type: i0.HostListener, args: ['document:dragenter',] }],
        onDragLeave: [{ type: i0.HostListener, args: ['document:dragleave', ['$event'],] }]
    };

    var AssetPreviewDialogComponent = /** @class */ (function () {
        function AssetPreviewDialogComponent(dataService) {
            this.dataService = dataService;
        }
        AssetPreviewDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.assetWithTags$ = rxjs.of(this.asset).pipe(operators.mergeMap(function (asset) {
                if (_this.hasTags(asset)) {
                    return rxjs.of(asset);
                }
                else {
                    // tslint:disable-next-line:no-non-null-assertion
                    return _this.dataService.product.getAsset(asset.id).mapSingle(function (data) { return data.asset; });
                }
            }));
        };
        AssetPreviewDialogComponent.prototype.hasTags = function (asset) {
            return asset.hasOwnProperty('tags');
        };
        return AssetPreviewDialogComponent;
    }());
    AssetPreviewDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-asset-preview-dialog',
                    template: "<ng-template vdrDialogTitle>\n    <div class=\"title-row\">\n        {{ asset.name }}\n    </div>\n</ng-template>\n\n<vdr-asset-preview\n    *ngIf=\"assetWithTags$ | async as assetWithTags\"\n    [asset]=\"assetWithTags\"\n    (assetChange)=\"assetChanges = $event\"\n    (editClick)=\"resolveWith()\"\n></vdr-asset-preview>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{height:70vh}.update-button.hidden{visibility:hidden}"]
                },] }
    ];
    AssetPreviewDialogComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };

    var AssetGalleryComponent = /** @class */ (function () {
        function AssetGalleryComponent(modalService) {
            this.modalService = modalService;
            /**
             * If true, allows multiple assets to be selected by ctrl+clicking.
             */
            this.multiSelect = false;
            this.canDelete = false;
            this.selectionChange = new i0.EventEmitter();
            this.deleteAssets = new i0.EventEmitter();
            this.selection = [];
        }
        AssetGalleryComponent.prototype.ngOnChanges = function () {
            var e_1, _a;
            if (this.assets) {
                var _loop_1 = function (asset) {
                    // Update and selected assets with any changes
                    var match = this_1.assets.find(function (a) { return a.id === asset.id; });
                    if (match) {
                        Object.assign(asset, match);
                    }
                };
                var this_1 = this;
                try {
                    for (var _b = __values(this.selection), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var asset = _c.value;
                        _loop_1(asset);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        AssetGalleryComponent.prototype.toggleSelection = function (event, asset) {
            var _a;
            var _this = this;
            var index = this.selection.findIndex(function (a) { return a.id === asset.id; });
            if (this.multiSelect && event.shiftKey && 1 <= this.selection.length) {
                var lastSelection_1 = this.selection[this.selection.length - 1];
                var lastSelectionIndex = this.assets.findIndex(function (a) { return a.id === lastSelection_1.id; });
                var currentIndex = this.assets.findIndex(function (a) { return a.id === asset.id; });
                var start = currentIndex < lastSelectionIndex ? currentIndex : lastSelectionIndex;
                var end = currentIndex > lastSelectionIndex ? currentIndex + 1 : lastSelectionIndex;
                (_a = this.selection).push.apply(_a, __spread(this.assets.slice(start, end).filter(function (a) { return !_this.selection.find(function (s) { return s.id === a.id; }); })));
            }
            else if (index === -1) {
                if (this.multiSelect && (event.ctrlKey || event.shiftKey)) {
                    this.selection.push(asset);
                }
                else {
                    this.selection = [asset];
                }
            }
            else {
                if (this.multiSelect && event.ctrlKey) {
                    this.selection.splice(index, 1);
                }
                else if (1 < this.selection.length) {
                    this.selection = [asset];
                }
                else {
                    this.selection.splice(index, 1);
                }
            }
            // Make the selection mutable
            this.selection = this.selection.map(function (x) { return (Object.assign({}, x)); });
            this.selectionChange.emit(this.selection);
        };
        AssetGalleryComponent.prototype.isSelected = function (asset) {
            return !!this.selection.find(function (a) { return a.id === asset.id; });
        };
        AssetGalleryComponent.prototype.lastSelected = function () {
            return this.selection[this.selection.length - 1];
        };
        AssetGalleryComponent.prototype.previewAsset = function (asset) {
            this.modalService
                .fromComponent(AssetPreviewDialogComponent, {
                size: 'xl',
                closable: true,
                locals: { asset: asset },
            })
                .subscribe();
        };
        AssetGalleryComponent.prototype.entityInfoClick = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        return AssetGalleryComponent;
    }());
    AssetGalleryComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-asset-gallery',
                    template: "<div class=\"gallery\">\n    <div\n        class=\"card\"\n        *ngFor=\"let asset of assets\"\n        (click)=\"toggleSelection($event, asset)\"\n        [class.selected]=\"isSelected(asset)\"\n    >\n        <div class=\"card-img\">\n            <div class=\"selected-checkbox\"><clr-icon shape=\"check-circle\" size=\"32\"></clr-icon></div>\n            <img [src]=\"asset | assetPreview: 'thumb'\" />\n        </div>\n        <div class=\"detail\">\n            <vdr-entity-info\n                [entity]=\"asset\"\n                [small]=\"true\"\n                (click)=\"entityInfoClick($event)\"\n            ></vdr-entity-info>\n            <span [title]=\"asset.name\">{{ asset.name }}</span>\n        </div>\n    </div>\n</div>\n<div class=\"info-bar\">\n    <div class=\"card\">\n        <div class=\"card-img\">\n            <div class=\"placeholder\" *ngIf=\"selection.length === 0\">\n                <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n                <div>{{ 'catalog.no-selection' | translate }}</div>\n            </div>\n            <img\n                class=\"preview\"\n                *ngIf=\"selection.length >= 1\"\n                [src]=\"lastSelected().preview + '?preset=medium'\"\n            />\n        </div>\n        <div class=\"card-block details\" *ngIf=\"selection.length >= 1\">\n            <div class=\"name\">{{ lastSelected().name }}</div>\n            <div>{{ 'asset.original-asset-size' | translate }}: {{ lastSelected().fileSize | filesize }}</div>\n\n            <ng-container *ngIf=\"selection.length === 1\">\n                <vdr-chip *ngFor=\"let tag of lastSelected().tags\" [colorFrom]=\"tag.value\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ tag.value }}</vdr-chip>\n                <div>\n                    <button (click)=\"previewAsset(lastSelected())\" class=\"btn btn-link\">\n                        <clr-icon shape=\"eye\"></clr-icon> {{ 'asset.preview' | translate }}\n                    </button>\n                </div>\n                <div>\n                    <a [routerLink]=\"['./', lastSelected().id]\" class=\"btn btn-link\">\n                        <clr-icon shape=\"pencil\"></clr-icon> {{ 'common.edit' | translate }}\n                    </a>\n                </div>\n            </ng-container>\n            <div *ngIf=\"canDelete\">\n                <button (click)=\"deleteAssets.emit(selection)\" class=\"btn btn-link\">\n                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon> {{ 'common.delete' | translate }}\n                </button>\n            </div>\n        </div>\n    </div>\n    <div class=\"card stack\" [class.visible]=\"selection.length > 1\"></div>\n    <div class=\"selection-count\" [class.visible]=\"selection.length > 1\">\n        {{ 'asset.assets-selected-count' | translate: { count: selection.length } }}\n        <ul>\n            <li *ngFor=\"let asset of selection\">{{ asset.name }}</li>\n        </ul>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;overflow:hidden}.gallery{flex:1;display:grid;grid-template-columns:repeat(auto-fill,150px);grid-template-rows:repeat(auto-fill,180px);grid-gap:10px 20px;overflow-y:auto;padding-left:12px;padding-top:12px;padding-bottom:12px}.gallery .card:hover{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.card{margin-top:0;position:relative}.selected-checkbox{opacity:0;position:absolute;color:var(--color-success-500);background-color:#fff;border-radius:50%;top:-12px;left:-12px;box-shadow:0 5px 5px -4px rgba(0,0,0,.75);transition:opacity .1s}.card.selected{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.card.selected .selected-checkbox{opacity:1}.detail{font-size:12px;margin:3px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.detail vdr-entity-info{height:16px}.info-bar{width:25%;padding:0 6px;overflow-y:auto}.info-bar .card{z-index:1}.info-bar .stack{z-index:0;opacity:0;transform:perspective(500px) translateZ(0) translateY(-16px);height:16px;transition:transform .3s,opacity 0s .3s;background-color:#fff}.info-bar .stack.visible{opacity:1;transform:perspective(500px) translateZ(-44px) translateY(0);background-color:var(--color-component-bg-100);transition:transform .3s,color .3s}.info-bar .selection-count{opacity:0;position:relative;text-align:center;visibility:hidden;transition:opacity .3s,visibility 0s .3s}.info-bar .selection-count.visible{opacity:1;visibility:visible;transition:opacity .3s,visibility 0s}.info-bar .selection-count ul{text-align:left;list-style-type:none;margin-left:12px}.info-bar .selection-count ul li{font-size:12px}.info-bar .placeholder{text-align:center;color:var(--color-grey-300)}.info-bar .preview img{max-width:100%}.info-bar .details{font-size:12px;word-break:break-all}.info-bar .name{line-height:14px;font-weight:700}"]
                },] }
    ];
    AssetGalleryComponent.ctorParameters = function () { return [
        { type: ModalService }
    ]; };
    AssetGalleryComponent.propDecorators = {
        assets: [{ type: i0.Input }],
        multiSelect: [{ type: i0.Input }],
        canDelete: [{ type: i0.Input }],
        selectionChange: [{ type: i0.Output }],
        deleteAssets: [{ type: i0.Output }]
    };

    /**
     * A dialog which allows the creation and selection of assets.
     */
    var AssetPickerDialogComponent = /** @class */ (function () {
        function AssetPickerDialogComponent(dataService, notificationService) {
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.paginationConfig = {
                currentPage: 1,
                itemsPerPage: 25,
                totalItems: 1,
            };
            this.multiSelect = true;
            this.initialTags = [];
            this.selection = [];
            this.searchTerm$ = new rxjs.BehaviorSubject(undefined);
            this.filterByTags$ = new rxjs.BehaviorSubject(undefined);
            this.uploading = false;
            this.destroy$ = new rxjs.Subject();
        }
        AssetPickerDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.listQuery = this.dataService.product.getAssetList(this.paginationConfig.itemsPerPage, 0);
            this.allTags$ = this.dataService.product.getTagList().mapSingle(function (data) { return data.tags.items; });
            this.assets$ = this.listQuery.stream$.pipe(operators.tap(function (result) { return (_this.paginationConfig.totalItems = result.assets.totalItems); }), operators.map(function (result) { return result.assets.items; }));
            this.searchTerm$.pipe(operators.debounceTime(250), operators.takeUntil(this.destroy$)).subscribe(function () {
                _this.fetchPage(_this.paginationConfig.currentPage, _this.paginationConfig.itemsPerPage);
            });
            this.filterByTags$.pipe(operators.debounceTime(100), operators.takeUntil(this.destroy$)).subscribe(function () {
                _this.fetchPage(_this.paginationConfig.currentPage, _this.paginationConfig.itemsPerPage);
            });
        };
        AssetPickerDialogComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (0 < this.initialTags.length) {
                this.allTags$
                    .pipe(operators.take(1), operators.map(function (allTags) { return allTags.filter(function (tag) { return _this.initialTags.includes(tag.value); }); }), operators.tap(function (tags) { return _this.filterByTags$.next(tags); }), operators.delay(1))
                    .subscribe(function (tags) { return _this.assetSearchInputComponent.setTags(tags); });
            }
        };
        AssetPickerDialogComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        AssetPickerDialogComponent.prototype.pageChange = function (page) {
            this.paginationConfig.currentPage = page;
            this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
        };
        AssetPickerDialogComponent.prototype.itemsPerPageChange = function (itemsPerPage) {
            this.paginationConfig.itemsPerPage = itemsPerPage;
            this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
        };
        AssetPickerDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        AssetPickerDialogComponent.prototype.select = function () {
            this.resolveWith(this.selection);
        };
        AssetPickerDialogComponent.prototype.createAssets = function (files) {
            var _this = this;
            if (files.length) {
                this.uploading = true;
                this.dataService.product
                    .createAssets(files)
                    .pipe(operators.finalize(function () { return (_this.uploading = false); }))
                    .subscribe(function (res) {
                    _this.fetchPage(_this.paginationConfig.currentPage, _this.paginationConfig.itemsPerPage);
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('asset.notify-create-assets-success'), {
                        count: files.length,
                    });
                });
            }
        };
        AssetPickerDialogComponent.prototype.fetchPage = function (currentPage, itemsPerPage) {
            var _a;
            var take = +itemsPerPage;
            var skip = (currentPage - 1) * +itemsPerPage;
            var searchTerm = this.searchTerm$.value;
            var tags = (_a = this.filterByTags$.value) === null || _a === void 0 ? void 0 : _a.map(function (t) { return t.value; });
            this.listQuery.ref.refetch({
                options: {
                    skip: skip,
                    take: take,
                    filter: {
                        name: {
                            contains: searchTerm,
                        },
                    },
                    sort: {
                        createdAt: exports.SortOrder.DESC,
                    },
                    tags: tags,
                    tagsOperator: exports.LogicalOperator.AND,
                },
            });
        };
        return AssetPickerDialogComponent;
    }());
    AssetPickerDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-asset-picker-dialog',
                    template: "<ng-template vdrDialogTitle>\n    <div class=\"title-row\">\n        <span>{{ 'asset.select-assets' | translate }}</span>\n        <div class=\"flex-spacer\"></div>\n        <vdr-asset-file-input\n            class=\"ml3\"\n            (selectFiles)=\"createAssets($event)\"\n            [uploading]=\"uploading\"\n            dropZoneTarget=\".modal-content\"\n        ></vdr-asset-file-input>\n    </div>\n</ng-template>\n<vdr-asset-search-input\n    class=\"mb2\"\n    [tags]=\"allTags$ | async\"\n    (searchTermChange)=\"searchTerm$.next($event)\"\n    (tagsChange)=\"filterByTags$.next($event)\"\n    #assetSearchInputComponent\n></vdr-asset-search-input>\n<vdr-asset-gallery\n    [assets]=\"(assets$ | async)! | paginate: paginationConfig\"\n    [multiSelect]=\"multiSelect\"\n    (selectionChange)=\"selection = $event\"\n></vdr-asset-gallery>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        (itemsPerPageChange)=\"itemsPerPageChange($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"paginationConfig.currentPage\"\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        [totalItems]=\"paginationConfig.totalItems\"\n        (pageChange)=\"pageChange($event)\"\n    ></vdr-pagination-controls>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"selection.length === 0\">\n        {{ 'asset.add-asset-with-count' | translate: { count: selection.length } }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;flex-direction:column;height:70vh}.title-row{display:flex;align-items:center;justify-content:space-between}vdr-asset-gallery{flex:1}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between;flex-shrink:0}"]
                },] }
    ];
    AssetPickerDialogComponent.ctorParameters = function () { return [
        { type: DataService },
        { type: NotificationService }
    ]; };
    AssetPickerDialogComponent.propDecorators = {
        assetSearchInputComponent: [{ type: i0.ViewChild, args: ['assetSearchInputComponent',] }]
    };

    var ManageTagsDialogComponent = /** @class */ (function () {
        function ManageTagsDialogComponent(dataService) {
            this.dataService = dataService;
            this.toDelete = [];
            this.toUpdate = [];
        }
        ManageTagsDialogComponent.prototype.ngOnInit = function () {
            this.allTags$ = this.dataService.product.getTagList().mapStream(function (data) { return data.tags.items; });
        };
        ManageTagsDialogComponent.prototype.toggleDelete = function (id) {
            var marked = this.markedAsDeleted(id);
            if (marked) {
                this.toDelete = this.toDelete.filter(function (_id) { return _id !== id; });
            }
            else {
                this.toDelete.push(id);
            }
        };
        ManageTagsDialogComponent.prototype.markedAsDeleted = function (id) {
            return this.toDelete.includes(id);
        };
        ManageTagsDialogComponent.prototype.updateTagValue = function (id, value) {
            var exists = this.toUpdate.find(function (i) { return i.id === id; });
            if (exists) {
                exists.value = value;
            }
            else {
                this.toUpdate.push({ id: id, value: value });
            }
        };
        ManageTagsDialogComponent.prototype.saveChanges = function () {
            var e_1, _a, e_2, _b;
            var _this = this;
            var operations = [];
            try {
                for (var _c = __values(this.toDelete), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var id = _d.value;
                    operations.push(this.dataService.product.deleteTag(id));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _e = __values(this.toUpdate), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var item = _f.value;
                    if (!this.toDelete.includes(item.id)) {
                        operations.push(this.dataService.product.updateTag(item));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return rxjs.forkJoin(operations).subscribe(function () { return _this.resolveWith(true); });
        };
        return ManageTagsDialogComponent;
    }());
    ManageTagsDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-manage-tags-dialog',
                    template: "<ng-template vdrDialogTitle>\n    <span>{{ 'common.manage-tags' | translate }}</span>\n</ng-template>\n<p class=\"mt0 mb4\">{{ 'common.manage-tags-description' | translate }}</p>\n<ul class=\"tag-list\" *ngFor=\"let tag of allTags$ | async\">\n    <li class=\"mb2 p1\" [class.to-delete]=\"markedAsDeleted(tag.id)\">\n        <clr-icon shape=\"tag\" class=\"is-solid mr2\" [style.color]=\"tag.value | stringToColor\"></clr-icon>\n        <input type=\"text\" (input)=\"updateTagValue(tag.id, $event.target.value)\" [value]=\"tag.value\" />\n        <button class=\"icon-button\" (click)=\"toggleDelete(tag.id)\">\n            <clr-icon shape=\"trash\" class=\"is-danger\" [class.is-solid]=\"markedAsDeleted(tag.id)\"></clr-icon>\n        </button>\n    </li>\n</ul>\n<ng-template vdrDialogButtons>\n    <button type=\"submit\" (click)=\"resolveWith(false)\" class=\"btn btn-secondary\">\n        {{ 'common.cancel' | translate }}\n    </button>\n    <button\n        type=\"submit\"\n        (click)=\"saveChanges()\"\n        class=\"btn btn-primary\"\n        [disabled]=\"!toUpdate.length && !toDelete.length\"\n    >\n        {{ 'common.update' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".tag-list{list-style-type:none}.tag-list li{display:flex;align-items:center}.tag-list li input{max-width:170px}.tag-list li.to-delete{opacity:.7;background-color:var(--color-component-bg-300)}.tag-list li.to-delete input{background-color:transparent!important}"]
                },] }
    ];
    ManageTagsDialogComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };

    var AssetPreviewComponent = /** @class */ (function () {
        function AssetPreviewComponent(formBuilder, dataService, notificationService, changeDetector, modalService) {
            this.formBuilder = formBuilder;
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.changeDetector = changeDetector;
            this.modalService = modalService;
            this.editable = false;
            this.customFields = [];
            this.assetChange = new i0.EventEmitter();
            this.editClick = new i0.EventEmitter();
            this.size = 'medium';
            this.width = 0;
            this.height = 0;
            this.centered = true;
            this.settingFocalPoint = false;
        }
        Object.defineProperty(AssetPreviewComponent.prototype, "fpx", {
            get: function () {
                return this.asset.focalPoint ? this.asset.focalPoint.x : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AssetPreviewComponent.prototype, "fpy", {
            get: function () {
                return this.asset.focalPoint ? this.asset.focalPoint.y : null;
            },
            enumerable: false,
            configurable: true
        });
        AssetPreviewComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a;
            var focalPoint = this.asset.focalPoint;
            this.form = this.formBuilder.group({
                name: [this.asset.name],
                tags: [(_a = this.asset.tags) === null || _a === void 0 ? void 0 : _a.map(function (t) { return t.value; })],
            });
            this.subscription = this.form.valueChanges.subscribe(function (value) {
                _this.assetChange.emit({
                    id: _this.asset.id,
                    name: value.name,
                    tags: value.tags,
                });
            });
            this.subscription.add(rxjs.fromEvent(window, 'resize')
                .pipe(operators.debounceTime(50))
                .subscribe(function () {
                _this.updateDimensions();
                _this.changeDetector.markForCheck();
            }));
        };
        AssetPreviewComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        AssetPreviewComponent.prototype.customFieldIsSet = function (name) {
            var _a;
            return !!((_a = this.customFieldsForm) === null || _a === void 0 ? void 0 : _a.get([name]));
        };
        AssetPreviewComponent.prototype.getSourceFileName = function () {
            var parts = this.asset.source.split('/');
            return parts[parts.length - 1];
        };
        AssetPreviewComponent.prototype.onImageLoad = function () {
            this.updateDimensions();
            this.changeDetector.markForCheck();
        };
        AssetPreviewComponent.prototype.updateDimensions = function () {
            var img = this.imageElementRef.nativeElement;
            var container = this.previewDivRef.nativeElement;
            var imgWidth = img.naturalWidth;
            var imgHeight = img.naturalHeight;
            var containerWidth = container.offsetWidth;
            var containerHeight = container.offsetHeight;
            var constrainToContainer = this.settingFocalPoint;
            if (constrainToContainer) {
                var controlsMarginPx = 48 * 2;
                var availableHeight = containerHeight - controlsMarginPx;
                var availableWidth = containerWidth;
                var hRatio = imgHeight / availableHeight;
                var wRatio = imgWidth / availableWidth;
                var imageExceedsAvailableDimensions = 1 < hRatio || 1 < wRatio;
                if (imageExceedsAvailableDimensions) {
                    var factor = hRatio < wRatio ? wRatio : hRatio;
                    this.width = Math.round(imgWidth / factor);
                    this.height = Math.round(imgHeight / factor);
                    this.centered = true;
                    return;
                }
            }
            this.width = imgWidth;
            this.height = imgHeight;
            this.centered = imgWidth <= containerWidth && imgHeight <= containerHeight;
        };
        AssetPreviewComponent.prototype.setFocalPointStart = function () {
            this.sizePriorToSettingFocalPoint = this.size;
            this.size = 'medium';
            this.settingFocalPoint = true;
            this.lastFocalPoint = this.asset.focalPoint || { x: 0.5, y: 0.5 };
            this.updateDimensions();
        };
        AssetPreviewComponent.prototype.removeFocalPoint = function () {
            var _this = this;
            this.dataService.product
                .updateAsset({
                id: this.asset.id,
                focalPoint: null,
            })
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('asset.update-focal-point-success'));
                _this.asset = Object.assign(Object.assign({}, _this.asset), { focalPoint: null });
                _this.changeDetector.markForCheck();
            }, function () { return _this.notificationService.error(ngxTranslateExtractMarker.marker('asset.update-focal-point-error')); });
        };
        AssetPreviewComponent.prototype.onFocalPointChange = function (point) {
            this.lastFocalPoint = point;
        };
        AssetPreviewComponent.prototype.setFocalPointCancel = function () {
            this.settingFocalPoint = false;
            this.lastFocalPoint = undefined;
            this.size = this.sizePriorToSettingFocalPoint;
        };
        AssetPreviewComponent.prototype.setFocalPointEnd = function () {
            var _this = this;
            this.settingFocalPoint = false;
            this.size = this.sizePriorToSettingFocalPoint;
            if (this.lastFocalPoint) {
                var _b = this.lastFocalPoint, x_1 = _b.x, y_1 = _b.y;
                this.lastFocalPoint = undefined;
                this.dataService.product
                    .updateAsset({
                    id: this.asset.id,
                    focalPoint: { x: x_1, y: y_1 },
                })
                    .subscribe(function () {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('asset.update-focal-point-success'));
                    _this.asset = Object.assign(Object.assign({}, _this.asset), { focalPoint: { x: x_1, y: y_1 } });
                    _this.changeDetector.markForCheck();
                }, function () { return _this.notificationService.error(ngxTranslateExtractMarker.marker('asset.update-focal-point-error')); });
            }
        };
        AssetPreviewComponent.prototype.manageTags = function () {
            var _this = this;
            this.modalService
                .fromComponent(ManageTagsDialogComponent, {
                size: 'sm',
            })
                .subscribe(function (result) {
                if (result) {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-updated-tags-success'));
                }
            });
        };
        return AssetPreviewComponent;
    }());
    AssetPreviewComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-asset-preview',
                    template: "<div class=\"preview-image\" #previewDiv [class.centered]=\"centered\">\n    <div class=\"image-wrapper\">\n        <vdr-focal-point-control\n            [width]=\"width\"\n            [height]=\"height\"\n            [fpx]=\"fpx\"\n            [fpy]=\"fpy\"\n            [editable]=\"settingFocalPoint\"\n            (focalPointChange)=\"onFocalPointChange($event)\"\n        >\n            <img\n                class=\"asset-image\"\n                [src]=\"asset | assetPreview: size\"\n                #imageElement\n                (load)=\"onImageLoad()\"\n            />\n        </vdr-focal-point-control>\n        <div class=\"focal-point-info\" *ngIf=\"settingFocalPoint\">\n            <button class=\"icon-button\" (click)=\"setFocalPointCancel()\">\n                <clr-icon shape=\"times\"></clr-icon>\n            </button>\n            <button class=\"btn btn-primary btn-sm\" (click)=\"setFocalPointEnd()\" [disabled]=\"!lastFocalPoint\">\n                <clr-icon shape=\"crosshairs\"></clr-icon>\n                {{ 'asset.set-focal-point' | translate }}\n            </button>\n        </div>\n    </div>\n</div>\n\n<div class=\"controls\" [class.fade]=\"settingFocalPoint\">\n    <form [formGroup]=\"form\">\n        <clr-input-container class=\"name-input\" *ngIf=\"editable\">\n            <label>{{ 'common.name' | translate }}</label>\n            <input\n                clrInput\n                type=\"text\"\n                formControlName=\"name\"\n                [readonly]=\"!(['UpdateCatalog', 'UpdateAsset'] | hasPermission) || settingFocalPoint\"\n            />\n        </clr-input-container>\n\n        <vdr-labeled-data [label]=\"'common.name' | translate\" *ngIf=\"!editable\">\n            <span class=\"elide\">\n                {{ asset.name }}\n            </span>\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.source-file' | translate\">\n            <a [href]=\"asset.source\" [title]=\"asset.source\" target=\"_blank\" class=\"elide source-link\">{{\n                getSourceFileName()\n            }}</a>\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.original-asset-size' | translate\">\n            {{ asset.fileSize | filesize }}\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.dimensions' | translate\">\n            {{ asset.width }} x {{ asset.height }}\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.focal-point' | translate\">\n            <span *ngIf=\"fpx\"\n                ><clr-icon shape=\"crosshairs\"></clr-icon> x: {{ fpx | number: '1.2-2' }}, y:\n                {{ fpy | number: '1.2-2' }}</span\n            >\n            <span *ngIf=\"!fpx\">{{ 'common.not-set' | translate }}</span>\n            <br />\n            <button\n                class=\"btn btn-secondary-outline btn-sm\"\n                [disabled]=\"settingFocalPoint\"\n                (click)=\"setFocalPointStart()\"\n            >\n                <ng-container *ngIf=\"!fpx\">{{ 'asset.set-focal-point' | translate }}</ng-container>\n                <ng-container *ngIf=\"fpx\">{{ 'asset.update-focal-point' | translate }}</ng-container>\n            </button>\n            <button\n                class=\"btn btn-warning-outline btn-sm\"\n                [disabled]=\"settingFocalPoint\"\n                *ngIf=\"!!fpx\"\n                (click)=\"removeFocalPoint()\"\n            >\n                {{ 'asset.unset-focal-point' | translate }}\n            </button>\n        </vdr-labeled-data>\n        <vdr-labeled-data [label]=\"'common.tags' | translate\">\n            <ng-container *ngIf=\"editable\">\n                <vdr-tag-selector formControlName=\"tags\"></vdr-tag-selector>\n                <button class=\"btn btn-link btn-sm\" (click)=\"manageTags()\">\n                    <clr-icon shape=\"tags\"></clr-icon>\n                    {{ 'common.manage-tags' | translate }}\n                </button>\n            </ng-container>\n            <div *ngIf=\"!editable\">\n                <vdr-chip *ngFor=\"let tag of asset.tags\" [colorFrom]=\"tag.value\">\n                    <clr-icon shape=\"tag\" class=\"mr2\"></clr-icon>\n                    {{ tag.value }}</vdr-chip\n                >\n            </div>\n        </vdr-labeled-data>\n    </form>\n    <section *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <ng-container *ngFor=\"let customField of customFields\">\n            <vdr-custom-field-control\n                *ngIf=\"customFieldIsSet(customField.name)\"\n                entityName=\"Asset\"\n                [compact]=\"true\"\n                [customFieldsFormGroup]=\"customFieldsForm\"\n                [customField]=\"customField\"\n            ></vdr-custom-field-control>\n        </ng-container>\n    </section>\n    <div class=\"flex-spacer\"></div>\n    <div class=\"preview-select\">\n        <clr-select-container>\n            <label>{{ 'asset.preview' | translate }}</label>\n            <select clrSelect name=\"options\" [(ngModel)]=\"size\" [disabled]=\"settingFocalPoint\">\n                <option value=\"tiny\">tiny</option>\n                <option value=\"thumb\">thumb</option>\n                <option value=\"small\">small</option>\n                <option value=\"medium\">medium</option>\n                <option value=\"large\">large</option>\n                <option value=\"\">full size</option>\n            </select>\n        </clr-select-container>\n        <div class=\"asset-detail\">{{ width }} x {{ height }}</div>\n    </div>\n    <a\n        *ngIf=\"!editable\"\n        class=\"btn btn-link btn-sm\"\n        [routerLink]=\"['/catalog', 'assets', asset.id]\"\n        (click)=\"editClick.emit()\"\n    >\n        <clr-icon shape=\"edit\"></clr-icon> {{ 'common.edit' | translate }}\n    </a>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;height:100%}.preview-image{width:100%;height:100%;min-height:60vh;overflow:auto;text-align:center;box-shadow:inset 0 0 5px 0 rgba(0,0,0,.1);background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACuoAAArqAVDM774AAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAK0lEQVQ4T2P4jwP8xgFGNSADqDwGIF0DlMYAUH0YYFQDMoDKYwASNfz/DwB/JvcficphowAAAABJRU5ErkJggg==\");flex:1}.preview-image.centered{display:flex;align-items:center;justify-content:center}.preview-image vdr-focal-point-control{position:relative;box-shadow:0 0 10px -3px rgba(0,0,0,.15)}.preview-image .image-wrapper{position:relative}.preview-image .asset-image{width:100%}.preview-image .focal-point-info{position:absolute;display:flex;right:0}.controls{display:flex;flex-direction:column;margin-left:12px;min-width:15vw;max-width:25vw;transition:opacity .3s}.controls.fade{opacity:.5}.controls .name-input{margin-bottom:24px}.controls ::ng-deep .clr-control-container,.controls ::ng-deep .clr-control-container .clr-input{width:100%}.controls .elide{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;display:block}.controls .source-link{direction:rtl}.controls .preview-select{display:flex;align-items:center;margin-bottom:12px}.controls .preview-select clr-select-container{margin-right:12px}"]
                },] }
    ];
    AssetPreviewComponent.ctorParameters = function () { return [
        { type: forms.FormBuilder },
        { type: DataService },
        { type: NotificationService },
        { type: i0.ChangeDetectorRef },
        { type: ModalService }
    ]; };
    AssetPreviewComponent.propDecorators = {
        asset: [{ type: i0.Input }],
        editable: [{ type: i0.Input }],
        customFields: [{ type: i0.Input }],
        customFieldsForm: [{ type: i0.Input }],
        assetChange: [{ type: i0.Output }],
        editClick: [{ type: i0.Output }],
        imageElementRef: [{ type: i0.ViewChild, args: ['imageElement', { static: true },] }],
        previewDivRef: [{ type: i0.ViewChild, args: ['previewDiv', { static: true },] }]
    };

    /**
     * A custom SelectionModel for the NgSelect component which only allows a single
     * search term at a time.
     */
    var SingleSearchSelectionModel = /** @class */ (function () {
        function SingleSearchSelectionModel() {
            this._selected = [];
        }
        Object.defineProperty(SingleSearchSelectionModel.prototype, "value", {
            get: function () {
                return this._selected;
            },
            enumerable: false,
            configurable: true
        });
        SingleSearchSelectionModel.prototype.select = function (item, multiple, groupAsModel) {
            item.selected = true;
            if (groupAsModel || !item.children) {
                if (item.value.label) {
                    var isSearchTerm_1 = function (i) { return !!i.value.label; };
                    var searchTerms = this._selected.filter(isSearchTerm_1);
                    if (searchTerms.length > 0) {
                        // there is already a search term, so replace it with this new one.
                        this._selected = this._selected.filter(function (i) { return !isSearchTerm_1(i); }).concat(item);
                    }
                    else {
                        this._selected.push(item);
                    }
                }
                else {
                    this._selected.push(item);
                }
            }
        };
        SingleSearchSelectionModel.prototype.unselect = function (item, multiple) {
            this._selected = this._selected.filter(function (x) { return x !== item; });
            item.selected = false;
        };
        SingleSearchSelectionModel.prototype.clear = function (keepDisabled) {
            this._selected = keepDisabled ? this._selected.filter(function (x) { return x.disabled; }) : [];
        };
        SingleSearchSelectionModel.prototype._setChildrenSelectedState = function (children, selected) {
            children.forEach(function (x) { return (x.selected = selected); });
        };
        SingleSearchSelectionModel.prototype._removeChildren = function (parent) {
            this._selected = this._selected.filter(function (x) { return x.parent !== parent; });
        };
        SingleSearchSelectionModel.prototype._removeParent = function (parent) {
            this._selected = this._selected.filter(function (x) { return x !== parent; });
        };
        return SingleSearchSelectionModel;
    }());
    function SingleSearchSelectionModelFactory() {
        return new SingleSearchSelectionModel();
    }

    var ɵ0 = SingleSearchSelectionModelFactory;
    var AssetSearchInputComponent = /** @class */ (function () {
        function AssetSearchInputComponent() {
            var _this = this;
            this.searchTermChange = new i0.EventEmitter();
            this.tagsChange = new i0.EventEmitter();
            this.lastTerm = '';
            this.lastTagIds = [];
            this.filterTagResults = function (term, item) {
                if (!_this.isTag(item)) {
                    return false;
                }
                return item.value.toLowerCase().startsWith(term.toLowerCase());
            };
            this.isTag = function (input) {
                return typeof input === 'object' && !!input && input.hasOwnProperty('value');
            };
        }
        AssetSearchInputComponent.prototype.setSearchTerm = function (term) {
            var _this = this;
            if (term) {
                this.selectComponent.select({ label: term, value: { label: term } });
            }
            else {
                var currentTerm = this.selectComponent.selectedItems.find(function (i) { return !_this.isTag(i.value); });
                if (currentTerm) {
                    this.selectComponent.unselect(currentTerm);
                }
            }
        };
        AssetSearchInputComponent.prototype.setTags = function (tags) {
            var _this = this;
            var items = this.selectComponent.items;
            this.selectComponent.selectedItems.forEach(function (item) {
                if (_this.isTag(item.value) && !tags.map(function (t) { return t.id; }).includes(item.id)) {
                    _this.selectComponent.unselect(item);
                }
            });
            tags.map(function (tag) {
                return items.find(function (item) { return _this.isTag(item) && item.id === tag.id; });
            })
                .filter(sharedUtils.notNullOrUndefined)
                .forEach(function (item) {
                var isSelected = _this.selectComponent.selectedItems.find(function (i) {
                    var val = i.value;
                    if (_this.isTag(val)) {
                        return val.id === item.id;
                    }
                    return false;
                });
                if (!isSelected) {
                    _this.selectComponent.select({ label: '', value: item });
                }
            });
        };
        AssetSearchInputComponent.prototype.onSelectChange = function (selectedItems) {
            var _this = this;
            if (!Array.isArray(selectedItems)) {
                selectedItems = [selectedItems];
            }
            var searchTermItems = selectedItems.filter(function (item) { return !_this.isTag(item); });
            if (1 < searchTermItems.length) {
                for (var i = 0; i < searchTermItems.length - 1; i++) {
                    // this.selectComponent.unselect(searchTermItems[i] as any);
                }
            }
            var searchTermItem = searchTermItems[searchTermItems.length - 1];
            var searchTerm = searchTermItem ? searchTermItem.label : '';
            var tags = selectedItems.filter(this.isTag);
            if (searchTerm !== this.lastTerm) {
                this.searchTermChange.emit(searchTerm);
                this.lastTerm = searchTerm;
            }
            if (this.lastTagIds.join(',') !== tags.map(function (t) { return t.id; }).join(',')) {
                this.tagsChange.emit(tags);
                this.lastTagIds = tags.map(function (t) { return t.id; });
            }
        };
        AssetSearchInputComponent.prototype.isSearchHeaderSelected = function () {
            return this.selectComponent.itemsList.markedIndex === -1;
        };
        AssetSearchInputComponent.prototype.addTagFn = function (item) {
            return { label: item };
        };
        return AssetSearchInputComponent;
    }());
    AssetSearchInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-asset-search-input',
                    template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [placeholder]=\"'catalog.search-asset-name-or-tag' | translate\"\n    [items]=\"tags\"\n    [searchFn]=\"filterTagResults\"\n    [hideSelected]=\"true\"\n    [multiple]=\"true\"\n    [markFirst]=\"false\"\n    (change)=\"onSelectChange($event)\"\n    #selectComponent\n>\n    <ng-template ng-header-tmp>\n        <div\n            class=\"search-header\"\n            *ngIf=\"selectComponent.searchTerm\"\n            [class.selected]=\"isSearchHeaderSelected()\"\n            (click)=\"selectComponent.selectTag()\"\n        >\n            {{ 'catalog.search-for-term' | translate }}: {{ selectComponent.searchTerm }}\n        </div>\n    </ng-template>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <ng-container *ngIf=\"item.value\">\n            <vdr-chip [colorFrom]=\"item.value\" icon=\"close\" (iconClick)=\"clear(item)\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ item.value }}</vdr-chip>\n        </ng-container>\n        <ng-container *ngIf=\"!item.value\">\n            <vdr-chip [icon]=\"'times'\" (iconClick)=\"clear(item)\">\"{{ item.label || item }}\"</vdr-chip>\n        </ng-container>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\" let-search=\"searchTerm\">\n        <ng-container *ngIf=\"item.value\">\n            <vdr-chip [colorFrom]=\"item.value\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ item.value }}</vdr-chip>\n        </ng-container>\n    </ng-template>\n</ng-select>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [{ provide: ngSelect.SELECTION_MODEL_FACTORY, useValue: ɵ0 }],
                    styles: [":host{display:block;width:100%}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}ng-select{width:100%;min-width:300px;margin-right:12px}.search-header{padding:8px 10px;border-bottom:1px solid var(--color-component-border-100);cursor:pointer}.search-header.selected,.search-header:hover{background-color:var(--color-component-bg-200)}"]
                },] }
    ];
    AssetSearchInputComponent.propDecorators = {
        tags: [{ type: i0.Input }],
        searchTermChange: [{ type: i0.Output }],
        tagsChange: [{ type: i0.Output }],
        selectComponent: [{ type: i0.ViewChild, args: ['selectComponent', { static: true },] }]
    };

    var ChannelAssignmentControlComponent = /** @class */ (function () {
        function ChannelAssignmentControlComponent(dataService) {
            this.dataService = dataService;
            this.multiple = true;
            this.includeDefaultChannel = true;
            this.disableChannelIds = [];
            this.value = [];
            this.disabled = false;
        }
        ChannelAssignmentControlComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.channels$ = this.dataService.client.userStatus().single$.pipe(operators.map(function (_b) {
                var userStatus = _b.userStatus;
                return userStatus.channels.filter(function (c) { return _this.includeDefaultChannel ? true : c.code !== sharedConstants.DEFAULT_CHANNEL_CODE; });
            }), operators.tap(function (channels) { return (_this.channels = channels); }));
        };
        ChannelAssignmentControlComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        ChannelAssignmentControlComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        ChannelAssignmentControlComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        ChannelAssignmentControlComponent.prototype.writeValue = function (obj) {
            var _this = this;
            var _a;
            if (Array.isArray(obj)) {
                if (typeof obj[0] === 'string') {
                    this.value = obj.map(function (id) { var _a; return (_a = _this.channels) === null || _a === void 0 ? void 0 : _a.find(function (c) { return c.id === id; }); }).filter(sharedUtils.notNullOrUndefined);
                }
                else {
                    this.value = obj;
                }
            }
            else {
                if (typeof obj === 'string') {
                    var channel = (_a = this.channels) === null || _a === void 0 ? void 0 : _a.find(function (c) { return c.id === obj; });
                    if (channel) {
                        this.value = [channel];
                    }
                }
                else if (obj && obj.id) {
                    this.value = [obj];
                }
            }
        };
        ChannelAssignmentControlComponent.prototype.focussed = function () {
            if (this.onTouched) {
                this.onTouched();
            }
        };
        ChannelAssignmentControlComponent.prototype.channelIsDisabled = function (id) {
            return this.disableChannelIds.includes(id);
        };
        ChannelAssignmentControlComponent.prototype.valueChanged = function (value) {
            if (Array.isArray(value)) {
                this.onChange(value.map(function (c) { return c.id; }));
            }
            else {
                this.onChange([value ? value.id : undefined]);
            }
        };
        ChannelAssignmentControlComponent.prototype.compareFn = function (c1, c2) {
            var c1id = typeof c1 === 'string' ? c1 : c1.id;
            var c2id = typeof c2 === 'string' ? c2 : c2.id;
            return c1id === c2id;
        };
        return ChannelAssignmentControlComponent;
    }());
    ChannelAssignmentControlComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-channel-assignment-control',
                    template: "<ng-select\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"multiple\"\n    [ngModel]=\"value\"\n    [clearable]=\"false\"\n    [searchable]=\"false\"\n    [disabled]=\"disabled\"\n    [compareWith]=\"compareFn\"\n    (focus)=\"focussed()\"\n    (change)=\"valueChanged($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <span aria-hidden=\"true\" class=\"ng-value-icon left\" (click)=\"clear(item)\"> \u00D7 </span>\n        <vdr-channel-badge [channelCode]=\"item.code\"></vdr-channel-badge>\n        <span class=\"channel-label\">{{ item.code | channelCodeToLabel | translate }}</span>\n    </ng-template>\n    <ng-option *ngFor=\"let item of channels$ | async\" [value]=\"item\" [disabled]=\"channelIsDisabled(item.id)\">\n        <vdr-channel-badge [channelCode]=\"item.code\"></vdr-channel-badge>\n        {{ item.code | channelCodeToLabel | translate }}\n    </ng-option>\n</ng-select>\n\n",
                    changeDetection: i0.ChangeDetectionStrategy.Default,
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: ChannelAssignmentControlComponent,
                            multi: true,
                        },
                    ],
                    styles: [":host{min-width:200px}:host.clr-input{border-bottom:none;padding:0}::ng-deep .ng-option>vdr-channel-badge,::ng-deep .ng-value>vdr-channel-badge{margin-bottom:-1px}::ng-deep .ng-value>vdr-channel-badge{margin-left:6px}.channel-label{margin-right:6px}"]
                },] }
    ];
    ChannelAssignmentControlComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };
    ChannelAssignmentControlComponent.propDecorators = {
        multiple: [{ type: i0.Input }],
        includeDefaultChannel: [{ type: i0.Input }],
        disableChannelIds: [{ type: i0.Input }]
    };

    var ChannelBadgeComponent = /** @class */ (function () {
        function ChannelBadgeComponent() {
        }
        Object.defineProperty(ChannelBadgeComponent.prototype, "isDefaultChannel", {
            get: function () {
                return this.channelCode === sharedConstants.DEFAULT_CHANNEL_CODE;
            },
            enumerable: false,
            configurable: true
        });
        return ChannelBadgeComponent;
    }());
    ChannelBadgeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-channel-badge',
                    template: "<clr-icon shape=\"layers\" [style.color]=\"isDefaultChannel ? '#aaa' : (channelCode | stringToColor)\"></clr-icon>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:inline-block}button :host{margin-bottom:-1px}clr-icon{margin-right:6px}"]
                },] }
    ];
    ChannelBadgeComponent.propDecorators = {
        channelCode: [{ type: i0.Input }]
    };

    /**
     * A chip component for displaying a label with an optional action icon.
     */
    var ChipComponent = /** @class */ (function () {
        function ChipComponent() {
            this.invert = false;
            /**
             * If set, the chip will have an auto-generated background
             * color based on the string value passed in.
             */
            this.colorFrom = '';
            this.iconClick = new i0.EventEmitter();
        }
        return ChipComponent;
    }());
    ChipComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-chip',
                    template: "<div\n    class=\"wrapper\"\n    [class.with-background]=\"!invert && colorFrom\"\n    [style.backgroundColor]=\"!invert && (colorFrom | stringToColor)\"\n    [style.color]=\"invert && (colorFrom | stringToColor)\"\n    [style.borderColor]=\"invert && (colorFrom | stringToColor)\"\n    [ngClass]=\"colorType\"\n>\n    <div class=\"chip-label\"><ng-content></ng-content></div>\n    <div class=\"chip-icon\" *ngIf=\"icon\">\n        <button (click)=\"iconClick.emit($event)\">\n            <clr-icon\n                [attr.shape]=\"icon\"\n                [style.color]=\"invert && (colorFrom | stringToColor)\"\n                [class.is-inverse]=\"!invert && colorFrom\"\n            ></clr-icon>\n        </button>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:inline-block}.wrapper{display:flex;border:1px solid var(--color-component-border-300);border-radius:3px;margin:6px}.wrapper.with-background{color:var(--color-grey-100);border-color:transparent}.wrapper.with-background .chip-label{opacity:.9}.wrapper.warning{border-color:var(--color-chip-warning-border)}.wrapper.warning .chip-label{color:var(--color-chip-warning-text);background-color:var(--color-chip-warning-bg)}.wrapper.success{border-color:var(--color-chip-success-border)}.wrapper.success .chip-label{color:var(--color-chip-success-text);background-color:var(--color-chip-success-bg)}.wrapper.error{border-color:var(--color-chip-error-border)}.wrapper.error .chip-label{color:var(--color-chip-error-text);background-color:var(--color-chip-error-bg)}.chip-label{padding:3px 6px;border-radius:3px;white-space:nowrap;align-items:center}.chip-icon,.chip-label{line-height:1em;display:flex}.chip-icon{border-left:1px solid var(--color-component-border-200);padding:0 3px}.chip-icon button{cursor:pointer;background:none;margin:0;padding:0;border:none}"]
                },] }
    ];
    ChipComponent.propDecorators = {
        icon: [{ type: i0.Input }],
        invert: [{ type: i0.Input }],
        colorFrom: [{ type: i0.Input }],
        colorType: [{ type: i0.Input }],
        iconClick: [{ type: i0.Output }]
    };

    /**
     * ConfigArg values are always stored as strings. If they are not primitives, then
     * they are JSON-encoded. This function unwraps them back into their original
     * data type.
     */
    function getConfigArgValue(value) {
        try {
            return value ? JSON.parse(value) : undefined;
        }
        catch (e) {
            return value;
        }
    }
    function encodeConfigArgValue(value) {
        return Array.isArray(value) ? JSON.stringify(value) : (value !== null && value !== void 0 ? value : '').toString();
    }
    /**
     * Creates an empty ConfigurableOperation object based on the definition.
     */
    function configurableDefinitionToInstance(def) {
        return Object.assign(Object.assign({}, def), { args: def.args.map(function (arg) {
                return Object.assign(Object.assign({}, arg), { value: getDefaultConfigArgValue(arg) });
            }) });
    }
    /**
     * Converts an object of the type:
     * ```
     * {
     *     code: 'my-operation',
     *     args: {
     *         someProperty: 'foo'
     *     }
     * }
     * ```
     * to the format defined by the ConfigurableOperationInput GraphQL input type:
     * ```
     * {
     *     code: 'my-operation',
     *     args: [
     *         { name: 'someProperty', value: 'foo' }
     *     ]
     * }
     * ```
     */
    function toConfigurableOperationInput(operation, formValueOperations) {
        return {
            code: operation.code,
            arguments: Object.values(formValueOperations.args || {}).map(function (value, j) { return ({
                name: operation.args[j].name,
                value: value.hasOwnProperty('value')
                    ? encodeConfigArgValue(value.value)
                    : encodeConfigArgValue(value),
            }); }),
        };
    }
    function configurableOperationValueIsValid(def, value) {
        var e_1, _b;
        if (!def || !value) {
            return false;
        }
        if (def.code !== value.code) {
            return false;
        }
        try {
            for (var _c = __values(def.args), _d = _c.next(); !_d.done; _d = _c.next()) {
                var argDef = _d.value;
                var argVal = value.args[argDef.name];
                if (argDef.required && (argVal == null || argVal === '' || argVal === '0')) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    }
    /**
     * Returns a default value based on the type of the config arg.
     */
    function getDefaultConfigArgValue(arg) {
        var _a;
        return arg.list ? [] : (_a = arg.defaultValue) !== null && _a !== void 0 ? _a : null;
    }

    /**
     * Interpolates the description of an ConfigurableOperation with the given values.
     */
    function interpolateDescription(operation, values) {
        if (!operation) {
            return '';
        }
        var templateString = operation.description;
        var interpolated = templateString.replace(/{\s*([a-zA-Z0-9]+)\s*}/gi, function (substring, argName) {
            var normalizedArgName = argName.toLowerCase();
            var value = values[normalizedArgName];
            if (value == null) {
                return '_';
            }
            var formatted = value;
            var argDef = operation.args.find(function (arg) { return arg.name === normalizedArgName; });
            if (argDef && argDef.type === 'int' && argDef.ui && argDef.ui.component === 'currency-form-input') {
                formatted = value / 100;
            }
            if (argDef && argDef.type === 'datetime' && value instanceof Date) {
                formatted = value.toLocaleDateString();
            }
            return formatted;
        });
        return interpolated;
    }

    /**
     * A form input which renders a card with the internal form fields of the given ConfigurableOperation.
     */
    var ConfigurableInputComponent = /** @class */ (function () {
        function ConfigurableInputComponent() {
            this.readonly = false;
            this.removable = true;
            this.remove = new i0.EventEmitter();
            this.argValues = {};
            this.form = new forms.FormGroup({});
        }
        ConfigurableInputComponent.prototype.interpolateDescription = function () {
            if (this.operationDefinition) {
                return interpolateDescription(this.operationDefinition, this.form.value);
            }
            else {
                return '';
            }
        };
        ConfigurableInputComponent.prototype.ngOnChanges = function (changes) {
            if ('operation' in changes || 'operationDefinition' in changes) {
                this.createForm();
            }
        };
        ConfigurableInputComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        ConfigurableInputComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        ConfigurableInputComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        ConfigurableInputComponent.prototype.setDisabledState = function (isDisabled) {
            if (isDisabled) {
                this.form.disable();
            }
            else {
                this.form.enable();
            }
        };
        ConfigurableInputComponent.prototype.writeValue = function (value) {
            if (value) {
                this.form.patchValue(value);
            }
        };
        ConfigurableInputComponent.prototype.trackByName = function (index, arg) {
            return arg.name;
        };
        ConfigurableInputComponent.prototype.getArgDef = function (arg) {
            var _a;
            return (_a = this.operationDefinition) === null || _a === void 0 ? void 0 : _a.args.find(function (a) { return a.name === arg.name; });
        };
        ConfigurableInputComponent.prototype.createForm = function () {
            var e_1, _c;
            var _this = this;
            var _a, _b;
            if (!this.operation) {
                return;
            }
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.form = new forms.FormGroup({});
            this.form.__id = Math.random().toString(36).substr(10);
            if (this.operation.args) {
                var _loop_1 = function (arg) {
                    var value = (_b = this_1.operation.args.find(function (a) { return a.name === arg.name; })) === null || _b === void 0 ? void 0 : _b.value;
                    if (value === undefined) {
                        value = getDefaultConfigArgValue(arg);
                    }
                    var validators = arg.list ? undefined : arg.required ? forms.Validators.required : undefined;
                    this_1.form.addControl(arg.name, new forms.FormControl(value, validators));
                };
                var this_1 = this;
                try {
                    for (var _d = __values(((_a = this.operationDefinition) === null || _a === void 0 ? void 0 : _a.args) || []), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var arg = _e.value;
                        _loop_1(arg);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            this.subscription = this.form.valueChanges.subscribe(function (value) {
                if (_this.onChange) {
                    _this.onChange({
                        code: _this.operation && _this.operation.code,
                        args: value,
                    });
                }
                if (_this.onTouch) {
                    _this.onTouch();
                }
            });
        };
        ConfigurableInputComponent.prototype.validate = function (c) {
            if (this.form.invalid) {
                return {
                    required: true,
                };
            }
            return null;
        };
        return ConfigurableInputComponent;
    }());
    ConfigurableInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-configurable-input',
                    template: "<div class=\"card\" *ngIf=\"operation\">\n    <div class=\"card-block\">{{ interpolateDescription() }}</div>\n    <div class=\"card-block\" *ngIf=\"operation.args?.length\">\n        <form [formGroup]=\"form\" *ngIf=\"operation\" class=\"operation-inputs\">\n            <div *ngFor=\"let arg of operation.args; trackBy: trackByName\" class=\"arg-row\">\n                <ng-container *ngIf=\"form.get(arg.name)\">\n                    <label>{{ getArgDef(arg)?.label || (arg.name | sentenceCase) }}</label>\n                    <vdr-dynamic-form-input\n                        [def]=\"getArgDef(arg)\"\n                        [readonly]=\"readonly\"\n                        [control]=\"form.get(arg.name)\"\n                        [formControlName]=\"arg.name\"\n                    ></vdr-dynamic-form-input>\n                </ng-container>\n            </div>\n        </form>\n    </div>\n    <div class=\"card-footer\" *ngIf=\"!readonly && removable\">\n        <button class=\"btn btn-sm btn-link btn-warning\" (click)=\"remove.emit(operation)\">\n            <clr-icon shape=\"times\"></clr-icon>\n            {{ 'common.remove' | translate }}\n        </button>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: ConfigurableInputComponent,
                            multi: true,
                        },
                        {
                            provide: forms.NG_VALIDATORS,
                            useExisting: i0.forwardRef(function () { return ConfigurableInputComponent; }),
                            multi: true,
                        },
                    ],
                    styles: [":host{display:block;margin-bottom:12px}:host>.card{margin-top:6px}.operation-inputs{padding-top:0}.operation-inputs .arg-row:not(:last-child){margin-bottom:24px}.operation-inputs .arg-row label{margin-right:6px}.operation-inputs .hidden{display:none}"]
                },] }
    ];
    ConfigurableInputComponent.propDecorators = {
        operation: [{ type: i0.Input }],
        operationDefinition: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        removable: [{ type: i0.Input }],
        remove: [{ type: i0.Output }]
    };

    /**
     * A form input control which displays currency in decimal format, whilst working
     * with the integer cent value in the background.
     */
    var CurrencyInputComponent = /** @class */ (function () {
        function CurrencyInputComponent(dataService, changeDetectorRef) {
            this.dataService = dataService;
            this.changeDetectorRef = changeDetectorRef;
            this.disabled = false;
            this.readonly = false;
            this.currencyCode = '';
            this.valueChange = new i0.EventEmitter();
            this.currencyCode$ = new rxjs.BehaviorSubject('');
        }
        CurrencyInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            var languageCode$ = this.dataService.client.uiState().mapStream(function (data) { return data.uiState.language; });
            var shouldPrefix$ = rxjs.combineLatest(languageCode$, this.currencyCode$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), languageCode = _b[0], currencyCode = _b[1];
                if (!currencyCode) {
                    return '';
                }
                var locale = languageCode.replace(/_/g, '-');
                var localised = new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: currencyCode,
                    currencyDisplay: 'symbol',
                }).format(undefined);
                return localised.indexOf('NaN') > 0;
            }));
            this.prefix$ = shouldPrefix$.pipe(operators.map(function (shouldPrefix) { return (shouldPrefix ? _this.currencyCode : ''); }));
            this.suffix$ = shouldPrefix$.pipe(operators.map(function (shouldPrefix) { return (shouldPrefix ? '' : _this.currencyCode); }));
        };
        CurrencyInputComponent.prototype.ngOnChanges = function (changes) {
            if ('value' in changes) {
                this.writeValue(changes['value'].currentValue);
            }
            if ('currencyCode' in changes) {
                this.currencyCode$.next(this.currencyCode);
            }
        };
        CurrencyInputComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        CurrencyInputComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        CurrencyInputComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        CurrencyInputComponent.prototype.onInput = function (value) {
            var integerValue = Math.round(+value * 100);
            if (typeof this.onChange === 'function') {
                this.onChange(integerValue);
            }
            this.valueChange.emit(integerValue);
            var delta = Math.abs(Number(this._decimalValue) - Number(value));
            if (0.009 < delta && delta < 0.011) {
                this._decimalValue = this.toNumericString(value);
            }
            else {
                this._decimalValue = value;
            }
        };
        CurrencyInputComponent.prototype.onFocus = function () {
            if (typeof this.onTouch === 'function') {
                this.onTouch();
            }
        };
        CurrencyInputComponent.prototype.writeValue = function (value) {
            var numericValue = +value;
            if (!Number.isNaN(numericValue)) {
                this._decimalValue = this.toNumericString(Math.floor(value) / 100);
            }
        };
        CurrencyInputComponent.prototype.toNumericString = function (value) {
            return Number(value).toFixed(2);
        };
        return CurrencyInputComponent;
    }());
    CurrencyInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-currency-input',
                    template: "<vdr-affixed-input\n    [prefix]=\"prefix$ | async | localeCurrencyName: 'symbol'\"\n    [suffix]=\"suffix$ | async | localeCurrencyName: 'symbol'\"\n>\n    <input\n        type=\"number\"\n        step=\"0.01\"\n        [value]=\"_decimalValue\"\n        [disabled]=\"disabled\"\n        [readonly]=\"readonly\"\n        (input)=\"onInput($event.target.value)\"\n        (focus)=\"onFocus()\"\n    />\n</vdr-affixed-input>\n",
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: CurrencyInputComponent,
                            multi: true,
                        },
                    ],
                    styles: [":host{padding:0;border:none}input{max-width:96px}input[readonly]{background-color:transparent}"]
                },] }
    ];
    CurrencyInputComponent.ctorParameters = function () { return [
        { type: DataService },
        { type: i0.ChangeDetectorRef }
    ]; };
    CurrencyInputComponent.propDecorators = {
        disabled: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        value: [{ type: i0.Input }],
        currencyCode: [{ type: i0.Input }],
        valueChange: [{ type: i0.Output }]
    };

    /**
     * This component renders the appropriate type of form input control based
     * on the "type" property of the provided CustomFieldConfig.
     */
    var CustomFieldControlComponent = /** @class */ (function () {
        function CustomFieldControlComponent(dataService, customFieldComponentService) {
            this.dataService = dataService;
            this.customFieldComponentService = customFieldComponentService;
            this.compact = false;
            this.showLabel = true;
            this.readonly = false;
            this.hasCustomControl = false;
        }
        CustomFieldControlComponent.prototype.getFieldDefinition = function () {
            var config = Object.assign({}, this.customField);
            var id = this.customFieldComponentService.customFieldComponentExists(this.entityName, this.customField.name);
            if (id) {
                config.ui = { component: id };
            }
            switch (config.__typename) {
                case 'IntCustomFieldConfig':
                    return Object.assign(Object.assign({}, config), { min: config.intMin, max: config.intMax, step: config.intStep });
                case 'FloatCustomFieldConfig':
                    return Object.assign(Object.assign({}, config), { min: config.floatMin, max: config.floatMax, step: config.floatStep });
                case 'DateTimeCustomFieldConfig':
                    return Object.assign(Object.assign({}, config), { min: config.datetimeMin, max: config.datetimeMax, step: config.datetimeStep });
                default:
                    return Object.assign({}, config);
            }
        };
        return CustomFieldControlComponent;
    }());
    CustomFieldControlComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-custom-field-control',
                    template: "<div class=\"clr-form-control\" *ngIf=\"compact\">\n    <label for=\"basic\" class=\"clr-control-label\">{{ customField | customFieldLabel }}</label>\n    <div class=\"clr-control-container\">\n        <div class=\"clr-input-wrapper\">\n            <ng-container *ngTemplateOutlet=\"inputs\"></ng-container>\n        </div>\n    </div>\n</div>\n<vdr-form-field [label]=\"customField | customFieldLabel\" [for]=\"customField.name\" *ngIf=\"!compact\">\n    <ng-container *ngTemplateOutlet=\"inputs\"></ng-container>\n</vdr-form-field>\n\n<ng-template #inputs>\n    <ng-container [formGroup]=\"formGroup\">\n        <vdr-dynamic-form-input\n            [formControlName]=\"customField.name\"\n            [readonly]=\"readonly || customField.readonly\"\n            [control]=\"formGroup.get(customField.name)\"\n            [def]=\"getFieldDefinition()\"\n        >\n        </vdr-dynamic-form-input>\n    </ng-container>\n</ng-template>\n",
                    styles: [":host .toggle-switch{margin-top:0;margin-bottom:0}"]
                },] }
    ];
    CustomFieldControlComponent.ctorParameters = function () { return [
        { type: DataService },
        { type: CustomFieldComponentService }
    ]; };
    CustomFieldControlComponent.propDecorators = {
        entityName: [{ type: i0.Input }],
        formGroup: [{ type: i0.Input, args: ['customFieldsFormGroup',] }],
        customField: [{ type: i0.Input }],
        compact: [{ type: i0.Input }],
        showLabel: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        customComponentPlaceholder: [{ type: i0.ViewChild, args: ['customComponentPlaceholder', { read: i0.ViewContainerRef },] }]
    };

    var CustomerLabelComponent = /** @class */ (function () {
        function CustomerLabelComponent() {
        }
        return CustomerLabelComponent;
    }());
    CustomerLabelComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-customer-label',
                    template: "<clr-icon shape=\"user\" [class.is-solid]=\"customer\"></clr-icon>\n<div *ngIf=\"customer\">\n    <a [routerLink]=\"['/customer', 'customers', customer.id]\">\n        {{ customer.firstName }} {{ customer.lastName }}\n    </a>\n</div>\n<div *ngIf=\"!customer\">{{ 'common.guest' | translate }}</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;align-items:center}clr-icon{margin-right:6px}"]
                },] }
    ];
    CustomerLabelComponent.propDecorators = {
        customer: [{ type: i0.Input }]
    };

    var DataTableColumnComponent = /** @class */ (function () {
        function DataTableColumnComponent() {
            /**
             * When set to true, this column will expand to use avaiable width
             */
            this.expand = false;
        }
        return DataTableColumnComponent;
    }());
    DataTableColumnComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-dt-column',
                    template: "\n        <ng-template><ng-content></ng-content></ng-template>\n    "
                },] }
    ];
    DataTableColumnComponent.propDecorators = {
        expand: [{ type: i0.Input }],
        template: [{ type: i0.ViewChild, args: [i0.TemplateRef, { static: true },] }]
    };

    var DataTableComponent = /** @class */ (function () {
        function DataTableComponent() {
            this.allSelectChange = new i0.EventEmitter();
            this.rowSelectChange = new i0.EventEmitter();
            this.pageChange = new i0.EventEmitter();
            this.itemsPerPageChange = new i0.EventEmitter();
        }
        DataTableComponent.prototype.ngAfterContentInit = function () {
            this.rowTemplate = this.templateRefs.last;
        };
        DataTableComponent.prototype.trackByFn = function (index, item) {
            if (item.id != null) {
                return item.id;
            }
            else {
                return index;
            }
        };
        return DataTableComponent;
    }());
    DataTableComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-data-table',
                    template: "<ng-container *ngIf=\"!items || (items && items.length); else emptyPlaceholder\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th *ngIf=\"isRowSelectedFn\" class=\"align-middle\">\n                    <input\n                        type=\"checkbox\"\n                        clrCheckbox\n                        [checked]=\"allSelected\"\n                        (change)=\"allSelectChange.emit()\"\n                    />\n                </th>\n                <th *ngFor=\"let header of columns?.toArray()\" class=\"left\" [class.expand]=\"header.expand\">\n                    <ng-container *ngTemplateOutlet=\"header.template\"></ng-container>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr\n                *ngFor=\"\n                    let item of items\n                        | paginate\n                            : {\n                                  itemsPerPage: itemsPerPage,\n                                  currentPage: currentPage,\n                                  totalItems: totalItems\n                              };\n                    index as i;\n                    trackBy: trackByFn\n                \"\n            >\n                <td *ngIf=\"isRowSelectedFn\" class=\"align-middle\">\n                    <input\n                        type=\"checkbox\"\n                        clrCheckbox\n                        [checked]=\"isRowSelectedFn(item)\"\n                        (change)=\"rowSelectChange.emit(item)\"\n                    />\n                </td>\n                <ng-container\n                    *ngTemplateOutlet=\"rowTemplate; context: { item: item, index: i }\"\n                ></ng-container>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"table-footer\">\n        <vdr-items-per-page-controls\n            *ngIf=\"totalItems\"\n            [itemsPerPage]=\"itemsPerPage\"\n            (itemsPerPageChange)=\"itemsPerPageChange.emit($event)\"\n        ></vdr-items-per-page-controls>\n\n        <vdr-pagination-controls\n            *ngIf=\"totalItems\"\n            [currentPage]=\"currentPage\"\n            [itemsPerPage]=\"itemsPerPage\"\n            [totalItems]=\"totalItems\"\n            (pageChange)=\"pageChange.emit($event)\"\n        ></vdr-pagination-controls>\n    </div>\n</ng-container>\n<ng-template #emptyPlaceholder>\n    <vdr-empty-placeholder [emptyStateLabel]=\"emptyStateLabel\"></vdr-empty-placeholder>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [ngxPagination.PaginationService],
                    styles: [":host{display:block;max-width:100%;overflow:auto}thead th{position:sticky;top:24px;z-index:1}thead th.expand{width:100%}.table-footer{display:flex;align-items:baseline;justify-content:space-between;margin-top:6px}"]
                },] }
    ];
    DataTableComponent.propDecorators = {
        items: [{ type: i0.Input }],
        itemsPerPage: [{ type: i0.Input }],
        currentPage: [{ type: i0.Input }],
        totalItems: [{ type: i0.Input }],
        allSelected: [{ type: i0.Input }],
        isRowSelectedFn: [{ type: i0.Input }],
        emptyStateLabel: [{ type: i0.Input }],
        allSelectChange: [{ type: i0.Output }],
        rowSelectChange: [{ type: i0.Output }],
        pageChange: [{ type: i0.Output }],
        itemsPerPageChange: [{ type: i0.Output }],
        columns: [{ type: i0.ContentChildren, args: [DataTableColumnComponent,] }],
        templateRefs: [{ type: i0.ContentChildren, args: [i0.TemplateRef,] }]
    };

    var dayOfWeekIndex = {
        sun: 0,
        mon: 1,
        tue: 2,
        wed: 3,
        thu: 4,
        fri: 5,
        sat: 6,
    };
    var weekDayNames = [
        ngxTranslateExtractMarker.marker('datetime.weekday-su'),
        ngxTranslateExtractMarker.marker('datetime.weekday-mo'),
        ngxTranslateExtractMarker.marker('datetime.weekday-tu'),
        ngxTranslateExtractMarker.marker('datetime.weekday-we'),
        ngxTranslateExtractMarker.marker('datetime.weekday-th'),
        ngxTranslateExtractMarker.marker('datetime.weekday-fr'),
        ngxTranslateExtractMarker.marker('datetime.weekday-sa'),
    ];

    var DatetimePickerService = /** @class */ (function () {
        function DatetimePickerService() {
            var _this = this;
            this.selectedDatetime$ = new rxjs.BehaviorSubject(null);
            this.viewingDatetime$ = new rxjs.BehaviorSubject(dayjs__default['default']());
            this.min = null;
            this.max = null;
            this.jumping = false;
            this.selected$ = this.selectedDatetime$.pipe(operators.map(function (value) { return value && value.toDate(); }));
            this.viewing$ = this.viewingDatetime$.pipe(operators.map(function (value) { return value.toDate(); }));
            this.weekStartDayIndex = dayOfWeekIndex['mon'];
            this.calendarView$ = rxjs.combineLatest(this.viewingDatetime$, this.selectedDatetime$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), viewing = _b[0], selected = _b[1];
                return _this.generateCalendarView(viewing, selected);
            }));
        }
        DatetimePickerService.prototype.setWeekStartingDay = function (weekStartDay) {
            this.weekStartDayIndex = dayOfWeekIndex[weekStartDay];
        };
        DatetimePickerService.prototype.setMin = function (min) {
            if (typeof min === 'string') {
                this.min = dayjs__default['default'](min);
            }
        };
        DatetimePickerService.prototype.setMax = function (max) {
            if (typeof max === 'string') {
                this.max = dayjs__default['default'](max);
            }
        };
        DatetimePickerService.prototype.selectDatetime = function (date) {
            var viewingValue;
            var selectedValue = null;
            if (date == null || date === '') {
                viewingValue = dayjs__default['default']();
            }
            else {
                viewingValue = dayjs__default['default'](date);
                selectedValue = dayjs__default['default'](date);
            }
            this.selectedDatetime$.next(selectedValue);
            this.viewingDatetime$.next(viewingValue);
        };
        DatetimePickerService.prototype.selectHour = function (hourOfDay) {
            var current = this.selectedDatetime$.value || dayjs__default['default']();
            var next = current.hour(hourOfDay);
            this.selectedDatetime$.next(next);
            this.viewingDatetime$.next(next);
        };
        DatetimePickerService.prototype.selectMinute = function (minutePastHour) {
            var current = this.selectedDatetime$.value || dayjs__default['default']();
            var next = current.minute(minutePastHour);
            this.selectedDatetime$.next(next);
            this.viewingDatetime$.next(next);
        };
        DatetimePickerService.prototype.viewNextMonth = function () {
            this.jumping = false;
            var current = this.viewingDatetime$.value;
            this.viewingDatetime$.next(current.add(1, 'month'));
        };
        DatetimePickerService.prototype.viewPrevMonth = function () {
            this.jumping = false;
            var current = this.viewingDatetime$.value;
            this.viewingDatetime$.next(current.subtract(1, 'month'));
        };
        DatetimePickerService.prototype.viewToday = function () {
            this.jumping = false;
            this.viewingDatetime$.next(dayjs__default['default']());
        };
        DatetimePickerService.prototype.viewJumpDown = function () {
            this.jumping = true;
            var current = this.viewingDatetime$.value;
            this.viewingDatetime$.next(current.add(1, 'week'));
        };
        DatetimePickerService.prototype.viewJumpUp = function () {
            this.jumping = true;
            var current = this.viewingDatetime$.value;
            this.viewingDatetime$.next(current.subtract(1, 'week'));
        };
        DatetimePickerService.prototype.viewJumpRight = function () {
            this.jumping = true;
            var current = this.viewingDatetime$.value;
            this.viewingDatetime$.next(current.add(1, 'day'));
        };
        DatetimePickerService.prototype.viewJumpLeft = function () {
            this.jumping = true;
            var current = this.viewingDatetime$.value;
            this.viewingDatetime$.next(current.subtract(1, 'day'));
        };
        DatetimePickerService.prototype.selectToday = function () {
            this.jumping = false;
            this.selectDatetime(dayjs__default['default']());
        };
        DatetimePickerService.prototype.selectViewed = function () {
            this.jumping = false;
            this.selectDatetime(this.viewingDatetime$.value);
        };
        DatetimePickerService.prototype.viewMonth = function (month) {
            this.jumping = false;
            var current = this.viewingDatetime$.value;
            this.viewingDatetime$.next(current.month(month - 1));
        };
        DatetimePickerService.prototype.viewYear = function (year) {
            this.jumping = false;
            var current = this.viewingDatetime$.value;
            this.viewingDatetime$.next(current.year(year));
        };
        DatetimePickerService.prototype.generateCalendarView = function (viewing, selected) {
            var _this = this;
            if (!viewing.isValid() || (selected && !selected.isValid())) {
                return [];
            }
            var start = viewing.startOf('month');
            var end = viewing.endOf('month');
            var today = dayjs__default['default']();
            var daysInMonth = viewing.daysInMonth();
            var selectedDayOfMonth = selected && selected.get('date');
            var startDayOfWeek = start.day();
            var startIndex = (7 + (startDayOfWeek - this.weekStartDayIndex)) % 7;
            var calendarView = [];
            var week = [];
            // Add the days at the tail of the previous month
            if (0 < startIndex) {
                var prevMonth = viewing.subtract(1, 'month');
                var daysInPrevMonth = prevMonth.daysInMonth();
                var prevIsCurrentMonth = prevMonth.isSame(today, 'month');
                var _loop_1 = function (i) {
                    var thisDay = viewing.subtract(1, 'month').date(i);
                    week.push({
                        dayOfMonth: i,
                        selected: false,
                        inCurrentMonth: false,
                        isToday: prevIsCurrentMonth && today.get('date') === i,
                        isViewing: false,
                        disabled: !this_1.isInBounds(thisDay),
                        select: function () {
                            _this.selectDatetime(thisDay);
                        },
                    });
                };
                var this_1 = this;
                for (var i = daysInPrevMonth - startIndex + 1; i <= daysInPrevMonth; i++) {
                    _loop_1(i);
                }
            }
            // Add this month's days
            var isCurrentMonth = viewing.isSame(today, 'month');
            var _loop_2 = function (i) {
                if ((i + startIndex - 1) % 7 === 0) {
                    calendarView.push(week);
                    week = [];
                }
                var thisDay = start.add(i - 1, 'day');
                var isViewingThisMonth = !!selected && selected.isSame(viewing, 'month') && selected.isSame(viewing, 'year');
                week.push({
                    dayOfMonth: i,
                    selected: i === selectedDayOfMonth && isViewingThisMonth,
                    inCurrentMonth: true,
                    isToday: isCurrentMonth && today.get('date') === i,
                    isViewing: this_2.jumping && viewing.date() === i,
                    disabled: !this_2.isInBounds(thisDay),
                    select: function () {
                        _this.selectDatetime(thisDay);
                    },
                });
            };
            var this_2 = this;
            for (var i = 1; i <= daysInMonth; i++) {
                _loop_2(i);
            }
            // Add the days at the start of the next month
            var emptyCellsEnd = 7 - ((startIndex + daysInMonth) % 7);
            if (emptyCellsEnd !== 7) {
                var nextMonth = viewing.add(1, 'month');
                var nextIsCurrentMonth = nextMonth.isSame(today, 'month');
                var _loop_3 = function (i) {
                    var thisDay = end.add(i, 'day');
                    week.push({
                        dayOfMonth: i,
                        selected: false,
                        inCurrentMonth: false,
                        isToday: nextIsCurrentMonth && today.get('date') === i,
                        isViewing: false,
                        disabled: !this_3.isInBounds(thisDay),
                        select: function () {
                            _this.selectDatetime(thisDay);
                        },
                    });
                };
                var this_3 = this;
                for (var i = 1; i <= emptyCellsEnd; i++) {
                    _loop_3(i);
                }
            }
            calendarView.push(week);
            return calendarView;
        };
        DatetimePickerService.prototype.isInBounds = function (date) {
            if (this.min && this.min.isAfter(date)) {
                return false;
            }
            if (this.max && this.max.isBefore(date)) {
                return false;
            }
            return true;
        };
        return DatetimePickerService;
    }());
    DatetimePickerService.decorators = [
        { type: i0.Injectable }
    ];
    DatetimePickerService.ctorParameters = function () { return []; };

    var DatetimePickerComponent = /** @class */ (function () {
        function DatetimePickerComponent(changeDetectorRef, datetimePickerService) {
            this.changeDetectorRef = changeDetectorRef;
            this.datetimePickerService = datetimePickerService;
            /**
             * The day that the week should start with in the calendar view.
             */
            this.weekStartDay = 'mon';
            /**
             * The granularity of the minutes time picker
             */
            this.timeGranularityInterval = 5;
            /**
             * The minimum date as an ISO string
             */
            this.min = null;
            /**
             * The maximum date as an ISO string
             */
            this.max = null;
            /**
             * Sets the readonly state
             */
            this.readonly = false;
            this.disabled = false;
            this.weekdays = [];
        }
        DatetimePickerComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.datetimePickerService.setWeekStartingDay(this.weekStartDay);
            this.datetimePickerService.setMin(this.min);
            this.datetimePickerService.setMax(this.max);
            this.populateYearsSelection();
            this.populateWeekdays();
            this.populateHours();
            this.populateMinutes();
            this.calendarView$ = this.datetimePickerService.calendarView$;
            this.current$ = this.datetimePickerService.viewing$.pipe(operators.map(function (date) { return ({
                date: date,
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            }); }));
            this.selected$ = this.datetimePickerService.selected$;
            this.selectedHours$ = this.selected$.pipe(operators.map(function (date) { return date && date.getHours(); }));
            this.selectedMinutes$ = this.selected$.pipe(operators.map(function (date) { return date && date.getMinutes(); }));
            this.subscription = this.datetimePickerService.selected$.subscribe(function (val) {
                if (_this.onChange) {
                    _this.onChange(val == null ? val : val.toISOString());
                }
            });
        };
        DatetimePickerComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.dropdownComponent.onOpenChange(function (isOpen) {
                if (isOpen) {
                    _this.calendarTable.nativeElement.focus();
                }
            });
        };
        DatetimePickerComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        DatetimePickerComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        DatetimePickerComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        DatetimePickerComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        DatetimePickerComponent.prototype.writeValue = function (value) {
            this.datetimePickerService.selectDatetime(value);
        };
        DatetimePickerComponent.prototype.prevMonth = function () {
            this.datetimePickerService.viewPrevMonth();
        };
        DatetimePickerComponent.prototype.nextMonth = function () {
            this.datetimePickerService.viewNextMonth();
        };
        DatetimePickerComponent.prototype.selectToday = function () {
            this.datetimePickerService.selectToday();
        };
        DatetimePickerComponent.prototype.setYear = function (event) {
            var target = event.target;
            this.datetimePickerService.viewYear(parseInt(target.value, 10));
        };
        DatetimePickerComponent.prototype.setMonth = function (event) {
            var target = event.target;
            this.datetimePickerService.viewMonth(parseInt(target.value, 10));
        };
        DatetimePickerComponent.prototype.selectDay = function (day) {
            if (day.disabled) {
                return;
            }
            day.select();
        };
        DatetimePickerComponent.prototype.clearValue = function () {
            this.datetimePickerService.selectDatetime(null);
        };
        DatetimePickerComponent.prototype.handleCalendarKeydown = function (event) {
            switch (event.key) {
                case 'ArrowDown':
                    return this.datetimePickerService.viewJumpDown();
                case 'ArrowUp':
                    return this.datetimePickerService.viewJumpUp();
                case 'ArrowRight':
                    return this.datetimePickerService.viewJumpRight();
                case 'ArrowLeft':
                    return this.datetimePickerService.viewJumpLeft();
                case 'Enter':
                    return this.datetimePickerService.selectViewed();
            }
        };
        DatetimePickerComponent.prototype.setHour = function (event) {
            var target = event.target;
            this.datetimePickerService.selectHour(parseInt(target.value, 10));
        };
        DatetimePickerComponent.prototype.setMinute = function (event) {
            var target = event.target;
            this.datetimePickerService.selectMinute(parseInt(target.value, 10));
        };
        DatetimePickerComponent.prototype.closeDatepicker = function () {
            this.dropdownComponent.toggleOpen();
            this.datetimeInput.nativeElement.focus();
        };
        DatetimePickerComponent.prototype.populateYearsSelection = function () {
            var _a;
            var yearRange = (_a = this.yearRange) !== null && _a !== void 0 ? _a : 10;
            var currentYear = new Date().getFullYear();
            var min = (this.min && new Date(this.min).getFullYear()) || currentYear - yearRange;
            var max = (this.max && new Date(this.max).getFullYear()) || currentYear + yearRange;
            var spread = max - min + 1;
            this.years = Array.from({ length: spread }).map(function (_, i) { return min + i; });
        };
        DatetimePickerComponent.prototype.populateWeekdays = function () {
            var weekStartDayIndex = dayOfWeekIndex[this.weekStartDay];
            for (var i = 0; i < 7; i++) {
                this.weekdays.push(weekDayNames[(i + weekStartDayIndex + 0) % 7]);
            }
        };
        DatetimePickerComponent.prototype.populateHours = function () {
            this.hours = Array.from({ length: 24 }).map(function (_, i) { return i; });
        };
        DatetimePickerComponent.prototype.populateMinutes = function () {
            var minutes = [];
            for (var i = 0; i < 60; i += this.timeGranularityInterval) {
                minutes.push(i);
            }
            this.minutes = minutes;
        };
        return DatetimePickerComponent;
    }());
    DatetimePickerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-datetime-picker',
                    template: "<div class=\"input-wrapper\">\n    <input\n        readonly\n        [ngModel]=\"selected$ | async | localeDate: 'medium'\"\n        class=\"selected-datetime\"\n        (keydown.enter)=\"dropdownComponent.toggleOpen()\"\n        (keydown.space)=\"dropdownComponent.toggleOpen()\"\n        #datetimeInput\n    />\n    <button class=\"clear-value-button btn\" [class.visible]=\"!disabled && !readonly && (selected$ | async)\" (click)=\"clearValue()\">\n        <clr-icon shape=\"times\"></clr-icon>\n    </button>\n</div>\n<vdr-dropdown #dropdownComponent>\n    <button class=\"btn btn-outline calendar-button\" vdrDropdownTrigger [disabled]=\"readonly || disabled\">\n        <clr-icon shape=\"calendar\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu>\n        <div class=\"datetime-picker\" *ngIf=\"current$ | async as currentView\" (keydown.escape)=\"closeDatepicker()\">\n            <div class=\"controls\">\n                <div class=\"selects\">\n                    <div class=\"month-select\">\n                        <select\n                            clrSelect\n                            name=\"month\"\n                            [ngModel]=\"currentView.month\"\n                            (change)=\"setMonth($event)\"\n                        >\n                            <option [value]=\"1\">{{ 'datetime.month-jan' | translate }}</option>\n                            <option [value]=\"2\">{{ 'datetime.month-feb' | translate }}</option>\n                            <option [value]=\"3\">{{ 'datetime.month-mar' | translate }}</option>\n                            <option [value]=\"4\">{{ 'datetime.month-apr' | translate }}</option>\n                            <option [value]=\"5\">{{ 'datetime.month-may' | translate }}</option>\n                            <option [value]=\"6\">{{ 'datetime.month-jun' | translate }}</option>\n                            <option [value]=\"7\">{{ 'datetime.month-jul' | translate }}</option>\n                            <option [value]=\"8\">{{ 'datetime.month-aug' | translate }}</option>\n                            <option [value]=\"9\">{{ 'datetime.month-sep' | translate }}</option>\n                            <option [value]=\"10\">{{ 'datetime.month-oct' | translate }}</option>\n                            <option [value]=\"11\">{{ 'datetime.month-nov' | translate }}</option>\n                            <option [value]=\"12\">{{ 'datetime.month-dec' | translate }}</option>\n                        </select>\n                    </div>\n                    <div class=\"year-select\">\n                        <select\n                            clrSelect\n                            name=\"month\"\n                            [ngModel]=\"currentView.year\"\n                            (change)=\"setYear($event)\"\n                        >\n                            <option *ngFor=\"let year of years\" [value]=\"year\">{{ year }}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"control-buttons\">\n                    <button\n                        class=\"btn btn-link btn-sm\"\n                        (click)=\"prevMonth()\"\n                        [title]=\"'common.view-previous-month' | translate\"\n                    >\n                        <clr-icon shape=\"caret\" dir=\"left\"></clr-icon>\n                    </button>\n                    <button class=\"btn btn-link btn-sm\" (click)=\"selectToday()\" [title]=\"'common.select-today' | translate\">\n                        <clr-icon shape=\"event\"></clr-icon>\n                    </button>\n                    <button\n                        class=\"btn btn-link btn-sm\"\n                        (click)=\"nextMonth()\"\n                        [title]=\"'common.view-next-month' | translate\"\n                    >\n                        <clr-icon shape=\"caret\" dir=\"right\"></clr-icon>\n                    </button>\n                </div>\n            </div>\n            <table class=\"calendar-table\" #calendarTable tabindex=\"0\" (keydown)=\"handleCalendarKeydown($event)\">\n                <thead>\n                <tr>\n                    <td *ngFor=\"let weekdayName of weekdays\">\n                        {{ weekdayName | translate }}\n                    </td>\n                </tr>\n                </thead>\n                <tbody>\n                <tr *ngFor=\"let week of calendarView$ | async\">\n                    <td\n                        *ngFor=\"let day of week\"\n                        class=\"day-cell\"\n                        [class.selected]=\"day.selected\"\n                        [class.today]=\"day.isToday\"\n                        [class.viewing]=\"day.isViewing\"\n                        [class.current-month]=\"day.inCurrentMonth\"\n                        [class.disabled]=\"day.disabled\"\n                        (keydown.enter)=\"selectDay(day)\"\n                        (click)=\"selectDay(day)\"\n                    >\n                        {{ day.dayOfMonth }}\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n            <div class=\"time-picker\">\n                <span class=\"flex-spacer\"> {{ 'datetime.time' | translate }}: </span>\n                <select clrSelect name=\"hour\" [ngModel]=\"selectedHours$ | async\" (change)=\"setHour($event)\">\n                    <option *ngFor=\"let hour of hours\" [value]=\"hour\">{{ hour | number: '2.0-0' }}</option>\n                </select>\n                <span>:</span>\n                <select\n                    clrSelect\n                    name=\"hour\"\n                    [ngModel]=\"selectedMinutes$ | async\"\n                    (change)=\"setMinute($event)\"\n                >\n                    <option *ngFor=\"let minute of minutes\" [value]=\"minute\">{{\n                        minute | number: '2.0-0'\n                        }}</option>\n                </select>\n            </div>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [
                        DatetimePickerService,
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: DatetimePickerComponent,
                            multi: true,
                        },
                    ],
                    styles: [":host{display:flex;width:100%}.input-wrapper{flex:1;display:flex}input.selected-datetime{flex:1;border-top-right-radius:0!important;border-bottom-right-radius:0!important;border-right:none!important}.clear-value-button{margin:0;border-radius:0;border-left:none;border-left-color:var(--color-component-border-200);border-bottom-color:var(--color-component-border-200);border-right-color:var(--color-component-border-200);border-top-color:var(--color-component-border-200);background-color:#fff;color:var(--color-grey-500);display:none}.clear-value-button.visible{display:block}.calendar-button{margin:0;border-top-left-radius:0;border-bottom-left-radius:0}.datetime-picker{margin:0 12px}table.calendar-table{padding:6px}table.calendar-table:focus{outline:1px solid var(--color-primary-500);box-shadow:0 0 1px 2px var(--color-primary-100)}table.calendar-table td{width:24px;text-align:center;border:1px solid transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}table.calendar-table .day-cell{background-color:var(--color-component-bg-200);color:var(--color-grey-500);cursor:pointer;transition:background-color .1s}table.calendar-table .day-cell.current-month{background-color:#fff;color:var(--color-grey-800)}table.calendar-table .day-cell.selected{background-color:var(--color-primary-500);color:#fff}table.calendar-table .day-cell.viewing:not(.selected){background-color:var(--color-primary-200)}table.calendar-table .day-cell.today{border:1px solid var(--color-component-border-300)}table.calendar-table .day-cell:hover:not(.selected):not(.disabled){background-color:var(--color-primary-100)}table.calendar-table .day-cell.disabled{cursor:default;color:var(--color-grey-300)}.selects{justify-content:space-between;margin-bottom:12px}.control-buttons,.selects{display:flex}.time-picker{display:flex;align-items:baseline;margin-top:12px}"]
                },] }
    ];
    DatetimePickerComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: DatetimePickerService }
    ]; };
    DatetimePickerComponent.propDecorators = {
        yearRange: [{ type: i0.Input }],
        weekStartDay: [{ type: i0.Input }],
        timeGranularityInterval: [{ type: i0.Input }],
        min: [{ type: i0.Input }],
        max: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        dropdownComponent: [{ type: i0.ViewChild, args: ['dropdownComponent', { static: true },] }],
        datetimeInput: [{ type: i0.ViewChild, args: ['datetimeInput', { static: true },] }],
        calendarTable: [{ type: i0.ViewChild, args: ['calendarTable',] }]
    };

    var DropdownComponent = /** @class */ (function () {
        function DropdownComponent() {
            this.isOpen = false;
            this.onOpenChangeCallbacks = [];
            this.manualToggle = false;
        }
        DropdownComponent.prototype.onClick = function () {
            if (!this.manualToggle) {
                this.toggleOpen();
            }
        };
        DropdownComponent.prototype.toggleOpen = function () {
            var _this = this;
            this.isOpen = !this.isOpen;
            this.onOpenChangeCallbacks.forEach(function (fn) { return fn(_this.isOpen); });
        };
        DropdownComponent.prototype.onOpenChange = function (callback) {
            this.onOpenChangeCallbacks.push(callback);
        };
        DropdownComponent.prototype.setTriggerElement = function (elementRef) {
            this.trigger = elementRef;
        };
        return DropdownComponent;
    }());
    DropdownComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-dropdown',
                    template: "<ng-content></ng-content>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    DropdownComponent.propDecorators = {
        manualToggle: [{ type: i0.Input }]
    };

    var DropdownItemDirective = /** @class */ (function () {
        function DropdownItemDirective(dropdown) {
            this.dropdown = dropdown;
        }
        DropdownItemDirective.prototype.onDropdownItemClick = function (event) {
            this.dropdown.onClick();
        };
        return DropdownItemDirective;
    }());
    DropdownItemDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vdrDropdownItem]',
                    // tslint:disable-next-line
                    host: { '[class.dropdown-item]': 'true' },
                },] }
    ];
    DropdownItemDirective.ctorParameters = function () { return [
        { type: DropdownComponent }
    ]; };
    DropdownItemDirective.propDecorators = {
        onDropdownItemClick: [{ type: i0.HostListener, args: ['click', ['$event'],] }]
    };

    /**
     * A dropdown menu modelled on the Clarity Dropdown component (https://v1.clarity.design/dropdowns).
     *
     * This was created because the Clarity implementation (at this time) does not handle edge detection. Instead
     * we make use of the Angular CDK's Overlay module to manage the positioning.
     *
     * The API of this component (and its related Components & Directives) are based on the Clarity version,
     * albeit only a subset which is currently used in this application.
     */
    var DropdownMenuComponent = /** @class */ (function () {
        function DropdownMenuComponent(overlay, viewContainerRef, dropdown) {
            this.overlay = overlay;
            this.viewContainerRef = viewContainerRef;
            this.dropdown = dropdown;
            this.position = 'bottom-left';
        }
        DropdownMenuComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.dropdown.onOpenChange(function (isOpen) {
                if (isOpen) {
                    _this.overlayRef.attach(_this.menuPortal);
                }
                else {
                    _this.overlayRef.detach();
                }
            });
        };
        DropdownMenuComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.overlayRef = this.overlay.create({
                hasBackdrop: true,
                backdropClass: 'clear-backdrop',
                positionStrategy: this.getPositionStrategy(),
                maxHeight: '70vh',
            });
            this.menuPortal = new portal.TemplatePortal(this.menuTemplate, this.viewContainerRef);
            this.backdropClickSub = this.overlayRef.backdropClick().subscribe(function () {
                _this.dropdown.toggleOpen();
            });
        };
        DropdownMenuComponent.prototype.ngOnDestroy = function () {
            if (this.overlayRef) {
                this.overlayRef.dispose();
            }
            if (this.backdropClickSub) {
                this.backdropClickSub.unsubscribe();
            }
        };
        DropdownMenuComponent.prototype.getPositionStrategy = function () {
            var _a;
            var position = (_a = {},
                _a['top-left'] = {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                },
                _a['top-right'] = {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom',
                },
                _a['bottom-left'] = {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                },
                _a['bottom-right'] = {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                },
                _a);
            var pos = position[this.position];
            return this.overlay
                .position()
                .flexibleConnectedTo(this.dropdown.trigger)
                .withPositions([pos, this.invertPosition(pos)])
                .withViewportMargin(12)
                .withPush(true);
        };
        /** Inverts an overlay position. */
        DropdownMenuComponent.prototype.invertPosition = function (pos) {
            var inverted = Object.assign({}, pos);
            inverted.originY = pos.originY === 'top' ? 'bottom' : 'top';
            inverted.overlayY = pos.overlayY === 'top' ? 'bottom' : 'top';
            return inverted;
        };
        return DropdownMenuComponent;
    }());
    DropdownMenuComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-dropdown-menu',
                    template: "\n        <ng-template #menu>\n            <div class=\"dropdown open\">\n                <div class=\"dropdown-menu\">\n                    <div class=\"dropdown-content-wrapper\">\n                        <ng-content></ng-content>\n                    </div>\n                </div>\n            </div>\n        </ng-template>\n    ",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".clear-backdrop{background-color:#ff69b4}.dropdown.open>.dropdown-menu{position:relative;top:0;height:100%;overflow-y:auto}:host{opacity:1;transition:opacity .3s}"]
                },] }
    ];
    DropdownMenuComponent.ctorParameters = function () { return [
        { type: overlay.Overlay },
        { type: i0.ViewContainerRef },
        { type: DropdownComponent }
    ]; };
    DropdownMenuComponent.propDecorators = {
        position: [{ type: i0.Input, args: ['vdrPosition',] }],
        menuTemplate: [{ type: i0.ViewChild, args: ['menu', { static: true },] }]
    };

    var DropdownTriggerDirective = /** @class */ (function () {
        function DropdownTriggerDirective(dropdown, elementRef) {
            this.dropdown = dropdown;
            this.elementRef = elementRef;
            dropdown.setTriggerElement(this.elementRef);
        }
        DropdownTriggerDirective.prototype.onDropdownTriggerClick = function (event) {
            this.dropdown.toggleOpen();
        };
        return DropdownTriggerDirective;
    }());
    DropdownTriggerDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vdrDropdownTrigger]',
                },] }
    ];
    DropdownTriggerDirective.ctorParameters = function () { return [
        { type: DropdownComponent },
        { type: i0.ElementRef }
    ]; };
    DropdownTriggerDirective.propDecorators = {
        onDropdownTriggerClick: [{ type: i0.HostListener, args: ['click', ['$event'],] }]
    };

    var EditNoteDialogComponent = /** @class */ (function () {
        function EditNoteDialogComponent() {
            this.displayPrivacyControls = true;
            this.noteIsPrivate = true;
            this.note = '';
        }
        EditNoteDialogComponent.prototype.confirm = function () {
            this.resolveWith({
                note: this.note,
                isPrivate: this.noteIsPrivate,
            });
        };
        EditNoteDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        return EditNoteDialogComponent;
    }());
    EditNoteDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-edit-note-dialog',
                    template: "<ng-template vdrDialogTitle>\n    {{ 'common.edit-note' | translate }}\n</ng-template>\n\n<textarea [(ngModel)]=\"note\" name=\"note\" class=\"note\"></textarea>\n<div class=\"visibility-select\" *ngIf=\"displayPrivacyControls\">\n    <clr-checkbox-wrapper>\n        <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"noteIsPrivate\" />\n        <label>{{ 'order.note-is-private' | translate }}</label>\n    </clr-checkbox-wrapper>\n    <span *ngIf=\"noteIsPrivate\" class=\"private\">\n        {{ 'order.note-only-visible-to-administrators' | translate }}\n    </span>\n    <span *ngIf=\"!noteIsPrivate\" class=\"public\">\n        {{ 'order.note-visible-to-customer' | translate }}\n    </span>\n</div>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"confirm()\" class=\"btn btn-primary\" [disabled]=\"note.length === 0\">\n        {{ 'common.confirm' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".visibility-select{display:flex;justify-content:space-between;align-items:baseline}.visibility-select .public{color:var(--color-warning-500)}.visibility-select .private{color:var(--color-success-500)}textarea.note{width:100%;height:72px;border-radius:3px;margin-right:6px}"]
                },] }
    ];

    var EmptyPlaceholderComponent = /** @class */ (function () {
        function EmptyPlaceholderComponent() {
        }
        return EmptyPlaceholderComponent;
    }());
    EmptyPlaceholderComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-empty-placeholder',
                    template: "<div class=\"empty-state\">\n    <clr-icon shape=\"bubble-exclamation\" size=\"64\"></clr-icon>\n    <div class=\"empty-label\">\n        <ng-container *ngIf=\"emptyStateLabel; else defaultEmptyLabel\">{{ emptyStateLabel }}</ng-container>\n        <ng-template #defaultEmptyLabel>{{ 'common.no-results' | translate }}</ng-template>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".empty-state{text-align:center;padding:60px;color:var(--color-grey-400);width:100%}.empty-state .empty-label{margin-top:12px;font-size:22px}"]
                },] }
    ];
    EmptyPlaceholderComponent.propDecorators = {
        emptyStateLabel: [{ type: i0.Input }]
    };

    var EntityInfoComponent = /** @class */ (function () {
        function EntityInfoComponent() {
            this.small = false;
        }
        return EntityInfoComponent;
    }());
    EntityInfoComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-entity-info',
                    template: "<vdr-dropdown *ngIf=\"entity.id\">\n    <button class=\"btn btn-icon btn-link info-button\" [class.btn-sm]=\"small\" vdrDropdownTrigger>\n        <clr-icon shape=\"info-standard\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu>\n        <div class=\"entity-info\">\n            <vdr-labeled-data [label]=\"'common.ID' | translate\">\n                {{ entity.id }}\n            </vdr-labeled-data>\n            <vdr-labeled-data *ngIf=\"entity.createdAt\" [label]=\"'common.created-at' | translate\">\n                {{ entity.createdAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n            <vdr-labeled-data *ngIf=\"entity.updatedAt\" [label]=\"'common.updated-at' | translate\">\n                {{ entity.updatedAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".info-button{color:var(--color-icon-button)}.entity-info{margin:0 12px}"]
                },] }
    ];
    EntityInfoComponent.propDecorators = {
        small: [{ type: i0.Input }],
        entity: [{ type: i0.Input }]
    };

    var ExtensionHostService = /** @class */ (function () {
        function ExtensionHostService(dataService, notificationService) {
            var _this = this;
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.cancellationMessage$ = new rxjs.Subject();
            this.destroyMessage$ = new rxjs.Subject();
            this.handleMessage = function (message) {
                var data = message.data, origin = message.origin;
                if (_this.isExtensionMessage(data)) {
                    var cancellation$ = _this.cancellationMessage$.pipe(operators.filter(function (requestId) { return requestId === data.requestId; }));
                    var end$ = rxjs.merge(cancellation$, _this.destroyMessage$);
                    switch (data.type) {
                        case 'cancellation': {
                            _this.cancellationMessage$.next(data.requestId);
                            break;
                        }
                        case 'destroy': {
                            _this.destroyMessage$.next();
                            break;
                        }
                        case 'graphql-query': {
                            var _a = data.data, document = _a.document, variables = _a.variables, fetchPolicy = _a.fetchPolicy;
                            _this.dataService
                                .query(graphql.parse(document), variables, fetchPolicy)
                                .stream$.pipe(operators.takeUntil(end$))
                                .subscribe(_this.createObserver(data.requestId, origin));
                            break;
                        }
                        case 'graphql-mutation': {
                            var _b = data.data, document = _b.document, variables = _b.variables;
                            _this.dataService
                                .mutate(graphql.parse(document), variables)
                                .pipe(operators.takeUntil(end$))
                                .subscribe(_this.createObserver(data.requestId, origin));
                            break;
                        }
                        case 'notification': {
                            _this.notificationService.notify(data.data);
                            break;
                        }
                        default:
                            sharedUtils.assertNever(data);
                    }
                }
            };
        }
        ExtensionHostService.prototype.init = function (extensionWindow) {
            this.extensionWindow = extensionWindow;
            window.addEventListener('message', this.handleMessage);
        };
        ExtensionHostService.prototype.destroy = function () {
            window.removeEventListener('message', this.handleMessage);
            this.destroyMessage$.next();
        };
        ExtensionHostService.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        ExtensionHostService.prototype.createObserver = function (requestId, origin) {
            var _this = this;
            return {
                next: function (data) { return _this.sendMessage({ data: data, error: false, complete: false, requestId: requestId }, origin); },
                error: function (err) { return _this.sendMessage({ data: err, error: true, complete: false, requestId: requestId }, origin); },
                complete: function () { return _this.sendMessage({ data: null, error: false, complete: true, requestId: requestId }, origin); },
            };
        };
        ExtensionHostService.prototype.sendMessage = function (response, origin) {
            this.extensionWindow.postMessage(response, origin);
        };
        ExtensionHostService.prototype.isExtensionMessage = function (input) {
            return (input.hasOwnProperty('type') && input.hasOwnProperty('data') && input.hasOwnProperty('requestId'));
        };
        return ExtensionHostService;
    }());
    ExtensionHostService.decorators = [
        { type: i0.Injectable }
    ];
    ExtensionHostService.ctorParameters = function () { return [
        { type: DataService },
        { type: NotificationService }
    ]; };

    /**
     * This component uses an iframe to embed an external url into the Admin UI, and uses the PostMessage
     * protocol to allow cross-frame communication between the two frames.
     */
    var ExtensionHostComponent = /** @class */ (function () {
        function ExtensionHostComponent(route, sanitizer, extensionHostService) {
            this.route = route;
            this.sanitizer = sanitizer;
            this.extensionHostService = extensionHostService;
            this.openInIframe = true;
            this.extensionWindowIsOpen = false;
        }
        ExtensionHostComponent.prototype.ngOnInit = function () {
            var data = this.route.snapshot.data;
            if (!this.isExtensionHostConfig(data.extensionHostConfig)) {
                throw new Error("Expected an ExtensionHostConfig object, got " + JSON.stringify(data.extensionHostConfig));
            }
            this.config = data.extensionHostConfig;
            this.openInIframe = !this.config.openInNewTab;
            this.extensionUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.extensionUrl || 'about:blank');
        };
        ExtensionHostComponent.prototype.ngAfterViewInit = function () {
            if (this.openInIframe) {
                var extensionWindow = this.extensionFrame.nativeElement.contentWindow;
                if (extensionWindow) {
                    this.extensionHostService.init(extensionWindow);
                }
            }
        };
        ExtensionHostComponent.prototype.ngOnDestroy = function () {
            if (this.extensionWindow) {
                this.extensionWindow.close();
            }
        };
        ExtensionHostComponent.prototype.launchExtensionWindow = function () {
            var _this = this;
            var extensionWindow = window.open(this.config.extensionUrl);
            if (!extensionWindow) {
                return;
            }
            this.extensionHostService.init(extensionWindow);
            this.extensionWindowIsOpen = true;
            this.extensionWindow = extensionWindow;
            var timer;
            function pollWindowState(extwindow, onClosed) {
                if (extwindow.closed) {
                    window.clearTimeout(timer);
                    onClosed();
                }
                else {
                    timer = window.setTimeout(function () { return pollWindowState(extwindow, onClosed); }, 250);
                }
            }
            pollWindowState(extensionWindow, function () {
                _this.extensionWindowIsOpen = false;
                _this.extensionHostService.destroy();
            });
        };
        ExtensionHostComponent.prototype.isExtensionHostConfig = function (input) {
            return input.hasOwnProperty('extensionUrl');
        };
        return ExtensionHostComponent;
    }());
    ExtensionHostComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-extension-host',
                    template: "<ng-template [ngIf]=\"openInIframe\" [ngIfElse]=\"launchExtension\">\n    <iframe [src]=\"extensionUrl\" #extensionFrame></iframe>\n</ng-template>\n<ng-template #launchExtension>\n    <div class=\"launch-button\" [class.launched]=\"extensionWindowIsOpen\">\n        <div>\n            <button\n                class=\"btn btn-lg btn-primary\"\n                [disabled]=\"extensionWindowIsOpen\"\n                (click)=\"launchExtensionWindow()\"\n            >\n                <clr-icon shape=\"pop-out\"></clr-icon>\n                {{ 'common.launch-extension' | translate }}\n            </button>\n            <h3 class=\"window-hint\" [class.visible]=\"extensionWindowIsOpen\">\n                {{ 'common.extension-running-in-separate-window' | translate }}\n            </h3>\n        </div>\n    </div>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.Default,
                    providers: [ExtensionHostService],
                    styles: [".launch-button,iframe{position:absolute;left:0;top:0;bottom:0;right:0;width:100%;height:100%;border:none}.launch-button{padding:24px;display:flex;align-items:center;justify-content:center;transition:background-color .3s;text-align:center}.launch-button.launched{background-color:var(--color-component-bg-300)}.window-hint{visibility:hidden;opacity:0;transition:visibility .3s 0,opacity .3s}.window-hint.visible{visibility:visible;opacity:1;transition:visibility 0,opacity .3s}"]
                },] }
    ];
    ExtensionHostComponent.ctorParameters = function () { return [
        { type: i1$3.ActivatedRoute },
        { type: platformBrowser.DomSanitizer },
        { type: ExtensionHostService }
    ]; };
    ExtensionHostComponent.propDecorators = {
        extensionFrame: [{ type: i0.ViewChild, args: ['extensionFrame',] }]
    };

    var FacetValueChipComponent = /** @class */ (function () {
        function FacetValueChipComponent() {
            this.removable = true;
            this.displayFacetName = true;
            this.remove = new i0.EventEmitter();
        }
        return FacetValueChipComponent;
    }());
    FacetValueChipComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-facet-value-chip',
                    template: "<vdr-chip\n    [icon]=\"removable ? 'times' : undefined\"\n    [colorFrom]=\"facetValue.facet.name\"\n    (iconClick)=\"remove.emit()\"\n    [title]=\"facetValue.facet.name + ' - ' + facetValue.name\"\n>\n    <span *ngIf=\"displayFacetName\" class=\"facet-name\">{{ facetValue.facet.name }}</span>\n    {{ facetValue.name }}\n</vdr-chip>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:inline-block}.facet-name{color:var(--color-grey-100);text-transform:uppercase;font-size:10px;margin-right:3px;height:11px}"]
                },] }
    ];
    FacetValueChipComponent.propDecorators = {
        facetValue: [{ type: i0.Input }],
        removable: [{ type: i0.Input }],
        displayFacetName: [{ type: i0.Input }],
        remove: [{ type: i0.Output }]
    };

    function flattenFacetValues(facetsWithValues) {
        return facetsWithValues.reduce(function (flattened, facet) { return flattened.concat(facet.values); }, []);
    }

    var FacetValueSelectorComponent = /** @class */ (function () {
        function FacetValueSelectorComponent(dataService) {
            this.dataService = dataService;
            this.selectedValuesChange = new i0.EventEmitter();
            this.readonly = false;
            this.facetValues = [];
            this.disabled = false;
            this.toSelectorItem = function (facetValue) {
                return {
                    name: facetValue.name,
                    facetName: facetValue.facet.name,
                    id: facetValue.id,
                    value: facetValue,
                };
            };
        }
        FacetValueSelectorComponent.prototype.ngOnInit = function () {
            this.facetValues = flattenFacetValues(this.facets).map(this.toSelectorItem);
        };
        FacetValueSelectorComponent.prototype.onChange = function (selected) {
            if (this.readonly) {
                return;
            }
            this.selectedValuesChange.emit(selected.map(function (s) { return s.value; }));
            if (this.onChangeFn) {
                this.onChangeFn(JSON.stringify(selected.map(function (s) { return s.id; })));
            }
        };
        FacetValueSelectorComponent.prototype.registerOnChange = function (fn) {
            this.onChangeFn = fn;
        };
        FacetValueSelectorComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchFn = fn;
        };
        FacetValueSelectorComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        FacetValueSelectorComponent.prototype.focus = function () {
            this.ngSelect.focus();
        };
        FacetValueSelectorComponent.prototype.writeValue = function (obj) {
            if (typeof obj === 'string') {
                try {
                    var facetIds = JSON.parse(obj);
                    this.value = facetIds;
                }
                catch (err) {
                    // TODO: log error
                    throw err;
                }
            }
            else if (Array.isArray(obj)) {
                var isIdArray = function (input) { return input.every(function (i) { return typeof i === 'number' || typeof i === 'string'; }); };
                if (isIdArray(obj)) {
                    this.value = obj.map(function (fv) { return fv.toString(); });
                }
                else {
                    this.value = obj.map(function (fv) { return fv.id; });
                }
            }
        };
        return FacetValueSelectorComponent;
    }());
    FacetValueSelectorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-facet-value-selector',
                    template: "<ng-select\n    [items]=\"facetValues\"\n    [addTag]=\"false\"\n    [hideSelected]=\"true\"\n    bindValue=\"id\"\n    multiple=\"true\"\n    appendTo=\"body\"\n    bindLabel=\"name\"\n    [disabled]=\"disabled || readonly\"\n    [ngModel]=\"value\"\n    (change)=\"onChange($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <vdr-facet-value-chip\n            [facetValue]=\"item.value\"\n            [removable]=\"!readonly\"\n            (remove)=\"clear(item)\"\n        ></vdr-facet-value-chip>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-facet-value-chip [facetValue]=\"item.value\" [removable]=\"false\"></vdr-facet-value-chip>\n    </ng-template>\n</ng-select>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: FacetValueSelectorComponent,
                            multi: true,
                        },
                    ],
                    styles: [":host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}"]
                },] }
    ];
    FacetValueSelectorComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };
    FacetValueSelectorComponent.propDecorators = {
        selectedValuesChange: [{ type: i0.Output }],
        facets: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        ngSelect: [{ type: i0.ViewChild, args: [ngSelect.NgSelectComponent,] }]
    };

    var FocalPointControlComponent = /** @class */ (function () {
        function FocalPointControlComponent() {
            this.visible = false;
            this.editable = false;
            this.fpx = 0.5;
            this.fpy = 0.5;
            this.focalPointChange = new i0.EventEmitter();
        }
        Object.defineProperty(FocalPointControlComponent.prototype, "initialPosition", {
            get: function () {
                return this.focalPointToOffset(this.fpx == null ? 0.5 : this.fpx, this.fpy == null ? 0.5 : this.fpy);
            },
            enumerable: false,
            configurable: true
        });
        FocalPointControlComponent.prototype.onDragEnded = function (event) {
            var _a = this.getCurrentFocalPoint(), x = _a.x, y = _a.y;
            this.fpx = x;
            this.fpy = y;
            this.focalPointChange.emit({ x: x, y: y });
        };
        FocalPointControlComponent.prototype.getCurrentFocalPoint = function () {
            var _a = this.dot.nativeElement.getBoundingClientRect(), dotLeft = _a.left, dotTop = _a.top, width = _a.width, height = _a.height;
            var _b = this.frame.nativeElement.getBoundingClientRect(), frameLeft = _b.left, frameTop = _b.top;
            var xInPx = dotLeft - frameLeft + width / 2;
            var yInPx = dotTop - frameTop + height / 2;
            return {
                x: xInPx / this.width,
                y: yInPx / this.height,
            };
        };
        FocalPointControlComponent.prototype.focalPointToOffset = function (x, y) {
            var _a = this.dot.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            return {
                x: x * this.width - width / 2,
                y: y * this.height - height / 2,
            };
        };
        return FocalPointControlComponent;
    }());
    FocalPointControlComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-focal-point-control',
                    template: "<ng-content></ng-content>\n<div class=\"frame\" #frame [style.width.px]=\"width\" [style.height.px]=\"height\">\n    <div\n        #dot\n        class=\"dot\"\n        [class.visible]=\"visible\"\n        [class.editable]=\"editable\"\n        cdkDrag\n        [cdkDragDisabled]=\"!editable\"\n        cdkDragBoundary=\".frame\"\n        (cdkDragEnded)=\"onDragEnded($event)\"\n        [cdkDragFreeDragPosition]=\"initialPosition\"\n    ></div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{position:relative;display:block}.frame{top:0}.dot,.frame{position:absolute}.dot{width:20px;height:20px;border-radius:50%;border:2px solid #fff;visibility:hidden;transition:opacity .3s;box-shadow:0 0 4px 4px rgba(0,0,0,.42)}.dot.visible{visibility:visible;opacity:.7}.dot.editable{cursor:move;visibility:visible;opacity:1;-webkit-animation:pulse;animation:pulse;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-iteration-count:4;animation-iteration-count:4}@-webkit-keyframes pulse{0%{border-color:#fff}50%{border-color:var(--color-warning-500)}to{border-color:#fff}}@keyframes pulse{0%{border-color:#fff}50%{border-color:var(--color-warning-500)}to{border-color:#fff}}"]
                },] }
    ];
    FocalPointControlComponent.propDecorators = {
        visible: [{ type: i0.Input }],
        editable: [{ type: i0.Input }],
        width: [{ type: i0.HostBinding, args: ['style.width.px',] }, { type: i0.Input }],
        height: [{ type: i0.HostBinding, args: ['style.height.px',] }, { type: i0.Input }],
        fpx: [{ type: i0.Input }],
        fpy: [{ type: i0.Input }],
        focalPointChange: [{ type: i0.Output }],
        frame: [{ type: i0.ViewChild, args: ['frame', { static: true },] }],
        dot: [{ type: i0.ViewChild, args: ['dot', { static: true },] }]
    };

    // tslint:disable:directive-selector
    var FormFieldControlDirective = /** @class */ (function () {
        function FormFieldControlDirective(elementRef, formControlName) {
            this.elementRef = elementRef;
            this.formControlName = formControlName;
        }
        Object.defineProperty(FormFieldControlDirective.prototype, "valid", {
            get: function () {
                return !!this.formControlName && !!this.formControlName.valid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormFieldControlDirective.prototype, "touched", {
            get: function () {
                return !!this.formControlName && !!this.formControlName.touched;
            },
            enumerable: false,
            configurable: true
        });
        FormFieldControlDirective.prototype.setReadOnly = function (value) {
            var input = this.elementRef.nativeElement;
            if (isSelectElement(input)) {
                input.disabled = value;
            }
            else {
                input.readOnly = value;
            }
        };
        return FormFieldControlDirective;
    }());
    FormFieldControlDirective.decorators = [
        { type: i0.Directive, args: [{ selector: 'input, textarea, select' },] }
    ];
    FormFieldControlDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: forms.NgControl, decorators: [{ type: i0.Optional }] }
    ]; };
    function isSelectElement(value) {
        return value.hasOwnProperty('selectedIndex');
    }

    /**
     * A form field wrapper which handles the correct layout and validation error display for
     * a form control.
     */
    var FormFieldComponent = /** @class */ (function () {
        function FormFieldComponent() {
            /**
             * A map of error message codes (required, pattern etc.) to messages to display
             * when those errors are present.
             */
            this.errors = {};
            /**
             * If set to true, the input will be initially set to "readOnly", and an "edit" button
             * will be displayed which allows the field to be edited.
             */
            this.readOnlyToggle = false;
            this.isReadOnly = false;
        }
        FormFieldComponent.prototype.ngOnInit = function () {
            if (this.readOnlyToggle) {
                this.isReadOnly = true;
                this.setReadOnly(true);
            }
            this.isReadOnly = this.readOnlyToggle;
        };
        FormFieldComponent.prototype.setReadOnly = function (value) {
            this.formFieldControl.setReadOnly(value);
            this.isReadOnly = value;
        };
        FormFieldComponent.prototype.getErrorMessage = function () {
            var e_1, _a;
            if (!this.formFieldControl || !this.formFieldControl.formControlName) {
                return;
            }
            var errors = this.formFieldControl.formControlName.errors;
            if (errors) {
                try {
                    for (var _b = __values(Object.keys(errors)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var errorKey = _c.value;
                        if (this.errors[errorKey]) {
                            return this.errors[errorKey];
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        return FormFieldComponent;
    }());
    FormFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-form-field',
                    template: "<div\n    class=\"form-group\"\n    [class.no-label]=\"!label\"\n    [class.clr-error]=\"formFieldControl?.formControlName?.invalid\"\n>\n    <label *ngIf=\"label\" [for]=\"for\" class=\"clr-control-label\">\n        {{ label }}\n        <vdr-help-tooltip *ngIf=\"tooltip\" [content]=\"tooltip\"></vdr-help-tooltip>\n    </label>\n    <label\n        [for]=\"for\"\n        aria-haspopup=\"true\"\n        role=\"tooltip\"\n        [class.invalid]=\"formFieldControl?.touched && !formFieldControl?.valid\"\n        class=\"tooltip tooltip-validation tooltip-sm tooltip-top-left\"\n    >\n        <div class=\"input-row\" [class.has-toggle]=\"readOnlyToggle\">\n            <ng-content></ng-content>\n            <button\n                *ngIf=\"readOnlyToggle\"\n                type=\"button\"\n                [disabled]=\"!isReadOnly\"\n                [title]=\"'common.edit-field' | translate\"\n                class=\"btn btn-icon edit-button\"\n                (click)=\"setReadOnly(false)\"\n            >\n                <clr-icon shape=\"edit\"></clr-icon>\n            </button>\n        </div>\n        <div class=\"clr-subtext\" *ngIf=\"getErrorMessage()\">{{ getErrorMessage() }}</div>\n        <span class=\"tooltip-content\">{{ label }} is required.</span>\n    </label>\n</div>\n",
                    styles: [":host{display:block}:host .form-group>label:first-child{top:6px}:host .form-group>label:nth-of-type(2){flex:1;max-width:20rem}:host .form-group>label:nth-of-type(2) ::ng-deep>:not(.tooltip-content){width:100%}:host .form-group .tooltip-validation{height:auto}:host .form-group.no-label{margin:-6px 0 0;padding:0;justify-content:center}:host .form-group.no-label>label{position:relative;justify-content:center}:host .form-group.no-label .input-row{justify-content:center}:host .input-row{display:flex}:host .input-row ::ng-deep input{flex:1}:host .input-row ::ng-deep input[disabled]{background-color:var(--color-component-bg-200)}:host .input-row button.edit-button{margin:0;border-radius:0 3px 3px 0}:host .input-row.has-toggle ::ng-deep input{border-top-right-radius:0!important;border-bottom-right-radius:0!important;border-right:none}:host .input-row ::ng-deep clr-toggle-wrapper{margin-top:8px}.tooltip.tooltip-validation.invalid:before{position:absolute;content:\"\";height:.666667rem;width:.666667rem;top:.125rem;right:.25rem;background-image:url(data:image/svg+xml;charset=utf8,%3Csvg%20version%3D%221.1%22%20viewBox%3D%225%205%2026%2026%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cdefs%3E%3Cstyle%3E.clr-i-outline%7Bfill%3A%23a32100%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctitle%3Eexclamation-circle-line%3C%2Ftitle%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20class%3D%22clr-i-outline%20clr-i-outline-path-1%22%20d%3D%22M18%2C6A12%2C12%2C0%2C1%2C0%2C30%2C18%2C12%2C12%2C0%2C0%2C0%2C18%2C6Zm0%2C22A10%2C10%2C0%2C1%2C1%2C28%2C18%2C10%2C10%2C0%2C0%2C1%2C18%2C28Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22clr-i-outline%20clr-i-outline-path-2%22%20d%3D%22M18%2C20.07a1.3%2C1.3%2C0%2C0%2C1-1.3-1.3v-6a1.3%2C1.3%2C0%2C1%2C1%2C2.6%2C0v6A1.3%2C1.3%2C0%2C0%2C1%2C18%2C20.07Z%22%3E%3C%2Fpath%3E%3Ccircle%20class%3D%22clr-i-outline%20clr-i-outline-path-3%22%20cx%3D%2217.95%22%20cy%3D%2223.02%22%20r%3D%221.5%22%3E%3C%2Fcircle%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fsvg%3E);background-repeat:no-repeat;background-size:contain;vertical-align:middle;margin:0}.tooltip .tooltip-content.tooltip-sm,.tooltip.tooltip-sm>.tooltip-content{width:5rem}.tooltip:hover>.tooltip-content{right:12px;margin-bottom:0}.tooltip:not(.invalid):hover>.tooltip-content{display:none}"]
                },] }
    ];
    FormFieldComponent.propDecorators = {
        label: [{ type: i0.Input }],
        for: [{ type: i0.Input }],
        tooltip: [{ type: i0.Input }],
        errors: [{ type: i0.Input }],
        readOnlyToggle: [{ type: i0.Input }],
        formFieldControl: [{ type: i0.ContentChild, args: [FormFieldControlDirective, { static: true },] }]
    };

    /**
     * Like the {@link FormFieldComponent} but for content which is not a form control. Used
     * to keep a consistent layout with other form fields in the form.
     */
    var FormItemComponent = /** @class */ (function () {
        function FormItemComponent() {
        }
        return FormItemComponent;
    }());
    FormItemComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-form-item',
                    template: "<div class=\"form-group\">\n    <label class=\"clr-control-label\">{{ label }}</label>\n    <div class=\"content\"><ng-content></ng-content></div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}:host .form-group>.content{flex:1;max-width:20rem}"]
                },] }
    ];
    FormItemComponent.propDecorators = {
        label: [{ type: i0.Input }]
    };

    var FormattedAddressComponent = /** @class */ (function () {
        function FormattedAddressComponent() {
        }
        FormattedAddressComponent.prototype.getCountryName = function () {
            if (this.isAddressFragment(this.address)) {
                return this.address.country.name;
            }
            else {
                return this.address.country || '';
            }
        };
        FormattedAddressComponent.prototype.getCustomFields = function () {
            var customFields = this.address.customFields;
            if (customFields) {
                return Object.entries(customFields)
                    .filter(function (_c) {
                    var _d = __read(_c, 1), key = _d[0];
                    return key !== '__typename';
                })
                    .map(function (_c) {
                    var _d = __read(_c, 2), key = _d[0], value = _d[1];
                    var _a, _b;
                    return ({ key: key, value: (_b = (_a = value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '-' });
                });
            }
            else {
                return [];
            }
        };
        FormattedAddressComponent.prototype.isAddressFragment = function (input) {
            return typeof input.country !== 'string';
        };
        return FormattedAddressComponent;
    }());
    FormattedAddressComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-formatted-address',
                    template: "<ul class=\"address-lines\">\n    <li *ngIf=\"address.fullName\">{{ address.fullName }}</li>\n    <li *ngIf=\"address.streetLine1\">{{ address.streetLine1 }}</li>\n    <li *ngIf=\"address.streetLine2\">{{ address.streetLine2 }}</li>\n    <li *ngIf=\"address.city\">{{ address.city }}</li>\n    <li *ngIf=\"address.province\">{{ address.province }}</li>\n    <li *ngIf=\"address.postalCode\">{{ address.postalCode }}</li>\n    <li *ngIf=\"address.country\">\n        <clr-icon shape=\"world\" size=\"12\"></clr-icon>\n        {{ getCountryName() }}\n    </li>\n    <li *ngIf=\"address.phoneNumber\">\n        <clr-icon shape=\"phone-handset\" size=\"12\"></clr-icon>\n        {{ address.phoneNumber }}\n    </li>\n    <li *ngFor=\"let customField of getCustomFields()\" class=\"custom-field\">\n        <vdr-labeled-data [label]=\"customField.key\">{{ customField.value }}</vdr-labeled-data>\n    </li>\n</ul>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".address-lines{list-style-type:none;line-height:1.2em}.custom-field{margin-top:6px}"]
                },] }
    ];
    FormattedAddressComponent.propDecorators = {
        address: [{ type: i0.Input }]
    };

    var HelpTooltipComponent = /** @class */ (function () {
        function HelpTooltipComponent() {
        }
        return HelpTooltipComponent;
    }());
    HelpTooltipComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-help-tooltip',
                    template: "<clr-tooltip>\n    <clr-icon clrTooltipTrigger shape=\"help\" size=\"14\"></clr-icon>\n    <clr-tooltip-content [clrPosition]=\"position\" clrSize=\"md\" *clrIfOpen>\n        <span>{{ content }}</span>\n    </clr-tooltip-content>\n</clr-tooltip>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    HelpTooltipComponent.propDecorators = {
        content: [{ type: i0.Input }],
        position: [{ type: i0.Input }]
    };

    var HistoryEntryDetailComponent = /** @class */ (function () {
        function HistoryEntryDetailComponent() {
        }
        return HistoryEntryDetailComponent;
    }());
    HistoryEntryDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-history-entry-detail',
                    template: "<vdr-dropdown>\n    <button class=\"btn btn-link btn-sm details-button\" vdrDropdownTrigger>\n        <clr-icon shape=\"details\" size=\"12\"></clr-icon>\n        {{ 'common.details' | translate }}\n    </button>\n    <vdr-dropdown-menu>\n        <div class=\"entry-dropdown\">\n            <ng-content></ng-content>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".entry-dropdown{margin:0 12px}.details-button{margin:0}"]
                },] }
    ];

    /**
     * A control for setting the number of items per page in a paginated list.
     */
    var ItemsPerPageControlsComponent = /** @class */ (function () {
        function ItemsPerPageControlsComponent() {
            this.itemsPerPage = 10;
            this.itemsPerPageChange = new i0.EventEmitter();
        }
        return ItemsPerPageControlsComponent;
    }());
    ItemsPerPageControlsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-items-per-page-controls',
                    template: "<div class=\"select\">\n    <select [ngModel]=\"itemsPerPage\" (change)=\"itemsPerPageChange.emit($event.target.value)\">\n        <option [value]=\"10\">{{ 'common.items-per-page-option' | translate: { count: 10 } }}</option>\n        <option [value]=\"25\">{{ 'common.items-per-page-option' | translate: { count: 25 } }}</option>\n        <option [value]=\"50\">{{ 'common.items-per-page-option' | translate: { count: 50 } }}</option>\n        <option [value]=\"100\">{{ 'common.items-per-page-option' | translate: { count: 100 } }}</option>\n    </select>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    ItemsPerPageControlsComponent.propDecorators = {
        itemsPerPage: [{ type: i0.Input }],
        itemsPerPageChange: [{ type: i0.Output }]
    };

    var LabeledDataComponent = /** @class */ (function () {
        function LabeledDataComponent() {
        }
        return LabeledDataComponent;
    }());
    LabeledDataComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-labeled-data',
                    template: "<div class=\"label-title\">{{ label }}</div>\n<ng-content></ng-content>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;margin-bottom:6px}.label-title{font-size:12px;color:var(--color-text-300);line-height:12px;margin-bottom:-4px}"]
                },] }
    ];
    LabeledDataComponent.propDecorators = {
        label: [{ type: i0.Input }]
    };

    var LanguageSelectorComponent = /** @class */ (function () {
        function LanguageSelectorComponent() {
            this.disabled = false;
            this.languageCodeChange = new i0.EventEmitter();
        }
        return LanguageSelectorComponent;
    }());
    LanguageSelectorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-language-selector',
                    template: "<ng-container *ngIf=\"1 < availableLanguageCodes?.length\">\n    <vdr-dropdown>\n        <button type=\"button\" class=\"btn btn-sm btn-link\" vdrDropdownTrigger [disabled]=\"disabled\">\n            <clr-icon shape=\"world\"></clr-icon>\n            {{ 'common.language' | translate }}: {{ 'lang.' + currentLanguageCode | translate | uppercase }}\n            <clr-icon shape=\"caret down\"></clr-icon>\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <button\n                type=\"button\"\n                *ngFor=\"let code of availableLanguageCodes\"\n                (click)=\"languageCodeChange.emit(code)\"\n                vdrDropdownItem\n            >\n                {{ 'lang.' + code | translate }} <span class=\"code\">{{ code }}</span>\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</ng-container>\n",
                    styles: [".code{color:var(--color-grey-400)}"]
                },] }
    ];
    LanguageSelectorComponent.propDecorators = {
        currentLanguageCode: [{ type: i0.Input }],
        availableLanguageCodes: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        languageCodeChange: [{ type: i0.Output }]
    };

    /**
     * A helper directive used to correctly embed the modal buttons in the {@link ModalDialogComponent}.
     */
    var DialogButtonsDirective = /** @class */ (function () {
        function DialogButtonsDirective(modal, templateRef) {
            this.modal = modal;
            this.templateRef = templateRef;
        }
        DialogButtonsDirective.prototype.ngOnInit = function () {
            var _this = this;
            // setTimeout due to https://github.com/angular/angular/issues/15634
            setTimeout(function () { return _this.modal.registerButtonsTemplate(_this.templateRef); });
        };
        return DialogButtonsDirective;
    }());
    DialogButtonsDirective.decorators = [
        { type: i0.Directive, args: [{ selector: '[vdrDialogButtons]' },] }
    ];
    DialogButtonsDirective.ctorParameters = function () { return [
        { type: ModalDialogComponent },
        { type: i0.TemplateRef }
    ]; };

    /**
     * A helper component used to embed a component instance into the {@link ModalDialogComponent}
     */
    var DialogComponentOutletComponent = /** @class */ (function () {
        function DialogComponentOutletComponent(viewContainerRef, componentFactoryResolver) {
            this.viewContainerRef = viewContainerRef;
            this.componentFactoryResolver = componentFactoryResolver;
            this.create = new i0.EventEmitter();
        }
        DialogComponentOutletComponent.prototype.ngOnInit = function () {
            var factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
            var componentRef = this.viewContainerRef.createComponent(factory);
            this.create.emit(componentRef.instance);
        };
        return DialogComponentOutletComponent;
    }());
    DialogComponentOutletComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-dialog-component-outlet',
                    template: ""
                },] }
    ];
    DialogComponentOutletComponent.ctorParameters = function () { return [
        { type: i0.ViewContainerRef },
        { type: i0.ComponentFactoryResolver }
    ]; };
    DialogComponentOutletComponent.propDecorators = {
        component: [{ type: i0.Input }],
        create: [{ type: i0.Output }]
    };

    /**
     * A helper directive used to correctly embed the modal title in the {@link ModalDialogComponent}.
     */
    var DialogTitleDirective = /** @class */ (function () {
        function DialogTitleDirective(modal, templateRef) {
            this.modal = modal;
            this.templateRef = templateRef;
        }
        DialogTitleDirective.prototype.ngOnInit = function () {
            var _this = this;
            // setTimeout due to https://github.com/angular/angular/issues/15634
            setTimeout(function () { return _this.modal.registerTitleTemplate(_this.templateRef); });
        };
        return DialogTitleDirective;
    }());
    DialogTitleDirective.decorators = [
        { type: i0.Directive, args: [{ selector: '[vdrDialogTitle]' },] }
    ];
    DialogTitleDirective.ctorParameters = function () { return [
        { type: ModalDialogComponent },
        { type: i0.TemplateRef }
    ]; };

    /**
     * This component displays a plain JavaScript object as an expandable tree.
     */
    var ObjectTreeComponent = /** @class */ (function () {
        function ObjectTreeComponent(parent) {
            this.isArrayItem = false;
            if (parent) {
                this.depth = parent.depth + 1;
            }
            else {
                this.depth = 0;
            }
        }
        ObjectTreeComponent.prototype.ngOnInit = function () {
            this.entries = this.getEntries(this.value);
            this.expanded = this.depth === 0 || this.isArrayItem;
            this.valueIsArray = Object.keys(this.value).every(function (v) { return Number.isInteger(+v); });
        };
        ObjectTreeComponent.prototype.isObject = function (value) {
            return typeof value === 'object' && value !== null;
        };
        ObjectTreeComponent.prototype.getEntries = function (inputValue) {
            if (typeof inputValue === 'string') {
                return [{ key: '', value: inputValue }];
            }
            return Object.entries(inputValue).map(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                return ({ key: key, value: value });
            });
        };
        return ObjectTreeComponent;
    }());
    ObjectTreeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-object-tree',
                    template: "<button class=\"icon-button\" (click)=\"expanded = !expanded\" *ngIf=\"depth !== 0 && !isArrayItem\">\n    <clr-icon shape=\"caret\" size=\"12\" [dir]=\"expanded ? 'down' : 'right'\"></clr-icon>\n</button>\n<ul\n    class=\"object-tree-node\"\n    [ngClass]=\"'depth-' + depth\"\n    [class.array-value]=\"valueIsArray\"\n    [class.array-item]=\"isArrayItem\"\n    [class.expanded]=\"expanded\"\n>\n    <li *ngFor=\"let entry of entries\">\n        <span class=\"key\" *ngIf=\"entry.key\">{{ entry.key }}:</span>\n        <ng-container *ngIf=\"isObject(entry.value)\">\n            <vdr-object-tree [value]=\"entry.value\" [isArrayItem]=\"valueIsArray\"></vdr-object-tree>\n        </ng-container>\n        <ng-container *ngIf=\"!isObject(entry.value)\">\n            {{ entry.value }}\n        </ng-container>\n    </li>\n</ul>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".object-tree-node{list-style-type:none;line-height:16px;font-size:12px;overflow:hidden;max-height:0}.object-tree-node.depth-0{margin-left:0;margin-top:8px}.object-tree-node.depth-1,.object-tree-node.depth-2,.object-tree-node.depth-3,.object-tree-node.depth-4,.object-tree-node.depth-5,.object-tree-node.depth-6{margin-left:6px}.object-tree-node.expanded{max-height:5000px}.object-tree-node.array-item{margin-top:-16px;margin-left:16px}.object-tree-node.array-value.expanded>li+li{margin-top:6px}.key{color:var(--color-text-300)}"]
                },] }
    ];
    ObjectTreeComponent.ctorParameters = function () { return [
        { type: ObjectTreeComponent, decorators: [{ type: i0.Optional }, { type: i0.SkipSelf }] }
    ]; };
    ObjectTreeComponent.propDecorators = {
        value: [{ type: i0.Input }],
        isArrayItem: [{ type: i0.Input }]
    };

    var OrderStateLabelComponent = /** @class */ (function () {
        function OrderStateLabelComponent() {
        }
        Object.defineProperty(OrderStateLabelComponent.prototype, "chipColorType", {
            get: function () {
                switch (this.state) {
                    case 'AddingItems':
                    case 'ArrangingPayment':
                        return '';
                    case 'Delivered':
                        return 'success';
                    case 'Cancelled':
                        return 'error';
                    case 'PaymentAuthorized':
                    case 'PaymentSettled':
                    case 'PartiallyDelivered':
                    case 'PartiallyShipped':
                    case 'Shipped':
                    default:
                        return 'warning';
                }
            },
            enumerable: false,
            configurable: true
        });
        return OrderStateLabelComponent;
    }());
    OrderStateLabelComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-order-state-label',
                    template: "<vdr-chip [ngClass]=\"state\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"success-standard\" *ngIf=\"state === 'Delivered'\" size=\"12\"></clr-icon>\n    <clr-icon shape=\"success-standard\" *ngIf=\"state === 'PartiallyDelivered'\" size=\"12\"></clr-icon>\n    <clr-icon shape=\"ban\" *ngIf=\"state === 'Cancelled'\" size=\"12\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n    <ng-content></ng-content>\n</vdr-chip>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["clr-icon{margin-right:3px}"]
                },] }
    ];
    OrderStateLabelComponent.propDecorators = {
        state: [{ type: i0.Input }]
    };

    var PaginationControlsComponent = /** @class */ (function () {
        function PaginationControlsComponent() {
            this.pageChange = new i0.EventEmitter();
        }
        return PaginationControlsComponent;
    }());
    PaginationControlsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-pagination-controls',
                    template: "<pagination-template #p=\"paginationApi\" (pageChange)=\"pageChange.emit($event)\">\n    <ul>\n        <li class=\"pagination-previous\">\n            <a *ngIf=\"!p.isFirstPage()\" (click)=\"p.previous()\" (keyup.enter)=\"p.previous()\" tabindex=\"0\">\u00AB</a>\n            <div *ngIf=\"p.isFirstPage()\">\u00AB</div>\n        </li>\n\n        <li *ngFor=\"let page of p.pages\">\n            <a\n                (click)=\"p.setCurrent(page.value)\"\n                (keyup.enter)=\"p.setCurrent(page.value)\"\n                *ngIf=\"p.getCurrent() !== page.value\"\n                tabindex=\"0\"\n            >\n                {{ page.label }}\n            </a>\n\n            <div class=\"current\" *ngIf=\"p.getCurrent() === page.value\">{{ page.label }}</div>\n        </li>\n\n        <li class=\"pagination-next\">\n            <a *ngIf=\"!p.isLastPage()\" (click)=\"p.next()\" (keyup.enter)=\"p.next()\" tabindex=\"0\">\u00BB</a>\n            <div *ngIf=\"p.isLastPage()\">\u00BB</div>\n        </li>\n    </ul>\n</pagination-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["pagination-template{display:block}pagination-template ul{list-style-type:none;display:flex;justify-content:center}pagination-template li{transition:border-bottom-color .2s}pagination-template li>a{cursor:pointer}pagination-template li>a:focus,pagination-template li>a:hover{border-bottom-color:var(--color-grey-300);text-decoration:none}pagination-template li>a,pagination-template li>div{padding:3px 12px;display:block;border-bottom:3px solid transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}pagination-template li>div.current{border-bottom-color:var(--color-primary-500)}"]
                },] }
    ];
    PaginationControlsComponent.propDecorators = {
        currentPage: [{ type: i0.Input }],
        itemsPerPage: [{ type: i0.Input }],
        totalItems: [{ type: i0.Input }],
        pageChange: [{ type: i0.Output }]
    };

    var ProductSelectorComponent = /** @class */ (function () {
        function ProductSelectorComponent(dataService) {
            this.dataService = dataService;
            this.searchInput$ = new rxjs.Subject();
            this.searchLoading = false;
            this.productSelected = new i0.EventEmitter();
        }
        ProductSelectorComponent.prototype.ngOnInit = function () {
            this.initSearchResults();
        };
        ProductSelectorComponent.prototype.initSearchResults = function () {
            var _this = this;
            var searchItems$ = this.searchInput$.pipe(operators.debounceTime(200), operators.distinctUntilChanged(), operators.tap(function () { return (_this.searchLoading = true); }), operators.switchMap(function (term) {
                if (!term) {
                    return rxjs.of([]);
                }
                return _this.dataService.product
                    .productSelectorSearch(term, 10)
                    .mapSingle(function (result) { return result.search.items; });
            }), operators.tap(function () { return (_this.searchLoading = false); }));
            var clear$ = this.productSelected.pipe(operators.mapTo([]));
            this.searchResults$ = rxjs.concat(rxjs.of([]), rxjs.merge(searchItems$, clear$));
        };
        ProductSelectorComponent.prototype.selectResult = function (product) {
            if (product) {
                this.productSelected.emit(product);
                this.ngSelect.clearModel();
            }
        };
        return ProductSelectorComponent;
    }());
    ProductSelectorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-selector',
                    template: "<ng-select\n    #autoComplete\n    [items]=\"searchResults$ | async\"\n    [addTag]=\"false\"\n    [multiple]=\"false\"\n    [hideSelected]=\"true\"\n    [loading]=\"searchLoading\"\n    [typeahead]=\"searchInput$\"\n    [appendTo]=\"'body'\"\n    [placeholder]=\"'settings.search-by-product-name-or-sku' | translate\"\n    (change)=\"selectResult($event)\"\n>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <img [src]=\"item.productAsset | assetPreview: 32\">\n        {{ item.productVariantName }}\n        <small class=\"sku\">{{ item.sku }}</small>\n    </ng-template>\n</ng-select>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}.sku{margin-left:12px;color:var(--color-grey-500)}"]
                },] }
    ];
    ProductSelectorComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };
    ProductSelectorComponent.propDecorators = {
        productSelected: [{ type: i0.Output }],
        ngSelect: [{ type: i0.ViewChild, args: ['autoComplete', { static: true },] }]
    };

    var ExternalImageDialogComponent = /** @class */ (function () {
        function ExternalImageDialogComponent() {
            this.previewLoaded = false;
        }
        ExternalImageDialogComponent.prototype.ngOnInit = function () {
            this.form = new forms.FormGroup({
                src: new forms.FormControl(this.existing ? this.existing.src : '', forms.Validators.required),
                title: new forms.FormControl(this.existing ? this.existing.title : ''),
                alt: new forms.FormControl(this.existing ? this.existing.alt : ''),
            });
        };
        ExternalImageDialogComponent.prototype.select = function () {
            this.resolveWith(this.form.value);
        };
        ExternalImageDialogComponent.prototype.onImageLoad = function (event) {
            this.previewLoaded = true;
        };
        ExternalImageDialogComponent.prototype.onImageError = function (event) {
            this.previewLoaded = false;
        };
        return ExternalImageDialogComponent;
    }());
    ExternalImageDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-external-image-dialog',
                    template: "<div class=\"flex\">\n    <form [formGroup]=\"form\" class=\"flex-spacer\" clrForm clrLayout=\"vertical\">\n        <clr-input-container class=\"expand\">\n            <label>{{ 'editor.image-src' | translate }}</label>\n            <input clrInput type=\"text\" formControlName=\"src\" />\n        </clr-input-container>\n        <clr-input-container class=\"expand\">\n            <label>{{ 'editor.image-title' | translate }}</label>\n            <input clrInput type=\"text\" formControlName=\"title\" />\n        </clr-input-container>\n        <clr-input-container class=\"expand\">\n            <label>{{ 'editor.image-alt' | translate }}</label>\n            <input clrInput type=\"text\" formControlName=\"alt\" />\n        </clr-input-container>\n    </form>\n    <div class=\"preview\">\n        <img\n            [src]=\"form.get('src')?.value\"\n            [class.visible]=\"previewLoaded\"\n            (load)=\"onImageLoad($event)\"\n            (error)=\"onImageError($event)\"\n        />\n        <div class=\"placeholder\" *ngIf=\"!previewLoaded\">\n            <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n        </div>\n    </div>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"form.invalid || !previewLoaded\">\n        {{ 'editor.insert-image' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".preview{display:flex;align-items:center;justify-content:center;max-width:150px;margin-left:12px}.preview img{max-width:100%;display:none}.preview img.visible{display:block}.preview .placeholder{color:var(--color-grey-300)}"]
                },] }
    ];

    var LinkDialogComponent = /** @class */ (function () {
        function LinkDialogComponent() {
        }
        LinkDialogComponent.prototype.ngOnInit = function () {
            this.form = new forms.FormGroup({
                href: new forms.FormControl(this.existing ? this.existing.href : '', forms.Validators.required),
                title: new forms.FormControl(this.existing ? this.existing.title : ''),
            });
        };
        LinkDialogComponent.prototype.remove = function () {
            this.resolveWith({
                title: '',
                href: '',
            });
        };
        LinkDialogComponent.prototype.select = function () {
            this.resolveWith(this.form.value);
        };
        return LinkDialogComponent;
    }());
    LinkDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-link-dialog',
                    template: "<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'editor.link-href' | translate\" for=\"href\">\n        <input id=\"href\" type=\"text\" formControlName=\"href\" />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'editor.link-title' | translate\" for=\"title\">\n        <input id=\"title\" type=\"text\" formControlName=\"title\" />\n    </vdr-form-field>\n</form>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"remove()\" *ngIf=\"existing\">\n        <clr-icon shape=\"unlink\"></clr-icon> {{ 'editor.remove-link' | translate }}\n    </button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"form.invalid\">\n        {{ 'editor.set-link' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    // : (NodeType) → InputRule
    // Given a blockquote node type, returns an input rule that turns `"> "`
    // at the start of a textblock into a blockquote.
    function blockQuoteRule(nodeType) {
        return prosemirrorInputrules.wrappingInputRule(/^\s*>\s$/, nodeType);
    }
    // : (NodeType) → InputRule
    // Given a list node type, returns an input rule that turns a number
    // followed by a dot at the start of a textblock into an ordered list.
    function orderedListRule(nodeType) {
        return prosemirrorInputrules.wrappingInputRule(/^(\d+)\.\s$/, nodeType, function (match) { return ({ order: +match[1] }); }, function (match, node) { return node.childCount + node.attrs.order === +match[1]; });
    }
    // : (NodeType) → InputRule
    // Given a list node type, returns an input rule that turns a bullet
    // (dash, plush, or asterisk) at the start of a textblock into a
    // bullet list.
    function bulletListRule(nodeType) {
        return prosemirrorInputrules.wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
    }
    // : (NodeType) → InputRule
    // Given a code block node type, returns an input rule that turns a
    // textblock starting with three backticks into a code block.
    function codeBlockRule(nodeType) {
        return prosemirrorInputrules.textblockTypeInputRule(/^```$/, nodeType);
    }
    // : (NodeType, number) → InputRule
    // Given a node type and a maximum level, creates an input rule that
    // turns up to that number of `#` characters followed by a space at
    // the start of a textblock into a heading whose level corresponds to
    // the number of `#` signs.
    function headingRule(nodeType, maxLevel) {
        return prosemirrorInputrules.textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, function (match) { return ({
            level: match[1].length,
        }); });
    }
    // : (Schema) → Plugin
    // A set of input rules for creating the basic block quotes, lists,
    // code blocks, and heading.
    function buildInputRules(schema) {
        var rules = prosemirrorInputrules.smartQuotes.concat(prosemirrorInputrules.ellipsis, prosemirrorInputrules.emDash);
        var type;
        // tslint:disable:no-conditional-assignment
        if ((type = schema.nodes.blockquote)) {
            rules.push(blockQuoteRule(type));
        }
        if ((type = schema.nodes.ordered_list)) {
            rules.push(orderedListRule(type));
        }
        if ((type = schema.nodes.bullet_list)) {
            rules.push(bulletListRule(type));
        }
        if ((type = schema.nodes.code_block)) {
            rules.push(codeBlockRule(type));
        }
        if ((type = schema.nodes.heading)) {
            rules.push(headingRule(type, 6));
        }
        return prosemirrorInputrules.inputRules({ rules: rules });
    }

    var mac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false;
    // :: (Schema, ?Object) → Object
    // Inspect the given schema looking for marks and nodes from the
    // basic schema, and if found, add key bindings related to them.
    // This will add:
    //
    // * **Mod-b** for toggling [strong](#schema-basic.StrongMark)
    // * **Mod-i** for toggling [emphasis](#schema-basic.EmMark)
    // * **Mod-`** for toggling [code font](#schema-basic.CodeMark)
    // * **Ctrl-Shift-0** for making the current textblock a paragraph
    // * **Ctrl-Shift-1** to **Ctrl-Shift-Digit6** for making the current
    //   textblock a heading of the corresponding level
    // * **Ctrl-Shift-Backslash** to make the current textblock a code block
    // * **Ctrl-Shift-8** to wrap the selection in an ordered list
    // * **Ctrl-Shift-9** to wrap the selection in a bullet list
    // * **Ctrl->** to wrap the selection in a block quote
    // * **Enter** to split a non-empty textblock in a list item while at
    //   the same time splitting the list item
    // * **Mod-Enter** to insert a hard break
    // * **Mod-_** to insert a horizontal rule
    // * **Backspace** to undo an input rule
    // * **Alt-ArrowUp** to `joinUp`
    // * **Alt-ArrowDown** to `joinDown`
    // * **Mod-BracketLeft** to `lift`
    // * **Escape** to `selectParentNode`
    //
    // You can suppress or map these bindings by passing a `mapKeys`
    // argument, which maps key names (say `"Mod-B"` to either `false`, to
    // remove the binding, or a new key name string.
    function buildKeymap(schema, mapKeys) {
        var keys = {};
        var type;
        function bind(key, cmd) {
            if (mapKeys) {
                var mapped = mapKeys[key];
                if (mapped === false) {
                    return;
                }
                if (mapped) {
                    key = mapped;
                }
            }
            keys[key] = cmd;
        }
        bind('Mod-z', prosemirrorHistory.undo);
        bind('Shift-Mod-z', prosemirrorHistory.redo);
        bind('Backspace', prosemirrorInputrules.undoInputRule);
        if (!mac) {
            bind('Mod-y', prosemirrorHistory.redo);
        }
        bind('Alt-ArrowUp', prosemirrorCommands.joinUp);
        bind('Alt-ArrowDown', prosemirrorCommands.joinDown);
        bind('Mod-BracketLeft', prosemirrorCommands.lift);
        bind('Escape', prosemirrorCommands.selectParentNode);
        // tslint:disable:no-conditional-assignment
        if ((type = schema.marks.strong)) {
            bind('Mod-b', prosemirrorCommands.toggleMark(type));
            bind('Mod-B', prosemirrorCommands.toggleMark(type));
        }
        if ((type = schema.marks.em)) {
            bind('Mod-i', prosemirrorCommands.toggleMark(type));
            bind('Mod-I', prosemirrorCommands.toggleMark(type));
        }
        if ((type = schema.marks.code)) {
            bind('Mod-`', prosemirrorCommands.toggleMark(type));
        }
        if ((type = schema.nodes.bullet_list)) {
            bind('Shift-Ctrl-8', prosemirrorSchemaList.wrapInList(type));
        }
        if ((type = schema.nodes.ordered_list)) {
            bind('Shift-Ctrl-9', prosemirrorSchemaList.wrapInList(type));
        }
        if ((type = schema.nodes.blockquote)) {
            bind('Ctrl->', prosemirrorCommands.wrapIn(type));
        }
        if ((type = schema.nodes.hard_break)) {
            var br_1 = type;
            var cmd = prosemirrorCommands.chainCommands(prosemirrorCommands.exitCode, function (state, dispatch) {
                // tslint:disable-next-line:no-non-null-assertion
                dispatch(state.tr.replaceSelectionWith(br_1.create()).scrollIntoView());
                return true;
            });
            bind('Mod-Enter', cmd);
            bind('Shift-Enter', cmd);
            if (mac) {
                bind('Ctrl-Enter', cmd);
            }
        }
        if ((type = schema.nodes.list_item)) {
            bind('Enter', prosemirrorSchemaList.splitListItem(type));
            bind('Mod-[', prosemirrorSchemaList.liftListItem(type));
            bind('Mod-]', prosemirrorSchemaList.sinkListItem(type));
        }
        if ((type = schema.nodes.paragraph)) {
            bind('Shift-Ctrl-0', prosemirrorCommands.setBlockType(type));
        }
        if ((type = schema.nodes.code_block)) {
            bind('Shift-Ctrl-\\', prosemirrorCommands.setBlockType(type));
        }
        if ((type = schema.nodes.heading)) {
            for (var i = 1; i <= 6; i++) {
                bind('Shift-Ctrl-' + i, prosemirrorCommands.setBlockType(type, { level: i }));
            }
        }
        if ((type = schema.nodes.horizontal_rule)) {
            var hr_1 = type;
            bind('Mod-_', function (state, dispatch) {
                dispatch(state.tr.replaceSelectionWith(hr_1.create()).scrollIntoView());
                return true;
            });
        }
        return keys;
    }

    function markActive(state, type) {
        var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
        if (empty) {
            return type.isInSet(state.storedMarks || $from.marks());
        }
        else {
            return state.doc.rangeHasMark(from, to, type);
        }
    }
    function canInsert(state, nodeType) {
        var $from = state.selection.$from;
        for (var d = $from.depth; d >= 0; d--) {
            var index = $from.index(d);
            if ($from.node(d).canReplaceWith(index, index, nodeType)) {
                return true;
            }
        }
        return false;
    }

    function insertImageItem(nodeType, modalService) {
        return new prosemirrorMenu.MenuItem({
            title: 'Insert image',
            label: 'Image',
            class: '',
            css: '',
            enable: function (state) {
                return canInsert(state, nodeType);
            },
            run: function (state, _, view) {
                var attrs;
                if (state.selection instanceof prosemirrorState.NodeSelection && state.selection.node.type === nodeType) {
                    attrs = state.selection.node.attrs;
                }
                modalService
                    .fromComponent(ExternalImageDialogComponent, {
                    closable: true,
                    locals: {
                        existing: attrs,
                    },
                })
                    .subscribe(function (result) {
                    if (result) {
                        // tslint:disable-next-line:no-non-null-assertion
                        view.dispatch(view.state.tr.replaceSelectionWith(nodeType.createAndFill(result)));
                    }
                    view.focus();
                });
            },
        });
    }

    function selectionIsWithinLink(state, anchor, head) {
        var doc = state.doc;
        var headLink = doc
            .resolve(head)
            .marks()
            .find(function (m) { return m.type.name === 'link'; });
        var anchorLink = doc
            .resolve(anchor)
            .marks()
            .find(function (m) { return m.type.name === 'link'; });
        if (headLink && anchorLink && headLink.eq(anchorLink)) {
            return true;
        }
        return false;
    }
    function linkItem(linkMark, modalService) {
        return new prosemirrorMenu.MenuItem({
            title: 'Add or remove link',
            icon: prosemirrorMenu.icons.link,
            class: '',
            css: '',
            active: function (state) {
                return markActive(state, linkMark);
            },
            enable: function (state) {
                var selection = state.selection;
                return !selection.empty || selectionIsWithinLink(state, selection.anchor, selection.head);
            },
            run: function (state, dispatch, view) {
                var attrs;
                var selection = state.selection, doc = state.doc;
                if (selection instanceof prosemirrorState.TextSelection &&
                    selectionIsWithinLink(state, selection.anchor + 1, selection.head - 1)) {
                    var mark = doc
                        .resolve(selection.anchor + 1)
                        .marks()
                        .find(function (m) { return m.type.name === 'link'; });
                    if (mark) {
                        attrs = mark.attrs;
                    }
                }
                modalService
                    .fromComponent(LinkDialogComponent, {
                    closable: true,
                    locals: {
                        existing: attrs,
                    },
                })
                    .subscribe(function (result) {
                    var tr = state.tr;
                    if (result) {
                        var _a = selection.ranges[0], $from = _a.$from, $to = _a.$to;
                        tr = tr.removeMark($from.pos, $to.pos, linkMark);
                        if (result.href !== '') {
                            tr = tr.addMark($from.pos, $to.pos, linkMark.create(result));
                        }
                    }
                    dispatch(tr.scrollIntoView());
                    view.focus();
                });
                return true;
            },
        });
    }

    // Helpers to create specific types of items
    function cmdItem(cmd, options) {
        var passedOptions = {
            label: options.title,
            run: cmd,
        };
        // tslint:disable-next-line:forin
        for (var prop in options) {
            passedOptions[prop] = options[prop];
        }
        if ((!options.enable || options.enable === true) && !options.select) {
            passedOptions[options.enable ? 'enable' : 'select'] = function (state) { return cmd(state); };
        }
        return new prosemirrorMenu.MenuItem(passedOptions);
    }
    function markItem(markType, options) {
        var passedOptions = {
            active: function (state) {
                return markActive(state, markType);
            },
            enable: true,
        };
        // tslint:disable-next-line:forin
        for (var prop in options) {
            passedOptions[prop] = options[prop];
        }
        return cmdItem(prosemirrorCommands.toggleMark(markType), passedOptions);
    }
    function wrapListItem(nodeType, options) {
        return cmdItem(prosemirrorSchemaList.wrapInList(nodeType, options.attrs), options);
    }
    // :: (Schema) → Object
    // Given a schema, look for default mark and node types in it and
    // return an object with relevant menu items relating to those marks:
    //
    // **`toggleStrong`**`: MenuItem`
    //   : A menu item to toggle the [strong mark](#schema-basic.StrongMark).
    //
    // **`toggleEm`**`: MenuItem`
    //   : A menu item to toggle the [emphasis mark](#schema-basic.EmMark).
    //
    // **`toggleCode`**`: MenuItem`
    //   : A menu item to toggle the [code font mark](#schema-basic.CodeMark).
    //
    // **`toggleLink`**`: MenuItem`
    //   : A menu item to toggle the [link mark](#schema-basic.LinkMark).
    //
    // **`insertImage`**`: MenuItem`
    //   : A menu item to insert an [image](#schema-basic.Image).
    //
    // **`wrapBulletList`**`: MenuItem`
    //   : A menu item to wrap the selection in a [bullet list](#schema-list.BulletList).
    //
    // **`wrapOrderedList`**`: MenuItem`
    //   : A menu item to wrap the selection in an [ordered list](#schema-list.OrderedList).
    //
    // **`wrapBlockQuote`**`: MenuItem`
    //   : A menu item to wrap the selection in a [block quote](#schema-basic.BlockQuote).
    //
    // **`makeParagraph`**`: MenuItem`
    //   : A menu item to set the current textblock to be a normal
    //     [paragraph](#schema-basic.Paragraph).
    //
    // **`makeCodeBlock`**`: MenuItem`
    //   : A menu item to set the current textblock to be a
    //     [code block](#schema-basic.CodeBlock).
    //
    // **`makeHead[N]`**`: MenuItem`
    //   : Where _N_ is 1 to 6. Menu items to set the current textblock to
    //     be a [heading](#schema-basic.Heading) of level _N_.
    //
    // **`insertHorizontalRule`**`: MenuItem`
    //   : A menu item to insert a horizontal rule.
    //
    // The return value also contains some prefabricated menu elements and
    // menus, that you can use instead of composing your own menu from
    // scratch:
    //
    // **`insertMenu`**`: Dropdown`
    //   : A dropdown containing the `insertImage` and
    //     `insertHorizontalRule` items.
    //
    // **`typeMenu`**`: Dropdown`
    //   : A dropdown containing the items for making the current
    //     textblock a paragraph, code block, or heading.
    //
    // **`fullMenu`**`: [[MenuElement]]`
    //   : An array of arrays of menu elements for use as the full menu
    //     for, for example the [menu bar](https://github.com/prosemirror/prosemirror-menu#user-content-menubar).
    function buildMenuItems(schema, modalService) {
        var r = {};
        var type;
        // tslint:disable:no-conditional-assignment
        if ((type = schema.marks.strong)) {
            r.toggleStrong = markItem(type, { title: 'Toggle strong style', icon: prosemirrorMenu.icons.strong });
        }
        if ((type = schema.marks.em)) {
            r.toggleEm = markItem(type, { title: 'Toggle emphasis', icon: prosemirrorMenu.icons.em });
        }
        if ((type = schema.marks.code)) {
            r.toggleCode = markItem(type, { title: 'Toggle code font', icon: prosemirrorMenu.icons.code });
        }
        if ((type = schema.marks.link)) {
            r.toggleLink = linkItem(type, modalService);
        }
        if ((type = schema.nodes.image)) {
            r.insertImage = insertImageItem(type, modalService);
        }
        if ((type = schema.nodes.bullet_list)) {
            r.wrapBulletList = wrapListItem(type, {
                title: 'Wrap in bullet list',
                icon: prosemirrorMenu.icons.bulletList,
            });
        }
        if ((type = schema.nodes.ordered_list)) {
            r.wrapOrderedList = wrapListItem(type, {
                title: 'Wrap in ordered list',
                icon: prosemirrorMenu.icons.orderedList,
            });
        }
        if ((type = schema.nodes.blockquote)) {
            r.wrapBlockQuote = prosemirrorMenu.wrapItem(type, {
                title: 'Wrap in block quote',
                icon: prosemirrorMenu.icons.blockquote,
            });
        }
        if ((type = schema.nodes.paragraph)) {
            r.makeParagraph = prosemirrorMenu.blockTypeItem(type, {
                title: 'Change to paragraph',
                label: 'Plain',
            });
        }
        if ((type = schema.nodes.code_block)) {
            r.makeCodeBlock = prosemirrorMenu.blockTypeItem(type, {
                title: 'Change to code block',
                label: 'Code',
            });
        }
        if ((type = schema.nodes.heading)) {
            for (var i = 1; i <= 10; i++) {
                r['makeHead' + i] = prosemirrorMenu.blockTypeItem(type, {
                    title: 'Change to heading ' + i,
                    label: 'Level ' + i,
                    attrs: { level: i },
                });
            }
        }
        if ((type = schema.nodes.horizontal_rule)) {
            var hr_1 = type;
            r.insertHorizontalRule = new prosemirrorMenu.MenuItem({
                title: 'Insert horizontal rule',
                label: 'Horizontal rule',
                class: '',
                css: '',
                enable: function (state) {
                    return canInsert(state, hr_1);
                },
                run: function (state, dispatch) {
                    dispatch(state.tr.replaceSelectionWith(hr_1.create()));
                },
            });
        }
        var cut = function (arr) { return arr.filter(function (x) { return x; }); };
        r.insertMenu = new prosemirrorMenu.Dropdown(cut([r.insertImage, r.insertHorizontalRule]), { label: 'Insert' });
        r.typeMenu = new prosemirrorMenu.Dropdown(cut([
            r.makeParagraph,
            r.makeCodeBlock,
            r.makeHead1 &&
                new prosemirrorMenu.DropdownSubmenu(cut([r.makeHead1, r.makeHead2, r.makeHead3, r.makeHead4, r.makeHead5, r.makeHead6]), { label: 'Heading' }),
        ]), { label: 'Type...' });
        var inlineMenu = cut([r.toggleStrong, r.toggleEm, r.toggleLink]);
        r.inlineMenu = [inlineMenu];
        r.blockMenu = [
            cut([
                r.wrapBulletList,
                r.wrapOrderedList,
                r.wrapBlockQuote,
                prosemirrorMenu.joinUpItem,
                prosemirrorMenu.liftItem,
                prosemirrorMenu.selectParentNodeItem,
            ]),
        ];
        r.fullMenu = [inlineMenu].concat([[r.insertMenu, r.typeMenu]], [[prosemirrorMenu.undoItem, prosemirrorMenu.redoItem]], r.blockMenu);
        return r;
    }

    /**
     * Retrieve the start and end position of a mark
     * "Borrowed" from [tiptap](https://github.com/scrumpy/tiptap)
     */
    var getMarkRange = function (pmPosition, type) {
        if (pmPosition === void 0) { pmPosition = null; }
        if (type === void 0) { type = null; }
        if (!pmPosition || !type) {
            return false;
        }
        var start = pmPosition.parent.childAfter(pmPosition.parentOffset);
        if (!start.node) {
            return false;
        }
        var mark = start.node.marks.find(function (_a) {
            var markType = _a.type;
            return markType === type;
        });
        if (!mark) {
            return false;
        }
        var startIndex = pmPosition.index();
        var startPos = pmPosition.start() + start.offset;
        while (startIndex > 0 && mark.isInSet(pmPosition.parent.child(startIndex - 1).marks)) {
            startIndex -= 1;
            startPos -= pmPosition.parent.child(startIndex).nodeSize;
        }
        var endPos = startPos + start.node.nodeSize;
        return { from: startPos, to: endPos };
    };

    /**
     * Causes the entire link to be selected when clicked.
     */
    var linkSelectPlugin = new prosemirrorState.Plugin({
        props: {
            handleClick: function (view, pos) {
                var _a = view.state, doc = _a.doc, tr = _a.tr, schema = _a.schema;
                var range = getMarkRange(doc.resolve(pos), schema.marks.link);
                if (!range) {
                    return false;
                }
                var $start = doc.resolve(range.from);
                var $end = doc.resolve(range.to);
                var transaction = tr.setSelection(new prosemirrorState.TextSelection($start, $end));
                view.dispatch(transaction);
                return true;
            },
        },
    });

    var ProsemirrorService = /** @class */ (function () {
        function ProsemirrorService(modalService) {
            this.modalService = modalService;
            // Mix the nodes from prosemirror-schema-list into the basic schema to
            // create a schema with list support.
            this.mySchema = new prosemirrorModel.Schema({
                nodes: prosemirrorSchemaList.addListNodes(prosemirrorSchemaBasic.schema.spec.nodes, 'paragraph block*', 'block'),
                marks: prosemirrorSchemaBasic.schema.spec.marks,
            });
            this.enabled = true;
        }
        ProsemirrorService.prototype.createEditorView = function (options) {
            var _this = this;
            this.editorView = new prosemirrorView.EditorView(options.element, {
                state: this.getStateFromText(''),
                dispatchTransaction: function (tr) {
                    if (!_this.enabled) {
                        return;
                    }
                    _this.editorView.updateState(_this.editorView.state.apply(tr));
                    if (tr.docChanged) {
                        var content = _this.getTextFromState(_this.editorView.state);
                        options.onTextInput(content);
                    }
                },
                editable: function () { return options.isReadOnly(); },
            });
        };
        ProsemirrorService.prototype.update = function (text) {
            if (this.editorView) {
                var state = this.getStateFromText(text);
                if (document.body.contains(this.editorView.dom)) {
                    this.editorView.updateState(state);
                }
            }
        };
        ProsemirrorService.prototype.destroy = function () {
            if (this.editorView) {
                this.editorView.destroy();
            }
        };
        ProsemirrorService.prototype.setEnabled = function (enabled) {
            if (this.editorView) {
                this.enabled = enabled;
                // Updating the state causes ProseMirror to check the
                // `editable()` function from the contructor config object
                // newly.
                this.editorView.updateState(this.editorView.state);
            }
        };
        ProsemirrorService.prototype.getStateFromText = function (text) {
            var div = document.createElement('div');
            div.innerHTML = text;
            return prosemirrorState.EditorState.create({
                doc: prosemirrorModel.DOMParser.fromSchema(this.mySchema).parse(div),
                plugins: this.configurePlugins({ schema: this.mySchema, floatingMenu: false }),
            });
        };
        ProsemirrorService.prototype.getTextFromState = function (state) {
            var div = document.createElement('div');
            var fragment = prosemirrorModel.DOMSerializer.fromSchema(this.mySchema).serializeFragment(state.doc.content);
            div.appendChild(fragment);
            return div.innerHTML;
        };
        ProsemirrorService.prototype.configurePlugins = function (options) {
            var plugins = [
                buildInputRules(options.schema),
                prosemirrorKeymap.keymap(buildKeymap(options.schema, options.mapKeys)),
                prosemirrorKeymap.keymap(prosemirrorCommands.baseKeymap),
                prosemirrorDropcursor.dropCursor(),
                prosemirrorGapcursor.gapCursor(),
                linkSelectPlugin,
            ];
            if (options.menuBar !== false) {
                plugins.push(prosemirrorMenu.menuBar({
                    floating: options.floatingMenu !== false,
                    content: options.menuContent || buildMenuItems(options.schema, this.modalService).fullMenu,
                }));
            }
            if (options.history !== false) {
                plugins.push(prosemirrorHistory.history());
            }
            return plugins.concat(new prosemirrorState.Plugin({
                props: {
                    attributes: { class: 'vdr-prosemirror' },
                },
            }));
        };
        return ProsemirrorService;
    }());
    ProsemirrorService.decorators = [
        { type: i0.Injectable }
    ];
    ProsemirrorService.ctorParameters = function () { return [
        { type: ModalService }
    ]; };

    /**
     * A rich text (HTML) editor based on Trix (https://github.com/basecamp/trix)
     */
    var RichTextEditorComponent = /** @class */ (function () {
        function RichTextEditorComponent(changeDetector, prosemirrorService) {
            this.changeDetector = changeDetector;
            this.prosemirrorService = prosemirrorService;
            this._readonly = false;
        }
        Object.defineProperty(RichTextEditorComponent.prototype, "readonly", {
            set: function (value) {
                this._readonly = !!value;
                this.prosemirrorService.setEnabled(!this._readonly);
            },
            enumerable: false,
            configurable: true
        });
        RichTextEditorComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.prosemirrorService.createEditorView({
                element: this.editorEl.nativeElement,
                onTextInput: function (content) {
                    _this.onChange(content);
                    _this.changeDetector.markForCheck();
                },
                isReadOnly: function () { return !_this._readonly; },
            });
            if (this.value) {
                this.prosemirrorService.update(this.value);
            }
        };
        RichTextEditorComponent.prototype.ngOnDestroy = function () {
            this.prosemirrorService.destroy();
        };
        RichTextEditorComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        RichTextEditorComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        RichTextEditorComponent.prototype.setDisabledState = function (isDisabled) {
            this.prosemirrorService.setEnabled(!isDisabled);
        };
        RichTextEditorComponent.prototype.writeValue = function (value) {
            this.value = value;
            if (this.prosemirrorService) {
                this.prosemirrorService.update(value);
            }
        };
        return RichTextEditorComponent;
    }());
    RichTextEditorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-rich-text-editor',
                    template: "<label class=\"clr-control-label\">{{ label }}</label>\n<div #editor></div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: RichTextEditorComponent,
                            multi: true,
                        },
                        ProsemirrorService,
                    ],
                    styles: ["@charset \"UTF-8\";::ng-deep .ProseMirror{position:relative;word-wrap:break-word;white-space:pre-wrap;font-variant-ligatures:none}::ng-deep .ProseMirror pre{white-space:pre-wrap}::ng-deep .ProseMirror li{position:relative}::ng-deep .ProseMirror-hideselection ::-moz-selection{background:transparent}::ng-deep .ProseMirror-hideselection ::selection{background:transparent}::ng-deep .ProseMirror-hideselection ::-moz-selection{background:transparent}::ng-deep .ProseMirror-hideselection{caret-color:transparent}::ng-deep .ProseMirror-selectednode{outline:2px solid var(--color-primary-500)}::ng-deep li.ProseMirror-selectednode{outline:none}::ng-deep li.ProseMirror-selectednode:after{content:\"\";position:absolute;left:-32px;right:-2px;top:-2px;bottom:-2px;border:2px solid var(--color-primary-500);pointer-events:none}::ng-deep .ProseMirror-textblock-dropdown{min-width:3em}::ng-deep .ProseMirror-menu{margin:0 -4px;line-height:1}::ng-deep .ProseMirror-tooltip .ProseMirror-menu{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;white-space:pre}::ng-deep .ProseMirror-menuitem{margin-right:3px;display:inline-block}::ng-deep .ProseMirror-menuseparator{border-right:1px solid var(--color-component-border-200);margin-right:3px}::ng-deep .ProseMirror-menu-dropdown,::ng-deep .ProseMirror-menu-dropdown-menu{font-size:90%;white-space:nowrap}::ng-deep .ProseMirror-menu-dropdown{vertical-align:1px;cursor:pointer;position:relative;padding-right:15px}::ng-deep .ProseMirror-menu-dropdown-wrap{padding:1px 0 1px 4px;display:inline-block;position:relative}::ng-deep .ProseMirror-menu-dropdown:after{content:\"\";border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid;opacity:.6;position:absolute;right:4px;top:calc(50% - 2px)}::ng-deep .ProseMirror-menu-dropdown-menu,::ng-deep .ProseMirror-menu-submenu{position:absolute;background:#fff;color:var(--color-grey-600);border:1px solid var(--color-component-border-200);padding:2px}::ng-deep .ProseMirror-menu-dropdown-menu{z-index:15;min-width:6em}::ng-deep .ProseMirror-menu-dropdown-item{cursor:pointer;padding:2px 8px 2px 4px}::ng-deep .ProseMirror-menu-dropdown-item:hover{background:var(--color-component-bg-100)}::ng-deep .ProseMirror-menu-submenu-wrap{position:relative;margin-right:-4px}::ng-deep .ProseMirror-menu-submenu-label:after{content:\"\";border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:4px solid;opacity:.6;position:absolute;right:4px;top:calc(50% - 4px)}::ng-deep .ProseMirror-menu-submenu{display:none;min-width:4em;left:100%;top:-3px}::ng-deep .ProseMirror-menu-active{background:var(--color-component-bg-100);border-radius:4px}::ng-deep .ProseMirror-menu-disabled{opacity:.3}::ng-deep .ProseMirror-menu-submenu-wrap-active .ProseMirror-menu-submenu,::ng-deep .ProseMirror-menu-submenu-wrap:hover .ProseMirror-menu-submenu{display:block}::ng-deep .ProseMirror-menubar{border-top-left-radius:inherit;border-top-right-radius:inherit;position:relative;min-height:1em;color:var(--color-grey-600);padding:1px 6px;top:0;left:0;right:0;background:var(--color-component-bg-100);z-index:10;box-sizing:border-box;overflow:visible}::ng-deep .ProseMirror-icon{display:inline-block;line-height:.8;vertical-align:-2px;padding:2px 8px;cursor:pointer}::ng-deep .ProseMirror-menu-disabled.ProseMirror-icon{cursor:default}::ng-deep .ProseMirror-icon svg{fill:currentColor;height:1em}::ng-deep .ProseMirror-icon span{vertical-align:text-top}::ng-deep .ProseMirror-gapcursor{display:none;pointer-events:none;position:absolute}::ng-deep .ProseMirror-gapcursor:after{content:\"\";display:block;position:absolute;top:-2px;width:20px;border-top:1px solid #000;-webkit-animation:ProseMirror-cursor-blink 1.1s steps(2,start) infinite;animation:ProseMirror-cursor-blink 1.1s steps(2,start) infinite}@-webkit-keyframes ProseMirror-cursor-blink{to{visibility:hidden}}@keyframes ProseMirror-cursor-blink{to{visibility:hidden}}::ng-deep .ProseMirror-focused .ProseMirror-gapcursor{display:block}::ng-deep .ProseMirror ol,::ng-deep .ProseMirror ul{padding-left:30px;list-style-position:initial}::ng-deep .ProseMirror blockquote{padding-left:1em;border-left:3px solid var(--color-grey-100);margin-left:0;margin-right:0}::ng-deep .ProseMirror-prompt{background:#fff;padding:5px 10px 5px 15px;border:1px solid silver;position:fixed;border-radius:3px;z-index:11;box-shadow:-.5px 2px 5px rgba(0,0,0,.2)}::ng-deep .ProseMirror-prompt h5{margin:0;font-weight:400;font-size:100%;color:var(--color-grey-500)}::ng-deep .ProseMirror-prompt input[type=text],::ng-deep .ProseMirror-prompt textarea{background:var(--color-component-bg-100);border:none;outline:none}::ng-deep .ProseMirror-prompt input[type=text]{padding:0 4px}::ng-deep .ProseMirror-prompt-close{position:absolute;left:2px;top:1px;color:var(--color-grey-400);border:none;background:transparent;padding:0}::ng-deep .ProseMirror-prompt-close:after{content:\"\u00E2\u0153\u2022\";font-size:12px}::ng-deep .ProseMirror-invalid{background:var(--color-warning-200);border:1px solid var(--color-warning-300);border-radius:4px;padding:5px 10px;position:absolute;min-width:10em}::ng-deep .ProseMirror-prompt-buttons{margin-top:5px;display:none}::ng-deep #editor,::ng-deep .editor{background:var(--color-form-input-bg);color:#000;background-clip:padding-box;border-radius:4px;border:2px solid rgba(0,0,0,.2);padding:5px 0;margin-bottom:23px}::ng-deep .ProseMirror h1:first-child,::ng-deep .ProseMirror h2:first-child,::ng-deep .ProseMirror h3:first-child,::ng-deep .ProseMirror h4:first-child,::ng-deep .ProseMirror h5:first-child,::ng-deep .ProseMirror h6:first-child,::ng-deep .ProseMirror p:first-child{margin-top:10px}::ng-deep .ProseMirror{padding:4px 8px 4px 14px;line-height:1.2;outline:none}::ng-deep .ProseMirror p{margin-bottom:.5rem;color:var(--color-grey-800)}:host{display:block;max-width:710px;margin-bottom:.5rem}:host.readonly ::ng-deep .ProseMirror-menubar{display:none}::ng-deep .ProseMirror-menubar{position:sticky;top:24px;margin-top:6px;border:1px solid var(--color-component-border-200);border-bottom:none;background-color:var(--color-component-bg-200);color:var(--color-icon-button);padding:6px 12px}::ng-deep .vdr-prosemirror{background:var(--color-form-input-bg);min-height:128px;border:1px solid var(--color-component-border-200);border-radius:0 0 3px 3px;transition:border-color .2s;overflow:auto}::ng-deep .vdr-prosemirror:focus{border-color:var(--color-primary-500)!important;box-shadow:0 0 1px 1px var(--color-primary-100)}::ng-deep .vdr-prosemirror hr{padding:2px 10px;border:none;margin:1em 0}::ng-deep .vdr-prosemirror hr:after{content:\"\";display:block;height:1px;background-color:silver;line-height:2px}::ng-deep .vdr-prosemirror img{cursor:default;max-width:100%}"]
                },] }
    ];
    RichTextEditorComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: ProsemirrorService }
    ]; };
    RichTextEditorComponent.propDecorators = {
        label: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        _readonly: [{ type: i0.HostBinding, args: ['class.readonly',] }],
        editorEl: [{ type: i0.ViewChild, args: ['editor', { static: true },] }]
    };

    /**
     * A simple, stateless toggle button for indicating selection.
     */
    var SelectToggleComponent = /** @class */ (function () {
        function SelectToggleComponent() {
            this.size = 'large';
            this.selected = false;
            this.disabled = false;
            this.selectedChange = new i0.EventEmitter();
        }
        return SelectToggleComponent;
    }());
    SelectToggleComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-select-toggle',
                    template: "<div\n    class=\"toggle\"\n    [class.disabled]=\"disabled\"\n    [class.small]=\"size === 'small'\"\n    [attr.tabindex]=\"disabled ? null : 0\"\n    [class.selected]=\"selected\"\n    (keydown.enter)=\"selectedChange.emit(!selected)\"\n    (keydown.space)=\"$event.preventDefault(); selectedChange.emit(!selected)\"\n    (click)=\"selectedChange.emit(!selected)\"\n>\n    <clr-icon shape=\"check\" [attr.size]=\"size === 'small' ? 16 : 32\"></clr-icon>\n</div>\n<div class=\"toggle-label\" [class.disabled]=\"disabled\" *ngIf=\"label\" (click)=\"selectedChange.emit(!selected)\">\n    {{ label }}\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".toggle,:host{display:flex;align-items:center;justify-content:center}.toggle{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;background-color:var(--color-component-bg-100);border:2px solid var(--color-component-border-300);padding:0 6px;border-radius:50%;width:32px;height:32px;color:var(--color-grey-300);transition:background-color .2s,border .2s}.toggle.small{width:24px;height:24px}.toggle:not(.disabled):hover{border-color:var(--color-success-500);background-color:var(--color-success-400);opacity:.9}.toggle.selected{background-color:var(--color-success-500);border-color:var(--color-success-600);color:#fff}.toggle.selected:not(.disabled):hover{background-color:var(--color-success-500);border-color:var(--color-success-400);opacity:.9}.toggle:focus{outline:none;box-shadow:0 0 2px 2px var(--color-primary-500)}.toggle.disabled{cursor:default}.toggle-label{flex:1;margin-left:6px;text-align:left;font-size:12px}.toggle-label:not(.disabled){cursor:pointer}"]
                },] }
    ];
    SelectToggleComponent.propDecorators = {
        size: [{ type: i0.Input }],
        selected: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        label: [{ type: i0.Input }],
        selectedChange: [{ type: i0.Output }]
    };

    /**
     * A button link to be used as actions in rows of a table.
     */
    var TableRowActionComponent = /** @class */ (function () {
        function TableRowActionComponent() {
            this.disabled = false;
        }
        return TableRowActionComponent;
    }());
    TableRowActionComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-table-row-action',
                    template: "<ng-container *ngIf=\"!disabled; else: disabledLink\">\n    <a class=\"btn btn-link btn-sm\" [routerLink]=\"linkTo\">\n        <clr-icon [attr.shape]=\"iconShape\"></clr-icon>\n        {{ label }}\n    </a>\n</ng-container>\n<ng-template #disabledLink>\n    <button class=\"btn btn-link btn-sm\" disabled>\n        <clr-icon [attr.shape]=\"iconShape\"></clr-icon>\n        {{ label }}\n    </button>\n</ng-template>\n",
                    styles: ["a.btn{margin:0}"]
                },] }
    ];
    TableRowActionComponent.propDecorators = {
        linkTo: [{ type: i0.Input }],
        label: [{ type: i0.Input }],
        iconShape: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }]
    };

    var TagSelectorComponent = /** @class */ (function () {
        function TagSelectorComponent(dataService) {
            this.dataService = dataService;
        }
        TagSelectorComponent.prototype.ngOnInit = function () {
            this.allTags$ = this.dataService.product
                .getTagList()
                .mapStream(function (data) { return data.tags.items.map(function (i) { return i.value; }); });
        };
        TagSelectorComponent.prototype.addTagFn = function (val) {
            return val;
        };
        TagSelectorComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        TagSelectorComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        TagSelectorComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        TagSelectorComponent.prototype.writeValue = function (obj) {
            if (Array.isArray(obj)) {
                this._value = obj;
            }
        };
        TagSelectorComponent.prototype.valueChanged = function (event) {
            this.onChange(event);
        };
        return TagSelectorComponent;
    }());
    TagSelectorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-tag-selector',
                    template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [multiple]=\"true\"\n    [ngModel]=\"_value\"\n    [clearable]=\"true\"\n    [searchable]=\"true\"\n    [disabled]=\"disabled\"\n    [placeholder]=\"placeholder\"\n    (change)=\"valueChanged($event)\"\n>\n    <ng-template ng-label-tmp let-tag=\"item\" let-clear=\"clear\">\n        <vdr-chip [colorFrom]=\"tag\" icon=\"close\" (iconClick)=\"clear(tag)\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ tag }}</vdr-chip>\n    </ng-template>\n    <ng-option *ngFor=\"let tag of allTags$ | async\" [value]=\"tag\">\n        <vdr-chip [colorFrom]=\"tag\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ tag }}</vdr-chip>\n    </ng-option>\n</ng-select>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: TagSelectorComponent,
                            multi: true,
                        },
                    ],
                    styles: [":host{display:block;margin-top:12px;position:relative}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}"]
                },] }
    ];
    TagSelectorComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };
    TagSelectorComponent.propDecorators = {
        placeholder: [{ type: i0.Input }]
    };

    var TimelineEntryComponent = /** @class */ (function () {
        function TimelineEntryComponent() {
            this.collapsed = false;
            this.expandClick = new i0.EventEmitter();
        }
        Object.defineProperty(TimelineEntryComponent.prototype, "timelineTitle", {
            get: function () {
                return this.collapsed ? ngxTranslateExtractMarker.marker('common.expand-entries') : ngxTranslateExtractMarker.marker('common.collapse-entries');
            },
            enumerable: false,
            configurable: true
        });
        TimelineEntryComponent.prototype.getIconShape = function () {
            if (this.iconShape) {
                return typeof this.iconShape === 'string' ? this.iconShape : this.iconShape[0];
            }
        };
        TimelineEntryComponent.prototype.getIconClass = function () {
            if (this.iconShape) {
                return typeof this.iconShape === 'string' ? '' : this.iconShape[1];
            }
        };
        return TimelineEntryComponent;
    }());
    TimelineEntryComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-timeline-entry',
                    template: "<div\n    [ngClass]=\"displayType\"\n    [class.has-custom-icon]=\"!!iconShape\"\n    class=\"entry\"\n    [class.last]=\"isLast === true\"\n    [class.collapsed]=\"collapsed\"\n>\n    <div class=\"timeline\" (click)=\"expandClick.emit()\" [title]=\"timelineTitle | translate\">\n        <div class=\"custom-icon\">\n            <clr-icon\n                *ngIf=\"iconShape && !collapsed\"\n                [attr.shape]=\"getIconShape()\"\n                [ngClass]=\"getIconClass()\"\n                size=\"24\"\n            ></clr-icon>\n        </div>\n    </div>\n    <div class=\"entry-body\">\n        <div class=\"detail\">\n            <div class=\"time\">\n                {{ createdAt | localeDate: 'short' }}\n            </div>\n            <div class=\"name\">\n                {{ name }}\n            </div>\n        </div>\n        <div [class.featured-entry]=\"featured\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}:host:first-of-type .timeline:before{border-left-color:var(--color-timeline-thread)}:host:first-of-type .entry-body{max-height:none}.entry{display:flex}.timeline{border-left:2px solid var(--color-timeline-thread);padding-bottom:8px;position:relative}.timeline:before{content:\"\";position:absolute;width:2px;height:32px;left:-2px;border-left:2px solid var(--color-timeline-thread)}.timeline:after{content:\"\";display:block;border-radius:50%;width:8px;height:8px;background-color:var(--color-component-bg-200);border:1px solid var(--color-component-border-300);position:absolute;left:-5px;top:32px;transition:top .2s;cursor:pointer}.timeline .custom-icon{position:absolute;width:32px;height:32px;left:-17px;top:32px;align-items:center;justify-content:center;border-radius:50%;color:var(--color-primary-600);background-color:var(--color-component-bg-100);border:1px solid var(--color-component-border-200);display:none}.entry.has-custom-icon .timeline:after{display:none}.entry.has-custom-icon .custom-icon{display:flex}.entry.last .timeline{border-left-color:transparent}.entry-body{flex:1;padding-top:24px;padding-left:12px;line-height:16px;margin-left:12px;color:var(--color-text-200);overflow:visible;max-height:100px;transition:max-height .2s,padding-top .2s,opacity .2s .2s}.featured-entry ::ng-deep .title{color:var(--color-text-100);font-size:16px;line-height:26px}.featured-entry ::ng-deep .note-text{color:var(--color-text-100);white-space:pre-wrap}.detail{display:flex;color:var(--color-text-300);font-size:12px}.detail .name{margin-left:12px}.muted .timeline,.muted .timeline .custom-icon{color:var(--color-text-300)}.success .timeline,.success .timeline .custom-icon{color:var(--color-success-400)}.success .timeline:after{background-color:var(--color-success-200);border:1px solid var(--color-success-400)}.error .timeline,.error .timeline .custom-icon{color:var(--color-error-400)}.error .timeline:after{background-color:var(--color-error-200);border:1px solid var(--color-error-400)}.warning .timeline,.warning .timeline .custom-icon{color:var(--color-warning-400)}.warning .timeline:after{background-color:var(--color-warning-200);border:1px solid var(--color-warning-400)}.collapsed .entry-body{max-height:0;overflow:hidden;opacity:0;padding-top:0}.collapsed .timeline{border-left-color:transparent}.collapsed .timeline:after{top:0}"]
                },] }
    ];
    TimelineEntryComponent.propDecorators = {
        displayType: [{ type: i0.Input }],
        createdAt: [{ type: i0.Input }],
        name: [{ type: i0.Input }],
        featured: [{ type: i0.Input }],
        iconShape: [{ type: i0.Input }],
        isLast: [{ type: i0.Input }],
        collapsed: [{ type: i0.HostBinding, args: ['class.collapsed',] }, { type: i0.Input }],
        expandClick: [{ type: i0.Output }]
    };

    var TitleInputComponent = /** @class */ (function () {
        function TitleInputComponent() {
            this.readonly = false;
        }
        return TitleInputComponent;
    }());
    TitleInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-title-input',
                    template: "<ng-content></ng-content>\n<div class=\"edit-icon\" *ngIf=\"!readonly\">\n    <clr-icon shape=\"edit\"></clr-icon>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;position:relative}:host ::ng-deep input{font-size:18px;color:var(--clr-p1-color);max-width:100%}:host ::ng-deep input:not(:focus){border-color:transparent!important;background-color:transparent!important}:host ::ng-deep input:focus{background-color:var(--clr-global-app-background)}:host ::ng-deep .clr-control-container{max-width:100%}:host ::ng-deep .clr-input-wrapper{max-width:100%!important}:host .edit-icon{position:absolute;right:8px;top:6px;color:var(--color-grey-300);opacity:0;transition:opacity .2s}:host:hover ::ng-deep input:not(:focus){background-color:var(--color-component-bg-200)!important}:host:hover .edit-icon{opacity:1}:host.readonly .edit-icon{display:none}:host.readonly:hover ::ng-deep input:not(:focus){background-color:var(--color-grey-200)!important}"]
                },] }
    ];
    TitleInputComponent.propDecorators = {
        readonly: [{ type: i0.HostBinding, args: ['class.readonly',] }, { type: i0.Input }]
    };

    /**
     * Allows declarative binding to the "disabled" property of a reactive form
     * control.
     */
    var DisabledDirective = /** @class */ (function () {
        function DisabledDirective(formControlName, formControl) {
            this.formControlName = formControlName;
            this.formControl = formControl;
        }
        Object.defineProperty(DisabledDirective.prototype, "disabled", {
            set: function (val) {
                var _a, _b, _c;
                var formControl = (_b = (_a = this.formControlName) === null || _a === void 0 ? void 0 : _a.control) !== null && _b !== void 0 ? _b : (_c = this.formControl) === null || _c === void 0 ? void 0 : _c.form;
                if (!formControl) {
                    return;
                }
                if (!!val === false) {
                    formControl.enable({ emitEvent: false });
                }
                else {
                    formControl.disable({ emitEvent: false });
                }
            },
            enumerable: false,
            configurable: true
        });
        return DisabledDirective;
    }());
    DisabledDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vdrDisabled]',
                },] }
    ];
    DisabledDirective.ctorParameters = function () { return [
        { type: forms.FormControlName, decorators: [{ type: i0.Optional }] },
        { type: forms.FormControlDirective, decorators: [{ type: i0.Optional }] }
    ]; };
    DisabledDirective.propDecorators = {
        disabled: [{ type: i0.Input, args: ['vdrDisabled',] }]
    };

    /**
     * A base class for implementing custom *ngIf-style structural directives based on custom conditions.
     *
     * @dynamic
     */
    var IfDirectiveBase = /** @class */ (function () {
        function IfDirectiveBase(_viewContainer, templateRef, updateViewFn) {
            this._viewContainer = _viewContainer;
            this.updateViewFn = updateViewFn;
            this.updateArgs$ = new rxjs.BehaviorSubject([]);
            this._thenTemplateRef = null;
            this._elseTemplateRef = null;
            this._thenViewRef = null;
            this._elseViewRef = null;
            this._thenTemplateRef = templateRef;
        }
        IfDirectiveBase.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription = this.updateArgs$
                .pipe(operators.switchMap(function (args) { return _this.updateViewFn.apply(_this, __spread(args)); }))
                .subscribe(function (result) {
                if (result) {
                    _this.showThen();
                }
                else {
                    _this.showElse();
                }
            });
        };
        IfDirectiveBase.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        IfDirectiveBase.prototype.setElseTemplate = function (templateRef) {
            this.assertTemplate('vdrIfPermissionsElse', templateRef);
            this._elseTemplateRef = templateRef;
            this._elseViewRef = null; // clear previous view if any.
        };
        IfDirectiveBase.prototype.showThen = function () {
            if (!this._thenViewRef) {
                this._viewContainer.clear();
                this._elseViewRef = null;
                if (this._thenTemplateRef) {
                    this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef);
                }
            }
        };
        IfDirectiveBase.prototype.showElse = function () {
            if (!this._elseViewRef) {
                this._viewContainer.clear();
                this._thenViewRef = null;
                if (this._elseTemplateRef) {
                    this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef);
                }
            }
        };
        IfDirectiveBase.prototype.assertTemplate = function (property, templateRef) {
            var isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
            if (!isTemplateRefOrNull) {
                throw new Error(property + " must be a TemplateRef, but received '" + templateRef + "'.");
            }
        };
        return IfDirectiveBase;
    }());
    IfDirectiveBase.decorators = [
        { type: i0.Directive }
    ];
    IfDirectiveBase.ctorParameters = function () { return [
        { type: i0.ViewContainerRef },
        { type: i0.TemplateRef },
        { type: Function }
    ]; };

    var IfDefaultChannelActiveDirective = /** @class */ (function (_super) {
        __extends(IfDefaultChannelActiveDirective, _super);
        function IfDefaultChannelActiveDirective(_viewContainer, templateRef, dataService, changeDetectorRef) {
            var _this = _super.call(this, _viewContainer, templateRef, function () {
                return _this.dataService.client
                    .userStatus()
                    .mapStream(function (_a) {
                    var userStatus = _a.userStatus;
                    return _this.defaultChannelIsActive(userStatus);
                })
                    .pipe(operators.tap(function () { return _this.changeDetectorRef.markForCheck(); }));
            }) || this;
            _this.dataService = dataService;
            _this.changeDetectorRef = changeDetectorRef;
            return _this;
        }
        Object.defineProperty(IfDefaultChannelActiveDirective.prototype, "vdrIfMultichannelElse", {
            /**
             * A template to show if the current user does not have the speicified permission.
             */
            set: function (templateRef) {
                this.setElseTemplate(templateRef);
            },
            enumerable: false,
            configurable: true
        });
        IfDefaultChannelActiveDirective.prototype.defaultChannelIsActive = function (userStatus) {
            var defaultChannel = userStatus.channels.find(function (c) { return c.code === sharedConstants.DEFAULT_CHANNEL_CODE; });
            return !!(defaultChannel && userStatus.activeChannelId === defaultChannel.id);
        };
        return IfDefaultChannelActiveDirective;
    }(IfDirectiveBase));
    IfDefaultChannelActiveDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vdrIfDefaultChannelActive]',
                },] }
    ];
    IfDefaultChannelActiveDirective.ctorParameters = function () { return [
        { type: i0.ViewContainerRef },
        { type: i0.TemplateRef },
        { type: DataService },
        { type: i0.ChangeDetectorRef }
    ]; };
    IfDefaultChannelActiveDirective.propDecorators = {
        vdrIfMultichannelElse: [{ type: i0.Input }]
    };

    var IfMultichannelDirective = /** @class */ (function (_super) {
        __extends(IfMultichannelDirective, _super);
        function IfMultichannelDirective(_viewContainer, templateRef, dataService) {
            var _this = _super.call(this, _viewContainer, templateRef, function () {
                return _this.dataService.client
                    .userStatus()
                    .mapStream(function (_a) {
                    var userStatus = _a.userStatus;
                    return 1 < userStatus.channels.length;
                });
            }) || this;
            _this.dataService = dataService;
            return _this;
        }
        Object.defineProperty(IfMultichannelDirective.prototype, "vdrIfMultichannelElse", {
            /**
             * A template to show if the current user does not have the speicified permission.
             */
            set: function (templateRef) {
                this.setElseTemplate(templateRef);
            },
            enumerable: false,
            configurable: true
        });
        return IfMultichannelDirective;
    }(IfDirectiveBase));
    IfMultichannelDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vdrIfMultichannel]',
                },] }
    ];
    IfMultichannelDirective.ctorParameters = function () { return [
        { type: i0.ViewContainerRef },
        { type: i0.TemplateRef },
        { type: DataService }
    ]; };
    IfMultichannelDirective.propDecorators = {
        vdrIfMultichannelElse: [{ type: i0.Input }]
    };

    /**
     * Conditionally shows/hides templates based on the current active user having the specified permission.
     * Based on the ngIf source. Also support "else" templates:
     *
     * @example
     * ```html
     * <button *vdrIfPermissions="'DeleteCatalog'; else unauthorized">Delete Product</button>
     * <ng-template #unauthorized>Not allowed!</ng-template>
     * ```
     *
     * The permission can be a single string, or an array. If an array is passed, then _all_ of the permissions
     * must match (logical AND)
     */
    var IfPermissionsDirective = /** @class */ (function (_super) {
        __extends(IfPermissionsDirective, _super);
        function IfPermissionsDirective(_viewContainer, templateRef, dataService, changeDetectorRef) {
            var _this = _super.call(this, _viewContainer, templateRef, function (permissions) {
                if (permissions == null) {
                    return rxjs.of(true);
                }
                else if (!permissions) {
                    return rxjs.of(false);
                }
                return _this.dataService.client
                    .userStatus()
                    .mapStream(function (_a) {
                    var e_1, _b;
                    var userStatus = _a.userStatus;
                    try {
                        for (var permissions_1 = __values(permissions), permissions_1_1 = permissions_1.next(); !permissions_1_1.done; permissions_1_1 = permissions_1.next()) {
                            var permission = permissions_1_1.value;
                            if (userStatus.permissions.includes(permission)) {
                                return true;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (permissions_1_1 && !permissions_1_1.done && (_b = permissions_1.return)) _b.call(permissions_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return false;
                })
                    .pipe(operators.tap(function () { return _this.changeDetectorRef.markForCheck(); }));
            }) || this;
            _this.dataService = dataService;
            _this.changeDetectorRef = changeDetectorRef;
            _this.permissionToCheck = ['__initial_value__'];
            return _this;
        }
        Object.defineProperty(IfPermissionsDirective.prototype, "vdrIfPermissions", {
            /**
             * The permission to check to determine whether to show the template.
             */
            set: function (permission) {
                this.permissionToCheck =
                    (permission && (Array.isArray(permission) ? permission : [permission])) || null;
                this.updateArgs$.next([this.permissionToCheck]);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IfPermissionsDirective.prototype, "vdrIfPermissionsElse", {
            /**
             * A template to show if the current user does not have the specified permission.
             */
            set: function (templateRef) {
                this.setElseTemplate(templateRef);
                this.updateArgs$.next([this.permissionToCheck]);
            },
            enumerable: false,
            configurable: true
        });
        return IfPermissionsDirective;
    }(IfDirectiveBase));
    IfPermissionsDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vdrIfPermissions]',
                },] }
    ];
    IfPermissionsDirective.ctorParameters = function () { return [
        { type: i0.ViewContainerRef },
        { type: i0.TemplateRef },
        { type: DataService },
        { type: i0.ChangeDetectorRef }
    ]; };
    IfPermissionsDirective.propDecorators = {
        vdrIfPermissions: [{ type: i0.Input }],
        vdrIfPermissionsElse: [{ type: i0.Input }]
    };

    /**
     * A host component which delegates to an instance or list of FormInputComponent components.
     */
    var DynamicFormInputComponent = /** @class */ (function () {
        function DynamicFormInputComponent(componentRegistryService, componentFactoryResolver, changeDetectorRef, injector) {
            this.componentRegistryService = componentRegistryService;
            this.componentFactoryResolver = componentFactoryResolver;
            this.changeDetectorRef = changeDetectorRef;
            this.injector = injector;
            this.renderAsList = false;
            this.listItems = [];
            this.listId = 1;
            this.listFormArray = new forms.FormArray([]);
            this.renderList$ = new rxjs.Subject();
            this.destroy$ = new rxjs.Subject();
        }
        DynamicFormInputComponent.prototype.ngOnInit = function () {
            var componentId = this.getInputComponentConfig(this.def).component;
            var componentType = this.componentRegistryService.getInputComponent(componentId);
            if (componentType) {
                this.componentType = componentType;
            }
            else {
                // tslint:disable-next-line:no-console
                console.error("No form input component registered with the id \"" + componentId + "\". Using the default input instead.");
                var defaultComponentType = this.componentRegistryService.getInputComponent(this.getInputComponentConfig(Object.assign(Object.assign({}, this.def), { ui: undefined })).component);
                if (defaultComponentType) {
                    this.componentType = defaultComponentType;
                }
            }
        };
        DynamicFormInputComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            var _a;
            if (this.componentType) {
                var factory_1 = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
                // create a temp instance to check the value of `isListInput`
                var cmpRef = factory_1.create(this.injector);
                var isListInputComponent = (_a = cmpRef.instance.isListInput) !== null && _a !== void 0 ? _a : false;
                cmpRef.destroy();
                if (this.def.list === false && isListInputComponent) {
                    throw new Error("The " + this.componentType.name + " component is a list input, but the definition for " + this.def.name + " does not expect a list");
                }
                this.renderAsList = this.def.list && !isListInputComponent;
                if (!this.renderAsList) {
                    this.singleComponentRef = this.renderInputComponent(factory_1, this.singleViewContainer, this.control);
                }
                else {
                    var formArraySub_1;
                    var renderListInputs_1 = function (viewContainerRefs) {
                        if (viewContainerRefs.length) {
                            if (formArraySub_1) {
                                formArraySub_1.unsubscribe();
                            }
                            _this.listFormArray = new forms.FormArray([]);
                            _this.listItems.forEach(function (i) { var _a; return (_a = i.componentRef) === null || _a === void 0 ? void 0 : _a.destroy(); });
                            viewContainerRefs.forEach(function (ref, i) {
                                var _a;
                                var listItem = (_a = _this.listItems) === null || _a === void 0 ? void 0 : _a[i];
                                if (listItem) {
                                    _this.listFormArray.push(listItem.control);
                                    listItem.componentRef = _this.renderInputComponent(factory_1, ref, listItem.control);
                                }
                            });
                            formArraySub_1 = _this.listFormArray.valueChanges
                                .pipe(operators.takeUntil(_this.destroy$))
                                .subscribe(function (val) {
                                _this.control.markAsTouched();
                                _this.control.markAsDirty();
                                _this.onChange(val);
                                _this.control.patchValue(val, { emitEvent: false });
                            });
                        }
                    };
                    // initial render
                    this.listItemContainers.changes
                        .pipe(operators.take(1))
                        .subscribe(function (val) { return renderListInputs_1(_this.listItemContainers); });
                    // render on changes to the list
                    this.renderList$
                        .pipe(operators.switchMap(function () { return _this.listItemContainers.changes.pipe(operators.take(1)); }), operators.takeUntil(this.destroy$))
                        .subscribe(function () {
                        renderListInputs_1(_this.listItemContainers);
                    });
                }
            }
            setTimeout(function () { return _this.changeDetectorRef.markForCheck(); });
        };
        DynamicFormInputComponent.prototype.ngOnChanges = function (changes) {
            var e_1, _c;
            if (this.listItems) {
                try {
                    for (var _d = __values(this.listItems), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var item = _e.value;
                        if (item.componentRef) {
                            this.updateBindings(changes, item.componentRef);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (this.singleComponentRef) {
                this.updateBindings(changes, this.singleComponentRef);
            }
        };
        DynamicFormInputComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        DynamicFormInputComponent.prototype.updateBindings = function (changes, componentRef) {
            if ('def' in changes) {
                componentRef.instance.config = this.isConfigArgDef(this.def) ? this.def.ui : this.def;
            }
            if ('readonly' in changes) {
                componentRef.instance.readonly = this.readonly;
            }
            componentRef.injector.get(i0.ChangeDetectorRef).markForCheck();
        };
        DynamicFormInputComponent.prototype.trackById = function (index, item) {
            return item.id;
        };
        DynamicFormInputComponent.prototype.addListItem = function () {
            var _a;
            if (!this.listItems) {
                this.listItems = [];
            }
            this.listItems.push({
                id: this.listId++,
                control: new forms.FormControl((_a = this.def.defaultValue) !== null && _a !== void 0 ? _a : null),
            });
            this.renderList$.next();
        };
        DynamicFormInputComponent.prototype.moveListItem = function (event) {
            if (this.listItems) {
                dragDrop.moveItemInArray(this.listItems, event.previousIndex, event.currentIndex);
                this.listFormArray.removeAt(event.previousIndex);
                this.listFormArray.insert(event.currentIndex, event.item.data.control);
                this.renderList$.next();
            }
        };
        DynamicFormInputComponent.prototype.removeListItem = function (item) {
            var _a;
            if (this.listItems) {
                var index = this.listItems.findIndex(function (i) { return i === item; });
                (_a = item.componentRef) === null || _a === void 0 ? void 0 : _a.destroy();
                this.listFormArray.removeAt(index);
                this.listItems = this.listItems.filter(function (i) { return i !== item; });
                this.renderList$.next();
            }
        };
        DynamicFormInputComponent.prototype.renderInputComponent = function (factory, viewContainerRef, formControl) {
            var componentRef = viewContainerRef.createComponent(factory);
            var instance = componentRef.instance;
            instance.config = simpleDeepClone.simpleDeepClone(this.isConfigArgDef(this.def) ? this.def.ui : this.def);
            instance.formControl = formControl;
            instance.readonly = this.readonly;
            componentRef.injector.get(i0.ChangeDetectorRef).markForCheck();
            return componentRef;
        };
        DynamicFormInputComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        DynamicFormInputComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        DynamicFormInputComponent.prototype.writeValue = function (obj) {
            var _this = this;
            if (Array.isArray(obj)) {
                if (obj.length === this.listItems.length) {
                    obj.forEach(function (value, index) {
                        var _a;
                        var control = (_a = _this.listItems[index]) === null || _a === void 0 ? void 0 : _a.control;
                        control.patchValue(getConfigArgValue(value), { emitEvent: false });
                    });
                }
                else {
                    this.listItems = obj.map(function (value) { return ({
                        id: _this.listId++,
                        control: new forms.FormControl(getConfigArgValue(value)),
                    }); });
                    this.renderList$.next();
                }
            }
            else {
                this.listItems = [];
                this.renderList$.next();
            }
            this.changeDetectorRef.markForCheck();
        };
        DynamicFormInputComponent.prototype.getInputComponentConfig = function (argDef) {
            var _a;
            if (this.hasUiConfig(argDef) && argDef.ui.component) {
                return argDef.ui;
            }
            var type = argDef === null || argDef === void 0 ? void 0 : argDef.type;
            switch (type) {
                case 'string':
                case 'localeString': {
                    var hasOptions = !!(this.isConfigArgDef(argDef) && ((_a = argDef.ui) === null || _a === void 0 ? void 0 : _a.options)) ||
                        !!argDef.options;
                    if (hasOptions) {
                        return { component: 'select-form-input' };
                    }
                    else {
                        return { component: 'text-form-input' };
                    }
                }
                case 'int':
                case 'float':
                    return { component: 'number-form-input' };
                case 'boolean':
                    return { component: 'boolean-form-input' };
                case 'datetime':
                    return { component: 'date-form-input' };
                case 'ID':
                    return { component: 'text-form-input' };
                case 'relation':
                    return { component: 'relation-form-input' };
                default:
                    sharedUtils.assertNever(type);
            }
        };
        DynamicFormInputComponent.prototype.isConfigArgDef = function (def) {
            var _a;
            return ((_a = def) === null || _a === void 0 ? void 0 : _a.__typename) === 'ConfigArgDefinition';
        };
        DynamicFormInputComponent.prototype.hasUiConfig = function (def) {
            var _a, _b;
            return typeof def === 'object' && typeof ((_b = (_a = def) === null || _a === void 0 ? void 0 : _a.ui) === null || _b === void 0 ? void 0 : _b.component) === 'string';
        };
        return DynamicFormInputComponent;
    }());
    DynamicFormInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-dynamic-form-input',
                    template: "<ng-container *ngIf=\"!renderAsList; else list\">\n    <ng-container #single></ng-container>\n</ng-container>\n<ng-template #list>\n    <div class=\"list-container\" cdkDropList (cdkDropListDropped)=\"moveListItem($event)\">\n        <div class=\"list-item-row\" *ngFor=\"let item of listItems; trackBy: trackById\" cdkDrag [cdkDragData]=\"item\">\n            <ng-container #listItem></ng-container>\n            <button class=\"btn btn-link btn-sm btn-warning\" (click)=\"removeListItem(item)\" [title]=\"'common.remove-item-from-list' | translate\">\n                <clr-icon shape=\"times\"></clr-icon>\n            </button>\n            <div class=\"flex-spacer\"></div>\n            <div class=\"drag-handle\" cdkDragHandle *ngIf=\"!readonly\">\n                <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n            </div>\n        </div>\n        <button class=\"btn btn-secondary btn-sm\" (click)=\"addListItem()\">\n            <clr-icon shape=\"plus\"></clr-icon> {{ 'common.add-item-to-list' | translate }}\n        </button>\n    </div>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: DynamicFormInputComponent,
                            multi: true,
                        },
                    ],
                    styles: [".list-container{border:1px solid var(--color-component-border-200);border-radius:3px;padding:12px}.list-item-row{font-size:13px;display:flex;align-items:center;margin:3px 0}.drag-placeholder{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-preview{font-size:13px;background-color:var(--color-component-bg-100);opacity:.8;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:.1}.cdk-drag-animating,.cdk-drop-list-dragging .list-item-row:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
                },] }
    ];
    DynamicFormInputComponent.ctorParameters = function () { return [
        { type: ComponentRegistryService },
        { type: i0.ComponentFactoryResolver },
        { type: i0.ChangeDetectorRef },
        { type: i0.Injector }
    ]; };
    DynamicFormInputComponent.propDecorators = {
        def: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        control: [{ type: i0.Input }],
        singleViewContainer: [{ type: i0.ViewChild, args: ['single', { read: i0.ViewContainerRef },] }],
        listItemContainers: [{ type: i0.ViewChildren, args: ['listItem', { read: i0.ViewContainerRef },] }]
    };

    var RelationAssetInputComponent = /** @class */ (function () {
        function RelationAssetInputComponent(modalService, dataService) {
            this.modalService = modalService;
            this.dataService = dataService;
        }
        RelationAssetInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.asset$ = this.parentFormControl.valueChanges.pipe(operators.startWith(this.parentFormControl.value), operators.map(function (asset) { return asset === null || asset === void 0 ? void 0 : asset.id; }), operators.distinctUntilChanged(), operators.switchMap(function (id) {
                if (id) {
                    return _this.dataService.product.getAsset(id).mapStream(function (data) { return data.asset || undefined; });
                }
                else {
                    return rxjs.of(undefined);
                }
            }));
        };
        RelationAssetInputComponent.prototype.selectAsset = function () {
            var _this = this;
            this.modalService
                .fromComponent(AssetPickerDialogComponent, {
                size: 'xl',
                locals: {
                    multiSelect: false,
                },
            })
                .subscribe(function (result) {
                if (result && result.length) {
                    _this.parentFormControl.setValue(result[0]);
                    _this.parentFormControl.markAsDirty();
                }
            });
        };
        RelationAssetInputComponent.prototype.remove = function () {
            this.parentFormControl.setValue(null);
            this.parentFormControl.markAsDirty();
        };
        RelationAssetInputComponent.prototype.previewAsset = function (asset) {
            this.modalService
                .fromComponent(AssetPreviewDialogComponent, {
                size: 'xl',
                closable: true,
                locals: { asset: asset },
            })
                .subscribe();
        };
        return RelationAssetInputComponent;
    }());
    RelationAssetInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-relation-asset-input',
                    template: "<vdr-relation-card\n    (select)=\"selectAsset()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"image\"\n    [entity]=\"asset$ | async\"\n    [selectLabel]=\"'asset.select-asset' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-asset=\"entity\">\n        <img\n            class=\"preview\"\n            [title]=\"'asset.preview' | translate\"\n            [src]=\"asset | assetPreview: 'tiny'\"\n            (click)=\"previewAsset(asset)\"\n        />\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-asset=\"entity\">\n        <div class=\"name\" [title]=\"asset.name\">\n            {{ asset.name }}\n        </div>\n    </ng-template>\n</vdr-relation-card>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".preview{cursor:pointer}.detail{flex:1}.detail,.name{overflow:hidden}.name{white-space:nowrap;text-overflow:ellipsis}"]
                },] }
    ];
    RelationAssetInputComponent.ctorParameters = function () { return [
        { type: ModalService },
        { type: DataService }
    ]; };
    RelationAssetInputComponent.propDecorators = {
        readonly: [{ type: i0.Input }],
        parentFormControl: [{ type: i0.Input }],
        config: [{ type: i0.Input }]
    };

    var RelationSelectorDialogComponent = /** @class */ (function () {
        function RelationSelectorDialogComponent() {
        }
        return RelationSelectorDialogComponent;
    }());
    RelationSelectorDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-relation-selector-dialog',
                    template: "<ng-template vdrDialogTitle>{{ title | translate }}</ng-template>\n<ng-container [ngTemplateOutlet]=\"selectorTemplate\" [ngTemplateOutletContext]=\"{ select: resolveWith }\"></ng-container>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    var RelationCustomerInputComponent = /** @class */ (function () {
        function RelationCustomerInputComponent(modalService, dataService) {
            this.modalService = modalService;
            this.dataService = dataService;
            this.searchControl = new forms.FormControl('');
            this.searchTerm$ = new rxjs.Subject();
        }
        Object.defineProperty(RelationCustomerInputComponent.prototype, "customer", {
            get: function () {
                return this.parentFormControl.value;
            },
            enumerable: false,
            configurable: true
        });
        RelationCustomerInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.results$ = this.searchTerm$.pipe(operators.debounceTime(200), operators.switchMap(function (term) {
                return _this.dataService.customer
                    .getCustomerList(10, 0, term)
                    .mapSingle(function (data) { return data.customers.items; });
            }));
        };
        RelationCustomerInputComponent.prototype.selectCustomer = function () {
            var _this = this;
            this.modalService
                .fromComponent(RelationSelectorDialogComponent, {
                size: 'md',
                closable: true,
                locals: {
                    title: ngxTranslateExtractMarker.marker('customer.select-customer'),
                    selectorTemplate: this.template,
                },
            })
                .subscribe(function (result) {
                if (result) {
                    _this.parentFormControl.setValue(result);
                    _this.parentFormControl.markAsDirty();
                }
            });
        };
        RelationCustomerInputComponent.prototype.remove = function () {
            this.parentFormControl.setValue(null);
            this.parentFormControl.markAsDirty();
        };
        return RelationCustomerInputComponent;
    }());
    RelationCustomerInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-relation-customer-input',
                    template: "<vdr-relation-card\n    (select)=\"selectCustomer()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"user\"\n    [entity]=\"customer\"\n    [selectLabel]=\"'customer.select-customer' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview>\n        <div class=\"placeholder\">\n            <clr-icon shape=\"user\" class=\"is-solid\" size=\"50\"></clr-icon>\n        </div>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-c=\"entity\">\n        <div class=\"\">\n            <a [routerLink]=\"['/customer/customers', c.id]\">{{ c.firstName }} {{ c.lastName }}</a>\n        </div>\n        <div class=\"\">{{ c.emailAddress }}</div>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <ng-select [items]=\"results$ | async\" [typeahead]=\"searchTerm$\" appendTo=\"body\" (change)=\"select($event)\">\n        <ng-template ng-option-tmp let-item=\"item\">\n            <b>{{ item.emailAddress }}</b>\n            {{ item.firstName }} {{ item.lastName }}\n        </ng-template>\n    </ng-select>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    RelationCustomerInputComponent.ctorParameters = function () { return [
        { type: ModalService },
        { type: DataService }
    ]; };
    RelationCustomerInputComponent.propDecorators = {
        readonly: [{ type: i0.Input }],
        parentFormControl: [{ type: i0.Input }],
        config: [{ type: i0.Input }],
        template: [{ type: i0.ViewChild, args: ['selector',] }]
    };

    var RelationProductVariantInputComponent = /** @class */ (function () {
        function RelationProductVariantInputComponent(modalService, dataService) {
            this.modalService = modalService;
            this.dataService = dataService;
            this.searchControl = new forms.FormControl('');
            this.searchTerm$ = new rxjs.Subject();
        }
        RelationProductVariantInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.productVariant$ = this.parentFormControl.valueChanges.pipe(operators.startWith(this.parentFormControl.value), operators.map(function (variant) { return variant === null || variant === void 0 ? void 0 : variant.id; }), operators.distinctUntilChanged(), operators.switchMap(function (id) {
                if (id) {
                    return _this.dataService.product
                        .getProductVariant(id)
                        .mapStream(function (data) { return data.productVariant || undefined; });
                }
                else {
                    return rxjs.of(undefined);
                }
            }));
            this.results$ = this.searchTerm$.pipe(operators.debounceTime(200), operators.switchMap(function (term) {
                return _this.dataService.product
                    .getProductVariants(Object.assign(Object.assign({}, (term
                    ? {
                        filter: {
                            name: {
                                contains: term,
                            },
                        },
                    }
                    : {})), { take: 10 }))
                    .mapSingle(function (data) { return data.productVariants.items; });
            }));
        };
        RelationProductVariantInputComponent.prototype.selectProductVariant = function () {
            var _this = this;
            this.modalService
                .fromComponent(RelationSelectorDialogComponent, {
                size: 'md',
                closable: true,
                locals: {
                    title: ngxTranslateExtractMarker.marker('catalog.select-product-variant'),
                    selectorTemplate: this.template,
                },
            })
                .subscribe(function (result) {
                if (result) {
                    _this.parentFormControl.setValue(result);
                    _this.parentFormControl.markAsDirty();
                }
            });
        };
        RelationProductVariantInputComponent.prototype.remove = function () {
            this.parentFormControl.setValue(null);
            this.parentFormControl.markAsDirty();
        };
        return RelationProductVariantInputComponent;
    }());
    RelationProductVariantInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-relation-product-variant-input',
                    template: "<vdr-relation-card\n    (select)=\"selectProductVariant()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"library\"\n    [entity]=\"productVariant$ | async\"\n    [selectLabel]=\"'catalog.select-product-variant' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-variant=\"entity\">\n        <img\n            *ngIf=\"variant.featuredAsset || variant.product.featuredAsset as asset; else placeholder\"\n            [src]=\"asset | assetPreview: 'tiny'\"\n        />\n        <ng-template #placeholder>\n            <div class=\"placeholder\" *ngIf=\"!variant.featuredAsset\">\n                <clr-icon shape=\"image\" size=\"50\"></clr-icon>\n            </div>\n        </ng-template>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-variant=\"entity\">\n        <a [routerLink]=\"['/catalog/products', variant.product.id, { tab: 'variants' }]\">{{ variant.name }}</a>\n        <div class=\"\">{{ variant.sku }}</div>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <ng-select [items]=\"results$ | async\" [typeahead]=\"searchTerm$\" appendTo=\"body\" (change)=\"select($event)\">\n        <ng-template ng-option-tmp let-item=\"item\">\n            <img\n                *ngIf=\"item.featuredAsset || item.product.featuredAsset as asset\"\n                [src]=\"asset | assetPreview: 32\"\n            />\n            {{ item.name }}\n        </ng-template>\n    </ng-select>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".placeholder{color:var(--color-grey-300)}"]
                },] }
    ];
    RelationProductVariantInputComponent.ctorParameters = function () { return [
        { type: ModalService },
        { type: DataService }
    ]; };
    RelationProductVariantInputComponent.propDecorators = {
        readonly: [{ type: i0.Input }],
        parentFormControl: [{ type: i0.Input }],
        config: [{ type: i0.Input }],
        template: [{ type: i0.ViewChild, args: ['selector',] }]
    };

    var RelationProductInputComponent = /** @class */ (function () {
        function RelationProductInputComponent(modalService, dataService) {
            this.modalService = modalService;
            this.dataService = dataService;
            this.searchControl = new forms.FormControl('');
            this.searchTerm$ = new rxjs.Subject();
        }
        RelationProductInputComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.product$ = this.parentFormControl.valueChanges.pipe(operators.startWith(this.parentFormControl.value), operators.map(function (product) { return product === null || product === void 0 ? void 0 : product.id; }), operators.distinctUntilChanged(), operators.switchMap(function (id) {
                if (id) {
                    return _this.dataService.product
                        .getProductSimple(id)
                        .mapStream(function (data) { return data.product || undefined; });
                }
                else {
                    return rxjs.of(undefined);
                }
            }));
            this.results$ = this.searchTerm$.pipe(operators.debounceTime(200), operators.switchMap(function (term) {
                return _this.dataService.product
                    .getProducts(Object.assign(Object.assign({}, (term
                    ? {
                        filter: {
                            name: {
                                contains: term,
                            },
                        },
                    }
                    : {})), { take: 10 }))
                    .mapSingle(function (data) { return data.products.items; });
            }));
        };
        RelationProductInputComponent.prototype.selectProduct = function () {
            var _this = this;
            this.modalService
                .fromComponent(RelationSelectorDialogComponent, {
                size: 'md',
                closable: true,
                locals: {
                    title: ngxTranslateExtractMarker.marker('catalog.select-product'),
                    selectorTemplate: this.template,
                },
            })
                .subscribe(function (result) {
                if (result) {
                    _this.parentFormControl.setValue(result);
                    _this.parentFormControl.markAsDirty();
                }
            });
        };
        RelationProductInputComponent.prototype.remove = function () {
            this.parentFormControl.setValue(null);
            this.parentFormControl.markAsDirty();
        };
        return RelationProductInputComponent;
    }());
    RelationProductInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-relation-product-input',
                    template: "<vdr-relation-card\n    (select)=\"selectProduct()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"library\"\n    [entity]=\"product$ | async\"\n    [selectLabel]=\"'catalog.select-product' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-product=\"entity\">\n        <img *ngIf=\"product.featuredAsset\" [src]=\"product.featuredAsset | assetPreview: 'tiny'\" />\n        <div class=\"placeholder\" *ngIf=\"!product.featuredAsset\">\n            <clr-icon shape=\"image\" size=\"50\"></clr-icon>\n        </div>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-product=\"entity\">\n        <a [routerLink]=\"['/catalog/products', product.id]\">{{ product.name }}</a>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <ng-select [items]=\"results$ | async\" [typeahead]=\"searchTerm$\" appendTo=\"body\" (change)=\"select($event)\">\n        <ng-template ng-option-tmp let-item=\"item\">\n            <img [src]=\"item.featuredAsset | assetPreview: 32\" />\n            {{ item.name }}\n        </ng-template>\n    </ng-select>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".placeholder{color:var(--color-grey-300)}"]
                },] }
    ];
    RelationProductInputComponent.ctorParameters = function () { return [
        { type: ModalService },
        { type: DataService }
    ]; };
    RelationProductInputComponent.propDecorators = {
        readonly: [{ type: i0.Input }],
        parentFormControl: [{ type: i0.Input }],
        config: [{ type: i0.Input }],
        template: [{ type: i0.ViewChild, args: ['selector',] }]
    };

    var RelationCardPreviewDirective = /** @class */ (function () {
        function RelationCardPreviewDirective() {
        }
        return RelationCardPreviewDirective;
    }());
    RelationCardPreviewDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vdrRelationCardPreview]',
                },] }
    ];
    var RelationCardDetailDirective = /** @class */ (function () {
        function RelationCardDetailDirective() {
        }
        return RelationCardDetailDirective;
    }());
    RelationCardDetailDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[vdrRelationCardDetail]',
                },] }
    ];
    var RelationCardComponent = /** @class */ (function () {
        function RelationCardComponent() {
            this.removable = true;
            this.select = new i0.EventEmitter();
            this.remove = new i0.EventEmitter();
        }
        return RelationCardComponent;
    }());
    RelationCardComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-relation-card',
                    template: "<div class=\"flex\">\n    <ng-container *ngIf=\"entity; else placeholder\">\n        <div class=\"preview\">\n            <ng-container *ngTemplateOutlet=\"previewTemplate; context: { entity: entity }\"></ng-container>\n        </div>\n        <div class=\"detail\">\n            <div class=\"pl3\">\n                <ng-container *ngTemplateOutlet=\"detailTemplate; context: { entity: entity }\"></ng-container>\n            </div>\n            <button *ngIf=\"!readonly\" class=\"btn btn-sm btn-link\" (click)=\"select.emit()\">\n                <clr-icon shape=\"link\"></clr-icon> {{ 'common.change-selection' | translate }}\n            </button>\n            <button *ngIf=\"!readonly && removable\" class=\"btn btn-sm btn-link\" (click)=\"remove.emit()\">\n                <clr-icon shape=\"times\"></clr-icon> {{ 'common.remove' | translate }}\n            </button>\n        </div>\n    </ng-container>\n    <ng-template #placeholder>\n        <div class=\"preview\">\n            <div class=\"placeholder\" (click)=\"!readonly && select.emit()\">\n                <clr-icon [attr.shape]=\"placeholderIcon\" size=\"50\"></clr-icon>\n            </div>\n        </div>\n        <div class=\"detail\">\n            <div class=\"pl3 not-set\">{{ 'common.not-set' | translate }}</div>\n            <button *ngIf=\"!readonly\" class=\"btn btn-sm btn-link\" (click)=\"select.emit()\">\n                <clr-icon shape=\"link\"></clr-icon> {{ selectLabel }}\n            </button>\n        </div>\n    </ng-template>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;min-width:300px}.not-set,.placeholder{color:var(--color-grey-300)}.detail{flex:1}.detail,.name{overflow:hidden}.name{white-space:nowrap;text-overflow:ellipsis}"]
                },] }
    ];
    RelationCardComponent.propDecorators = {
        entity: [{ type: i0.Input }],
        placeholderIcon: [{ type: i0.Input }],
        selectLabel: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        removable: [{ type: i0.Input }],
        select: [{ type: i0.Output }],
        remove: [{ type: i0.Output }],
        previewTemplate: [{ type: i0.ContentChild, args: [RelationCardPreviewDirective, { read: i0.TemplateRef },] }],
        detailTemplate: [{ type: i0.ContentChild, args: [RelationCardDetailDirective, { read: i0.TemplateRef },] }]
    };

    var AssetPreviewPipe = /** @class */ (function () {
        function AssetPreviewPipe() {
        }
        AssetPreviewPipe.prototype.transform = function (asset, preset) {
            if (preset === void 0) { preset = 'thumb'; }
            if (!asset) {
                return '';
            }
            if (!asset.preview || typeof asset.preview !== 'string') {
                throw new Error("Expected an Asset, got " + JSON.stringify(asset));
            }
            var fp = asset.focalPoint ? "&fpx=" + asset.focalPoint.x + "&fpy=" + asset.focalPoint.y : '';
            if (Number.isNaN(Number(preset))) {
                return asset.preview + "?preset=" + preset + fp;
            }
            else {
                return asset.preview + "?w=" + preset + "&h=" + preset + fp;
            }
        };
        return AssetPreviewPipe;
    }());
    AssetPreviewPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'assetPreview',
                },] }
    ];

    var ChannelLabelPipe = /** @class */ (function () {
        function ChannelLabelPipe() {
        }
        ChannelLabelPipe.prototype.transform = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (value === sharedConstants.DEFAULT_CHANNEL_CODE) {
                return ngxTranslateExtractMarker.marker('common.default-channel');
            }
            else {
                return value;
            }
        };
        return ChannelLabelPipe;
    }());
    ChannelLabelPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'channelCodeToLabel',
                },] }
    ];

    /**
     * Displays a localized label for a CustomField or StringFieldOption, falling back to the
     * name/value if none are defined.
     */
    var CustomFieldLabelPipe = /** @class */ (function () {
        function CustomFieldLabelPipe(dataService) {
            var _this = this;
            this.dataService = dataService;
            this.subscription = dataService.client.uiState().stream$.subscribe(function (val) {
                _this.uiLanguageCode = val.uiState.language;
            });
        }
        CustomFieldLabelPipe.prototype.transform = function (value) {
            var _this = this;
            if (!value) {
                return value;
            }
            var label = value.label;
            var name = this.isCustomFieldConfig(value) ? value.name : value.value;
            if (label) {
                var match = label.find(function (l) { return l.languageCode === _this.uiLanguageCode; });
                return match ? match.value : label[0].value;
            }
            else {
                return name;
            }
        };
        CustomFieldLabelPipe.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        CustomFieldLabelPipe.prototype.isCustomFieldConfig = function (input) {
            return input.hasOwnProperty('name');
        };
        return CustomFieldLabelPipe;
    }());
    CustomFieldLabelPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'customFieldLabel',
                    pure: false,
                },] }
    ];
    CustomFieldLabelPipe.ctorParameters = function () { return [
        { type: DataService }
    ]; };

    /**
     * Displays a number of milliseconds in a more human-readable format,
     * e.g. "12ms", "33s", "2:03m"
     */
    var DurationPipe = /** @class */ (function () {
        function DurationPipe(i18nService) {
            this.i18nService = i18nService;
        }
        DurationPipe.prototype.transform = function (value) {
            if (value < 1000) {
                return this.i18nService.translate(ngxTranslateExtractMarker.marker('datetime.duration-milliseconds'), { ms: value });
            }
            else if (value < 1000 * 60) {
                var seconds1dp = +(value / 1000).toFixed(1);
                return this.i18nService.translate(ngxTranslateExtractMarker.marker('datetime.duration-seconds'), { s: seconds1dp });
            }
            else {
                var minutes = Math.floor(value / (1000 * 60));
                var seconds = Math.round((value % (1000 * 60)) / 1000)
                    .toString()
                    .padStart(2, '0');
                return this.i18nService.translate(ngxTranslateExtractMarker.marker('datetime.duration-minutes:seconds'), {
                    m: minutes,
                    s: seconds,
                });
            }
        };
        return DurationPipe;
    }());
    DurationPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'duration',
                },] }
    ];
    DurationPipe.ctorParameters = function () { return [
        { type: I18nService }
    ]; };

    /**
     * Formats a number into a human-readable file size string.
     */
    var FileSizePipe = /** @class */ (function () {
        function FileSizePipe() {
        }
        FileSizePipe.prototype.transform = function (value, useSiUnits) {
            if (useSiUnits === void 0) { useSiUnits = true; }
            if (typeof value !== 'number' && typeof value !== 'string') {
                return value;
            }
            return humanFileSize(value, useSiUnits === true);
        };
        return FileSizePipe;
    }());
    FileSizePipe.decorators = [
        { type: i0.Pipe, args: [{ name: 'filesize' },] }
    ];
    /**
     * Convert a number into a human-readable file size string.
     * Adapted from http://stackoverflow.com/a/14919494/772859
     */
    function humanFileSize(bytes, si) {
        var thresh = si ? 1000 : 1024;
        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        var units = si
            ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + ' ' + units[u];
    }

    /**
     * A pipe which checks the provided permission against all the permissions of the current user.
     * Returns `true` if the current user has that permission.
     *
     * @example
     * ```
     * <button [disabled]="!('UpdateCatalog' | hasPermission)">Save Changes</button>
     * ```
     */
    var HasPermissionPipe = /** @class */ (function () {
        function HasPermissionPipe(dataService, changeDetectorRef) {
            this.dataService = dataService;
            this.changeDetectorRef = changeDetectorRef;
            this.hasPermission = false;
            this.lastPermissions = null;
            this.currentPermissions$ = this.dataService.client
                .userStatus()
                .mapStream(function (data) { return data.userStatus.permissions; });
        }
        HasPermissionPipe.prototype.transform = function (input) {
            var _this = this;
            var requiredPermissions = Array.isArray(input) ? input : [input];
            var requiredPermissionsString = requiredPermissions.join(',');
            if (this.lastPermissions !== requiredPermissionsString) {
                this.lastPermissions = requiredPermissionsString;
                this.hasPermission = false;
                this.dispose();
                this.subscription = this.currentPermissions$.subscribe(function (permissions) {
                    _this.hasPermission = _this.checkPermissions(permissions, requiredPermissions);
                    _this.changeDetectorRef.markForCheck();
                });
            }
            return this.hasPermission;
        };
        HasPermissionPipe.prototype.ngOnDestroy = function () {
            this.dispose();
        };
        HasPermissionPipe.prototype.checkPermissions = function (userPermissions, requiredPermissions) {
            var e_1, _a;
            try {
                for (var requiredPermissions_1 = __values(requiredPermissions), requiredPermissions_1_1 = requiredPermissions_1.next(); !requiredPermissions_1_1.done; requiredPermissions_1_1 = requiredPermissions_1.next()) {
                    var perm = requiredPermissions_1_1.value;
                    if (userPermissions.includes(perm)) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (requiredPermissions_1_1 && !requiredPermissions_1_1.done && (_a = requiredPermissions_1.return)) _a.call(requiredPermissions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
        HasPermissionPipe.prototype.dispose = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return HasPermissionPipe;
    }());
    HasPermissionPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'hasPermission',
                    pure: false,
                },] }
    ];
    HasPermissionPipe.ctorParameters = function () { return [
        { type: DataService },
        { type: i0.ChangeDetectorRef }
    ]; };

    /**
     * Used by locale-aware pipes to handle the task of getting the active languageCode
     * of the UI and cleaning up.
     */
    var LocaleBasePipe = /** @class */ (function () {
        function LocaleBasePipe(dataService, changeDetectorRef) {
            var _this = this;
            if (dataService && changeDetectorRef) {
                this.subscription = dataService.client
                    .uiState()
                    .mapStream(function (data) { return data.uiState.language; })
                    .subscribe(function (languageCode) {
                    _this.locale = languageCode.replace(/_/g, '-');
                    changeDetectorRef.markForCheck();
                });
            }
        }
        LocaleBasePipe.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return LocaleBasePipe;
    }());
    LocaleBasePipe.decorators = [
        { type: i0.Injectable }
    ];
    LocaleBasePipe.ctorParameters = function () { return [
        { type: DataService },
        { type: i0.ChangeDetectorRef }
    ]; };

    /**
     * Displays a human-readable name for a given ISO 4217 currency code.
     */
    var LocaleCurrencyNamePipe = /** @class */ (function (_super) {
        __extends(LocaleCurrencyNamePipe, _super);
        function LocaleCurrencyNamePipe(dataService, changeDetectorRef) {
            return _super.call(this, dataService, changeDetectorRef) || this;
        }
        LocaleCurrencyNamePipe.prototype.transform = function (value, display, locale) {
            if (display === void 0) { display = 'full'; }
            var _a;
            if (value == null || value === '') {
                return '';
            }
            if (typeof value !== 'string') {
                return "Invalid currencyCode \"" + value + "\"";
            }
            var name = '';
            var symbol = '';
            var activeLocale = typeof locale === 'string' ? locale : (_a = this.locale) !== null && _a !== void 0 ? _a : 'en';
            if (display === 'full' || display === 'name') {
                name = new Intl.NumberFormat(activeLocale, {
                    style: 'currency',
                    currency: value,
                    currencyDisplay: 'name',
                })
                    .format(undefined)
                    .replace(/\s*NaN\s*/, '');
            }
            if (display === 'full' || display === 'symbol') {
                symbol = new Intl.NumberFormat(activeLocale, {
                    style: 'currency',
                    currency: value,
                    currencyDisplay: 'symbol',
                })
                    .format(undefined)
                    .replace(/\s*NaN\s*/, '');
            }
            return display === 'full' ? name + " (" + symbol + ")" : display === 'name' ? name : symbol;
        };
        return LocaleCurrencyNamePipe;
    }(LocaleBasePipe));
    LocaleCurrencyNamePipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'localeCurrencyName',
                    pure: false,
                },] }
    ];
    LocaleCurrencyNamePipe.ctorParameters = function () { return [
        { type: DataService, decorators: [{ type: i0.Optional }] },
        { type: i0.ChangeDetectorRef, decorators: [{ type: i0.Optional }] }
    ]; };

    var LocaleCurrencyPipe = /** @class */ (function (_super) {
        __extends(LocaleCurrencyPipe, _super);
        function LocaleCurrencyPipe(dataService, changeDetectorRef) {
            return _super.call(this, dataService, changeDetectorRef) || this;
        }
        LocaleCurrencyPipe.prototype.transform = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a = __read(args, 2), currencyCode = _a[0], locale = _a[1];
            if (typeof value === 'number' && typeof currencyCode === 'string') {
                var activeLocale = typeof locale === 'string' ? locale : this.locale;
                var majorUnits = value / 100;
                return new Intl.NumberFormat(activeLocale, { style: 'currency', currency: currencyCode }).format(majorUnits);
            }
            return value;
        };
        return LocaleCurrencyPipe;
    }(LocaleBasePipe));
    LocaleCurrencyPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'localeCurrency',
                    pure: false,
                },] }
    ];
    LocaleCurrencyPipe.ctorParameters = function () { return [
        { type: DataService, decorators: [{ type: i0.Optional }] },
        { type: i0.ChangeDetectorRef, decorators: [{ type: i0.Optional }] }
    ]; };

    /**
     * @description
     * A replacement of the Angular DatePipe which makes use of the Intl API
     * to format dates according to the selected UI language.
     */
    var LocaleDatePipe = /** @class */ (function (_super) {
        __extends(LocaleDatePipe, _super);
        function LocaleDatePipe(dataService, changeDetectorRef) {
            return _super.call(this, dataService, changeDetectorRef) || this;
        }
        LocaleDatePipe.prototype.transform = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a = __read(args, 2), format = _a[0], locale = _a[1];
            if (this.locale || typeof locale === 'string') {
                var activeLocale = typeof locale === 'string' ? locale : this.locale;
                var date = value instanceof Date ? value : typeof value === 'string' ? new Date(value) : undefined;
                if (date) {
                    var options = this.getOptionsForFormat(typeof format === 'string' ? format : 'medium');
                    return new Intl.DateTimeFormat(activeLocale, options).format(date);
                }
            }
        };
        LocaleDatePipe.prototype.getOptionsForFormat = function (dateFormat) {
            switch (dateFormat) {
                case 'medium':
                    return {
                        month: 'short',
                        year: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                    };
                case 'mediumTime':
                    return {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                    };
                case 'longDate':
                    return {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    };
                case 'short':
                    return {
                        day: 'numeric',
                        month: 'numeric',
                        year: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    };
                default:
                    return;
            }
        };
        return LocaleDatePipe;
    }(LocaleBasePipe));
    LocaleDatePipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'localeDate',
                    pure: false,
                },] }
    ];
    LocaleDatePipe.ctorParameters = function () { return [
        { type: DataService, decorators: [{ type: i0.Optional }] },
        { type: i0.ChangeDetectorRef, decorators: [{ type: i0.Optional }] }
    ]; };

    /**
     * Formats a string into sentence case (first letter of first word uppercase).
     */
    var SentenceCasePipe = /** @class */ (function () {
        function SentenceCasePipe() {
        }
        SentenceCasePipe.prototype.transform = function (value) {
            if (typeof value === 'string') {
                var lower = void 0;
                if (isCamelCase(value)) {
                    lower = value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
                }
                else {
                    lower = value.toLowerCase();
                }
                return lower.charAt(0).toUpperCase() + lower.slice(1);
            }
            return value;
        };
        return SentenceCasePipe;
    }());
    SentenceCasePipe.decorators = [
        { type: i0.Pipe, args: [{ name: 'sentenceCase' },] }
    ];
    function isCamelCase(value) {
        return /^[a-zA-Z]+[A-Z][a-zA-Z]+$/.test(value);
    }

    /**
     * A pipe for sorting elements of an array. Should be used with caution due to the
     * potential for perf degredation. Ideally should only be used on small arrays (< 10s of items)
     * and in components using OnPush change detection.
     */
    var SortPipe = /** @class */ (function () {
        function SortPipe() {
        }
        SortPipe.prototype.transform = function (value, orderByProp) {
            return value.slice().sort(function (a, b) {
                var aProp = orderByProp ? a[orderByProp] : a;
                var bProp = orderByProp ? b[orderByProp] : b;
                if (aProp === bProp) {
                    return 0;
                }
                if (aProp == null) {
                    return 1;
                }
                if (bProp == null) {
                    return -1;
                }
                return aProp > bProp ? 1 : -1;
            });
        };
        return SortPipe;
    }());
    SortPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'sort',
                },] }
    ];

    var StateI18nTokenPipe = /** @class */ (function () {
        function StateI18nTokenPipe() {
            this.stateI18nTokens = {
                Created: ngxTranslateExtractMarker.marker('state.created'),
                AddingItems: ngxTranslateExtractMarker.marker('state.adding-items'),
                ArrangingPayment: ngxTranslateExtractMarker.marker('state.arranging-payment'),
                PaymentAuthorized: ngxTranslateExtractMarker.marker('state.payment-authorized'),
                PaymentSettled: ngxTranslateExtractMarker.marker('state.payment-settled'),
                PartiallyShipped: ngxTranslateExtractMarker.marker('state.partially-shipped'),
                Shipped: ngxTranslateExtractMarker.marker('state.shipped'),
                PartiallyDelivered: ngxTranslateExtractMarker.marker('state.partially-delivered'),
                Authorized: ngxTranslateExtractMarker.marker('state.authorized'),
                Delivered: ngxTranslateExtractMarker.marker('state.delivered'),
                Cancelled: ngxTranslateExtractMarker.marker('state.cancelled'),
                Pending: ngxTranslateExtractMarker.marker('state.pending'),
                Settled: ngxTranslateExtractMarker.marker('state.settled'),
                Failed: ngxTranslateExtractMarker.marker('state.failed'),
                Error: ngxTranslateExtractMarker.marker('state.error'),
                Declined: ngxTranslateExtractMarker.marker('state.declined'),
                Modifying: ngxTranslateExtractMarker.marker('state.modifying'),
                ArrangingAdditionalPayment: ngxTranslateExtractMarker.marker('state.arranging-additional-payment'),
            };
        }
        StateI18nTokenPipe.prototype.transform = function (value) {
            if (typeof value === 'string' && value.length) {
                var defaultStateToken = this.stateI18nTokens[value];
                if (defaultStateToken) {
                    return defaultStateToken;
                }
                return ('state.' +
                    value
                        .replace(/([a-z])([A-Z])/g, '$1-$2')
                        .replace(/ +/g, '-')
                        .toLowerCase());
            }
            return value;
        };
        return StateI18nTokenPipe;
    }());
    StateI18nTokenPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'stateI18nToken',
                },] }
    ];

    /**
     * For a given string, returns one of a pre-defined selection of colours.
     */
    function stringToColor(input) {
        if (!input || input === '') {
            return 'var(--color-component-bg-100)';
        }
        var safeColors = [
            '#10893E',
            '#107C10',
            '#7E735F',
            '#2F5646',
            '#498205',
            '#847545',
            '#744DA9',
            '#018574',
            '#486860',
            '#525E54',
            '#647C64',
            '#567C73',
            '#8764B8',
            '#515C6B',
            '#4A5459',
            '#69797E',
            '#0063B1',
            '#0078D7',
            '#2D7D9A',
            '#7A7574',
            '#767676',
        ];
        var value = input.split('').reduce(function (prev, curr, index) {
            return prev + Math.round(curr.charCodeAt(0) * Math.log(index + 2));
        }, 0);
        return safeColors[value % safeColors.length];
    }

    var StringToColorPipe = /** @class */ (function () {
        function StringToColorPipe() {
        }
        StringToColorPipe.prototype.transform = function (value) {
            return stringToColor(value);
        };
        return StringToColorPipe;
    }());
    StringToColorPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'stringToColor',
                    pure: true,
                },] }
    ];

    /**
     * Converts a date into the format "3 minutes ago", "5 hours ago" etc.
     */
    var TimeAgoPipe = /** @class */ (function () {
        function TimeAgoPipe(i18nService) {
            this.i18nService = i18nService;
        }
        TimeAgoPipe.prototype.transform = function (value, nowVal) {
            var e_1, _a;
            var then = dayjs__default['default'](value);
            var now = dayjs__default['default'](nowVal || new Date());
            var secondsDiff = now.diff(then, 'second');
            var durations = [
                [60, ngxTranslateExtractMarker.marker('datetime.ago-seconds')],
                [3600, ngxTranslateExtractMarker.marker('datetime.ago-minutes')],
                [86400, ngxTranslateExtractMarker.marker('datetime.ago-hours')],
                [31536000, ngxTranslateExtractMarker.marker('datetime.ago-days')],
                [Number.MAX_SAFE_INTEGER, ngxTranslateExtractMarker.marker('datetime.ago-years')],
            ];
            var lastUpperBound = 1;
            try {
                for (var durations_1 = __values(durations), durations_1_1 = durations_1.next(); !durations_1_1.done; durations_1_1 = durations_1.next()) {
                    var _b = __read(durations_1_1.value, 2), upperBound = _b[0], translationToken = _b[1];
                    if (secondsDiff < upperBound) {
                        var count = Math.max(0, Math.floor(secondsDiff / lastUpperBound));
                        return this.i18nService.translate(translationToken, { count: count });
                    }
                    lastUpperBound = upperBound;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (durations_1_1 && !durations_1_1.done && (_a = durations_1.return)) _a.call(durations_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return then.format();
        };
        return TimeAgoPipe;
    }());
    TimeAgoPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'timeAgo',
                    pure: false,
                },] }
    ];
    TimeAgoPipe.ctorParameters = function () { return [
        { type: I18nService }
    ]; };

    var CanDeactivateDetailGuard = /** @class */ (function () {
        function CanDeactivateDetailGuard(modalService, router) {
            this.modalService = modalService;
            this.router = router;
        }
        CanDeactivateDetailGuard.prototype.canDeactivate = function (component, currentRoute, currentState, nextState) {
            if (!component.canDeactivate()) {
                return this.modalService
                    .dialog({
                    title: ngxTranslateExtractMarker.marker('common.confirm-navigation'),
                    body: ngxTranslateExtractMarker.marker('common.there-are-unsaved-changes'),
                    buttons: [
                        { type: 'danger', label: ngxTranslateExtractMarker.marker('common.discard-changes'), returnValue: true },
                        { type: 'primary', label: ngxTranslateExtractMarker.marker('common.cancel-navigation'), returnValue: false },
                    ],
                })
                    .pipe(operators.map(function (result) { return !!result; }));
            }
            else {
                return true;
            }
        };
        return CanDeactivateDetailGuard;
    }());
    CanDeactivateDetailGuard.decorators = [
        { type: i0.Injectable }
    ];
    CanDeactivateDetailGuard.ctorParameters = function () { return [
        { type: ModalService },
        { type: i1$3.Router }
    ]; };

    var IMPORTS = [
        angular.ClarityModule,
        i1.CommonModule,
        forms.FormsModule,
        forms.ReactiveFormsModule,
        i1$3.RouterModule,
        ngSelect.NgSelectModule,
        ngxPagination.NgxPaginationModule,
        i1$2.TranslateModule,
        overlay.OverlayModule,
        dragDrop.DragDropModule,
    ];
    var DECLARATIONS = [
        ActionBarComponent,
        ActionBarLeftComponent,
        ActionBarRightComponent,
        AssetPreviewComponent,
        AssetPreviewDialogComponent,
        AssetSearchInputComponent,
        ConfigurableInputComponent,
        AffixedInputComponent,
        ChipComponent,
        CurrencyInputComponent,
        LocaleCurrencyNamePipe,
        CustomerLabelComponent,
        CustomFieldControlComponent,
        DataTableComponent,
        DataTableColumnComponent,
        FacetValueSelectorComponent,
        ItemsPerPageControlsComponent,
        PaginationControlsComponent,
        TableRowActionComponent,
        FacetValueChipComponent,
        FileSizePipe,
        FormFieldComponent,
        FormFieldControlDirective,
        FormItemComponent,
        ModalDialogComponent,
        PercentageSuffixInputComponent,
        DialogComponentOutletComponent,
        DialogButtonsDirective,
        DialogTitleDirective,
        SelectToggleComponent,
        LanguageSelectorComponent,
        RichTextEditorComponent,
        SimpleDialogComponent,
        TitleInputComponent,
        SentenceCasePipe,
        DropdownComponent,
        DropdownMenuComponent,
        SortPipe,
        DropdownTriggerDirective,
        DropdownItemDirective,
        OrderStateLabelComponent,
        FormattedAddressComponent,
        LabeledDataComponent,
        StringToColorPipe,
        ObjectTreeComponent,
        IfPermissionsDirective,
        IfMultichannelDirective,
        HasPermissionPipe,
        ActionBarItemsComponent,
        DisabledDirective,
        AssetFileInputComponent,
        AssetGalleryComponent,
        AssetPickerDialogComponent,
        EntityInfoComponent,
        DatetimePickerComponent,
        ChannelBadgeComponent,
        ChannelAssignmentControlComponent,
        ChannelLabelPipe,
        IfDefaultChannelActiveDirective,
        ExtensionHostComponent,
        CustomFieldLabelPipe,
        FocalPointControlComponent,
        AssetPreviewPipe,
        LinkDialogComponent,
        ExternalImageDialogComponent,
        TimeAgoPipe,
        DurationPipe,
        EmptyPlaceholderComponent,
        TimelineEntryComponent,
        HistoryEntryDetailComponent,
        EditNoteDialogComponent,
        ProductSelectorFormInputComponent,
        StateI18nTokenPipe,
        ProductSelectorComponent,
        HelpTooltipComponent,
        CustomerGroupFormInputComponent,
        AddressFormComponent,
        LocaleDatePipe,
        LocaleCurrencyPipe,
        TagSelectorComponent,
    ];
    var DYNAMIC_FORM_INPUTS = [
        TextFormInputComponent,
        PasswordFormInputComponent,
        NumberFormInputComponent,
        DateFormInputComponent,
        CurrencyFormInputComponent,
        BooleanFormInputComponent,
        SelectFormInputComponent,
        FacetValueFormInputComponent,
        DynamicFormInputComponent,
        RelationFormInputComponent,
        RelationAssetInputComponent,
        RelationProductInputComponent,
        RelationProductVariantInputComponent,
        RelationCustomerInputComponent,
        RelationCardPreviewDirective,
        RelationCardDetailDirective,
        RelationSelectorDialogComponent,
    ];
    var SharedModule = /** @class */ (function () {
        function SharedModule() {
        }
        return SharedModule;
    }());
    SharedModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [IMPORTS],
                    exports: __spread(IMPORTS, DECLARATIONS, DYNAMIC_FORM_INPUTS),
                    declarations: __spread(DECLARATIONS, DYNAMIC_FORM_INPUTS, [
                        ManageTagsDialogComponent,
                        RelationSelectorDialogComponent,
                        RelationCardComponent,
                    ]),
                    providers: [
                        // This needs to be shared, since lazy-loaded
                        // modules have their own entryComponents which
                        // are unknown to the CoreModule instance of ModalService.
                        // See https://github.com/angular/angular/issues/14324#issuecomment-305650763
                        ModalService,
                        CanDeactivateDetailGuard,
                    ],
                    schemas: [i0.CUSTOM_ELEMENTS_SCHEMA],
                },] }
    ];

    var CoreModule = /** @class */ (function () {
        function CoreModule(i18nService, localStorageService, titleService) {
            this.i18nService = i18nService;
            this.localStorageService = localStorageService;
            this.titleService = titleService;
            this.initUiLanguages();
            this.initUiTitle();
        }
        CoreModule.prototype.initUiLanguages = function () {
            var defaultLanguage = getDefaultUiLanguage();
            var lastLanguage = this.localStorageService.get('uiLanguageCode');
            var availableLanguages = getAppConfig().availableLanguages;
            if (!availableLanguages.includes(defaultLanguage)) {
                throw new Error("The defaultLanguage \"" + defaultLanguage + "\" must be one of the availableLanguages [" + availableLanguages
                    .map(function (l) { return "\"" + l + "\""; })
                    .join(', ') + "]");
            }
            var uiLanguage = lastLanguage && availableLanguages.includes(lastLanguage) ? lastLanguage : defaultLanguage;
            this.localStorageService.set('uiLanguageCode', uiLanguage);
            this.i18nService.setLanguage(uiLanguage);
            this.i18nService.setDefaultLanguage(defaultLanguage);
            this.i18nService.setAvailableLanguages(availableLanguages || [defaultLanguage]);
        };
        CoreModule.prototype.initUiTitle = function () {
            var title = getAppConfig().brand || 'VendureAdmin';
            this.titleService.setTitle(title);
        };
        return CoreModule;
    }());
    CoreModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        platformBrowser.BrowserModule,
                        DataModule,
                        SharedModule,
                        animations.BrowserAnimationsModule,
                        i1$2.TranslateModule.forRoot({
                            loader: {
                                provide: i1$2.TranslateLoader,
                                useFactory: HttpLoaderFactory,
                                deps: [i1$1.HttpClient, i1.PlatformLocation],
                            },
                            compiler: { provide: i1$2.TranslateCompiler, useClass: InjectableTranslateMessageFormatCompiler },
                        }),
                    ],
                    providers: [
                        { provide: i1$4.MESSAGE_FORMAT_CONFIG, useFactory: getLocales },
                        registerDefaultFormInputs(),
                        platformBrowser.Title,
                    ],
                    exports: [SharedModule, OverlayHostComponent],
                    declarations: [
                        AppShellComponent,
                        UserMenuComponent,
                        MainNavComponent,
                        BreadcrumbComponent,
                        OverlayHostComponent,
                        NotificationComponent,
                        UiLanguageSwitcherDialogComponent,
                        ChannelSwitcherComponent,
                        ThemeSwitcherComponent,
                    ],
                },] }
    ];
    CoreModule.ctorParameters = function () { return [
        { type: I18nService },
        { type: LocalStorageService },
        { type: platformBrowser.Title }
    ]; };
    function HttpLoaderFactory(http, location) {
        // Dynamically get the baseHref, which is configured in the angular.json file
        var baseHref = location.getBaseHrefFromDOM();
        return new CustomHttpTranslationLoader(http, baseHref + 'i18n-messages/');
    }
    /**
     * Returns the locales defined in the vendure-ui-config.json, ensuring that the
     * default language is the first item in the array as per the messageformat
     * documentation:
     *
     * > The default locale will be the first entry of the array
     * https://messageformat.github.io/messageformat/MessageFormat
     */
    function getLocales() {
        var locales = getAppConfig().availableLanguages;
        var defaultLanguage = getDefaultUiLanguage();
        var localesWithoutDefault = locales.filter(function (l) { return l !== defaultLanguage; });
        return {
            locales: __spread([defaultLanguage], localesWithoutDefault),
        };
    }

    var AppComponentModule = /** @class */ (function () {
        function AppComponentModule() {
        }
        return AppComponentModule;
    }());
    AppComponentModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [SharedModule, CoreModule],
                    declarations: [AppComponent],
                    exports: [AppComponent],
                },] }
    ];

    var BaseDetailComponent = /** @class */ (function () {
        function BaseDetailComponent(route, router, serverConfigService, dataService) {
            this.route = route;
            this.router = router;
            this.serverConfigService = serverConfigService;
            this.dataService = dataService;
            this.destroy$ = new rxjs.Subject();
        }
        BaseDetailComponent.prototype.init = function () {
            var _this = this;
            this.entity$ = this.route.data.pipe(operators.switchMap(function (data) { return data.entity.pipe(operators.takeUntil(_this.destroy$)); }), operators.tap(function (entity) { return (_this.id = entity.id); }), operators.shareReplay(1));
            this.isNew$ = this.entity$.pipe(operators.map(function (entity) { return entity.id === ''; }), operators.shareReplay(1));
            this.languageCode$ = this.route.paramMap.pipe(operators.map(function (paramMap) { return paramMap.get('lang'); }), operators.switchMap(function (lang) {
                if (lang) {
                    return rxjs.of(lang);
                }
                else {
                    return _this.dataService.settings
                        .getActiveChannel()
                        .mapSingle(function (data) { return data.activeChannel.defaultLanguageCode; });
                }
            }), operators.distinctUntilChanged(), operators.shareReplay(1));
            this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), entity = _b[0], languageCode = _b[1];
                _this.setFormValues(entity, languageCode);
                _this.detailForm.markAsPristine();
            });
        };
        BaseDetailComponent.prototype.destroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        BaseDetailComponent.prototype.setLanguage = function (code) {
            this.setQueryParam('lang', code);
        };
        BaseDetailComponent.prototype.canDeactivate = function () {
            return this.detailForm && this.detailForm.pristine;
        };
        BaseDetailComponent.prototype.getCustomFieldConfig = function (key) {
            return this.serverConfigService.getCustomFieldsFor(key);
        };
        BaseDetailComponent.prototype.setQueryParam = function (key, value) {
            var _a;
            this.router.navigate([
                './',
                Object.assign(Object.assign({}, this.route.snapshot.params), (_a = {}, _a[key] = value, _a)),
            ], {
                relativeTo: this.route,
                queryParamsHandling: 'merge',
            });
        };
        return BaseDetailComponent;
    }());

    function createResolveData(resolver) {
        return {
            entity: resolver,
        };
    }
    /**
     * A base resolver for an entity detail route. Resolves to an observable of the given entity, or a "blank"
     * version if the route id equals "create".
     */
    var BaseEntityResolver = /** @class */ (function () {
        function BaseEntityResolver(router, emptyEntity, entityStream) {
            this.router = router;
            this.emptyEntity = emptyEntity;
            this.entityStream = entityStream;
        }
        BaseEntityResolver.prototype.resolve = function (route, state) {
            var id = route.paramMap.get('id');
            // Complete the entity stream upon navigating away
            var navigateAway$ = this.router.events.pipe(operators.filter(function (event) { return event instanceof i1$3.ActivationStart; }));
            if (id === 'create') {
                return rxjs.of(rxjs.of(this.emptyEntity));
            }
            else {
                var stream_1 = this.entityStream(id || '').pipe(operators.takeUntil(navigateAway$), operators.filter(sharedUtils.notNullOrUndefined), operators.shareReplay(1));
                return stream_1.pipe(operators.take(1), operators.map(function () { return stream_1; }));
            }
        };
        return BaseEntityResolver;
    }());

    /**
     * This is a base class which implements the logic required to fetch and manipulate
     * a list of data from a query which returns a PaginatedList type.
     */
    // tslint:disable-next-line:directive-class-suffix
    var BaseListComponent = /** @class */ (function () {
        function BaseListComponent(router, route) {
            this.router = router;
            this.route = route;
            this.destroy$ = new rxjs.Subject();
            this.onPageChangeFn = function (skip, take) { return ({ options: { skip: skip, take: take } }); };
            this.refresh$ = new rxjs.BehaviorSubject(undefined);
            this.defaults = { take: 10, skip: 0 };
        }
        /**
         * Sets the fetch function for the list being implemented.
         */
        BaseListComponent.prototype.setQueryFn = function (listQueryFn, mappingFn, onPageChangeFn, defaults) {
            this.listQueryFn = listQueryFn;
            this.mappingFn = mappingFn;
            if (onPageChangeFn) {
                this.onPageChangeFn = onPageChangeFn;
            }
            if (defaults) {
                this.defaults = defaults;
            }
        };
        BaseListComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (!this.listQueryFn) {
                throw new Error("No listQueryFn has been defined. Please call super.setQueryFn() in the constructor.");
            }
            this.listQuery = this.listQueryFn(this.defaults.take, this.defaults.skip);
            var fetchPage = function (_b) {
                var _c = __read(_b, 3), currentPage = _c[0], itemsPerPage = _c[1], _ = _c[2];
                var take = itemsPerPage;
                var skip = (currentPage - 1) * itemsPerPage;
                _this.listQuery.ref.refetch(_this.onPageChangeFn(skip, take));
            };
            this.result$ = this.listQuery.stream$.pipe(operators.shareReplay(1));
            this.items$ = this.result$.pipe(operators.map(function (data) { return _this.mappingFn(data).items; }));
            this.totalItems$ = this.result$.pipe(operators.map(function (data) { return _this.mappingFn(data).totalItems; }));
            this.currentPage$ = this.route.queryParamMap.pipe(operators.map(function (qpm) { return qpm.get('page'); }), operators.map(function (page) { return (!page ? 1 : +page); }), operators.distinctUntilChanged());
            this.itemsPerPage$ = this.route.queryParamMap.pipe(operators.map(function (qpm) { return qpm.get('perPage'); }), operators.map(function (perPage) { return (!perPage ? _this.defaults.take : +perPage); }), operators.distinctUntilChanged());
            rxjs.combineLatest(this.currentPage$, this.itemsPerPage$, this.refresh$)
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(fetchPage);
        };
        BaseListComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
            this.listQuery.completed$.next();
        };
        BaseListComponent.prototype.setPageNumber = function (page) {
            this.setQueryParam('page', page, { replaceUrl: true });
        };
        BaseListComponent.prototype.setItemsPerPage = function (perPage) {
            this.setQueryParam('perPage', perPage, { replaceUrl: true });
        };
        /**
         * Re-fetch the current page
         */
        BaseListComponent.prototype.refresh = function () {
            this.refresh$.next(undefined);
        };
        BaseListComponent.prototype.setQueryParam = function (keyOrHash, valueOrOptions, maybeOptions) {
            var _b, _c;
            var _a;
            var paramsObject = typeof keyOrHash === 'string' ? (_b = {}, _b[keyOrHash] = valueOrOptions, _b) : keyOrHash;
            var options = (_a = (typeof keyOrHash === 'string' ? maybeOptions : valueOrOptions)) !== null && _a !== void 0 ? _a : {};
            this.router.navigate(['./'], Object.assign({ queryParams: typeof keyOrHash === 'string' ? (_c = {}, _c[keyOrHash] = valueOrOptions, _c) : keyOrHash, relativeTo: this.route, queryParamsHandling: 'merge' }, options));
        };
        return BaseListComponent;
    }());
    BaseListComponent.decorators = [
        { type: i0.Directive }
    ];
    BaseListComponent.ctorParameters = function () { return [
        { type: i1$3.Router },
        { type: i1$3.ActivatedRoute }
    ]; };

    /**
     * Creates an observable of breadcrumb links for use in the route config of a detail route.
     */
    function detailBreadcrumb(options) {
        return options.entity.pipe(operators.map(function (entity) {
            var label = '';
            if (options.id === 'create') {
                label = 'common.create';
            }
            else {
                label = "" + options.getName(entity);
            }
            return [
                {
                    label: options.breadcrumbKey,
                    link: ['../', options.route],
                },
                {
                    label: label,
                    link: [options.route, options.id],
                },
            ];
        }));
    }

    /**
     * The purpose of this file is to simply mark each available language code (as defined in the
     * LanguageCode GraphQL enum) with the `mark-for-extraction` function, so that when running
     * the "extract-translations" script, the language translation tokens will be extracted.
     */
    ngxTranslateExtractMarker.marker('lang.af');
    ngxTranslateExtractMarker.marker('lang.ak');
    ngxTranslateExtractMarker.marker('lang.sq');
    ngxTranslateExtractMarker.marker('lang.am');
    ngxTranslateExtractMarker.marker('lang.ar');
    ngxTranslateExtractMarker.marker('lang.hy');
    ngxTranslateExtractMarker.marker('lang.as');
    ngxTranslateExtractMarker.marker('lang.az');
    ngxTranslateExtractMarker.marker('lang.bm');
    ngxTranslateExtractMarker.marker('lang.bn');
    ngxTranslateExtractMarker.marker('lang.eu');
    ngxTranslateExtractMarker.marker('lang.be');
    ngxTranslateExtractMarker.marker('lang.bs');
    ngxTranslateExtractMarker.marker('lang.br');
    ngxTranslateExtractMarker.marker('lang.bg');
    ngxTranslateExtractMarker.marker('lang.my');
    ngxTranslateExtractMarker.marker('lang.ca');
    ngxTranslateExtractMarker.marker('lang.ce');
    ngxTranslateExtractMarker.marker('lang.zh');
    ngxTranslateExtractMarker.marker('lang.zh_Hans');
    ngxTranslateExtractMarker.marker('lang.zh_Hant');
    ngxTranslateExtractMarker.marker('lang.cu');
    ngxTranslateExtractMarker.marker('lang.kw');
    ngxTranslateExtractMarker.marker('lang.co');
    ngxTranslateExtractMarker.marker('lang.hr');
    ngxTranslateExtractMarker.marker('lang.cs');
    ngxTranslateExtractMarker.marker('lang.da');
    ngxTranslateExtractMarker.marker('lang.nl');
    ngxTranslateExtractMarker.marker('lang.nl_BE');
    ngxTranslateExtractMarker.marker('lang.dz');
    ngxTranslateExtractMarker.marker('lang.en');
    ngxTranslateExtractMarker.marker('lang.en_AU');
    ngxTranslateExtractMarker.marker('lang.en_CA');
    ngxTranslateExtractMarker.marker('lang.en_GB');
    ngxTranslateExtractMarker.marker('lang.en_US');
    ngxTranslateExtractMarker.marker('lang.eo');
    ngxTranslateExtractMarker.marker('lang.et');
    ngxTranslateExtractMarker.marker('lang.ee');
    ngxTranslateExtractMarker.marker('lang.fo');
    ngxTranslateExtractMarker.marker('lang.fi');
    ngxTranslateExtractMarker.marker('lang.fr');
    ngxTranslateExtractMarker.marker('lang.fr_CA');
    ngxTranslateExtractMarker.marker('lang.fr_CH');
    ngxTranslateExtractMarker.marker('lang.ff');
    ngxTranslateExtractMarker.marker('lang.gl');
    ngxTranslateExtractMarker.marker('lang.lg');
    ngxTranslateExtractMarker.marker('lang.ka');
    ngxTranslateExtractMarker.marker('lang.de');
    ngxTranslateExtractMarker.marker('lang.de_AT');
    ngxTranslateExtractMarker.marker('lang.de_CH');
    ngxTranslateExtractMarker.marker('lang.el');
    ngxTranslateExtractMarker.marker('lang.gu');
    ngxTranslateExtractMarker.marker('lang.ht');
    ngxTranslateExtractMarker.marker('lang.ha');
    ngxTranslateExtractMarker.marker('lang.he');
    ngxTranslateExtractMarker.marker('lang.hi');
    ngxTranslateExtractMarker.marker('lang.hu');
    ngxTranslateExtractMarker.marker('lang.is');
    ngxTranslateExtractMarker.marker('lang.ig');
    ngxTranslateExtractMarker.marker('lang.id');
    ngxTranslateExtractMarker.marker('lang.ia');
    ngxTranslateExtractMarker.marker('lang.ga');
    ngxTranslateExtractMarker.marker('lang.it');
    ngxTranslateExtractMarker.marker('lang.ja');
    ngxTranslateExtractMarker.marker('lang.jv');
    ngxTranslateExtractMarker.marker('lang.kl');
    ngxTranslateExtractMarker.marker('lang.kn');
    ngxTranslateExtractMarker.marker('lang.ks');
    ngxTranslateExtractMarker.marker('lang.kk');
    ngxTranslateExtractMarker.marker('lang.km');
    ngxTranslateExtractMarker.marker('lang.ki');
    ngxTranslateExtractMarker.marker('lang.rw');
    ngxTranslateExtractMarker.marker('lang.ko');
    ngxTranslateExtractMarker.marker('lang.ku');
    ngxTranslateExtractMarker.marker('lang.ky');
    ngxTranslateExtractMarker.marker('lang.lo');
    ngxTranslateExtractMarker.marker('lang.la');
    ngxTranslateExtractMarker.marker('lang.lv');
    ngxTranslateExtractMarker.marker('lang.ln');
    ngxTranslateExtractMarker.marker('lang.lt');
    ngxTranslateExtractMarker.marker('lang.lu');
    ngxTranslateExtractMarker.marker('lang.lb');
    ngxTranslateExtractMarker.marker('lang.mk');
    ngxTranslateExtractMarker.marker('lang.mg');
    ngxTranslateExtractMarker.marker('lang.ms');
    ngxTranslateExtractMarker.marker('lang.ml');
    ngxTranslateExtractMarker.marker('lang.mt');
    ngxTranslateExtractMarker.marker('lang.gv');
    ngxTranslateExtractMarker.marker('lang.mi');
    ngxTranslateExtractMarker.marker('lang.mr');
    ngxTranslateExtractMarker.marker('lang.mn');
    ngxTranslateExtractMarker.marker('lang.ne');
    ngxTranslateExtractMarker.marker('lang.nd');
    ngxTranslateExtractMarker.marker('lang.se');
    ngxTranslateExtractMarker.marker('lang.nb');
    ngxTranslateExtractMarker.marker('lang.nn');
    ngxTranslateExtractMarker.marker('lang.ny');
    ngxTranslateExtractMarker.marker('lang.or');
    ngxTranslateExtractMarker.marker('lang.om');
    ngxTranslateExtractMarker.marker('lang.os');
    ngxTranslateExtractMarker.marker('lang.ps');
    ngxTranslateExtractMarker.marker('lang.fa');
    ngxTranslateExtractMarker.marker('lang.fa_AF');
    ngxTranslateExtractMarker.marker('lang.pl');
    ngxTranslateExtractMarker.marker('lang.pt');
    ngxTranslateExtractMarker.marker('lang.pt_BR');
    ngxTranslateExtractMarker.marker('lang.pt_PT');
    ngxTranslateExtractMarker.marker('lang.pa');
    ngxTranslateExtractMarker.marker('lang.qu');
    ngxTranslateExtractMarker.marker('lang.ro');
    ngxTranslateExtractMarker.marker('lang.ro_MD');
    ngxTranslateExtractMarker.marker('lang.rm');
    ngxTranslateExtractMarker.marker('lang.rn');
    ngxTranslateExtractMarker.marker('lang.ru');
    ngxTranslateExtractMarker.marker('lang.sm');
    ngxTranslateExtractMarker.marker('lang.sg');
    ngxTranslateExtractMarker.marker('lang.sa');
    ngxTranslateExtractMarker.marker('lang.gd');
    ngxTranslateExtractMarker.marker('lang.sr');
    ngxTranslateExtractMarker.marker('lang.sn');
    ngxTranslateExtractMarker.marker('lang.ii');
    ngxTranslateExtractMarker.marker('lang.sd');
    ngxTranslateExtractMarker.marker('lang.si');
    ngxTranslateExtractMarker.marker('lang.sk');
    ngxTranslateExtractMarker.marker('lang.sl');
    ngxTranslateExtractMarker.marker('lang.so');
    ngxTranslateExtractMarker.marker('lang.st');
    ngxTranslateExtractMarker.marker('lang.es');
    ngxTranslateExtractMarker.marker('lang.es_ES');
    ngxTranslateExtractMarker.marker('lang.es_MX');
    ngxTranslateExtractMarker.marker('lang.su');
    ngxTranslateExtractMarker.marker('lang.sw');
    ngxTranslateExtractMarker.marker('lang.sw_CD');
    ngxTranslateExtractMarker.marker('lang.sv');
    ngxTranslateExtractMarker.marker('lang.tg');
    ngxTranslateExtractMarker.marker('lang.ta');
    ngxTranslateExtractMarker.marker('lang.tt');
    ngxTranslateExtractMarker.marker('lang.te');
    ngxTranslateExtractMarker.marker('lang.th');
    ngxTranslateExtractMarker.marker('lang.bo');
    ngxTranslateExtractMarker.marker('lang.ti');
    ngxTranslateExtractMarker.marker('lang.to');
    ngxTranslateExtractMarker.marker('lang.tr');
    ngxTranslateExtractMarker.marker('lang.tk');
    ngxTranslateExtractMarker.marker('lang.uk');
    ngxTranslateExtractMarker.marker('lang.ur');
    ngxTranslateExtractMarker.marker('lang.ug');
    ngxTranslateExtractMarker.marker('lang.uz');
    ngxTranslateExtractMarker.marker('lang.vi');
    ngxTranslateExtractMarker.marker('lang.vo');
    ngxTranslateExtractMarker.marker('lang.cy');
    ngxTranslateExtractMarker.marker('lang.fy');
    ngxTranslateExtractMarker.marker('lang.wo');
    ngxTranslateExtractMarker.marker('lang.xh');
    ngxTranslateExtractMarker.marker('lang.yi');
    ngxTranslateExtractMarker.marker('lang.yo');
    ngxTranslateExtractMarker.marker('lang.zu');

    /**
     * @description
     * Given a translatable entity, returns the translation in the specified LanguageCode if
     * one exists.
     */
    function findTranslation(entity, languageCode) {
        return ((entity === null || entity === void 0 ? void 0 : entity.translations) || []).find(function (t) { return t.languageCode === languageCode; });
    }

    /**
     * When updating an entity which has translations, the value from the form will pertain to the current
     * languageCode. This function ensures that the "translations" array is correctly set based on the
     * existing languages and the updated values in the specified language.
     */
    function createUpdatedTranslatable(options) {
        var e_1, _a;
        var translatable = options.translatable, updatedFields = options.updatedFields, languageCode = options.languageCode, customFieldConfig = options.customFieldConfig, defaultTranslation = options.defaultTranslation;
        var currentTranslation = findTranslation(translatable, languageCode) || defaultTranslation || {};
        var index = translatable.translations.indexOf(currentTranslation);
        var newTranslation = patchObject(currentTranslation, updatedFields);
        var newCustomFields = {};
        var newTranslatedCustomFields = {};
        if (customFieldConfig && updatedFields.hasOwnProperty('customFields')) {
            try {
                for (var customFieldConfig_1 = __values(customFieldConfig), customFieldConfig_1_1 = customFieldConfig_1.next(); !customFieldConfig_1_1.done; customFieldConfig_1_1 = customFieldConfig_1.next()) {
                    var field = customFieldConfig_1_1.value;
                    var value = updatedFields.customFields[field.name];
                    if (field.type === 'localeString') {
                        newTranslatedCustomFields[field.name] = value;
                    }
                    else {
                        newCustomFields[field.name] =
                            value === '' ? getDefaultValue(field.type) : value;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (customFieldConfig_1_1 && !customFieldConfig_1_1.done && (_a = customFieldConfig_1.return)) _a.call(customFieldConfig_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            newTranslation.customFields = newTranslatedCustomFields;
        }
        var newTranslatable = Object.assign(Object.assign({}, patchObject(translatable, updatedFields)), { translations: translatable.translations.slice() });
        if (customFieldConfig) {
            newTranslatable.customFields = newCustomFields;
        }
        if (index !== -1) {
            newTranslatable.translations.splice(index, 1, newTranslation);
        }
        else {
            newTranslatable.translations.push(newTranslation);
        }
        return newTranslatable;
    }
    function getDefaultValue(type) {
        switch (type) {
            case 'localeString':
            case 'string':
                return '';
            case 'boolean':
                return false;
            case 'float':
            case 'int':
                return 0;
            case 'datetime':
                return new Date();
            case 'relation':
                return null;
            default:
                sharedUtils.assertNever(type);
        }
    }
    /**
     * Returns a shallow clone of `obj` with any properties contained in `patch` overwriting
     * those of `obj`.
     */
    function patchObject(obj, patch) {
        var clone = Object.assign({}, obj);
        Object.keys(clone).forEach(function (key) {
            if (patch.hasOwnProperty(key)) {
                clone[key] = patch[key];
            }
        });
        return clone;
    }

    // Auto-generated by the set-version.js script.
    var ADMIN_UI_VERSION = '1.0.0';

    /**
     * Responsible for registering dashboard widget components and querying for layouts.
     */
    var DashboardWidgetService = /** @class */ (function () {
        function DashboardWidgetService() {
            this.registry = new Map();
            this.layoutDef = [];
        }
        DashboardWidgetService.prototype.registerWidget = function (id, config) {
            if (this.registry.has(id)) {
                throw new Error("A dashboard widget with the id \"" + id + "\" already exists");
            }
            this.registry.set(id, config);
        };
        DashboardWidgetService.prototype.getAvailableIds = function (currentUserPermissions) {
            var hasAllPermissions = function (requiredPerms, userPerms) {
                return requiredPerms.every(function (p) { return userPerms.includes(p); });
            };
            return __spread(this.registry.entries()).filter(function (_b) {
                var _c = __read(_b, 2), id = _c[0], config = _c[1];
                return (!config.requiresPermissions ||
                    hasAllPermissions(config.requiresPermissions, currentUserPermissions));
            })
                .map(function (_b) {
                var _c = __read(_b, 1), id = _c[0];
                return id;
            });
        };
        DashboardWidgetService.prototype.getWidgetById = function (id) {
            if (!this.registry.has(id)) {
                throw new Error("No widget was found with the id \"" + id + "\"");
            }
            return this.registry.get(id);
        };
        DashboardWidgetService.prototype.setDefaultLayout = function (layout) {
            this.layoutDef = layout;
        };
        DashboardWidgetService.prototype.getDefaultLayout = function () {
            return this.layoutDef;
        };
        DashboardWidgetService.prototype.getWidgetLayout = function (layoutDef) {
            var _this = this;
            var intermediateLayout = (layoutDef || this.layoutDef)
                .map(function (_b) {
                var id = _b.id, width = _b.width;
                var config = _this.registry.get(id);
                if (!config) {
                    return _this.idNotFound(id);
                }
                return { id: id, config: config, width: _this.getValidWidth(id, config, width) };
            })
                .filter(sharedUtils.notNullOrUndefined);
            return this.buildLayout(intermediateLayout);
        };
        DashboardWidgetService.prototype.idNotFound = function (id) {
            // tslint:disable-next-line:no-console
            console.error("No dashboard widget was found with the id \"" + id + "\"\nAvailable ids: " + __spread(this.registry.keys()).map(function (_id) { return "\"" + _id + "\""; })
                .join(', '));
            return;
        };
        DashboardWidgetService.prototype.getValidWidth = function (id, config, targetWidth) {
            var _a;
            var adjustedWidth = targetWidth;
            var supportedWidths = ((_a = config.supportedWidths) === null || _a === void 0 ? void 0 : _a.length) ? config.supportedWidths
                : [3, 4, 6, 8, 12];
            if (!supportedWidths.includes(targetWidth)) {
                // Fall back to the largest supported width
                var sortedWidths = supportedWidths.sort(function (a, b) { return a - b; });
                var fallbackWidth = supportedWidths[sortedWidths.length - 1];
                // tslint:disable-next-line:no-console
                console.error("The \"" + id + "\" widget does not support the specified width (" + targetWidth + ").\nSupported widths are: [" + sortedWidths.join(', ') + "].\nUsing (" + fallbackWidth + ") instead.");
                adjustedWidth = fallbackWidth;
            }
            return adjustedWidth;
        };
        DashboardWidgetService.prototype.buildLayout = function (intermediateLayout) {
            var e_1, _b;
            var layout = [];
            var row = [];
            try {
                for (var intermediateLayout_1 = __values(intermediateLayout), intermediateLayout_1_1 = intermediateLayout_1.next(); !intermediateLayout_1_1.done; intermediateLayout_1_1 = intermediateLayout_1.next()) {
                    var _c = intermediateLayout_1_1.value, id = _c.id, config = _c.config, width = _c.width;
                    var rowSize = row.reduce(function (size, c) { return size + c.width; }, 0);
                    if (12 < rowSize + width) {
                        layout.push(row);
                        row = [];
                    }
                    row.push({ id: id, config: config, width: width });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (intermediateLayout_1_1 && !intermediateLayout_1_1.done && (_b = intermediateLayout_1.return)) _b.call(intermediateLayout_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            layout.push(row);
            return layout;
        };
        return DashboardWidgetService;
    }());
    DashboardWidgetService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DashboardWidgetService_Factory() { return new DashboardWidgetService(); }, token: DashboardWidgetService, providedIn: "root" });
    DashboardWidgetService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];

    /**
     * @description
     * Registers a dashboard widget. Once registered, the widget can be set as part of the default
     * (using {@link setDashboardWidgetLayout}).
     */
    function registerDashboardWidget(id, config) {
        return {
            provide: i0.APP_INITIALIZER,
            multi: true,
            useFactory: function (dashboardWidgetService) { return function () {
                dashboardWidgetService.registerWidget(id, config);
            }; },
            deps: [DashboardWidgetService],
        };
    }
    /**
     * @description
     * Sets the default widget layout for the Admin UI dashboard.
     */
    function setDashboardWidgetLayout(layoutDef) {
        return {
            provide: i0.APP_INITIALIZER,
            multi: true,
            useFactory: function (dashboardWidgetService) { return function () {
                dashboardWidgetService.setDefaultLayout(layoutDef);
            }; },
            deps: [DashboardWidgetService],
        };
    }

    /**
     * This guard prevents unauthorized users from accessing any routes which require
     * authorization.
     */
    var AuthGuard = /** @class */ (function () {
        function AuthGuard(router, authService) {
            this.router = router;
            this.authService = authService;
            this.externalLoginUrl = getAppConfig().loginUrl;
        }
        AuthGuard.prototype.canActivate = function (route) {
            var _this = this;
            return this.authService.checkAuthenticatedStatus().pipe(operators.tap(function (authenticated) {
                if (!authenticated) {
                    if (_this.externalLoginUrl) {
                        window.location.href = _this.externalLoginUrl;
                    }
                    else {
                        _this.router.navigate(['/login']);
                    }
                }
            }));
        };
        return AuthGuard;
    }());
    AuthGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(i0.ɵɵinject(i1$3.Router), i0.ɵɵinject(AuthService)); }, token: AuthGuard, providedIn: "root" });
    AuthGuard.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    AuthGuard.ctorParameters = function () { return [
        { type: i1$3.Router },
        { type: AuthService }
    ]; };

    var ExtensionHostConfig = /** @class */ (function () {
        function ExtensionHostConfig(options) {
            this.extensionUrl = options.extensionUrl;
            this.openInNewTab = options.openInNewTab != null ? options.openInNewTab : false;
        }
        return ExtensionHostConfig;
    }());

    /**
     * This function is used to conveniently configure a UI extension route to
     * host an external URL from the Admin UI using the {@link ExtensionHostComponent}
     *
     * @example
     * ```TypeScript
     * \@NgModule({
     *     imports: [
     *         RouterModule.forChild([
     *             hostExternalFrame({
     *                 path: '',
     *                 breadcrumbLabel: 'Vue.js App',
     *                 extensionUrl: './assets/vue-app/index.html',
     *                 openInNewTab: false,
     *             }),
     *         ]),
     *     ],
     * })
     export class VueUiExtensionModule {}
     * ```
     */
    function hostExternalFrame(options) {
        var pathMatch = options.path === '' ? 'full' : 'prefix';
        return {
            path: options.path,
            pathMatch: pathMatch,
            component: ExtensionHostComponent,
            data: {
                breadcrumb: [
                    {
                        label: options.breadcrumbLabel,
                        link: ['./'],
                    },
                ],
                extensionHostConfig: new ExtensionHostConfig(options),
            },
        };
    }

    // This file was generated by the build-public-api.ts script

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ADDRESS_FRAGMENT = ADDRESS_FRAGMENT;
    exports.ADD_CUSTOMERS_TO_GROUP = ADD_CUSTOMERS_TO_GROUP;
    exports.ADD_MANUAL_PAYMENT_TO_ORDER = ADD_MANUAL_PAYMENT_TO_ORDER;
    exports.ADD_MEMBERS_TO_ZONE = ADD_MEMBERS_TO_ZONE;
    exports.ADD_NOTE_TO_CUSTOMER = ADD_NOTE_TO_CUSTOMER;
    exports.ADD_NOTE_TO_ORDER = ADD_NOTE_TO_ORDER;
    exports.ADD_OPTION_GROUP_TO_PRODUCT = ADD_OPTION_GROUP_TO_PRODUCT;
    exports.ADD_OPTION_TO_GROUP = ADD_OPTION_TO_GROUP;
    exports.ADMINISTRATOR_FRAGMENT = ADMINISTRATOR_FRAGMENT;
    exports.ADMIN_UI_VERSION = ADMIN_UI_VERSION;
    exports.ALL_CUSTOM_FIELDS_FRAGMENT = ALL_CUSTOM_FIELDS_FRAGMENT;
    exports.ASSET_FRAGMENT = ASSET_FRAGMENT;
    exports.ASSIGN_PRODUCTS_TO_CHANNEL = ASSIGN_PRODUCTS_TO_CHANNEL;
    exports.ASSIGN_ROLE_TO_ADMINISTRATOR = ASSIGN_ROLE_TO_ADMINISTRATOR;
    exports.ASSIGN_VARIANTS_TO_CHANNEL = ASSIGN_VARIANTS_TO_CHANNEL;
    exports.ATTEMPT_LOGIN = ATTEMPT_LOGIN;
    exports.AUTH_REDIRECT_PARAM = AUTH_REDIRECT_PARAM;
    exports.ActionBarComponent = ActionBarComponent;
    exports.ActionBarItemsComponent = ActionBarItemsComponent;
    exports.ActionBarLeftComponent = ActionBarLeftComponent;
    exports.ActionBarRightComponent = ActionBarRightComponent;
    exports.AddressFormComponent = AddressFormComponent;
    exports.AdministratorDataService = AdministratorDataService;
    exports.AffixedInputComponent = AffixedInputComponent;
    exports.AppComponent = AppComponent;
    exports.AppComponentModule = AppComponentModule;
    exports.AppShellComponent = AppShellComponent;
    exports.AssetFileInputComponent = AssetFileInputComponent;
    exports.AssetGalleryComponent = AssetGalleryComponent;
    exports.AssetPickerDialogComponent = AssetPickerDialogComponent;
    exports.AssetPreviewComponent = AssetPreviewComponent;
    exports.AssetPreviewDialogComponent = AssetPreviewDialogComponent;
    exports.AssetPreviewPipe = AssetPreviewPipe;
    exports.AssetSearchInputComponent = AssetSearchInputComponent;
    exports.AuthDataService = AuthDataService;
    exports.AuthGuard = AuthGuard;
    exports.AuthService = AuthService;
    exports.BOOLEAN_CUSTOM_FIELD_FRAGMENT = BOOLEAN_CUSTOM_FIELD_FRAGMENT;
    exports.BaseDataService = BaseDataService;
    exports.BaseDetailComponent = BaseDetailComponent;
    exports.BaseEntityResolver = BaseEntityResolver;
    exports.BaseListComponent = BaseListComponent;
    exports.BooleanFormInputComponent = BooleanFormInputComponent;
    exports.BreadcrumbComponent = BreadcrumbComponent;
    exports.CANCEL_JOB = CANCEL_JOB;
    exports.CANCEL_ORDER = CANCEL_ORDER;
    exports.CHANNEL_FRAGMENT = CHANNEL_FRAGMENT;
    exports.COLLECTION_FRAGMENT = COLLECTION_FRAGMENT;
    exports.CONFIGURABLE_OPERATION_DEF_FRAGMENT = CONFIGURABLE_OPERATION_DEF_FRAGMENT;
    exports.CONFIGURABLE_OPERATION_FRAGMENT = CONFIGURABLE_OPERATION_FRAGMENT;
    exports.COUNTRY_FRAGMENT = COUNTRY_FRAGMENT;
    exports.CREATE_ADMINISTRATOR = CREATE_ADMINISTRATOR;
    exports.CREATE_ASSETS = CREATE_ASSETS;
    exports.CREATE_CHANNEL = CREATE_CHANNEL;
    exports.CREATE_COLLECTION = CREATE_COLLECTION;
    exports.CREATE_COUNTRY = CREATE_COUNTRY;
    exports.CREATE_CUSTOMER = CREATE_CUSTOMER;
    exports.CREATE_CUSTOMER_ADDRESS = CREATE_CUSTOMER_ADDRESS;
    exports.CREATE_CUSTOMER_GROUP = CREATE_CUSTOMER_GROUP;
    exports.CREATE_FACET = CREATE_FACET;
    exports.CREATE_FACET_VALUES = CREATE_FACET_VALUES;
    exports.CREATE_FULFILLMENT = CREATE_FULFILLMENT;
    exports.CREATE_PAYMENT_METHOD = CREATE_PAYMENT_METHOD;
    exports.CREATE_PRODUCT = CREATE_PRODUCT;
    exports.CREATE_PRODUCT_OPTION_GROUP = CREATE_PRODUCT_OPTION_GROUP;
    exports.CREATE_PRODUCT_VARIANTS = CREATE_PRODUCT_VARIANTS;
    exports.CREATE_PROMOTION = CREATE_PROMOTION;
    exports.CREATE_ROLE = CREATE_ROLE;
    exports.CREATE_SHIPPING_METHOD = CREATE_SHIPPING_METHOD;
    exports.CREATE_TAG = CREATE_TAG;
    exports.CREATE_TAX_CATEGORY = CREATE_TAX_CATEGORY;
    exports.CREATE_TAX_RATE = CREATE_TAX_RATE;
    exports.CREATE_ZONE = CREATE_ZONE;
    exports.CURRENT_USER_FRAGMENT = CURRENT_USER_FRAGMENT;
    exports.CUSTOMER_FRAGMENT = CUSTOMER_FRAGMENT;
    exports.CUSTOM_FIELD_CONFIG_FRAGMENT = CUSTOM_FIELD_CONFIG_FRAGMENT;
    exports.CanDeactivateDetailGuard = CanDeactivateDetailGuard;
    exports.ChannelAssignmentControlComponent = ChannelAssignmentControlComponent;
    exports.ChannelBadgeComponent = ChannelBadgeComponent;
    exports.ChannelLabelPipe = ChannelLabelPipe;
    exports.ChannelSwitcherComponent = ChannelSwitcherComponent;
    exports.CheckJobsLink = CheckJobsLink;
    exports.ChipComponent = ChipComponent;
    exports.ClientDataService = ClientDataService;
    exports.CollectionDataService = CollectionDataService;
    exports.ComponentRegistryService = ComponentRegistryService;
    exports.ConfigurableInputComponent = ConfigurableInputComponent;
    exports.CoreModule = CoreModule;
    exports.CurrencyFormInputComponent = CurrencyFormInputComponent;
    exports.CurrencyInputComponent = CurrencyInputComponent;
    exports.CustomFieldComponentService = CustomFieldComponentService;
    exports.CustomFieldControlComponent = CustomFieldControlComponent;
    exports.CustomFieldLabelPipe = CustomFieldLabelPipe;
    exports.CustomHttpTranslationLoader = CustomHttpTranslationLoader;
    exports.CustomerDataService = CustomerDataService;
    exports.CustomerGroupFormInputComponent = CustomerGroupFormInputComponent;
    exports.CustomerLabelComponent = CustomerLabelComponent;
    exports.DATE_TIME_CUSTOM_FIELD_FRAGMENT = DATE_TIME_CUSTOM_FIELD_FRAGMENT;
    exports.DELETE_ADMINISTRATOR = DELETE_ADMINISTRATOR;
    exports.DELETE_ASSETS = DELETE_ASSETS;
    exports.DELETE_CHANNEL = DELETE_CHANNEL;
    exports.DELETE_COLLECTION = DELETE_COLLECTION;
    exports.DELETE_COUNTRY = DELETE_COUNTRY;
    exports.DELETE_CUSTOMER = DELETE_CUSTOMER;
    exports.DELETE_CUSTOMER_GROUP = DELETE_CUSTOMER_GROUP;
    exports.DELETE_CUSTOMER_NOTE = DELETE_CUSTOMER_NOTE;
    exports.DELETE_FACET = DELETE_FACET;
    exports.DELETE_FACET_VALUES = DELETE_FACET_VALUES;
    exports.DELETE_ORDER_NOTE = DELETE_ORDER_NOTE;
    exports.DELETE_PAYMENT_METHOD = DELETE_PAYMENT_METHOD;
    exports.DELETE_PRODUCT = DELETE_PRODUCT;
    exports.DELETE_PRODUCT_VARIANT = DELETE_PRODUCT_VARIANT;
    exports.DELETE_PROMOTION = DELETE_PROMOTION;
    exports.DELETE_ROLE = DELETE_ROLE;
    exports.DELETE_SHIPPING_METHOD = DELETE_SHIPPING_METHOD;
    exports.DELETE_TAG = DELETE_TAG;
    exports.DELETE_TAX_CATEGORY = DELETE_TAX_CATEGORY;
    exports.DELETE_TAX_RATE = DELETE_TAX_RATE;
    exports.DELETE_ZONE = DELETE_ZONE;
    exports.DISCOUNT_FRAGMENT = DISCOUNT_FRAGMENT;
    exports.DashboardWidgetService = DashboardWidgetService;
    exports.DataModule = DataModule;
    exports.DataService = DataService;
    exports.DataTableColumnComponent = DataTableColumnComponent;
    exports.DataTableComponent = DataTableComponent;
    exports.DateFormInputComponent = DateFormInputComponent;
    exports.DatetimePickerComponent = DatetimePickerComponent;
    exports.DatetimePickerService = DatetimePickerService;
    exports.DefaultInterceptor = DefaultInterceptor;
    exports.DialogButtonsDirective = DialogButtonsDirective;
    exports.DialogComponentOutletComponent = DialogComponentOutletComponent;
    exports.DialogTitleDirective = DialogTitleDirective;
    exports.DisabledDirective = DisabledDirective;
    exports.DropdownComponent = DropdownComponent;
    exports.DropdownItemDirective = DropdownItemDirective;
    exports.DropdownMenuComponent = DropdownMenuComponent;
    exports.DropdownTriggerDirective = DropdownTriggerDirective;
    exports.DurationPipe = DurationPipe;
    exports.DynamicFormInputComponent = DynamicFormInputComponent;
    exports.ERROR_RESULT_FRAGMENT = ERROR_RESULT_FRAGMENT;
    exports.EditNoteDialogComponent = EditNoteDialogComponent;
    exports.EmptyPlaceholderComponent = EmptyPlaceholderComponent;
    exports.EntityInfoComponent = EntityInfoComponent;
    exports.ExtensionHostComponent = ExtensionHostComponent;
    exports.ExtensionHostConfig = ExtensionHostConfig;
    exports.ExtensionHostService = ExtensionHostService;
    exports.ExternalImageDialogComponent = ExternalImageDialogComponent;
    exports.FACET_VALUE_FRAGMENT = FACET_VALUE_FRAGMENT;
    exports.FACET_WITH_VALUES_FRAGMENT = FACET_WITH_VALUES_FRAGMENT;
    exports.FLOAT_CUSTOM_FIELD_FRAGMENT = FLOAT_CUSTOM_FIELD_FRAGMENT;
    exports.FULFILLMENT_FRAGMENT = FULFILLMENT_FRAGMENT;
    exports.FacetDataService = FacetDataService;
    exports.FacetValueChipComponent = FacetValueChipComponent;
    exports.FacetValueFormInputComponent = FacetValueFormInputComponent;
    exports.FacetValueSelectorComponent = FacetValueSelectorComponent;
    exports.FetchAdapter = FetchAdapter;
    exports.FileSizePipe = FileSizePipe;
    exports.FocalPointControlComponent = FocalPointControlComponent;
    exports.FormFieldComponent = FormFieldComponent;
    exports.FormFieldControlDirective = FormFieldControlDirective;
    exports.FormItemComponent = FormItemComponent;
    exports.FormattedAddressComponent = FormattedAddressComponent;
    exports.GET_ACTIVE_ADMINISTRATOR = GET_ACTIVE_ADMINISTRATOR;
    exports.GET_ACTIVE_CHANNEL = GET_ACTIVE_CHANNEL;
    exports.GET_ADJUSTMENT_OPERATIONS = GET_ADJUSTMENT_OPERATIONS;
    exports.GET_ADMINISTRATOR = GET_ADMINISTRATOR;
    exports.GET_ADMINISTRATORS = GET_ADMINISTRATORS;
    exports.GET_ASSET = GET_ASSET;
    exports.GET_ASSET_LIST = GET_ASSET_LIST;
    exports.GET_AVAILABLE_COUNTRIES = GET_AVAILABLE_COUNTRIES;
    exports.GET_CHANNEL = GET_CHANNEL;
    exports.GET_CHANNELS = GET_CHANNELS;
    exports.GET_CLIENT_STATE = GET_CLIENT_STATE;
    exports.GET_COLLECTION = GET_COLLECTION;
    exports.GET_COLLECTION_CONTENTS = GET_COLLECTION_CONTENTS;
    exports.GET_COLLECTION_FILTERS = GET_COLLECTION_FILTERS;
    exports.GET_COLLECTION_LIST = GET_COLLECTION_LIST;
    exports.GET_COUNTRY = GET_COUNTRY;
    exports.GET_COUNTRY_LIST = GET_COUNTRY_LIST;
    exports.GET_CURRENT_USER = GET_CURRENT_USER;
    exports.GET_CUSTOMER = GET_CUSTOMER;
    exports.GET_CUSTOMER_GROUPS = GET_CUSTOMER_GROUPS;
    exports.GET_CUSTOMER_GROUP_WITH_CUSTOMERS = GET_CUSTOMER_GROUP_WITH_CUSTOMERS;
    exports.GET_CUSTOMER_HISTORY = GET_CUSTOMER_HISTORY;
    exports.GET_CUSTOMER_LIST = GET_CUSTOMER_LIST;
    exports.GET_FACET_LIST = GET_FACET_LIST;
    exports.GET_FACET_WITH_VALUES = GET_FACET_WITH_VALUES;
    exports.GET_GLOBAL_SETTINGS = GET_GLOBAL_SETTINGS;
    exports.GET_JOBS_BY_ID = GET_JOBS_BY_ID;
    exports.GET_JOBS_LIST = GET_JOBS_LIST;
    exports.GET_JOB_INFO = GET_JOB_INFO;
    exports.GET_JOB_QUEUE_LIST = GET_JOB_QUEUE_LIST;
    exports.GET_NEWTORK_STATUS = GET_NEWTORK_STATUS;
    exports.GET_ORDER = GET_ORDER;
    exports.GET_ORDERS_LIST = GET_ORDERS_LIST;
    exports.GET_ORDER_HISTORY = GET_ORDER_HISTORY;
    exports.GET_ORDER_SUMMARY = GET_ORDER_SUMMARY;
    exports.GET_PAYMENT_METHOD = GET_PAYMENT_METHOD;
    exports.GET_PAYMENT_METHOD_LIST = GET_PAYMENT_METHOD_LIST;
    exports.GET_PAYMENT_METHOD_OPERATIONS = GET_PAYMENT_METHOD_OPERATIONS;
    exports.GET_PRODUCT_LIST = GET_PRODUCT_LIST;
    exports.GET_PRODUCT_OPTION_GROUP = GET_PRODUCT_OPTION_GROUP;
    exports.GET_PRODUCT_OPTION_GROUPS = GET_PRODUCT_OPTION_GROUPS;
    exports.GET_PRODUCT_SIMPLE = GET_PRODUCT_SIMPLE;
    exports.GET_PRODUCT_VARIANT = GET_PRODUCT_VARIANT;
    exports.GET_PRODUCT_VARIANT_LIST = GET_PRODUCT_VARIANT_LIST;
    exports.GET_PRODUCT_VARIANT_OPTIONS = GET_PRODUCT_VARIANT_OPTIONS;
    exports.GET_PRODUCT_WITH_VARIANTS = GET_PRODUCT_WITH_VARIANTS;
    exports.GET_PROMOTION = GET_PROMOTION;
    exports.GET_PROMOTION_LIST = GET_PROMOTION_LIST;
    exports.GET_ROLE = GET_ROLE;
    exports.GET_ROLES = GET_ROLES;
    exports.GET_SERVER_CONFIG = GET_SERVER_CONFIG;
    exports.GET_SHIPPING_METHOD = GET_SHIPPING_METHOD;
    exports.GET_SHIPPING_METHOD_LIST = GET_SHIPPING_METHOD_LIST;
    exports.GET_SHIPPING_METHOD_OPERATIONS = GET_SHIPPING_METHOD_OPERATIONS;
    exports.GET_TAG = GET_TAG;
    exports.GET_TAG_LIST = GET_TAG_LIST;
    exports.GET_TAX_CATEGORIES = GET_TAX_CATEGORIES;
    exports.GET_TAX_CATEGORY = GET_TAX_CATEGORY;
    exports.GET_TAX_RATE = GET_TAX_RATE;
    exports.GET_TAX_RATE_LIST = GET_TAX_RATE_LIST;
    exports.GET_UI_STATE = GET_UI_STATE;
    exports.GET_USER_STATUS = GET_USER_STATUS;
    exports.GET_ZONE = GET_ZONE;
    exports.GET_ZONES = GET_ZONES;
    exports.GLOBAL_SETTINGS_FRAGMENT = GLOBAL_SETTINGS_FRAGMENT;
    exports.HasPermissionPipe = HasPermissionPipe;
    exports.HealthCheckService = HealthCheckService;
    exports.HelpTooltipComponent = HelpTooltipComponent;
    exports.HistoryEntryDetailComponent = HistoryEntryDetailComponent;
    exports.HttpLoaderFactory = HttpLoaderFactory;
    exports.I18nService = I18nService;
    exports.INT_CUSTOM_FIELD_FRAGMENT = INT_CUSTOM_FIELD_FRAGMENT;
    exports.IfDefaultChannelActiveDirective = IfDefaultChannelActiveDirective;
    exports.IfDirectiveBase = IfDirectiveBase;
    exports.IfMultichannelDirective = IfMultichannelDirective;
    exports.IfPermissionsDirective = IfPermissionsDirective;
    exports.InjectableTranslateMessageFormatCompiler = InjectableTranslateMessageFormatCompiler;
    exports.ItemsPerPageControlsComponent = ItemsPerPageControlsComponent;
    exports.JOB_INFO_FRAGMENT = JOB_INFO_FRAGMENT;
    exports.JobQueueService = JobQueueService;
    exports.LOCALE_STRING_CUSTOM_FIELD_FRAGMENT = LOCALE_STRING_CUSTOM_FIELD_FRAGMENT;
    exports.LOG_OUT = LOG_OUT;
    exports.LabeledDataComponent = LabeledDataComponent;
    exports.LanguageSelectorComponent = LanguageSelectorComponent;
    exports.LinkDialogComponent = LinkDialogComponent;
    exports.LocalStorageService = LocalStorageService;
    exports.LocaleBasePipe = LocaleBasePipe;
    exports.LocaleCurrencyNamePipe = LocaleCurrencyNamePipe;
    exports.LocaleCurrencyPipe = LocaleCurrencyPipe;
    exports.LocaleDatePipe = LocaleDatePipe;
    exports.MODIFY_ORDER = MODIFY_ORDER;
    exports.MOVE_COLLECTION = MOVE_COLLECTION;
    exports.MainNavComponent = MainNavComponent;
    exports.ManageTagsDialogComponent = ManageTagsDialogComponent;
    exports.ModalDialogComponent = ModalDialogComponent;
    exports.ModalService = ModalService;
    exports.NavBuilderService = NavBuilderService;
    exports.NotificationComponent = NotificationComponent;
    exports.NotificationService = NotificationService;
    exports.NumberFormInputComponent = NumberFormInputComponent;
    exports.ORDER_ADDRESS_FRAGMENT = ORDER_ADDRESS_FRAGMENT;
    exports.ORDER_DETAIL_FRAGMENT = ORDER_DETAIL_FRAGMENT;
    exports.ORDER_FRAGMENT = ORDER_FRAGMENT;
    exports.ORDER_LINE_FRAGMENT = ORDER_LINE_FRAGMENT;
    exports.ObjectTreeComponent = ObjectTreeComponent;
    exports.OmitTypenameLink = OmitTypenameLink;
    exports.OrderDataService = OrderDataService;
    exports.OrderStateLabelComponent = OrderStateLabelComponent;
    exports.OverlayHostComponent = OverlayHostComponent;
    exports.OverlayHostService = OverlayHostService;
    exports.PAYMENT_METHOD_FRAGMENT = PAYMENT_METHOD_FRAGMENT;
    exports.PRODUCT_OPTION_FRAGMENT = PRODUCT_OPTION_FRAGMENT;
    exports.PRODUCT_OPTION_GROUP_FRAGMENT = PRODUCT_OPTION_GROUP_FRAGMENT;
    exports.PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT = PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT;
    exports.PRODUCT_SELECTOR_SEARCH = PRODUCT_SELECTOR_SEARCH;
    exports.PRODUCT_VARIANT_FRAGMENT = PRODUCT_VARIANT_FRAGMENT;
    exports.PRODUCT_WITH_VARIANTS_FRAGMENT = PRODUCT_WITH_VARIANTS_FRAGMENT;
    exports.PROMOTION_FRAGMENT = PROMOTION_FRAGMENT;
    exports.PaginationControlsComponent = PaginationControlsComponent;
    exports.PasswordFormInputComponent = PasswordFormInputComponent;
    exports.PercentageSuffixInputComponent = PercentageSuffixInputComponent;
    exports.ProductDataService = ProductDataService;
    exports.ProductSelectorComponent = ProductSelectorComponent;
    exports.ProductSelectorFormInputComponent = ProductSelectorFormInputComponent;
    exports.PromotionDataService = PromotionDataService;
    exports.ProsemirrorService = ProsemirrorService;
    exports.QueryResult = QueryResult;
    exports.REFUND_FRAGMENT = REFUND_FRAGMENT;
    exports.REFUND_ORDER = REFUND_ORDER;
    exports.REINDEX = REINDEX;
    exports.RELATION_CUSTOM_FIELD_FRAGMENT = RELATION_CUSTOM_FIELD_FRAGMENT;
    exports.REMOVE_CUSTOMERS_FROM_GROUP = REMOVE_CUSTOMERS_FROM_GROUP;
    exports.REMOVE_MEMBERS_FROM_ZONE = REMOVE_MEMBERS_FROM_ZONE;
    exports.REMOVE_OPTION_GROUP_FROM_PRODUCT = REMOVE_OPTION_GROUP_FROM_PRODUCT;
    exports.REMOVE_PRODUCTS_FROM_CHANNEL = REMOVE_PRODUCTS_FROM_CHANNEL;
    exports.REMOVE_VARIANTS_FROM_CHANNEL = REMOVE_VARIANTS_FROM_CHANNEL;
    exports.REQUEST_COMPLETED = REQUEST_COMPLETED;
    exports.REQUEST_STARTED = REQUEST_STARTED;
    exports.ROLE_FRAGMENT = ROLE_FRAGMENT;
    exports.RelationAssetInputComponent = RelationAssetInputComponent;
    exports.RelationCardComponent = RelationCardComponent;
    exports.RelationCardDetailDirective = RelationCardDetailDirective;
    exports.RelationCardPreviewDirective = RelationCardPreviewDirective;
    exports.RelationCustomerInputComponent = RelationCustomerInputComponent;
    exports.RelationFormInputComponent = RelationFormInputComponent;
    exports.RelationProductInputComponent = RelationProductInputComponent;
    exports.RelationProductVariantInputComponent = RelationProductVariantInputComponent;
    exports.RelationSelectorDialogComponent = RelationSelectorDialogComponent;
    exports.RichTextEditorComponent = RichTextEditorComponent;
    exports.SEARCH_PRODUCTS = SEARCH_PRODUCTS;
    exports.SETTLE_PAYMENT = SETTLE_PAYMENT;
    exports.SETTLE_REFUND = SETTLE_REFUND;
    exports.SET_ACTIVE_CHANNEL = SET_ACTIVE_CHANNEL;
    exports.SET_AS_LOGGED_IN = SET_AS_LOGGED_IN;
    exports.SET_AS_LOGGED_OUT = SET_AS_LOGGED_OUT;
    exports.SET_UI_LANGUAGE = SET_UI_LANGUAGE;
    exports.SET_UI_THEME = SET_UI_THEME;
    exports.SHIPPING_METHOD_FRAGMENT = SHIPPING_METHOD_FRAGMENT;
    exports.STRING_CUSTOM_FIELD_FRAGMENT = STRING_CUSTOM_FIELD_FRAGMENT;
    exports.SelectFormInputComponent = SelectFormInputComponent;
    exports.SelectToggleComponent = SelectToggleComponent;
    exports.SentenceCasePipe = SentenceCasePipe;
    exports.ServerConfigService = ServerConfigService;
    exports.SettingsDataService = SettingsDataService;
    exports.SharedModule = SharedModule;
    exports.ShippingMethodDataService = ShippingMethodDataService;
    exports.SimpleDialogComponent = SimpleDialogComponent;
    exports.SingleSearchSelectionModel = SingleSearchSelectionModel;
    exports.SingleSearchSelectionModelFactory = SingleSearchSelectionModelFactory;
    exports.SortPipe = SortPipe;
    exports.StateI18nTokenPipe = StateI18nTokenPipe;
    exports.StringToColorPipe = StringToColorPipe;
    exports.TAG_FRAGMENT = TAG_FRAGMENT;
    exports.TAX_CATEGORY_FRAGMENT = TAX_CATEGORY_FRAGMENT;
    exports.TAX_RATE_FRAGMENT = TAX_RATE_FRAGMENT;
    exports.TEST_ELIGIBLE_SHIPPING_METHODS = TEST_ELIGIBLE_SHIPPING_METHODS;
    exports.TEST_SHIPPING_METHOD = TEST_SHIPPING_METHOD;
    exports.TRANSITION_FULFILLMENT_TO_STATE = TRANSITION_FULFILLMENT_TO_STATE;
    exports.TRANSITION_ORDER_TO_STATE = TRANSITION_ORDER_TO_STATE;
    exports.TRANSITION_PAYMENT_TO_STATE = TRANSITION_PAYMENT_TO_STATE;
    exports.TableRowActionComponent = TableRowActionComponent;
    exports.TagSelectorComponent = TagSelectorComponent;
    exports.TextFormInputComponent = TextFormInputComponent;
    exports.ThemeSwitcherComponent = ThemeSwitcherComponent;
    exports.TimeAgoPipe = TimeAgoPipe;
    exports.TimelineEntryComponent = TimelineEntryComponent;
    exports.TitleInputComponent = TitleInputComponent;
    exports.UPDATE_ACTIVE_ADMINISTRATOR = UPDATE_ACTIVE_ADMINISTRATOR;
    exports.UPDATE_ADMINISTRATOR = UPDATE_ADMINISTRATOR;
    exports.UPDATE_ASSET = UPDATE_ASSET;
    exports.UPDATE_CHANNEL = UPDATE_CHANNEL;
    exports.UPDATE_COLLECTION = UPDATE_COLLECTION;
    exports.UPDATE_COUNTRY = UPDATE_COUNTRY;
    exports.UPDATE_CUSTOMER = UPDATE_CUSTOMER;
    exports.UPDATE_CUSTOMER_ADDRESS = UPDATE_CUSTOMER_ADDRESS;
    exports.UPDATE_CUSTOMER_GROUP = UPDATE_CUSTOMER_GROUP;
    exports.UPDATE_CUSTOMER_NOTE = UPDATE_CUSTOMER_NOTE;
    exports.UPDATE_FACET = UPDATE_FACET;
    exports.UPDATE_FACET_VALUES = UPDATE_FACET_VALUES;
    exports.UPDATE_GLOBAL_SETTINGS = UPDATE_GLOBAL_SETTINGS;
    exports.UPDATE_ORDER_CUSTOM_FIELDS = UPDATE_ORDER_CUSTOM_FIELDS;
    exports.UPDATE_ORDER_NOTE = UPDATE_ORDER_NOTE;
    exports.UPDATE_PAYMENT_METHOD = UPDATE_PAYMENT_METHOD;
    exports.UPDATE_PRODUCT = UPDATE_PRODUCT;
    exports.UPDATE_PRODUCT_OPTION = UPDATE_PRODUCT_OPTION;
    exports.UPDATE_PRODUCT_VARIANTS = UPDATE_PRODUCT_VARIANTS;
    exports.UPDATE_PROMOTION = UPDATE_PROMOTION;
    exports.UPDATE_ROLE = UPDATE_ROLE;
    exports.UPDATE_SHIPPING_METHOD = UPDATE_SHIPPING_METHOD;
    exports.UPDATE_TAG = UPDATE_TAG;
    exports.UPDATE_TAX_CATEGORY = UPDATE_TAX_CATEGORY;
    exports.UPDATE_TAX_RATE = UPDATE_TAX_RATE;
    exports.UPDATE_USER_CHANNELS = UPDATE_USER_CHANNELS;
    exports.UPDATE_ZONE = UPDATE_ZONE;
    exports.USER_STATUS_FRAGMENT = USER_STATUS_FRAGMENT;
    exports.UiLanguageSwitcherDialogComponent = UiLanguageSwitcherDialogComponent;
    exports.UserMenuComponent = UserMenuComponent;
    exports.ZONE_FRAGMENT = ZONE_FRAGMENT;
    exports.addActionBarItem = addActionBarItem;
    exports.addCustomFields = addCustomFields;
    exports.addNavMenuItem = addNavMenuItem;
    exports.addNavMenuSection = addNavMenuSection;
    exports.blockQuoteRule = blockQuoteRule;
    exports.buildInputRules = buildInputRules;
    exports.buildKeymap = buildKeymap;
    exports.buildMenuItems = buildMenuItems;
    exports.bulletListRule = bulletListRule;
    exports.canInsert = canInsert;
    exports.clientResolvers = clientResolvers;
    exports.codeBlockRule = codeBlockRule;
    exports.configurableDefinitionToInstance = configurableDefinitionToInstance;
    exports.configurableOperationValueIsValid = configurableOperationValueIsValid;
    exports.createApollo = createApollo;
    exports.createResolveData = createResolveData;
    exports.createUpdatedTranslatable = createUpdatedTranslatable;
    exports.dayOfWeekIndex = dayOfWeekIndex;
    exports.defaultFormInputs = defaultFormInputs;
    exports.detailBreadcrumb = detailBreadcrumb;
    exports.encodeConfigArgValue = encodeConfigArgValue;
    exports.findTranslation = findTranslation;
    exports.flattenFacetValues = flattenFacetValues;
    exports.getAppConfig = getAppConfig;
    exports.getClientDefaults = getClientDefaults;
    exports.getConfigArgValue = getConfigArgValue;
    exports.getDefaultConfigArgValue = getDefaultConfigArgValue;
    exports.getDefaultUiLanguage = getDefaultUiLanguage;
    exports.getLocales = getLocales;
    exports.getMarkRange = getMarkRange;
    exports.getServerLocation = getServerLocation;
    exports.headingRule = headingRule;
    exports.hostExternalFrame = hostExternalFrame;
    exports.initializeServerConfigService = initializeServerConfigService;
    exports.insertImageItem = insertImageItem;
    exports.interpolateDescription = interpolateDescription;
    exports.introspectionResult = result;
    exports.isEntityCreateOrUpdateMutation = isEntityCreateOrUpdateMutation;
    exports.linkItem = linkItem;
    exports.linkSelectPlugin = linkSelectPlugin;
    exports.loadAppConfig = loadAppConfig;
    exports.markActive = markActive;
    exports.orderedListRule = orderedListRule;
    exports.registerCustomFieldComponent = registerCustomFieldComponent;
    exports.registerDashboardWidget = registerDashboardWidget;
    exports.registerDefaultFormInputs = registerDefaultFormInputs;
    exports.registerFormInputComponent = registerFormInputComponent;
    exports.removeReadonlyCustomFields = removeReadonlyCustomFields;
    exports.setDashboardWidgetLayout = setDashboardWidgetLayout;
    exports.stringToColor = stringToColor;
    exports.toConfigurableOperationInput = toConfigurableOperationInput;
    exports.transformRelationCustomFieldInputs = transformRelationCustomFieldInputs;
    exports.weekDayNames = weekDayNames;
    exports.ɵ0 = ɵ0$2;
    exports.ɵ1 = ɵ1;
    exports.ɵ2 = ɵ2;
    exports.ɵ3 = ɵ3;
    exports.ɵ4 = ɵ4;
    exports.ɵ5 = ɵ5;
    exports.ɵ6 = ɵ6;
    exports.ɵ7 = ɵ7;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vendure-admin-ui-core.umd.js.map
