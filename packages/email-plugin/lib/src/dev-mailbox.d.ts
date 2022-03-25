import { EmailEventHandler } from './event-handler';
import { EmailPluginDevModeOptions, EventWithContext } from './types';
/**
 * An email inbox application that serves the contents of the dev mode `outputPath` directory.
 */
export declare class DevMailbox {
    private handleMockEventFn;
    serve(options: EmailPluginDevModeOptions): import("express-serve-static-core").Router;
    handleMockEvent(handler: (handler: EmailEventHandler<string, any>, event: EventWithContext) => void): void;
    private getEmailList;
    private getEmail;
    private createRequestContext;
}
