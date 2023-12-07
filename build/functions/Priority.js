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
        case typeof input == "number" && input >= -3 && input <= 2:
            return input;
        default:
            return 0;
    }
}
module.exports = ConvertPriority;
