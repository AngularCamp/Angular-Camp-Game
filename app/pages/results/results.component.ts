import {Component} from "angular2/core";
import {Router} from "angular2/router";


import {GameEngine} from "../../shared/game-engine";
import {Score} from "../../shared/models/models";

@Component({
  selector: "results",
  templateUrl: "pages/results/results.html"
})
export class ResultsPage {
      public score: Score;
      constructor(private _router: Router, private _gameEngine: GameEngine) {
        this.score = this._gameEngine.getScore();
      }


          public newGame() {
              this._gameEngine.reset();
              this._router.navigate(["Setup"]);
          }

          public back2Start() {
              this._gameEngine.reset();
              this._router.navigate(["Splash"]);
          }
}
