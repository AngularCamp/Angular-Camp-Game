/*The MIT License (MIT)
Copyright (c) 2016 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


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

interface Score {
    right: number;
    wrong: number;
}

@Component({
    selector: 'main',
    pipes: [TimerPipe],
    template: `
<GridLayout class="main-background" orientation='vertical' >
    <!-- Start screen -->
    <StackLayout *ngIf="screen === 0" verticalAlignment="center">
    <Label text="AngularCamp Game" class="title"></Label>
    <Image class="front_image"
        src="res://angular_camp_game"
        dock="left">
    </Image>
    <Button class="main_button" verticalAlignment="center"
        text="New Game" (tap)="newGame()"></Button>
    </StackLayout>
    <!-- Game Config -->
    <StackLayout *ngIf="screen === 1" verticalAlignment="center">
        <Label text="Select your challenge" class="big" row="1"></Label>
        <Button class="opt_button" text="15 seconds" (tap)="prepareGame(15)"></Button>    
        <Button class="opt_button" text="2 minutes" (tap)="prepareGame(120)"></Button>
        <Button class="opt_button" text="3 minutes" (tap)="prepareGame(180)"></Button>
        <Button class="opt_button" text="5 minutes" (tap)="prepareGame(300)"></Button>        
    </StackLayout>
    
    <!-- Ready screen -->
    <StackLayout *ngIf="screen === 2" verticalAlignment="center">
        <Label text="READY TO PLAY?" class="big"></Label>
        <Button class="start_button_ok" text="Sure thing!" (tap)="startGame()"></Button> 
        <Button class="start_button_nok" text="Not so sure..." (tap)="startGame()"></Button>       
    </StackLayout>
    
    <!-- Game Phase -->
    <GridLayout *ngIf="screen === 3" rows="auto,auto, auto, *"> 
        <Label class="title" text="AngularCamp Game"></Label>
        <Label row="1" class="timer_text" [text]="secondsLeft | timer" 
            [ngClass]="{timer: secondsLeft > 10, timerRed: secondsLeft <= 10}"></Label>
        
        <GridLayout class="task-background" row="2" columns="*,*,*" verticalAlignment="center">
            <Label class="task-label" [text]="task.arg1" col="0"></Label>
            <Label class="task-label" [text]="task.operand" col="1"></Label>
            <Label class="task-label" [text]="task.arg2" col="2"></Label>
        </GridLayout>

        <GridLayout class="answers" row="3" columns="*,*,*,*">
            <Button class="answer-btn" *ngFor="#answer of task.answers; #i = index"
                [text]="answer"
                [col]="i"
                (tap)="onAnswer(i)"></Button>
        </GridLayout>
    </GridLayout>
    
    <!-- Results screen -->
    <GridLayout *ngIf="screen === 4" rows="auto,auto, auto, auto, auto, auto"> 
    
        <Label text="SCORE" class="title" row="1"></Label>
        <GridLayout row="2">
            <Image class="front_image"
                src="res://campcamp"
                dock="left">
            </Image>
        </GridLayout>
        <GridLayout columns="auto,auto" row="3" horizontalAlignment="center">
            <Label text="Right answers:" class="big" col="0"></Label>            
            <Label [text]="score.right" class="big" col="1"></Label>            
        </GridLayout>     
                
        <GridLayout columns="auto,auto" row="4" horizontalAlignment="center">            
            <Label text="Wrong answers:" class="big"col="0"></Label>
            <Label [text]="score.wrong" class="big"col="1"></Label>       
        </GridLayout>
         
        <GridLayout columns="auto,auto" row="5">    
            <Button class="opt_button" text="NEW GAME" (tap)="newGame()" col="0"></Button>
            <Button class="opt_button" col="1" text="Cool logo again" (tap)="back2Start()"></Button>
        </GridLayout>
    </GridLayout>
</GridLayout>
`,
})
export class MainPage {
    public task: Task;
    public score: Score;
    public screen: number = 0;
    public secondsLeft: number;

    constructor() {
        this.nextTask();
        this.setScore(0,0);
    }

    private nextTask() {
        var arg1: number = this.getArg();
        var arg2: number = this.getArg();
        var operand: string = this.getOperation();
        var pos: number = Math.floor(Math.random() * 4);
        this.task = {
            arg1: arg1,
            arg2: arg2,
            operand: operand,
            rightAnswerIndex: pos,
            answers: this.getAnswers(arg1, arg2, operand,pos)
        }
    }

private setScore(right:number,wrong:number){
    var right: number = right;
    var wrong: number = wrong;
    this.score={
        right:right,
        wrong:wrong
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
            if (index === this.task.rightAnswerIndex) {
                this.score.right++;
            } else {
                this.score.wrong++;
            }
        
        console.log("answer index: " + index);
        this.nextTask();
    }

    public newGame() {
        // back to select time
        this.score.right=0;
        this.score.wrong=0;
        this.screen = 1;
    }
    
    public back2Start() {
        // back to main menu
        this.screen = 0;
    }

    public prepareGame(seconds: number) {
        this.secondsLeft = seconds;
        this.screen = 2;
    }

    public startGame() {
        this.screen = 3;
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