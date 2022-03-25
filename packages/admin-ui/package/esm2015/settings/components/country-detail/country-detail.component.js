import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, createUpdatedTranslatable, DataService, findTranslation, NotificationService, Permission, ServerConfigService, } from '@vendure/admin-ui/core';
import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
export class CountryDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdateCountry];
        this.detailForm = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            enabled: [true],
        });
    }
    ngOnInit() {
        this.init();
        this.country$ = this.entity$;
    }
    ngOnDestroy() {
        this.destroy();
    }
    create() {
        if (!this.detailForm.dirty) {
            return;
        }
        combineLatest(this.country$, this.languageCode$)
            .pipe(take(1), mergeMap(([country, languageCode]) => {
            const formValue = this.detailForm.value;
            const input = createUpdatedTranslatable({
                translatable: country,
                updatedFields: formValue,
                languageCode,
                defaultTranslation: {
                    name: formValue.name,
                    languageCode,
                },
            });
            return this.dataService.settings.createCountry(input);
        }))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'Country',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createCountry.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
                entity: 'Country',
            });
        });
    }
    save() {
        combineLatest(this.country$, this.languageCode$)
            .pipe(take(1), mergeMap(([country, languageCode]) => {
            const formValue = this.detailForm.value;
            const input = createUpdatedTranslatable({
                translatable: country,
                updatedFields: formValue,
                languageCode,
                defaultTranslation: {
                    name: formValue.name,
                    languageCode,
                },
            });
            return this.dataService.settings.updateCountry(input);
        }))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'Country',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'Country',
            });
        });
    }
    setFormValues(country, languageCode) {
        const currentTranslation = findTranslation(country, languageCode);
        this.detailForm.patchValue({
            code: country.code,
            name: currentTranslation ? currentTranslation.name : '',
            enabled: country.enabled,
        });
    }
}
CountryDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-country-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"country-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                *vdrIfPermissions=\"updatePermission\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.enabled' | translate\" for=\"enabled\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"enabled\"\n                formControlName=\"enabled\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n</form>\n",
                styles: [""]
            },] }
];
CountryDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvY29tcG9uZW50cy9jb3VudHJ5LWRldGFpbC9jb3VudHJ5LWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILG1CQUFtQixFQUduQix5QkFBeUIsRUFDekIsV0FBVyxFQUNYLGVBQWUsRUFFZixtQkFBbUIsRUFDbkIsVUFBVSxFQUNWLG1CQUFtQixHQUV0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU9oRCxNQUFNLE9BQU8sc0JBQ1QsU0FBUSxtQkFBcUM7SUFNN0MsWUFDSSxNQUFjLEVBQ2QsS0FBcUIsRUFDckIsbUJBQXdDLEVBQ2hDLGNBQWlDLEVBQy9CLFdBQXdCLEVBQzFCLFdBQXdCLEVBQ3hCLG1CQUF3QztRQUVoRCxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUwvQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDL0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5C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bkIsbUJBQW1CO1lBZGQsaUJBQWlCO1lBU3RCLFdBQVc7WUFSTixXQUFXO1lBV2hCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEJhc2VEZXRhaWxDb21wb25lbnQsXG4gICAgQ291bnRyeSxcbiAgICBDcmVhdGVDb3VudHJ5SW5wdXQsXG4gICAgY3JlYXRlVXBkYXRlZFRyYW5zbGF0YWJsZSxcbiAgICBEYXRhU2VydmljZSxcbiAgICBmaW5kVHJhbnNsYXRpb24sXG4gICAgTGFuZ3VhZ2VDb2RlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgUGVybWlzc2lvbixcbiAgICBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgIFVwZGF0ZUNvdW50cnlJbnB1dCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY291bnRyeS1kZXRhaWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb3VudHJ5LWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY291bnRyeS1kZXRhaWwuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ291bnRyeURldGFpbENvbXBvbmVudFxuICAgIGV4dGVuZHMgQmFzZURldGFpbENvbXBvbmVudDxDb3VudHJ5LkZyYWdtZW50PlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGNvdW50cnkkOiBPYnNlcnZhYmxlPENvdW50cnkuRnJhZ21lbnQ+O1xuICAgIGRldGFpbEZvcm06IEZvcm1Hcm91cDtcbiAgICByZWFkb25seSB1cGRhdGVQZXJtaXNzaW9uID0gW1Blcm1pc3Npb24uVXBkYXRlU2V0dGluZ3MsIFBlcm1pc3Npb24uVXBkYXRlQ291bnRyeV07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlLCByb3V0ZXIsIHNlcnZlckNvbmZpZ1NlcnZpY2UsIGRhdGFTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBjb2RlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgbmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGVuYWJsZWQ6IFt0cnVlXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLmNvdW50cnkkID0gdGhpcy5lbnRpdHkkO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXRhaWxGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLmNvdW50cnkkLCB0aGlzLmxhbmd1YWdlQ29kZSQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKChbY291bnRyeSwgbGFuZ3VhZ2VDb2RlXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLmRldGFpbEZvcm0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0OiBDcmVhdGVDb3VudHJ5SW5wdXQgPSBjcmVhdGVVcGRhdGVkVHJhbnNsYXRhYmxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0YWJsZTogY291bnRyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRGaWVsZHM6IGZvcm1WYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUcmFuc2xhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGZvcm1WYWx1ZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy5jcmVhdGVDb3VudHJ5KGlucHV0KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ291bnRyeScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCBkYXRhLmNyZWF0ZUNvdW50cnkuaWRdLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1jcmVhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ291bnRyeScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5jb3VudHJ5JCwgdGhpcy5sYW5ndWFnZUNvZGUkKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoW2NvdW50cnksIGxhbmd1YWdlQ29kZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5kZXRhaWxGb3JtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dDogVXBkYXRlQ291bnRyeUlucHV0ID0gY3JlYXRlVXBkYXRlZFRyYW5zbGF0YWJsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGFibGU6IGNvdW50cnksXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRmllbGRzOiBmb3JtVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZUNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VHJhbnNsYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmb3JtVmFsdWUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZUNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3MudXBkYXRlQ291bnRyeShpbnB1dCk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0NvdW50cnknLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ291bnRyeScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRGb3JtVmFsdWVzKGNvdW50cnk6IENvdW50cnksIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUcmFuc2xhdGlvbiA9IGZpbmRUcmFuc2xhdGlvbihjb3VudHJ5LCBsYW5ndWFnZUNvZGUpO1xuXG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5wYXRjaFZhbHVlKHtcbiAgICAgICAgICAgIGNvZGU6IGNvdW50cnkuY29kZSxcbiAgICAgICAgICAgIG5hbWU6IGN1cnJlbnRUcmFuc2xhdGlvbiA/IGN1cnJlbnRUcmFuc2xhdGlvbi5uYW1lIDogJycsXG4gICAgICAgICAgICBlbmFibGVkOiBjb3VudHJ5LmVuYWJsZWQsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==