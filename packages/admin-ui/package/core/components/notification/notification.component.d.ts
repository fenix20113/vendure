import { ElementRef } from '@angular/core';
import { NotificationType } from '../../providers/notification/notification.service';
export declare class NotificationComponent {
    wrapper: ElementRef;
    offsetTop: number;
    message: string;
    translationVars: {
        [key: string]: string | number;
    };
    type: NotificationType;
    isVisible: boolean;
    private onClickFn;
    registerOnClickFn(fn: () => void): void;
    onClick(): void;
    /**
     * Fade out the toast. When promise resolves, toast is invisible and
     * can be removed.
     */
    fadeOut(): Promise<any>;
    /**
     * Returns the height of the toast element in px.
     */
    getHeight(): number;
    getIcon(): string;
    stringifyMessage(message: unknown): string;
}
