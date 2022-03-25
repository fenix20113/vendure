import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DatetimePickerService } from './datetime-picker.service';
import { CalendarView, DayCell, DayOfWeek } from './types';
export declare type CurrentView = {
    date: Date;
    month: number;
    year: number;
};
export declare class DatetimePickerComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnDestroy {
    private changeDetectorRef;
    private datetimePickerService;
    /**
     * The range above and below the current year which is selectable from
     * the year select control. If a min or max value is set, these will
     * override the yearRange.
     */
    yearRange: any;
    /**
     * The day that the week should start with in the calendar view.
     */
    weekStartDay: DayOfWeek;
    /**
     * The granularity of the minutes time picker
     */
    timeGranularityInterval: number;
    /**
     * The minimum date as an ISO string
     */
    min: string | null;
    /**
     * The maximum date as an ISO string
     */
    max: string | null;
    /**
     * Sets the readonly state
     */
    readonly: boolean;
    dropdownComponent: DropdownComponent;
    datetimeInput: ElementRef<HTMLInputElement>;
    calendarTable: ElementRef<HTMLTableElement>;
    disabled: boolean;
    calendarView$: Observable<CalendarView>;
    current$: Observable<CurrentView>;
    selected$: Observable<Date | null>;
    selectedHours$: Observable<number | null>;
    selectedMinutes$: Observable<number | null>;
    years: number[];
    weekdays: string[];
    hours: number[];
    minutes: number[];
    private onChange;
    private onTouch;
    private subscription;
    constructor(changeDetectorRef: ChangeDetectorRef, datetimePickerService: DatetimePickerService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: string | null): void;
    prevMonth(): void;
    nextMonth(): void;
    selectToday(): void;
    setYear(event: Event): void;
    setMonth(event: Event): void;
    selectDay(day: DayCell): void;
    clearValue(): void;
    handleCalendarKeydown(event: KeyboardEvent): void;
    setHour(event: Event): void;
    setMinute(event: Event): void;
    closeDatepicker(): void;
    private populateYearsSelection;
    private populateWeekdays;
    private populateHours;
    private populateMinutes;
}
