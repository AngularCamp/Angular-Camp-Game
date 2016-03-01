/*The MIT License (MIT)
Copyright (c) 2016 - respective authors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import application = require("application");
import {Page} from 'ui/page';
import {Label} from 'ui/label';

import {GameEngine} from "../../shared/game-engine";
import {Task} from "../../shared/models/models";
import { TimerPipe } from "../../shared/timer.pipe";

@Component({
    selector: "game",
    templateUrl: "pages/game/game.html",
    pipes: [TimerPipe]
})
export class GamePage {
    public task: Task;
    public timeLeft: number
    constructor(private page: Page, private _router: Router, private _gameEngine: GameEngine, params: RouteParams) {
        this.startTimer(params);
        this.task = this._gameEngine.getNextTask();
    }

    public onAnswer(index) {
        this._gameEngine.evaluate(this.task, index);
        this.task = this._gameEngine.getNextTask();
    }

    public processNext() {
        var frame = this.page.frame;
        if (frame) {
            var answers = frame.getViewById('answers');
            answers.fadeOut()
                .then(() => this.task = this._gameEngine.getNextTask())
                .then(() => answers.fadeIn())
        } else {
            this.task = this._gameEngine.getNextTask();
        }
    }

    private startTimer(params: RouteParams) {
        let gameTime = this.timeLeft = parseInt(params.get('gameTime'), 10);
        let disposable = this._gameEngine.startTimer(gameTime).subscribe(
            (s) => {
                this.timeLeft = s;
                if (s === 3000) {
                    this.animateTime();
                }
            },
            err => console.log('Error: ' + err),
            () => this._router.navigate(["Results"])
          );


        if (application.android) {
            application.android.on(
                application.AndroidApplication.activityBackPressedEvent,
                function(args: application.AndroidActivityBackPressedEventData) {
                    disposable.unsubscribe();
                });
        }
    }


    private animateTime() {
        var frame = this.page.frame;
        if (frame) {
            var lbl = <Label>frame.getViewById('timer');
            var smaller = lbl.createAnimation({ scale: { x: 0.5, y: 0.5 }, duration: 500 });
            var larger = lbl.createAnimation({ scale: { x: 1.5, y: 1.5 }, duration: 500 });
            var extralarger = lbl.createAnimation({ scale: { x: 2, y: 2 }, duration: 500 });
            smaller.play()
                .then(() => larger.play())
                .then(() => smaller.play())
                .then(() => larger.play())
                .then(() => smaller.play())
                .then(() => extralarger.play());
        }
    }


}
