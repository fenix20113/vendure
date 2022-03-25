import { ChangeDetectorRef, Injectable } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
/**
 * Used by locale-aware pipes to handle the task of getting the active languageCode
 * of the UI and cleaning up.
 */
export class LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        if (dataService && changeDetectorRef) {
            this.subscription = dataService.client
                .uiState()
                .mapStream(data => data.uiState.language)
                .subscribe(languageCode => {
                this.locale = languageCode.replace(/_/g, '-');
                changeDetectorRef.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
LocaleBasePipe.decorators = [
    { type: Injectable }
];
LocaleBasePipe.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWJhc2UucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL3BpcGVzL2xvY2FsZS1iYXNlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFHeEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFOzs7R0FHRztBQUVILE1BQU0sT0FBZ0IsY0FBYztJQUloQyxZQUFzQixXQUF5QixFQUFFLGlCQUFxQztRQUNsRixJQUFJLFdBQVcsSUFBSSxpQkFBaUIsRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNO2lCQUNqQyxPQUFPLEVBQUU7aUJBQ1QsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7aUJBQ3hDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDOUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7WUFyQkosVUFBVTs7O1lBTkYsV0FBVztZQUhYLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbi8qKlxuICogVXNlZCBieSBsb2NhbGUtYXdhcmUgcGlwZXMgdG8gaGFuZGxlIHRoZSB0YXNrIG9mIGdldHRpbmcgdGhlIGFjdGl2ZSBsYW5ndWFnZUNvZGVcbiAqIG9mIHRoZSBVSSBhbmQgY2xlYW5pbmcgdXAuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMb2NhbGVCYXNlUGlwZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgUGlwZVRyYW5zZm9ybSB7XG4gICAgcHJvdGVjdGVkIGxvY2FsZTogc3RyaW5nO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZGF0YVNlcnZpY2U/OiBEYXRhU2VydmljZSwgY2hhbmdlRGV0ZWN0b3JSZWY/OiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBpZiAoZGF0YVNlcnZpY2UgJiYgY2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAgICAgLnVpU3RhdGUoKVxuICAgICAgICAgICAgICAgIC5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnVpU3RhdGUubGFuZ3VhZ2UpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShsYW5ndWFnZUNvZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZSA9IGxhbmd1YWdlQ29kZS5yZXBsYWNlKC9fL2csICctJyk7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFic3RyYWN0IHRyYW5zZm9ybSh2YWx1ZTogYW55LCAuLi5hcmdzKTogYW55O1xufVxuIl19