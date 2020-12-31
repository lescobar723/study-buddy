<template>
<body>
    <navbar></navbar>

    <div id="timer">
        <h2>Return to studying in</h2>
        <circular-count-down-timer
            :initial-value="intialValue"
            :show-hour="false"
            :size="125"
            :padding="4"
            :seconds-stroke-color="'#BBDEFB'"
            :minutes-stroke-color="'#BBDEFB'"
            :hours-stroke-color="'#BBDEFB'"
            :underneath-stroke-color="'#1976D2'"
            :seconds-fill-color="'#90CAF9'"
            :minutes-fill-color="'#64B5F6'"
            :hours-fill-color="'#42A5F5'"
            @finish="finished"
            @update="update"
            ref="countdown"
        ></circular-count-down-timer>

        <!-- <b-button class="big-button" variant="warning" @click="routeBack">Go back to studying now</b-button> -->
        
    </div>
    <div id="break-container">
        <div id="left" class='con'>
            <h2>Select game to play</h2>
            <router-link to="/winterMemory" tag="b-button" class="big-button"> Play "Winter Memory Matching!"</router-link>
            <router-link to="/hangman" tag="b-button" class="big-button"> Play "Hangman!"</router-link>
            <router-link to="/wintermonster" tag="b-button" class="big-button">Play "Winter Monster Attack!"</router-link>
        </div>
        <div id="right" class='con'>
            <h2>Customize Character</h2>

            <div id="character_div">
                <img src='../assets/character_1.png' id="character" />
                <img :src="hats[curr_hat_index].url" class="customization" />
                <img :src="masks[curr_mask_index].url" class="customization" />
                <img :src="scarves[curr_scarf_index].url" class="customization" />
                <img :src="gloves[curr_glove_index].url" class="customization" />
            </div>

            <div id="selectors_div">
                <div class="selectors">
                    <b-button class="selector_buttons" type="button" :disabled=!this.hat_left @click="changeHat('down')">Back</b-button>
                    <div style="flex-grow: 2">
                        - Hats -
                    </div>
                    <b-button class="selector_buttons, mr-1" type="button" :disabled=!this.hat_right @click="changeHat('up')">Next</b-button>
                    <b-button class="selector_buttons" type="button" :disabled=!this.hat_saved variant="success" @click="saveHat(curr_hat_index)">Save</b-button>
                    <div class='gif1' v-if=this.giffy1><img src='../assets/checkmark.gif' style='height: 40px'/></div>
                </div>
                <div class="selectors">
                    <b-button class="selector_buttons" type="button" :disabled=!this.mask_left @click="changeMask('down')">Back</b-button>
                    <div style="flex-grow: 4">
                        - Masks -
                    </div>
                    <b-button class="selector_buttons, mr-1" type="button" :disabled=!this.mask_right @click="changeMask('up')">Next</b-button>
                    <b-button class="selector_buttons" type="button" :disabled=!this.mask_saved variant="success" @click="saveMask(curr_mask_index)">Save</b-button>
                    <div class='gif2' v-if=this.giffy2><img src='../assets/checkmark.gif' style='height: 40px'/></div>
                </div>
                <div class="selectors">
                    <b-button class="selector_buttons" type="button" :disabled=!this.scarves_left @click="changeScarf('down')">Back</b-button>
                    <div style="flex-grow: 4">
                        - Scarves -
                    </div>
                    <b-button class="selector_buttons, mr-1" type="button" :disabled=!this.scarves_right @click="changeScarf('up')">Next</b-button>
                    <b-button class="selector_buttons" type="button" :disabled=!this.scarf_saved variant="success" @click="saveScarf(curr_scarf_index)">Save</b-button>
                    <div class='gif3' v-if=this.giffy3><img src='../assets/checkmark.gif' style='height: 40px'/></div>
                </div>
                <div class="selectors">
                    <b-button class="selector_buttons" type="button" :disabled=!this.gloves_left @click="changeGloves('down')">Back</b-button>
                    <div style="flex-grow: 4">
                        - Gloves -
                    </div>
                    <b-button class="selector_buttons, mr-1" type="button" :disabled=!this.gloves_right @click="changeGloves('up')">Next</b-button>
                    <b-button class="selector_buttons" type="button" :disabled=!this.glove_saved variant="success" @click="saveGloves(curr_glove_index)">Save</b-button>
                    <div class='gif4' v-if=this.giffy4><img src='../assets/checkmark.gif' style='height: 40px'/></div>
                </div>
            </div>
        </div>
    </div>
