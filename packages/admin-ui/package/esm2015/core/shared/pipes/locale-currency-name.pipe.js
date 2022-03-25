import { ChangeDetectorRef, Optional, Pipe } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { LocaleBasePipe } from './locale-base.pipe';
/**
 * Displays a human-readable name for a given ISO 4217 currency code.
 */
export class LocaleCurrencyNamePipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, display = 'full', locale) {
        var _a;
        if (value == null || value === '') {
            return '';
        }
        if (typeof value !== 'string') {
            return `Invalid currencyCode "${value}"`;
        }
        let name = '';
        let symbol = '';
        const activeLocale = typeof locale === 'string' ? locale : (_a = this.locale) !== null && _a !== void 0 ? _a : 'en';
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
        return display === 'full' ? `${name} (${symbol})` : display === 'name' ? name : symbol;
    }
}
LocaleCurrencyNamePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeCurrencyName',
                pure: false,
            },] }
];
LocaleCurrencyNamePipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWN1cnJlbmN5LW5hbWUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL3BpcGVzL2xvY2FsZS1jdXJyZW5jeS1uYW1lLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRWpGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQ7O0dBRUc7QUFLSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsY0FBYztJQUN0RCxZQUF3QixXQUF5QixFQUFjLGlCQUFxQztRQUNoRyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFVLEVBQUUsVUFBc0MsTUFBTSxFQUFFLE1BQWdCOztRQUNoRixJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUMvQixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyx5QkFBeUIsS0FBWSxHQUFHLENBQUM7U0FDbkQ7UUFDRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxZQUFZLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFDLElBQUksQ0FBQyxNQUFNLG1DQUFJLElBQUksQ0FBQztRQUUvRSxJQUFJLE9BQU8sS0FBSyxNQUFNLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUMxQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRTtnQkFDdkMsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLGVBQWUsRUFBRSxNQUFNO2FBQzFCLENBQUM7aUJBQ0csTUFBTSxDQUFDLFNBQWdCLENBQUM7aUJBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakM7UUFDRCxJQUFJLE9BQU8sS0FBSyxNQUFNLElBQUksT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUM1QyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRTtnQkFDekMsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLGVBQWUsRUFBRSxRQUFRO2FBQzVCLENBQUM7aUJBQ0csTUFBTSxDQUFDLFNBQWdCLENBQUM7aUJBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUMzRixDQUFDOzs7WUF0Q0osSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLElBQUksRUFBRSxLQUFLO2FBQ2Q7OztZQVZRLFdBQVcsdUJBWUgsUUFBUTtZQWRoQixpQkFBaUIsdUJBYzhCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgT3B0aW9uYWwsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBMb2NhbGVCYXNlUGlwZSB9IGZyb20gJy4vbG9jYWxlLWJhc2UucGlwZSc7XG5cbi8qKlxuICogRGlzcGxheXMgYSBodW1hbi1yZWFkYWJsZSBuYW1lIGZvciBhIGdpdmVuIElTTyA0MjE3IGN1cnJlbmN5IGNvZGUuXG4gKi9cbkBQaXBlKHtcbiAgICBuYW1lOiAnbG9jYWxlQ3VycmVuY3lOYW1lJyxcbiAgICBwdXJlOiBmYWxzZSxcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxlQ3VycmVuY3lOYW1lUGlwZSBleHRlbmRzIExvY2FsZUJhc2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgZGF0YVNlcnZpY2U/OiBEYXRhU2VydmljZSwgQE9wdGlvbmFsKCkgY2hhbmdlRGV0ZWN0b3JSZWY/OiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihkYXRhU2VydmljZSwgY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIH1cbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgZGlzcGxheTogJ2Z1bGwnIHwgJ3N5bWJvbCcgfCAnbmFtZScgPSAnZnVsbCcsIGxvY2FsZT86IHVua25vd24pOiBhbnkge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGBJbnZhbGlkIGN1cnJlbmN5Q29kZSBcIiR7dmFsdWUgYXMgYW55fVwiYDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmFtZSA9ICcnO1xuICAgICAgICBsZXQgc3ltYm9sID0gJyc7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxvY2FsZSA9IHR5cGVvZiBsb2NhbGUgPT09ICdzdHJpbmcnID8gbG9jYWxlIDogdGhpcy5sb2NhbGUgPz8gJ2VuJztcblxuICAgICAgICBpZiAoZGlzcGxheSA9PT0gJ2Z1bGwnIHx8IGRpc3BsYXkgPT09ICduYW1lJykge1xuICAgICAgICAgICAgbmFtZSA9IG5ldyBJbnRsLk51bWJlckZvcm1hdChhY3RpdmVMb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgICAgICAgICBjdXJyZW5jeTogdmFsdWUsXG4gICAgICAgICAgICAgICAgY3VycmVuY3lEaXNwbGF5OiAnbmFtZScsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5mb3JtYXQodW5kZWZpbmVkIGFzIGFueSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzKk5hTlxccyovLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3BsYXkgPT09ICdmdWxsJyB8fCBkaXNwbGF5ID09PSAnc3ltYm9sJykge1xuICAgICAgICAgICAgc3ltYm9sID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KGFjdGl2ZUxvY2FsZSwge1xuICAgICAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgICAgICAgICAgICAgIGN1cnJlbmN5OiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBjdXJyZW5jeURpc3BsYXk6ICdzeW1ib2wnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZm9ybWF0KHVuZGVmaW5lZCBhcyBhbnkpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xccypOYU5cXHMqLywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXNwbGF5ID09PSAnZnVsbCcgPyBgJHtuYW1lfSAoJHtzeW1ib2x9KWAgOiBkaXNwbGF5ID09PSAnbmFtZScgPyBuYW1lIDogc3ltYm9sO1xuICAgIH1cbn1cbiJdfQ==