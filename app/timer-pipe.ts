import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'timer' })
export class TimerPipe implements PipeTransform {
    transform(value: number, args: string[]): any {
        let min = Math.floor(value / 60);
        let sec = value - min * 60;

        return (min < 10 ? "0" : "") + min + ":" +
            (sec < 10 ? "0" : "") + sec;
    }
}