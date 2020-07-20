'use strict';

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
};

const checkDay = date => {
    if (date.getDay() === 6) {
        date.setDate( date.getDate() + 2 );
    } else if (date.getDay() === 0) {
        date.setDate( date.getDate() + 1 );
    }
};

const checkHours = date => {
    if ( date.getHours() >= 17) {
        date.setDate( date.getDate() + 1 );
        date.setHours(9, 0);
    } else if ( date.getHours() < 9) {
        date.setHours(9, 0);
    }
};

const proceedWork1 = (date, turnaroundTime) => {
    const addDays = Math.floor(turnaroundTime / 8);
    const addHours = turnaroundTime % 8;
    const weeksToAdd = Math.floor(addDays / 5);
    let daysToAdd;
    const hoursToNextDay =  17 - date.getHours();

    if (date.getHours() + addHours >= 17 || (date.getMinutes() !== 0 && date.getHours() + addHours === 16)) {

        if (date.getDay() === 5) {
            daysToAdd = addDays % 5 + 1;
        }
        date.setHours(9 + 8 - hoursToNextDay, date.getMinutes());
    } else {
        daysToAdd = addDays % 5;
        date.setHours( date.getHours() + addHours, date.getMinutes() )
    }

    date.setDate( date.getDate() + 7 * weeksToAdd);
    if (date.getDay() + daysToAdd >= 6) {
        const toWeekends = 6 - date.getDay();
        date.setDate( date.getDate() + 7 - date.getDay());
        date.setDate( date.getDate() + daysToAdd - toWeekends);
    } else {
        date.setDate( date.getDate() + daysToAdd);
    }

};

const proceedWork2 = (date, turnaroundTime) => {
    if(date === 'Invalid Date') return 'Invalid Date';

    const addDays = Math.floor(turnaroundTime / 8);
    let addHours = turnaroundTime % 8;
    let isMinutes;

    let days = addDays;

    isMinutes = date.getMinutes() !== 0;

    if (date.getHours() + addHours + isMinutes > 17){
        days++;
        date.setHours(9);
        addHours--;
    }
    date.setHours(date.getHours()+addHours);

    while(days !== 0) {
        date.setDate(date.getDate() + 1)
        if (!(date.getDay() === 6 || date.getDay() === 0)) {
            days--;
        }
    }
    date.setMinutes(date.getMinutes());
};

const calculator = ( submitDate, turnaroundTime ) => {
    const targetDate = new Date(submitDate);
    checkHours(targetDate);
    checkDay(targetDate);
    proceedWork2(targetDate, parseInt(turnaroundTime, 10));
    return targetDate;
};

//tests

/*
let testDate;
let testTurnaroundTime;

testDate = '1995-03-07T12:30';
testTurnaroundTime = '1';

//console.log(calculator(testDate, testTurnaroundTime));
console.log(calculator(testDate, testTurnaroundTime));
console.log(new Date('1995-03-07T00:30:00.000Z'));

if (calculator(testDate, testTurnaroundTime).toLocaleDateString("en-US", options) ==
    new Date('1995-03-07T13:30:00.000Z').toLocaleDateString("en-US", options)) {
    console.log(`Test #1: Passed;`);
} else console.log(`Test #1: Failed;`);

testDate = new Date( '2000-03-24T12:30' );
testTurnaroundTime = 0;

if (calculator(testDate, testTurnaroundTime) !== new Date('2000-03-24T12:30')) {
    console.log(`Test #2: Passed;`);
} else console.log(`Test #2: Failed;`);

testDate = new Date( '2000-09-24T12:30' );
testTurnaroundTime = 0;


console.log(testDate);
console.log(testDate.toLocaleString("en-US", options));
console.log(`Turnaround time: ${testTurnaroundTime}`);

console.log('----------------');

console.log(calculator(testDate, testTurnaroundTime));
console.log(calculator(testDate, testTurnaroundTime).toLocaleString("en-US", options));


 */
module.exports = { calculator };
