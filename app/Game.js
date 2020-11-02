import { Quote } from "./Quote.js";
class Game {
  currentStep = 0;
  lastStep = 7;
  quotes = [
    {
      text: "pan tadeusz",
      category: "Utwór literacki",
    },
    {
      text: "janko muzykant",
      category: "Utwór literacki",
    },
    {
      text: "akademia pana kleksa",
      category: "Film",
    },
  ];
  constructor({
    wordWraper,
    categoryWrapper,
    lettersWrapper,
    outputWrapper,
    restartGame,
  }) {
    this.wordWraper = wordWraper;
    this.categoryWrapper = categoryWrapper;
    this.lettersWrapper = lettersWrapper;
    this.outputWrapper = outputWrapper;
    this.restartGame = restartGame;

    const { text, category } = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
  }
  guess(letter) {
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName("step")[
        this.currentStep
      ].style.opacity = 1;
      if (this.currentStep == this.lastStep) {
        this.loosing();
      }
    }
  }
  drawLeters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", (event) => this.guess(label, event));
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.wordWraper.innerHTML = content;
    if (!content.includes("_")) {
      this.winning();
    }
  }

  start() {
    document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;
    this.drawLeters();
    this.drawQuote();
  }
  winning() {
    this.wordWraper.innerHTML = "Gratulacje Wygrywasz! Koniec Gry";
    this.lettersWrapper.innerHTML = "";
  }
  loosing() {
    this.wordWraper.innerHTML = "Przegrałeś! Koniec Gry";
    this.lettersWrapper.innerHTML = "";
    this.restGame();
  }
}
const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWraper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
  restartGame: document.getElementById("restartGame"),
});
game.start();
