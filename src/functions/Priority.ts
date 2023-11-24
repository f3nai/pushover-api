import { Priority } from "../types";

function ConvertPriority(input: any): number {
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
            return 0
    }
}

export = ConvertPriority