/**
 * Created by epinapala on 7/25/15.
 * Flames module to calculate Flames
 * relationship on the given 2 names.
 */

"use strict";
var Flames = function ()
{
    this.flamesMap = {
        "f": "Friends",
        "l": "Lovers",
        "a": "Affection",
        "m": "Marriage",
        "e": "enemies",
        "s": "Siblings"
    };
    this.calculateFlamesResult = function (firstName, secondName)
    {
        var number = this.getFlamesCount(firstName, secondName);
        var flamesArray = "flames".split("");
        var iLast = 0,
            iCurrent = 0;
        var i = flamesArray.length;
        while (i > 1) {
            //this manages the pivot, iCurrent
            iCurrent = (iLast + (number % i) - 1) % i;
            //remove the char where pivot stops.
            flamesArray.splice(iCurrent, 1);
            //reset last character to current pivot, for recalc.
            iLast = iCurrent;
            i -= 1;
        }
        return this.getResultFromChar(flamesArray[0]);
    };
    // this function takes both the names and returns the number of
    // characters that arent common in botht the names.
    this.getFlamesCount = function (firstInputName, secondInputName)
    {
        //explode strings to arrays
        firstInputName = firstInputName.toLowerCase().split("");
        secondInputName = secondInputName.toLowerCase().split("");
        //initialize iter flags to 0
        var i = 0;
        var j = 0;
        var flag = false;
        while (i < firstInputName.length) {
            while (j < secondInputName.length) {
                if(firstInputName[i] == secondInputName[j]) {
                    //match found, strip it off from each name
                    firstInputName.splice(i, 1);
                    secondInputName.splice(j, 1);
                    flag = true;
                    break;
                }
                j += 1;
            }
            //this will be skipped every time a match is found
            if(flag != true) {
                //move to next char in first array
                i += 1;
            }
            //This ensures move to next char in first array
            flag = false;
            //start from first char in second array.
            j = 0;
        }
        //return the number of characters left in each names
        return firstInputName.length + secondInputName.length;
    }
    //this function takes in a character and returns the proper Full form
    this.getResultFromChar = function (char)
    {
        return this.flamesMap[char];
    }
}
Flames.prototype.getRelation = function (firstName, secondName)
{
    return this.calculateFlamesResult(firstName, secondName);
};
module.exports = new Flames();