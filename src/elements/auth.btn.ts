import { SwaggerWrapper } from '../wrappers/swagger.wrapper';
import { TryBtn } from './try.btn';
import { AuthBtnConfig } from '../config/auth-btn-config';

declare let $: any;

const authCloseClickHandler = () => {
    SwaggerWrapper.hideAuthModal();
}

const authClickHandler = () => {
    TryBtn.unselectAll();
    SwaggerWrapper.showAuthModal();
}

export class AuthBtn {

    public static cfg:AuthBtnConfig;

    public static get $element(): JQuery {
        return $(`.${AuthBtn.cfg.className}`);
    }

    public static init(): void {
        if ( ! SwaggerWrapper.hasAuth ) {
            return;
        }

        const className = AuthBtn.cfg.className + ' ' + (
            AuthBtn.cfg?.options.className || ''
        );

        const text = AuthBtn.cfg?.options.text
            || AuthBtn.cfg.text;

        const posSelector = AuthBtn.cfg?.options.posSelector
            || AuthBtn.cfg.posSelector;

        const $authBtn = $(`<button type="button" class="${className}">${text}</button>`);
        $authBtn.click(authClickHandler);
        $(posSelector).after($authBtn);
        SwaggerWrapper.onCloseAuthModal(authCloseClickHandler);
    }
}
