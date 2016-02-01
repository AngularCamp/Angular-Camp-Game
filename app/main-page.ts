import 'reflect-metadata';
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {Component} from 'angular2/core';
import { TimerPipe } from "./timer-pipe";

const operands = ["+", "-", "*", "/"];

interface Task {
    arg1: number;
    arg2: number;
    operand: string;
    answers: Array<number>;
    rightAnswerIndex: number;
}

@Component({
    selector: 'main',
    pipes: [TimerPipe],
    template: `
<GridLayout orientation='vertical'>
    <!-- Start screen -->
    <StackLayout *ngIf="screen === 0" verticalAlignment="center">
    <Label text="AngularCamp Game" class="title"></Label>
    <Image class="front_image"
        src="res://camp_logo"
        dock="left">
    </Image>
    <Button class="main_button" verticalAlignment="center"
        text="New Game" (tap)="newGame()"></Button>
    </StackLayout>
    <!-- Game Config -->
    <StackLayout *ngIf="screen === 1" verticalAlignment="center">
        <Button text="15 seconds" (tap)="prepareGame(15)"></Button>    
        <Button text="2 minutes" (tap)="prepareGame(120)"></Button>
        <Button text="3 minutes" (tap)="prepareGame(180)"></Button>
        <Button text="5 minutes" (tap)="prepareGame(300)"></Button>        
    </StackLayout>
    
    <!-- Ready screen -->
    <StackLayout *ngIf="screen === 2" verticalAlignment="center">
        <Label text="READY" class="big"></Label>
        <Button text="SART" (tap)="startGame()"></Button>      
    </StackLayout>
    
    <!-- Game Phase -->
    <GridLayout *ngIf="screen === 3" rows="auto, auto, *"> 
        <Label [text]="secondsLeft | timer" 
            [ngClass]="{timer: secondsLeft > 10, timerRed: secondsLeft <= 10}"></Label>
        
        <GridLayout row="1" columns="*,*,*" rows="100">
            <Label class="task-label" [text]="task.arg1" col="0"></Label>
            <Label class="task-label" [text]="task.operand" col="1"></Label>
            <Label class="task-label" [text]="task.arg2" col="2"></Label>
        </GridLayout>

        <StackLayout row="2">
            <Button *ngFor="#answer of task.answers; #i = index"
                [text]="answer" class="answer"
                (tap)="onAnswer(i)"></Button>
        </StackLayout>
    </GridLayout>
    
    <!-- Results screen -->
    <StackLayout *ngIf="screen === 4">
        <Label text="SCORE" class="big"></Label>
        <Button text="NEW GAME" (tap)="newGame()"></Button>
    </StackLayout>
</GridLayout>
`,
})
export class MainPage {
    public task: Task;
    public screen: number = 0;
    public secondsLeft: number;

    constructor() {
        this.nextTask();
    }

    private nextTask() {
        var arg1: number = this.getArg();
        var arg2: number = this.getArg();
        var operand: string = this.getOperation();
        this.task = {
            arg1: arg1,
            arg2: arg2,
            operand: operand,
            answers: this.getAnswers(arg1, arg2, operand),
            rightAnswerIndex: 2
        }
    }

    private getAnswers(arg1, arg2, operand) {
        var pos: number = Math.floor(Math.random() * 4),
            result: Array<number> = [];

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
                break;
            case '-':
                return arg1 - arg2;
                break;
            case '*':
                return arg1 * arg2;
                break;
            case '/':
                return ((((arg1 / arg2) * 100) | 0) / 100);
                break;
        }
    }

    private getArg(): number {
        return Math.floor((Math.random() * 10) + 1);
    }

    private getOperation(): string {
        var i = Math.floor((Math.random() * operands.length))
        return operands[i];
    }

    public onAnswer(index) {
        // TODO: track score
        console.log("answer index: " + index);
        this.nextTask();
    }

    public newGame() {
        // TODO: cleanup
        this.screen = 1;
    }

    public prepareGame(seconds: number) {
        this.secondsLeft = seconds;
        this.screen = 2;
    }

    public startGame() {
        this.screen = 3;
        // TODO: start timer here
        var handle = setInterval(() => {
            this.secondsLeft--;
            if(this.secondsLeft <= 0){
                clearInterval(handle);
                this.endGame();
            }
        }, 1000);
    }
    
    public endGame(){
        this.screen = 4;
    }
}