"use strict";
function ConvertPriority(input) {
    switch (input) {
        case "LOWEST":
            return -2;
        case "LOW":
            return -1;
        case "NORMAL":
            return 0;
        case "HIGH":
            return 1;
        case "EMERGENCY":
            return 2;
        default:
            throw new Error("PushPriority Error: INVALIDPRSTAT Invalid priority was provided!");
    }
}
module.exports = ConvertPriority;
