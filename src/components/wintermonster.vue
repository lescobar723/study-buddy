<template>
<div class="body">
    <div class="welcome">
        <h1>Welcome to Winter Monster Attack!</h1>
    </div>

    <div class = "instr">
        Fight the Winter Monster and help save winter!
    </div>

    <div class="return">
        <br>
        <router-link to="/customize" tag="b-button">Return to Break Page</router-link>
    </div>

    <section class='grid'>
        <div class="player-container">
            <div class="player you">
                <div class= "ugh">
                    <img class='fix' src='../assets/character_8bit.png' style='height: 120px'/>
                    <div v-if=this.glow class='heart'> <img src='../assets/health.gif' style='height: 100px'/> </div>
                    <div v-if=this.throw class='extraAction'> <img src='../assets/moving_snowball.gif' style='height: 100px'/> </div>
                </div>
                <h1>YOU</h1>
                <div class="health">
                    <div class="bar" :style="{width: health_me < 0 ? 0 : health_me + '%'}"></div>
                    <p>
                        <img src='../assets/heart.png' style="height: 25px" />
                        {{ health_me }} / 100
                    </p>
                </div>
            </div>
            <div class="player enemy">
                <div>
                    <div v-if=this.badThrow class='extraOpposite'><img src='../assets/moving_snowball_mirrored.gif' style='height: 100px'/></div>
                    <div v-if=this.bigThrow class='snowStorm'> <img src='../assets/blizzard.gif' style='height: 100px'/> </div>
                    <img src='../assets/badguy_8bit.png' style='height: 120px'/>
                </div>
                <h1>WINTER MONSTER</h1>
                <div class="health">
                    <div class="bar" :style="{width: health_enemy < 0 ? 0 : health_enemy + '%'}"></div>
                <p>
                    <img src='../assets/heart.png' style="height: 25px" />
                    {{ health_enemy }} / 100
                </p>
                </div>
            </div>
        </div>
        <div class="row">
            <b-button class="start-over" v-if="!playing" @click="start">START NEW GAME</b-button>
            <div class="butt" v-if="playing">
                <b-button :disabled=this.varia @click="attack(10)" class="indiv">Throw Snowball (Basic Attack)</b-button>
                <b-button :disabled=this.varia @click="attack(15)" class="indiv">BLIZZARD (Special Attack)</b-button>
                <b-button :disabled=this.varia @click="heal" class="indiv">Warm Up (Heal)</b-button>
                <b-button :disabled=this.varia @click="flee" class="indiv">Go Back Inside (Quit)</b-button>
            </div>
        </div>
        <!-- Alerts player of Monster's attack -->
    </section>
    <div class = "empty"></div>
    <div class="messages" v-if="att">
        {{ dict.actor }} {{ dict.message }} {{ dict. dmg }}HP
    </div>
    <div class="mess" v-if="uhoh">
        {{ dict.actor }} {{ dict.message }} {{ dict. dmg }}HP
    </div>
</div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

function random(highest) {
    return Math.floor(Math.random() * highest) + 1;
}

