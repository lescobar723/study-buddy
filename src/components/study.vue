<!--speech bubble code from -->
<template>
<body>
    <navbar></navbar>

    <div id="character_div">
        <div id="speech-bubble">
            Keep up the good work! Remember you get points for completing a task!
        </div>

        <img src='../assets/character_1.png' id="character" />
        <img :src="hats[curr_hat_index].url" class="customization" />
        <img :src="masks[curr_mask_index].url" class="customization" />
        <img :src="scarves[curr_scarf_index].url" class="customization" />
        <img :src="gloves[curr_glove_index].url" class="customization" />
    </div>
    
    <div id="timer">
        <circular-count-down-timer class="time"
                :initial-value="initialValue"
                :stroke-width="5"
                :seconds-stroke-color="'#BBDEFB'"
                :minutes-stroke-color="'#BBDEFB'"
                :hours-stroke-color="'#BBDEFB'"
                :underneath-stroke-color="'#1976D2'"
                :seconds-fill-color="'#90CAF9'"
                :minutes-fill-color="'#64B5F6'"
                :hours-fill-color="'#42A5F5'"
                :size="200"
                :padding="4"
                :hour-label="'Hours'"
                :minute-label="'Minutes'"
                :second-label="'Seconds'"
                :show-second="true"
                :show-minute="true"
                :show-hour="true"
                :show-negatives="false"
                :notify-every="'minute'"
                :paused="isPaused"
                @finish="finished"
                @update="updated"
                ref="countdown"
        ></circular-count-down-timer>
    </div>
    <div id="tasks">
        <h1>Upcoming Assignments</h1>
        <p> (These are the five assignments with the nearest due date)</p>
        <div id= "grid_tasks">
            <table style="width:98%">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Assignment Name</th>
                        <th>Due Date</th>
                        <th>Assignment Time</th>
                        <th>Is Exam?</th>
                        <th>Completed?</th>
                    </tr>
                </thead>
                <!--ADD INFO FROM DATABASE IN HERE-->
                <tbody v-for="task in tasks.slice(0,5)" :key="task.id">
                    <tr :style="task.backgroundColor">
                        <td>{{ task.className }}</td>
                        <td>{{ task.assignmentName }}</td>
                        <td>{{ task.dueDate }}</td>
                        <td>{{ task.timeNeeded }} Hours</td>
                        <td>{{ task.isExam }} </td>
                        <td><input type="checkbox" @click="completedTask(task.id)"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div id="bottomButtonsDiv">
        <b-button class="mr-1" variant="dark" id="Break BTN" v-on:click="goToGames">Take Break Early</b-button>
        <b-button class="mr-1" variant="dark" v-if="!isPaused" id="pauseBTN" v-on:click="pauseClock">Pause Clock</b-button>
        <b-button class="mr-1" variant="dark" v-if="isPaused" id="resumeBTN" v-on:click="pauseClock">Resume Clock</b-button>
        <b-button class="mr-1" variant="dark" id="add btn" v-on:click="addTime">Add 5 Minutes</b-button>
        <b-button id="edit btn" variant="dark" v-on:click="EditTime">Edit Time</b-button>
    </div>
    <b-modal ref="my-modal" id="studyTime" ok-only title="Study Time" @ok="setTime()">
        <div>
            <p>Set Study Time:
				<input type="number"
					id="studyTimeRN"
					class="input"
					v-model="timerTime"
					placeholder="Study Time (Hours)"
                    min="0"
                >
            </p>
        </div>
    </b-modal>
</body>
</template>

<script>
import navbar from './navbar.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { db } from '../firestore/db'

