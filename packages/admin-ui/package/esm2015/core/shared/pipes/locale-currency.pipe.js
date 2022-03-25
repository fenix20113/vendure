import { ChangeDetectorRef, Optional, Pipe } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
export class LocaleCurrencyPipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, ...args) {
        const [currencyCode, locale] = args;
        if (typeof value === 'number' && typeof currencyCode === 'string') {
            const activeLocale = typeof locale === 'string' ? locale : this.locale;
            const majorUnits = value / 100;
            return new Intl.NumberFormat(activeLocale, { style: 'currency', currency: currencyCode }).format(majorUnits);
        }
        return value;
    }
}
LocaleCurrencyPipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeCurrency',
                pure: false,
            },] }
];
LocaleCurrencyPipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWN1cnJlbmN5LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9waXBlcy9sb2NhbGUtY3VycmVuY3kucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFakYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQU1wRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsY0FBYztJQUNsRCxZQUF3QixXQUF5QixFQUFjLGlCQUFxQztRQUNoRyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFjLEVBQUUsR0FBRyxJQUFlO1FBQ3hDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsRUFBRTtZQUMvRCxNQUFNLFlBQVksR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2RSxNQUFNLFVBQVUsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQy9CLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUM1RixVQUFVLENBQ2IsQ0FBQztTQUNMO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7O1lBbEJKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixJQUFJLEVBQUUsS0FBSzthQUNkOzs7WUFQUSxXQUFXLHVCQVNILFFBQVE7WUFYaEIsaUJBQWlCLHVCQVc4QixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9wdGlvbmFsLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTG9jYWxlQmFzZVBpcGUgfSBmcm9tICcuL2xvY2FsZS1iYXNlLnBpcGUnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2xvY2FsZUN1cnJlbmN5JyxcbiAgICBwdXJlOiBmYWxzZSxcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxlQ3VycmVuY3lQaXBlIGV4dGVuZHMgTG9jYWxlQmFzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBkYXRhU2VydmljZT86IERhdGFTZXJ2aWNlLCBAT3B0aW9uYWwoKSBjaGFuZ2VEZXRlY3RvclJlZj86IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKGRhdGFTZXJ2aWNlLCBjaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgfVxuICAgIHRyYW5zZm9ybSh2YWx1ZTogdW5rbm93biwgLi4uYXJnczogdW5rbm93bltdKTogc3RyaW5nIHwgdW5rbm93biB7XG4gICAgICAgIGNvbnN0IFtjdXJyZW5jeUNvZGUsIGxvY2FsZV0gPSBhcmdzO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgY3VycmVuY3lDb2RlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlTG9jYWxlID0gdHlwZW9mIGxvY2FsZSA9PT0gJ3N0cmluZycgPyBsb2NhbGUgOiB0aGlzLmxvY2FsZTtcbiAgICAgICAgICAgIGNvbnN0IG1ham9yVW5pdHMgPSB2YWx1ZSAvIDEwMDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoYWN0aXZlTG9jYWxlLCB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogY3VycmVuY3lDb2RlIH0pLmZvcm1hdChcbiAgICAgICAgICAgICAgICBtYWpvclVuaXRzLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuIl19