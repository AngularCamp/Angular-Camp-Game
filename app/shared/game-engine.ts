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
