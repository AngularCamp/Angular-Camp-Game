import {Component} from "angular2/core";
import {Router} from "angular2/router";

import {GameEngine} from "../../shared/game-engine";

@Component({
    selector: "splash",
    templateUrl: "pages/splash/splash.html",
    providers: []
})
export class SplashPage {

    constructor(private _router: Router, private _gameEngine: GameEngine) { }

    public newGame() {
        this._gameEngine.reset();
        this._router.navigate(["Setup"]);
    }
}
