const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let totalPairs = cards.length / 2;
let playerName = '';

function askForPlayerName() {
    playerName = prompt("Digite o seu nome:");
    if (playerName) {
      alert(`Bem-vindo(a), ${playerName}! Vamos começar o jogo!`);
    } else {
      askForPlayerName();
    }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();

}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  checkForAllPairsFound();

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    checkForAllPairsFound();

    resetBoard();
  }, 1500);
}

const timerElement = document.getElementById('time');
let timeLeft = 60; // Tempo inicial em segundos

function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      endGame(); // Adicione uma função para encerrar o jogo quando o tempo acabar
    }
  }, 1000); // Atualiza a cada segundo
}

function updateTimer() {
  timerElement.innerText = `Tempo restante: ${timeLeft} segundo${timeLeft !== 1 ? 's' : ''}`;
}

function endGame() {
  alert("Tempo esgotado! O jogo acabou.");
  const playAgain = confirm("Quer jogar novamente?");
  if (playAgain) {
    resetGame();
  }
}


function resetGame() {
  location.reload(); 
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkForAllPairsFound() {
  const flippedCards = document.querySelectorAll('.memory-card.flip');
  
  if (flippedCards.length === totalPairs * 2) {
    if (playerName) {
      alert(`Parabéns, ${playerName}! Você concluiu o jogo com ${timeLeft} segundos restantes.`);
    } else {
      alert(`Parabéns! Você concluiu o jogo com ${timeLeft} segundos restantes.`); // Caso o jogador não tenha fornecido um nome
    }

    const playAgain = confirm("Quer jogar novamente?");
    if (playAgain) {
      resetGame();
    }
  }
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });


})();

cards.forEach(card => card.addEventListener('click', flipCard));

askForPlayerName();
startTimer();