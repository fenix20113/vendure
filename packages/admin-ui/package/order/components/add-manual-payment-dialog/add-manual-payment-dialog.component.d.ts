import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CurrencyCode, DataService, Dialog, GetPaymentMethodList, ManualPaymentInput } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class AddManualPaymentDialogComponent implements OnInit, Dialog<Omit<ManualPaymentInput, 'orderId'>> {
    private dataService;
    outstandingAmount: number;
    currencyCode: CurrencyCode;
    resolveWith: (result?: Omit<ManualPaymentInput, 'orderId'>) => void;
    form: FormGroup;
    paymentMethods$: Observable<GetPaymentMethodList.Items[]>;
    constructor(dataService: DataService);
    ngOnInit(): void;
    submit(): void;
    cancel(): void;
}
