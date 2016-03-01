/*The MIT License (MIT)
Copyright (c) 2016 - respective authors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import {Injectable} from "angular2/core";
import {Observable} from 'rxjs';
import {Task, Score, OPERANDS} from "./models/models";

@Injectable()
export class GameEngine {

    public score: Score;
    public screen: number = 0;

    constructor() {
        this.setScore(0, 0);
    }

    public reset() {
        this.score.right = 0;
        this.score.wrong = 0;
    }
    public startTimer(time) {
        let speed = 100 //ms
        return Observable.timer(speed, speed).map(i => time - i * speed).take(time / speed + 1);
    }

    public evaluate(task: Task, index: number) {
        if (index === task.rightAnswerIndex) {
            this.score.right++;
        } else {
            this.score.wrong++;
        }

        console.log("answer index: " + index);
    }

    public getScore() {
        return this.score;
    }


    public getNextTask(): Task {
        var arg1: number = this.getArg();
        var arg2: number = this.getArg();
        var operand: string = this.getOperation();
        var pos: number = Math.floor(Math.random() * 4);
        return {
            arg1: arg1,
            arg2: arg2,
            operand: operand,
            rightAnswerIndex: pos,
            answers: this.getAnswers(arg1, arg2, operand, pos)
        }
    }

    private setScore(right: number, wrong: number) {
        var right: number = right;
        var wrong: number = wrong;
        this.score = {
            right: right,
            wrong: wrong
        }

    }

    private getAnswers(arg1, arg2, operand, pos) {
        var result: Array<number> = [];

        for (var i = 0; i < 4; i++) {
            var x = this.getArg(),
                y = this.getArg(),
                correct = this.getResult(arg1, arg2, operand);

            // Controlling not to repeat results
            if (correct !== this.getResult(x, y, operand)) {

                (i === pos) ? result.push(correct) :
                    result.push(this.getResult(x, y, operand));
            } else {
                i -= 1;
            }
        }

        return result;
    }

    private getResult(arg1, arg2, operand) {
        switch (operand) {
            case '+':
                return arg1 + arg2;
            case '-':
                return arg1 - arg2;
            case '*':
                return arg1 * arg2;
            case '/':
                return ((((arg1 / arg2) * 100) | 0) / 100);
        }
    }

    private getArg(): number {
        return Math.floor((Math.random() * 10) + 1);
    }

    private getOperation(): string {
        var i = Math.floor((Math.random() * OPERANDS.length))
        return OPERANDS[i];
    }
}
