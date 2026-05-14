import promptSync from "prompt-sync";

const prompt = promptSync();

type action= ["hit", "stand"]

let playerFunds: number = 100;
enum FaceCards{
    J = 10,
    Q = 10,
    K = 10
}

const card = [1, 2, 3, 4, 5, 6, 7, 8, 9, FaceCards.J, FaceCards.Q, FaceCards.K];
const randomIndex = Math.floor((Math.random() * 10) + 1);
console.log(`Player funds $${playerFunds}`);

const playerBet = +prompt('Enter your bet: ');
const playerCard1 = card[Math.floor((Math.random() * 10) + 1)];
const playerCard2 = card[Math.floor((Math.random() * 10) + 1)];
let playerCurrentTotal = playerCard1 + playerCard2;

const dealerCard1 = card[Math.floor((Math.random() * 10) + 1)];
const dealerCard2 = card[Math.floor((Math.random() * 10) + 1)];
let dealerCurrentTotal = dealerCard1 + dealerCard2;

if(playerCurrentTotal === 21){
    console.log(`Your hand: ${playerCard1}, ${playerCard2} (Total: ${playerCurrentTotal} -BlackJack!)`);
    console.log(`Dealer's hand: ${dealerCard1}, [hidden]`);
    console.log(`You win $${playerBet * 1.5} (3:2 payout for Blackjack)`);
    playerFunds += playerBet * 1.5;
    console.log(`Player funds $${playerFunds}`);
}

let playerAction;
console.log(`Your hand: ${playerCard1}, ${playerCard2} (Total: ${playerCurrentTotal})`);

do{
    playerAction = prompt("Your action (hit/stand): ");
    const playerCard3 = card[Math.floor((Math.random() * 10) + 1)];
    playerCurrentTotal += playerCard3;
    if(playerCurrentTotal > 21){
        console.log(`Your hand: ${playerCard1}, ${playerCard2}, ${playerCard3} (Total: ${playerCurrentTotal} -Bust)`);
        console.log(`Dealer's hand: ${dealerCard1}, ${dealerCard2} (Total: ${dealerCurrentTotal})`);
        console.log(`You bust and lose ${playerBet}.`);
        playerFunds -= playerBet;
        console.log(`Player funds $${playerFunds}`);
        break;
    }
}while(playerAction !== "stand");

if(dealerCurrentTotal === 21){
    console.log(`Dealer's hand: ${dealerCard1}, ${dealerCard2} (Blackjack)`);
    console.log(`You lose $${playerBet}`);
    playerFunds -= playerBet;
    console.log(`Player funds $${playerFunds}`);
}


if(dealerCurrentTotal > 17){
    console.log(`Dealer's hand: ${dealerCard1}, ${dealerCard2} (Total: ${dealerCurrentTotal})`);
    
    if(dealerCurrentTotal < playerCurrentTotal){
        console.log(`You win $${playerBet}!`);
        playerFunds += playerBet;
        console.log(`Player funds $${playerFunds}`);
    }
    else{
        console.log(`You lose $${playerBet}!`);
        playerFunds -= playerBet;
        console.log(`Player funds $${playerFunds}`);
    }
}
else if(dealerCurrentTotal === 17 && playerCurrentTotal === 17){
    console.log(`Dealer's hand: ${dealerCard1}, ${dealerCard2} (Total: ${dealerCurrentTotal})`);
    console.log("It's a push! Your bet is returned.");
    console.log(`Player funds $${playerFunds}`);
}
else{
    console.log(`Dealer's hand: ${dealerCard1}, ${dealerCard2} (Total: ${dealerCurrentTotal})`);
        
    const dealerCard3 = card[Math.floor((Math.random() * 10) + 1)];
    dealerCurrentTotal += dealerCard3;
    if(dealerCurrentTotal > 21){
        console.log(`Dealer hits: ${dealerCard1}, ${dealerCard2}, ${dealerCard3} (Total: ${dealerCurrentTotal} -Dealer Busts!)`)
        console.log(`You win ${playerBet}.`);
        playerFunds += playerBet;
        console.log(`Player funds $${playerFunds}`);
    }
}
    
