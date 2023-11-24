import { Priority } from "../types";

function ConvertPriority(input: string): number {
    switch(input){
        case "LOWEST":
            return -2
        case "LOW":
            return -1
        case "NORMAL":
            return 0
        case "HIGH":
            return 1
        case "EMERGENCY":
            return 2
        default:
            throw new Error("PushPriority Error: INVALIDPRSTAT Invalid priority was provided!")
    }
}

export = ConvertPriority