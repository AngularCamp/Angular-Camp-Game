import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";

import {GameEngine} from "../../shared/game-engine";

@Component({
    selector: "ready",
    templateUrl: "pages/ready/ready.html"
})
export class ReadyPage {

    constructor(private _router: Router, private params: RouteParams) {}

    public startGame() {
        this._router.navigate(["Game",{gameTime: this.params.get('gameTime')}]);
    }
}
