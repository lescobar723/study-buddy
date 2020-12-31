<template>
<body>
<div>
    <h1>HANGMAN!</h1>
    <div id="imagediv">
        <img :src="hangmen[numWrong].url" class="hangmans" />
    </div>
    <div id="buttons">
        <h2>Letters</h2>
        <div id="buttongroups">
            <b-button id='A' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('A')"> A </b-button>
            <b-button id='B' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('B')"> B </b-button>
            <b-button id='C' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('C')"> C </b-button>
            <b-button id='D' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('D')"> D </b-button>
            <b-button id='E' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('E')"> E </b-button>
            <b-button id='F' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('F')"> F </b-button>
            <br>
            <b-button id='G' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('G')"> G </b-button>
            <b-button id='H' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('H')"> H </b-button>
            <b-button id='I' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('I')"> I </b-button>
            <b-button id='J' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('J')"> J </b-button>
            <b-button id='K' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('K')"> K </b-button>
            <b-button id='L' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('L')"> L </b-button>
            <br>
            <b-button id='M' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('M')"> M </b-button>
            <b-button id='N' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('N')"> N </b-button>
            <b-button id='O' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('O')"> O </b-button>
            <b-button id='P' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('P')"> P </b-button>
            <b-button id='Q' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('Q')"> Q </b-button>
            <b-button id='R' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('R')"> R </b-button>
            <br>
            <b-button id='S' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('S')"> S </b-button>
            <b-button id='T' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('T')"> T </b-button>
            <b-button id='U' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('U')"> U </b-button>
            <b-button id='V' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('V')"> V </b-button>
            <b-button id='W' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('W')"> W </b-button>
            <b-button id='X' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('X')"> X </b-button>
            <br>
            <b-button id='Y' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('Y')"> Y </b-button>
            <b-button id='Z' pill class="mr-1" variant="outline-dark" size="m" @click="handleGuessedButton('Z')"> Z </b-button>
        </div>
    </div>
    <div id="topbuttons">
        <div id="getword">
            <b-button :disabled=this.playing variant="secondary" size="l" @click="getRandWord()"> Click Me to get word! </b-button>
        </div>
        <div id="restart">
            <b-button :disabled=!this.playing variant="secondary" size="l" @click="Playagain()"> Restart! </b-button>
        </div>
        <div id="link">
            <router-link to="/customize" tag="b-button"  variant="secondary" size="l">Return to Break Page</router-link>
        </div>
    </div>
    <h1 id="wordBlanks">
        
    </h1>
</div>
</body>
</template>

<script>

