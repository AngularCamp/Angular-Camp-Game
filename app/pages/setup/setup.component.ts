import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {GameEngine} from "../../shared/game-engine";

@Component({
    selector: "setup",
    templateUrl: "pages/setup/setup.html"
})
export class SetupPage {

    constructor(private _router: Router, private _gameEngine: GameEngine) { }


    public prepareGame(seconds: number) {
        this._router.navigate(["Ready", { gameTime: seconds * 1000 }]);
    }
}