export default {
    name: 'wintermonster',
    data(){
        return{
            playing: false,
            att: false,
            uhoh: false,
            damage: 0,
            varia: false,
            health_me: 100,
            health_enemy: 100,
            glow: false,
            throw: false,
            bigThrow: false,
            badThrow: false,
            dict: {
                actor: '',
                message: '',
                dmg: 0,
            },
        }
    },
    methods: {
        attack: function(highest) {
            if (highest > 10) {
                this.bigThrow = true;
            } else {
                this.throw = true;
            }
            setTimeout(this.resetYou, 1500);
            this.varia = true;
            setTimeout(this.isDisabled, 3000);
            this.uhoh = false;
            var damage = random(highest);
            this.health_enemy -= damage;
            if(this.health_enemy < 0) this.health_enemy = 0;
            this.att = true;
            this.dict['dmg'] = damage;
            this.dict['actor'] = "YOU";
            this.dict['message'] = " hit Winter Monster for ";
            setTimeout(this.checkState, 500);
            if (this.health_enemy > 0){
                setTimeout(this.monsterAttack, 2000);
            }
        },
        heal: function() {
            this.varia = true;
            this.glow = true;
            setTimeout(this.resetYou, 1500);
            setTimeout(this.isDisabled, 3000);
            this.uhoh = false;
            var healAmount = random(10);
            this.health_me += healAmount;
            if(this.health_me > 100) this.health_me = 100;
            this.att = true;
            this.dict['dmg'] = healAmount;
            this.dict['actor'] = "YOU";
            this.dict['message'] = " healed yourself for "
            setTimeout(this.monsterAttack, 2000);
        },
        monsterAttack() {
            this.att = false;
            this.badThrow = true;
            setTimeout(this.resetMonster, 1500);
            var damage = random(12);
            this.health_me -= damage;
            if(this.health_me < 0) this.health_me = 0;
            this.uhoh = true;
            this.dict['dmg'] = damage;
            this.dict['actor'] = "Winter Monster";
            this.dict['message'] = " hit YOU for "
            setTimeout(this.checkState, 500);
        },
        flee: function() {
            this.playing = false;
            alert("You retreated! Let's go back to the break page now.");
            this.leaveGame();
        },
        checkState: function() {
            if(this.health_me <= 0) {
                this.playing = false;
                alert("You lost! Let's go back to the break page now.");
                this.leaveGame();
            } else if(this.health_enemy <= 0) {
                this.playing = false;
                alert("You won! Let's go back to the break page now.");
                this.leaveGame();
            }
        },
        start: function() {
            this.playing = true;
            this.updates = [];
            this.health_me = 100;
            this.health_enemy = 100;
        },
        leaveGame: function() {
            this.$router.push('/customize');
        },
        reset: function() {
            this.monsterattack = false;
            this.playerattack = false;
            this.playerheal = false;
        },
        isDisabled: function() {
            this.varia = !this.varia;
        },
        resetYou: function() {
            this.glow = false;
            this.bigThrow = false;
            this.throw = false;
        },
        resetMonster: function() {
            this.badThrow = false;
        },
        attFalse: function() {
            this.att = false;
        }
    }
}
</script>

<style scoped>
html {
    background-color: rgb(221, 244, 255);
}
.body{
    background-color: rgb(221, 244, 255);
}
section{
    padding-top: 50px;
    margin: 0 auto;
    width: 80%;
}
.you{
    width: 50%;
    float: left;
}
.enemy{
    float: right;
    width: 50%;
}
.row{
    padding-top: 50px;
}
.start-over{
    margin: 0 auto;
    display: block;
}
.player {
  color: white;
  display: inline-block;
  text-align: center;
  margin: 0;
  width: 50%;
} 
.you { color: black; }
.enemy { color: black; float: right;}
.health {
    margin: 0 auto;
    height: 20%;
    width: 80%;
    background: lightgray;
    position: relative;
    display: block;
    overflow: hidden;
    color: black;
}
.bar {
      height: 80%;
      width: 100%;
      padding: 0.5em 0;
      background: green;
      transition: width 500ms;
}
.messages {
    padding: 5%;
    width: 40%;
    margin: auto;
    background: lightpink;
    font-size: 125%;
    color: black;
    font-weight: bolder;
    text-align: center;
    border-style: solid;
    border-color: black;
    border-width: 3%;
    transition: 1s;
    border-radius: 30px;
}
.mess {
    padding: 5%;
    width: 40%;
    margin: auto;
    background: lightskyblue;
    font-size: 125%;
    color: black;
    font-weight: bolder;
    text-align: center;
    border-style: solid;
    border-color: black;
    border-width: 3%;
    transition: 1s;
    border-radius: 30px;
}
.empty {
    padding-top: 5%;
}
.butt {
    text-align: center;
    padding: 2%;
    width: 100%;
    border: solid;
    border-width: 2%;
    background: white;
    border-radius: 25px;
}
.indiv {
    margin: 1%;
    width: 23%;
    height: 70%;
}
.extraAction {
    position: absolute;
    top: 10%;
    left: 58%;
    transition: 1s;
}
.extraOpposite {
    position: absolute;
    left: 62%;
    transition: 1s;
}
.heart {
    position: absolute;
    left: 44%;
    top: 0%;
    transition: 1s;
}
.welcome {
    padding-top: 10px;
}
.ugh {
    position: relative;
}
.snowStorm {
    position: absolute;
    left: 68%;
    top: 18%;
    transition: 1s;
}

</style>