export default {
    name: 'hangman',
    data() {
        return {
            numWrong: 0,
            clicked: false,
            currGuess: '',
            currWord: '',
            wordIndexed: '',
            blankString: '',
            beenCalled: false,
            playing: false,
            hangmen: [
                { url: require('../assets/hangman/hangman_0.png') },
                { url: require('../assets/hangman/hangman_1.png') },
                { url: require('../assets/hangman/hangman_2.png') },
                { url: require('../assets/hangman/hangman_3.png') },
                { url: require('../assets/hangman/hangman_4.png') },
                { url: require('../assets/hangman/hangman_5.png') },
                { url: require('../assets/hangman/hangman_6.png') },
                { url: require('../assets/hangman/hangman_7.png') },
                { url: require('../assets/hangman/hangman_8.png') },
                { url: require('../assets/hangman/hangman_9.png') },
                { url: require('../assets/hangman/hangman_10.png') },
                { url: require('../assets/hangman/hangman_11.png') },
            ],
            words: [
                "SNOWMAN",
                "ICICLE",
                "ICE SKATING",
                "GLOVES",
                "WINTER BOOTS",
                "CHRISTMAS TREE",
                "HOLIDAY FUN",
                "THE GRINCH",
                "HAPPY HOLIDAYS",
                "FIGGY PUDDING",
                "SNOWBALL FIGHT",
                "PENGUINS",
                "POLAR BEARS",
                "SNOW STORM",
                "SLEDDING",
                "CHESTNUTS ROASTING ON AN OPEN FIRE",
                "BABY IT'S COLD OUTSIDE",
                "MARIAH CARREY",
                "STOCKINGS",
                "RUDOLPH",
                "DASHER",
                "DANCER",
                "PRANCER",
                "VIXEN",
                "COMET",
                "CUPID",
                "DONNER",
                "BLITZEN",
                "A PARTIRIDGE IN A PEAR TREE",
                "TWO TURTLE DOVES",
                "THREE FRENCH HENS",
                "FOUR CALLING BIRDS",
                "FIVE GOLDEN RINGS",
                "SIX GEESE A LAYING",
                "SEVEN SWANS A SWIMMING",
                "EIGHT MAIDS A MILKING",
                "NINE LADIES DANCING",
                "TEN LORDS A LEAPING",
                "ELEVEN PIPERS PIPING",
                "TWELVE DRUMMERS DRUMMING",
                "THE TEAM THE TEAM THE TEAM",
                "UNIVERSITY OF MICHIGAN",
                "UGLI",
                "HALLMARK MOVIES",
                "SNOWBALL FIGHT",
                "JACK FROST",
                "SNOWBOARDING",
                "SKIING",
                "HANUKKAH",
                "KWANZAA",
                "DIWALI",
                "MISTLETOE",
                "ARCTIC FOX",
                "HAPPY FEET",
                "FIREPLACE",
                "GINGERBREAD MAN",
                "HIBERNATE",
                "DOG SLED",
                "CHILLY",
                "BLIZZARD",
                "BLANKET",
                "COLD SNAP",
                "COAT",
                "CHIMNEY",
                "DRAFTY",
                "EGGNOG",
                "EVERGREEN",
                "EARMUFFS",
                "FROSTBITTEN",
                "FROSTY",
                "FRIGID",
                "FRUITCAKE",
                "FIREWOORD",
                "FIREPLACE",
                "FLURRIES",
                "GLACIER",
                "HOT CHOCOLATE",
                "HAILSTONE",
                "ICE",
                "ICEBERG",
                "ICE FISHING",
                "ICE SKATES",
                "ICE STORM",
                "LAKE EFFECT",
                "MITTENS",
                "MICHIGAN WINTERS",
                "POLAR VORTEX",
                "PINECONE",
                "REINDEER",
                "SNOWPLOW",
                "SNOWFLAKE",
                "SUGARPLUM",
                "NUTCRACKER",
                "SNOW SHOVEL",
                "SNOW SHOE",
                "SOLSTICE",
                "TOBOGGAN",
                "TURTLENECK",
                "WHITEOUT",
                "WIND CHILL",
                "WINTER",
            ],
            guessedLetters: [],
            lettersNotGuessed: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P",
            "Q","R","S","T","U","V","W","X","Y","Z"]
        }
    },
    methods: {
        handleGuessedButton(guess) {
            if (this.currWord != '') {
                this.currGuess = guess;
                // Add first guessed letter to guessedLetters
                if (this.guessedLetters.length == 0) {
                    this.guessedLetters.push(this.currGuess);
                    this.seeIfCorrectGuess(guess);
                }
                // Not for first guessed letter
                else {
                    var alreadyGuessed = false;
                    for (var i = 0; i < this.guessedLetters.length; i++) {
                        //check to see if guess is in list of already guessed
                        if (this.currGuess == this.guessedLetters[i]) {
                            alreadyGuessed = true;
                            alert("You already have guessed this letter");
                        }
                    }
                    // if not in list of already guessed add and change button color
                    if (alreadyGuessed == false) {
                        this.guessedLetters.push(this.currGuess);
                        this.seeIfCorrectGuess(guess);
                    }
                }
            }
        },
        seeIfCorrectGuess(guess) {
            var correct = false;
            for (var i = 0; i < this.currWord.length; i++) {
                if (guess == this.currWord[i]) {
                    document.getElementById(guess).style.background = 'green';
                    this.updateBlankString(guess);
                    correct = true;
                    break;
                }
            }
            if (correct == false) {
                this.numWrong += 1;
                document.getElementById(guess).style.background = 'red';
                setTimeout(() => {this.checkIfWin(); }, 1000);
            }
        },
        updateBlankString(guess) {
            for (var i = 0; i < this.wordIndexed.length; i++) {
                if (guess == this.wordIndexed[i]) {
                    this.blankString = this.setCharAt(this.blankString, i, guess);
                }
            }
            this.setWord(this.blankString);
            setTimeout(() => {this.checkIfWin(); }, 1000);
        },
        checkIfWin() {
            if (this.beenCalled == false) {
                if (this.blankString == this.wordIndexed) {
                    this.beenCalled = true;
                    alert("Congrats you won! Now would be a good time to go study again!");
                    this.Playagain();
                }
                else if (this.numWrong == 11) {
                    this.beenCalled = true;
                    alert("You lost, the word was " + this.currWord + "! Maybe you should study some more now.");
                    this.Playagain();
                }
            }
        },
        setCharAt(str, index, chr) {
            return str.substring(0, index) + chr + str.substring(index + 1);
        },
        getRandWord() {
            this.playing = true;
            if (this.currWord == '') {
                var min = 0;
                var max = 99;
                var randNum = Math.floor(Math.random() * max) + min;
                this.currWord = this.words[randNum];
                this.setBlankString(this.currWord);
            }
        },
        setBlankString(word) {
            for (var i = 0; i < word.length; i++) {
                if (word[i] >= 'A' && word[i] <= 'Z') {
                    this.blankString += '_ ';
                    this.wordIndexed += word[i] + ' ';
                }
                else if (word[i] == ' ') {
                    this.blankString += '<br />';
                    this.wordIndexed += '<br />';
                }
                else {
                    this.blankString += word[i];
                    this.wordIndexed += word[i];
                }
            }
            document.getElementById('wordBlanks').innerHTML += this.blankString;
        },
        disableButton() {
            document.getElementById("word").addClass("disabled");
        },
        Playagain() {
            this.playing = false;
            window.location.reload(false);
        },
        setWord(toAdd) {
            document.getElementById('wordBlanks').innerHTML = toAdd;
        }
    }

}
</script>

<style scoped>
body {
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: rgb(221, 244, 255);
}
.hangmans {
    position: relative;
    float: right;
    width: 600px;
    height: 600px;
    z-index: 1;
}
#guessed {
    background-color: red;
}
#buttons {
    position: absolute;
    left: 3%;
    width: 75%;
    padding-right: 1000px;
    max-width: 25rem;
    padding: 1em;
    margin: 1em auto;
    border: 5px solid black;
    background-color: white;
    box-shadow: 8px 8px 8px 8px #888888;
}

#wordBlanks {
    position: absolute;
    left: 40px;
    top: 400px;
    width: 450px;
}

#getword{
    position: absolute;
    top: 3%;
    left: 5%;
}
#restart{
    position: absolute;
    top: 3%;
    left: 23%;
}
#link{
    position: absolute;
    top: 93%;
    left: 44%;
}
#imagediv {
    position: absolute;
    top: 5%;
    left: 55%;

}

</style>