import {CallbackFunction, SwaggerOptions} from '../interfaces/swagger-options.interface';
import { Config } from './config';

export class SwaggerConfig extends Config<SwaggerOptions> implements SwaggerOptions {

    private _resolve: CallbackFunction = () => {}; //eslint-disable-line @typescript-eslint/no-empty-function
    private _onComplete: CallbackFunction = () => {}; //eslint-disable-line @typescript-eslint/no-empty-function
    public onCompletePromise: Promise<void>;

    private _authorizeBtnSelector: string = '.swagger-ui .auth-wrapper .authorize';
    private _authorizeDoneBtnSelector: string = '.swagger-ui .auth-btn-wrapper .btn-done';
    private _authorizeModalCloseBtnSelector: string = '.swagger-ui .dialog-ux .modal-ux-header .close-modal';
    private _authorizeModalSelector: string = '.swagger-ui .dialog-ux .modal-ux';
    private _modalOverlaySelector: string = '.swagger-ui .dialog-ux';

    private _operationSectionContainerSelector: string = '.swagger-ui .opblock-tag-section';
    private _operationContainerSelector: string = '.swagger-ui .opblock';
    private _operationSummaryPatternSelector: string = '.swagger-ui .opblock .opblock-summary-{method} [data-path="{api}"]';

    private _wrapperSelector: string = '.swagger-ui .wrapper';

    public dom_id: string = '#swagger-ui';
    public url: undefined | string = undefined;
    public spec: undefined | object = undefined;
    public tryItOutEnabled: boolean;

    public authModalClass: string = 'auth-modal';
    public hideClass: string = 'hide';
    public showClass: string = 'show';
    public selectedOperationContainerClass: string = 'opened-shadow';

    public oauth2RedirectUrl: string = '';

    public element: string = 'body';

    public version: string = '3.48.0';

    constructor(options: SwaggerOptions, url: string|object, tryItOutEnabled: boolean) {
        super(options);

        if ("oauth2RedirectUrl" in options && options.oauth2RedirectUrl) {
            this.oauth2RedirectUrl = options.oauth2RedirectUrl;
        }

        if ("element" in options && options.element) {
            this.element = options.element;
        }

        if (typeof url === "object") {
            this.spec = url;
        } else {
            this.url = url;
        }

        this.tryItOutEnabled = tryItOutEnabled;
        this.onCompletePromise = new Promise<void>(resolve => this._resolve = resolve);
    }

    public get id(): string {
        return this.dom_id.replace('#', '');
    }

    public get boxSelector(): string {
        return this.dom_id;
    }

    public get authorizeBtnSelector(): string {
        return `${this.boxSelector} ${this._authorizeBtnSelector}`;
    }

    public get authorizeDoneBtnSelector(): string {
        return `${this.boxSelector} ${this._authorizeDoneBtnSelector}`;
    }

    public get authorizeModalCloseBtnSelector(): string {
        return `${this.boxSelector} ${this._authorizeModalCloseBtnSelector}`;
    }

    public get authorizeModalSelector(): string {
        return `${this.boxSelector} ${this._authorizeModalSelector}`;
    }

    public get openModalOverlaySelector(): string {
        return `${this.shownAuthModalSelector} ${this._modalOverlaySelector}`;
    }

    public get operationSectionContainerSelector(): string {
        return `${this.boxSelector} ${this._operationSectionContainerSelector}`;
    }

    public get operationContainerSelector(): string {
        return `${this.boxSelector} ${this._operationContainerSelector}`;
    }

    public get operationSummaryPatternSelector(): string {
        return `${this.boxSelector} ${this._operationSummaryPatternSelector}`;
    }

    public get wrapperSelector(): string {
        return `${this.boxSelector} ${this._wrapperSelector}`;
    }

    public get openAuthorizeModalSelector(): string {
        return `${this.shownAuthModalSelector} ${this._authorizeModalSelector}`;
    }

    public get hiddenSelector(): string {
        return `${this.boxSelector}.${this.hideClass}`;
    }

    public get shownSelector(): string {
        return `${this.boxSelector}.${this.showClass}`;
    }

    public get shownAuthModalSelector(): string {
        return `${this.boxSelector}.${this.authModalClass}`;
    }

    public get bundleUrl(): string {
        return `${this.cdnUrl}/swagger-ui-dist@${this.version}/swagger-ui-bundle.js`;
    }

    public get cssUrl(): string {
        return `${this.cdnUrl}swagger-ui-dist@${this.version}/swagger-ui.css`;
    }

    public onComplete = () => {
        this._onComplete();
        this._resolve();
    }
}
