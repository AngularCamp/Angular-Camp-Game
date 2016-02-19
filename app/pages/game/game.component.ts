import {Component} from "angular2/core";
import {Router, RouteParams} from "angular2/router";
import application = require("application");

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
    constructor(private _router: Router, private _gameEngine: GameEngine, params: RouteParams) {
        let gameTime = this.timeLeft = parseInt(params.get('gameTime'), 10);
        let disposable = this._gameEngine.startTimer(gameTime).subscribe(
            s => this.timeLeft = s,
            err => console.log('Error: ' + err),
            () => this._router.navigate(["Results"])
        );
        this.task = this._gameEngine.getNextTask();

        if (application.android) {
            application.android.on(
                application.AndroidApplication.activityBackPressedEvent,
                function(args: application.AndroidActivityBackPressedEventData) {
                    disposable.unsubscribe();
                });
        }

    }

    public onAnswer(index) {
        this._gameEngine.evaluate(this.task, index);
        this.task = this._gameEngine.getNextTask();
    }

}
