const slide = document.querySelector('.slides img');
const logo = document.querySelector('.logo');
const form = document.querySelector('#submitForm');
const inputGroup = document.querySelector('.input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const formProgressbar = document.querySelector('.form-progressbar');
const inputProgressbar = document.querySelector('.input-progressbar');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const loginBtn = document.querySelector('.login-btn');
const questions = [
    { label: 'Enter your first name', pattern: /^[A-zÀ-ú]+[\sA-zÀ-ú]*$/ },
    { label: 'Enter your last name', pattern: /^[A-zÀ-ú]+[\sA-zÀ-ú]*$/ },
    { label: 'Enter your email adress', pattern: /^[a-z]*[-_.a-z0-9]*@[a-z]+\.(com|net|org|gov|edu)$/i },
    { 
        label: 'Create a password', 
        type: 'password',
        pattern: /^.{1,}$/i
    }
];
const slides = [
    'src/img/photo1.jpg',
    'src/img/photo2.jpg',
    'src/img/photo3.jpg',
    'src/img/photo4.jpg',
    'src/img/photo5.jpg',
    'src/img/photo6.jpg'
];
let position = 0;
let index = 0;


// Events
document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
});
const slideshow = setTimeout(changeBackground, 8000);

inputField.addEventListener('keyup', e => {
    if (e.key == 'Enter') {
        getQuestion();       
    } 
});

prevBtn.addEventListener('click', getPrevious);
nextBtn.addEventListener('click', getQuestion);

// Functions
function changeBackground() {
    let slideIndex = index % slides.length;

    slide.style.animation = 'fadeOut 2.5s ease forwards';
    setTimeout(() => {
        slide.style.animation = 'reveal 1.5s ease forwards';
        slide.src = slides[slideIndex];
    }, 2000);

    setTimeout(changeBackground, 8000);    
    index++;
}

function toCapitalize(str = '') {
    return str.toLowerCase()
        .split(' ')
        .map(char => char.charAt(0).toUpperCase() + char.slice(1))
        .join(' ');
}

function getQuestion() {
    let answer = toCapitalize(inputField.value.trim());

    if (questions[position]) { 
        if (questions[position].pattern) {
            if (!validateInput(answer)) { 
                inputError();
                return;
            } else {
                inputProgressbar.classList.remove('error');
                nextBtn.classList.remove('error');
            }
        }       
        // Store answer
        questions[position].answer = answer;
    
        // Show next question and focus on the input field
        position++;
        onProgress();
        showQuestion();

        // Show registration message
        if (position == questions.length) {
            completion();
        }
    }
}

function showQuestion() {
    if (!questions[position]) { return; }
    setTimeout(() => {
        inputGroup.style.opacity = 1;
        inputField.value = '';
        inputField.type = questions[position].type || 'text';
        inputLabel.innerHTML = questions[position].label;
        inputProgressbar.style.width = '92%';
    }, 50);
}

function getPrevious() {
    position--;
    if (position == 0) {
        this.classList.remove('fa-chevron-left');
        this.classList.add('fa-user');        
    }
    position = position < 0 ? 0 : position;

    formProgressbar.style.width = `${(position * 100)/questions.length}%`;
    showQuestion();
}

function onProgress() {
    form.style.animation = 'shake2 0.3s ease';
    inputField.focus();  
    formProgressbar.style.width = `${(position * 100)/questions.length}%`;

    if (position < questions.length - 1) {
        setTimeout(() => form.style.animation = '', 300);
    }
    
    prevBtn.classList.remove('fa-user');
    prevBtn.classList.add('fa-chevron-left');
}

function inputError() {
    form.style.animation = 'shake 0.3s ease';
    inputProgressbar.classList.add('error');
    nextBtn.classList.add('error');
    setTimeout(() => form.style.animation = '', 300);
}

function validateInput(input) {
    return questions[position].pattern.test(input); 
}

function completion() {
    form.style.animation = 'vanish 1.5s ease forwards';
    clearTimeout(slideshow);

    setTimeout(() => {
        logo.style.animation = 'animationLogo 1.2s ease forwards';
        logo.innerHTML = `Welcome, ${questions[0].answer}. A new journey begins!`;

        setTimeout(() => {
            form.remove();
            slide.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => slide.remove(), 500);
            loginBtn.style.animation = 'slideUp 1.2s ease forwards';
        }, 1000);
    }, 160);
}







/**
 * Algorithms PRACTICE 
 */



let matrix = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 0, 1],
    [2, 3, 4, 5],
];

