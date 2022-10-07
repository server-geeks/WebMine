

// let card1 = getRandemoCard()
// let card2 = getRandemoCard()
let hasblackjack = false
let sumCrd = 0
let cards = []
console.log(sumCrd)
let message = ""
let isAlive = false

let messageEl = document.querySelector("#message-el")
let sum = document.querySelector("#sum")
let card = document.querySelector("#card")

let player={
    name : "per",
    chip : 145
}


let playerEl=document.getElementById("player")
playerEl.textContent = player.name+": $"+player.chip

console.log(cards)


function getRandemoCard() {
    // return Math.floor(Math.random()*13)+1
    let value = Math.floor(Math.random() * 13) + 1
    if (value === 1) {
        return 11
    } else if (value === 11 || value === 12 || value === 13) {
        return 10
    } else {
        return value
    }
}



function startGame() {
    isAlive = true
    let randomone = getRandemoCard()
    let randomtwo = getRandemoCard()
    cards = [randomone, randomtwo]
    sumCrd = randomone + randomtwo

    renderGame()
}

function renderGame() {
    card.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        card.textContent += cards[i] + " "
    }


    if (sumCrd <= 20) {
        message = "do you want to dreaw a new card?"
    } else if (sumCrd === 21) {
        message = "Woohoo! you've got BlackJack!"
        hasblackjack = true
    } else {
        message = "you're out of the game!"
        isAlive= false
    }
    messageEl.textContent = message
    sum.textContent = "Sum: " + sumCrd
}

function newCard() {
    // console.log("Drawing a new card from the deck!")
    if (isAlive === true && hasblackjack === false) {
        let cardn = getRandemoCard()
        sumCrd += cardn
        cards.push(cardn)
        console.log(cards)
        renderGame()
    }

}


