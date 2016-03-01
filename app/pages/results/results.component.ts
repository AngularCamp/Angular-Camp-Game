/*The MIT License (MIT)
Copyright (c) 2016 - respective authors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
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
