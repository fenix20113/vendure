import { Component, ContentChild, Input } from '@angular/core';
export class ActionBarLeftComponent {
    constructor() {
        this.grow = false;
    }
}
ActionBarLeftComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-ab-left',
                template: `
        <ng-content></ng-content>
    `
            },] }
];
ActionBarLeftComponent.propDecorators = {
    grow: [{ type: Input }]
};
export class ActionBarRightComponent {
    constructor() {
        this.grow = false;
    }
}
ActionBarRightComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-ab-right',
                template: `
        <ng-content></ng-content>
    `
            },] }
];
ActionBarRightComponent.propDecorators = {
    grow: [{ type: Input }]
};
export class ActionBarComponent {
}
ActionBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-action-bar',
                template: "<div class=\"left-content\" [class.grow]=\"left?.grow\"><ng-content select=\"vdr-ab-left\"></ng-content></div>\n<div class=\"right-content\" [class.grow]=\"right?.grow\"><ng-content select=\"vdr-ab-right\"></ng-content></div>\n",
                styles: [":host{display:flex;justify-content:space-between;align-items:flex-start;background-color:var(--color-component-bg-100);position:sticky;top:-24px;z-index:25;border-bottom:1px solid var(--color-component-border-200)}:host>.grow{flex:1}"]
            },] }
];
ActionBarComponent.propDecorators = {
    left: [{ type: ContentChild, args: [ActionBarLeftComponent,] }],
    right: [{ type: ContentChild, args: [ActionBarRightComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2FjdGlvbi1iYXIvYWN0aW9uLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBUXZFLE1BQU0sT0FBTyxzQkFBc0I7SUFObkM7UUFPYSxTQUFJLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7OztZQVJBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOztLQUVUO2FBQ0o7OzttQkFFSSxLQUFLOztBQVNWLE1BQU0sT0FBTyx1QkFBdUI7SUFOcEM7UUFPYSxTQUFJLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7OztZQVJBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFOztLQUVUO2FBQ0o7OzttQkFFSSxLQUFLOztBQVFWLE1BQU0sT0FBTyxrQkFBa0I7OztZQUw5QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsK09BQTBDOzthQUU3Qzs7O21CQUVJLFlBQVksU0FBQyxzQkFBc0I7b0JBQ25DLFlBQVksU0FBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hYi1sZWZ0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQWN0aW9uQmFyTGVmdENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgZ3JvdyA9IGZhbHNlO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hYi1yaWdodCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvbkJhclJpZ2h0Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBncm93ID0gZmFsc2U7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFjdGlvbi1iYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hY3Rpb24tYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hY3Rpb24tYmFyLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvbkJhckNvbXBvbmVudCB7XG4gICAgQENvbnRlbnRDaGlsZChBY3Rpb25CYXJMZWZ0Q29tcG9uZW50KSBsZWZ0OiBBY3Rpb25CYXJMZWZ0Q29tcG9uZW50O1xuICAgIEBDb250ZW50Q2hpbGQoQWN0aW9uQmFyUmlnaHRDb21wb25lbnQpIHJpZ2h0OiBBY3Rpb25CYXJSaWdodENvbXBvbmVudDtcbn1cbiJdfQ==