</body>
</template>

<script>
import navbar from './navbar.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { db } from '../firestore/db'

export default {
    name: 'customize',
    components: {
        navbar
    },
    data() {
        return {
            mask_left: true,
            mask_right: true,
            hat_left: true,
            hat_right: true,
            gloves_left: false,
            gloves_right: true,
            scarves_left: false,
            scarves_right: true,
            mask_saved: true,
            hat_saved: true,
            glove_saved: true,
            scarf_saved: true,
            curr_mask_saved: 0,
            curr_hat_saved: 0,
            curr_glove_saved: 0,
            curr_scarf_saved: 0,
            giffy1: false,
            giffy2: false,
            giffy3: false,
            giffy4: false,
            unlockedHats: [],
            unlockedMasks: [],
            unlockedScarves: [],
            unlockedGloves: [],
            curr_hat_index: 0,
            curr_mask_index: 0,
            curr_scarf_index: 0,
            curr_glove_index: 0,
            hats: [
                { url: require('../assets/default.png') },
                { url: require('../assets/hats/beanie_green.png') },
                { url: require('../assets/hats/beanie_purple.png') },
                { url: require('../assets/hats/beanie_red.png') },
                { url: require('../assets/hats/bear_ears.png') },
                { url: require('../assets/hats/bunny_ears.png') },
                { url: require('../assets/hats/cat_ears.png') },
                { url: require('../assets/hats/sleepy_hat_blue.png') },
                { url: require('../assets/hats/sleepy_hat_green.png') },
                { url: require('../assets/hats/sleepy_hat_orange.png') },
                { url: require('../assets/hats/sleepy_hat_purple.png') },
                { url: require('../assets/hats/sleepy_hat_red.png') },
                { url: require('../assets/hats/sleepy_hat_yellow.png') },
            ],
            masks: [
                { url: require('../assets/default.png') },
                { url: require('../assets/masks/mask_blue.png') },
                { url: require('../assets/masks/mask_green.png') },
                { url: require('../assets/masks/mask_grey.png') },
                { url: require('../assets/masks/mask_pink.png') },
                { url: require('../assets/masks/mask_yellow.png') },
            ],
            scarves: [
                { url: require('../assets/default.png') },
                { url: require('../assets/scarves/scarf_blue_1.png') },
                { url: require('../assets/scarves/scarf_blue_2.png') },
                { url: require('../assets/scarves/scarf_green_1.png') },
                { url: require('../assets/scarves/scarf_green_2.png') },
                { url: require('../assets/scarves/scarf_orange_1.png') },
                { url: require('../assets/scarves/scarf_pink.png') },
                { url: require('../assets/scarves/scarf_red.png') },
                { url: require('../assets/scarves/scarf_yellow_1.png') },
            ],
            gloves: [
                { url: require('../assets/default.png') },
                { url: require('../assets/gloves/gloves_blue.png') },
                { url: require('../assets/gloves/gloves_green.png') },
                { url: require('../assets/gloves/gloves_lightblue.png') },
                { url: require('../assets/gloves/gloves_orange.png') },
                { url: require('../assets/gloves/gloves_pink.png') },
                { url: require('../assets/gloves/gloves_purple.png') },
                { url: require('../assets/gloves/gloves_red.png') },
                { url: require('../assets/gloves/gloves_yellow.png') },
            ],
        }
    },
    mounted() {
        // If timer has not yet been set or timer was set previously but has reached 0

        console.log(localStorage.getItem('currentBreakTime'));


        if (localStorage.getItem('currentBreakTime') === null || (localStorage.getItem('currentBreakTime') !== null && localStorage.getItem('currentBreakTime') == 0)) {
            this.$refs.countdown.value = 300;
        }
        else {
            this.$refs.countdown.value = localStorage.getItem('currentBreakTime');
        }
    },
    created() {
        setTimeout(this.initialButtons, 500);
        this.getCustomizations();
    },
    methods: {
        finished() {
            localStorage.setItem('currentBreakTime', 0);
            alert("Time to return to studying!");
            this.$router.push('/study');
        },
        // Get saved character customizations from database
        getCustomizations() {
            var userRef = db.collection("users").doc(localStorage.getItem('currentUser'));
            var self = this;
            userRef.get().then(function(doc) {
                self.curr_hat_index = doc.get('hat_index');
                self.curr_mask_index = doc.get('mask_index');
                self.curr_scarf_index = doc.get('scarf_index');
                self.curr_glove_index = doc.get('glove_index');
            });
        },
        initialButtons() {
            if (this.curr_hat_index == 0) {
                this.hat_left = false;
            } else {
                this.hat_left = true;
            }
            if (this.curr_hat_index == 12) {
                this.hat_right = false;
            } else {
                this.hat_right = true;
            }
            if (this.curr_mask_index == 0) {
                this.mask_left = false;
            } else {
                this.mask_left = true;
            }
            if (this.curr_mask_index == 5) {
                this.mask_right = false;
            } else {
                this.mask_right = true;
            }
            if (this.curr_scarf_index == 0) {
                this.scarves_left = false;
            } else {
                this.scarves_left = true;
            }
            if (this.curr_scarf_index == 8) {
                this.scarves_right = false;
            } else {
                this.scarves_right = true;
            }
            if (this.curr_glove_index == 0) {
                this.gloves_left = false;
            } else {
                this.gloves_left = true;
            }
            if (this.curr_glove_index == 8) {
                this.gloves_right = false;
            } else {
                this.gloves_right = true;
            }
            this.scarf_saved = false;
            this.hat_saved = false;
            this.mask_saved = false;
            this.glove_saved = false;
            this.curr_mask_saved = this.curr_mask_index;
            this.curr_hat_saved = this.curr_hat_index;
            this.curr_glove_saved = this.curr_glove_index;
            this.curr_scarf_saved = this.curr_scarf_index;
        },
        getSnowBallFight() {
            let routeData = this.$router.resolve({name: '.src/snowballFight'});
            window.open(routeData.href);
        },
        changeHat(direction) {
            let tempUp = this.curr_hat_index + 1;
            let tempDown = this.curr_hat_index - 1;
            if (direction == 'up' && this.curr_hat_index < 12) {
                if (tempUp == this.curr_hat_saved) {
                    this.hat_saved = false;
                } else {
                    this.hat_saved = true;
                }
                this.hat_left = true;
                if (this.curr_hat_index == 11) {
                    this.hat_right = false;
                }
                this.$set(this.curr_hat_index, this.curr_hat_index += 1);
            }
            else if (direction == 'down' && this.curr_hat_index > 0) {
                if (tempDown == this.curr_hat_saved) {
                    this.hat_saved = false;
                } else {
                    this.hat_saved = true;
                }
                this.hat_right = true;
                if (this.curr_hat_index == 1) {
                    this.hat_left = false;
                }
                this.$set(this.curr_hat_index, this.curr_hat_index -= 1);
            }
        },
        changeMask(direction) {
            let tempUp = this.curr_mask_index + 1;
            let tempDown = this.curr_mask_index - 1;
            if (direction == 'up' && this.curr_mask_index < 5) {
                if (tempUp == this.curr_mask_saved) {
                    this.mask_saved = false;
                } else {
                    this.mask_saved = true;
                }
                this.mask_left = true;
                if (this.curr_mask_index == 4) {
                    this.mask_right = false;
                }
                this.$set(this.curr_mask_index, this.curr_mask_index += 1);
            }
            else if (direction == 'down' && this.curr_mask_index > 0) {
                if (tempDown == this.curr_mask_saved) {
                    this.mask_saved = false;
                } else {
                    this.mask_saved = true;
                }
                this.mask_right = true;
                if (this.curr_mask_index == 1) {
                    this.mask_left = false;
                }
                this.$set(this.curr_mask_index, this.curr_mask_index -= 1);
            }
        },
        changeScarf(direction) {
            let tempUp = this.curr_scarf_index + 1;
            let tempDown = this.curr_scarf_index - 1;
            if (direction == 'up' && this.curr_scarf_index < 8) {
                if (tempUp == this.curr_scarf_saved) {
                    this.scarf_saved = false;
                } else {
                    this.scarf_saved = true;
                }
                this.scarves_left = true;
                if (this.curr_scarf_index == 7) {
                    this.scarves_right = false;
                }
                this.$set(this.curr_scarf_index, this.curr_scarf_index += 1);
            }
            else if (direction == 'down' && this.curr_scarf_index > 0) {
                if (tempDown == this.curr_scarf_saved) {
                    this.scarf_saved = false;
                } else {
                    this.scarf_saved = true;
                }
                this.scarves_right = true;
                if (this.curr_scarf_index == 1) {
                    this.scarves_left = false;
                }
                this.$set(this.curr_scarf_index, this.curr_scarf_index -= 1);
            }
        },
        changeGloves(direction) {
            let tempUp = this.curr_glove_index + 1;
            let tempDown = this.curr_glove_index - 1;
            if (direction == 'up' && this.curr_glove_index < 8) {
                if (tempUp == this.curr_glove_saved) {
                    this.glove_saved = false;
                } else {
                    this.glove_saved = true;
                }
                this.gloves_left = true;
                if (this.curr_glove_index == 7) {
                    this.gloves_right = false;
                }
                this.$set(this.curr_glove_index, this.curr_glove_index += 1);
            }
            else if (direction == 'down' && this.curr_glove_index > 0) {
                if (tempDown == this.curr_glove_saved) {
                    this.glove_saved = false;
                } else {
                    this.glove_saved = true;
                }
                this.gloves_right = true;
                if (this.curr_glove_index == 1) {
                    this.gloves_left = false;
                }
                this.$set(this.curr_glove_index, this.curr_glove_index -= 1);
            }
        },
        resetGif1() {
            this.giffy1 = false;
        },
        resetGif2() {
            this.giffy2 = false;
        },
        resetGif3() {
            this.giffy3 = false;
        },
        resetGif4() {
            this.giffy4 = false;
        },
        routeBack() {
            // Route to "Study" page
            this.$router.push('/study');
        },
        async saveHat(index) {
            // Get all current unlocked hats
            var snapshot = await db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedHats').get();
            snapshot.forEach(doc => {
                this.unlockedHats.push(doc.id);
            });

            var unlocked = false;
            for (var i = 0; i < this.unlockedHats.length; i++) {
                // If unlocked
                if (this.unlockedHats[i] == index) {
                    this.giffy1 = true;
                    this.curr_hat_saved = this.curr_hat_index;
                    this.hat_saved = false;
                    setTimeout(this.resetGif1, 900);
                    db.collection('users').doc(localStorage.getItem('currentUser')).update({
                        hat_index: this.curr_hat_index,
                    });
                    unlocked = true;
                }
            }
            // If not unlocked
            if (unlocked == false) {
                console.log("Not Unlocked");
                // confirm box to make sure they want to purchase it
                var button = confirm("This hat is not unlocked. Would you like to buy it for 10 points?");
                // if the user says yes to purchasing the hat
                if (button == true) {
                    // Get the users number of poinnts
                    var userRef = db.collection("users").doc(localStorage.getItem('currentUser'));
                    var currentPointTotal = 0;
                    await userRef.get().then(function(doc) {
                        currentPointTotal = doc.get('point_total');
                    });
                    // Make sure the user has enough points
                    if (currentPointTotal >= 10) {
                        currentPointTotal = currentPointTotal - 10;
                        this.giffy1 = true;
                        this.curr_hat_saved = this.curr_hat_index;
                        this.hat_saved = false;
                        setTimeout(this.resetGif1, 900);
                        // Update point total in database
                        db.collection('users').doc(localStorage.getItem('currentUser')).update({
                            point_total: currentPointTotal
                        });
                        // Add the hat to their unlocked hats
                        db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedHats').doc(String(index)).set({
                            unlocked: true
                        });

                        // Update current hat
                        db.collection('users').doc(localStorage.getItem('currentUser')).update({
                            hat_index: this.curr_hat_index,
                        });
                        alert("You bought a hat!");
                    }
                    else {
                        alert("Sorry, you don't have enough points.");
                    }
                } 
            }
        },
        async saveMask(index) {
            // Get all current unlocked masks
            var snapshot = await db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedMasks').get();
            snapshot.forEach(doc => {
                this.unlockedMasks.push(doc.id);
            });

            var unlocked = false;
            for (var i = 0; i < this.unlockedMasks.length; i++) {
                // If unlocked
                if (this.unlockedMasks[i] == index) {
                    this.giffy2 = true;
                    this.curr_mask_saved = this.curr_mask_index;
                    this.mask_saved = false;
                    setTimeout(this.resetGif2, 900);
                    db.collection('users').doc(localStorage.getItem('currentUser')).update({
                        mask_index: this.curr_mask_index,
                    });
                    unlocked = true;
                }
            }
            // If not unlocked
            if (unlocked == false) {
                console.log("Not Unlocked");
                // confirm box to make sure they want to purchase it
                var button = confirm("This hat is not unlocked. Would you like to buy it for 10 points?");
                // if the user says yes to purchasing the hat
                if (button == true) {
                    // Get the users number of poinnts
                    var userRef = db.collection("users").doc(localStorage.getItem('currentUser'));
                    var currentPointTotal = 0;
                    await userRef.get().then(function(doc) {
                        currentPointTotal = doc.get('point_total');
                    });
                    // Make sure the user has enough points
                    if (currentPointTotal >= 10) {
                        currentPointTotal = currentPointTotal - 10;
                        this.giffy2 = true;
                        this.curr_mask_saved = this.curr_mask_index;
                        this.mask_saved = false;
                        setTimeout(this.resetGif2, 900);
                        // Update point total in database
                        db.collection('users').doc(localStorage.getItem('currentUser')).update({
                            point_total: currentPointTotal
                        });
                        // Add the hat to their unlocked hats
                        db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedMasks').doc(String(index)).set({
                            unlocked: true
                        });

                        // Update current hat
                        db.collection('users').doc(localStorage.getItem('currentUser')).update({
                            mask_index: this.curr_mask_index,
                        });
                        alert("You bought a mask!");
                    }
                    else {
                        alert("Sorry, you don't have enough points.");
                    }
                } 
            }
        },
        async saveScarf(index) {
            // Get all current unlocked hats
            var snapshot = await db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedScarves').get();
            snapshot.forEach(doc => {
                this.unlockedScarves.push(doc.id);
            });

            var unlocked = false;
            for (var i = 0; i < this.unlockedScarves.length; i++) {
                // If unlocked
                if (this.unlockedScarves[i] == index) {
                    this.giffy3 = true;
                    this.curr_scarf_saved = this.curr_scarf_index;
                    this.scarf_saved = false;
                    setTimeout(this.resetGif3, 900);
                    db.collection('users').doc(localStorage.getItem('currentUser')).update({
                        scarf_index: this.curr_scarf_index,
                    });
                    unlocked = true;
                }
            }
            // If not unlocked
            if (unlocked == false) {
                console.log("Not Unlocked");
                // confirm box to make sure they want to purchase it
                var button = confirm("This hat is not unlocked. Would you like to buy it for 10 points?");
                // if the user says yes to purchasing the hat
                if (button == true) {
                    // Get the users number of poinnts
                    var userRef = db.collection("users").doc(localStorage.getItem('currentUser'));
                    var currentPointTotal = 0;
                    await userRef.get().then(function(doc) {
                        currentPointTotal = doc.get('point_total');
                    });
                    // Make sure the user has enough points
                    if (currentPointTotal >= 10) {
                        currentPointTotal = currentPointTotal - 10;
                        this.giffy3 = true;
                        this.curr_scarf_saved = this.curr_scarf_index;
                        this.scarf_saved = false;
                        setTimeout(this.resetGif3, 900);
                        // Update point total in database
                        db.collection('users').doc(localStorage.getItem('currentUser')).update({
                            point_total: currentPointTotal
                        });
                        // Add the hat to their unlocked hats
                        db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedScarves').doc(String(index)).set({
                            unlocked: true
                        });

                        // Update current hat
                        db.collection('users').doc(localStorage.getItem('currentUser')).update({
                            scarf_index: this.curr_scarf_index,
                        });
                        alert("You bought a scarf!");
                    }
                    else {
                        alert("Sorry, you don't have enough points.");
                    }
                }
            }
        },
        async saveGloves(index) {
            // Get all current unlocked hats
            var snapshot = await db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedGloves').get();
            snapshot.forEach(doc => {
                this.unlockedGloves.push(doc.id);
            });

            var unlocked = false;
            for (var i = 0; i < this.unlockedGloves.length; i++) {
                // If unlocked
                if (this.unlockedGloves[i] == index) {
                    this.giffy4 = true;
                    this.curr_glove_saved = this.curr_glove_index;
                    this.glove_saved = false;
                    setTimeout(this.resetGif4, 900);
                    db.collection('users').doc(localStorage.getItem('currentUser')).update({
                        glove_index: this.curr_glove_index
                    });
                    unlocked = true;
                }
            }
            // If not unlocked
            if (unlocked == false) {
                console.log("Not Unlocked");
                // confirm box to make sure they want to purchase it
                var button = confirm("This pair of gloves is not unlocked. Would you like to buy it for 10 points?");
                // if the user says yes to purchasing the hat
                if (button == true) {
                    // Get the users number of poinnts
                    var userRef = db.collection("users").doc(localStorage.getItem('currentUser'));
                    var currentPointTotal = 0;
                    await userRef.get().then(function(doc) {
                        currentPointTotal = doc.get('point_total');
                    });
                    // Make sure the user has enough points
                    if (currentPointTotal >= 10) {
                        currentPointTotal = currentPointTotal - 10;
                        this.giffy4 = true;
                        this.curr_glove_saved = this.curr_glove_index;
                        this.glove_saved = false;
                        setTimeout(this.resetGif4, 900);
                        // Update point total in database
                        db.collection('users').doc(localStorage.getItem('currentUser')).update({
                            point_total: currentPointTotal
                        });
                        // Add the hat to their unlocked hats
                        db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedGloves').doc(String(index)).set({
                            unlocked: true
                        });

                        // Update current hat
                        db.collection('users').doc(localStorage.getItem('currentUser')).update({
                            glove_index: this.curr_glove_index
                        });
                        alert("You bought a pair of gloves!");
                    }
                    else {
                        alert("Sorry, you don't have enough points.");
                    }
                } 
            }
        },   
    },
    beforeRouteLeave(to, from, next) {
        // To get around using this (:
        console.log(from);
       
        // If going to one of the games, keep previous break time 
        if (to.path == '/winterMemory' || to.path == '/hangman' || to.path == '/wintermonster') {
            localStorage.setItem('currentBreakTime', this.$refs.countdown.value);
        }
        // Else, reset break time
        else {
            localStorage.setItem('currentBreakTime', 0);
        }

        // Route to desired page
        next();
    }
}
</script>

