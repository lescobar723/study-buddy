<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="primary">

        <b-navbar-brand>
            <h1 style="float: left">Study</h1>
            <img src='../assets/caterpillar.png' style="height: 50px; width: 50px" />
            <h1 style="float: right">Buddy</h1>
        </b-navbar-brand>
        
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to='/addtask'>Add Task</b-nav-item>
                <b-nav-item to='/tasklist'>Task List</b-nav-item> 
                <b-nav-item to='/study'>Study</b-nav-item>
                <b-nav-item to='/completedTasks'>Completed Tasks</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item>Total Points: {{ totalPoints }} </b-nav-item>

                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                    <em>User</em>
                </template>
                <b-dropdown-item href="/" @click="logout">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { db } from '../firestore/db'

export default {
    name: 'navbar',
    data() {
        return {
            totalPoints: 0
        }
    },
    created() {
        this.getPoints();
    },
    methods: {
        // Get user's point total from database
        getPoints() {
            // did this because it only updated the points after you go to a different page
            // this is so it updates right when you get the points
            setInterval(() => {
                var userRef = db.collection("users").doc(localStorage.getItem('currentUser'));
                var self = this;

                userRef.get().then(function(doc) {
                    self.totalPoints = doc.get('point_total');
                });
            }, 250);
        },
        logout() {
            // Clear current user, current timer time, and current break time
            localStorage.removeItem('currentUser');

            if (!localStorage.getItem('currentTime') !== null) {
                localStorage.removeItem('currentTime');
            }

            if (!localStorage.getItem('currentBreakTime') !== null) {
                localStorage.removeItem('currentBreakTime');
            }
        }  
    }
}
</script>

<style scoped>
h1 {
    color: white;
    padding-top: 5px;
    display: flex;
    justify-content: center;
}

.centered {
    width: 280px;
    float: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>