// Type definitions for Angular JS 1.0
// Project: http://angularjs.org
// Definitions by: Diego Vilar <http://github.com/diegovilar>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../angularjs/angular.d.ts" />


///////////////////////////////////////////////////////////////////////////////
// ng module (angular.js)
///////////////////////////////////////////////////////////////////////////////
module ng.ui {

    interface IDialogOptions {
        controller: string;
        template?: string;
        templateUrl?: string;
        backdrop?: bool;
        keyboard?: bool;
        backdropClick?: bool;
        dialogFade?: bool;
        backdropFade?: bool;
        resolve?: any;
    }

    interface IMessageBoxButtons {
        label: string;
        result: string;
        cssClass?: string;
    }

    interface IDialogProvider {
        dialog(opts: IDialogOptions): IDialog;
        messageBox(title: string, msg: string, btns: IMessageBoxButtons[]): IDialog;
    }

    interface IDialog {
        open(): ng.IPromise;
        close(result: any): void;
    }
}