(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/router'), require('@biesbjerg/ngx-translate-extract-marker'), require('@vendure/admin-ui/core'), require('rxjs/operators'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@vendure/admin-ui/marketing', ['exports', '@angular/core', '@angular/forms', '@angular/router', '@biesbjerg/ngx-translate-extract-marker', '@vendure/admin-ui/core', 'rxjs/operators', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vendure = global.vendure || {}, global.vendure['admin-ui'] = global.vendure['admin-ui'] || {}, global.vendure['admin-ui'].marketing = {}), global.ng.core, global.ng.forms, global.ng.router, global.ngxTranslateExtractMarker, global.vendure['admin-ui'].core, global.rxjs.operators, global.rxjs));
}(this, (function (exports, i0, forms, i1, ngxTranslateExtractMarker, i2, operators, rxjs) { 'use strict';

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

    var PromotionDetailComponent = /** @class */ (function (_super) {
        __extends(PromotionDetailComponent, _super);
        function PromotionDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.conditions = [];
            _this.actions = [];
            _this.allConditions = [];
            _this.allActions = [];
            _this.detailForm = _this.formBuilder.group({
                name: ['', forms.Validators.required],
                enabled: true,
                couponCode: null,
                perCustomerUsageLimit: null,
                startsAt: null,
                endsAt: null,
                conditions: _this.formBuilder.array([]),
                actions: _this.formBuilder.array([]),
            });
            return _this;
        }
        PromotionDetailComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            this.promotion$ = this.entity$;
            this.dataService.promotion.getPromotionActionsAndConditions().single$.subscribe(function (data) {
                _this.allActions = data.promotionActions;
                _this.allConditions = data.promotionConditions;
                _this.changeDetector.markForCheck();
            });
        };
        PromotionDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        PromotionDetailComponent.prototype.getAvailableConditions = function () {
            var _this = this;
            return this.allConditions.filter(function (o) { return !_this.conditions.find(function (c) { return c.code === o.code; }); });
        };
        PromotionDetailComponent.prototype.getConditionDefinition = function (condition) {
            return this.allConditions.find(function (c) { return c.code === condition.code; });
        };
        PromotionDetailComponent.prototype.getAvailableActions = function () {
            var _this = this;
            return this.allActions.filter(function (o) { return !_this.actions.find(function (a) { return a.code === o.code; }); });
        };
        PromotionDetailComponent.prototype.getActionDefinition = function (action) {
            return this.allActions.find(function (c) { return c.code === action.code; });
        };
        PromotionDetailComponent.prototype.saveButtonEnabled = function () {
            return (this.detailForm.dirty &&
                this.detailForm.valid &&
                (this.conditions.length !== 0 || this.detailForm.value.couponCode) &&
                this.actions.length !== 0);
        };
        PromotionDetailComponent.prototype.addCondition = function (condition) {
            this.addOperation('conditions', condition);
            this.detailForm.markAsDirty();
        };
        PromotionDetailComponent.prototype.addAction = function (action) {
            this.addOperation('actions', action);
            this.detailForm.markAsDirty();
        };
        PromotionDetailComponent.prototype.removeCondition = function (condition) {
            this.removeOperation('conditions', condition);
            this.detailForm.markAsDirty();
        };
        PromotionDetailComponent.prototype.removeAction = function (action) {
            this.removeOperation('actions', action);
            this.detailForm.markAsDirty();
        };
        PromotionDetailComponent.prototype.formArrayOf = function (key) {
            return this.detailForm.get(key);
        };
        PromotionDetailComponent.prototype.create = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            var formValue = this.detailForm.value;
            var input = {
                name: formValue.name,
                enabled: true,
                couponCode: formValue.couponCode,
                perCustomerUsageLimit: formValue.perCustomerUsageLimit,
                startsAt: formValue.startsAt,
                endsAt: formValue.endsAt,
                conditions: this.mapOperationsToInputs(this.conditions, formValue.conditions),
                actions: this.mapOperationsToInputs(this.actions, formValue.actions),
            };
            this.dataService.promotion.createPromotion(input).subscribe(function (_b) {
                var createPromotion = _b.createPromotion;
                switch (createPromotion.__typename) {
                    case 'Promotion':
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                            entity: 'Promotion',
                        });
                        _this.detailForm.markAsPristine();
                        _this.changeDetector.markForCheck();
                        _this.router.navigate(['../', createPromotion.id], { relativeTo: _this.route });
                        break;
                    case 'MissingConditionsError':
                        _this.notificationService.error(createPromotion.message);
                        break;
                }
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Promotion',
                });
            });
        };
        PromotionDetailComponent.prototype.save = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            var formValue = this.detailForm.value;
            this.promotion$
                .pipe(operators.take(1), operators.mergeMap(function (promotion) {
                var input = {
                    id: promotion.id,
                    name: formValue.name,
                    enabled: formValue.enabled,
                    couponCode: formValue.couponCode,
                    perCustomerUsageLimit: formValue.perCustomerUsageLimit,
                    startsAt: formValue.startsAt,
                    endsAt: formValue.endsAt,
                    conditions: _this.mapOperationsToInputs(_this.conditions, formValue.conditions),
                    actions: _this.mapOperationsToInputs(_this.actions, formValue.actions),
                };
                return _this.dataService.promotion.updatePromotion(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'Promotion',
                });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Promotion',
                });
            });
        };
        /**
         * Update the form values when the entity changes.
         */
        PromotionDetailComponent.prototype.setFormValues = function (entity, languageCode) {
            var _this = this;
            this.detailForm.patchValue({
                name: entity.name,
                enabled: entity.enabled,
                couponCode: entity.couponCode,
                perCustomerUsageLimit: entity.perCustomerUsageLimit,
                startsAt: entity.startsAt,
                endsAt: entity.endsAt,
            });
            entity.conditions.forEach(function (o) {
                _this.addOperation('conditions', o);
            });
            entity.actions.forEach(function (o) { return _this.addOperation('actions', o); });
        };
        /**
         * Maps an array of conditions or actions to the input format expected by the GraphQL API.
         */
        PromotionDetailComponent.prototype.mapOperationsToInputs = function (operations, formValueOperations) {
            return operations.map(function (o, i) {
                return {
                    code: o.code,
                    arguments: Object.values(formValueOperations[i].args).map(function (value, j) { return ({
                        name: o.args[j].name,
                        value: i2.encodeConfigArgValue(value),
                    }); }),
                };
            });
        };
        /**
         * Adds a new condition or action to the promotion.
         */
        PromotionDetailComponent.prototype.addOperation = function (key, operation) {
            var _this = this;
            var operationsArray = this.formArrayOf(key);
            var collection = key === 'conditions' ? this.conditions : this.actions;
            var index = operationsArray.value.findIndex(function (o) { return o.code === operation.code; });
            if (index === -1) {
                var argsHash = operation.args.reduce(function (output, arg) {
                    var _b;
                    var _a;
                    return (Object.assign(Object.assign({}, output), (_b = {}, _b[arg.name] = (_a = i2.getConfigArgValue(arg.value)) !== null && _a !== void 0 ? _a : _this.getDefaultArgValue(key, operation, arg.name), _b)));
                }, {});
                operationsArray.push(this.formBuilder.control({
                    code: operation.code,
                    args: argsHash,
                }));
                collection.push({
                    code: operation.code,
                    args: operation.args.map(function (a) { return ({ name: a.name, value: i2.getConfigArgValue(a.value) }); }),
                });
            }
        };
        PromotionDetailComponent.prototype.getDefaultArgValue = function (key, operation, argName) {
            var def = key === 'conditions'
                ? this.allConditions.find(function (c) { return c.code === operation.code; })
                : this.allActions.find(function (a) { return a.code === operation.code; });
            if (def) {
                var argDef = def.args.find(function (a) { return a.name === argName; });
                if (argDef) {
                    return i2.getDefaultConfigArgValue(argDef);
                }
            }
            throw new Error("Could not determine default value for \"argName\"");
        };
        /**
         * Removes a condition or action from the promotion.
         */
        PromotionDetailComponent.prototype.removeOperation = function (key, operation) {
            var operationsArray = this.formArrayOf(key);
            var collection = key === 'conditions' ? this.conditions : this.actions;
            var index = operationsArray.value.findIndex(function (o) { return o.code === operation.code; });
            if (index !== -1) {
                operationsArray.removeAt(index);
                collection.splice(index, 1);
            }
        };
        return PromotionDetailComponent;
    }(i2.BaseDetailComponent));
    PromotionDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-promotion-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <clr-toggle-wrapper *vdrIfPermissions=\"'UpdatePromotion'\">\n                <input type=\"checkbox\" clrToggle name=\"enabled\" [formControl]=\"detailForm.get(['enabled'])\" />\n                <label>{{ 'common.enabled' | translate }}</label>\n            </clr-toggle-wrapper>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"promotion-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"'UpdatePromotion'\"\n                [disabled]=\"!saveButtonEnabled()\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n            type=\"text\"\n            formControlName=\"name\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.starts-at' | translate\" for=\"startsAt\">\n        <vdr-datetime-picker formControlName=\"startsAt\"></vdr-datetime-picker>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.ends-at' | translate\" for=\"endsAt\">\n        <vdr-datetime-picker formControlName=\"endsAt\"></vdr-datetime-picker>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.coupon-code' | translate\" for=\"couponCode\">\n        <input\n            id=\"couponCode\"\n            [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n            type=\"text\"\n            formControlName=\"couponCode\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.per-customer-limit' | translate\" for=\"perCustomerUsageLimit\">\n        <input\n            id=\"perCustomerUsageLimit\"\n            [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n            type=\"number\"\n            min=\"1\"\n            max=\"999\"\n            formControlName=\"perCustomerUsageLimit\"\n        />\n    </vdr-form-field>\n\n    <div class=\"clr-row\">\n        <div class=\"clr-col\" formArrayName=\"conditions\">\n            <label class=\"clr-control-label\">{{ 'marketing.conditions' | translate }}</label>\n            <ng-container *ngFor=\"let condition of conditions; index as i\">\n                <vdr-configurable-input\n                    (remove)=\"removeCondition($event)\"\n                    [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n                    [operation]=\"condition\"\n                    [operationDefinition]=\"getConditionDefinition(condition)\"\n                    [formControlName]=\"i\"\n                ></vdr-configurable-input>\n            </ng-container>\n\n            <div>\n                <vdr-dropdown *vdrIfPermissions=\"'UpdatePromotion'\">\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'marketing.add-condition' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let condition of getAvailableConditions()\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"addCondition(condition)\"\n                        >\n                            {{ condition.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\" formArrayName=\"actions\">\n            <label class=\"clr-control-label\">{{ 'marketing.actions' | translate }}</label>\n            <vdr-configurable-input\n                *ngFor=\"let action of actions; index as i\"\n                (remove)=\"removeAction($event)\"\n                [operation]=\"action\"\n                [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n                [operationDefinition]=\"getActionDefinition(action)\"\n                [formControlName]=\"i\"\n            ></vdr-configurable-input>\n            <div>\n                <vdr-dropdown *vdrIfPermissions=\"'UpdatePromotion'\">\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'marketing.add-action' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let action of getAvailableActions()\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"addAction(action)\"\n                        >\n                            {{ action.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n    </div>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    PromotionDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService }
    ]; };

    var PromotionListComponent = /** @class */ (function (_super) {
        __extends(PromotionListComponent, _super);
        function PromotionListComponent(dataService, router, route, notificationService, modalService) {
            var _this = _super.call(this, router, route) || this;
            _this.dataService = dataService;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.promotion).getPromotions.apply(_a, __spread(args)).refetchOnChannelChange();
            }, function (data) { return data.promotions; });
            return _this;
        }
        PromotionListComponent.prototype.deletePromotion = function (promotionId) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-promotion'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return response ? _this.dataService.promotion.deletePromotion(promotionId) : rxjs.EMPTY; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Promotion',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Promotion',
                });
            });
        };
        return PromotionListComponent;
    }(i2.BaseListComponent));
    PromotionListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-promotion-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"promotion-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\"\n           *vdrIfPermissions=\"'CreatePromotion'\"\n           [routerLink]=\"['./create']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'marketing.create-new-promotion' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'marketing.coupon-code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'marketing.starts-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'marketing.ends-at' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-promotion=\"item\">\n        <td class=\"left align-middle\">{{ promotion.name }}</td>\n        <td class=\"left align-middle\">\n            <vdr-chip *ngIf=\"promotion.couponCode\">\n                {{ promotion.couponCode }}\n            </vdr-chip>\n        </td>\n        <td class=\"left align-middle\">{{ promotion.startsAt | localeDate: 'longDate' }}</td>\n        <td class=\"left align-middle\">{{ promotion.endsAt | localeDate: 'longDate' }}</td>\n        <td class=\"align-middle\">\n            <vdr-chip *ngIf=\"!promotion.enabled\">{{ 'common.disabled' | translate }}</vdr-chip>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', promotion.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deletePromotion(promotion.id)\"\n                        [disabled]=\"!('DeletePromotion' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    PromotionListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.NotificationService },
        { type: i2.ModalService }
    ]; };

    /**
     * Resolves the id from the path into a Customer entity.
     */
    var PromotionResolver = /** @class */ (function (_super) {
        __extends(PromotionResolver, _super);
        function PromotionResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Promotion',
                id: '',
                createdAt: '',
                updatedAt: '',
                name: '',
                enabled: false,
                conditions: [],
                actions: [],
            }, function (id) { return dataService.promotion.getPromotion(id).mapStream(function (data) { return data.promotion; }); }) || this;
        }
        return PromotionResolver;
    }(i2.BaseEntityResolver));
    PromotionResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function PromotionResolver_Factory() { return new PromotionResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: PromotionResolver, providedIn: "root" });
    PromotionResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    PromotionResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var ɵ0 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.promotions'),
    }, ɵ1 = {
        breadcrumb: promotionBreadcrumb,
    };
    var marketingRoutes = [
        {
            path: 'promotions',
            component: PromotionListComponent,
            data: ɵ0,
        },
        {
            path: 'promotions/:id',
            component: PromotionDetailComponent,
            resolve: i2.createResolveData(PromotionResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ1,
        },
    ];
    function promotionBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.promotions',
            getName: function (promotion) { return promotion.name; },
            route: 'promotions',
        });
    }

    var MarketingModule = /** @class */ (function () {
        function MarketingModule() {
        }
        return MarketingModule;
    }());
    MarketingModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i2.SharedModule, i1.RouterModule.forChild(marketingRoutes)],
                    declarations: [PromotionListComponent, PromotionDetailComponent],
                },] }
    ];

    // This file was generated by the build-public-api.ts script

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MarketingModule = MarketingModule;
    exports.PromotionDetailComponent = PromotionDetailComponent;
    exports.PromotionListComponent = PromotionListComponent;
    exports.PromotionResolver = PromotionResolver;
    exports.marketingRoutes = marketingRoutes;
    exports.promotionBreadcrumb = promotionBreadcrumb;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vendure-admin-ui-marketing.umd.js.map
