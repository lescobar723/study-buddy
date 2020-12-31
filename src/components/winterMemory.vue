<template>
<div class="feep">
    <div class="welcome">
        <h1>Welcome to Winter Memory Match!</h1>
    </div>

    <div class = "instr">
        Instructions: Click on a card to reveal what it is, and
        find the cards pair on your second click to make them
        stay revealed! Once all cards are revealed, you win!
    </div>

    <div class="return">
        <router-link to="/customize" tag="b-button">Return to Break Page</router-link>
    </div>

    <section class='grid'>
        <Card
          v-for="card in theCards"
          :key="card.id"
          :card="card"
          :cardTransform="cardTransform"
          @clicked="cardClicked"
        />
    </section>
</div>
</template>

<script>
import Card from './card.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const images = [
    'card1',
    'card2',
    'card3',
    'card4',
    'card5',
    'card6',
    'card7',
    'card8',
];

const cards = [];

var flippedNum = 0;

// source: https://morioh.com/p/9492a640932c

images.forEach(item=> {
    const tempurl = require(`../assets/cards/${item}.png`);
    const card = {
        matchKey: item,
        flipped: false,
        id: `${item}-a`,
        imgUrl: tempurl,
        matched: false,
    };
    const cardA = card;
    cards.push(cardA);
    const cardB = {...card};
    cardB.id = `${item}-b`;
    cards.push(cardB);
});

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initial() {
    shuffle(cards);
    return {
        totalFlips: 0,
        theCards: cards,
        flipsThisTurn: 0,
        firstID: null,
        firstMatchKey: null,
        cardTransform: null,
    };
}

export default {
    name: 'winterMemory',

    components: {
        Card,
    },

    data() {
        return initial();
    },

    methods: {
        cardClicked(clickedCardID) {
            const clickedCard = this.theCards.find(obj => obj.id === clickedCardID);
            if (clickedCard.flipped) {
                return;
            }
            this.flipsThisTurn++;
            if (this.flipsThisTurn === 1) {
                this.runFirst(clickedCard);
            }
            if (this.flipsThisTurn === 2) {
                this.runSecond(clickedCard);
            }
        },
        runFirst(clickedCard) {
            this.flipCard(clickedCard.id);
            this.firstID = clickedCard.id;
            this.firstMatchKey = clickedCard.matchKey;
        },
        runSecond(clickedCard) {
            this.flipCard(clickedCard.id);
            this.checkMatch(clickedCard);
        },
        gameWon() {
            flippedNum = 0;
            alert("You WON! Let's go back to the break page.");
            this.$router.push('/customize');
        },
        checkMatch(clickedCard) {
            setTimeout(() => {
                if (clickedCard.matchKey === this.firstMatchKey) {
                    this.flipsThisTurn = 0;
                    const newCards = this.theCards.map(card => ([clickedCard.id, this.firstID].includes(card.id)) ? {...card, matched: true } : card );
                    this.theCards = newCards;
                    flippedNum = flippedNum + 2;
                    if (flippedNum === 16) {
                        this.gameWon();
                    }
                } else {
                    this.flipCard(clickedCard.id);
                    this.flipCard(this.firstID);
                    this.flipsThisTurn = 0;
                }
            }, 1000);
        },

        flipCard(clickedCardID) {
            const newCards = this.theCards.map(card => card.id === clickedCardID ? { ...card, flipped: !card.flipped } : card );
            this.theCards = newCards;
        },
    },
};

</script>

<style scoped>

body {
    padding: 0;
    margin: 0;
}

.feep {
    background-color: rgb(221, 244, 255);
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 20px;
}

.welcome {
    padding-top: 5px;
    font-size: 100%;
    color:darkmagenta;
}

.instr {
    font-size: 80%;
    color: black;
    padding-bottom: 5px;
}

.return {
    position: fixed;
    right: 12px;
    top: 15px;
    z-index: 3;
}

.winter {
    margin: 0;
    padding: 20px;

    @media (min-width: 700px) {
        padding: 50px;
    }
}

.grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: calc(100vw -80px);
    height: calc(100vh - 100px);
}

</style>