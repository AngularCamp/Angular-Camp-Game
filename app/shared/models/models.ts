export const OPERANDS = ["+", "-", "*", "/"];

export interface Task {
    arg1: number;
    arg2: number;
    operand: string;
    answers: Array<number>;
    rightAnswerIndex: number;
}

export interface Score {
    right: number;
    wrong: number;
}
