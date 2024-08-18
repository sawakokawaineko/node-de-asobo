'use strict';

const romanNumObj = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1
}

const digits = [1000, 100, 10, 1];

const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value)
}

main(process.argv[2])

function main(input) {
    let inputInt = parseInt(input);
    if (Number.isNaN(inputInt)) {
        convertRomanToArabic(input);
    } else if (inputInt >= 4000) {
        console.log('4000以上の数字はローマ数字で表記できません');
    } else {
        console.log(`${input}をローマ数字で表すと${convertArabicToRoman(inputInt)}です`);
    }
}

function convertArabicToRoman(inputInt) {    
    // 各桁の数字を数えてinputMapに入れる
    let inputdigitMap = new Map();
    digits.forEach((digit) => {
        let count = Math.trunc(inputInt/digit);
        inputdigitMap.set(digit, count);
        inputInt -= digit * count;
    });

    let output = '';
    inputdigitMap.forEach((value, key) => { // [key, value] = [100, 4]なら「100の位が4」つまり「100が4こ含まれる」
        if (value === 4 || value === 9) {
            output += getKeyByValue(romanNumObj, key) + getKeyByValue(romanNumObj, key * (value + 1));
            return;
        }
        if (value >= 5) {
            output += getKeyByValue(romanNumObj, key * 5);
            value -= 5;
        }
        for (let i = 0; i < value; i++) {
            output += getKeyByValue(romanNumObj, key);
        }
    });
    return output;
}

function convertRomanToArabic(input) {
    let inputArray = input.split('');
    let output = 0;

    for (let i = 0; i < inputArray.length; i++) {
        let currentNum = romanNumObj[inputArray[i]];
        if (currentNum === undefined) {
            console.log('正しいローマ数字ではありません');
            return;
        }
        let nextNum = romanNumObj[inputArray[i+1]];
        // 4や9を想定した引き算(書き方が間違っている場合(VX,ICなど)は検算処理で弾くので、ここでは気にしない)
        if (currentNum < nextNum) {
            output -= currentNum;
        } else {
            output += currentNum
        }
    };

    // 検算
    if (convertArabicToRoman(output) === input) {
        console.log(`${input}をアラビア数字で表すと${output}です`);
    } else {
        console.log('正しいローマ数字ではありません');
    }
}