function getConvertion(arr) {
    let output = [];
    let row = [];

    for (let i = 0; i < arr.length; i++) {
        
        for (let j = 0; j < arr[i].length; j++) {
            // console.log('j: '+j+'; i: '+i);
            row.push(arr[j][i]);
        }
        output.push(row);
        row = [];
    }

    return output;
}
// console.log(getConvertion(matrix));



function calculate(option = '', ...values) {
    // remember that ...(anyName) is the Rest Parameter, which
    // represents an indefinite amount of parameters passed as
    // a true array, unlike the arguments object.
    
    let operations = {
        /**If the last param of the reduce method is omitted
         * t'll automatically asign the first element in the
         * array to the accumulator variable
         */
        sum: values.reduce((a, b) => a + b, 0),
        sub: values.reduce((a, b) => a - b),
        mul: values.reduce((a, b) => a * b),
        div: values.reduce((a, b) => a / b),
    };

    return option in operations ? operations[option] : "Invalid Operation";
}
// console.log(calculate('div', 2, 6, 2, 8));



/**Recursive function */
function countUp(n) {
    if (n < 1) {
        return [];
    } else {
        let arr = countUp(n - 1);
        arr.unshift(n);
        return arr;
    }
}
// console.log(countUp(10))



/* ES6 introduced Destructing Assignment 
to Extract Values from Objects */

let user = { 
    firstName: 'Adison', 
    lastName: 'Peña Martínez',
    fullName() { return this.firstName + ' ' + this.lastName }, /** 
    In ES6 you can't avoid having to name the property
    and then assign the function to it, thus eliminating 
    the need for the property name and the semi colon altogether */
    age: 26,
    gender: 'Male',
    team: ['Super Skrull', 'Magneto', 'C. Viper'],
    active: true
};

const { firstName, active, team, fullName } = user;
// console.log(firstName);

let players = {
    player1: {
        team: ['Hulk', 'Sentinel', 'Haggar'],
        winStreak: 4
    },
    player2: {
        team: ['Magneto', 'Sentinel', 'Dr. Doom'],
        winStreak: 3
    } 
}

const { player1: {winStreak: wins, team: point } } = players;
// console.log(point[0]);

// Works with Arrays of course;
const [a, b, ...arr] = [10, 45, 88, 5, -42];
// console.log(arr);


/**Forgetting a sub array and omit values (not the last value), 
 * you might use , to count the indexes to be omitted
 */
const [,, ...arr2] = [10, 45, 88, 5, -42];
// console.log(arr2);



let test = 'Greetings from Earth!';

function reverString(str) {
    let reversed = '';

    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}
//console.log(reverString(test));


function factorialize(num) {
    let result = 1;

    for (let i = num; i > 0; i--) {
        result *= i;
    }
    return result;
}
  


let words = "The quick brown fox jumped over the lazy dog";

function reLongestWord(str, actualWord = false) {
    let length = Math.max(...str.split(' ').map(a => a.length));
    let word = str.split(' ').find(a => a.length == length);

    return !actualWord ? length : word;
}
// console.log(reLongestWord(words, true));



function largestOfFour(arr) {
    return arr.map(sub => Math.max(...sub));
}
// console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));




/***Find duplicates, Adison edition remastered */
let fruits = ['Melon', 'Melon', 'Banana', 'Orange', 'Strawberries', 'Lemon'];

function searchDuplicates(arr) {
    let duplicate = false;

    arr.forEach((val, i) => {
        if (arr.indexOf(val) != i) {
            duplicate = true;
        }
    });
    return duplicate;
}
// console.log(searchDuplicates(fruits));



/*** Insert values of arr1 into the n position of arr2, 
 * wiothout affecting the original arrays */
function frankenSplice(arr1, arr2, n) {
    let newArr = [...arr2];
    newArr.splice(n, 0, ...arr1);
    return newArr;
}
// console.log(frankenSplice([1, 2, 3], [4, 5, 6], 1));
  


/**Find lowest index  */
function getIndexToIns(arr, num) {
    arr.sort((a, b) => a - b);
    let index = arr.findIndex(val => val >= num);
    
    return index > -1 ? index : arr.length;
}
// console.log(getIndexToIns([40, 20, 60], 50));
 


/***Check if all letters are present in
 * the second string
 */
function mutation(arr) {
    arr = arr.map(val => val.toUpperCase());

    for (let i = 0; i < arr[1].length; i++) {
        if (arr[0].indexOf(arr[1][i]) == -1) {
            return false;
        }
    }
    return true;
}
// console.log(mutation(["floor", "forp"]));



/**
 * Split an array into groups the length of 
 * size (second argument) and returns 
 * them as a two-dimensional array.
 */
function chunkArrayInGroups(arr, size) {
    let newArr = [];

    for (let i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
    }
    return newArr;
}
// console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5], 2));



