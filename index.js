/**
 * Created by epinapala on 7/25/15.
 * Flames module to calculate Flames
 * relationship on the given 2 names.
 */

"use strict";
var Flames = function() {
  /**
   * This is a simple object to map a Flames
   * character with the relationship.
   **/
  this.flamesMap = {
    "f": "Friends",
    "l": "Lovers",
    "a": "Affection",
    "m": "Marriage",
    "e": "enemies",
    "s": "Siblings"
  };
  /**
   * Clean the string to include only alphabets.
   * remove digits, special characters and spaces.
   * We would count flames against only alphabets.
   **/
  this.clean = function(str) {
    return str.replace(/[^A-Za-z]/g, "");
  };
  /**
   * Calculate Flames relationship for 2 given names.
   **/
  this.calculateFlamesResult = function(firstName, secondName) {
    var number = this.getFlamesCount(
      this.clean(firstName),
      this.clean(secondName)
    );
    var flamesStr = "flames";
    //if string has less than 2 characters, do not iterate through the string
    while (flamesStr.length >= 2) {
      var j = 0;
      var process = [];
      // as flames is 6 chars long, ignore the cycles of '6'.
      // what ever the reminder is will be the number we need to
      // calculate the relation against.
      var iCurrent = number % flamesStr.length;
      if (iCurrent !== 0) {
        //cut the string from pivot's next character until the end.
        //call this headstring string
        // ex: flame to lame
        for (var i = iCurrent + 1; i <= flamesStr.length; i++) {
          process[j] = flamesStr.charAt(i - 1);
          j++;
        }
        // the prefix part apart from the cut part,
        // call this tail string.
        // this is important because the character striked off will
        // be the one left out in this loop.
        for (var i = 0; i <= iCurrent - 2; i++) {
          process[j] = flamesStr.charAt(i);
          j++;
        }
        //convert array back to a string
        flamesStr = process.join("");
      } else {
        //if the characters are 6, remove the last letter and
        // continue iteration
        flamesStr = flamesStr.slice(0, -1);
      }
    }
    return this.getResultFromChar(flamesStr);
  };
  /** this function takes both the names and returns the number of
  * characters that arent common in botht the names.
  **/
  this.getFlamesCount = function(firstInputName, secondInputName) {
      //explode strings to arrays
      firstInputName = firstInputName.toLowerCase().split("");
      secondInputName = secondInputName.toLowerCase().split("");
      //initialize iter flags to 0
      var i = 0;
      var j = 0;
      var flag = false;
      while (i < firstInputName.length) {
        while (j < secondInputName.length) {
          if (firstInputName[i] == secondInputName[j]) {
            //match found, strip it off from each name
            firstInputName.splice(i, 1);
            secondInputName.splice(j, 1);
            flag = true;
            break;
          }
          j += 1;
        }
        //this will be skipped every time a match is found
        if (flag != true) {
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
  this.getResultFromChar = function(char) {
    return this.flamesMap[char];
  }
}
Flames.prototype.getRelation = function(firstName, secondName) {
  return this.calculateFlamesResult(firstName, secondName);
};
module.exports = new Flames();
