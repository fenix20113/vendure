import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export class ExternalImageDialogComponent {
    constructor() {
        this.previewLoaded = false;
    }
    ngOnInit() {
        this.form = new FormGroup({
            src: new FormControl(this.existing ? this.existing.src : '', Validators.required),
            title: new FormControl(this.existing ? this.existing.title : ''),
            alt: new FormControl(this.existing ? this.existing.alt : ''),
        });
    }
    select() {
        this.resolveWith(this.form.value);
    }
    onImageLoad(event) {
        this.previewLoaded = true;
    }
    onImageError(event) {
        this.previewLoaded = false;
    }
}
ExternalImageDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-external-image-dialog',
                template: "<div class=\"flex\">\n    <form [formGroup]=\"form\" class=\"flex-spacer\" clrForm clrLayout=\"vertical\">\n        <clr-input-container class=\"expand\">\n            <label>{{ 'editor.image-src' | translate }}</label>\n            <input clrInput type=\"text\" formControlName=\"src\" />\n        </clr-input-container>\n        <clr-input-container class=\"expand\">\n            <label>{{ 'editor.image-title' | translate }}</label>\n            <input clrInput type=\"text\" formControlName=\"title\" />\n        </clr-input-container>\n        <clr-input-container class=\"expand\">\n            <label>{{ 'editor.image-alt' | translate }}</label>\n            <input clrInput type=\"text\" formControlName=\"alt\" />\n        </clr-input-container>\n    </form>\n    <div class=\"preview\">\n        <img\n            [src]=\"form.get('src')?.value\"\n            [class.visible]=\"previewLoaded\"\n            (load)=\"onImageLoad($event)\"\n            (error)=\"onImageError($event)\"\n        />\n        <div class=\"placeholder\" *ngIf=\"!previewLoaded\">\n            <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n        </div>\n    </div>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"form.invalid || !previewLoaded\">\n        {{ 'editor.insert-image' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".preview{display:flex;align-items:center;justify-content:center;max-width:150px;margin-left:12px}.preview img{max-width:100%;display:none}.preview img.visible{display:block}.preview .placeholder{color:var(--color-grey-300)}"]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtaW1hZ2UtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvcmljaC10ZXh0LWVkaXRvci9leHRlcm5hbC1pbWFnZS1kaWFsb2cvZXh0ZXJuYWwtaW1hZ2UtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBZ0JwRSxNQUFNLE9BQU8sNEJBQTRCO0lBTnpDO1FBVUksa0JBQWEsR0FBRyxLQUFLLENBQUM7SUFzQjFCLENBQUM7SUFuQkcsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDdEIsR0FBRyxFQUFFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNqRixLQUFLLEVBQUUsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNoRSxHQUFHLEVBQUUsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUMvRCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVk7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFZO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7OztZQS9CSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsMjRDQUFxRDtnQkFFckQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZXJuYWxJbWFnZUF0dHJzIHtcbiAgICBzcmM6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGFsdDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1leHRlcm5hbC1pbWFnZS1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9leHRlcm5hbC1pbWFnZS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2V4dGVybmFsLWltYWdlLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBFeHRlcm5hbEltYWdlRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEaWFsb2c8RXh0ZXJuYWxJbWFnZUF0dHJzPiB7XG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBFeHRlcm5hbEltYWdlQXR0cnMpID0+IHZvaWQ7XG4gICAgcHJldmlld0xvYWRlZCA9IGZhbHNlO1xuICAgIGV4aXN0aW5nPzogRXh0ZXJuYWxJbWFnZUF0dHJzO1xuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgICAgICAgc3JjOiBuZXcgRm9ybUNvbnRyb2wodGhpcy5leGlzdGluZyA/IHRoaXMuZXhpc3Rpbmcuc3JjIDogJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgICAgICAgdGl0bGU6IG5ldyBGb3JtQ29udHJvbCh0aGlzLmV4aXN0aW5nID8gdGhpcy5leGlzdGluZy50aXRsZSA6ICcnKSxcbiAgICAgICAgICAgIGFsdDogbmV3IEZvcm1Db250cm9sKHRoaXMuZXhpc3RpbmcgPyB0aGlzLmV4aXN0aW5nLmFsdCA6ICcnKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgfVxuXG4gICAgb25JbWFnZUxvYWQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJldmlld0xvYWRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25JbWFnZUVycm9yKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnByZXZpZXdMb2FkZWQgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=