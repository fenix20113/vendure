import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class HelpTooltipComponent {
}
HelpTooltipComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-help-tooltip',
                template: "<clr-tooltip>\n    <clr-icon clrTooltipTrigger shape=\"help\" size=\"14\"></clr-icon>\n    <clr-tooltip-content [clrPosition]=\"position\" clrSize=\"md\" *clrIfOpen>\n        <span>{{ content }}</span>\n    </clr-tooltip-content>\n</clr-tooltip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
HelpTooltipComponent.propDecorators = {
    content: [{ type: Input }],
    position: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC10b29sdGlwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvaGVscC10b29sdGlwL2hlbHAtdG9vbHRpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRMUUsTUFBTSxPQUFPLG9CQUFvQjs7O1lBTmhDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixtUUFBNEM7Z0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O3NCQUVJLEtBQUs7dUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWhlbHAtdG9vbHRpcCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hlbHAtdG9vbHRpcC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaGVscC10b29sdGlwLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEhlbHBUb29sdGlwQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBjb250ZW50OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcG9zaXRpb246ICd0b3AtcmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICdib3R0b20tcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdyaWdodCcgfCAnbGVmdCc7XG59XG4iXX0=