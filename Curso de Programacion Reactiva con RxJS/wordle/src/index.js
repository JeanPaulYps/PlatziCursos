import { fromEvent, Subject } from "rxjs";
import WORDS_LIST from './wordsList.json';

const allowedCharacters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 
    'h', 'i', 'j', 'k', 'l', 'm', 'n', 
    'o', 'p', 'q', 'r', 's', 't', 'u', 
    'v', 'w', 'x', 'y', 'z'
];
let letterColumn = 0;
let letterRow = 0;

const letterRows = document.getElementsByClassName('letter-row');
const messageNode = document.getElementById('message-text');

const normalizeCharacter = (character) => character.normalize('NFC').toLowerCase();
const isCharacterAllowed = (character) => character.match(/\b[a-z]$/);

const getWordleNode = (row, column) => [...letterRows][row].children[column] 
const isGameOver = () => letterColumn === 0 && letterRow === 6
let userAnswer = [];
const getRandomWord = () => WORDS_LIST[Math.round(Math.random() * WORDS_LIST.length)] 
let rightWord = getRandomWord().toLowerCase();
console.log(rightWord)


const keyUpObserver$ = fromEvent(document, 'keyup');

const useWinOrLoose$  = new Subject();

keyUpObserver$.subscribe((event) => {
    if (isGameOver()){
        return;
    }
    const character = normalizeCharacter( event?.key ?? '');
    console.log(character);
    console.log({letterColumn, letterRow})
    

    if (isCharacterAllowed(character)) {
        console.log(character);
        if (letterColumn === 5) {
            return;
        }
        
        const htmlElementNode = getWordleNode(letterRow, letterColumn);
        htmlElementNode.textContent = character;
        htmlElementNode.classList.add('filled-letter');
        userAnswer.push(character);
        
        letterColumn++;
        
        // if (letterColumn === 4) {
        //     letterRow ++;
        //     letterColumn = 0;
        // } else {
        // }
    }
})

keyUpObserver$.subscribe((event) => {
    if (isGameOver()){
        return;
    }
    const character = normalizeCharacter( event?.key ?? '');
    if (character === 'backspace') {
        if (letterColumn === 0) {
            letterRow = Math.max(0, --letterRow) ;
            letterColumn = 4;
        } else {
            letterColumn--;
        }
        const htmlElementNode = getWordleNode(letterRow, letterColumn);
        htmlElementNode.textContent = '';
        htmlElementNode.classList.remove('filled-letter');
        userAnswer.pop();

    }
})

keyUpObserver$.subscribe(
    (event) => {
        console.log({event: event?.key})
        if (event?.key === 'Enter') {
            if (letterColumn === 5) {
                const answer = userAnswer.join('').toLowerCase();
                console.log(answer);
                if (answer === rightWord) {
                    useWinOrLoose$.next('Win');
                    return;
                }
                

                userAnswer.forEach((letter, index) => {
                    const letterPosition = [...rightWord].indexOf(letter);
                    const wordleNode = getWordleNode(letterRow, index);
     
                    if (letterPosition === -1) {
                     wordleNode.classList.add('letter-grey');
                    } else if (letterPosition === index) {
                     wordleNode.classList.add('letter-green');
                    } else {
                     wordleNode.classList.add('letter-yellow')
                    }
                 })
                 
     
     
                
                 

                 letterColumn = 0;
                userAnswer = [];
                letterRow++;
                messageNode.textContent = '';
            } else {
                messageNode.textContent = 'Te faltan algunas letras';
            }


            

        }
    }
)

useWinOrLoose$.subscribe(value => {
    let htmlRow = [...letterRows][--letterRow];
    [...htmlRow.children].forEach(children => children.classList.add('letter-green'))
    console.log(htmlRow);
})