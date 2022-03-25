import { ComponentFactoryResolver } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { OverlayHostService } from '../overlay-host/overlay-host.service';
export declare type NotificationType = 'info' | 'success' | 'error' | 'warning';
export interface ToastConfig {
    message: string;
    translationVars?: {
        [key: string]: string | number;
    };
    type?: NotificationType;
    duration?: number;
}
/**
 * Provides toast notification functionality.
 */
export declare class NotificationService {
    private i18nService;
    private resolver;
    private overlayHostService;
    private get hostView();
    private openToastRefs;
    constructor(i18nService: I18nService, resolver: ComponentFactoryResolver, overlayHostService: OverlayHostService);
    /**
     * Display a success toast notification
     */
    success(message: string, translationVars?: {
        [key: string]: string | number;
    }): void;
    /**
     * Display an info toast notification
     */
    info(message: string, translationVars?: {
        [key: string]: string | number;
    }): void;
    /**
     * Display a warning toast notification
     */
    warning(message: string, translationVars?: {
        [key: string]: string | number;
    }): void;
    /**
     * Display an error toast notification
     */
    error(message: string, translationVars?: {
        [key: string]: string | number;
    }): void;
    /**
     * Display a toast notification.
     */
    notify(config: ToastConfig): void;
    /**
     * Load a ToastComponent into the DOM host location.
     */
    private createToast;
    /**
     * Returns a function which will destroy the toast component and
     * remove it from the openToastRefs array.
     */
    private createDismissFunction;
    /**
     * Calculate and set the top offsets for each of the open toasts.
     */
    private calculatePositions;
    private translateTranslationVars;
}