/**
 * Find the values not present in one 
 * array or the other
 */
function diffArray(arr1 = [], arr2 = []) {
    let first  = arr1.filter(a => arr2.indexOf(a) == -1);
    let second = arr2.filter(a => arr1.indexOf(a) == -1);
    return second.concat(first);
}
// console.log(diffArray([], ["snuffleupagus", "cookie monster", "elmo"]));



/**
 * Remove all values that match the values
 * in the initial array
 */
function destroyer(arr, ...others) {
    return arr.filter(val => others.indexOf(val) == -1);
}
// console.log(destroyer(["possum", "trollo", 12, "safari", "hotdog", 92, 65, "grandma", "bugati", "trojan", "yacht"], "yacht", "possum", "trollo", "safari", "hotdog", "grandma", "bugati", "trojan"));
 



function matchValuePair(collection = [], source) {
    let arr = [];

    collection.forEach(item => {
        let match = true;
        for (let prop in source) {
            if (source[prop] != item[prop]) {
                match = false;
            }
        }
        if (match) {
            arr.push(item);
        }
    });
    return arr;
}

function matchValuePair2(collection = [], source) {
    let keys = Object.keys(source);

    return collection.filter(obj => {
        return keys.every(key => {
            return key in obj && obj[key] === source[key];
        });
    });
}
// console.log(matchValuePair2([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }));




/**
 * Match the DNA strand with its missing element
 */
function pairElement(str) {
    let pairs = { A: 'T', T: 'A', C: 'G', G: 'C' };

    return str.split('').map(strand => [strand, pairs[strand]]);
} 
// console.log(pairElement("ATCGA"));  



function fearNotLetter(str) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let range = alphabet.slice(alphabet.indexOf(str[0]), 
        alphabet.indexOf(str[str.length - 1]) + 1);

    return range.split('').find(val => str.indexOf(val) == -1);
}
// console.log(fearNotLetter("abce"));




/**
 * Get new array with unique values from each array
 */
function uniteUnique(...params) {
    let concatArr = [].concat(...params);

    return concatArr.filter((num, index) => concatArr.indexOf(num) == index);
}
//console.log(uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]));



/**
 * Newly improved duplicate finder
 */
function findDuplicates(arr) {
    return arr.some((item, index) => arr.indexOf(item) != index);
}
// console.log(findDuplicates3(['Adison', 'Luis', 'Raimer']));




