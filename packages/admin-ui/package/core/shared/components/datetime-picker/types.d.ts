export interface DayCell {
    dayOfMonth: number;
    inCurrentMonth: boolean;
    selected: boolean;
    isToday: boolean;
    isViewing: boolean;
    disabled: boolean;
    select: () => void;
}
export declare type CalendarView = DayCell[][];
export declare type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
