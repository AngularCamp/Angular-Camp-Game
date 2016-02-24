import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";

import {GameEngine} from "../../shared/game-engine";

@Component({
    selector: "ready",
    templateUrl: "pages/ready/ready.html",
    directives: [NS_ROUTER_DIRECTIVES],
})
export class ReadyPage {

    constructor(private _router: Router, private params: RouteParams) {}

    public startGame() {
        this._router.navigate(["Game",{gameTime: this.params.get('gameTime')}]);
    }
}
