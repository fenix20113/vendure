import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { catalogRoutes } from './catalog.routes';
import { ApplyFacetDialogComponent } from './components/apply-facet-dialog/apply-facet-dialog.component';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { AssignProductsToChannelDialogComponent } from './components/assign-products-to-channel-dialog/assign-products-to-channel-dialog.component';
import { CollectionContentsComponent } from './components/collection-contents/collection-contents.component';
import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { CollectionTreeNodeComponent } from './components/collection-tree/collection-tree-node.component';
import { CollectionTreeComponent } from './components/collection-tree/collection-tree.component';
import { FacetDetailComponent } from './components/facet-detail/facet-detail.component';
import { FacetListComponent } from './components/facet-list/facet-list.component';
import { GenerateProductVariantsComponent } from './components/generate-product-variants/generate-product-variants.component';
import { OptionValueInputComponent } from './components/option-value-input/option-value-input.component';
import { ProductAssetsComponent } from './components/product-assets/product-assets.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchInputComponent } from './components/product-search-input/product-search-input.component';
import { ProductVariantsEditorComponent } from './components/product-variants-editor/product-variants-editor.component';
import { ProductVariantsListComponent } from './components/product-variants-list/product-variants-list.component';
import { ProductVariantsTableComponent } from './components/product-variants-table/product-variants-table.component';
import { UpdateProductOptionDialogComponent } from './components/update-product-option-dialog/update-product-option-dialog.component';
import { VariantPriceDetailComponent } from './components/variant-price-detail/variant-price-detail.component';
export class CatalogModule {
}
CatalogModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, RouterModule.forChild(catalogRoutes)],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NhdGFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDekcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sNEZBQTRGLENBQUM7QUFDcEosT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDN0csT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDdkcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDakcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDMUcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDakcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sNEVBQTRFLENBQUM7QUFDOUgsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDekcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDL0csT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDeEgsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDbEgsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDckgsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDdEksT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUE4Qi9HLE1BQU0sT0FBTyxhQUFhOzs7WUE1QnpCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDN0QsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFO29CQUNWLG9CQUFvQjtvQkFDcEIsc0JBQXNCO29CQUN0QixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsZ0NBQWdDO29CQUNoQyw0QkFBNEI7b0JBQzVCLHlCQUF5QjtvQkFDekIsa0JBQWtCO29CQUNsQixzQkFBc0I7b0JBQ3RCLDJCQUEyQjtvQkFDM0IsdUJBQXVCO29CQUN2Qix5QkFBeUI7b0JBQ3pCLHVCQUF1QjtvQkFDdkIsMkJBQTJCO29CQUMzQiwyQkFBMkI7b0JBQzNCLDZCQUE2QjtvQkFDN0IsMkJBQTJCO29CQUMzQix5QkFBeUI7b0JBQ3pCLGtDQUFrQztvQkFDbEMsOEJBQThCO29CQUM5QixzQ0FBc0M7b0JBQ3RDLG9CQUFvQjtpQkFDdkI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbmltcG9ydCB7IGNhdGFsb2dSb3V0ZXMgfSBmcm9tICcuL2NhdGFsb2cucm91dGVzJztcbmltcG9ydCB7IEFwcGx5RmFjZXREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXBwbHktZmFjZXQtZGlhbG9nL2FwcGx5LWZhY2V0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXNzZXREZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXNzZXQtZGV0YWlsL2Fzc2V0LWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXNzZXRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Fzc2V0LWxpc3QvYXNzZXQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXNzaWduUHJvZHVjdHNUb0NoYW5uZWxEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXNzaWduLXByb2R1Y3RzLXRvLWNoYW5uZWwtZGlhbG9nL2Fzc2lnbi1wcm9kdWN0cy10by1jaGFubmVsLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkNvbnRlbnRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxlY3Rpb24tY29udGVudHMvY29sbGVjdGlvbi1jb250ZW50cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkRldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb2xsZWN0aW9uLWRldGFpbC9jb2xsZWN0aW9uLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGVjdGlvbi1saXN0L2NvbGxlY3Rpb24tbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblRyZWVOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxlY3Rpb24tdHJlZS9jb2xsZWN0aW9uLXRyZWUtbm9kZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblRyZWVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGVjdGlvbi10cmVlL2NvbGxlY3Rpb24tdHJlZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXREZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmFjZXQtZGV0YWlsL2ZhY2V0LWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZhY2V0LWxpc3QvZmFjZXQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2VuZXJhdGVQcm9kdWN0VmFyaWFudHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2VuZXJhdGUtcHJvZHVjdC12YXJpYW50cy9nZW5lcmF0ZS1wcm9kdWN0LXZhcmlhbnRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcHRpb25WYWx1ZUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL29wdGlvbi12YWx1ZS1pbnB1dC9vcHRpb24tdmFsdWUtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RBc3NldHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvZHVjdC1hc3NldHMvcHJvZHVjdC1hc3NldHMuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3REZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvZHVjdC1kZXRhaWwvcHJvZHVjdC1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RTZWFyY2hJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9kdWN0LXNlYXJjaC1pbnB1dC9wcm9kdWN0LXNlYXJjaC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZHVjdFZhcmlhbnRzRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2R1Y3QtdmFyaWFudHMtZWRpdG9yL3Byb2R1Y3QtdmFyaWFudHMtZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9kdWN0VmFyaWFudHNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2R1Y3QtdmFyaWFudHMtbGlzdC9wcm9kdWN0LXZhcmlhbnRzLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RWYXJpYW50c1RhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2R1Y3QtdmFyaWFudHMtdGFibGUvcHJvZHVjdC12YXJpYW50cy10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZHVjdE9wdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy91cGRhdGUtcHJvZHVjdC1vcHRpb24tZGlhbG9nL3VwZGF0ZS1wcm9kdWN0LW9wdGlvbi1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFZhcmlhbnRQcmljZURldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy92YXJpYW50LXByaWNlLWRldGFpbC92YXJpYW50LXByaWNlLWRldGFpbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtTaGFyZWRNb2R1bGUsIFJvdXRlck1vZHVsZS5mb3JDaGlsZChjYXRhbG9nUm91dGVzKV0sXG4gICAgZXhwb3J0czogW10sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFByb2R1Y3RMaXN0Q29tcG9uZW50LFxuICAgICAgICBQcm9kdWN0RGV0YWlsQ29tcG9uZW50LFxuICAgICAgICBGYWNldExpc3RDb21wb25lbnQsXG4gICAgICAgIEZhY2V0RGV0YWlsQ29tcG9uZW50LFxuICAgICAgICBHZW5lcmF0ZVByb2R1Y3RWYXJpYW50c0NvbXBvbmVudCxcbiAgICAgICAgUHJvZHVjdFZhcmlhbnRzTGlzdENvbXBvbmVudCxcbiAgICAgICAgQXBwbHlGYWNldERpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgQXNzZXRMaXN0Q29tcG9uZW50LFxuICAgICAgICBQcm9kdWN0QXNzZXRzQ29tcG9uZW50LFxuICAgICAgICBWYXJpYW50UHJpY2VEZXRhaWxDb21wb25lbnQsXG4gICAgICAgIENvbGxlY3Rpb25MaXN0Q29tcG9uZW50LFxuICAgICAgICBDb2xsZWN0aW9uRGV0YWlsQ29tcG9uZW50LFxuICAgICAgICBDb2xsZWN0aW9uVHJlZUNvbXBvbmVudCxcbiAgICAgICAgQ29sbGVjdGlvblRyZWVOb2RlQ29tcG9uZW50LFxuICAgICAgICBDb2xsZWN0aW9uQ29udGVudHNDb21wb25lbnQsXG4gICAgICAgIFByb2R1Y3RWYXJpYW50c1RhYmxlQ29tcG9uZW50LFxuICAgICAgICBQcm9kdWN0U2VhcmNoSW5wdXRDb21wb25lbnQsXG4gICAgICAgIE9wdGlvblZhbHVlSW5wdXRDb21wb25lbnQsXG4gICAgICAgIFVwZGF0ZVByb2R1Y3RPcHRpb25EaWFsb2dDb21wb25lbnQsXG4gICAgICAgIFByb2R1Y3RWYXJpYW50c0VkaXRvckNvbXBvbmVudCxcbiAgICAgICAgQXNzaWduUHJvZHVjdHNUb0NoYW5uZWxEaWFsb2dDb21wb25lbnQsXG4gICAgICAgIEFzc2V0RGV0YWlsQ29tcG9uZW50LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIENhdGFsb2dNb2R1bGUge31cbiJdfQ==