import { ChangeDetectorRef, Optional, Pipe } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * @description
 * A replacement of the Angular DatePipe which makes use of the Intl API
 * to format dates according to the selected UI language.
 */
export class LocaleDatePipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, ...args) {
        const [format, locale] = args;
        if (this.locale || typeof locale === 'string') {
            const activeLocale = typeof locale === 'string' ? locale : this.locale;
            const date = value instanceof Date ? value : typeof value === 'string' ? new Date(value) : undefined;
            if (date) {
                const options = this.getOptionsForFormat(typeof format === 'string' ? format : 'medium');
                return new Intl.DateTimeFormat(activeLocale, options).format(date);
            }
        }
    }
    getOptionsForFormat(dateFormat) {
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
    }
}
LocaleDatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeDate',
                pure: false,
            },] }
];
LocaleDatePipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWRhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL3BpcGVzL2xvY2FsZS1kYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRWpGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQ7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyxjQUFlLFNBQVEsY0FBYztJQUM5QyxZQUF3QixXQUF5QixFQUFjLGlCQUFxQztRQUNoRyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFjLEVBQUUsR0FBRyxJQUFlO1FBQ3hDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDM0MsTUFBTSxZQUFZLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkUsTUFBTSxJQUFJLEdBQ04sS0FBSyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUYsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekYsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0RTtTQUNKO0lBQ0wsQ0FBQztJQUVPLG1CQUFtQixDQUFDLFVBQWtCO1FBQzFDLFFBQVEsVUFBVSxFQUFFO1lBQ2hCLEtBQUssUUFBUTtnQkFDVCxPQUFPO29CQUNILEtBQUssRUFBRSxPQUFPO29CQUNkLElBQUksRUFBRSxTQUFTO29CQUNmLEdBQUcsRUFBRSxTQUFTO29CQUNkLElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRSxTQUFTO29CQUNqQixNQUFNLEVBQUUsU0FBUztvQkFDakIsTUFBTSxFQUFFLElBQUk7aUJBQ2YsQ0FBQztZQUNOLEtBQUssWUFBWTtnQkFDYixPQUFPO29CQUNILElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRSxTQUFTO29CQUNqQixNQUFNLEVBQUUsU0FBUztvQkFDakIsTUFBTSxFQUFFLElBQUk7aUJBQ2YsQ0FBQztZQUNOLEtBQUssVUFBVTtnQkFDWCxPQUFPO29CQUNILElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxNQUFNO29CQUNiLEdBQUcsRUFBRSxTQUFTO2lCQUNqQixDQUFDO1lBQ04sS0FBSyxPQUFPO2dCQUNSLE9BQU87b0JBQ0gsR0FBRyxFQUFFLFNBQVM7b0JBQ2QsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRSxTQUFTO29CQUNqQixNQUFNLEVBQUUsSUFBSTtpQkFDZixDQUFDO1lBQ047Z0JBQ0ksT0FBTztTQUNkO0lBQ0wsQ0FBQzs7O1lBMURKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsSUFBSSxFQUFFLEtBQUs7YUFDZDs7O1lBWlEsV0FBVyx1QkFjSCxRQUFRO1lBaEJoQixpQkFBaUIsdUJBZ0I4QixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9wdGlvbmFsLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTG9jYWxlQmFzZVBpcGUgfSBmcm9tICcuL2xvY2FsZS1iYXNlLnBpcGUnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSByZXBsYWNlbWVudCBvZiB0aGUgQW5ndWxhciBEYXRlUGlwZSB3aGljaCBtYWtlcyB1c2Ugb2YgdGhlIEludGwgQVBJXG4gKiB0byBmb3JtYXQgZGF0ZXMgYWNjb3JkaW5nIHRvIHRoZSBzZWxlY3RlZCBVSSBsYW5ndWFnZS5cbiAqL1xuQFBpcGUoe1xuICAgIG5hbWU6ICdsb2NhbGVEYXRlJyxcbiAgICBwdXJlOiBmYWxzZSxcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxlRGF0ZVBpcGUgZXh0ZW5kcyBMb2NhbGVCYXNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIGRhdGFTZXJ2aWNlPzogRGF0YVNlcnZpY2UsIEBPcHRpb25hbCgpIGNoYW5nZURldGVjdG9yUmVmPzogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoZGF0YVNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG4gICAgdHJhbnNmb3JtKHZhbHVlOiB1bmtub3duLCAuLi5hcmdzOiB1bmtub3duW10pOiB1bmtub3duIHtcbiAgICAgICAgY29uc3QgW2Zvcm1hdCwgbG9jYWxlXSA9IGFyZ3M7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsZSB8fCB0eXBlb2YgbG9jYWxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlTG9jYWxlID0gdHlwZW9mIGxvY2FsZSA9PT0gJ3N0cmluZycgPyBsb2NhbGUgOiB0aGlzLmxvY2FsZTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPVxuICAgICAgICAgICAgICAgIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IG5ldyBEYXRlKHZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9uc0ZvckZvcm1hdCh0eXBlb2YgZm9ybWF0ID09PSAnc3RyaW5nJyA/IGZvcm1hdCA6ICdtZWRpdW0nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoYWN0aXZlTG9jYWxlLCBvcHRpb25zKS5mb3JtYXQoZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE9wdGlvbnNGb3JGb3JtYXQoZGF0ZUZvcm1hdDogc3RyaW5nKTogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgfCB1bmRlZmluZWQge1xuICAgICAgICBzd2l0Y2ggKGRhdGVGb3JtYXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ21lZGl1bSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6ICdzaG9ydCcsXG4gICAgICAgICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgICAgbWludXRlOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZDogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgICAgICBob3VyMTI6IHRydWUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ21lZGl1bVRpbWUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgICAgbWludXRlOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZDogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgICAgICBob3VyMTI6IHRydWUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgJ2xvbmdEYXRlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgICAgICAgICAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdzaG9ydCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICAgIHllYXI6ICcyLWRpZ2l0JyxcbiAgICAgICAgICAgICAgICAgICAgaG91cjogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgICAgICBtaW51dGU6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICAgICAgaG91cjEyOiB0cnVlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==