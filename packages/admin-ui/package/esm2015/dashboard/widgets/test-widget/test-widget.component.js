import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
export class TestWidgetComponent {
}
TestWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-test-widget',
                template: "<p>This is a test widget!</p>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
export class TestWidgetModule {
}
TestWidgetModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TestWidgetComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9kYXNoYm9hcmQvc3JjL3dpZGdldHMvdGVzdC13aWRnZXQvdGVzdC13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUTdFLE1BQU0sT0FBTyxtQkFBbUI7OztZQU4vQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsMkNBQTJDO2dCQUUzQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7O0FBTUQsTUFBTSxPQUFPLGdCQUFnQjs7O1lBSDVCLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXRlc3Qtd2lkZ2V0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGVzdC13aWRnZXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Rlc3Qtd2lkZ2V0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRlc3RXaWRnZXRDb21wb25lbnQge31cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtUZXN0V2lkZ2V0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgVGVzdFdpZGdldE1vZHVsZSB7fVxuIl19