<style scoped>

body {
    background-color: rgb(221, 244, 255);
    padding-bottom: 10%;
    height: 100%;
    margin: 0;
}

#left{
    display: flex;
    flex-direction: column;
    align-items: center;

}
#right{
    display: flex;
    flex-direction: column;

}
.big-button{
    height: 100px;
    width: 40%;
    margin-top: 20px;
}
.con{
    width: 40%;
    height: 540px;
    position: relative;
    vertical-align: top;
    display: inline-block;
    border: 5px solid black;
    background-color: white;
    box-shadow: 8px 8px 8px 8px #888888;
    margin-left: 110px;
}
#break-container {
    position: relative;
    display: flex;
    top: 0;
    font-size: 18px;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-left: 5px;
    padding-top: 20px;
}
#character_div {
    position: relative;
    left: 52%;
    transform: translateX(-50%);
    height: 275px;
    width: 275px;
}
#character {
    position: absolute;
    left: 0;
    width: 250px;
    height: 250px;
    z-index: 1;
}
.customization {
    position: absolute;
    left: 0;
    width: 250px;
    height: 250px;
    z-index: 1;
}

#selectors_div {
    position: relative;
    left: 52%;
    transform: translateX(-50%);
    height: 100px;
    width: 350px;
}
.selectors {
    width: 325px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 10px;
}
.selector_buttons {
    width: 75px;
}
.gif1 {
    position: absolute;
    left: 330px;
}
.gif2 {
    position: absolute;
    left: 330px;
}
.gif3 {
    position: absolute;
    left: 330px;
}
.gif4 {
    position: absolute;
    left: 330px;
}
</style>