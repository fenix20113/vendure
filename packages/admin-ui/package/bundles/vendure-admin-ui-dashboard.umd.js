(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@vendure/admin-ui/core'), require('@vendure/common/lib/shared-utils'), require('rxjs/operators'), require('@angular/router'), require('@biesbjerg/ngx-translate-extract-marker'), require('dayjs'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@vendure/admin-ui/dashboard', ['exports', '@angular/core', '@vendure/admin-ui/core', '@vendure/common/lib/shared-utils', 'rxjs/operators', '@angular/router', '@biesbjerg/ngx-translate-extract-marker', 'dayjs', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vendure = global.vendure || {}, global.vendure['admin-ui'] = global.vendure['admin-ui'] || {}, global.vendure['admin-ui'].dashboard = {}), global.ng.core, global.vendure['admin-ui'].core, global.sharedUtils, global.rxjs.operators, global.ng.router, global.ngxTranslateExtractMarker, global.dayjs, global.rxjs));
}(this, (function (exports, core, core$1, sharedUtils, operators, router, ngxTranslateExtractMarker, dayjs, rxjs) { 'use strict';

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

    var DashboardComponent = /** @class */ (function () {
        function DashboardComponent(dashboardWidgetService, localStorageService, changedDetectorRef, dataService) {
            this.dashboardWidgetService = dashboardWidgetService;
            this.localStorageService = localStorageService;
            this.changedDetectorRef = changedDetectorRef;
            this.dataService = dataService;
            this.deletionMarker = '__delete__';
        }
        DashboardComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.availableWidgetIds$ = this.dataService.client.userStatus().stream$.pipe(operators.map(function (_b) {
                var userStatus = _b.userStatus;
                return userStatus.permissions;
            }), operators.map(function (permissions) { return _this.dashboardWidgetService.getAvailableIds(permissions); }), operators.tap(function (ids) { return (_this.widgetLayout = _this.initLayout(ids)); }));
        };
        DashboardComponent.prototype.getClassForWidth = function (width) {
            switch (width) {
                case 3:
                    return "clr-col-12 clr-col-sm-6 clr-col-lg-3";
                case 4:
                    return "clr-col-12 clr-col-sm-6 clr-col-lg-4";
                case 6:
                    return "clr-col-12 clr-col-lg-6";
                case 8:
                    return "clr-col-12 clr-col-lg-8";
                case 12:
                    return "clr-col-12";
                default:
                    sharedUtils.assertNever(width);
            }
        };
        DashboardComponent.prototype.getSupportedWidths = function (config) {
            return config.supportedWidths || [3, 4, 6, 8, 12];
        };
        DashboardComponent.prototype.setWidgetWidth = function (widget, width) {
            widget.width = width;
            this.recalculateLayout();
        };
        DashboardComponent.prototype.trackRow = function (index, row) {
            var id = row.map(function (item) { return item.id + ":" + item.width; }).join('|');
            return id;
        };
        DashboardComponent.prototype.trackRowItem = function (index, item) {
            return item.config;
        };
        DashboardComponent.prototype.addWidget = function (id) {
            var _a;
            var config = this.dashboardWidgetService.getWidgetById(id);
            if (config) {
                var width = this.getSupportedWidths(config)[0];
                var widget = {
                    id: id,
                    config: config,
                    width: width,
                };
                var targetRow = void 0;
                if (this.widgetLayout && this.widgetLayout.length) {
                    targetRow = this.widgetLayout[this.widgetLayout.length - 1];
                }
                else {
                    targetRow = [];
                    (_a = this.widgetLayout) === null || _a === void 0 ? void 0 : _a.push(targetRow);
                }
                targetRow.push(widget);
                this.recalculateLayout();
            }
        };
        DashboardComponent.prototype.removeWidget = function (widget) {
            widget.id = this.deletionMarker;
            this.recalculateLayout();
        };
        DashboardComponent.prototype.drop = function (event) {
            var currentIndex = event.currentIndex, previousIndex = event.previousIndex, previousContainer = event.previousContainer, container = event.container;
            if (previousIndex === currentIndex && previousContainer.data.index === container.data.index) {
                // Nothing changed
                return;
            }
            if (this.widgetLayout) {
                var previousLayoutRow = this.widgetLayout[previousContainer.data.index];
                var newLayoutRow = this.widgetLayout[container.data.index];
                previousLayoutRow.splice(previousIndex, 1);
                newLayoutRow.splice(currentIndex, 0, event.item.data);
                this.recalculateLayout();
            }
        };
        DashboardComponent.prototype.initLayout = function (availableIds) {
            var savedLayoutDef = this.localStorageService.get('dashboardWidgetLayout');
            var layoutDef;
            if (savedLayoutDef) {
                // validate all the IDs from the saved layout are still available
                layoutDef = savedLayoutDef.filter(function (item) { return availableIds.includes(item.id); });
            }
            return this.dashboardWidgetService.getWidgetLayout(layoutDef);
        };
        DashboardComponent.prototype.recalculateLayout = function () {
            var _this = this;
            if (this.widgetLayout) {
                var flattened = this.widgetLayout
                    .reduce(function (flat, row) { return __spread(flat, row); }, [])
                    .filter(function (item) { return item.id !== _this.deletionMarker; });
                var newLayoutDef = flattened.map(function (item) { return ({
                    id: item.id,
                    width: item.width,
                }); });
                this.widgetLayout = this.dashboardWidgetService.getWidgetLayout(newLayoutDef);
                this.localStorageService.set('dashboardWidgetLayout', newLayoutDef);
                setTimeout(function () { return _this.changedDetectorRef.markForCheck(); });
            }
        };
        return DashboardComponent;
    }());
    DashboardComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'vdr-dashboard',
                    template: "<div class=\"widget-header\">\n    <vdr-dropdown>\n        <button class=\"btn btn-secondary btn-sm\" vdrDropdownTrigger>\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'dashboard.add-widget' | translate }}\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <button\n                class=\"button\"\n                vdrDropdownItem\n                *ngFor=\"let id of availableWidgetIds$ | async\"\n                (click)=\"addWidget(id)\"\n            >\n                {{ id }}\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</div>\n<div cdkDropListGroup>\n    <div\n        class=\"clr-row dashboard-row\"\n        *ngFor=\"let row of widgetLayout; index as rowIndex; trackBy: trackRow\"\n        cdkDropList\n        (cdkDropListDropped)=\"drop($event)\"\n        cdkDropListOrientation=\"horizontal\"\n        [cdkDropListData]=\"{ index: rowIndex }\"\n    >\n        <div\n            *ngFor=\"let widget of row; trackBy: trackRowItem\"\n            class=\"dashboard-item\"\n            [ngClass]=\"getClassForWidth(widget.width)\"\n            cdkDrag\n            [cdkDragData]=\"widget\"\n        >\n            <vdr-dashboard-widget\n                *vdrIfPermissions=\"widget.config.requiresPermissions || null\"\n                [widgetConfig]=\"widget.config\"\n            >\n                <div class=\"flex\">\n                    <div class=\"drag-handle\" cdkDragHandle>\n                        <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n                    </div>\n                    <vdr-dropdown>\n                        <button class=\"icon-button\" vdrDropdownTrigger>\n                            <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <h4 class=\"dropdown-header\">{{ 'dashboard.widget-resize' | translate }}</h4>\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                [disabled]=\"width === widget.width\"\n                                *ngFor=\"let width of getSupportedWidths(widget.config)\"\n                                (click)=\"setWidgetWidth(widget, width)\"\n                            >\n                                {{ 'dashboard.widget-width' | translate: { width: width } }}\n                            </button>\n                            <div class=\"dropdown-divider\" role=\"separator\"></div>\n                            <button class=\"button\" vdrDropdownItem (click)=\"removeWidget(widget)\">\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'dashboard.remove-widget' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </div>\n            </vdr-dashboard-widget>\n        </div>\n    </div>\n</div>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".widget-header{display:flex;justify-content:flex-end}.placeholder{color:var(--color-grey-300);text-align:center}.placeholder .version{font-size:3em;margin:24px;line-height:1em}.placeholder ::ng-deep .clr-i-outline{fill:var(--color-grey-200)}vdr-dashboard-widget{margin-bottom:24px}.cdk-drag-preview{box-sizing:border-box;border-radius:4px}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.dashboard-row{padding:0;border-width:1;margin-bottom:6px;transition:padding .2s,margin .2s}.dashboard-row.cdk-drop-list-dragging,.dashboard-row.cdk-drop-list-receiving{border:1px dashed var(--color-component-border-200);padding:6px}.dashboard-row.cdk-drop-list-dragging .dashboard-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
                },] }
    ];
    DashboardComponent.ctorParameters = function () { return [
        { type: core$1.DashboardWidgetService },
        { type: core$1.LocalStorageService },
        { type: core.ChangeDetectorRef },
        { type: core$1.DataService }
    ]; };

    var DashboardWidgetComponent = /** @class */ (function () {
        function DashboardWidgetComponent(componentFactoryResolver) {
            this.componentFactoryResolver = componentFactoryResolver;
        }
        DashboardWidgetComponent.prototype.ngAfterViewInit = function () {
            this.loadWidget();
        };
        DashboardWidgetComponent.prototype.loadWidget = function () {
            return __awaiter(this, void 0, void 0, function () {
                var loadComponentResult, componentType, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            loadComponentResult = this.widgetConfig.loadComponent();
                            if (!(loadComponentResult instanceof Promise)) return [3 /*break*/, 2];
                            return [4 /*yield*/, loadComponentResult];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = loadComponentResult;
                            _b.label = 3;
                        case 3:
                            componentType = _a;
                            this.componentRef = this.portal.createComponent(this.componentFactoryResolver.resolveComponentFactory(componentType));
                            this.componentRef.changeDetectorRef.markForCheck();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DashboardWidgetComponent.prototype.ngOnDestroy = function () {
            if (this.componentRef) {
                this.componentRef.destroy();
            }
        };
        return DashboardWidgetComponent;
    }());
    DashboardWidgetComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'vdr-dashboard-widget',
                    template: "<div class=\"card\">\n    <div class=\"card-header\">\n        <div class=\"title\">\n            <ng-container *ngIf=\"widgetConfig.title as title\">{{ title | translate }}</ng-container>\n        </div>\n        <div class=\"controls\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <ng-template #portal></ng-template>\n    </div>\n</div>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}.card{margin-top:0;min-height:200px}.card-header{display:flex;justify-content:space-between}"]
                },] }
    ];
    DashboardWidgetComponent.ctorParameters = function () { return [
        { type: core.ComponentFactoryResolver }
    ]; };
    DashboardWidgetComponent.propDecorators = {
        widgetConfig: [{ type: core.Input }],
        portal: [{ type: core.ViewChild, args: ['portal', { read: core.ViewContainerRef },] }]
    };

    var dashboardRoutes = [
        {
            path: '',
            component: DashboardComponent,
            pathMatch: 'full',
        },
    ];

    var LatestOrdersWidgetComponent = /** @class */ (function () {
        function LatestOrdersWidgetComponent(dataService) {
            this.dataService = dataService;
        }
        LatestOrdersWidgetComponent.prototype.ngOnInit = function () {
            this.latestOrders$ = this.dataService.order
                .getOrders({
                take: 10,
                filter: {
                    active: { eq: false },
                },
                sort: {
                    orderPlacedAt: core$1.SortOrder.DESC,
                },
            })
                .refetchOnChannelChange()
                .mapStream(function (data) { return data.orders.items; });
        };
        return LatestOrdersWidgetComponent;
    }());
    LatestOrdersWidgetComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'vdr-latest-orders-widget',
                    template: "<vdr-data-table [items]=\"latestOrders$ | async\">\n    <ng-template let-order=\"item\">\n        <td class=\"left align-middle\">\n            {{ order.code }}\n            <vdr-order-state-label [state]=\"order.state\"></vdr-order-state-label>\n        </td>\n        <td class=\"left align-middle\">\n            <vdr-customer-label [customer]=\"order.customer\"></vdr-customer-label>\n        </td>\n        <td class=\"left align-middle\">{{ order.total | localeCurrency: order.currencyCode }}</td>\n        <td class=\"left align-middle\">{{ order.orderPlacedAt | timeAgo }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"shopping-cart\"\n                [label]=\"'common.open' | translate\"\n                [linkTo]=\"['/orders/', order.id]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["vdr-data-table ::ng-deep table{margin-top:0}"]
                },] }
    ];
    LatestOrdersWidgetComponent.ctorParameters = function () { return [
        { type: core$1.DataService }
    ]; };
    var LatestOrdersWidgetModule = /** @class */ (function () {
        function LatestOrdersWidgetModule() {
        }
        return LatestOrdersWidgetModule;
    }());
    LatestOrdersWidgetModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [core$1.CoreModule, core$1.SharedModule],
                    declarations: [LatestOrdersWidgetComponent],
                },] }
    ];

    var OrderSummaryWidgetComponent = /** @class */ (function () {
        function OrderSummaryWidgetComponent(dataService) {
            this.dataService = dataService;
            this.today = new Date();
            this.yesterday = new Date(new Date().setDate(this.today.getDate() - 1));
            this.selection$ = new rxjs.BehaviorSubject({
                timeframe: 'day',
                date: this.today,
            });
        }
        OrderSummaryWidgetComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.dateRange$ = this.selection$.pipe(operators.distinctUntilChanged(), operators.map(function (selection) {
                return {
                    start: dayjs__default['default'](selection.date).startOf(selection.timeframe).toDate(),
                    end: dayjs__default['default'](selection.date).endOf(selection.timeframe).toDate(),
                };
            }), operators.shareReplay(1));
            var orderSummary$ = this.dateRange$.pipe(operators.switchMap(function (_a) {
                var start = _a.start, end = _a.end;
                return _this.dataService.order
                    .getOrderSummary(start, end)
                    .refetchOnChannelChange()
                    .mapStream(function (data) { return data.orders; });
            }), operators.shareReplay(1));
            this.totalOrderCount$ = orderSummary$.pipe(operators.map(function (res) { return res.totalItems; }));
            this.totalOrderValue$ = orderSummary$.pipe(operators.map(function (res) { return res.items.reduce(function (total, order) { return total + order.total; }, 0) / 100; }));
            this.currencyCode$ = this.dataService.settings
                .getActiveChannel()
                .refetchOnChannelChange()
                .mapStream(function (data) { return data.activeChannel.currencyCode || undefined; });
        };
        return OrderSummaryWidgetComponent;
    }());
    OrderSummaryWidgetComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'vdr-order-summary-widget',
                    template: "<div class=\"stats\">\n    <div class=\"stat\">\n        <div class=\"stat-figure\">{{ totalOrderCount$ | async }}</div>\n        <div class=\"stat-label\">{{ 'dashboard.total-orders' | translate }}</div>\n    </div>\n    <div class=\"stat\">\n        <div class=\"stat-figure\">\n            {{ totalOrderValue$ | async | currency: (currencyCode$ | async) || undefined }}\n        </div>\n        <div class=\"stat-label\">{{ 'dashboard.total-order-value' | translate }}</div>\n    </div>\n</div>\n<div class=\"footer\">\n    <div class=\"btn-group btn-outline-primary btn-sm\" *ngIf=\"selection$ | async as selection\">\n        <button class=\"btn\" [class.btn-primary]=\"selection.date === today\" (click)=\"selection$.next({timeframe: 'day', date: today})\">\n            {{ 'dashboard.today' | translate }}\n        </button>\n        <button class=\"btn\" [class.btn-primary]=\"selection.date === yesterday\" (click)=\"selection$.next({timeframe: 'day', date: yesterday})\">\n            {{ 'dashboard.yesterday' | translate }}\n        </button>\n        <button class=\"btn\" [class.btn-primary]=\"selection.timeframe === 'week'\" (click)=\"selection$.next({timeframe: 'week'})\">\n            {{ 'dashboard.thisWeek' | translate }}\n        </button>\n        <button class=\"btn\" [class.btn-primary]=\"selection.timeframe === 'month'\" (click)=\"selection$.next({timeframe: 'month'})\">\n            {{ 'dashboard.thisMonth' | translate }}\n        </button>\n    </div>\n\n    <div class=\"date-range p5\" *ngIf=\"dateRange$ | async as range\">\n        {{ range.start | localeDate }} - {{ range.end | localeDate }}\n    </div>\n</div>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".stats{display:flex;justify-content:space-evenly}.stat{text-align:center}.stat-figure{font-size:2rem;line-height:3rem}.stat-label{text-transform:uppercase}.date-range{margin-top:0}.footer{margin-top:24px;display:flex;flex-direction:column;justify-content:space-between}@media screen and (min-width:768px){.footer{flex-direction:row}}"]
                },] }
    ];
    OrderSummaryWidgetComponent.ctorParameters = function () { return [
        { type: core$1.DataService }
    ]; };
    var OrderSummaryWidgetModule = /** @class */ (function () {
        function OrderSummaryWidgetModule() {
        }
        return OrderSummaryWidgetModule;
    }());
    OrderSummaryWidgetModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [core$1.CoreModule],
                    declarations: [OrderSummaryWidgetComponent],
                },] }
    ];

    var TestWidgetComponent = /** @class */ (function () {
        function TestWidgetComponent() {
        }
        return TestWidgetComponent;
    }());
    TestWidgetComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'vdr-test-widget',
                    template: "<p>This is a test widget!</p>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    var TestWidgetModule = /** @class */ (function () {
        function TestWidgetModule() {
        }
        return TestWidgetModule;
    }());
    TestWidgetModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [TestWidgetComponent],
                },] }
    ];

    var WelcomeWidgetComponent = /** @class */ (function () {
        function WelcomeWidgetComponent(dataService) {
            this.dataService = dataService;
            this.version = core$1.ADMIN_UI_VERSION;
            this.brand = core$1.getAppConfig().brand;
            this.hideVendureBranding = core$1.getAppConfig().hideVendureBranding;
            this.hideVersion = core$1.getAppConfig().hideVersion;
        }
        WelcomeWidgetComponent.prototype.ngOnInit = function () {
            this.administrator$ = this.dataService.administrator
                .getActiveAdministrator()
                .mapStream(function (data) { return data.activeAdministrator || null; });
        };
        return WelcomeWidgetComponent;
    }());
    WelcomeWidgetComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'vdr-welcome-widget',
                    template: "<div *ngIf=\"administrator$ | async as administrator\">\n    <h4 class=\"h4\">\n        Welcome, {{ administrator.firstName }} {{ administrator.lastName }}<br />\n        <small class=\"p5\">Last login: {{ administrator.user.lastLogin | timeAgo }}</small>\n    </h4>\n\n    <p class=\"p5\" *ngIf=\"!hideVendureBranding || !hideVersion\">\n        {{ hideVendureBranding ? '' : 'Vendure' }} {{ hideVersion ? '' : ('Admin UI v' + version) }}\n    </p>\n</div>\n<div class=\"placeholder\">\n    <clr-icon shape=\"line-chart\" size=\"128\"></clr-icon>\n</div>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;justify-content:space-between}.placeholder{color:var(--color-grey-200)}"]
                },] }
    ];
    WelcomeWidgetComponent.ctorParameters = function () { return [
        { type: core$1.DataService }
    ]; };
    var WelcomeWidgetModule = /** @class */ (function () {
        function WelcomeWidgetModule() {
        }
        return WelcomeWidgetModule;
    }());
    WelcomeWidgetModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [core$1.CoreModule],
                    declarations: [WelcomeWidgetComponent],
                },] }
    ];

    var DEFAULT_DASHBOARD_WIDGET_LAYOUT = [
        { id: 'welcome', width: 12 },
        { id: 'orderSummary', width: 6 },
        { id: 'latestOrders', width: 6 },
    ];
    var ɵ0 = function () { return WelcomeWidgetComponent; }, ɵ1 = function () { return OrderSummaryWidgetComponent; }, ɵ2 = function () { return LatestOrdersWidgetComponent; }, ɵ3 = function () { return TestWidgetComponent; };
    var DEFAULT_WIDGETS = {
        welcome: {
            loadComponent: ɵ0,
        },
        orderSummary: {
            title: ngxTranslateExtractMarker.marker('dashboard.orders-summary'),
            loadComponent: ɵ1,
            requiresPermissions: [core$1.Permission.ReadOrder],
        },
        latestOrders: {
            title: ngxTranslateExtractMarker.marker('dashboard.latest-orders'),
            loadComponent: ɵ2,
            supportedWidths: [6, 8, 12],
            requiresPermissions: [core$1.Permission.ReadOrder],
        },
        testWidget: {
            title: 'Test Widget',
            loadComponent: ɵ3,
        },
    };

    var DashboardModule = /** @class */ (function () {
        function DashboardModule(dashboardWidgetService) {
            Object.entries(DEFAULT_WIDGETS).map(function (_a) {
                var _b = __read(_a, 2), id = _b[0], config = _b[1];
                return dashboardWidgetService.registerWidget(id, config);
            });
            if (dashboardWidgetService.getDefaultLayout().length === 0) {
                dashboardWidgetService.setDefaultLayout(DEFAULT_DASHBOARD_WIDGET_LAYOUT);
            }
        }
        return DashboardModule;
    }());
    DashboardModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [core$1.SharedModule, router.RouterModule.forChild(dashboardRoutes)],
                    declarations: [DashboardComponent, DashboardWidgetComponent],
                },] }
    ];
    DashboardModule.ctorParameters = function () { return [
        { type: core$1.DashboardWidgetService }
    ]; };

    // This file was generated by the build-public-api.ts script

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DEFAULT_DASHBOARD_WIDGET_LAYOUT = DEFAULT_DASHBOARD_WIDGET_LAYOUT;
    exports.DEFAULT_WIDGETS = DEFAULT_WIDGETS;
    exports.DashboardComponent = DashboardComponent;
    exports.DashboardModule = DashboardModule;
    exports.DashboardWidgetComponent = DashboardWidgetComponent;
    exports.LatestOrdersWidgetComponent = LatestOrdersWidgetComponent;
    exports.LatestOrdersWidgetModule = LatestOrdersWidgetModule;
    exports.OrderSummaryWidgetComponent = OrderSummaryWidgetComponent;
    exports.OrderSummaryWidgetModule = OrderSummaryWidgetModule;
    exports.TestWidgetComponent = TestWidgetComponent;
    exports.TestWidgetModule = TestWidgetModule;
    exports.WelcomeWidgetComponent = WelcomeWidgetComponent;
    exports.WelcomeWidgetModule = WelcomeWidgetModule;
    exports.dashboardRoutes = dashboardRoutes;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵ2 = ɵ2;
    exports.ɵ3 = ɵ3;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vendure-admin-ui-dashboard.umd.js.map
