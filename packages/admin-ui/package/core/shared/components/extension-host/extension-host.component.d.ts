import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ExtensionHostService } from './extension-host.service';
/**
 * This component uses an iframe to embed an external url into the Admin UI, and uses the PostMessage
 * protocol to allow cross-frame communication between the two frames.
 */
export declare class ExtensionHostComponent implements OnInit, AfterViewInit, OnDestroy {
    private route;
    private sanitizer;
    private extensionHostService;
    extensionUrl: SafeResourceUrl;
    openInIframe: boolean;
    extensionWindowIsOpen: boolean;
    private config;
    private extensionWindow?;
    private extensionFrame;
    constructor(route: ActivatedRoute, sanitizer: DomSanitizer, extensionHostService: ExtensionHostService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    launchExtensionWindow(): void;
    private isExtensionHostConfig;
}
