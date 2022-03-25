(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@vendure/admin-ui/core'), require('@biesbjerg/ngx-translate-extract-marker'), require('rxjs/operators'), require('@angular/forms'), require('rxjs'), require('@vendure/common/lib/normalize-string'), require('@vendure/common/lib/shared-utils'), require('@angular/common'), require('@vendure/common/lib/shared-constants'), require('@vendure/common/lib/unique'), require('@vendure/common/lib/pick'), require('@angular/cdk/drag-drop'), require('@angular/cdk/overlay'), require('@ng-select/ng-select')) :
    typeof define === 'function' && define.amd ? define('@vendure/admin-ui/catalog', ['exports', '@angular/core', '@angular/router', '@vendure/admin-ui/core', '@biesbjerg/ngx-translate-extract-marker', 'rxjs/operators', '@angular/forms', 'rxjs', '@vendure/common/lib/normalize-string', '@vendure/common/lib/shared-utils', '@angular/common', '@vendure/common/lib/shared-constants', '@vendure/common/lib/unique', '@vendure/common/lib/pick', '@angular/cdk/drag-drop', '@angular/cdk/overlay', '@ng-select/ng-select'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vendure = global.vendure || {}, global.vendure['admin-ui'] = global.vendure['admin-ui'] || {}, global.vendure['admin-ui'].catalog = {}), global.ng.core, global.ng.router, global.vendure['admin-ui'].core, global.ngxTranslateExtractMarker, global.rxjs.operators, global.ng.forms, global.rxjs, global.normalizeString, global.sharedUtils, global.ng.common, global.sharedConstants, global.unique, global.pick, global.ng.cdk.dragDrop, global.ng.cdk.overlay, global.ngSelect));
}(this, (function (exports, i0, i1, i2, ngxTranslateExtractMarker, operators, forms, rxjs, normalizeString, sharedUtils, common, sharedConstants, unique, pick, dragDrop, overlay, ngSelect) { 'use strict';

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

    var AssetDetailComponent = /** @class */ (function (_super) {
        __extends(AssetDetailComponent, _super);
        function AssetDetailComponent(router, route, serverConfigService, notificationService, dataService, formBuilder) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.notificationService = notificationService;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.detailForm = new forms.FormGroup({});
            _this.customFields = _this.getCustomFieldConfig('Asset');
            return _this;
        }
        AssetDetailComponent.prototype.ngOnInit = function () {
            this.detailForm = new forms.FormGroup({
                name: new forms.FormControl(''),
                tags: new forms.FormControl([]),
                customFields: this.formBuilder.group(this.customFields.reduce(function (hash, field) {
                    var _c;
                    return (Object.assign(Object.assign({}, hash), (_c = {}, _c[field.name] = '', _c)));
                }, {})),
            });
            this.init();
        };
        AssetDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        AssetDetailComponent.prototype.onAssetChange = function (event) {
            var _a, _b;
            (_a = this.detailForm.get('name')) === null || _a === void 0 ? void 0 : _a.setValue(event.name);
            (_b = this.detailForm.get('tags')) === null || _b === void 0 ? void 0 : _b.setValue(event.tags);
            this.detailForm.markAsDirty();
        };
        AssetDetailComponent.prototype.save = function () {
            var _this = this;
            this.dataService.product
                .updateAsset({
                id: this.id,
                name: this.detailForm.value.name,
                tags: this.detailForm.value.tags,
                customFields: this.detailForm.value.customFields,
            })
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), { entity: 'Asset' });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Asset',
                });
            });
        };
        AssetDetailComponent.prototype.setFormValues = function (entity, languageCode) {
            var e_1, _c;
            var _a, _b;
            (_a = this.detailForm.get('name')) === null || _a === void 0 ? void 0 : _a.setValue(entity.name);
            (_b = this.detailForm.get('tags')) === null || _b === void 0 ? void 0 : _b.setValue(entity.tags);
            if (this.customFields.length) {
                var customFieldsGroup = this.detailForm.get('customFields');
                try {
                    for (var _d = __values(this.customFields), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var fieldDef = _e.value;
                        var key = fieldDef.name;
                        var value = entity.customFields[key];
                        var control = customFieldsGroup.get(key);
                        if (control) {
                            control.patchValue(value);
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
        };
        return AssetDetailComponent;
    }(i2.BaseDetailComponent));
    AssetDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-asset-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"asset-detail\"></vdr-action-bar-items>\n        <button\n            *vdrIfPermissions=\"['UpdateCatalog', 'UpdateAsset']\"\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n<vdr-asset-preview\n    [asset]=\"entity$ | async\"\n    [editable]=\"true\"\n    [customFields]=\"customFields\"\n    [customFieldsForm]=\"detailForm.get('customFields')\"\n    (assetChange)=\"onAssetChange($event)\"\n></vdr-asset-preview>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;flex-direction:column;height:100%}"]
                },] }
    ];
    AssetDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i2.NotificationService },
        { type: i2.DataService },
        { type: forms.FormBuilder }
    ]; };

    var AssetListComponent = /** @class */ (function (_super) {
        __extends(AssetListComponent, _super);
        function AssetListComponent(notificationService, modalService, dataService, router, route) {
            var _this = _super.call(this, router, route) || this;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _this.dataService = dataService;
            _this.searchTerm$ = new rxjs.BehaviorSubject(undefined);
            _this.filterByTags$ = new rxjs.BehaviorSubject(undefined);
            _this.uploading = false;
            _super.prototype.setQueryFn.call(_this, function () {
                var _b;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_b = _this.dataService.product).getAssetList.apply(_b, __spread(args));
            }, function (data) { return data.assets; }, function (skip, take) {
                var _a;
                var searchTerm = _this.searchTerm$.value;
                var tags = (_a = _this.filterByTags$.value) === null || _a === void 0 ? void 0 : _a.map(function (t) { return t.value; });
                return {
                    options: Object.assign(Object.assign({ skip: skip,
                        take: take }, (searchTerm
                        ? {
                            filter: {
                                name: { contains: searchTerm },
                            },
                        }
                        : {})), { sort: {
                            createdAt: i2.SortOrder.DESC,
                        }, tags: tags, tagsOperator: i2.LogicalOperator.AND }),
                };
            }, { take: 25, skip: 0 });
            return _this;
        }
        AssetListComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.paginationConfig$ = rxjs.combineLatest(this.itemsPerPage$, this.currentPage$, this.totalItems$).pipe(operators.map(function (_b) {
                var _c = __read(_b, 3), itemsPerPage = _c[0], currentPage = _c[1], totalItems = _c[2];
                return ({ itemsPerPage: itemsPerPage, currentPage: currentPage, totalItems: totalItems });
            }));
            this.searchTerm$.pipe(operators.debounceTime(250), operators.takeUntil(this.destroy$)).subscribe(function () { return _this.refresh(); });
            this.filterByTags$.pipe(operators.takeUntil(this.destroy$)).subscribe(function () { return _this.refresh(); });
            this.allTags$ = this.dataService.product.getTagList().mapStream(function (data) { return data.tags.items; });
        };
        AssetListComponent.prototype.filesSelected = function (files) {
            var _this = this;
            if (files.length) {
                this.uploading = true;
                this.dataService.product
                    .createAssets(files)
                    .pipe(operators.finalize(function () { return (_this.uploading = false); }))
                    .subscribe(function (_b) {
                    var e_1, _c;
                    var createAssets = _b.createAssets;
                    var successCount = 0;
                    try {
                        for (var createAssets_1 = __values(createAssets), createAssets_1_1 = createAssets_1.next(); !createAssets_1_1.done; createAssets_1_1 = createAssets_1.next()) {
                            var result = createAssets_1_1.value;
                            switch (result.__typename) {
                                case 'Asset':
                                    successCount++;
                                    break;
                                case 'MimeTypeError':
                                    _this.notificationService.error(result.message);
                                    break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (createAssets_1_1 && !createAssets_1_1.done && (_c = createAssets_1.return)) _c.call(createAssets_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (0 < successCount) {
                        _super.prototype.refresh.call(_this);
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('asset.notify-create-assets-success'), {
                            count: successCount,
                        });
                    }
                });
            }
        };
        AssetListComponent.prototype.deleteAssets = function (assets) {
            var _this = this;
            this.showModalAndDelete(assets.map(function (a) { return a.id; }))
                .pipe(operators.switchMap(function (response) {
                if (response.result === i2.DeletionResult.DELETED) {
                    return [true];
                }
                else {
                    return _this.showModalAndDelete(assets.map(function (a) { return a.id; }), response.message || '').pipe(operators.map(function (r) { return r.result === i2.DeletionResult.DELETED; }));
                }
            }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Assets',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Assets',
                });
            });
        };
        AssetListComponent.prototype.showModalAndDelete = function (assetIds, message) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-assets'),
                translationVars: {
                    count: assetIds.length,
                },
                body: message,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (res) { return (res ? _this.dataService.product.deleteAssets(assetIds, !!message) : rxjs.EMPTY); }), operators.map(function (res) { return res.deleteAssets; }));
        };
        return AssetListComponent;
    }(i2.BaseListComponent));
    AssetListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-asset-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left [grow]=\"true\">\n        <vdr-asset-search-input\n            class=\"pr4 mt1\"\n            [tags]=\"allTags$ | async\"\n            (searchTermChange)=\"searchTerm$.next($event)\"\n            (tagsChange)=\"filterByTags$.next($event)\"\n        ></vdr-asset-search-input>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"asset-list\"></vdr-action-bar-items>\n        <vdr-asset-file-input\n            (selectFiles)=\"filesSelected($event)\"\n            [uploading]=\"uploading\"\n            dropZoneTarget=\".content-area\"\n        ></vdr-asset-file-input>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-asset-gallery\n    [assets]=\"(items$ | async)! | paginate: (paginationConfig$ | async) || {}\"\n    [multiSelect]=\"true\"\n    [canDelete]=\"['DeleteCatalog', 'DeleteAsset'] | hasPermission\"\n    (deleteAssets)=\"deleteAssets($event)\"\n></vdr-asset-gallery>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"itemsPerPage$ | async\"\n        (itemsPerPageChange)=\"setItemsPerPage($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"currentPage$ | async\"\n        [itemsPerPage]=\"itemsPerPage$ | async\"\n        [totalItems]=\"totalItems$ | async\"\n        (pageChange)=\"setPageNumber($event)\"\n    ></vdr-pagination-controls>\n</div>\n",
                    styles: [":host{display:flex;flex-direction:column;height:100%}vdr-asset-gallery{flex:1}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between}.search-input{margin-top:6px;min-width:300px}"]
                },] }
    ];
    AssetListComponent.ctorParameters = function () { return [
        { type: i2.NotificationService },
        { type: i2.ModalService },
        { type: i2.DataService },
        { type: i1.Router },
        { type: i1.ActivatedRoute }
    ]; };

    var CollectionDetailComponent = /** @class */ (function (_super) {
        __extends(CollectionDetailComponent, _super);
        function CollectionDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService, modalService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _this.assetChanges = {};
            _this.filters = [];
            _this.allFilters = [];
            _this.updatePermission = [i2.Permission.UpdateCatalog, i2.Permission.UpdateCollection];
            _this.customFields = _this.getCustomFieldConfig('Collection');
            _this.detailForm = _this.formBuilder.group({
                name: ['', forms.Validators.required],
                slug: '',
                description: '',
                visible: false,
                filters: _this.formBuilder.array([]),
                customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                    var _c;
                    return (Object.assign(Object.assign({}, hash), (_c = {}, _c[field.name] = '', _c)));
                }, {})),
            });
            return _this;
        }
        CollectionDetailComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.init();
            this.dataService.collection.getCollectionFilters().single$.subscribe(function (res) {
                _this.allFilters = res.collectionFilters;
            });
        };
        CollectionDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        CollectionDetailComponent.prototype.getFilterDefinition = function (filter) {
            return this.allFilters.find(function (f) { return f.code === filter.code; });
        };
        CollectionDetailComponent.prototype.customFieldIsSet = function (name) {
            return !!this.detailForm.get(['customFields', name]);
        };
        CollectionDetailComponent.prototype.assetsChanged = function () {
            return !!Object.values(this.assetChanges).length;
        };
        /**
         * If creating a new Collection, automatically generate the slug based on the collection name.
         */
        CollectionDetailComponent.prototype.updateSlug = function (nameValue) {
            var _this = this;
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1))
                .subscribe(function (_c) {
                var _d = __read(_c, 2), entity = _d[0], languageCode = _d[1];
                var slugControl = _this.detailForm.get(['slug']);
                var currentTranslation = i2.findTranslation(entity, languageCode);
                var currentSlugIsEmpty = !currentTranslation || !currentTranslation.slug;
                if (slugControl && slugControl.pristine && currentSlugIsEmpty) {
                    slugControl.setValue(normalizeString.normalizeString("" + nameValue, '-'));
                }
            });
        };
        CollectionDetailComponent.prototype.addFilter = function (collectionFilter) {
            var filtersArray = this.detailForm.get('filters');
            var index = filtersArray.value.findIndex(function (o) { return o.code === collectionFilter.code; });
            if (index === -1) {
                var argsHash = collectionFilter.args.reduce(function (output, arg) {
                    var _c;
                    return (Object.assign(Object.assign({}, output), (_c = {}, _c[arg.name] = i2.getConfigArgValue(arg.value), _c)));
                }, {});
                filtersArray.push(this.formBuilder.control({
                    code: collectionFilter.code,
                    args: argsHash,
                }));
                this.filters.push({
                    code: collectionFilter.code,
                    args: collectionFilter.args.map(function (a) { return ({ name: a.name, value: i2.getConfigArgValue(a.value) }); }),
                });
            }
        };
        CollectionDetailComponent.prototype.removeFilter = function (collectionFilter) {
            var filtersArray = this.detailForm.get('filters');
            var index = filtersArray.value.findIndex(function (o) { return o.code === collectionFilter.code; });
            if (index !== -1) {
                filtersArray.removeAt(index);
                this.filters.splice(index, 1);
            }
        };
        CollectionDetailComponent.prototype.create = function () {
            var _this = this;
            if (!this.detailForm.dirty) {
                return;
            }
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var _d = __read(_c, 2), category = _d[0], languageCode = _d[1];
                var input = _this.getUpdatedCollection(category, _this.detailForm, languageCode);
                var parentId = _this.route.snapshot.paramMap.get('parentId');
                if (parentId) {
                    input.parentId = parentId;
                }
                return _this.dataService.collection.createCollection(input);
            }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'Collection',
                });
                _this.assetChanges = {};
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createCollection.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Collection',
                });
            });
        };
        CollectionDetailComponent.prototype.save = function () {
            var _this = this;
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var _d = __read(_c, 2), category = _d[0], languageCode = _d[1];
                var input = _this.getUpdatedCollection(category, _this.detailForm, languageCode);
                return _this.dataService.collection.updateCollection(input);
            }))
                .subscribe(function () {
                _this.assetChanges = {};
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'Collection',
                });
                _this.contentsComponent.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Collection',
                });
            });
        };
        CollectionDetailComponent.prototype.canDeactivate = function () {
            return _super.prototype.canDeactivate.call(this) && !this.assetChanges.assets && !this.assetChanges.featuredAsset;
        };
        /**
         * Sets the values of the form on changes to the category or current language.
         */
        CollectionDetailComponent.prototype.setFormValues = function (entity, languageCode) {
            var e_1, _c;
            var _this = this;
            var currentTranslation = i2.findTranslation(entity, languageCode);
            this.detailForm.patchValue({
                name: currentTranslation ? currentTranslation.name : '',
                slug: currentTranslation ? currentTranslation.slug : '',
                description: currentTranslation ? currentTranslation.description : '',
                visible: !entity.isPrivate,
            });
            entity.filters.forEach(function (f) { return _this.addFilter(f); });
            if (this.customFields.length) {
                var customFieldsGroup = this.detailForm.get(['customFields']);
                try {
                    for (var _d = __values(this.customFields), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var fieldDef = _e.value;
                        var key = fieldDef.name;
                        var value = fieldDef.type === 'localeString'
                            ? currentTranslation.customFields[key]
                            : entity.customFields[key];
                        var control = customFieldsGroup.get(key);
                        if (control) {
                            control.patchValue(value);
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
        };
        /**
         * Given a category and the value of the form, this method creates an updated copy of the category which
         * can then be persisted to the API.
         */
        CollectionDetailComponent.prototype.getUpdatedCollection = function (category, form, languageCode) {
            var _a, _b;
            var updatedCategory = i2.createUpdatedTranslatable({
                translatable: category,
                updatedFields: form.value,
                customFieldConfig: this.customFields,
                languageCode: languageCode,
                defaultTranslation: {
                    languageCode: languageCode,
                    name: category.name || '',
                    slug: category.slug || '',
                    description: category.description || '',
                },
            });
            return Object.assign(Object.assign({}, updatedCategory), { assetIds: (_a = this.assetChanges.assets) === null || _a === void 0 ? void 0 : _a.map(function (a) { return a.id; }), featuredAssetId: (_b = this.assetChanges.featuredAsset) === null || _b === void 0 ? void 0 : _b.id, isPrivate: !form.value.visible, filters: this.mapOperationsToInputs(this.filters, this.detailForm.value.filters) });
        };
        /**
         * Maps an array of conditions or actions to the input format expected by the GraphQL API.
         */
        CollectionDetailComponent.prototype.mapOperationsToInputs = function (operations, formValueOperations) {
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
        return CollectionDetailComponent;
    }(i2.BaseDetailComponent));
    CollectionDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-collection-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"collection-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"(detailForm.invalid || detailForm.pristine) && !assetsChanged()\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as category\">\n    <div class=\"clr-row\">\n        <div class=\"clr-col\">\n            <vdr-form-field [label]=\"'catalog.visibility' | translate\" for=\"visibility\">\n                <clr-toggle-wrapper>\n                    <input\n                        type=\"checkbox\"\n                        clrToggle\n                        formControlName=\"visible\"\n                        id=\"visibility\"\n                        [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                    />\n                    <label class=\"visible-toggle\">\n                        <ng-container *ngIf=\"detailForm.value.visible; else private\">{{ 'catalog.public' | translate }}</ng-container>\n                        <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n                    </label>\n                </clr-toggle-wrapper>\n            </vdr-form-field>\n            <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n                <input\n                    id=\"name\"\n                    type=\"text\"\n                    formControlName=\"name\"\n                    [readonly]=\"!(updatePermission | hasPermission)\"\n                    (input)=\"updateSlug($event.target.value)\"\n                />\n            </vdr-form-field>\n            <vdr-form-field\n                [label]=\"'catalog.slug' | translate\"\n                for=\"slug\"\n                [errors]=\"{ pattern: ('catalog.slug-pattern-error' | translate) }\"\n            >\n                <input\n                    id=\"slug\"\n                    type=\"text\"\n                    formControlName=\"slug\"\n                    [readonly]=\"!(updatePermission | hasPermission)\"\n                    pattern=\"[a-z0-9_-]+\"\n                />\n            </vdr-form-field>\n            <vdr-rich-text-editor\n                formControlName=\"description\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                [label]=\"'common.description' | translate\"\n            ></vdr-rich-text-editor>\n\n            <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n                <label>{{ 'common.custom-fields' | translate }}</label>\n                <ng-container *ngFor=\"let customField of customFields\">\n                    <vdr-custom-field-control\n                        *ngIf=\"customFieldIsSet(customField.name)\"\n                        entityName=\"Collection\"\n                        [customFieldsFormGroup]=\"detailForm.get(['customFields'])\"\n                        [customField]=\"customField\"\n                    ></vdr-custom-field-control>\n                </ng-container>\n            </section>\n        </div>\n        <div class=\"clr-col-md-auto\">\n            <vdr-product-assets\n                [assets]=\"category.assets\"\n                [featuredAsset]=\"category.featuredAsset\"\n                (change)=\"assetChanges = $event\"\n            ></vdr-product-assets>\n        </div>\n    </div>\n    <div class=\"clr-row\" formArrayName=\"filters\">\n        <div class=\"clr-col\">\n            <label>{{ 'catalog.filters' | translate }}</label>\n            <ng-container *ngFor=\"let filter of filters; index as i\">\n                <vdr-configurable-input\n                    (remove)=\"removeFilter($event)\"\n                    [operation]=\"filter\"\n                    [operationDefinition]=\"getFilterDefinition(filter)\"\n                    [formControlName]=\"i\"\n                    [readonly]=\"!(updatePermission | hasPermission)\"\n                ></vdr-configurable-input>\n            </ng-container>\n\n            <div *vdrIfPermissions=\"updatePermission\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'marketing.add-condition' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let filter of allFilters\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"addFilter(filter)\"\n                        >\n                            {{ filter.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\">\n            <vdr-collection-contents [collectionId]=\"id\" #collectionContents>\n                <ng-template let-count>\n                    <div class=\"contents-title\">\n                        {{ 'catalog.collection-contents' | translate }} ({{\n                            'common.results-count' | translate: { count: count }\n                        }})\n                    </div>\n                </ng-template>\n            </vdr-collection-contents>\n        </div>\n    </div>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".visible-toggle{margin-top:-3px!important}"]
                },] }
    ];
    CollectionDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService },
        { type: i2.ModalService }
    ]; };
    CollectionDetailComponent.propDecorators = {
        contentsComponent: [{ type: i0.ViewChild, args: ['collectionContents',] }]
    };

    var CollectionListComponent = /** @class */ (function () {
        function CollectionListComponent(dataService, notificationService, modalService, router, route) {
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.modalService = modalService;
            this.router = router;
            this.route = route;
            this.expandAll = false;
        }
        CollectionListComponent.prototype.ngOnInit = function () {
            this.queryResult = this.dataService.collection.getCollections(1000, 0).refetchOnChannelChange();
            this.items$ = this.queryResult.mapStream(function (data) { return data.collections.items; }).pipe(operators.shareReplay(1));
            this.activeCollectionId$ = this.route.paramMap.pipe(operators.map(function (pm) { return pm.get('contents'); }), operators.distinctUntilChanged());
            this.activeCollectionTitle$ = rxjs.combineLatest(this.activeCollectionId$, this.items$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), id = _b[0], collections = _b[1];
                if (id) {
                    var match = collections.find(function (c) { return c.id === id; });
                    return match ? match.name : '';
                }
                return '';
            }));
        };
        CollectionListComponent.prototype.ngOnDestroy = function () {
            this.queryResult.completed$.next();
        };
        CollectionListComponent.prototype.onRearrange = function (event) {
            var _this = this;
            this.dataService.collection.moveCollection([event]).subscribe({
                next: function () {
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-saved-changes'));
                    _this.refresh();
                },
                error: function (err) {
                    _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-save-changes-error'));
                },
            });
        };
        CollectionListComponent.prototype.deleteCollection = function (id) {
            var _this = this;
            this.items$
                .pipe(operators.take(1), operators.map(function (items) { return -1 < items.findIndex(function (i) { return i.parent && i.parent.id === id; }); }), operators.switchMap(function (hasChildren) {
                return _this.modalService.dialog({
                    title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-collection'),
                    body: hasChildren
                        ? ngxTranslateExtractMarker.marker('catalog.confirm-delete-collection-and-children-body')
                        : undefined,
                    buttons: [
                        { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                        { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                    ],
                });
            }), operators.switchMap(function (response) { return (response ? _this.dataService.collection.deleteCollection(id) : rxjs.EMPTY); }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Collection',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Collection',
                });
            });
        };
        CollectionListComponent.prototype.closeContents = function () {
            var params = Object.assign({}, this.route.snapshot.params);
            delete params.contents;
            this.router.navigate(['./', params], { relativeTo: this.route, queryParamsHandling: 'preserve' });
        };
        CollectionListComponent.prototype.refresh = function () {
            this.queryResult.ref.refetch();
        };
        return CollectionListComponent;
    }());
    CollectionListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-collection-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <clr-checkbox-wrapper class=\"expand-all-toggle ml3\">\n            <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"expandAll\" />\n            <label>{{ 'catalog.expand-all-collections' | translate }}</label>\n        </clr-checkbox-wrapper>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"collection-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" *vdrIfPermissions=\"['CreateCatalog', 'CreateCollection']\" [routerLink]=\"['./create']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'catalog.create-new-collection' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n<div class=\"collection-wrapper\">\n    <vdr-collection-tree\n        [collections]=\"items$ | async\"\n        [activeCollectionId]=\"activeCollectionId$ | async\"\n        [expandAll]=\"expandAll\"\n        (rearrange)=\"onRearrange($event)\"\n        (deleteCollection)=\"deleteCollection($event)\"\n    ></vdr-collection-tree>\n\n    <div class=\"collection-contents\" [class.expanded]=\"activeCollectionId$ | async\">\n        <vdr-collection-contents [collectionId]=\"activeCollectionId$ | async\">\n            <ng-template let-count>\n                <div class=\"collection-title\">\n                    {{ activeCollectionTitle$ | async }} ({{\n                        'common.results-count' | translate: { count: count }\n                    }})\n                </div>\n                <button type=\"button\" class=\"close-button\" (click)=\"closeContents()\">\n                    <clr-icon shape=\"close\"></clr-icon>\n                </button>\n            </ng-template>\n        </vdr-collection-contents>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{height:100%;display:flex;flex-direction:column}.expand-all-toggle{display:block;margin-top:14px}.collection-wrapper{display:flex;height:calc(100% - 50px)}.collection-wrapper vdr-collection-tree{flex:1;height:100%;overflow:auto}.collection-wrapper .collection-contents{height:100%;width:0;opacity:0;visibility:hidden;overflow:auto;transition:width .3s,opacity .2s .3s,visibility 0s .3s}.collection-wrapper .collection-contents.expanded{width:30vw;visibility:visible;opacity:1;padding-left:12px}.collection-wrapper .collection-contents .close-button{margin:0;background:none;border:none;cursor:pointer}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between}"]
                },] }
    ];
    CollectionListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.NotificationService },
        { type: i2.ModalService },
        { type: i1.Router },
        { type: i1.ActivatedRoute }
    ]; };

    var FacetDetailComponent = /** @class */ (function (_super) {
        __extends(FacetDetailComponent, _super);
        function FacetDetailComponent(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService, modalService) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.changeDetector = changeDetector;
            _this.dataService = dataService;
            _this.formBuilder = formBuilder;
            _this.notificationService = notificationService;
            _this.modalService = modalService;
            _this.updatePermission = [i2.Permission.UpdateCatalog, i2.Permission.UpdateFacet];
            _this.customFields = _this.getCustomFieldConfig('Facet');
            _this.customValueFields = _this.getCustomFieldConfig('FacetValue');
            _this.detailForm = _this.formBuilder.group({
                facet: _this.formBuilder.group({
                    code: ['', forms.Validators.required],
                    name: '',
                    visible: true,
                    customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                        var _b;
                        return (Object.assign(Object.assign({}, hash), (_b = {}, _b[field.name] = '', _b)));
                    }, {})),
                }),
                values: _this.formBuilder.array([]),
            });
            return _this;
        }
        FacetDetailComponent.prototype.ngOnInit = function () {
            this.init();
        };
        FacetDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        FacetDetailComponent.prototype.updateCode = function (currentCode, nameValue) {
            if (!currentCode) {
                var codeControl = this.detailForm.get(['facet', 'code']);
                if (codeControl && codeControl.pristine) {
                    codeControl.setValue(normalizeString.normalizeString(nameValue, '-'));
                }
            }
        };
        FacetDetailComponent.prototype.updateValueCode = function (currentCode, nameValue, index) {
            if (!currentCode) {
                var codeControl = this.detailForm.get(['values', index, 'code']);
                if (codeControl && codeControl.pristine) {
                    codeControl.setValue(normalizeString.normalizeString(nameValue, '-'));
                }
            }
        };
        FacetDetailComponent.prototype.customFieldIsSet = function (name) {
            return !!this.detailForm.get(['facet', 'customFields', name]);
        };
        FacetDetailComponent.prototype.customValueFieldIsSet = function (index, name) {
            return !!this.detailForm.get(['values', index, 'customFields', name]);
        };
        FacetDetailComponent.prototype.getValuesFormArray = function () {
            return this.detailForm.get('values');
        };
        FacetDetailComponent.prototype.addFacetValue = function () {
            var valuesFormArray = this.detailForm.get('values');
            if (valuesFormArray) {
                valuesFormArray.insert(valuesFormArray.length, this.formBuilder.group({
                    id: '',
                    name: ['', forms.Validators.required],
                    code: '',
                }));
                this.values.push({ name: '', code: '' });
            }
        };
        FacetDetailComponent.prototype.create = function () {
            var _this = this;
            var facetForm = this.detailForm.get('facet');
            if (!facetForm || !facetForm.dirty) {
                return;
            }
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_b) {
                var _c = __read(_b, 2), facet = _c[0], languageCode = _c[1];
                var newFacet = _this.getUpdatedFacet(facet, facetForm, languageCode);
                return _this.dataService.facet.createFacet(newFacet);
            }), operators.switchMap(function (data) { return _this.dataService.facet.getAllFacets().single$.pipe(operators.mapTo(data)); }))
                .subscribe(function (data) {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), { entity: 'Facet' });
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.router.navigate(['../', data.createFacet.id], { relativeTo: _this.route });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Facet',
                });
            });
        };
        FacetDetailComponent.prototype.save = function () {
            var _this = this;
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_b) {
                var _c = __read(_b, 2), facet = _c[0], languageCode = _c[1];
                var facetGroup = _this.detailForm.get('facet');
                var updateOperations = [];
                if (facetGroup && facetGroup.dirty) {
                    var newFacet = _this.getUpdatedFacet(facet, facetGroup, languageCode);
                    if (newFacet) {
                        updateOperations.push(_this.dataService.facet.updateFacet(newFacet));
                    }
                }
                var valuesArray = _this.detailForm.get('values');
                if (valuesArray && valuesArray.dirty) {
                    var newValues = valuesArray.controls
                        .filter(function (c) { return !c.value.id; })
                        .map(function (c) { return ({
                        facetId: facet.id,
                        code: c.value.code,
                        translations: [{ name: c.value.name, languageCode: languageCode }],
                    }); });
                    if (newValues.length) {
                        updateOperations.push(_this.dataService.facet
                            .createFacetValues(newValues)
                            .pipe(operators.switchMap(function () { return _this.dataService.facet.getFacet(_this.id).single$; })));
                    }
                    var updatedValues = _this.getUpdatedFacetValues(facet, valuesArray, languageCode);
                    if (updatedValues.length) {
                        updateOperations.push(_this.dataService.facet.updateFacetValues(updatedValues));
                    }
                }
                return rxjs.forkJoin(updateOperations);
            }), operators.switchMap(function () { return _this.dataService.facet.getAllFacets().single$; }))
                .subscribe(function () {
                _this.detailForm.markAsPristine();
                _this.changeDetector.markForCheck();
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), { entity: 'Facet' });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Facet',
                });
            });
        };
        FacetDetailComponent.prototype.deleteFacetValue = function (facetValueId, index) {
            var _this = this;
            if (!facetValueId) {
                // deleting a newly-added (not persisted) FacetValue
                var valuesFormArray = this.detailForm.get('values');
                if (valuesFormArray) {
                    valuesFormArray.removeAt(index);
                }
                this.values.splice(index, 1);
                return;
            }
            this.showModalAndDelete(facetValueId)
                .pipe(operators.switchMap(function (response) {
                if (response.result === i2.DeletionResult.DELETED) {
                    return [true];
                }
                else {
                    return _this.showModalAndDelete(facetValueId, response.message || '').pipe(operators.map(function (r) { return r.result === i2.DeletionResult.DELETED; }));
                }
            }), operators.switchMap(function (deleted) { return (deleted ? _this.dataService.facet.getFacet(_this.id).single$ : []); }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'FacetValue',
                });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'FacetValue',
                });
            });
        };
        FacetDetailComponent.prototype.showModalAndDelete = function (facetValueId, message) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-facet-value'),
                body: message,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (result) { return result ? _this.dataService.facet.deleteFacetValues([facetValueId], !!message) : rxjs.EMPTY; }), operators.map(function (result) { return result.deleteFacetValues[0]; }));
        };
        /**
         * Sets the values of the form on changes to the facet or current language.
         */
        FacetDetailComponent.prototype.setFormValues = function (facet, languageCode) {
            var e_1, _b;
            var _this = this;
            var _a;
            var currentTranslation = i2.findTranslation(facet, languageCode);
            this.detailForm.patchValue({
                facet: {
                    code: facet.code,
                    visible: !facet.isPrivate,
                    name: (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '',
                },
            });
            if (this.customFields.length) {
                var customFieldsGroup = this.detailForm.get(['facet', 'customFields']);
                try {
                    for (var _c = __values(this.customFields), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var fieldDef = _d.value;
                        var key = fieldDef.name;
                        var value = fieldDef.type === 'localeString'
                            ? currentTranslation.customFields[key]
                            : facet.customFields[key];
                        var control = customFieldsGroup.get(key);
                        if (control) {
                            control.patchValue(value);
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
            }
            var currentValuesFormArray = this.detailForm.get('values');
            this.values = __spread(facet.values);
            facet.values.forEach(function (value, i) {
                var e_2, _b;
                var valueTranslation = i2.findTranslation(value, languageCode);
                var group = {
                    id: value.id,
                    code: value.code,
                    name: valueTranslation ? valueTranslation.name : '',
                };
                var valueControl = currentValuesFormArray.at(i);
                if (valueControl) {
                    valueControl.setValue(group);
                }
                else {
                    currentValuesFormArray.insert(i, _this.formBuilder.group(group));
                }
                if (_this.customValueFields.length) {
                    var customValueFieldsGroup = _this.detailForm.get(['values', i, 'customFields']);
                    if (!customValueFieldsGroup) {
                        customValueFieldsGroup = new forms.FormGroup({});
                        _this.detailForm.get(['values', i]).addControl('customFields', customValueFieldsGroup);
                    }
                    if (customValueFieldsGroup) {
                        try {
                            for (var _c = __values(_this.customValueFields), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var fieldDef = _d.value;
                                var key = fieldDef.name;
                                var fieldValue = fieldDef.type === 'localeString'
                                    ? valueTranslation.customFields[key]
                                    : value.customFields[key];
                                var control = customValueFieldsGroup.get(key);
                                if (control) {
                                    control.setValue(fieldValue);
                                }
                                else {
                                    customValueFieldsGroup.addControl(key, new forms.FormControl(fieldValue));
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
            });
        };
        /**
         * Given a facet and the value of the detailForm, this method creates an updated copy of the facet which
         * can then be persisted to the API.
         */
        FacetDetailComponent.prototype.getUpdatedFacet = function (facet, facetFormGroup, languageCode) {
            var input = i2.createUpdatedTranslatable({
                translatable: facet,
                updatedFields: facetFormGroup.value,
                customFieldConfig: this.customFields,
                languageCode: languageCode,
                defaultTranslation: {
                    languageCode: languageCode,
                    name: facet.name || '',
                },
            });
            input.isPrivate = !facetFormGroup.value.visible;
            return input;
        };
        /**
         * Given an array of facet values and the values from the detailForm, this method creates an new array
         * which can be persisted to the API.
         */
        FacetDetailComponent.prototype.getUpdatedFacetValues = function (facet, valuesFormArray, languageCode) {
            var _this = this;
            var dirtyValues = facet.values.filter(function (v, i) {
                var formRow = valuesFormArray.get(i.toString());
                return formRow && formRow.dirty && formRow.value.id;
            });
            var dirtyValueValues = valuesFormArray.controls
                .filter(function (c) { return c.dirty && c.value.id; })
                .map(function (c) { return c.value; });
            if (dirtyValues.length !== dirtyValueValues.length) {
                throw new Error(ngxTranslateExtractMarker.marker("error.facet-value-form-values-do-not-match"));
            }
            return dirtyValues
                .map(function (value, i) {
                return i2.createUpdatedTranslatable({
                    translatable: value,
                    updatedFields: dirtyValueValues[i],
                    customFieldConfig: _this.customValueFields,
                    languageCode: languageCode,
                    defaultTranslation: {
                        languageCode: languageCode,
                        name: '',
                    },
                });
            })
                .filter(sharedUtils.notNullOrUndefined);
        };
        return FacetDetailComponent;
    }(i2.BaseDetailComponent));
    FacetDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-facet-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"facet-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as facet\">\n    <section class=\"form-block\" formGroupName=\"facet\">\n        <vdr-form-field [label]=\"'catalog.visibility' | translate\" for=\"visibility\">\n            <clr-toggle-wrapper>\n                <input\n                    type=\"checkbox\"\n                    clrToggle\n                    [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                    formControlName=\"visible\"\n                    id=\"visibility\"\n                />\n                <label class=\"visible-toggle\">\n                    <ng-container *ngIf=\"detailForm.value.facet.visible; else private\">{{ 'catalog.public' | translate }}</ng-container>\n                    <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n                </label>\n            </clr-toggle-wrapper>\n        </vdr-form-field>\n        <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n            <input\n                id=\"name\"\n                type=\"text\"\n                formControlName=\"name\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (input)=\"updateCode(facet.code, $event.target.value)\"\n            />\n        </vdr-form-field>\n        <vdr-form-field\n            [label]=\"'common.code' | translate\"\n            for=\"code\"\n            [readOnlyToggle]=\"updatePermission | hasPermission\"\n        >\n            <input\n                id=\"code\"\n                type=\"text\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                formControlName=\"code\"\n            />\n        </vdr-form-field>\n\n        <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n            <label>{{ 'common.custom-fields' | translate }}</label>\n            <ng-container *ngFor=\"let customField of customFields\">\n                <vdr-custom-field-control\n                    *ngIf=\"customFieldIsSet(customField.name)\"\n                    entityName=\"Facet\"\n                    [customFieldsFormGroup]=\"detailForm.get(['facet', 'customFields'])\"\n                    [customField]=\"customField\"\n                ></vdr-custom-field-control>\n            </ng-container>\n        </section>\n    </section>\n\n    <section class=\"form-block\" *ngIf=\"!(isNew$ | async)\">\n        <label>{{ 'catalog.facet-values' | translate }}</label>\n\n        <table class=\"facet-values-list table\" formArrayName=\"values\" *ngIf=\"0 < getValuesFormArray().length\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'common.name' | translate }}</th>\n                    <th>{{ 'common.code' | translate }}</th>\n                    <ng-container *ngFor=\"let customField of customValueFields\">\n                        <th>{{ customField.name }}</th>\n                    </ng-container>\n                    <th></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr\n                    class=\"facet-value\"\n                    *ngFor=\"let value of values; let i = index\"\n                    [formGroupName]=\"i\"\n                >\n                    <td class=\"align-middle\">\n                        <vdr-entity-info [entity]=\"value\"></vdr-entity-info>\n                    </td>\n                    <td class=\"align-middle\">\n                        <input\n                            type=\"text\"\n                            formControlName=\"name\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                            (input)=\"updateValueCode(facet.values[i]?.code, $event.target.value, i)\"\n                        />\n                    </td>\n                    <td class=\"align-middle\"><input type=\"text\" formControlName=\"code\" readonly /></td>\n                    <ng-container *ngFor=\"let customField of customValueFields\">\n                        <td class=\"align-middle\">\n                            <vdr-custom-field-control\n                                *ngIf=\"customValueFieldIsSet(i, customField.name)\"\n                                entityName=\"FacetValue\"\n                                [showLabel]=\"false\"\n                                [customFieldsFormGroup]=\"detailForm.get(['values', i, 'customFields'])\"\n                                [customField]=\"customField\"\n                            ></vdr-custom-field-control>\n                        </td>\n                    </ng-container>\n                    <td class=\"align-middle\">\n                        <vdr-dropdown>\n                            <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                                {{ 'common.actions' | translate }}\n                                <clr-icon shape=\"caret down\"></clr-icon>\n                            </button>\n                            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                                <button\n                                    type=\"button\"\n                                    class=\"delete-button\"\n                                    (click)=\"deleteFacetValue(facet.values[i]?.id, i)\"\n                                    [disabled]=\"!(updatePermission | hasPermission)\"\n                                    vdrDropdownItem\n                                >\n                                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                    {{ 'common.delete' | translate }}\n                                </button>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div>\n            <button\n                type=\"button\"\n                class=\"btn btn-secondary\"\n                *vdrIfPermissions=\"['CreateCatalog', 'CreateFacet']\"\n                (click)=\"addFacetValue()\"\n            >\n                <clr-icon shape=\"add\"></clr-icon>\n                {{ 'catalog.add-facet-value' | translate }}\n            </button>\n        </div>\n    </section>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".visible-toggle{margin-top:-3px!important}"]
                },] }
    ];
    FacetDetailComponent.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i1.ActivatedRoute },
        { type: i2.ServerConfigService },
        { type: i0.ChangeDetectorRef },
        { type: i2.DataService },
        { type: forms.FormBuilder },
        { type: i2.NotificationService },
        { type: i2.ModalService }
    ]; };

    var FacetListComponent = /** @class */ (function (_super) {
        __extends(FacetListComponent, _super);
        function FacetListComponent(dataService, modalService, notificationService, router, route) {
            var _this = _super.call(this, router, route) || this;
            _this.dataService = dataService;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.initialLimit = 3;
            _this.displayLimit = {};
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.facet).getFacets.apply(_a, __spread(args)).refetchOnChannelChange();
            }, function (data) { return data.facets; });
            return _this;
        }
        FacetListComponent.prototype.toggleDisplayLimit = function (facet) {
            if (this.displayLimit[facet.id] === facet.values.length) {
                this.displayLimit[facet.id] = this.initialLimit;
            }
            else {
                this.displayLimit[facet.id] = facet.values.length;
            }
        };
        FacetListComponent.prototype.deleteFacet = function (facetValueId) {
            var _this = this;
            this.showModalAndDelete(facetValueId)
                .pipe(operators.switchMap(function (response) {
                if (response.result === i2.DeletionResult.DELETED) {
                    return [true];
                }
                else {
                    return _this.showModalAndDelete(facetValueId, response.message || '').pipe(operators.map(function (r) { return r.result === i2.DeletionResult.DELETED; }));
                }
            }), 
            // Refresh the cached facets to reflect the changes
            operators.switchMap(function () { return _this.dataService.facet.getAllFacets().single$; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'FacetValue',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'FacetValue',
                });
            });
        };
        FacetListComponent.prototype.showModalAndDelete = function (facetId, message) {
            var _this = this;
            return this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-facet'),
                body: message,
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (res) { return (res ? _this.dataService.facet.deleteFacet(facetId, !!message) : rxjs.EMPTY); }), operators.map(function (res) { return res.deleteFacet; }));
        };
        return FacetListComponent;
    }(i2.BaseListComponent));
    FacetListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-facet-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"facet-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\"\n           *vdrIfPermissions=\"['CreateCatalog', 'CreateFacet']\"\n           [routerLink]=\"['./create']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'catalog.create-new-facet' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column [expand]=\"true\">{{ 'catalog.values' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'catalog.visibility' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-facet=\"item\">\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">{{ facet.code }}</td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">{{ facet.name }}</td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-facet-value-chip\n                *ngFor=\"let value of facet.values | slice: 0:displayLimit[facet.id] || 3\"\n                [facetValue]=\"value\"\n                [removable]=\"false\"\n                [displayFacetName]=\"false\"\n            ></vdr-facet-value-chip>\n            <button\n                class=\"btn btn-sm btn-secondary btn-icon\"\n                *ngIf=\"facet.values.length > initialLimit\"\n                (click)=\"toggleDisplayLimit(facet)\"\n            >\n                <ng-container *ngIf=\"(displayLimit[facet.id] || 0) < facet.values.length; else collapse\">\n                    <clr-icon shape=\"plus\"></clr-icon>\n                    {{ facet.values.length - initialLimit }}\n                </ng-container>\n                <ng-template #collapse>\n                    <clr-icon shape=\"minus\"></clr-icon>\n                </ng-template>\n            </button>\n        </td>\n        <td class=\"left align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-chip>\n                <ng-container *ngIf=\"!facet.isPrivate; else private\">{{ 'catalog.public' | translate }}</ng-container>\n                <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n            </vdr-chip>\n        </td>\n        <td class=\"right align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', facet.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\" [class.private]=\"facet.isPrivate\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteFacet(facet.id)\"\n                        [disabled]=\"!(['DeleteCatalog', 'DeleteFacet'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    styles: ["td.private{background-color:var(--color-component-bg-200)}"]
                },] }
    ];
    FacetListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.ModalService },
        { type: i2.NotificationService },
        { type: i1.Router },
        { type: i1.ActivatedRoute }
    ]; };

    /**
     * @description
     * Like String.prototype.replace(), but replaces the last instance
     * rather than the first.
     */
    function replaceLast(target, search, replace) {
        if (!target) {
            return '';
        }
        var lastIndex = target.lastIndexOf(search);
        if (lastIndex === -1) {
            return target;
        }
        var head = target.substr(0, lastIndex);
        var tail = target.substr(lastIndex).replace(search, replace);
        return head + tail;
    }

    /**
     * Handles the logic for making the API calls to perform CRUD operations on a Product and its related
     * entities. This logic was extracted out of the component because it became too large and hard to follow.
     */
    var ProductDetailService = /** @class */ (function () {
        function ProductDetailService(dataService) {
            this.dataService = dataService;
        }
        ProductDetailService.prototype.getFacets = function () {
            return this.dataService.facet.getAllFacets().mapSingle(function (data) { return data.facets.items; });
        };
        ProductDetailService.prototype.getTaxCategories = function () {
            return this.dataService.settings
                .getTaxCategories()
                .mapSingle(function (data) { return data.taxCategories; })
                .pipe(operators.shareReplay(1));
        };
        ProductDetailService.prototype.createProductWithVariants = function (input, createVariantsConfig, languageCode) {
            var _this = this;
            var createProduct$ = this.dataService.product.createProduct(input);
            var nonEmptyOptionGroups = createVariantsConfig.groups.filter(function (g) { return 0 < g.values.length; });
            var createOptionGroups$ = this.createProductOptionGroups(nonEmptyOptionGroups, languageCode);
            return rxjs.forkJoin(createProduct$, createOptionGroups$).pipe(operators.mergeMap(function (_d) {
                var _e = __read(_d, 2), createProduct = _e[0].createProduct, optionGroups = _e[1];
                var addOptionsToProduct$ = optionGroups.length
                    ? rxjs.forkJoin(optionGroups.map(function (optionGroup) {
                        return _this.dataService.product.addOptionGroupToProduct({
                            productId: createProduct.id,
                            optionGroupId: optionGroup.id,
                        });
                    }))
                    : rxjs.of([]);
                return addOptionsToProduct$.pipe(operators.map(function () {
                    return { createProduct: createProduct, optionGroups: optionGroups };
                }));
            }), operators.mergeMap(function (_d) {
                var createProduct = _d.createProduct, optionGroups = _d.optionGroups;
                var variants = createVariantsConfig.variants.map(function (v) {
                    var optionIds = optionGroups.length
                        ? v.optionValues.map(function (optionName, index) {
                            var option = optionGroups[index].options.find(function (o) { return o.name === optionName; });
                            if (!option) {
                                throw new Error("Could not find a matching ProductOption \"" + optionName + "\" when creating variant");
                            }
                            return option.id;
                        })
                        : [];
                    return Object.assign(Object.assign({}, v), { optionIds: optionIds });
                });
                var options = optionGroups.map(function (og) { return og.options; }).reduce(function (flat, o) { return __spread(flat, o); }, []);
                return _this.createProductVariants(createProduct, variants, options, languageCode);
            }));
        };
        ProductDetailService.prototype.createProductOptionGroups = function (groups, languageCode) {
            var _this = this;
            return groups.length
                ? rxjs.forkJoin(groups.map(function (c) {
                    return _this.dataService.product
                        .createProductOptionGroups({
                        code: normalizeString.normalizeString(c.name, '-'),
                        translations: [{ languageCode: languageCode, name: c.name }],
                        options: c.values.map(function (v) { return ({
                            code: normalizeString.normalizeString(v, '-'),
                            translations: [{ languageCode: languageCode, name: v }],
                        }); }),
                    })
                        .pipe(operators.map(function (data) { return data.createProductOptionGroup; }));
                }))
                : rxjs.of([]);
        };
        ProductDetailService.prototype.createProductVariants = function (product, variantData, options, languageCode) {
            var variants = variantData.map(function (v) {
                var name = options.length
                    ? product.name + " " + v.optionIds
                        .map(function (id) { return options.find(function (o) { return o.id === id; }); })
                        .filter(sharedUtils.notNullOrUndefined)
                        .map(function (o) { return o.name; })
                        .join(' ')
                    : product.name;
                return {
                    productId: product.id,
                    price: v.price,
                    sku: v.sku,
                    stockOnHand: v.stock,
                    translations: [
                        {
                            languageCode: languageCode,
                            name: name,
                        },
                    ],
                    optionIds: v.optionIds,
                };
            });
            return this.dataService.product.createProductVariants(variants).pipe(operators.map(function (_d) {
                var createProductVariants = _d.createProductVariants;
                return ({
                    createProductVariants: createProductVariants,
                    productId: product.id,
                });
            }));
        };
        ProductDetailService.prototype.updateProduct = function (updateOptions) {
            var e_1, _d;
            var _a, _b, _c;
            var product = updateOptions.product, languageCode = updateOptions.languageCode, autoUpdate = updateOptions.autoUpdate, productInput = updateOptions.productInput, variantsInput = updateOptions.variantsInput;
            var updateOperations = [];
            var updateVariantsInput = variantsInput || [];
            if (productInput) {
                updateOperations.push(this.dataService.product.updateProduct(productInput));
                var productOldName = (_a = i2.findTranslation(product, languageCode)) === null || _a === void 0 ? void 0 : _a.name;
                var productNewName = (_b = i2.findTranslation(productInput, languageCode)) === null || _b === void 0 ? void 0 : _b.name;
                if (productOldName && productNewName && autoUpdate) {
                    var _loop_1 = function (variant) {
                        var currentVariantName = ((_c = i2.findTranslation(variant, languageCode)) === null || _c === void 0 ? void 0 : _c.name) || '';
                        var variantInput = void 0;
                        var existingVariantInput = updateVariantsInput.find(function (i) { return i.id === variant.id; });
                        if (existingVariantInput) {
                            variantInput = existingVariantInput;
                        }
                        else {
                            variantInput = {
                                id: variant.id,
                                translations: [{ languageCode: languageCode, name: currentVariantName }],
                            };
                            updateVariantsInput.push(variantInput);
                        }
                        var variantTranslation = i2.findTranslation(variantInput, languageCode);
                        if (variantTranslation) {
                            variantTranslation.name = replaceLast(variantTranslation.name, productOldName, productNewName);
                        }
                    };
                    try {
                        for (var _e = __values(product.variants), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var variant = _f.value;
                            _loop_1(variant);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            if (updateVariantsInput.length) {
                updateOperations.push(this.dataService.product.updateProductVariants(updateVariantsInput));
            }
            return rxjs.forkJoin(updateOperations);
        };
        ProductDetailService.prototype.updateProductOption = function (input, product, languageCode) {
            var e_2, _d;
            var _a, _b, _c;
            var updateProductVariantNames$ = rxjs.of([]);
            if (input.autoUpdate) {
                // Update any ProductVariants' names which include the option name
                var oldOptionName = void 0;
                var newOptionName = (_a = i2.findTranslation(input, languageCode)) === null || _a === void 0 ? void 0 : _a.name;
                if (!newOptionName) {
                    updateProductVariantNames$ = rxjs.of([]);
                }
                var variantsToUpdate = [];
                try {
                    for (var _e = __values(product.variants), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var variant = _f.value;
                        if (variant.options.map(function (o) { return o.id; }).includes(input.id)) {
                            if (!oldOptionName) {
                                oldOptionName = (_b = i2.findTranslation(variant.options.find(function (o) { return o.id === input.id; }), languageCode)) === null || _b === void 0 ? void 0 : _b.name;
                            }
                            var variantName = ((_c = i2.findTranslation(variant, languageCode)) === null || _c === void 0 ? void 0 : _c.name) || '';
                            if (oldOptionName && newOptionName && variantName.includes(oldOptionName)) {
                                variantsToUpdate.push({
                                    id: variant.id,
                                    translations: [
                                        {
                                            languageCode: languageCode,
                                            name: replaceLast(variantName, oldOptionName, newOptionName),
                                        },
                                    ],
                                });
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                if (variantsToUpdate.length) {
                    updateProductVariantNames$ = this.dataService.product.updateProductVariants(variantsToUpdate);
                }
            }
            return this.dataService.product
                .updateProductOption(input)
                .pipe(operators.mergeMap(function () { return updateProductVariantNames$; }));
        };
        ProductDetailService.prototype.deleteProductVariant = function (id, productId) {
            var _this = this;
            return this.dataService.product.deleteProductVariant(id).pipe(operators.switchMap(function (result) {
                if (result.deleteProductVariant.result === i2.DeletionResult.DELETED) {
                    return _this.dataService.product.getProduct(productId).single$;
                }
                else {
                    return rxjs.throwError(result.deleteProductVariant.message);
                }
            }));
        };
        return ProductDetailService;
    }());
    ProductDetailService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ProductDetailService_Factory() { return new ProductDetailService(i0.ɵɵinject(i2.DataService)); }, token: ProductDetailService, providedIn: "root" });
    ProductDetailService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ProductDetailService.ctorParameters = function () { return [
        { type: i2.DataService }
    ]; };

    var ApplyFacetDialogComponent = /** @class */ (function () {
        function ApplyFacetDialogComponent(changeDetector) {
            this.changeDetector = changeDetector;
            this.selectedValues = [];
        }
        ApplyFacetDialogComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this.selector.focus(); }, 0);
        };
        ApplyFacetDialogComponent.prototype.selectValues = function () {
            this.resolveWith(this.selectedValues);
        };
        ApplyFacetDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        return ApplyFacetDialogComponent;
    }());
    ApplyFacetDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-apply-facet-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'catalog.add-facets' | translate }}</ng-template>\n\n<vdr-facet-value-selector\n    [facets]=\"facets\"\n    (selectedValuesChange)=\"selectedValues = $event\"\n></vdr-facet-value-selector>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"selectValues()\"\n        [disabled]=\"selectedValues.length === 0\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'catalog.add-facets' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    ApplyFacetDialogComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };
    ApplyFacetDialogComponent.propDecorators = {
        selector: [{ type: i0.ViewChild, args: [i2.FacetValueSelectorComponent,] }]
    };

    var AssignProductsToChannelDialogComponent = /** @class */ (function () {
        function AssignProductsToChannelDialogComponent(dataService, notificationService) {
            this.dataService = dataService;
            this.notificationService = notificationService;
            this.priceFactorControl = new forms.FormControl(1);
            this.selectedChannelIdControl = new forms.FormControl();
        }
        Object.defineProperty(AssignProductsToChannelDialogComponent.prototype, "isProductVariantMode", {
            get: function () {
                return this.productVariantIds != null;
            },
            enumerable: false,
            configurable: true
        });
        AssignProductsToChannelDialogComponent.prototype.ngOnInit = function () {
            var _this = this;
            var activeChannelId$ = this.dataService.client
                .userStatus()
                .mapSingle(function (_b) {
                var userStatus = _b.userStatus;
                return userStatus.activeChannelId;
            });
            var allChannels$ = this.dataService.settings.getChannels().mapSingle(function (data) { return data.channels; });
            rxjs.combineLatest(activeChannelId$, allChannels$).subscribe(function (_b) {
                var _c = __read(_b, 2), activeChannelId = _c[0], channels = _c[1];
                // tslint:disable-next-line:no-non-null-assertion
                _this.currentChannel = channels.find(function (c) { return c.id === activeChannelId; });
                _this.availableChannels = channels;
            });
            this.selectedChannelIdControl.valueChanges.subscribe(function (ids) {
                _this.selectChannel(ids);
            });
            this.variantsPreview$ = rxjs.combineLatest(rxjs.from(this.getTopVariants(10)), this.priceFactorControl.valueChanges.pipe(operators.startWith(1))).pipe(operators.map(function (_b) {
                var _c = __read(_b, 2), variants = _c[0], factor = _c[1];
                return variants.map(function (v) { return ({
                    id: v.id,
                    name: v.name,
                    price: v.price,
                    pricePreview: v.price * +factor,
                }); });
            }));
        };
        AssignProductsToChannelDialogComponent.prototype.selectChannel = function (channelIds) {
            this.selectedChannel = this.availableChannels.find(function (c) { return c.id === channelIds[0]; });
        };
        AssignProductsToChannelDialogComponent.prototype.assign = function () {
            var _this = this;
            var selectedChannel = this.selectedChannel;
            if (selectedChannel) {
                if (!this.isProductVariantMode) {
                    this.dataService.product
                        .assignProductsToChannel({
                        channelId: selectedChannel.id,
                        productIds: this.productIds,
                        priceFactor: +this.priceFactorControl.value,
                    })
                        .subscribe(function () {
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.assign-product-to-channel-success'), {
                            channel: selectedChannel.code,
                        });
                        _this.resolveWith(true);
                    });
                }
                else if (this.productVariantIds) {
                    this.dataService.product
                        .assignVariantsToChannel({
                        channelId: selectedChannel.id,
                        productVariantIds: this.productVariantIds,
                        priceFactor: +this.priceFactorControl.value,
                    })
                        .subscribe(function () {
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.assign-variant-to-channel-success'), {
                            channel: selectedChannel.code,
                        });
                        _this.resolveWith(true);
                    });
                }
            }
        };
        AssignProductsToChannelDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        AssignProductsToChannelDialogComponent.prototype.getTopVariants = function (take) {
            return __awaiter(this, void 0, void 0, function () {
                var variants, i, productVariants;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            variants = [];
                            i = 0;
                            _b.label = 1;
                        case 1:
                            if (!(i < this.productIds.length && variants.length < take)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.dataService.product
                                    .getProduct(this.productIds[i])
                                    .mapSingle(function (_b) {
                                    var product = _b.product;
                                    var _variants = product ? product.variants : [];
                                    return _variants.filter(function (v) { var _a; return _this.isProductVariantMode ? (_a = _this.productVariantIds) === null || _a === void 0 ? void 0 : _a.includes(v.id) : true; });
                                })
                                    .toPromise()];
                        case 2:
                            productVariants = _b.sent();
                            variants.push.apply(variants, __spread((productVariants || [])));
                            _b.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, variants.slice(0, take)];
                    }
                });
            });
        };
        return AssignProductsToChannelDialogComponent;
    }());
    AssignProductsToChannelDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-assign-products-to-channel-dialog',
                    template: "<ng-template vdrDialogTitle>\n    <ng-container *ngIf=\"isProductVariantMode; else productModeTitle\">{{\n        'catalog.assign-variants-to-channel' | translate\n    }}</ng-container>\n    <ng-template #productModeTitle>{{ 'catalog.assign-products-to-channel' | translate }}</ng-template>\n</ng-template>\n\n<div class=\"flex\">\n    <clr-input-container>\n        <label>{{ 'common.channel' | translate }}</label>\n        <vdr-channel-assignment-control\n            clrInput\n            [multiple]=\"false\"\n            [includeDefaultChannel]=\"false\"\n            [disableChannelIds]=\"currentChannelIds\"\n            [formControl]=\"selectedChannelIdControl\"\n        ></vdr-channel-assignment-control>\n    </clr-input-container>\n    <div class=\"flex-spacer\"></div>\n    <clr-input-container>\n        <label>{{ 'catalog.price-conversion-factor' | translate }}</label>\n        <input clrInput type=\"number\" min=\"0\" max=\"99999\" [formControl]=\"priceFactorControl\" />\n    </clr-input-container>\n</div>\n\n<div class=\"channel-price-preview\">\n    <label class=\"clr-control-label\">{{ 'catalog.channel-price-preview' | translate }}</label>\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th>{{ 'common.name' | translate }}</th>\n                <th>\n                    {{\n                        'catalog.price-in-channel'\n                            | translate: { channel: currentChannel?.code | channelCodeToLabel | translate }\n                    }}\n                </th>\n                <th>\n                    <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n                        {{ 'catalog.price-in-channel' | translate: { channel: selectedChannel?.code } }}\n                    </ng-template>\n                    <ng-template #noSelection>\n                        {{ 'catalog.no-channel-selected' | translate }}\n                    </ng-template>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let row of variantsPreview$ | async\">\n                <td>{{ row.name }}</td>\n                <td>{{ row.price | localeCurrency: currentChannel?.currencyCode }}</td>\n                <td>\n                    <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noChannelSelected\">\n                        {{ row.pricePreview | localeCurrency: selectedChannel?.currencyCode }}\n                    </ng-template>\n                    <ng-template #noChannelSelected> - </ng-template>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"assign()\" [disabled]=\"!selectedChannel\" class=\"btn btn-primary\">\n        <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n            {{ 'catalog.assign-to-named-channel' | translate: { channelCode: selectedChannel?.code } }}\n        </ng-template>\n        <ng-template #noSelection>\n            {{ 'catalog.no-channel-selected' | translate }}\n        </ng-template>\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["vdr-channel-assignment-control{min-width:200px}.channel-price-preview{margin-top:24px}.channel-price-preview table.table{margin-top:6px}"]
                },] }
    ];
    AssignProductsToChannelDialogComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.NotificationService }
    ]; };

    var ProductDetailComponent = /** @class */ (function (_super) {
        __extends(ProductDetailComponent, _super);
        function ProductDetailComponent(route, router, serverConfigService, productDetailService, formBuilder, modalService, notificationService, dataService, location, changeDetector) {
            var _this = _super.call(this, route, router, serverConfigService, dataService) || this;
            _this.productDetailService = productDetailService;
            _this.formBuilder = formBuilder;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.dataService = dataService;
            _this.location = location;
            _this.changeDetector = changeDetector;
            _this.filterInput = new forms.FormControl('');
            _this.assetChanges = {};
            _this.variantAssetChanges = {};
            _this.selectedVariantIds = [];
            _this.variantDisplayMode = 'card';
            _this.createVariantsConfig = { groups: [], variants: [] };
            _this.customFields = _this.getCustomFieldConfig('Product');
            _this.customVariantFields = _this.getCustomFieldConfig('ProductVariant');
            _this.customOptionGroupFields = _this.getCustomFieldConfig('ProductOptionGroup');
            _this.customOptionFields = _this.getCustomFieldConfig('ProductOption');
            _this.detailForm = _this.formBuilder.group({
                product: _this.formBuilder.group({
                    enabled: true,
                    name: ['', forms.Validators.required],
                    autoUpdateVariantNames: true,
                    slug: '',
                    description: '',
                    facetValueIds: [[]],
                    customFields: _this.formBuilder.group(_this.customFields.reduce(function (hash, field) {
                        var _c;
                        return (Object.assign(Object.assign({}, hash), (_c = {}, _c[field.name] = '', _c)));
                    }, {})),
                }),
                variants: _this.formBuilder.array([]),
            });
            return _this;
        }
        ProductDetailComponent.prototype.ngOnInit = function () {
            this.init();
            this.product$ = this.entity$;
            var variants$ = this.product$.pipe(operators.map(function (product) { return product.variants; }));
            var filterTerm$ = this.filterInput.valueChanges.pipe(operators.startWith(''), operators.debounceTime(50), operators.shareReplay());
            this.variants$ = rxjs.combineLatest(variants$, filterTerm$).pipe(operators.map(function (_c) {
                var _d = __read(_c, 2), variants = _d[0], term = _d[1];
                return term
                    ? variants.filter(function (v) {
                        var lcTerm = term.toLocaleLowerCase();
                        return (v.name.toLocaleLowerCase().includes(term) ||
                            v.sku.toLocaleLowerCase().includes(term));
                    })
                    : variants;
            }));
            this.taxCategories$ = this.productDetailService.getTaxCategories().pipe(operators.takeUntil(this.destroy$));
            this.activeTab$ = this.route.paramMap.pipe(operators.map(function (qpm) { return qpm.get('tab'); }));
            // FacetValues are provided initially by the nested array of the
            // Product entity, but once a fetch to get all Facets is made (as when
            // opening the FacetValue selector modal), then these additional values
            // are concatenated onto the initial array.
            this.facets$ = this.productDetailService.getFacets();
            var productFacetValues$ = this.product$.pipe(operators.map(function (product) { return product.facetValues; }));
            var allFacetValues$ = this.facets$.pipe(operators.map(i2.flattenFacetValues));
            var productGroup = this.getProductFormGroup();
            var formFacetValueIdChanges$ = productGroup.valueChanges.pipe(operators.map(function (val) { return val.facetValueIds; }), operators.distinctUntilChanged());
            var formChangeFacetValues$ = rxjs.combineLatest(formFacetValueIdChanges$, productFacetValues$, allFacetValues$).pipe(operators.map(function (_c) {
                var _d = __read(_c, 3), ids = _d[0], productFacetValues = _d[1], allFacetValues = _d[2];
                var combined = __spread(productFacetValues, allFacetValues);
                return ids.map(function (id) { return combined.find(function (fv) { return fv.id === id; }); }).filter(sharedUtils.notNullOrUndefined);
            }));
            this.facetValues$ = rxjs.merge(productFacetValues$, formChangeFacetValues$);
            this.productChannels$ = this.product$.pipe(operators.map(function (p) { return p.channels; }));
            this.channelPriceIncludesTax$ = this.dataService.settings
                .getActiveChannel('cache-first')
                .refetchOnChannelChange()
                .mapStream(function (data) { return data.activeChannel.pricesIncludeTax; })
                .pipe(operators.shareReplay(1));
        };
        ProductDetailComponent.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        ProductDetailComponent.prototype.navigateToTab = function (tabName) {
            this.location.replaceState(this.router
                .createUrlTree(['./', Object.assign(Object.assign({}, this.route.snapshot.params), { tab: tabName })], {
                queryParamsHandling: 'merge',
                relativeTo: this.route,
            })
                .toString());
        };
        ProductDetailComponent.prototype.isDefaultChannel = function (channelCode) {
            return channelCode === sharedConstants.DEFAULT_CHANNEL_CODE;
        };
        ProductDetailComponent.prototype.assignToChannel = function () {
            var _this = this;
            this.productChannels$
                .pipe(operators.take(1), operators.switchMap(function (channels) {
                return _this.modalService.fromComponent(AssignProductsToChannelDialogComponent, {
                    size: 'lg',
                    locals: {
                        productIds: [_this.id],
                        currentChannelIds: channels.map(function (c) { return c.id; }),
                    },
                });
            }))
                .subscribe();
        };
        ProductDetailComponent.prototype.removeFromChannel = function (channelId) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.remove-product-from-channel'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('catalog.remove-from-channel'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return response
                ? _this.dataService.product.removeProductsFromChannel({
                    channelId: channelId,
                    productIds: [_this.id],
                })
                : rxjs.EMPTY; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.notify-remove-product-from-channel-success'));
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('catalog.notify-remove-product-from-channel-error'));
            });
        };
        ProductDetailComponent.prototype.assignVariantToChannel = function (variant) {
            return this.modalService
                .fromComponent(AssignProductsToChannelDialogComponent, {
                size: 'lg',
                locals: {
                    productIds: [this.id],
                    productVariantIds: [variant.id],
                    currentChannelIds: variant.channels.map(function (c) { return c.id; }),
                },
            })
                .subscribe();
        };
        ProductDetailComponent.prototype.removeVariantFromChannel = function (_c) {
            var _this = this;
            var channelId = _c.channelId, variant = _c.variant;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.remove-product-variant-from-channel'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('catalog.remove-from-channel'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return response
                ? _this.dataService.product.removeVariantsFromChannel({
                    channelId: channelId,
                    productVariantIds: [variant.id],
                })
                : rxjs.EMPTY; }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.notify-remove-variant-from-channel-success'));
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('catalog.notify-remove-variant-from-channel-error'));
            });
        };
        ProductDetailComponent.prototype.customFieldIsSet = function (name) {
            return !!this.detailForm.get(['product', 'customFields', name]);
        };
        ProductDetailComponent.prototype.assetsChanged = function () {
            return !!Object.values(this.assetChanges).length;
        };
        ProductDetailComponent.prototype.variantAssetsChanged = function () {
            return !!Object.keys(this.variantAssetChanges).length;
        };
        ProductDetailComponent.prototype.variantAssetChange = function (event) {
            this.variantAssetChanges[event.variantId] = event;
        };
        /**
         * If creating a new product, automatically generate the slug based on the product name.
         */
        ProductDetailComponent.prototype.updateSlug = function (nameValue) {
            var _this = this;
            rxjs.combineLatest(this.entity$, this.languageCode$)
                .pipe(operators.take(1))
                .subscribe(function (_c) {
                var _d = __read(_c, 2), entity = _d[0], languageCode = _d[1];
                var slugControl = _this.detailForm.get(['product', 'slug']);
                var currentTranslation = i2.findTranslation(entity, languageCode);
                var currentSlugIsEmpty = !currentTranslation || !currentTranslation.slug;
                if (slugControl && slugControl.pristine && currentSlugIsEmpty) {
                    slugControl.setValue(normalizeString.normalizeString("" + nameValue, '-'));
                }
            });
        };
        ProductDetailComponent.prototype.selectProductFacetValue = function () {
            var _this = this;
            this.displayFacetValueModal().subscribe(function (facetValueIds) {
                if (facetValueIds) {
                    var productGroup = _this.getProductFormGroup();
                    var currentFacetValueIds = productGroup.value.facetValueIds;
                    productGroup.patchValue({
                        facetValueIds: unique.unique(__spread(currentFacetValueIds, facetValueIds)),
                    });
                    productGroup.markAsDirty();
                }
            });
        };
        ProductDetailComponent.prototype.updateProductOption = function (input) {
            var _this = this;
            rxjs.combineLatest(this.product$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var _d = __read(_c, 2), product = _d[0], languageCode = _d[1];
                return _this.productDetailService.updateProductOption(input, product, languageCode);
            }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'ProductOption',
                });
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'ProductOption',
                });
            });
        };
        ProductDetailComponent.prototype.removeProductFacetValue = function (facetValueId) {
            var productGroup = this.getProductFormGroup();
            var currentFacetValueIds = productGroup.value.facetValueIds;
            productGroup.patchValue({
                facetValueIds: currentFacetValueIds.filter(function (id) { return id !== facetValueId; }),
            });
            productGroup.markAsDirty();
        };
        /**
         * Opens a dialog to select FacetValues to apply to the select ProductVariants.
         */
        ProductDetailComponent.prototype.selectVariantFacetValue = function (selectedVariantIds) {
            var _this = this;
            this.displayFacetValueModal()
                .pipe(operators.withLatestFrom(this.variants$))
                .subscribe(function (_c) {
                var e_1, _d;
                var _e = __read(_c, 2), facetValueIds = _e[0], variants = _e[1];
                if (facetValueIds) {
                    var _loop_1 = function (variantId) {
                        var index = variants.findIndex(function (v) { return v.id === variantId; });
                        var variant = variants[index];
                        var existingFacetValueIds = variant ? variant.facetValues.map(function (fv) { return fv.id; }) : [];
                        var variantFormGroup = _this.detailForm.get(['variants', index]);
                        if (variantFormGroup) {
                            variantFormGroup.patchValue({
                                facetValueIds: unique.unique(__spread(existingFacetValueIds, facetValueIds)),
                            });
                            variantFormGroup.markAsDirty();
                        }
                    };
                    try {
                        for (var selectedVariantIds_1 = __values(selectedVariantIds), selectedVariantIds_1_1 = selectedVariantIds_1.next(); !selectedVariantIds_1_1.done; selectedVariantIds_1_1 = selectedVariantIds_1.next()) {
                            var variantId = selectedVariantIds_1_1.value;
                            _loop_1(variantId);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (selectedVariantIds_1_1 && !selectedVariantIds_1_1.done && (_d = selectedVariantIds_1.return)) _d.call(selectedVariantIds_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    _this.changeDetector.markForCheck();
                }
            });
        };
        ProductDetailComponent.prototype.variantsToCreateAreValid = function () {
            return (0 < this.createVariantsConfig.variants.length &&
                this.createVariantsConfig.variants.every(function (v) {
                    return v.sku !== '';
                }));
        };
        ProductDetailComponent.prototype.displayFacetValueModal = function () {
            var _this = this;
            return this.productDetailService.getFacets().pipe(operators.mergeMap(function (facets) { return _this.modalService.fromComponent(ApplyFacetDialogComponent, {
                size: 'md',
                closable: true,
                locals: { facets: facets },
            }); }), operators.map(function (facetValues) { return facetValues && facetValues.map(function (v) { return v.id; }); }));
        };
        ProductDetailComponent.prototype.create = function () {
            var _this = this;
            var productGroup = this.getProductFormGroup();
            if (!productGroup.dirty) {
                return;
            }
            rxjs.combineLatest(this.product$, this.languageCode$)
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var _d = __read(_c, 2), product = _d[0], languageCode = _d[1];
                var newProduct = _this.getUpdatedProduct(product, productGroup, languageCode);
                return _this.productDetailService.createProductWithVariants(newProduct, _this.createVariantsConfig, languageCode);
            }))
                .subscribe(function (_c) {
                var createProductVariants = _c.createProductVariants, productId = _c.productId;
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-create-success'), {
                    entity: 'Product',
                });
                _this.assetChanges = {};
                _this.variantAssetChanges = {};
                _this.detailForm.markAsPristine();
                _this.router.navigate(['../', productId], { relativeTo: _this.route });
            }, function (err) {
                // tslint:disable-next-line:no-console
                console.error(err);
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-create-error'), {
                    entity: 'Product',
                });
            });
        };
        ProductDetailComponent.prototype.save = function () {
            var _this = this;
            rxjs.combineLatest(this.product$, this.languageCode$, this.channelPriceIncludesTax$)
                .pipe(operators.take(1), operators.mergeMap(function (_c) {
                var _d = __read(_c, 3), product = _d[0], languageCode = _d[1], priceIncludesTax = _d[2];
                var _a, _b;
                var productGroup = _this.getProductFormGroup();
                var productInput;
                var variantsInput;
                if (productGroup.dirty || _this.assetsChanged()) {
                    productInput = _this.getUpdatedProduct(product, productGroup, languageCode);
                }
                var variantsArray = _this.detailForm.get('variants');
                if ((variantsArray && variantsArray.dirty) || _this.variantAssetsChanged()) {
                    variantsInput = _this.getUpdatedProductVariants(product, variantsArray, languageCode, priceIncludesTax);
                }
                return _this.productDetailService.updateProduct({
                    product: product,
                    languageCode: languageCode,
                    autoUpdate: (_b = (_a = _this.detailForm.get(['product', 'autoUpdateVariantNames'])) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : false,
                    productInput: productInput,
                    variantsInput: variantsInput,
                });
            }))
                .subscribe(function (result) {
                _this.updateSlugAfterSave(result);
                _this.detailForm.markAsPristine();
                _this.assetChanges = {};
                _this.variantAssetChanges = {};
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-update-success'), {
                    entity: 'Product',
                });
                _this.changeDetector.markForCheck();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-update-error'), {
                    entity: 'Product',
                });
            });
        };
        ProductDetailComponent.prototype.canDeactivate = function () {
            return _super.prototype.canDeactivate.call(this) && !this.assetChanges.assets && !this.assetChanges.featuredAsset;
        };
        /**
         * Sets the values of the form on changes to the product or current language.
         */
        ProductDetailComponent.prototype.setFormValues = function (product, languageCode) {
            var e_2, _c;
            var _this = this;
            var currentTranslation = i2.findTranslation(product, languageCode);
            this.detailForm.patchValue({
                product: {
                    enabled: product.enabled,
                    name: currentTranslation ? currentTranslation.name : '',
                    slug: currentTranslation ? currentTranslation.slug : '',
                    description: currentTranslation ? currentTranslation.description : '',
                    facetValueIds: product.facetValues.map(function (fv) { return fv.id; }),
                },
            });
            if (this.customFields.length) {
                var customFieldsGroup = this.detailForm.get(['product', 'customFields']);
                var cfCurrentTranslation = (currentTranslation && currentTranslation.customFields) || {};
                var cfProduct = product.customFields || {};
                try {
                    for (var _d = __values(this.customFields), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var fieldDef = _e.value;
                        var key = fieldDef.name;
                        var value = fieldDef.type === 'localeString' ? cfCurrentTranslation[key] : cfProduct[key];
                        var control = customFieldsGroup.get(key);
                        if (control) {
                            control.patchValue(value);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            var variantsFormArray = this.detailForm.get('variants');
            product.variants.forEach(function (variant, i) {
                var e_3, _c;
                var variantTranslation = i2.findTranslation(variant, languageCode);
                var facetValueIds = variant.facetValues.map(function (fv) { return fv.id; });
                var group = {
                    id: variant.id,
                    enabled: variant.enabled,
                    sku: variant.sku,
                    name: variantTranslation ? variantTranslation.name : '',
                    price: variant.price,
                    priceWithTax: variant.priceWithTax,
                    taxCategoryId: variant.taxCategory.id,
                    stockOnHand: variant.stockOnHand,
                    useGlobalOutOfStockThreshold: variant.useGlobalOutOfStockThreshold,
                    outOfStockThreshold: variant.outOfStockThreshold,
                    trackInventory: variant.trackInventory,
                    facetValueIds: facetValueIds,
                };
                var variantFormGroup = variantsFormArray.at(i);
                if (variantFormGroup) {
                    variantFormGroup.patchValue(group);
                }
                else {
                    variantFormGroup = _this.formBuilder.group(Object.assign(Object.assign({}, group), { facetValueIds: _this.formBuilder.control(facetValueIds) }));
                    variantsFormArray.insert(i, variantFormGroup);
                }
                if (_this.customVariantFields.length) {
                    var customFieldsGroup = variantFormGroup.get(['customFields']);
                    if (!customFieldsGroup) {
                        customFieldsGroup = _this.formBuilder.group(_this.customVariantFields.reduce(function (hash, field) {
                            var _c;
                            return (Object.assign(Object.assign({}, hash), (_c = {}, _c[field.name] = '', _c)));
                        }, {}));
                        variantFormGroup.addControl('customFields', customFieldsGroup);
                    }
                    try {
                        for (var _d = __values(_this.customVariantFields), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var fieldDef = _e.value;
                            var key = fieldDef.name;
                            var value = fieldDef.type === 'localeString'
                                ? variantTranslation.customFields[key]
                                : variant.customFields[key];
                            var control = customFieldsGroup.get(key);
                            if (control) {
                                control.patchValue(value);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            });
        };
        /**
         * Given a product and the value of the detailForm, this method creates an updated copy of the product which
         * can then be persisted to the API.
         */
        ProductDetailComponent.prototype.getUpdatedProduct = function (product, productFormGroup, languageCode) {
            var _a, _b;
            var updatedProduct = i2.createUpdatedTranslatable({
                translatable: product,
                updatedFields: productFormGroup.value,
                customFieldConfig: this.customFields,
                languageCode: languageCode,
                defaultTranslation: {
                    languageCode: languageCode,
                    name: product.name || '',
                    slug: product.slug || '',
                    description: product.description || '',
                },
            });
            return Object.assign(Object.assign({}, updatedProduct), { assetIds: (_a = this.assetChanges.assets) === null || _a === void 0 ? void 0 : _a.map(function (a) { return a.id; }), featuredAssetId: (_b = this.assetChanges.featuredAsset) === null || _b === void 0 ? void 0 : _b.id, facetValueIds: productFormGroup.value.facetValueIds });
        };
        /**
         * Given an array of product variants and the values from the detailForm, this method creates an new array
         * which can be persisted to the API.
         */
        ProductDetailComponent.prototype.getUpdatedProductVariants = function (product, variantsFormArray, languageCode, priceIncludesTax) {
            var _this = this;
            var dirtyVariants = product.variants.filter(function (v, i) {
                var formRow = variantsFormArray.get(i.toString());
                return formRow && formRow.dirty;
            });
            var dirtyVariantValues = variantsFormArray.controls.filter(function (c) { return c.dirty; }).map(function (c) { return c.value; });
            if (dirtyVariants.length !== dirtyVariantValues.length) {
                throw new Error(ngxTranslateExtractMarker.marker("error.product-variant-form-values-do-not-match"));
            }
            return dirtyVariants
                .map(function (variant, i) {
                var _a, _b;
                var formValue = dirtyVariantValues[i];
                var result = i2.createUpdatedTranslatable({
                    translatable: variant,
                    updatedFields: formValue,
                    customFieldConfig: _this.customVariantFields,
                    languageCode: languageCode,
                    defaultTranslation: {
                        languageCode: languageCode,
                        name: '',
                    },
                });
                result.taxCategoryId = formValue.taxCategoryId;
                result.facetValueIds = formValue.facetValueIds;
                result.price = priceIncludesTax ? formValue.priceWithTax : formValue.price;
                var assetChanges = _this.variantAssetChanges[variant.id];
                if (assetChanges) {
                    result.featuredAssetId = (_a = assetChanges.featuredAsset) === null || _a === void 0 ? void 0 : _a.id;
                    result.assetIds = (_b = assetChanges.assets) === null || _b === void 0 ? void 0 : _b.map(function (a) { return a.id; });
                }
                return result;
            })
                .filter(sharedUtils.notNullOrUndefined);
        };
        ProductDetailComponent.prototype.getProductFormGroup = function () {
            return this.detailForm.get('product');
        };
        /**
         * The server may alter the slug value in order to normalize and ensure uniqueness upon saving.
         */
        ProductDetailComponent.prototype.updateSlugAfterSave = function (results) {
            var firstResult = results[0];
            var slugControl = this.detailForm.get(['product', 'slug']);
            function isUpdateMutation(input) {
                return input.hasOwnProperty('updateProduct');
            }
            if (slugControl && isUpdateMutation(firstResult)) {
                slugControl.setValue(firstResult.updateProduct.slug, { emitEvent: false });
            }
        };
        return ProductDetailComponent;
    }(i2.BaseDetailComponent));
    ProductDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-detail',
                    template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"flex clr-flex-row\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <clr-toggle-wrapper *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\">\n                <input\n                    type=\"checkbox\"\n                    clrToggle\n                    name=\"enabled\"\n                    [formControl]=\"detailForm.get(['product', 'enabled'])\"\n                />\n                <label>{{ 'common.enabled' | translate }}</label>\n            </clr-toggle-wrapper>\n        </div>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"product-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine || !variantsToCreateAreValid()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"\n                    (detailForm.invalid || detailForm.pristine) && !assetsChanged() && !variantAssetsChanged()\n                \"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form\n    class=\"form\"\n    [formGroup]=\"detailForm\"\n    *ngIf=\"product$ | async as product\"\n    (keydown.enter)=\"$event.preventDefault()\"\n>\n    <clr-tabs>\n        <clr-tab>\n            <button clrTabLink (click)=\"navigateToTab('details')\">\n                {{ 'catalog.product-details' | translate }}\n            </button>\n            <clr-tab-content *clrIfActive=\"(activeTab$ | async) === 'details'\">\n                <div class=\"clr-row\">\n                    <div class=\"clr-col\">\n                        <section class=\"form-block\" formGroupName=\"product\">\n                            <ng-container *vdrIfMultichannel>\n                                <vdr-form-item\n                                    [label]=\"'common.channels' | translate\"\n                                    *vdrIfDefaultChannelActive\n                                >\n                                    <div class=\"flex channel-assignment\">\n                                        <ng-container *ngFor=\"let channel of productChannels$ | async\">\n                                            <vdr-chip\n                                                *ngIf=\"!isDefaultChannel(channel.code)\"\n                                                icon=\"times-circle\"\n                                                (iconClick)=\"removeFromChannel(channel.id)\"\n                                            >\n                                                <vdr-channel-badge\n                                                    [channelCode]=\"channel.code\"\n                                                ></vdr-channel-badge>\n                                                {{ channel.code | channelCodeToLabel }}\n                                            </vdr-chip>\n                                        </ng-container>\n                                        <button class=\"btn btn-sm\" (click)=\"assignToChannel()\">\n                                            <clr-icon shape=\"layers\"></clr-icon>\n                                            {{ 'catalog.assign-to-channel' | translate }}\n                                        </button>\n                                    </div>\n                                </vdr-form-item>\n                            </ng-container>\n                            <vdr-form-field [label]=\"'catalog.product-name' | translate\" for=\"name\">\n                                <input\n                                    id=\"name\"\n                                    type=\"text\"\n                                    formControlName=\"name\"\n                                    [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                    (input)=\"updateSlug($event.target.value)\"\n                                />\n                            </vdr-form-field>\n                            <div\n                                class=\"auto-rename-wrapper\"\n                                [class.visible]=\"\n                                    (isNew$ | async) === false && detailForm.get(['product', 'name'])?.dirty\n                                \"\n                            >\n                                <clr-checkbox-wrapper>\n                                    <input\n                                        clrCheckbox\n                                        type=\"checkbox\"\n                                        id=\"auto-update\"\n                                        formControlName=\"autoUpdateVariantNames\"\n                                    />\n                                    <label>{{\n                                        'catalog.auto-update-product-variant-name' | translate\n                                    }}</label>\n                                </clr-checkbox-wrapper>\n                            </div>\n                            <vdr-form-field\n                                [label]=\"'catalog.slug' | translate\"\n                                for=\"slug\"\n                                [errors]=\"{ pattern: 'catalog.slug-pattern-error' | translate }\"\n                            >\n                                <input\n                                    id=\"slug\"\n                                    type=\"text\"\n                                    formControlName=\"slug\"\n                                    [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                    pattern=\"[a-z0-9_-]+\"\n                                />\n                            </vdr-form-field>\n                            <vdr-rich-text-editor\n                                formControlName=\"description\"\n                                [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                [label]=\"'common.description' | translate\"\n                            ></vdr-rich-text-editor>\n\n                            <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n                                <label>{{ 'common.custom-fields' | translate }}</label>\n                                <ng-container *ngFor=\"let customField of customFields\">\n                                    <vdr-custom-field-control\n                                        *ngIf=\"customFieldIsSet(customField.name)\"\n                                        entityName=\"Product\"\n                                        [customFieldsFormGroup]=\"detailForm.get(['product', 'customFields'])\"\n                                        [customField]=\"customField\"\n                                        [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                                    ></vdr-custom-field-control>\n                                </ng-container>\n                            </section>\n\n                            <div class=\"facets\">\n                                <vdr-facet-value-chip\n                                    *ngFor=\"let facetValue of facetValues$ | async\"\n                                    [facetValue]=\"facetValue\"\n                                    [removable]=\"['UpdateCatalog', 'UpdateProduct'] | hasPermission\"\n                                    (remove)=\"removeProductFacetValue(facetValue.id)\"\n                                ></vdr-facet-value-chip>\n                                <button\n                                    class=\"btn btn-sm btn-secondary\"\n                                    *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\"\n                                    (click)=\"selectProductFacetValue()\"\n                                >\n                                    <clr-icon shape=\"plus\"></clr-icon>\n                                    {{ 'catalog.add-facets' | translate }}\n                                </button>\n                            </div>\n                        </section>\n                    </div>\n                    <div class=\"clr-col-md-auto\">\n                        <vdr-product-assets\n                            [assets]=\"assetChanges.assets || product.assets\"\n                            [featuredAsset]=\"assetChanges.featuredAsset || product.featuredAsset\"\n                            (change)=\"assetChanges = $event\"\n                        ></vdr-product-assets>\n                    </div>\n                </div>\n\n                <div *ngIf=\"isNew$ | async\">\n                    <h4>{{ 'catalog.product-variants' | translate }}</h4>\n                    <vdr-generate-product-variants\n                        (variantsChange)=\"createVariantsConfig = $event\"\n                    ></vdr-generate-product-variants>\n                </div>\n            </clr-tab-content>\n        </clr-tab>\n        <clr-tab *ngIf=\"!(isNew$ | async)\">\n            <button clrTabLink (click)=\"navigateToTab('variants')\">\n                {{ 'catalog.product-variants' | translate }}\n            </button>\n            <clr-tab-content *clrIfActive=\"(activeTab$ | async) === 'variants'\">\n                <section class=\"form-block\">\n                    <div class=\"view-mode\">\n                        <div class=\"btn-group\">\n                            <button\n                                class=\"btn btn-secondary-outline\"\n                                (click)=\"variantDisplayMode = 'card'\"\n                                [class.btn-primary]=\"variantDisplayMode === 'card'\"\n                            >\n                                <clr-icon shape=\"list\"></clr-icon>\n                                {{ 'catalog.display-variant-cards' | translate }}\n                            </button>\n                            <button\n                                class=\"btn\"\n                                (click)=\"variantDisplayMode = 'table'\"\n                                [class.btn-primary]=\"variantDisplayMode === 'table'\"\n                            >\n                                <clr-icon shape=\"table\"></clr-icon>\n                                {{ 'catalog.display-variant-table' | translate }}\n                            </button>\n                        </div>\n                        <div class=\"variant-filter\">\n                            <input\n                                [formControl]=\"filterInput\"\n                                [placeholder]=\"'catalog.filter-by-name-or-sku' | translate\"\n                            />\n                            <button class=\"icon-button\" (click)=\"filterInput.setValue('')\">\n                                <clr-icon shape=\"times\"></clr-icon>\n                            </button>\n                        </div>\n                        <div class=\"flex-spacer\"></div>\n                        <a\n                            *vdrIfPermissions=\"['UpdateCatalog', 'UpdateProduct']\"\n                            [routerLink]=\"['./', 'manage-variants']\"\n                            class=\"btn btn-secondary edit-variants-btn\"\n                        >\n                            <clr-icon shape=\"add-text\"></clr-icon>\n                            {{ 'catalog.manage-variants' | translate }}\n                        </a>\n                    </div>\n\n                    <vdr-product-variants-table\n                        *ngIf=\"variantDisplayMode === 'table'\"\n                        [variants]=\"variants$ | async\"\n                        [optionGroups]=\"product.optionGroups\"\n                        [channelPriceIncludesTax]=\"channelPriceIncludesTax$ | async\"\n                        [productVariantsFormArray]=\"detailForm.get('variants')\"\n                        [pendingAssetChanges]=\"variantAssetChanges\"\n                    ></vdr-product-variants-table>\n                    <vdr-product-variants-list\n                        *ngIf=\"variantDisplayMode === 'card'\"\n                        [variants]=\"variants$ | async\"\n                        [channelPriceIncludesTax]=\"channelPriceIncludesTax$ | async\"\n                        [facets]=\"facets$ | async\"\n                        [optionGroups]=\"product.optionGroups\"\n                        [productVariantsFormArray]=\"detailForm.get('variants')\"\n                        [taxCategories]=\"taxCategories$ | async\"\n                        [customFields]=\"customVariantFields\"\n                        [customOptionFields]=\"customOptionFields\"\n                        [activeLanguage]=\"languageCode$ | async\"\n                        [pendingAssetChanges]=\"variantAssetChanges\"\n                        (assignToChannel)=\"assignVariantToChannel($event)\"\n                        (removeFromChannel)=\"removeVariantFromChannel($event)\"\n                        (assetChange)=\"variantAssetChange($event)\"\n                        (updateProductOption)=\"updateProductOption($event)\"\n                        (selectionChange)=\"selectedVariantIds = $event\"\n                        (selectFacetValueClick)=\"selectVariantFacetValue($event)\"\n                    ></vdr-product-variants-list>\n                </section>\n            </clr-tab-content>\n        </clr-tab>\n    </clr-tabs>\n</form>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host ::ng-deep trix-toolbar{top:24px}vdr-action-bar clr-toggle-wrapper{margin-top:12px}.variant-filter{flex:1;display:flex}.variant-filter input{flex:1;max-width:none;border-radius:3px 0 0 3px!important}.variant-filter .icon-button{border:1px solid var(--color-component-border-300);background-color:var(--color-component-bg-100);border-radius:0 3px 3px 0;border-left:none}.group-name{padding-right:6px}.view-mode{display:flex;justify-content:flex-end;align-items:center}.edit-variants-btn{margin-top:0}.channel-assignment{flex-wrap:wrap}.auto-rename-wrapper{overflow:hidden;max-height:0;padding-left:9.5rem;margin-bottom:0;transition:max-height .2s,margin-bottom .2s}.auto-rename-wrapper.visible{max-height:24px;margin-bottom:12px}"]
                },] }
    ];
    ProductDetailComponent.ctorParameters = function () { return [
        { type: i1.ActivatedRoute },
        { type: i1.Router },
        { type: i2.ServerConfigService },
        { type: ProductDetailService },
        { type: forms.FormBuilder },
        { type: i2.ModalService },
        { type: i2.NotificationService },
        { type: i2.DataService },
        { type: common.Location },
        { type: i0.ChangeDetectorRef }
    ]; };

    var ProductListComponent = /** @class */ (function (_super) {
        __extends(ProductListComponent, _super);
        function ProductListComponent(dataService, modalService, notificationService, jobQueueService, router, route) {
            var _this = _super.call(this, router, route) || this;
            _this.dataService = dataService;
            _this.modalService = modalService;
            _this.notificationService = notificationService;
            _this.jobQueueService = jobQueueService;
            _this.searchTerm = '';
            _this.facetValueIds = [];
            _this.groupByProduct = true;
            _super.prototype.setQueryFn.call(_this, function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (_a = _this.dataService.product).searchProducts.apply(_a, __spread([_this.searchTerm], args)).refetchOnChannelChange();
            }, function (data) { return data.search; }, 
            // tslint:disable-next-line:no-shadowed-variable
            function (skip, take) { return ({
                input: {
                    skip: skip,
                    take: take,
                    term: _this.searchTerm,
                    facetValueIds: _this.facetValueIds,
                    facetValueOperator: i2.LogicalOperator.AND,
                    groupByProduct: _this.groupByProduct,
                },
            }); });
            return _this;
        }
        ProductListComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.facetValues$ = this.result$.pipe(operators.map(function (data) { return data.search.facetValues; }));
            // this.facetValues$ = of([]);
            this.route.queryParamMap
                .pipe(operators.map(function (qpm) { return qpm.get('q'); }), operators.takeUntil(this.destroy$))
                .subscribe(function (term) {
                _this.productSearchInput.setSearchTerm(term);
            });
            var fvids$ = this.route.queryParamMap.pipe(operators.map(function (qpm) { return qpm.getAll('fvids'); }));
            fvids$.pipe(operators.takeUntil(this.destroy$)).subscribe(function (ids) {
                _this.productSearchInput.setFacetValues(ids);
            });
            this.facetValues$.pipe(operators.take(1), operators.delay(100), operators.withLatestFrom(fvids$)).subscribe(function (_a) {
                var _b = __read(_a, 2), __ = _b[0], ids = _b[1];
                _this.productSearchInput.setFacetValues(ids);
            });
        };
        ProductListComponent.prototype.setSearchTerm = function (term) {
            this.searchTerm = term;
            this.setQueryParam({ q: term || null, page: 1 });
            this.refresh();
        };
        ProductListComponent.prototype.setFacetValueIds = function (ids) {
            this.facetValueIds = ids;
            this.setQueryParam({ fvids: ids, page: 1 });
            this.refresh();
        };
        ProductListComponent.prototype.rebuildSearchIndex = function () {
            var _this = this;
            this.dataService.product.reindex().subscribe(function (_a) {
                var reindex = _a.reindex;
                _this.notificationService.info(ngxTranslateExtractMarker.marker('catalog.reindexing'));
                _this.jobQueueService.addJob(reindex.id, function (job) {
                    if (job.state === i2.JobState.COMPLETED) {
                        var time = new Intl.NumberFormat().format(job.duration || 0);
                        _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.reindex-successful'), {
                            count: job.result.indexedItemCount,
                            time: time,
                        });
                        _this.refresh();
                    }
                    else {
                        _this.notificationService.error(ngxTranslateExtractMarker.marker('catalog.reindex-error'));
                    }
                });
            });
        };
        ProductListComponent.prototype.deleteProduct = function (productId) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-product'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return (response ? _this.dataService.product.deleteProduct(productId) : rxjs.EMPTY); }), 
            // Short delay to allow the product to be removed from the search index before
            // refreshing.
            operators.delay(500))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'Product',
                });
                _this.refresh();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'Product',
                });
            });
        };
        return ProductListComponent;
    }(i2.BaseListComponent));
    ProductListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-products-list',
                    template: "<vdr-action-bar>\n    <vdr-ab-left [grow]=\"true\">\n        <div class=\"search-form\">\n            <vdr-product-search-input\n                #productSearchInputComponent\n                [facetValueResults]=\"facetValues$ | async\"\n                (searchTermChange)=\"setSearchTerm($event)\"\n                (facetValueChange)=\"setFacetValueIds($event)\"\n            ></vdr-product-search-input>\n            <vdr-dropdown class=\"search-settings-menu mr3\">\n                <button type=\"button\" class=\"icon-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"cog\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        (click)=\"rebuildSearchIndex()\"\n                        [disabled]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n                    >\n                        {{ 'catalog.rebuild-search-index' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n        <clr-checkbox-wrapper>\n            <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"groupByProduct\" />\n            <label>{{ 'catalog.group-by-product' | translate }}</label>\n        </clr-checkbox-wrapper>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"product-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"['CreateCatalog', 'CreateProduct']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            <span class=\"full-label\">{{ 'catalog.create-new-product' | translate }}</span>\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"items$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <ng-template let-result=\"item\">\n        <td class=\"left align-middle\" [class.disabled]=\"!result.enabled\">\n            <div class=\"image-placeholder\">\n                <img\n                    *ngIf=\"\n                        groupByProduct\n                            ? result.productAsset\n                            : result.productVariantAsset || result.productAsset as asset;\n                        else imagePlaceholder\n                    \"\n                    [src]=\"asset | assetPreview:'tiny'\"\n                />\n                <ng-template #imagePlaceholder>\n                    <div class=\"placeholder\"><clr-icon shape=\"image\" size=\"48\"></clr-icon></div>\n                </ng-template>\n            </div>\n        </td>\n        <td class=\"left align-middle\" [class.disabled]=\"!result.enabled\">\n            {{ groupByProduct ? result.productName : result.productVariantName }}\n        </td>\n        <td class=\"align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-chip *ngIf=\"!result.enabled\">{{ 'common.disabled' | translate }}</vdr-chip>\n        </td>\n        <td class=\"right align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', result.productId]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\" [class.disabled]=\"!result.enabled\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteProduct(result.productId)\"\n                        [disabled]=\"!(['DeleteCatalog', 'DeleteProduct'] | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    styles: [".image-placeholder{width:50px;height:50px;background-color:var(--color-component-bg-200)}.image-placeholder .placeholder{text-align:center;color:var(--color-grey-300)}.search-form{display:flex;align-items:center;width:100%;margin-bottom:6px}.search-input{min-width:300px}@media screen and (max-width:768px){.search-input{min-width:100px}}.search-settings-menu{margin:0 12px}td.disabled{background-color:var(--color-component-bg-200)}"]
                },] }
    ];
    ProductListComponent.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i2.ModalService },
        { type: i2.NotificationService },
        { type: i2.JobQueueService },
        { type: i1.Router },
        { type: i1.ActivatedRoute }
    ]; };
    ProductListComponent.propDecorators = {
        productSearchInput: [{ type: i0.ViewChild, args: ['productSearchInputComponent', { static: true },] }]
    };

    var GeneratedVariant = /** @class */ (function () {
        function GeneratedVariant(config) {
            var e_1, _d;
            try {
                for (var _e = __values(Object.keys(config)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var key = _f.value;
                    this[key] = config[key];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return GeneratedVariant;
    }());
    var ProductVariantsEditorComponent = /** @class */ (function () {
        function ProductVariantsEditorComponent(route, dataService, productDetailService, notificationService, modalService) {
            this.route = route;
            this.dataService = dataService;
            this.productDetailService = productDetailService;
            this.notificationService = notificationService;
            this.modalService = modalService;
            this.formValueChanged = false;
            this.generatedVariants = [];
        }
        ProductVariantsEditorComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.initOptionsAndVariants();
            this.languageCode =
                this.route.snapshot.paramMap.get('lang') || i2.getDefaultUiLanguage();
            this.dataService.settings.getActiveChannel().single$.subscribe(function (data) {
                _this.currencyCode = data.activeChannel.currencyCode;
            });
        };
        ProductVariantsEditorComponent.prototype.onFormChanged = function (variantInfo) {
            this.formValueChanged = true;
            variantInfo.enabled = true;
        };
        ProductVariantsEditorComponent.prototype.canDeactivate = function () {
            return !this.formValueChanged;
        };
        ProductVariantsEditorComponent.prototype.getVariantsToAdd = function () {
            return this.generatedVariants.filter(function (v) { return !v.existing && v.enabled; });
        };
        ProductVariantsEditorComponent.prototype.getVariantName = function (variant) {
            return variant.options.length === 0
                ? ngxTranslateExtractMarker.marker('catalog.default-variant')
                : variant.options.map(function (o) { return o.name; }).join(' ');
        };
        ProductVariantsEditorComponent.prototype.addOption = function () {
            this.optionGroups.push({
                isNew: true,
                name: '',
                values: [],
            });
        };
        ProductVariantsEditorComponent.prototype.generateVariants = function () {
            var _this = this;
            var groups = this.optionGroups.map(function (g) { return g.values; });
            var previousVariants = this.generatedVariants;
            var generatedVariantFactory = function (isDefault, options, existingVariant) {
                var _a, _b, _c;
                var prototype = _this.getVariantPrototype(options, previousVariants);
                return new GeneratedVariant({
                    enabled: false,
                    existing: !!existingVariant,
                    productVariantId: existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.id,
                    isDefault: isDefault,
                    options: options,
                    price: (_a = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.price) !== null && _a !== void 0 ? _a : prototype.price,
                    sku: (_b = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.sku) !== null && _b !== void 0 ? _b : prototype.sku,
                    stock: (_c = existingVariant === null || existingVariant === void 0 ? void 0 : existingVariant.stockOnHand) !== null && _c !== void 0 ? _c : prototype.stock,
                });
            };
            this.generatedVariants = groups.length
                ? sharedUtils.generateAllCombinations(groups).map(function (options) {
                    var existingVariant = _this.product.variants.find(function (v) { return _this.optionsAreEqual(v.options, options); });
                    return generatedVariantFactory(false, options, existingVariant);
                })
                : [generatedVariantFactory(true, [], this.product.variants[0])];
        };
        /**
         * Returns one of the existing variants to base the newly-generated variant's
         * details off.
         */
        ProductVariantsEditorComponent.prototype.getVariantPrototype = function (options, previousVariants) {
            var variantsWithSimilarOptions = previousVariants.filter(function (v) { return options.map(function (o) { return o.name; }).filter(function (name) { return v.options.map(function (o) { return o.name; }).includes(name); }); });
            if (variantsWithSimilarOptions.length) {
                return pick.pick(previousVariants[0], ['sku', 'price', 'stock']);
            }
            return {
                sku: '',
                price: 0,
                stock: 0,
            };
        };
        ProductVariantsEditorComponent.prototype.deleteVariant = function (id) {
            var _this = this;
            this.modalService
                .dialog({
                title: ngxTranslateExtractMarker.marker('catalog.confirm-delete-product-variant'),
                buttons: [
                    { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                    { type: 'danger', label: ngxTranslateExtractMarker.marker('common.delete'), returnValue: true },
                ],
            })
                .pipe(operators.switchMap(function (response) { return response ? _this.productDetailService.deleteProductVariant(id, _this.product.id) : rxjs.EMPTY; }), operators.switchMap(function () { return _this.reFetchProduct(null); }))
                .subscribe(function () {
                _this.notificationService.success(ngxTranslateExtractMarker.marker('common.notify-delete-success'), {
                    entity: 'ProductVariant',
                });
                _this.initOptionsAndVariants();
            }, function (err) {
                _this.notificationService.error(ngxTranslateExtractMarker.marker('common.notify-delete-error'), {
                    entity: 'ProductVariant',
                });
            });
        };
        ProductVariantsEditorComponent.prototype.save = function () {
            var _this = this;
            var newOptionGroups = this.optionGroups
                .filter(function (og) { return og.isNew; })
                .map(function (og) { return ({
                name: og.name,
                values: [],
            }); });
            this.confirmDeletionOfDefault()
                .pipe(operators.mergeMap(function () { return _this.productDetailService.createProductOptionGroups(newOptionGroups, _this.languageCode); }), operators.mergeMap(function (createdOptionGroups) { return _this.addOptionGroupsToProduct(createdOptionGroups); }), operators.mergeMap(function (createdOptionGroups) { return _this.addNewOptionsToGroups(createdOptionGroups); }), operators.mergeMap(function (groupsIds) { return _this.fetchOptionGroups(groupsIds); }), operators.mergeMap(function (groups) { return _this.createNewProductVariants(groups); }), operators.mergeMap(function (res) { return _this.deleteDefaultVariant(res.createProductVariants); }), operators.mergeMap(function (variants) { return _this.reFetchProduct(variants); }))
                .subscribe({
                next: function (variants) {
                    _this.formValueChanged = false;
                    _this.notificationService.success(ngxTranslateExtractMarker.marker('catalog.created-new-variants-success'), {
                        count: variants.length,
                    });
                    _this.initOptionsAndVariants();
                },
            });
        };
        ProductVariantsEditorComponent.prototype.confirmDeletionOfDefault = function () {
            if (this.hasOnlyDefaultVariant(this.product)) {
                return this.modalService
                    .dialog({
                    title: ngxTranslateExtractMarker.marker('catalog.confirm-adding-options-delete-default-title'),
                    body: ngxTranslateExtractMarker.marker('catalog.confirm-adding-options-delete-default-body'),
                    buttons: [
                        { type: 'secondary', label: ngxTranslateExtractMarker.marker('common.cancel') },
                        { type: 'danger', label: ngxTranslateExtractMarker.marker('catalog.delete-default-variant'), returnValue: true },
                    ],
                })
                    .pipe(operators.mergeMap(function (res) {
                    return res === true ? rxjs.of(true) : rxjs.EMPTY;
                }));
            }
            else {
                return rxjs.of(true);
            }
        };
        ProductVariantsEditorComponent.prototype.hasOnlyDefaultVariant = function (product) {
            return product.variants.length === 1 && product.optionGroups.length === 0;
        };
        ProductVariantsEditorComponent.prototype.addOptionGroupsToProduct = function (createdOptionGroups) {
            var _this = this;
            if (createdOptionGroups.length) {
                return rxjs.forkJoin(createdOptionGroups.map(function (optionGroup) {
                    return _this.dataService.product.addOptionGroupToProduct({
                        productId: _this.product.id,
                        optionGroupId: optionGroup.id,
                    });
                })).pipe(operators.map(function () { return createdOptionGroups; }));
            }
            else {
                return rxjs.of([]);
            }
        };
        ProductVariantsEditorComponent.prototype.addNewOptionsToGroups = function (createdOptionGroups) {
            var _this = this;
            var newOptions = this.optionGroups
                .map(function (og) {
                var createdGroup = createdOptionGroups.find(function (cog) { return cog.name === og.name; });
                var productOptionGroupId = createdGroup ? createdGroup.id : og.id;
                if (!productOptionGroupId) {
                    throw new Error('Could not get a productOptionGroupId');
                }
                return og.values
                    .filter(function (v) { return !v.locked; })
                    .map(function (v) { return ({
                    productOptionGroupId: productOptionGroupId,
                    code: normalizeString.normalizeString(v.name, '-'),
                    translations: [{ name: v.name, languageCode: _this.languageCode }],
                }); });
            })
                .reduce(function (flat, options) { return __spread(flat, options); }, []);
            var allGroupIds = __spread(createdOptionGroups.map(function (g) { return g.id; }), this.optionGroups.map(function (g) { return g.id; }).filter(sharedUtils.notNullOrUndefined));
            if (newOptions.length) {
                return rxjs.forkJoin(newOptions.map(function (input) { return _this.dataService.product.addOptionToGroup(input); })).pipe(operators.map(function () { return allGroupIds; }));
            }
            else {
                return rxjs.of(allGroupIds);
            }
        };
        ProductVariantsEditorComponent.prototype.fetchOptionGroups = function (groupsIds) {
            var _this = this;
            return rxjs.forkJoin(groupsIds.map(function (id) { return _this.dataService.product
                .getProductOptionGroup(id)
                .mapSingle(function (data) { return data.productOptionGroup; })
                .pipe(operators.filter(sharedUtils.notNullOrUndefined)); }));
        };
        ProductVariantsEditorComponent.prototype.createNewProductVariants = function (groups) {
            var options = groups
                .filter(sharedUtils.notNullOrUndefined)
                .map(function (og) { return og.options; })
                .reduce(function (flat, o) { return __spread(flat, o); }, []);
            var variants = this.generatedVariants
                .filter(function (v) { return v.enabled && !v.existing; })
                .map(function (v) { return ({
                price: v.price,
                sku: v.sku,
                stock: v.stock,
                optionIds: v.options
                    .map(function (name) { return options.find(function (o) { return o.name === name.name; }); })
                    .filter(sharedUtils.notNullOrUndefined)
                    .map(function (o) { return o.id; }),
            }); });
            return this.productDetailService.createProductVariants(this.product, variants, options, this.languageCode);
        };
        ProductVariantsEditorComponent.prototype.deleteDefaultVariant = function (input) {
            if (this.hasOnlyDefaultVariant(this.product)) {
                // If the default single product variant has been replaced by multiple variants,
                // delete the original default variant.
                return this.dataService.product
                    .deleteProductVariant(this.product.variants[0].id)
                    .pipe(operators.map(function () { return input; }));
            }
            else {
                return rxjs.of(input);
            }
        };
        ProductVariantsEditorComponent.prototype.reFetchProduct = function (input) {
            // Re-fetch the Product to force an update to the view.
            var id = this.route.snapshot.paramMap.get('id');
            if (id) {
                return this.dataService.product.getProduct(id).single$.pipe(operators.map(function () { return input; }));
            }
            else {
                return rxjs.of(input);
            }
        };
        ProductVariantsEditorComponent.prototype.initOptionsAndVariants = function () {
            var _this = this;
            this.dataService.product
                // tslint:disable-next-line:no-non-null-assertion
                .getProductVariantsOptions(this.route.snapshot.paramMap.get('id'))
                // tslint:disable-next-line:no-non-null-assertion
                .mapSingle(function (_d) {
                var product = _d.product;
                return product;
            })
                .subscribe(function (p) {
                _this.product = p;
                _this.optionGroups = p.optionGroups.map(function (og) {
                    return {
                        id: og.id,
                        isNew: false,
                        name: og.name,
                        values: og.options.map(function (o) { return ({
                            id: o.id,
                            name: o.name,
                            locked: true,
                        }); }),
                    };
                });
                _this.generateVariants();
            });
        };
        ProductVariantsEditorComponent.prototype.optionsAreEqual = function (a, b) {
            function toOptionString(o) {
                return o
                    .map(function (x) { return x.name; })
                    .sort()
                    .join('|');
            }
            return toOptionString(a) === toOptionString(b);
        };
        return ProductVariantsEditorComponent;
    }());
    ProductVariantsEditorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-variants-editor',
                    template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <button\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"!formValueChanged || getVariantsToAdd().length === 0\"\n        >\n            {{ 'common.add-new-variants' | translate: { count: getVariantsToAdd().length } }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<div *ngFor=\"let group of optionGroups\" class=\"option-groups\">\n    <div class=\"name\">\n        <label>{{ 'catalog.option' | translate }}</label>\n        <input clrInput [(ngModel)]=\"group.name\" name=\"name\" [readonly]=\"!group.isNew\" />\n    </div>\n    <div class=\"values\">\n        <label>{{ 'catalog.option-values' | translate }}</label>\n        <vdr-option-value-input\n            #optionValueInputComponent\n            [(ngModel)]=\"group.values\"\n            (ngModelChange)=\"generateVariants()\"\n            [groupName]=\"group.name\"\n            [disabled]=\"group.name === ''\"\n        ></vdr-option-value-input>\n    </div>\n</div>\n<button\n    class=\"btn btn-primary-outline btn-sm\"\n    (click)=\"addOption()\"\n    *ngIf=\"product?.variants.length === 1 && product?.optionGroups.length === 0\"\n>\n    <clr-icon shape=\"plus\"></clr-icon>\n    {{ 'catalog.add-option' | translate }}\n</button>\n\n<div class=\"variants-preview\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th>{{ 'common.create' | translate }}</th>\n                <th>{{ 'catalog.variant' | translate }}</th>\n                <th>{{ 'catalog.sku' | translate }}</th>\n                <th>{{ 'catalog.price' | translate }}</th>\n                <th>{{ 'catalog.stock-on-hand' | translate }}</th>\n                <th></th>\n            </tr>\n        </thead>\n        <tr *ngFor=\"let variant of generatedVariants\" [class.disabled]=\"!variant.enabled || variant.existing\">\n            <td>\n                <input\n                    type=\"checkbox\"\n                    *ngIf=\"!variant.existing\"\n                    [(ngModel)]=\"variant.enabled\"\n                    name=\"enabled\"\n                    clrCheckbox\n                    (ngModelChange)=\"formValueChanged = true\"\n                />\n            </td>\n            <td>\n                {{ getVariantName(variant) | translate }}\n            </td>\n            <td>\n                <clr-input-container *ngIf=\"!variant.existing\">\n                    <input\n                        clrInput\n                        type=\"text\"\n                        [(ngModel)]=\"variant.sku\"\n                        [placeholder]=\"'catalog.sku' | translate\"\n                        name=\"sku\"\n                        required\n                        (ngModelChange)=\"onFormChanged(variant)\"\n                    />\n                </clr-input-container>\n                <span *ngIf=\"variant.existing\">{{ variant.sku }}</span>\n            </td>\n            <td>\n                <clr-input-container *ngIf=\"!variant.existing\">\n                    <vdr-currency-input\n                        clrInput\n                        [(ngModel)]=\"variant.price\"\n                        name=\"price\"\n                        [currencyCode]=\"currencyCode\"\n                        (ngModelChange)=\"onFormChanged(variant)\"\n                    ></vdr-currency-input>\n                </clr-input-container>\n                <span *ngIf=\"variant.existing\">{{ variant.price | localeCurrency: currencyCode }}</span>\n            </td>\n            <td>\n                <clr-input-container *ngIf=\"!variant.existing\">\n                    <input\n                        clrInput\n                        type=\"number\"\n                        [(ngModel)]=\"variant.stock\"\n                        name=\"stock\"\n                        min=\"0\"\n                        step=\"1\"\n                        (ngModelChange)=\"onFormChanged(variant)\"\n                    />\n                </clr-input-container>\n                <span *ngIf=\"variant.existing\">{{ variant.stock }}</span>\n            </td>\n            <td>\n                <vdr-dropdown *ngIf=\"variant.productVariantId as productVariantId\">\n                    <button class=\"icon-button\" vdrDropdownTrigger>\n                        <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                        <button\n                            type=\"button\"\n                            class=\"delete-button\"\n                            (click)=\"deleteVariant(productVariantId)\"\n                            vdrDropdownItem\n                        >\n                            <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                            {{ 'common.delete' | translate }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </td>\n        </tr>\n    </table>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.Default,
                    styles: [".option-groups{display:flex}.option-groups:first-of-type{margin-top:24px}.values{flex:1;margin:0 6px}.variants-preview tr.disabled td{background-color:var(--color-component-bg-100);color:var(--color-grey-400)}"]
                },] }
    ];
    ProductVariantsEditorComponent.ctorParameters = function () { return [
        { type: i1.ActivatedRoute },
        { type: i2.DataService },
        { type: ProductDetailService },
        { type: i2.NotificationService },
        { type: i2.ModalService }
    ]; };

    var AssetResolver = /** @class */ (function (_super) {
        __extends(AssetResolver, _super);
        function AssetResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Asset',
                id: '',
                createdAt: '',
                updatedAt: '',
                name: '',
                type: i2.AssetType.IMAGE,
                fileSize: 0,
                mimeType: '',
                width: 0,
                height: 0,
                source: '',
                preview: '',
                focalPoint: null,
            }, function (id) { return dataService.product.getAsset(id).mapStream(function (data) { return data.asset; }); }) || this;
        }
        return AssetResolver;
    }(i2.BaseEntityResolver));
    AssetResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function AssetResolver_Factory() { return new AssetResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: AssetResolver, providedIn: "root" });
    AssetResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    AssetResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var CollectionResolver = /** @class */ (function (_super) {
        __extends(CollectionResolver, _super);
        function CollectionResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Collection',
                id: '',
                createdAt: '',
                updatedAt: '',
                languageCode: i2.getDefaultUiLanguage(),
                name: '',
                slug: '',
                isPrivate: false,
                description: '',
                featuredAsset: null,
                assets: [],
                translations: [],
                filters: [],
                parent: {},
                children: null,
            }, function (id) { return dataService.collection.getCollection(id).mapStream(function (data) { return data.collection; }); }) || this;
        }
        return CollectionResolver;
    }(i2.BaseEntityResolver));
    CollectionResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function CollectionResolver_Factory() { return new CollectionResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: CollectionResolver, providedIn: "root" });
    CollectionResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    CollectionResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var FacetResolver = /** @class */ (function (_super) {
        __extends(FacetResolver, _super);
        function FacetResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Facet',
                id: '',
                createdAt: '',
                updatedAt: '',
                isPrivate: false,
                languageCode: i2.getDefaultUiLanguage(),
                name: '',
                code: '',
                translations: [],
                values: [],
            }, function (id) { return dataService.facet.getFacet(id).mapStream(function (data) { return data.facet; }); }) || this;
        }
        return FacetResolver;
    }(i2.BaseEntityResolver));
    FacetResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function FacetResolver_Factory() { return new FacetResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: FacetResolver, providedIn: "root" });
    FacetResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    FacetResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var ProductResolver = /** @class */ (function (_super) {
        __extends(ProductResolver, _super);
        function ProductResolver(dataService, router) {
            return _super.call(this, router, {
                __typename: 'Product',
                id: '',
                createdAt: '',
                updatedAt: '',
                enabled: true,
                languageCode: i2.getDefaultUiLanguage(),
                name: '',
                slug: '',
                featuredAsset: null,
                assets: [],
                description: '',
                translations: [],
                optionGroups: [],
                facetValues: [],
                variants: [],
                channels: [],
            }, function (id) { return dataService.product
                .getProduct(id)
                .refetchOnChannelChange()
                .mapStream(function (data) { return data.product; }); }) || this;
        }
        return ProductResolver;
    }(i2.BaseEntityResolver));
    ProductResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ProductResolver_Factory() { return new ProductResolver(i0.ɵɵinject(i2.DataService), i0.ɵɵinject(i1.Router)); }, token: ProductResolver, providedIn: "root" });
    ProductResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ProductResolver.ctorParameters = function () { return [
        { type: i2.DataService },
        { type: i1.Router }
    ]; };

    var ProductVariantsResolver = /** @class */ (function (_super) {
        __extends(ProductVariantsResolver, _super);
        function ProductVariantsResolver(router, dataService) {
            return _super.call(this, router, {
                __typename: 'Product',
                id: '',
                createdAt: '',
                updatedAt: '',
                name: '',
                optionGroups: [],
                variants: [],
            }, function (id) { return dataService.product.getProductVariantsOptions(id).mapStream(function (data) { return data.product; }); }) || this;
        }
        return ProductVariantsResolver;
    }(i2.BaseEntityResolver));
    ProductVariantsResolver.ɵprov = i0.ɵɵdefineInjectable({ factory: function ProductVariantsResolver_Factory() { return new ProductVariantsResolver(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.DataService)); }, token: ProductVariantsResolver, providedIn: "root" });
    ProductVariantsResolver.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    ProductVariantsResolver.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.DataService }
    ]; };

    var ɵ0$1 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.products'),
    }, ɵ1 = {
        breadcrumb: productBreadcrumb,
    }, ɵ2 = {
        breadcrumb: productVariantEditorBreadcrumb,
    }, ɵ3 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.facets'),
    }, ɵ4 = {
        breadcrumb: facetBreadcrumb,
    }, ɵ5 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.collections'),
    }, ɵ6 = {
        breadcrumb: collectionBreadcrumb,
    }, ɵ7 = {
        breadcrumb: ngxTranslateExtractMarker.marker('breadcrumb.assets'),
    }, ɵ8 = {
        breadcrumb: assetBreadcrumb,
    };
    var catalogRoutes = [
        {
            path: 'products',
            component: ProductListComponent,
            data: ɵ0$1,
        },
        {
            path: 'products/:id',
            component: ProductDetailComponent,
            resolve: i2.createResolveData(ProductResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ1,
        },
        {
            path: 'products/:id/manage-variants',
            component: ProductVariantsEditorComponent,
            resolve: i2.createResolveData(ProductVariantsResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ2,
        },
        {
            path: 'facets',
            component: FacetListComponent,
            data: ɵ3,
        },
        {
            path: 'facets/:id',
            component: FacetDetailComponent,
            resolve: i2.createResolveData(FacetResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ4,
        },
        {
            path: 'collections',
            component: CollectionListComponent,
            data: ɵ5,
        },
        {
            path: 'collections/:id',
            component: CollectionDetailComponent,
            resolve: i2.createResolveData(CollectionResolver),
            canDeactivate: [i2.CanDeactivateDetailGuard],
            data: ɵ6,
        },
        {
            path: 'assets',
            component: AssetListComponent,
            data: ɵ7,
        },
        {
            path: 'assets/:id',
            component: AssetDetailComponent,
            resolve: i2.createResolveData(AssetResolver),
            data: ɵ8,
        },
    ];
    function productBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.products',
            getName: function (product) { return product.name; },
            route: 'products',
        });
    }
    function productVariantEditorBreadcrumb(data, params) {
        return data.entity.pipe(operators.map(function (entity) {
            return [
                {
                    label: ngxTranslateExtractMarker.marker('breadcrumb.products'),
                    link: ['../', 'products'],
                },
                {
                    label: "" + entity.name,
                    link: ['../', 'products', params.id, { tab: 'variants' }],
                },
                {
                    label: ngxTranslateExtractMarker.marker('breadcrumb.manage-variants'),
                    link: ['manage-variants'],
                },
            ];
        }));
    }
    function facetBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.facets',
            getName: function (facet) { return facet.name; },
            route: 'facets',
        });
    }
    function collectionBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.collections',
            getName: function (collection) { return collection.name; },
            route: 'collections',
        });
    }
    function assetBreadcrumb(data, params) {
        return i2.detailBreadcrumb({
            entity: data.entity,
            id: params.id,
            breadcrumbKey: 'breadcrumb.assets',
            getName: function (asset) { return asset.name; },
            route: 'assets',
        });
    }

    var CollectionContentsComponent = /** @class */ (function () {
        function CollectionContentsComponent(route, router, dataService) {
            this.route = route;
            this.router = router;
            this.dataService = dataService;
            this.filterTermControl = new forms.FormControl('');
            this.collectionIdChange$ = new rxjs.BehaviorSubject('');
            this.refresh$ = new rxjs.BehaviorSubject(true);
            this.destroy$ = new rxjs.Subject();
        }
        CollectionContentsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.contentsCurrentPage$ = this.route.paramMap.pipe(operators.map(function (qpm) { return qpm.get('contentsPage'); }), operators.map(function (page) { return (!page ? 1 : +page); }), operators.startWith(1), operators.distinctUntilChanged());
            this.contentsItemsPerPage$ = this.route.paramMap.pipe(operators.map(function (qpm) { return qpm.get('contentsPerPage'); }), operators.map(function (perPage) { return (!perPage ? 10 : +perPage); }), operators.startWith(10), operators.distinctUntilChanged());
            var filterTerm$ = this.filterTermControl.valueChanges.pipe(operators.debounceTime(250), operators.tap(function () { return _this.setContentsPageNumber(1); }), operators.startWith(''));
            var collection$ = rxjs.combineLatest(this.collectionIdChange$, this.contentsCurrentPage$, this.contentsItemsPerPage$, filterTerm$, this.refresh$).pipe(operators.takeUntil(this.destroy$), operators.switchMap(function (_a) {
                var _b = __read(_a, 4), id = _b[0], currentPage = _b[1], itemsPerPage = _b[2], filterTerm = _b[3];
                var take = itemsPerPage;
                var skip = (currentPage - 1) * itemsPerPage;
                if (id) {
                    return _this.dataService.collection
                        .getCollectionContents(id, take, skip, filterTerm)
                        .mapSingle(function (data) { return data.collection; });
                }
                else {
                    return rxjs.of(null);
                }
            }));
            this.contents$ = collection$.pipe(operators.map(function (result) { return (result ? result.productVariants.items : []); }));
            this.contentsTotalItems$ = collection$.pipe(operators.map(function (result) { return (result ? result.productVariants.totalItems : 0); }));
        };
        CollectionContentsComponent.prototype.ngOnChanges = function (changes) {
            if ('collectionId' in changes) {
                this.collectionIdChange$.next(changes.collectionId.currentValue);
            }
        };
        CollectionContentsComponent.prototype.ngOnDestroy = function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        CollectionContentsComponent.prototype.setContentsPageNumber = function (page) {
            this.setParam('contentsPage', page);
        };
        CollectionContentsComponent.prototype.setContentsItemsPerPage = function (perPage) {
            this.setParam('contentsPerPage', perPage);
        };
        CollectionContentsComponent.prototype.refresh = function () {
            this.refresh$.next(true);
        };
        CollectionContentsComponent.prototype.setParam = function (key, value) {
            var _a;
            this.router.navigate(['./', Object.assign(Object.assign({}, this.route.snapshot.params), (_a = {}, _a[key] = value, _a))], {
                relativeTo: this.route,
                queryParamsHandling: 'merge',
            });
        };
        return CollectionContentsComponent;
    }());
    CollectionContentsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-collection-contents',
                    template: "<div class=\"contents-header\">\n    <div class=\"header-title-row\">\n        <ng-container\n            *ngTemplateOutlet=\"headerTemplate; context: { $implicit: contentsTotalItems$ | async }\"\n        ></ng-container>\n    </div>\n    <input\n        type=\"text\"\n        [placeholder]=\"'catalog.filter-by-name' | translate\"\n        [formControl]=\"filterTermControl\"\n    />\n</div>\n<vdr-data-table\n    [items]=\"contents$ | async\"\n    [itemsPerPage]=\"contentsItemsPerPage$ | async\"\n    [totalItems]=\"contentsTotalItems$ | async\"\n    [currentPage]=\"contentsCurrentPage$ | async\"\n    (pageChange)=\"setContentsPageNumber($event)\"\n    (itemsPerPageChange)=\"setContentsItemsPerPage($event)\"\n>\n    <ng-template let-variant=\"item\">\n        <td class=\"left align-middle\">{{ variant.name }}</td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['/catalog/products', variant.productId, { tab: 'variants' }]\"\n            ></vdr-table-row-action>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".contents-header{background-color:var(--color-component-bg-100);position:sticky;top:0;padding:6px;z-index:1;border-bottom:1px solid var(--color-component-border-200)}.contents-header .header-title-row{display:flex;justify-content:space-between;align-items:center}.contents-header .clr-input{width:100%}:host ::ng-deep table{margin-top:-1px}"]
                },] }
    ];
    CollectionContentsComponent.ctorParameters = function () { return [
        { type: i1.ActivatedRoute },
        { type: i1.Router },
        { type: i2.DataService }
    ]; };
    CollectionContentsComponent.propDecorators = {
        collectionId: [{ type: i0.Input }],
        headerTemplate: [{ type: i0.ContentChild, args: [i0.TemplateRef, { static: true },] }]
    };

    /**
     * Builds a tree from an array of nodes which have a parent.
     * Based on https://stackoverflow.com/a/31247960/772859, modified to preserve ordering.
     */
    function arrayToTree(nodes, currentState) {
        var e_1, _c, e_2, _d;
        var _a, _b;
        var topLevelNodes = [];
        var mappedArr = {};
        var currentStateMap = treeToMap(currentState);
        try {
            // First map the nodes of the array to an object -> create a hash table.
            for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                var node = nodes_1_1.value;
                mappedArr[node.id] = Object.assign(Object.assign({}, node), { children: [] });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (nodes_1_1 && !nodes_1_1.done && (_c = nodes_1.return)) _c.call(nodes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _e = __values(nodes.map(function (n) { return n.id; })), _f = _e.next(); !_f.done; _f = _e.next()) {
                var id = _f.value;
                if (mappedArr.hasOwnProperty(id)) {
                    var mappedElem = mappedArr[id];
                    mappedElem.expanded = (_b = (_a = currentStateMap.get(id)) === null || _a === void 0 ? void 0 : _a.expanded) !== null && _b !== void 0 ? _b : false;
                    var parent = mappedElem.parent;
                    if (!parent) {
                        continue;
                    }
                    // If the element is not at the root level, add it to its parent array of children.
                    var parentIsRoot = !mappedArr[parent.id];
                    if (!parentIsRoot) {
                        if (mappedArr[parent.id]) {
                            mappedArr[parent.id].children.push(mappedElem);
                        }
                        else {
                            mappedArr[parent.id] = { children: [mappedElem] };
                        }
                    }
                    else {
                        topLevelNodes.push(mappedElem);
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // tslint:disable-next-line:no-non-null-assertion
        var rootId = topLevelNodes.length ? topLevelNodes[0].parent.id : undefined;
        return { id: rootId, children: topLevelNodes };
    }
    /**
     * Converts an existing tree (as generated by the arrayToTree function) into a flat
     * Map. This is used to persist certain states (e.g. `expanded`) when re-building the
     * tree.
     */
    function treeToMap(tree) {
        var nodeMap = new Map();
        function visit(node) {
            nodeMap.set(node.id, node);
            node.children.forEach(visit);
        }
        if (tree) {
            visit(tree);
        }
        return nodeMap;
    }

    var CollectionTreeComponent = /** @class */ (function () {
        function CollectionTreeComponent() {
            this.expandAll = false;
            this.rearrange = new i0.EventEmitter();
            this.deleteCollection = new i0.EventEmitter();
        }
        CollectionTreeComponent.prototype.ngOnChanges = function (changes) {
            if ('collections' in changes && this.collections) {
                this.collectionTree = arrayToTree(this.collections, this.collectionTree);
            }
        };
        CollectionTreeComponent.prototype.onDrop = function (event) {
            var item = event.item.data;
            var newParent = event.container.data;
            var newParentId = newParent.id;
            if (newParentId == null) {
                throw new Error("Could not determine the ID of the root Collection");
            }
            this.rearrange.emit({
                collectionId: item.id,
                parentId: newParentId,
                index: event.currentIndex,
            });
        };
        CollectionTreeComponent.prototype.onMove = function (event) {
            this.rearrange.emit(event);
        };
        CollectionTreeComponent.prototype.onDelete = function (id) {
            this.deleteCollection.emit(id);
        };
        CollectionTreeComponent.prototype.isRootNode = function (node) {
            return !node.hasOwnProperty('parent');
        };
        return CollectionTreeComponent;
    }());
    CollectionTreeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-collection-tree',
                    template: "<vdr-collection-tree-node\n    *ngIf=\"collectionTree\"\n    cdkDropListGroup\n    [expandAll]=\"expandAll\"\n    [collectionTree]=\"collectionTree\"\n    [activeCollectionId]=\"activeCollectionId\"\n></vdr-collection-tree-node>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];
    CollectionTreeComponent.propDecorators = {
        collections: [{ type: i0.Input }],
        activeCollectionId: [{ type: i0.Input }],
        expandAll: [{ type: i0.Input }],
        rearrange: [{ type: i0.Output }],
        deleteCollection: [{ type: i0.Output }]
    };

    var CollectionTreeNodeComponent = /** @class */ (function () {
        function CollectionTreeNodeComponent(parent, root, dataService) {
            this.parent = parent;
            this.root = root;
            this.dataService = dataService;
            this.depth = 0;
            this.expandAll = false;
            if (parent) {
                this.depth = parent.depth + 1;
            }
        }
        CollectionTreeNodeComponent.prototype.ngOnInit = function () {
            this.parentName = this.collectionTree.name || '<root>';
            var permissions$ = this.dataService.client
                .userStatus()
                .mapStream(function (data) { return data.userStatus.permissions; })
                .pipe(operators.shareReplay(1));
            this.hasUpdatePermission$ = permissions$.pipe(operators.map(function (perms) { return perms.includes(i2.Permission.UpdateCatalog) || perms.includes(i2.Permission.UpdateCollection); }));
            this.hasDeletePermission$ = permissions$.pipe(operators.map(function (perms) { return perms.includes(i2.Permission.DeleteCatalog) || perms.includes(i2.Permission.DeleteCollection); }));
        };
        CollectionTreeNodeComponent.prototype.ngOnChanges = function (changes) {
            var expandAllChange = changes['expandAll'];
            if (expandAllChange) {
                if (expandAllChange.previousValue === true && expandAllChange.currentValue === false) {
                    this.collectionTree.children.forEach(function (c) { return (c.expanded = false); });
                }
            }
        };
        CollectionTreeNodeComponent.prototype.trackByFn = function (index, item) {
            return item.id;
        };
        CollectionTreeNodeComponent.prototype.getMoveListItems = function (collection) {
            var visit = function (node, parentPath, output) {
                if (node.id !== collection.id) {
                    var path_1 = parentPath.concat(node.name);
                    var parentId = collection.parent && collection.parent.id;
                    if (node.id !== parentId) {
                        output.push({ path: path_1.slice(1).join(' / ') || 'root', id: node.id });
                    }
                    node.children.forEach(function (child) { return visit(child, path_1, output); });
                }
                return output;
            };
            return visit(this.root.collectionTree, [], []);
        };
        CollectionTreeNodeComponent.prototype.move = function (collection, parentId) {
            this.root.onMove({
                index: 0,
                parentId: parentId,
                collectionId: collection.id,
            });
        };
        CollectionTreeNodeComponent.prototype.moveUp = function (collection, currentIndex) {
            if (!collection.parent) {
                return;
            }
            this.root.onMove({
                index: currentIndex - 1,
                parentId: collection.parent.id,
                collectionId: collection.id,
            });
        };
        CollectionTreeNodeComponent.prototype.moveDown = function (collection, currentIndex) {
            if (!collection.parent) {
                return;
            }
            this.root.onMove({
                index: currentIndex + 1,
                parentId: collection.parent.id,
                collectionId: collection.id,
            });
        };
        CollectionTreeNodeComponent.prototype.drop = function (event) {
            dragDrop.moveItemInArray(this.collectionTree.children, event.previousIndex, event.currentIndex);
            this.root.onDrop(event);
        };
        CollectionTreeNodeComponent.prototype.delete = function (id) {
            this.root.onDelete(id);
        };
        return CollectionTreeNodeComponent;
    }());
    CollectionTreeNodeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-collection-tree-node',
                    template: "<div\n    cdkDropList\n    class=\"tree-node\"\n    #dropList\n    [cdkDropListData]=\"collectionTree\"\n    [cdkDropListDisabled]=\"!(hasUpdatePermission$ | async)\"\n    (cdkDropListDropped)=\"drop($event)\"\n>\n    <div\n        class=\"collection\"\n        [class.private]=\"collection.isPrivate\"\n        *ngFor=\"let collection of collectionTree.children; index as i; trackBy: trackByFn\"\n        cdkDrag\n        [cdkDragData]=\"collection\"\n    >\n        <div\n            class=\"collection-detail\"\n            [ngClass]=\"'depth-' + depth\"\n            [class.active]=\"collection.id === activeCollectionId\"\n        >\n            <div class=\"name\">\n                <button\n                    class=\"icon-button folder-button\"\n                    [disabled]=\"expandAll\"\n                    *ngIf=\"collection.children?.length; else folderSpacer\"\n                    (click)=\"collection.expanded = !collection.expanded\"\n                >\n                    <clr-icon shape=\"folder\" *ngIf=\"!collection.expanded && !expandAll\"></clr-icon>\n                    <clr-icon shape=\"folder-open\" *ngIf=\"collection.expanded || expandAll\"></clr-icon>\n                </button>\n                <ng-template #folderSpacer>\n                    <div class=\"folder-button-spacer\"></div>\n                </ng-template>\n                {{ collection.name }}\n            </div>\n            <div class=\"flex-spacer\"></div>\n            <vdr-chip *ngIf=\"collection.isPrivate\">{{ 'catalog.private' | translate }}</vdr-chip>\n            <a\n                class=\"btn btn-link btn-sm\"\n                [routerLink]=\"['./', { contents: collection.id }]\"\n                queryParamsHandling=\"preserve\"\n            >\n                <clr-icon shape=\"view-list\"></clr-icon>\n                {{ 'catalog.view-contents' | translate }}\n            </a>\n            <a class=\"btn btn-link btn-sm\" [routerLink]=\"['/catalog/collections/', collection.id]\">\n                <clr-icon shape=\"edit\"></clr-icon>\n                {{ 'common.edit' | translate }}\n            </a>\n            <div class=\"drag-handle\" cdkDragHandle *vdrIfPermissions=\"['UpdateCatalog', 'UpdateCollection']\">\n                <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n            </div>\n            <vdr-dropdown>\n                <button class=\"icon-button\" vdrDropdownTrigger>\n                    <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <a\n                        class=\"dropdown-item\"\n                        [routerLink]=\"['./', 'create', { parentId: collection.id }]\"\n                        *vdrIfPermissions=\"['CreateCatalog', 'CreateCollection']\"\n                    >\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'catalog.create-new-collection' | translate }}\n                    </a>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        [disabled]=\"i === 0 || !(hasUpdatePermission$ | async)\"\n                        (click)=\"moveUp(collection, i)\"\n                    >\n                        <clr-icon shape=\"caret up\"></clr-icon>\n                        {{ 'catalog.move-up' | translate }}\n                    </button>\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        [disabled]=\"\n                            i === collectionTree.children.length - 1 || !(hasUpdatePermission$ | async)\n                        \"\n                        (click)=\"moveDown(collection, i)\"\n                    >\n                        <clr-icon shape=\"caret down\"></clr-icon>\n                        {{ 'catalog.move-down' | translate }}\n                    </button>\n                    <h4 class=\"dropdown-header\">{{ 'catalog.move-to' | translate }}</h4>\n                    <button\n                        type=\"button\"\n                        vdrDropdownItem\n                        *ngFor=\"let item of getMoveListItems(collection)\"\n                        (click)=\"move(collection, item.id)\"\n                        [disabled]=\"!(hasUpdatePermission$ | async)\"\n                    >\n                        <clr-icon shape=\"child-arrow\"></clr-icon>\n                        {{ item.path }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        class=\"button\"\n                        vdrDropdownItem\n                        (click)=\"delete(collection.id)\"\n                        [disabled]=\"!(hasDeletePermission$ | async)\"\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n        <vdr-collection-tree-node\n            *ngIf=\"collection.expanded || expandAll\"\n            [expandAll]=\"expandAll\"\n            [collectionTree]=\"collection\"\n            [activeCollectionId]=\"activeCollectionId\"\n        ></vdr-collection-tree-node>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block}.collection{background-color:var(--color-component-bg-100);font-size:.65rem;transition:transform .25s cubic-bezier(0,0,.2,1);margin-bottom:2px;border-left:2px solid transparent;transition:border-left-color .2s}.collection.private{background-color:var(--color-component-bg-200)}.collection .collection-detail{padding:6px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--color-component-border-100)}.collection .collection-detail.active{background-color:var(--clr-global-selection-color)}.collection .collection-detail.depth-1{padding-left:36px}.collection .collection-detail.depth-2{padding-left:60px}.collection .collection-detail.depth-3{padding-left:84px}.collection .collection-detail.depth-4{padding-left:108px}.collection .collection-detail .folder-button-spacer{display:inline-block;width:28px}.tree-node{display:block;background:var(--color-component-bg-100);overflow:hidden}.tree-node.cdk-drop-list-dragging>.collection{border-left-color:var(--color-primary-300)}.drag-placeholder{min-height:120px;background-color:var(--color-component-bg-300);transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating,.example-list.cdk-drop-list-dragging .tree-node:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
                },] }
    ];
    CollectionTreeNodeComponent.ctorParameters = function () { return [
        { type: CollectionTreeNodeComponent, decorators: [{ type: i0.SkipSelf }, { type: i0.Optional }] },
        { type: CollectionTreeComponent },
        { type: i2.DataService }
    ]; };
    CollectionTreeNodeComponent.propDecorators = {
        collectionTree: [{ type: i0.Input }],
        activeCollectionId: [{ type: i0.Input }],
        expandAll: [{ type: i0.Input }]
    };

    var DEFAULT_VARIANT_CODE = '__DEFAULT_VARIANT__';
    var GenerateProductVariantsComponent = /** @class */ (function () {
        function GenerateProductVariantsComponent(dataService) {
            this.dataService = dataService;
            this.variantsChange = new i0.EventEmitter();
            this.optionGroups = [];
            this.variantFormValues = {};
        }
        GenerateProductVariantsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.dataService.settings.getActiveChannel().single$.subscribe(function (data) {
                _this.currencyCode = data.activeChannel.currencyCode;
            });
            this.generateVariants();
        };
        GenerateProductVariantsComponent.prototype.addOption = function () {
            this.optionGroups.push({ name: '', values: [] });
        };
        GenerateProductVariantsComponent.prototype.removeOption = function (name) {
            this.optionGroups = this.optionGroups.filter(function (g) { return g.name !== name; });
            this.generateVariants();
        };
        GenerateProductVariantsComponent.prototype.generateVariants = function () {
            var _this = this;
            var totalValuesCount = this.optionGroups.reduce(function (sum, group) { return sum + group.values.length; }, 0);
            var groups = totalValuesCount
                ? this.optionGroups.map(function (g) { return g.values.map(function (v) { return v.name; }); })
                : [[DEFAULT_VARIANT_CODE]];
            this.variants = sharedUtils.generateAllCombinations(groups).map(function (values) { return ({ id: values.join('|'), values: values }); });
            this.variants.forEach(function (variant) {
                if (!_this.variantFormValues[variant.id]) {
                    _this.variantFormValues[variant.id] = {
                        optionValues: variant.values,
                        enabled: true,
                        price: _this.copyFromDefault(variant.id, 'price', 0),
                        sku: _this.copyFromDefault(variant.id, 'sku', ''),
                        stock: _this.copyFromDefault(variant.id, 'stock', 0),
                    };
                }
            });
            this.onFormChange();
        };
        GenerateProductVariantsComponent.prototype.trackByFn = function (index, variant) {
            return variant.values.join('|');
        };
        GenerateProductVariantsComponent.prototype.handleEnter = function (event, optionValueInputComponent) {
            event.preventDefault();
            event.stopPropagation();
            optionValueInputComponent.focus();
        };
        GenerateProductVariantsComponent.prototype.onFormChange = function () {
            var _this = this;
            var variantsToCreate = this.variants.map(function (v) { return _this.variantFormValues[v.id]; }).filter(function (v) { return v.enabled; });
            this.variantsChange.emit({
                groups: this.optionGroups.map(function (og) { return ({ name: og.name, values: og.values.map(function (v) { return v.name; }) }); }),
                variants: variantsToCreate,
            });
        };
        GenerateProductVariantsComponent.prototype.copyFromDefault = function (variantId, prop, value) {
            return variantId !== DEFAULT_VARIANT_CODE
                ? this.variantFormValues[DEFAULT_VARIANT_CODE][prop]
                : value;
        };
        return GenerateProductVariantsComponent;
    }());
    GenerateProductVariantsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-generate-product-variants',
                    template: "<div *ngFor=\"let group of optionGroups\" class=\"option-groups\">\n    <div class=\"name\">\n        <label>{{ 'catalog.option' | translate }}</label>\n        <input\n            placeholder=\"e.g. Size\"\n            clrInput\n            [(ngModel)]=\"group.name\"\n            name=\"name\"\n            required\n            (keydown.enter)=\"handleEnter($event, optionValueInputComponent)\"\n        />\n    </div>\n    <div class=\"values\">\n        <label>{{ 'catalog.option-values' | translate }}</label>\n        <vdr-option-value-input\n            #optionValueInputComponent\n            [(ngModel)]=\"group.values\"\n            (ngModelChange)=\"generateVariants()\"\n            [groupName]=\"group.name\"\n            [disabled]=\"group.name === ''\"\n        ></vdr-option-value-input>\n    </div>\n    <div class=\"remove-group\">\n        <button\n            class=\"btn btn-icon btn-warning-outline\"\n            [title]=\"'catalog.remove-option' | translate\"\n            (click)=\"removeOption(group.name)\"\n        >\n            <clr-icon shape=\"trash\"></clr-icon>\n        </button>\n    </div>\n</div>\n<button class=\"btn btn-primary-outline btn-sm\" (click)=\"addOption()\">\n    <clr-icon shape=\"plus\"></clr-icon>\n    {{ 'catalog.add-option' | translate }}\n</button>\n\n<div class=\"variants-preview\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th *ngIf=\"1 < variants.length\">{{ 'common.create' | translate }}</th>\n                <th *ngIf=\"1 < variants.length\">{{ 'catalog.variant' | translate }}</th>\n                <th>{{ 'catalog.sku' | translate }}</th>\n                <th>{{ 'catalog.price' | translate }}</th>\n                <th>{{ 'catalog.stock-on-hand' | translate }}</th>\n            </tr>\n        </thead>\n        <tr\n            *ngFor=\"let variant of variants; trackBy: trackByFn\"\n            [class.disabled]=\"!variantFormValues[variant.id].enabled\"\n        >\n            <td *ngIf=\"1 < variants.length\">\n                <input\n                    type=\"checkbox\"\n                    (change)=\"onFormChange()\"\n                    [(ngModel)]=\"variantFormValues[variant.id].enabled\"\n                    clrCheckbox\n                />\n            </td>\n            <td *ngIf=\"1 < variants.length\">\n                {{ variant.values.join(' ') }}\n            </td>\n            <td>\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"text\"\n                        (change)=\"onFormChange()\"\n                        [(ngModel)]=\"variantFormValues[variant.id].sku\"\n                        [placeholder]=\"'catalog.sku' | translate\"\n                    />\n                </clr-input-container>\n            </td>\n            <td>\n                <clr-input-container>\n                    <vdr-currency-input\n                        clrInput\n                        [(ngModel)]=\"variantFormValues[variant.id].price\"\n                        (ngModelChange)=\"onFormChange()\"\n                        [currencyCode]=\"currencyCode\"\n                    ></vdr-currency-input>\n                </clr-input-container>\n            </td>\n            <td>\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"number\"\n                        [(ngModel)]=\"variantFormValues[variant.id].stock\"\n                        (change)=\"onFormChange()\"\n                        min=\"0\"\n                        step=\"1\"\n                    />\n                </clr-input-container>\n            </td>\n        </tr>\n    </table>\n</div>\n",
                    styles: [":host{display:block;margin-bottom:120px}.option-groups{display:flex}.values{flex:1;margin:0 6px}.remove-group{padding-top:18px}.variants-preview tr.disabled td{background-color:var(--color-component-bg-100);color:var(--color-grey-400)}"]
                },] }
    ];
    GenerateProductVariantsComponent.ctorParameters = function () { return [
        { type: i2.DataService }
    ]; };
    GenerateProductVariantsComponent.propDecorators = {
        variantsChange: [{ type: i0.Output }]
    };

    var OPTION_VALUE_INPUT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return OptionValueInputComponent; }),
        multi: true,
    };
    var OptionValueInputComponent = /** @class */ (function () {
        function OptionValueInputComponent(changeDetector) {
            this.changeDetector = changeDetector;
            this.groupName = '';
            this.disabled = false;
            this.input = '';
            this.isFocussed = false;
            this.lastSelected = false;
        }
        OptionValueInputComponent.prototype.registerOnChange = function (fn) {
            this.onChangeFn = fn;
        };
        OptionValueInputComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchFn = fn;
        };
        OptionValueInputComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this.changeDetector.markForCheck();
        };
        OptionValueInputComponent.prototype.writeValue = function (obj) {
            this.options = obj || [];
        };
        OptionValueInputComponent.prototype.focus = function () {
            this.textArea.nativeElement.focus();
        };
        OptionValueInputComponent.prototype.removeOption = function (option) {
            if (!option.locked) {
                this.options = this.options.filter(function (o) { return o.name !== option.name; });
                this.onChangeFn(this.options);
            }
        };
        OptionValueInputComponent.prototype.handleKey = function (event) {
            switch (event.key) {
                case ',':
                case 'Enter':
                    this.addOptionValue();
                    event.preventDefault();
                    break;
                case 'Backspace':
                    if (this.lastSelected) {
                        this.removeLastOption();
                        this.lastSelected = false;
                    }
                    else if (this.input === '') {
                        this.lastSelected = true;
                    }
                    break;
                default:
                    this.lastSelected = false;
            }
        };
        OptionValueInputComponent.prototype.handleBlur = function () {
            this.isFocussed = false;
            this.addOptionValue();
        };
        OptionValueInputComponent.prototype.addOptionValue = function () {
            this.options = unique.unique(__spread(this.options, this.parseInputIntoOptions(this.input)));
            this.input = '';
            this.onChangeFn(this.options);
        };
        OptionValueInputComponent.prototype.parseInputIntoOptions = function (input) {
            return input
                .split(/[,\n]/)
                .map(function (s) { return s.trim(); })
                .filter(function (s) { return s !== ''; })
                .map(function (s) { return ({ name: s, locked: false }); });
        };
        OptionValueInputComponent.prototype.removeLastOption = function () {
            if (!this.options[this.options.length - 1].locked) {
                this.options = this.options.slice(0, this.options.length - 1);
            }
        };
        return OptionValueInputComponent;
    }());
    OptionValueInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-option-value-input',
                    template: "<div class=\"input-wrapper\" [class.focus]=\"isFocussed\" (click)=\"textArea.focus()\">\n    <div class=\"chips\" *ngIf=\"0 < options.length\">\n        <vdr-chip\n            *ngFor=\"let option of options; last as isLast\"\n            [icon]=\"option.locked ? 'lock' : 'times'\"\n            [class.selected]=\"isLast && lastSelected\"\n            [class.locked]=\"option.locked\"\n            [colorFrom]=\"groupName\"\n            (iconClick)=\"removeOption(option)\"\n        >\n            {{ option.name }}\n        </vdr-chip>\n    </div>\n    <textarea\n        #textArea\n        (keyup)=\"handleKey($event)\"\n        (focus)=\"isFocussed = true\"\n        (blur)=\"handleBlur()\"\n        [(ngModel)]=\"input\"\n        [disabled]=\"disabled\"\n    ></textarea>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.Default,
                    providers: [OPTION_VALUE_INPUT_VALUE_ACCESSOR],
                    styles: [".input-wrapper{background-color:#fff;border-radius:3px!important;border:1px solid var(--color-grey-300)!important;cursor:text}.input-wrapper.focus{border-color:var(--color-primary-500)!important;box-shadow:0 0 1px 1px var(--color-primary-100)}.input-wrapper .chips{padding:5px}.input-wrapper textarea{border:none;width:100%;height:24px;margin-top:3px;padding:0 6px}.input-wrapper textarea:focus{outline:none}.input-wrapper textarea:disabled{background-color:var(--color-component-bg-100)}vdr-chip ::ng-deep .wrapper{margin:0 3px}vdr-chip.locked{opacity:.8}vdr-chip.selected ::ng-deep .wrapper{border-color:var(--color-warning-500)!important;box-shadow:0 0 1px 1px var(--color-warning-400);opacity:.6}"]
                },] }
    ];
    OptionValueInputComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };
    OptionValueInputComponent.propDecorators = {
        groupName: [{ type: i0.Input }],
        textArea: [{ type: i0.ViewChild, args: ['textArea', { static: true },] }]
    };

    /**
     * A component which displays the Assets associated with a product, and allows assets to be removed and
     * added, and for the featured asset to be set.
     *
     * Note: rather complex code for drag drop is due to a limitation of the default CDK implementation
     * which is addressed by a work-around from here: https://github.com/angular/components/issues/13372#issuecomment-483998378
     */
    var ProductAssetsComponent = /** @class */ (function () {
        function ProductAssetsComponent(modalService, changeDetector, viewportRuler, collectionDetailComponent) {
            var _this = this;
            this.modalService = modalService;
            this.changeDetector = changeDetector;
            this.viewportRuler = viewportRuler;
            this.collectionDetailComponent = collectionDetailComponent;
            this.compact = false;
            this.change = new i0.EventEmitter();
            this.assets = [];
            this.updateCollectionPermissions = [i2.Permission.UpdateCatalog, i2.Permission.UpdateCollection];
            this.updateProductPermissions = [i2.Permission.UpdateCatalog, i2.Permission.UpdateProduct];
            this.dropListEnterPredicate = function (drag, drop) {
                if (drop === _this.placeholder) {
                    return true;
                }
                if (drop !== _this.activeContainer) {
                    return false;
                }
                var phElement = _this.placeholder.element.nativeElement;
                var sourceElement = drag.dropContainer.element.nativeElement;
                var dropElement = drop.element.nativeElement;
                var children = dropElement.parentElement && dropElement.parentElement.children;
                var dragIndex = __indexOf(children, _this.source ? phElement : sourceElement);
                var dropIndex = __indexOf(children, dropElement);
                if (!_this.source) {
                    _this.sourceIndex = dragIndex;
                    _this.source = drag.dropContainer;
                    phElement.style.width = sourceElement.clientWidth + 'px';
                    phElement.style.height = sourceElement.clientHeight + 'px';
                    if (sourceElement.parentElement) {
                        sourceElement.parentElement.removeChild(sourceElement);
                    }
                }
                _this.targetIndex = dropIndex;
                _this.target = drop;
                phElement.style.display = '';
                if (dropElement.parentElement) {
                    dropElement.parentElement.insertBefore(phElement, dropIndex > dragIndex ? dropElement.nextSibling : dropElement);
                }
                _this.placeholder._dropListRef.enter(drag._dragRef, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
                return false;
            };
        }
        Object.defineProperty(ProductAssetsComponent.prototype, "assetsSetter", {
            set: function (val) {
                // create a new non-readonly array of assets
                this.assets = val.slice();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ProductAssetsComponent.prototype, "updatePermissions", {
            get: function () {
                if (this.collectionDetailComponent) {
                    return this.updateCollectionPermissions;
                }
                else {
                    return this.updateProductPermissions;
                }
            },
            enumerable: false,
            configurable: true
        });
        ProductAssetsComponent.prototype.ngAfterViewInit = function () {
            var phElement = this.placeholder.element.nativeElement;
            phElement.style.display = 'none';
            if (phElement.parentElement) {
                phElement.parentElement.removeChild(phElement);
            }
        };
        ProductAssetsComponent.prototype.selectAssets = function () {
            var _this = this;
            this.modalService
                .fromComponent(i2.AssetPickerDialogComponent, {
                size: 'xl',
            })
                .subscribe(function (result) {
                if (result && result.length) {
                    _this.assets = unique.unique(_this.assets.concat(result), 'id');
                    if (!_this.featuredAsset) {
                        _this.featuredAsset = result[0];
                    }
                    _this.emitChangeEvent(_this.assets, _this.featuredAsset);
                    _this.changeDetector.markForCheck();
                }
            });
        };
        ProductAssetsComponent.prototype.setAsFeatured = function (asset) {
            this.featuredAsset = asset;
            this.emitChangeEvent(this.assets, asset);
        };
        ProductAssetsComponent.prototype.isFeatured = function (asset) {
            return !!this.featuredAsset && this.featuredAsset.id === asset.id;
        };
        ProductAssetsComponent.prototype.previewAsset = function (asset) {
            this.modalService
                .fromComponent(i2.AssetPreviewDialogComponent, {
                size: 'xl',
                closable: true,
                locals: { asset: asset },
            })
                .subscribe();
        };
        ProductAssetsComponent.prototype.removeAsset = function (asset) {
            this.assets = this.assets.filter(function (a) { return a.id !== asset.id; });
            if (this.featuredAsset && this.featuredAsset.id === asset.id) {
                this.featuredAsset = this.assets.length > 0 ? this.assets[0] : undefined;
            }
            this.emitChangeEvent(this.assets, this.featuredAsset);
        };
        ProductAssetsComponent.prototype.emitChangeEvent = function (assets, featuredAsset) {
            this.change.emit({
                assets: assets,
                featuredAsset: featuredAsset,
            });
        };
        ProductAssetsComponent.prototype.dragMoved = function (e) {
            var _this = this;
            var point = this.getPointerPositionOnPage(e.event);
            this.listGroup._items.forEach(function (dropList) {
                if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
                    _this.activeContainer = dropList;
                    return;
                }
            });
        };
        ProductAssetsComponent.prototype.dropListDropped = function () {
            if (!this.target || !this.source) {
                return;
            }
            var phElement = this.placeholder.element.nativeElement;
            // tslint:disable-next-line:no-non-null-assertion
            var parent = phElement.parentElement;
            phElement.style.display = 'none';
            parent.removeChild(phElement);
            parent.appendChild(phElement);
            parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);
            this.target = null;
            this.source = null;
            if (this.sourceIndex !== this.targetIndex) {
                dragDrop.moveItemInArray(this.assets, this.sourceIndex, this.targetIndex);
                this.emitChangeEvent(this.assets, this.featuredAsset);
            }
        };
        /** Determines the point of the page that was touched by the user. */
        ProductAssetsComponent.prototype.getPointerPositionOnPage = function (event) {
            // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
            var point = __isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
            var scrollPosition = this.viewportRuler.getViewportScrollPosition();
            return {
                x: point.pageX - scrollPosition.left,
                y: point.pageY - scrollPosition.top,
            };
        };
        return ProductAssetsComponent;
    }());
    ProductAssetsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-assets',
                    template: "<div class=\"card\" *ngIf=\"!compact; else compactView\">\n    <div class=\"card-img\">\n        <div class=\"featured-asset\">\n            <img\n                *ngIf=\"featuredAsset\"\n                [src]=\"featuredAsset | assetPreview:'small'\"\n                (click)=\"previewAsset(featuredAsset)\"\n            />\n            <div class=\"placeholder\" *ngIf=\"!featuredAsset\" (click)=\"selectAssets()\">\n                <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n                <div>{{ 'catalog.no-featured-asset' | translate }}</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"card-block\"><ng-container *ngTemplateOutlet=\"assetList\"></ng-container></div>\n    <div class=\"card-footer\" *vdrIfPermissions=\"updatePermissions\">\n        <button class=\"btn\" (click)=\"selectAssets()\">\n            <clr-icon shape=\"attachment\"></clr-icon>\n            {{ 'asset.add-asset' | translate }}\n        </button>\n    </div>\n</div>\n\n<ng-template #compactView>\n    <div class=\"featured-asset compact\">\n        <img\n            *ngIf=\"featuredAsset\"\n            [src]=\"featuredAsset | assetPreview:'thumb'\"\n            (click)=\"previewAsset(featuredAsset)\"\n        />\n\n        <div class=\"placeholder\" *ngIf=\"!featuredAsset\" (click)=\"selectAssets()\"><clr-icon shape=\"image\" size=\"150\"></clr-icon></div>\n    </div>\n    <ng-container *ngTemplateOutlet=\"assetList\"></ng-container>\n    <button\n        *vdrIfPermissions=\"updatePermissions\"\n        class=\"compact-select btn btn-icon btn-sm btn-block\"\n        [title]=\"'asset.add-asset' | translate\"\n        (click)=\"selectAssets()\"\n    >\n        <clr-icon shape=\"attachment\"></clr-icon>\n        {{ 'asset.add-asset' | translate }}\n    </button>\n</ng-template>\n\n<ng-template #assetList>\n    <div class=\"all-assets\" [class.compact]=\"compact\" cdkDropListGroup #dlg>\n        <div\n            cdkDropList\n            #dl\n            [cdkDropListDisabled]=\"!(updatePermissions | hasPermission)\"\n            [cdkDropListEnterPredicate]=\"dropListEnterPredicate\"\n            (cdkDropListDropped)=\"dropListDropped()\"\n        ></div>\n        <div\n            *ngFor=\"let asset of assets\"\n            cdkDropList\n            [cdkDropListDisabled]=\"!(updatePermissions | hasPermission)\"\n            [cdkDropListEnterPredicate]=\"dropListEnterPredicate\"\n            (cdkDropListDropped)=\"dropListDropped()\"\n        >\n            <vdr-dropdown cdkDrag (cdkDragMoved)=\"dragMoved($event)\">\n                <div\n                    class=\"asset-thumb\"\n                    vdrDropdownTrigger\n                    [class.featured]=\"isFeatured(asset)\"\n                    [title]=\"\"\n                    tabindex=\"0\"\n                >\n                    <img [src]=\"asset | assetPreview:'tiny'\" />\n                </div>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button type=\"button\" vdrDropdownItem (click)=\"previewAsset(asset)\">\n                        {{ 'asset.preview' | translate }}\n                    </button>\n                    <button\n                        type=\"button\"\n                        [disabled]=\"isFeatured(asset) || !(updatePermissions | hasPermission)\"\n                        vdrDropdownItem\n                        (click)=\"setAsFeatured(asset)\"\n                    >\n                        {{ 'asset.set-as-featured-asset' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        class=\"remove-asset\"\n                        vdrDropdownItem\n                        [disabled]=\"!(updatePermissions | hasPermission)\"\n                        (click)=\"removeAsset(asset)\"\n                    >\n                        {{ 'asset.remove-asset' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n    </div>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{width:340px;display:block}:host.compact{width:162px}.placeholder{text-align:center;color:var(--color-grey-300)}.featured-asset{text-align:center;background:var(--color-component-bg-200);padding:6px;cursor:pointer}.featured-asset.compact{width:100%;min-height:40px;position:relative;padding:6px}.featured-asset .compact-select{position:absolute;bottom:6px;right:6px;margin:0}.all-assets{display:flex;flex-wrap:wrap}.all-assets .asset-thumb{margin:3px;padding:0;border:2px solid var(--color-component-border-100);cursor:pointer}.all-assets .asset-thumb.featured{border-color:var(--color-primary-500)}.all-assets .remove-asset{color:var(--color-warning-500)}.all-assets.compact .asset-thumb{margin:1px;border-width:1px}.cdk-drag-preview{display:flex;align-items:center;justify-content:center;width:50px;background-color:var(--color-component-bg-100);opacity:.9;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:.8;width:60px;height:50px}.cdk-drag-placeholder .asset-thumb{background-color:var(--color-component-bg-300);height:100%;width:54px}.cdk-drag-placeholder img{display:none}.all-assets.compact .cdk-drag-placeholder,.all-assets.compact .cdk-drag-placeholder .asset-thumb{width:50px}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.example-box:last-child{border:none}.all-assets.cdk-drop-list-dragging vdr-dropdown:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
                },] }
    ];
    ProductAssetsComponent.ctorParameters = function () { return [
        { type: i2.ModalService },
        { type: i0.ChangeDetectorRef },
        { type: overlay.ViewportRuler },
        { type: CollectionDetailComponent, decorators: [{ type: i0.Optional }] }
    ]; };
    ProductAssetsComponent.propDecorators = {
        assetsSetter: [{ type: i0.Input, args: ['assets',] }],
        featuredAsset: [{ type: i0.Input }],
        compact: [{ type: i0.HostBinding, args: ['class.compact',] }, { type: i0.Input }],
        change: [{ type: i0.Output }],
        listGroup: [{ type: i0.ViewChild, args: ['dlg', { static: false, read: dragDrop.CdkDropListGroup },] }],
        placeholder: [{ type: i0.ViewChild, args: ['dl', { static: false, read: dragDrop.CdkDropList },] }]
    };
    function __indexOf(collection, node) {
        if (!collection) {
            return -1;
        }
        return Array.prototype.indexOf.call(collection, node);
    }
    /** Determines whether an event is a touch event. */
    function __isTouchEvent(event) {
        return event.type.startsWith('touch');
    }
    function __isInsideDropListClientRect(dropList, x, y) {
        var _a = dropList.element.nativeElement.getBoundingClientRect(), top = _a.top, bottom = _a.bottom, left = _a.left, right = _a.right;
        return y >= top && y <= bottom && x >= left && x <= right;
    }

    var ɵ0 = i2.SingleSearchSelectionModelFactory;
    var ProductSearchInputComponent = /** @class */ (function () {
        function ProductSearchInputComponent() {
            var _this = this;
            this.searchTermChange = new i0.EventEmitter();
            this.facetValueChange = new i0.EventEmitter();
            this.lastTerm = '';
            this.lastFacetValueIds = [];
            this.filterFacetResults = function (term, item) {
                if (!_this.isFacetValueItem(item)) {
                    return false;
                }
                return (item.facetValue.name.toLowerCase().startsWith(term.toLowerCase()) ||
                    item.facetValue.facet.name.toLowerCase().startsWith(term.toLowerCase()));
            };
            this.isFacetValueItem = function (input) {
                return typeof input === 'object' && !!input && input.hasOwnProperty('facetValue');
            };
        }
        ProductSearchInputComponent.prototype.setSearchTerm = function (term) {
            var _this = this;
            if (term) {
                this.selectComponent.select({ label: term, value: { label: term } });
            }
            else {
                var currentTerm = this.selectComponent.selectedItems.find(function (i) { return !_this.isFacetValueItem(i.value); });
                if (currentTerm) {
                    this.selectComponent.unselect(currentTerm);
                }
            }
        };
        ProductSearchInputComponent.prototype.setFacetValues = function (ids) {
            var _this = this;
            var items = this.selectComponent.items;
            this.selectComponent.selectedItems.forEach(function (item) {
                if (_this.isFacetValueItem(item.value) && !ids.includes(item.value.facetValue.id)) {
                    _this.selectComponent.unselect(item);
                }
            });
            ids.map(function (id) {
                return items.find(function (item) { return _this.isFacetValueItem(item) && item.facetValue.id === id; });
            })
                .filter(sharedUtils.notNullOrUndefined)
                .forEach(function (item) {
                var isSelected = _this.selectComponent.selectedItems.find(function (i) {
                    var val = i.value;
                    if (_this.isFacetValueItem(val)) {
                        return val.facetValue.id === item.facetValue.id;
                    }
                    return false;
                });
                if (!isSelected) {
                    _this.selectComponent.select({ label: '', value: item });
                }
            });
        };
        ProductSearchInputComponent.prototype.onSelectChange = function (selectedItems) {
            var _this = this;
            if (!Array.isArray(selectedItems)) {
                selectedItems = [selectedItems];
            }
            var searchTermItem = selectedItems.find(function (item) { return !_this.isFacetValueItem(item); });
            var searchTerm = searchTermItem ? searchTermItem.label : '';
            var facetValueIds = selectedItems.filter(this.isFacetValueItem).map(function (i) { return i.facetValue.id; });
            if (searchTerm !== this.lastTerm) {
                this.searchTermChange.emit(searchTerm);
                this.lastTerm = searchTerm;
            }
            if (this.lastFacetValueIds.join(',') !== facetValueIds.join(',')) {
                this.facetValueChange.emit(facetValueIds);
                this.lastFacetValueIds = facetValueIds;
            }
        };
        ProductSearchInputComponent.prototype.addTagFn = function (item) {
            return { label: item };
        };
        ProductSearchInputComponent.prototype.isSearchHeaderSelected = function () {
            return this.selectComponent.itemsList.markedIndex === -1;
        };
        return ProductSearchInputComponent;
    }());
    ProductSearchInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-search-input',
                    template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [placeholder]=\"'catalog.search-product-name-or-code' | translate\"\n    [items]=\"facetValueResults\"\n    [searchFn]=\"filterFacetResults\"\n    [hideSelected]=\"true\"\n    [multiple]=\"true\"\n    [markFirst]=\"false\"\n    (change)=\"onSelectChange($event)\"\n    #selectComponent\n>\n    <ng-template ng-header-tmp>\n        <div\n            class=\"search-header\"\n            *ngIf=\"selectComponent.searchTerm\"\n            [class.selected]=\"isSearchHeaderSelected()\"\n            (click)=\"selectComponent.selectTag()\"\n        >\n            {{ 'catalog.search-for-term' | translate }}: {{ selectComponent.searchTerm }}\n        </div>\n    </ng-template>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <ng-container *ngIf=\"item.facetValue\">\n            <vdr-facet-value-chip\n                [facetValue]=\"item.facetValue\"\n                [removable]=\"true\"\n                (remove)=\"clear(item)\"\n            ></vdr-facet-value-chip>\n        </ng-container>\n        <ng-container *ngIf=\"!item.facetValue\">\n            <vdr-chip [icon]=\"'times'\" (iconClick)=\"clear(item)\">\"{{ item.label }}\"</vdr-chip>\n        </ng-container>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\" let-search=\"searchTerm\">\n        <ng-container *ngIf=\"item.facetValue\">\n            <vdr-facet-value-chip [facetValue]=\"item.facetValue\" [removable]=\"false\"></vdr-facet-value-chip>\n        </ng-container>\n    </ng-template>\n</ng-select>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    providers: [{ provide: ngSelect.SELECTION_MODEL_FACTORY, useValue: ɵ0 }],
                    styles: [":host{margin-top:6px;display:block;width:100%}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}ng-select{width:100%;min-width:300px;margin-right:12px}.search-header{padding:8px 10px;border-bottom:1px solid var(--color-component-border-100);cursor:pointer}.search-header.selected,.search-header:hover{background-color:var(--color-component-bg-200)}"]
                },] }
    ];
    ProductSearchInputComponent.propDecorators = {
        facetValueResults: [{ type: i0.Input }],
        searchTermChange: [{ type: i0.Output }],
        facetValueChange: [{ type: i0.Output }],
        selectComponent: [{ type: i0.ViewChild, args: ['selectComponent', { static: true },] }]
    };

    var UpdateProductOptionDialogComponent = /** @class */ (function () {
        function UpdateProductOptionDialogComponent() {
            this.updateVariantName = true;
            this.codeInputTouched = false;
        }
        UpdateProductOptionDialogComponent.prototype.ngOnInit = function () {
            var e_1, _b;
            var _this = this;
            var _a;
            var currentTranslation = this.productOption.translations.find(function (t) { return t.languageCode === _this.activeLanguage; });
            this.name = (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '';
            this.code = this.productOption.code;
            this.customFieldsForm = new forms.FormGroup({});
            if (this.customFields) {
                var cfCurrentTranslation = (currentTranslation && currentTranslation.customFields) || {};
                try {
                    for (var _c = __values(this.customFields), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var fieldDef = _d.value;
                        var key = fieldDef.name;
                        var value = fieldDef.type === 'localeString'
                            ? cfCurrentTranslation[key]
                            : this.productOption.customFields[key];
                        this.customFieldsForm.addControl(fieldDef.name, new forms.FormControl(value));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        UpdateProductOptionDialogComponent.prototype.update = function () {
            var result = i2.createUpdatedTranslatable({
                translatable: this.productOption,
                languageCode: this.activeLanguage,
                updatedFields: {
                    code: this.code,
                    name: this.name,
                    customFields: this.customFieldsForm.value,
                },
                customFieldConfig: this.customFields,
                defaultTranslation: {
                    languageCode: this.activeLanguage,
                    name: '',
                },
            });
            this.resolveWith(Object.assign(Object.assign({}, result), { autoUpdate: this.updateVariantName }));
        };
        UpdateProductOptionDialogComponent.prototype.cancel = function () {
            this.resolveWith();
        };
        UpdateProductOptionDialogComponent.prototype.updateCode = function (nameValue) {
            if (!this.codeInputTouched && !this.productOption.code) {
                this.code = normalizeString.normalizeString(nameValue, '-');
            }
        };
        return UpdateProductOptionDialogComponent;
    }());
    UpdateProductOptionDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-update-product-option-dialog',
                    template: "<ng-template vdrDialogTitle>{{ 'catalog.update-product-option' | translate }}</ng-template>\n<vdr-form-field [label]=\"'catalog.option-name' | translate\" for=\"name\">\n    <input\n        id=\"name\"\n        type=\"text\"\n        #nameInput=\"ngModel\"\n        [(ngModel)]=\"name\"\n        required\n        (input)=\"updateCode($event.target.value)\"\n    />\n</vdr-form-field>\n<vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n    <input id=\"code\" type=\"text\" #codeInput=\"ngModel\" required [(ngModel)]=\"code\" pattern=\"[a-z0-9_-]+\" />\n</vdr-form-field>\n<clr-checkbox-wrapper>\n    <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"updateVariantName\" />\n    <label>{{ 'catalog.auto-update-option-variant-name' | translate }}</label>\n</clr-checkbox-wrapper>\n<section *ngIf=\"customFields.length\">\n    <label>{{ 'common.custom-fields' | translate }}</label>\n    <ng-container *ngFor=\"let customField of customFields\">\n        <vdr-custom-field-control\n            *ngIf=\"customFieldsForm.get(customField.name)\"\n            entityName=\"ProductOption\"\n            [customFieldsFormGroup]=\"customFieldsForm\"\n            [customField]=\"customField\"\n            [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n        ></vdr-custom-field-control>\n    </ng-container>\n</section>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"update()\"\n        [disabled]=\"\n            nameInput.invalid ||\n            codeInput.invalid ||\n            (nameInput.pristine && codeInput.pristine && customFieldsForm.pristine)\n        \"\n        class=\"btn btn-primary\"\n    >\n        {{ 'catalog.update-product-option' | translate }}\n    </button>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [""]
                },] }
    ];

    var ProductVariantsListComponent = /** @class */ (function () {
        function ProductVariantsListComponent(changeDetector, modalService, dataService) {
            this.changeDetector = changeDetector;
            this.modalService = modalService;
            this.dataService = dataService;
            this.assignToChannel = new i0.EventEmitter();
            this.removeFromChannel = new i0.EventEmitter();
            this.assetChange = new i0.EventEmitter();
            this.selectionChange = new i0.EventEmitter();
            this.selectFacetValueClick = new i0.EventEmitter();
            this.updateProductOption = new i0.EventEmitter();
            this.selectedVariantIds = [];
            this.pagination = {
                currentPage: 1,
                itemsPerPage: 10,
            };
            this.formGroupMap = new Map();
            this.GlobalFlag = i2.GlobalFlag;
            this.updatePermission = [i2.Permission.UpdateCatalog, i2.Permission.UpdateProduct];
        }
        ProductVariantsListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.dataService.settings.getGlobalSettings('cache-first').single$.subscribe(function (_c) {
                var globalSettings = _c.globalSettings;
                _this.globalTrackInventory = globalSettings.trackInventory;
                _this.globalOutOfStockThreshold = globalSettings.outOfStockThreshold;
                _this.changeDetector.markForCheck();
            });
            this.subscription = this.formArray.valueChanges.subscribe(function () { return _this.changeDetector.markForCheck(); });
            this.subscription.add(this.formArray.valueChanges
                .pipe(operators.map(function (value) { return value.length; }), operators.debounceTime(1), operators.distinctUntilChanged())
                .subscribe(function () {
                _this.buildFormGroupMap();
            }));
            this.buildFormGroupMap();
        };
        ProductVariantsListComponent.prototype.ngOnChanges = function (changes) {
            var _a, _b;
            if ('facets' in changes && !!changes['facets'].currentValue) {
                this.facetValues = i2.flattenFacetValues(this.facets);
            }
            if ('variants' in changes) {
                if (((_a = changes['variants'].currentValue) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = changes['variants'].previousValue) === null || _b === void 0 ? void 0 : _b.length)) {
                    this.pagination.currentPage = 1;
                }
            }
        };
        ProductVariantsListComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        ProductVariantsListComponent.prototype.isDefaultChannel = function (channelCode) {
            return channelCode === sharedConstants.DEFAULT_CHANNEL_CODE;
        };
        ProductVariantsListComponent.prototype.trackById = function (index, item) {
            return item.id;
        };
        ProductVariantsListComponent.prototype.inventoryIsNotTracked = function (formGroup) {
            var _a;
            var trackInventory = (_a = formGroup.get('trackInventory')) === null || _a === void 0 ? void 0 : _a.value;
            return (trackInventory === i2.GlobalFlag.FALSE ||
                (trackInventory === i2.GlobalFlag.INHERIT && this.globalTrackInventory === false));
        };
        ProductVariantsListComponent.prototype.getTaxCategoryName = function (group) {
            var control = group.get(['taxCategoryId']);
            if (control && this.taxCategories) {
                var match = this.taxCategories.find(function (t) { return t.id === control.value; });
                return match ? match.name : '';
            }
            return '';
        };
        ProductVariantsListComponent.prototype.getSaleableStockLevel = function (variant) {
            var effectiveOutOfStockThreshold = variant.useGlobalOutOfStockThreshold
                ? this.globalOutOfStockThreshold
                : variant.outOfStockThreshold;
            return variant.stockOnHand - variant.stockAllocated - effectiveOutOfStockThreshold;
        };
        ProductVariantsListComponent.prototype.areAllSelected = function () {
            return !!this.variants && this.selectedVariantIds.length === this.variants.length;
        };
        ProductVariantsListComponent.prototype.onAssetChange = function (variantId, event) {
            this.assetChange.emit(Object.assign({ variantId: variantId }, event));
            var index = this.variants.findIndex(function (v) { return v.id === variantId; });
            this.formArray.at(index).markAsDirty();
        };
        ProductVariantsListComponent.prototype.toggleSelectAll = function () {
            if (this.areAllSelected()) {
                this.selectedVariantIds = [];
            }
            else {
                this.selectedVariantIds = this.variants.map(function (v) { return v.id; });
            }
            this.selectionChange.emit(this.selectedVariantIds);
        };
        ProductVariantsListComponent.prototype.toggleSelectVariant = function (variantId) {
            var index = this.selectedVariantIds.indexOf(variantId);
            if (-1 < index) {
                this.selectedVariantIds.splice(index, 1);
            }
            else {
                this.selectedVariantIds.push(variantId);
            }
            this.selectionChange.emit(this.selectedVariantIds);
        };
        ProductVariantsListComponent.prototype.optionGroupName = function (optionGroupId) {
            var _this = this;
            var _a;
            var group = this.optionGroups.find(function (g) { return g.id === optionGroupId; });
            if (group) {
                var translation = (_a = group === null || group === void 0 ? void 0 : group.translations.find(function (t) { return t.languageCode === _this.activeLanguage; })) !== null && _a !== void 0 ? _a : group.translations[0];
                return translation.name;
            }
        };
        ProductVariantsListComponent.prototype.optionName = function (option) {
            var _this = this;
            var _a;
            var translation = (_a = option.translations.find(function (t) { return t.languageCode === _this.activeLanguage; })) !== null && _a !== void 0 ? _a : option.translations[0];
            return translation.name;
        };
        ProductVariantsListComponent.prototype.pendingFacetValues = function (variant) {
            var _this = this;
            if (this.facets) {
                var formFacetValueIds = this.getFacetValueIds(variant.id);
                var variantFacetValueIds_1 = variant.facetValues.map(function (fv) { return fv.id; });
                return formFacetValueIds
                    .filter(function (x) { return !variantFacetValueIds_1.includes(x); })
                    .map(function (id) { return _this.facetValues.find(function (fv) { return fv.id === id; }); })
                    .filter(sharedUtils.notNullOrUndefined);
            }
            else {
                return [];
            }
        };
        ProductVariantsListComponent.prototype.existingFacetValues = function (variant) {
            var formFacetValueIds = this.getFacetValueIds(variant.id);
            var intersection = __spread(formFacetValueIds).filter(function (x) { return variant.facetValues.map(function (fv) { return fv.id; }).includes(x); });
            return intersection
                .map(function (id) { return variant.facetValues.find(function (fv) { return fv.id === id; }); })
                .filter(sharedUtils.notNullOrUndefined);
        };
        ProductVariantsListComponent.prototype.removeFacetValue = function (variant, facetValueId) {
            var formGroup = this.formGroupMap.get(variant.id);
            if (formGroup) {
                var newValue = formGroup.value.facetValueIds.filter(function (id) { return id !== facetValueId; });
                formGroup.patchValue({
                    facetValueIds: newValue,
                });
                formGroup.markAsDirty();
            }
        };
        ProductVariantsListComponent.prototype.isVariantSelected = function (variantId) {
            return -1 < this.selectedVariantIds.indexOf(variantId);
        };
        ProductVariantsListComponent.prototype.editOption = function (option) {
            var _this = this;
            this.modalService
                .fromComponent(UpdateProductOptionDialogComponent, {
                size: 'md',
                locals: {
                    productOption: option,
                    activeLanguage: this.activeLanguage,
                    customFields: this.customOptionFields,
                },
            })
                .subscribe(function (result) {
                if (result) {
                    _this.updateProductOption.emit(result);
                }
            });
        };
        ProductVariantsListComponent.prototype.buildFormGroupMap = function () {
            var e_1, _c;
            this.formGroupMap.clear();
            try {
                for (var _d = __values(this.formArray.controls), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var controlGroup = _e.value;
                    this.formGroupMap.set(controlGroup.value.id, controlGroup);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.changeDetector.markForCheck();
        };
        ProductVariantsListComponent.prototype.getFacetValueIds = function (id) {
            var _a;
            var formValue = (_a = this.formGroupMap.get(id)) === null || _a === void 0 ? void 0 : _a.value;
            return formValue.facetValueIds;
        };
        return ProductVariantsListComponent;
    }());
    ProductVariantsListComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-variants-list',
                    template: "<div class=\"variants-list\">\n    <div\n        class=\"variant-container card\"\n        *ngFor=\"let variant of variants | paginate: pagination; trackBy: trackById; let i = index\"\n        [class.disabled]=\"!formGroupMap.get(variant.id)?.get('enabled')?.value\"\n    >\n        <ng-container *ngIf=\"formGroupMap.get(variant.id) as formGroup\" [formGroup]=\"formGroup\">\n            <div class=\"card-block header-row\">\n                <div class=\"details\">\n                    <vdr-title-input class=\"sku\" [readonly]=\"!(updatePermission | hasPermission)\">\n                        <clr-input-container>\n                            <input\n                                clrInput\n                                type=\"text\"\n                                formControlName=\"sku\"\n                                [readonly]=\"!(updatePermission | hasPermission)\"\n                                [placeholder]=\"'catalog.sku' | translate\"\n                            />\n                        </clr-input-container>\n                    </vdr-title-input>\n                    <vdr-title-input class=\"name\" [readonly]=\"!(updatePermission | hasPermission)\">\n                        <clr-input-container>\n                            <input\n                                clrInput\n                                type=\"text\"\n                                formControlName=\"name\"\n                                [readonly]=\"!(updatePermission | hasPermission)\"\n                                [placeholder]=\"'common.name' | translate\"\n                            />\n                        </clr-input-container>\n                    </vdr-title-input>\n                </div>\n                <div class=\"right-controls\">\n                    <clr-toggle-wrapper *vdrIfPermissions=\"updatePermission\">\n                        <input type=\"checkbox\" clrToggle name=\"enabled\" formControlName=\"enabled\" />\n                        <label>{{ 'common.enabled' | translate }}</label>\n                    </clr-toggle-wrapper>\n                </div>\n            </div>\n            <div class=\"card-block\">\n                <div class=\"variant-body\">\n                    <div class=\"assets\">\n                        <vdr-product-assets\n                            [compact]=\"true\"\n                            [assets]=\"pendingAssetChanges[variant.id]?.assets || variant.assets\"\n                            [featuredAsset]=\"pendingAssetChanges[variant.id]?.featuredAsset || variant.featuredAsset\"\n                            (change)=\"onAssetChange(variant.id, $event)\"\n                        ></vdr-product-assets>\n                    </div>\n                    <div class=\"variant-form-inputs\">\n                        <div class=\"standard-fields\">\n                            <div class=\"variant-form-input-row\">\n                                <div class=\"tax-category\">\n                                    <clr-select-container\n                                        *vdrIfPermissions=\"updatePermission; else taxCategoryLabel\"\n                                    >\n                                        <label>{{ 'catalog.tax-category' | translate }}</label>\n                                        <select clrSelect name=\"options\" formControlName=\"taxCategoryId\">\n                                            <option\n                                                *ngFor=\"let taxCategory of taxCategories\"\n                                                [value]=\"taxCategory.id\"\n                                            >\n                                                {{ taxCategory.name }}\n                                            </option>\n                                        </select>\n                                    </clr-select-container>\n                                    <ng-template #taxCategoryLabel>\n                                        <label class=\"clr-control-label\">{{\n                                            'catalog.tax-category' | translate\n                                        }}</label>\n                                        <div class=\"tax-category-label\">\n                                            {{ getTaxCategoryName(formGroup) }}\n                                        </div>\n                                    </ng-template>\n                                </div>\n                                <div class=\"price\">\n                                    <clr-input-container>\n                                        <label>{{ 'catalog.price' | translate }}</label>\n                                        <vdr-currency-input\n                                            *ngIf=\"!channelPriceIncludesTax\"\n                                            clrInput\n                                            [currencyCode]=\"variant.currencyCode\"\n                                            [readonly]=\"!(updatePermission | hasPermission)\"\n                                            formControlName=\"price\"\n                                        ></vdr-currency-input>\n                                        <vdr-currency-input\n                                            *ngIf=\"channelPriceIncludesTax\"\n                                            clrInput\n                                            [currencyCode]=\"variant.currencyCode\"\n                                            [readonly]=\"!(updatePermission | hasPermission)\"\n                                            formControlName=\"priceWithTax\"\n                                        ></vdr-currency-input>\n                                    </clr-input-container>\n                                </div>\n                                <vdr-variant-price-detail\n                                    [price]=\"formGroup.get('price')!.value\"\n                                    [currencyCode]=\"variant.currencyCode\"\n                                    [priceIncludesTax]=\"channelPriceIncludesTax\"\n                                    [taxCategoryId]=\"formGroup.get('taxCategoryId')!.value\"\n                                ></vdr-variant-price-detail>\n                            </div>\n                            <div class=\"variant-form-input-row\">\n                                <clr-select-container *vdrIfPermissions=\"updatePermission\">\n                                    <label\n                                        >{{ 'catalog.track-inventory' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.track-inventory-tooltip' | translate\"\n                                        ></vdr-help-tooltip>\n                                    </label>\n                                    <select clrSelect name=\"options\" formControlName=\"trackInventory\">\n                                        <option [value]=\"GlobalFlag.TRUE\">\n                                            {{ 'catalog.track-inventory-true' | translate }}\n                                        </option>\n                                        <option [value]=\"GlobalFlag.FALSE\">\n                                            {{ 'catalog.track-inventory-false' | translate }}\n                                        </option>\n                                        <option [value]=\"GlobalFlag.INHERIT\">\n                                            {{ 'catalog.track-inventory-inherit' | translate }}\n                                        </option>\n                                    </select>\n                                </clr-select-container>\n                                <clr-input-container>\n                                    <label\n                                        >{{ 'catalog.stock-on-hand' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.stock-on-hand-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <input\n                                        [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\"\n                                        clrInput\n                                        type=\"number\"\n                                        min=\"0\"\n                                        step=\"1\"\n                                        formControlName=\"stockOnHand\"\n                                        [readonly]=\"!(updatePermission | hasPermission)\"\n                                        [vdrDisabled]=\"inventoryIsNotTracked(formGroup)\"\n                                    />\n                                </clr-input-container>\n                                <div [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\">\n                                    <label class=\"clr-control-label\"\n                                        >{{ 'catalog.stock-allocated' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.stock-allocated-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <div class=\"value\">\n                                        {{ variant.stockAllocated }}\n                                    </div>\n                                </div>\n                                <div [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\">\n                                    <label class=\"clr-control-label\"\n                                        >{{ 'catalog.stock-saleable' | translate }}\n                                        <vdr-help-tooltip\n                                            [content]=\"'catalog.stock-saleable-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <div class=\"value\">\n                                        {{ getSaleableStockLevel(variant) }}\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"variant-form-input-row\">\n                                <div\n                                    class=\"out-of-stock-threshold-wrapper\"\n                                    [class.inventory-untracked]=\"inventoryIsNotTracked(formGroup)\"\n                                >\n                                    <label class=\"clr-control-label\"\n                                        >{{ 'catalog.out-of-stock-threshold' | translate\n                                        }}<vdr-help-tooltip\n                                            [content]=\"'catalog.out-of-stock-threshold-tooltip' | translate\"\n                                        ></vdr-help-tooltip\n                                    ></label>\n                                    <div class=\"flex\">\n                                        <clr-input-container>\n                                            <input\n                                                clrInput\n                                                type=\"number\"\n                                                [formControl]=\"formGroup.get('outOfStockThreshold')\"\n                                                [readonly]=\"!(updatePermission | hasPermission)\"\n                                                [vdrDisabled]=\"\n                                                    formGroup.get('useGlobalOutOfStockThreshold')?.value !==\n                                                        false || inventoryIsNotTracked(formGroup)\n                                                \"\n                                            />\n                                        </clr-input-container>\n                                        <clr-toggle-wrapper>\n                                            <input\n                                                type=\"checkbox\"\n                                                clrToggle\n                                                name=\"useGlobalOutOfStockThreshold\"\n                                                formControlName=\"useGlobalOutOfStockThreshold\"\n                                                [vdrDisabled]=\"\n                                                    !(updatePermission | hasPermission) ||\n                                                    inventoryIsNotTracked(formGroup)\n                                                \"\n                                            />\n                                            <label\n                                                >{{ 'catalog.use-global-value' | translate }} ({{\n                                                    globalOutOfStockThreshold\n                                                }})</label\n                                            >\n                                        </clr-toggle-wrapper>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"custom-fields\">\n                            <div class=\"variant-form-input-row\">\n                                <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n                                    <!--<label>{{ 'common.custom-fields' | translate }}</label>-->\n                                    <ng-container *ngFor=\"let customField of customFields\">\n                                        <vdr-custom-field-control\n                                            *ngIf=\"formGroup.get(['customFields', customField.name])\"\n                                            entityName=\"ProductVariant\"\n                                            [compact]=\"true\"\n                                            [customFieldsFormGroup]=\"formGroup.get('customFields')\"\n                                            [readonly]=\"!(updatePermission | hasPermission)\"\n                                            [customField]=\"customField\"\n                                        ></vdr-custom-field-control>\n                                    </ng-container>\n                                </section>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"card-block\">\n                <div class=\"options-facets\">\n                    <vdr-entity-info [entity]=\"variant\"></vdr-entity-info>\n                    <div *ngIf=\"variant.options.length\">\n                        <div class=\"options\">\n                            <vdr-chip\n                                *ngFor=\"let option of variant.options | sort: 'groupId'\"\n                                [colorFrom]=\"optionGroupName(option.groupId)\"\n                                [invert]=\"true\"\n                                (iconClick)=\"editOption(option)\"\n                                [icon]=\"(updatePermission | hasPermission) && 'pencil'\"\n                            >\n                                <span class=\"option-group-name\">{{ optionGroupName(option.groupId) }}</span>\n                                {{ optionName(option) }}\n                            </vdr-chip>\n                        </div>\n                    </div>\n                    <div class=\"flex-spacer\"></div>\n                    <div class=\"facets\">\n                        <vdr-facet-value-chip\n                            *ngFor=\"let facetValue of existingFacetValues(variant)\"\n                            [facetValue]=\"facetValue\"\n                            [removable]=\"updatePermission | hasPermission\"\n                            (remove)=\"removeFacetValue(variant, facetValue.id)\"\n                        ></vdr-facet-value-chip>\n                        <vdr-facet-value-chip\n                            *ngFor=\"let facetValue of pendingFacetValues(variant)\"\n                            [facetValue]=\"facetValue\"\n                            [removable]=\"updatePermission | hasPermission\"\n                            (remove)=\"removeFacetValue(variant, facetValue.id)\"\n                        ></vdr-facet-value-chip>\n                        <button\n                            *vdrIfPermissions=\"updatePermission\"\n                            class=\"btn btn-sm btn-secondary\"\n                            (click)=\"selectFacetValueClick.emit([variant.id])\"\n                        >\n                            <clr-icon shape=\"plus\"></clr-icon>\n                            {{ 'catalog.add-facets' | translate }}\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <ng-container *vdrIfMultichannel>\n                <div class=\"card-block\" *vdrIfDefaultChannelActive>\n                    <div class=\"flex channel-assignment\">\n                        <ng-container *ngFor=\"let channel of variant.channels\">\n                            <vdr-chip\n                                *ngIf=\"!isDefaultChannel(channel.code)\"\n                                icon=\"times-circle\"\n                                [title]=\"'catalog.remove-from-channel' | translate\"\n                                (iconClick)=\"\n                                    removeFromChannel.emit({ channelId: channel.id, variant: variant })\n                                \"\n                            >\n                                <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n                                {{ channel.code | channelCodeToLabel }}\n                            </vdr-chip>\n                        </ng-container>\n                        <button class=\"btn btn-sm\" (click)=\"assignToChannel.emit(variant)\">\n                            <clr-icon shape=\"layers\"></clr-icon>\n                            {{ 'catalog.assign-to-channel' | translate }}\n                        </button>\n                    </div>\n                </div>\n            </ng-container>\n        </ng-container>\n    </div>\n    <div class=\"table-footer\">\n        <vdr-items-per-page-controls [(itemsPerPage)]=\"pagination.itemsPerPage\"></vdr-items-per-page-controls>\n\n        <vdr-pagination-controls\n            [currentPage]=\"pagination.currentPage\"\n            [itemsPerPage]=\"pagination.itemsPerPage\"\n            (pageChange)=\"pagination.currentPage = $event\"\n        ></vdr-pagination-controls>\n    </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".with-selected{display:flex;min-height:52px;align-items:center;border:1px solid var(--color-component-border-100);border-radius:3px;padding:6px 18px}.with-selected>label,.with-selected vdr-select-toggle{margin-right:12px}.variant-container{transition:background-color .2s;min-height:330px}.variant-container.disabled{background-color:var(--color-component-bg-200)}.variant-container .header-row{display:flex;align-items:center;flex-wrap:wrap}.variant-container .variant-body{display:flex;flex-direction:column}@media screen and (min-width:768px){.variant-container .variant-body{flex-direction:row}}.variant-container .details{display:flex;flex-direction:column;flex:1;margin-right:12px}@media screen and (min-width:768px){.variant-container .details{flex-direction:row;height:36px}}.variant-container .details .name{flex:1}.variant-container .details .name ::ng-deep .clr-control-container{width:100%}.variant-container .details .name ::ng-deep .clr-control-container input.clr-input{min-width:100%}.variant-container .details .sku{width:160px;margin-right:20px;flex:0}.variant-container .details ::ng-deep .name input{min-width:300px}.variant-container .right-controls{display:flex}.variant-container .tax-category-label{margin-top:3px}.variant-container .variant-form-inputs{flex:1;display:flex;flex-direction:column}@media screen and (min-width:768px){.variant-container .variant-form-inputs{flex-direction:row}}.variant-container .variant-form-input-row{display:flex;flex-wrap:wrap}@media screen and (min-width:768px){.variant-container .variant-form-input-row{margin:0 6px 8px 24px}}.variant-container .variant-form-input-row>*{margin-right:24px;margin-bottom:24px}.variant-container .track-inventory-toggle{margin-top:22px}.variant-container .clr-form-control{margin-top:0}.variant-container .facets{display:flex;align-items:center}.variant-container .pricing{display:flex}.variant-container .pricing>div{margin-right:12px}.variant-container .option-group-name{color:var(--color-text-200);text-transform:uppercase;font-size:10px;margin-right:3px;height:11px}.variant-container .options-facets{display:flex;color:var(--color-grey-400)}.channel-assignment{justify-content:flex-end}.channel-assignment .btn{margin:6px 12px 6px 0}.out-of-stock-threshold-wrapper{display:flex;flex-direction:column}.out-of-stock-threshold-wrapper clr-toggle-wrapper{margin-left:24px}.inventory-untracked{opacity:.5}.table-footer{display:flex;align-items:baseline;justify-content:space-between;margin-top:6px}"]
                },] }
    ];
    ProductVariantsListComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i2.ModalService },
        { type: i2.DataService }
    ]; };
    ProductVariantsListComponent.propDecorators = {
        formArray: [{ type: i0.Input, args: ['productVariantsFormArray',] }],
        variants: [{ type: i0.Input }],
        channelPriceIncludesTax: [{ type: i0.Input }],
        taxCategories: [{ type: i0.Input }],
        facets: [{ type: i0.Input }],
        optionGroups: [{ type: i0.Input }],
        customFields: [{ type: i0.Input }],
        customOptionFields: [{ type: i0.Input }],
        activeLanguage: [{ type: i0.Input }],
        pendingAssetChanges: [{ type: i0.Input }],
        assignToChannel: [{ type: i0.Output }],
        removeFromChannel: [{ type: i0.Output }],
        assetChange: [{ type: i0.Output }],
        selectionChange: [{ type: i0.Output }],
        selectFacetValueClick: [{ type: i0.Output }],
        updateProductOption: [{ type: i0.Output }]
    };

    var ProductVariantsTableComponent = /** @class */ (function () {
        function ProductVariantsTableComponent(changeDetector) {
            this.changeDetector = changeDetector;
            this.formGroupMap = new Map();
            this.updatePermission = [i2.Permission.UpdateCatalog, i2.Permission.UpdateProduct];
        }
        ProductVariantsTableComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription = this.formArray.valueChanges
                .pipe(operators.map(function (value) { return value.length; }), operators.debounceTime(1), operators.distinctUntilChanged())
                .subscribe(function () {
                _this.buildFormGroupMap();
            });
            this.buildFormGroupMap();
        };
        ProductVariantsTableComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        ProductVariantsTableComponent.prototype.getFeaturedAsset = function (variant) {
            var _a;
            return ((_a = this.pendingAssetChanges[variant.id]) === null || _a === void 0 ? void 0 : _a.featuredAsset) || variant.featuredAsset;
        };
        ProductVariantsTableComponent.prototype.optionGroupName = function (optionGroupId) {
            var group = this.optionGroups.find(function (g) { return g.id === optionGroupId; });
            return group && group.name;
        };
        ProductVariantsTableComponent.prototype.buildFormGroupMap = function () {
            var e_1, _b;
            this.formGroupMap.clear();
            try {
                for (var _c = __values(this.formArray.controls), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var controlGroup = _d.value;
                    this.formGroupMap.set(controlGroup.value.id, controlGroup);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.changeDetector.markForCheck();
        };
        return ProductVariantsTableComponent;
    }());
    ProductVariantsTableComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-product-variants-table',
                    template: "<vdr-data-table [items]=\"variants\">\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'catalog.sku' | translate }}</vdr-dt-column>\n    <ng-container *ngFor=\"let optionGroup of optionGroups | sort: 'id'\">\n        <vdr-dt-column>{{ optionGroup.name }}</vdr-dt-column>\n    </ng-container>\n    <vdr-dt-column>{{ 'catalog.price' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'catalog.stock-on-hand' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.enabled' | translate }}</vdr-dt-column>\n    <ng-template let-variant=\"item\" let-i=\"index\">\n        <ng-container *ngIf=\"formGroupMap.get(variant.id) as formGroup\" [formGroup]=\"formGroup\">\n            <td class=\"left align-middle\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <div class=\"card-img\">\n                    <div class=\"featured-asset\">\n                        <img\n                            *ngIf=\"getFeaturedAsset(variant) as featuredAsset; else placeholder\"\n                            [src]=\"featuredAsset | assetPreview: 'tiny'\"\n                        />\n                        <ng-template #placeholder>\n                            <div class=\"placeholder\">\n                                <clr-icon shape=\"image\" size=\"48\"></clr-icon>\n                            </div>\n                        </ng-template>\n                    </div>\n                </div>\n            </td>\n            <td class=\"left align-middle\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"text\"\n                        formControlName=\"name\"\n                        [readonly]=\"!(updatePermission | hasPermission)\"\n                        [placeholder]=\"'common.name' | translate\"\n                    />\n                </clr-input-container>\n            </td>\n            <td class=\"left align-middle\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"text\"\n                        formControlName=\"sku\"\n                        [readonly]=\"!(updatePermission | hasPermission)\"\n                        [placeholder]=\"'catalog.sku' | translate\"\n                    />\n                </clr-input-container>\n            </td>\n            <ng-container *ngFor=\"let option of variant.options | sort: 'groupId'\">\n                <td\n                    class=\"left align-middle\"\n                    [class.disabled]=\"!formGroup.get('enabled')!.value\"\n                    [style.color]=\"optionGroupName(option.groupId) | stringToColor\"\n                >\n                    {{ option.name }}\n                </td>\n            </ng-container>\n            <td class=\"left align-middle price\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <clr-input-container>\n                    <vdr-currency-input\n                        *ngIf=\"!channelPriceIncludesTax\"\n                        clrInput\n                        [currencyCode]=\"variant.currencyCode\"\n                        [readonly]=\"!(updatePermission | hasPermission)\"\n                        formControlName=\"price\"\n                    ></vdr-currency-input>\n                    <vdr-currency-input\n                        *ngIf=\"channelPriceIncludesTax\"\n                        clrInput\n                        [currencyCode]=\"variant.currencyCode\"\n                        [readonly]=\"!(updatePermission | hasPermission)\"\n                        formControlName=\"priceWithTax\"\n                    ></vdr-currency-input>\n                </clr-input-container>\n            </td>\n            <td class=\"left align-middle stock\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <clr-input-container>\n                    <input\n                        clrInput\n                        type=\"number\"\n                        min=\"0\"\n                        step=\"1\"\n                        formControlName=\"stockOnHand\"\n                        [readonly]=\"!(updatePermission | hasPermission)\"\n                    />\n                </clr-input-container>\n            </td>\n            <td class=\"left align-middle stock\" [class.disabled]=\"!formGroup.get('enabled')!.value\">\n                <clr-toggle-wrapper>\n                    <input\n                        type=\"checkbox\"\n                        clrToggle\n                        name=\"enabled\"\n                        formControlName=\"enabled\"\n                        [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                    />\n                </clr-toggle-wrapper>\n            </td>\n        </ng-container>\n    </ng-template>\n</vdr-data-table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [".placeholder{color:var(--color-grey-300)}.price input,.stock input{max-width:96px}td{transition:background-color .2s}td.disabled{background-color:var(--color-component-bg-200)}"]
                },] }
    ];
    ProductVariantsTableComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };
    ProductVariantsTableComponent.propDecorators = {
        formArray: [{ type: i0.Input, args: ['productVariantsFormArray',] }],
        variants: [{ type: i0.Input }],
        channelPriceIncludesTax: [{ type: i0.Input }],
        optionGroups: [{ type: i0.Input }],
        pendingAssetChanges: [{ type: i0.Input }]
    };

    var VariantPriceDetailComponent = /** @class */ (function () {
        function VariantPriceDetailComponent(dataService) {
            this.dataService = dataService;
            this.priceChange$ = new rxjs.BehaviorSubject(0);
            this.taxCategoryIdChange$ = new rxjs.BehaviorSubject('');
        }
        VariantPriceDetailComponent.prototype.ngOnInit = function () {
            var taxRates$ = this.dataService.settings
                .getTaxRates(999, 0, 'cache-first')
                .mapStream(function (data) { return data.taxRates.items; });
            var activeChannel$ = this.dataService.settings
                .getActiveChannel('cache-first')
                .refetchOnChannelChange()
                .mapStream(function (data) { return data.activeChannel; });
            this.taxRate$ = rxjs.combineLatest(activeChannel$, taxRates$, this.taxCategoryIdChange$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 3), channel = _b[0], taxRates = _b[1], taxCategoryId = _b[2];
                var defaultTaxZone = channel.defaultTaxZone;
                if (!defaultTaxZone) {
                    return 0;
                }
                var applicableRate = taxRates.find(function (taxRate) { return taxRate.zone.id === defaultTaxZone.id && taxRate.category.id === taxCategoryId; });
                if (!applicableRate) {
                    return 0;
                }
                return applicableRate.value;
            }));
            this.grossPrice$ = rxjs.combineLatest(this.taxRate$, this.priceChange$).pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), taxRate = _b[0], price = _b[1];
                return Math.round(price * ((100 + taxRate) / 100));
            }));
        };
        VariantPriceDetailComponent.prototype.ngOnChanges = function (changes) {
            if ('price' in changes) {
                this.priceChange$.next(changes.price.currentValue);
            }
            if ('taxCategoryId' in changes) {
                this.taxCategoryIdChange$.next(changes.taxCategoryId.currentValue);
            }
        };
        return VariantPriceDetailComponent;
    }());
    VariantPriceDetailComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'vdr-variant-price-detail',
                    template: "<label class=\"clr-control-label\">{{ 'catalog.taxes' | translate }}</label>\n<div *ngIf=\"priceIncludesTax\" class=\"value\">\n    {{ 'catalog.price-includes-tax-at' | translate: { rate: taxRate$ | async } }}\n</div>\n<div *ngIf=\"!priceIncludesTax\" class=\"value\">\n    {{\n        'catalog.price-with-tax-in-default-zone'\n            | translate: { price: grossPrice$ | async | localeCurrency: currencyCode, rate: taxRate$ | async }\n    }}\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;flex-direction:column}.value{margin-top:3px}"]
                },] }
    ];
    VariantPriceDetailComponent.ctorParameters = function () { return [
        { type: i2.DataService }
    ]; };
    VariantPriceDetailComponent.propDecorators = {
        priceIncludesTax: [{ type: i0.Input }],
        price: [{ type: i0.Input }],
        currencyCode: [{ type: i0.Input }],
        taxCategoryId: [{ type: i0.Input }]
    };

    var CatalogModule = /** @class */ (function () {
        function CatalogModule() {
        }
        return CatalogModule;
    }());
    CatalogModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [i2.SharedModule, i1.RouterModule.forChild(catalogRoutes)],
                    exports: [],
                    declarations: [
                        ProductListComponent,
                        ProductDetailComponent,
                        FacetListComponent,
                        FacetDetailComponent,
                        GenerateProductVariantsComponent,
                        ProductVariantsListComponent,
                        ApplyFacetDialogComponent,
                        AssetListComponent,
                        ProductAssetsComponent,
                        VariantPriceDetailComponent,
                        CollectionListComponent,
                        CollectionDetailComponent,
                        CollectionTreeComponent,
                        CollectionTreeNodeComponent,
                        CollectionContentsComponent,
                        ProductVariantsTableComponent,
                        ProductSearchInputComponent,
                        OptionValueInputComponent,
                        UpdateProductOptionDialogComponent,
                        ProductVariantsEditorComponent,
                        AssignProductsToChannelDialogComponent,
                        AssetDetailComponent,
                    ],
                },] }
    ];

    // This file was generated by the build-public-api.ts script

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ApplyFacetDialogComponent = ApplyFacetDialogComponent;
    exports.AssetDetailComponent = AssetDetailComponent;
    exports.AssetListComponent = AssetListComponent;
    exports.AssetResolver = AssetResolver;
    exports.AssignProductsToChannelDialogComponent = AssignProductsToChannelDialogComponent;
    exports.CatalogModule = CatalogModule;
    exports.CollectionContentsComponent = CollectionContentsComponent;
    exports.CollectionDetailComponent = CollectionDetailComponent;
    exports.CollectionListComponent = CollectionListComponent;
    exports.CollectionResolver = CollectionResolver;
    exports.CollectionTreeComponent = CollectionTreeComponent;
    exports.CollectionTreeNodeComponent = CollectionTreeNodeComponent;
    exports.FacetDetailComponent = FacetDetailComponent;
    exports.FacetListComponent = FacetListComponent;
    exports.FacetResolver = FacetResolver;
    exports.GenerateProductVariantsComponent = GenerateProductVariantsComponent;
    exports.GeneratedVariant = GeneratedVariant;
    exports.OPTION_VALUE_INPUT_VALUE_ACCESSOR = OPTION_VALUE_INPUT_VALUE_ACCESSOR;
    exports.OptionValueInputComponent = OptionValueInputComponent;
    exports.ProductAssetsComponent = ProductAssetsComponent;
    exports.ProductDetailComponent = ProductDetailComponent;
    exports.ProductDetailService = ProductDetailService;
    exports.ProductListComponent = ProductListComponent;
    exports.ProductResolver = ProductResolver;
    exports.ProductSearchInputComponent = ProductSearchInputComponent;
    exports.ProductVariantsEditorComponent = ProductVariantsEditorComponent;
    exports.ProductVariantsListComponent = ProductVariantsListComponent;
    exports.ProductVariantsResolver = ProductVariantsResolver;
    exports.ProductVariantsTableComponent = ProductVariantsTableComponent;
    exports.UpdateProductOptionDialogComponent = UpdateProductOptionDialogComponent;
    exports.VariantPriceDetailComponent = VariantPriceDetailComponent;
    exports.arrayToTree = arrayToTree;
    exports.assetBreadcrumb = assetBreadcrumb;
    exports.catalogRoutes = catalogRoutes;
    exports.collectionBreadcrumb = collectionBreadcrumb;
    exports.facetBreadcrumb = facetBreadcrumb;
    exports.productBreadcrumb = productBreadcrumb;
    exports.productVariantEditorBreadcrumb = productVariantEditorBreadcrumb;
    exports.replaceLast = replaceLast;
    exports.ɵ0 = ɵ0$1;
    exports.ɵ1 = ɵ1;
    exports.ɵ2 = ɵ2;
    exports.ɵ3 = ɵ3;
    exports.ɵ4 = ɵ4;
    exports.ɵ5 = ɵ5;
    exports.ɵ6 = ɵ6;
    exports.ɵ7 = ɵ7;
    exports.ɵ8 = ɵ8;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vendure-admin-ui-catalog.umd.js.map