function convertHTML(str) {
    let entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
    }
    
    /* You can also pass a callback to .replace()
    * which holds the matches found
    */
    return str.replace(/[&"'<>]/g, match => entities[match]);
}
// console.log(convertHTML("Dolce & Gabbana"));




/**
 * Get the fibonacci sequence and 
 * return the sum of all the odd numbers 
 */
function fibShit(num) {
    let fibArr = [1, 1];
    
    for (let i = 0; (i = fibArr[0] + fibArr[1]) <= num; i++) {
        fibArr.unshift(i);
    }

    return fibArr.filter(num => num % 2 != 0).reduce((a, b) => a + b, 0);
}
// console.log(fibShit(20));




/**
 * Sum the prime numbers within the given range
 */
function sumPrime(num) {
    let arr = [];
    let prime = [];

    for (let i = 2; i <= num; i++) {
        arr.push(i);
    }

    prime = arr.filter(num => {
        let check = true;

        for (let i = num - 1; i > 1; i--) {
            if (num % i == 0) {
                check = false;
            }
        }
        return check;
    });
    return prime.reduce((a, b) => a + b);
}
// console.log(sumPrime(10));




/**
 * Get the least/smalles common multiple
 */
function smallestCommons(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let result = max;

    for (let i = max - 1; i >= min; i--) {
        if (result % i) {
            result += max;
            i = max;
        }
    }

    return result;    
}
// console.log(smallestCommons([3, 4]));




/**
 * Return a new array after one element has met
 * a condition, with all subsequent elements after it
 */
function dropElements(arr = [], func) {
    return arr.slice(arr.findIndex(func) >= 0 ? arr.findIndex(func) : arr.length);
}
// console.log(dropElements([1, 2, 3, 4], function(n) {return n > 5;}));  




/**
 * Return a flatten array of many dimensions
 */
function steamrollArray(arr) {
    // You can also use Array.flat() for this.
    return arr.toString().replace(',,', ',').split(',').map(val => {
        return (val == '[object Object]') ? {} : (!isNaN(val)) ? parseInt(val) : val;
    });
}
//console.log(steamrollArray([1, {}, [3, [[4]]]]));




/**
 * Translate binary code to English
 */
function binaryAgent(str) {
    return str.split(' ').map(val => String.fromCharCode(parseInt(val, 2))).join('');
}
// console.log(binaryAgent("01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000110 01110010 01100101 01100101 01000011 01101111 01100100 01100101 01000011 01100001 01101101 01110000 00100001"));




/**
 * Check truthy
 */
function truthCheck(collection, pre) {
    return collection.every(user => Boolean(user[pre]));
}
// console.log(truthCheck([{"name": "Pete", "onBoat": true}, {"name": "Repeat", "onBoat": true, "alias": "Repete"}, {"name": "FastFoward", "onBoat": true}], "onBoat"));




/**
 * Check for the orbitalPeriod of debri
 */
function orbitalPeriod(arr) {
    const GM = 398600.4418;
    const earthRadius = 6367.4447;

    return arr.map(debri => {
        let r = earthRadius + debri.avgAlt;

        delete debri['avgAlt'];

        debri['orbitalPeriod'] = 
            Math.round(2 * Math.PI * Math.sqrt(Math.pow(r, 3)/GM));

        return debri;
    });
}
// console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]));




/**
 * Check if a word is palindrome
 */
function isPalindrome(str) {
    let original = str.toLowerCase().replace(/[\W_]/g, '');
    let reversed = '';

    for (let i = original.length - 1; i >= 0; i--) {
        reversed += original[i];
    }
    return original === reversed;
}
// console.log(isPalindrome('five|\_/|four'));



function checkPairs(arr) {
    let pairs = {};
    let totalPairs = 0;

    arr.forEach(val => {
        pairs[val] = pairs[val] ? pairs[val] + 1 : 1;
    });

    Object.keys(pairs).forEach(key => {
        if (pairs[key] < 2) {
            delete pairs[key];
        }
        else if (pairs[key] % 2 != 0) {
            pairs[key] = pairs[key] - 1;
        }
    });

    Object.keys(pairs).forEach(key => {
        pairs[key] = pairs[key] / 2;
        totalPairs += pairs[key];
    });

    return totalPairs;
}
// console.log(checkPairs([5, 2, 0, 5, 3, 2, 10, 2, 0, 0, 0]));



/**
 * Conver a number to Raman
*/
function romanConvertor(num) {
    let decimalValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
    let romanNumeral = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];
    let romanized = '';

    for (var index = 0; index < decimalValue.length; index++) {
        while (decimalValue[index] <= num) {
            romanized += romanNumeral[index];
            num -= decimalValue[index];
        }
    }
    return romanized;
}
// console.log(romanConvertor(3948));




/**
 * Create a ROT13 decoder
 */
function rotDecoder(code) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return code.replace(/[A-Z]/g, function(char) {
        return alphabet[alphabet.indexOf(char) >= 13 ? 
            alphabet.indexOf(char) - 13 : alphabet.indexOf(char) + 13];
    });
}
//console.log(rotDecoder('GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.'));




/**
 * Create a US phone number validator
 */
function phonenumberValidator(phone) {
    const reg1 = /^1?[\s-]?\(\d{3}\)/;
    const reg2 = /^1?[\s-]?\(\d{3}/;
    const reg3 = /^1?[\s-]?\d{3}\)/;
    const reg4 = /^1?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
    let first = 'fail';

    if (reg1.test(phone)) {
        first = 'pass';
    }
    else if (!reg1.test(phone) && 
        !reg2.test(phone) && 
        !reg3.test(phone)) {
        first = 'pass';
    }
    return first == 'pass' ? reg4.test(phone) : false;
}
// console.log(phonenumberValidator('(757622-7382'));




/**
 * Create a Cash Register
 */
function checkCashRegister(price, cash, cid) {
    let currency = {
        PENNY: 0.01,
        NICKEL: 0.05,
        DIME: 0.1,
        QUARTER: 0.25,
        DOLLAR: 1,
        FIVE: 5,
        TEN: 10,
        TWENTY: 20,
        "ONE HUNDRED": 100
    }
    let change = cash - price;
    let output = { status: null, change: [] };

    let register = cid.map(val => val[1]).reduce((a, b) => a + b);

    if (change > register) {
        output.status = 'INSUFFICIENT_FUNDS';
    }

    return output;
}
// console.log(checkCashRegister(
//     19.5, 
//     20, 
//     [
//         ["PENNY", 1.01], 
//         ["NICKEL", 2.05], 
//         ["DIME", 3.1], 
//         ["QUARTER", 4.25], 
//         ["ONE", 90], 
//         ["FIVE", 55], 
//         ["TEN", 20], 
//         ["TWENTY", 60], 
//         ["ONE HUNDRED", 100]
//     ]));