export default {
    name: 'study',
    components: {
        navbar
    },
    data() {
        return {
            initialValue: 3600,
            timeStudying: 0,
            isPaused: false,
            tasks: [],
            timerTime: null,
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
        if (localStorage.getItem('currentTime') === null || (localStorage.getItem('currentTime') !== null && localStorage.getItem('currentTime') == 0)) {
            this.$refs['my-modal'].show();
        }
        else {
            this.$refs.countdown.value = localStorage.getItem('currentTime');
        }
    },
	created() {
        // Bind "tasks" data to "tasks" subcollection of current user
        this.$bind('tasks', db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').orderBy('dueDate')).then(tasks => {
            this.tasks === tasks;
        });

        this.getCustomizations();
    },
    methods: {
        EditTime(){
            this.$refs['my-modal'].show();
        },
        setTime(){
            if(!this.timerTime){
                alert("Since you didn't select a time it will default to one hour.");
            }
            else{
                this.$refs.countdown.value = this.timerTime * 60 * 60;
                this.startTime = this.$refs.countdown.value;
                this.timerTime = null;
                document.getElementById("studyTimeRN").value = '';

                localStorage.setItem('currentTime', this.timerTime * 60 * 60);
            }
        },
		async completedTask(id) {
            // Add task to completed tasks collection in database
			var docRef = db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(id);
			await docRef.get().then(async function(doc) {
				db.collection('users').doc(localStorage.getItem('currentUser')).collection('completedTasks').add(doc.data());
            });
            
            // Delete task from current tasks collection in database
			db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(id).delete();

			// Get user's current total points
			var userRef = db.collection("users").doc(localStorage.getItem('currentUser'));
            var currentPointTotal = 0;
            await userRef.get().then(function(doc) {
				currentPointTotal = doc.get('point_total');
			});
			
			// Update point total in database
			var newPoints = 10;
            db.collection('users').doc(localStorage.getItem('currentUser')).update({
                point_total: (currentPointTotal + newPoints)
			});
        },
        addTime() {
            this.$refs.countdown.value += 300;
        },
        pauseClock() {
            this.$refs.countdown.paused = !this.$refs.countdown.paused;
            this.isPaused = this.$refs.countdown.paused;
            //this.$refs.countdown.paused = true;
        },
        goToGames() {
            this.$router.push('/customize');
        },
        finished() {
            var r=confirm("We suggest you take a break!");
            if (r==true) {
                // Route to games page
                this.$router.push('/customize');
            }
            else {
                this.$refs.countdown.value = 3600;
                this.$refs['my-modal'].show();
            }
        },
        // update Points every Hour
        async updatePoints() {
            // Get user's current total points
            var userRef = db.collection("users").doc(localStorage.getItem('currentUser'));
            var currentPointTotal = 0;
            await userRef.get().then(function(doc) {
                currentPointTotal = doc.get('point_total');
            });
            var newPoints = 5;
            currentPointTotal = currentPointTotal + newPoints;
            // Update point total in databas
            db.collection('users').doc(localStorage.getItem('currentUser')).update({
                point_total: currentPointTotal
            });
        },
        updated() {
            /*
            // updates every second
            setInterval(() => {
                console.log("HERE")
                this.timeStudying += 1000; 
                console.log(this.timeStudying)
                // if an hour passed, then give user 5 points
                if(this.timeStudying == 3600000){
                    this.updatePoints();
                    this.timeStudying = 0;
                }
            }, 1000); */
        },
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
    },
    beforeRouteLeave(to, from, next) {
        // To get around using these (:
        console.log(to);
        console.log(from);
        // Set current time in local storage before navigating away
        localStorage.setItem('currentTime', this.$refs.countdown.value);

        // Route to desired page
        next();
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
#tasks{
  width: 100%;
  max-width: 70rem;
  padding: 1em;
  margin: 1em auto;
  border: 5px solid black;
  background-color: white;
  box-shadow: 8px 8px 8px 8px #888888;
}
#grid_tasks {
  overflow-y: scroll;
}
#grid_tasks thead th {
  position: sticky;
  top: 0;
}

table, th, td {
  border: 1px solid black;
  padding: 5px;
}

#bottomButtonsDiv {
    position: absolute;
    bottom: 10px;
    width: 99%;
}

#character_div {
    position: absolute;
    left: 12%;
    height: 275px;
    width: 500px;
}
#character {
    position: absolute;
    left: 0;
    width: 220px;
    height: 220px;
    z-index: 1;
}
.customization {
    position: absolute;
    overflow: hidden;
    left: 0;
    width: 220px;
    height: 220px;
    z-index: 1;
}

#speech-bubble {
    position: absolute;
    left: -25%;
    top: 5%;
    background:black;
    width: 150px;
    height: 180px;
    border-radius: .4em;
    font-size: 20px;
    color: white;
    z-index: 0;
    overflow: hidden;
}

#speech-bubble:after {
    content: '';
    position: absolute;
    right: 0;
    top: 25%;
    width: 0;
    height: 0;
    border: 48px solid transparent;
    border-left-color: black;
    border-right: 0;
    border-bottom: 0;
    margin-top: -24px;
    margin-right: -48px;
}
.time {
    z-index: 300;
    position: relative;
    overflow: hidden;
}
</style>