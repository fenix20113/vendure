import { Type } from '@vendure/common/lib/shared-types';
import { Injector } from '@vendure/core';
import { EmailEventListener } from './event-listener';
import { EmailTemplateConfig, EventWithAsyncData, EventWithContext, IntermediateEmailDetails, LoadDataFn, SetAttachmentsFn, SetTemplateVarsFn } from './types';
/**
 * @description
 * The EmailEventHandler defines how the EmailPlugin will respond to a given event.
 *
 * A handler is created by creating a new {@link EmailEventListener} and calling the `.on()` method
 * to specify which event to respond to.
 *
 * @example
 * ```ts
 * const confirmationHandler = new EmailEventListener('order-confirmation')
 *   .on(OrderStateTransitionEvent)
 *   .filter(event => event.toState === 'PaymentSettled')
 *   .setRecipient(event => event.order.customer.emailAddress)
 *   .setSubject(`Order confirmation for #{{ order.code }}`)
 *   .setTemplateVars(event => ({ order: event.order }));
 * ```
 *
 * This example creates a handler which listens for the `OrderStateTransitionEvent` and if the Order has
 * transitioned to the `'PaymentSettled'` state, it will generate and send an email.
 *
 * ## Handling other languages
 *
 * By default, the handler will respond to all events on all channels and use the same subject ("Order confirmation for #12345" above)
 * and body template. Where the server is intended to support multiple languages, the `.addTemplate()` method may be used
 * to defined the subject and body template for specific language and channel combinations.
 *
 * @example
 * ```ts
 * const extendedConfirmationHandler = confirmationHandler
 *   .addTemplate({
 *     channelCode: 'default',
 *     languageCode: LanguageCode.de,
 *     templateFile: 'body.de.hbs',
 *     subject: 'Bestellbestätigung für #{{ order.code }}',
 *   })
 * ```
 *
 * @docsCategory EmailPlugin
 */
export declare class EmailEventHandler<T extends string = string, Event extends EventWithContext = EventWithContext> {
    listener: EmailEventListener<T>;
    event: Type<Event>;
    private setRecipientFn;
    private setTemplateVarsFn;
    private setAttachmentsFn?;
    private filterFns;
    private configurations;
    private defaultSubject;
    private from;
    private _mockEvent;
    constructor(listener: EmailEventListener<T>, event: Type<Event>);
    /** @internal */
    get type(): T;
    /** @internal */
    get mockEvent(): Omit<Event, 'ctx' | 'data'> | undefined;
    /**
     * @description
     * Defines a predicate function which is used to determine whether the event will trigger an email.
     * Multiple filter functions may be defined.
     */
    filter(filterFn: (event: Event) => boolean): EmailEventHandler<T, Event>;
    /**
     * @description
     * A function which defines how the recipient email address should be extracted from the incoming event.
     */
    setRecipient(setRecipientFn: (event: Event) => string): EmailEventHandler<T, Event>;
    /**
     * @description
     * A function which returns an object hash of variables which will be made available to the Handlebars template
     * and subject line for interpolation.
     */
    setTemplateVars(templateVarsFn: SetTemplateVarsFn<Event>): EmailEventHandler<T, Event>;
    /**
     * @description
     * Sets the default subject of the email. The subject string may use Handlebars variables defined by the
     * setTemplateVars() method.
     */
    setSubject(defaultSubject: string): EmailEventHandler<T, Event>;
    /**
     * @description
     * Sets the default from field of the email. The from string may use Handlebars variables defined by the
     * setTemplateVars() method.
     */
    setFrom(from: string): EmailEventHandler<T, Event>;
    /**
     * @description
     * Defines one or more files to be attached to the email. An attachment _must_ specify
     * a `path` property which can be either a file system path _or_ a URL to the file.
     *
     * @example
     * ```TypeScript
     * const testAttachmentHandler = new EmailEventListener('activate-voucher')
     *   .on(ActivateVoucherEvent)
     *   // ... omitted some steps for brevity
     *   .setAttachments(async (event) => {
     *     const { imageUrl, voucherCode } = await getVoucherDataForUser(event.user.id);
     *     return [
     *       {
     *         filename: `voucher-${voucherCode}.jpg`,
     *         path: imageUrl,
     *       },
     *     ];
     *   });
     * ```
     */
    setAttachments(setAttachmentsFn: SetAttachmentsFn<Event>): this;
    /**
     * @description
     * Add configuration for another template other than the default `"body.hbs"`. Use this method to define specific
     * templates for channels or languageCodes other than the default.
     */
    addTemplate(config: EmailTemplateConfig): EmailEventHandler<T, Event>;
    /**
     * @description
     * Allows data to be loaded asynchronously which can then be used as template variables.
     * The `loadDataFn` has access to the event, the TypeORM `Connection` object, and an
     * `inject()` function which can be used to inject any of the providers exported
     * by the {@link PluginCommonModule}. The return value of the `loadDataFn` will be
     * added to the `event` as the `data` property.
     *
     * @example
     * ```TypeScript
     * new EmailEventListener('order-confirmation')
     *   .on(OrderStateTransitionEvent)
     *   .filter(event => event.toState === 'PaymentSettled' && !!event.order.customer)
     *   .loadData(({ event, injector }) => {
     *     const orderService = injector.get(OrderService);
     *     return orderService.getOrderPayments(event.order.id);
     *   })
     *   .setTemplateVars(event => ({
     *     order: event.order,
     *     payments: event.data,
     *   }));
     * ```
     */
    loadData<R>(loadDataFn: LoadDataFn<Event, R>): EmailEventHandlerWithAsyncData<R, T, Event, EventWithAsyncData<Event, R>>;
    /**
     * @description
     * Used internally by the EmailPlugin to handle incoming events.
     *
     * @internal
     */
    handle(event: Event, globals: {
        [key: string]: any;
    } | undefined, injector: Injector): Promise<IntermediateEmailDetails | undefined>;
    /**
     * @description
     * Optionally define a mock Event which is used by the dev mode mailbox app for generating mock emails
     * from this handler, which is useful when developing the email templates.
     */
    setMockEvent(event: Omit<Event, 'ctx' | 'data'>): EmailEventHandler<T, Event>;
    private getBestConfiguration;
}
/**
 * @description
 * Identical to the {@link EmailEventHandler} but with a `data` property added to the `event` based on the result
 * of the `.loadData()` function.
 *
 * @docsCategory EmailPlugin
 */
export declare class EmailEventHandlerWithAsyncData<Data, T extends string = string, InputEvent extends EventWithContext = EventWithContext, Event extends EventWithAsyncData<InputEvent, Data> = EventWithAsyncData<InputEvent, Data>> extends EmailEventHandler<T, Event> {
    _loadDataFn: LoadDataFn<InputEvent, Data>;
    constructor(_loadDataFn: LoadDataFn<InputEvent, Data>, listener: EmailEventListener<T>, event: Type<InputEvent>);
}
