import { fromEvent, Subject, takeUntil } from "rxjs";
import WORDS_LIST from "./wordsList.json";

let letterColumn = 0;
let letterRow = 0;

const letterRows = document.getElementsByClassName("letter-row");
const messageNode = document.getElementById("message-text");

const normalizeCharacter = (character) =>
  character.normalize("NFC").toLowerCase();
const isCharacterAllowed = (character) => character.match(/\b[a-z]$/);

const getWordleNode = (row, column) => [...letterRows][row].children[column];
const isGameOver = () => letterColumn === 0 && letterRow === 6;
let userAnswer = [];
const getRandomWord = () =>
  WORDS_LIST[Math.round(Math.random() * WORDS_LIST.length)];
let rightWord = getRandomWord().toLowerCase();
console.log(rightWord);

const keyUpObserver$ = fromEvent(document, "keyup");

const useWinOrLoose$ = new Subject();

const itIsInTheEndOfTheRow = () => letterColumn === 5;

const readCharacters = (event) => {
  if (isGameOver()) {
    return;
  }
  const character = normalizeCharacter(event?.key ?? "");
  console.log(character);
  console.log({ letterColumn, letterRow });

  if (isCharacterAllowed(character)) {
    console.log(character);
    if (letterColumn === 5) {
      return;
    }

    const htmlElementNode = getWordleNode(letterRow, letterColumn);
    htmlElementNode.textContent = character;
    htmlElementNode.classList.add("filled-letter");
    userAnswer.push(character);

    letterColumn++;

    // if (letterColumn === 4) {
    //     letterRow ++;
    //     letterColumn = 0;
    // } else {
    // }
  }
};


const deleteCharacters = (event) => {
  if (isGameOver() || itIsInTheEndOfTheRow()) {
    return;
  }
  const character = normalizeCharacter(event?.key ?? "");
  if (character === "backspace") {
    letterColumn = max(0, --letterColumn);
    const htmlElementNode = getWordleNode(letterRow, letterColumn);
    htmlElementNode.textContent = "";
    htmlElementNode.classList.remove("filled-letter");
    userAnswer.pop();
  }
};



const checkAnswer = (event) => {
  console.log({ event: event?.key });
  if (event?.key === "Enter") {
    if (letterColumn === 5) {
      const answer = userAnswer.join("").toLowerCase();
      console.log(answer);
      if (answer === rightWord) {
        useWinOrLoose$.next("Win");
        return;
      }

      userAnswer.forEach((letter, index) => {
        const letterPosition = [...rightWord].indexOf(letter);
        const wordleNode = getWordleNode(letterRow, index);

        if (letterPosition === -1) {
          wordleNode.classList.add("letter-grey");
        } else if (letterPosition === index) {
          wordleNode.classList.add("letter-green");
        } else {
          wordleNode.classList.add("letter-yellow");
        }
      });

      letterColumn = 0;
      userAnswer = [];
      letterRow++;
      messageNode.textContent = "";
    } else {
      messageNode.textContent = "Te faltan algunas letras";
    }
  }
};



useWinOrLoose$.subscribe((value) => {
  let htmlRow = [...letterRows][--letterRow];
  [...htmlRow.children].forEach((children) =>
    children.classList.add("letter-green")
  );
  console.log(htmlRow);
});


// keyUpObserver$.pipe(
//   takeUntil(useWinOrLoose$)
// ).subscribe(readCharacters);
// keyUpObserver$.pipe(
//   takeUntil(useWinOrLoose$)
// ).subscribe(deleteCharacters);
// keyUpObserver$.pipe(
//   takeUntil(useWinOrLoose$)
// ).subscribe(checkAnswer);