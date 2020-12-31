<template>
<div id="outerDiv">
    <div>
        <img src='../assets/logo2.png' style="height: 250px; width: 250px" />
    </div>

    <div class="loginDiv" v-if="newAccount">
        <b-card 
        style="width: 500px; height: 300px"
        bg-variant="dark"
        text-variant="light"
        >
            <h1> Create New Account </h1>
            
            <b-form-input
                style="margin-top: 40px"
                v-model="username"
                placeholder="Enter Username for New Account">
            </b-form-input>
            <b-button style="margin-top: 10px" variant="primary" @click="newLogin">Sign Up</b-button>

            <p class="changeCursor" style="margin-top: 70px" @click="returningUser">Returning user? Click here to sign in!</p> 
        </b-card>
    </div>
    <div class="loginDiv" v-else>
        <b-card 
        style="width: 500px; height: 300px"
        bg-variant="dark"
        text-variant="light"
        >
            <h1> Sign In </h1>
            
            <b-form-input
                style="margin-top: 40px" 
                v-model="username" 
                placeholder="Enter Username of Exisiting Account">
            </b-form-input>
            <b-button style="margin-top: 10px" variant="primary" @click="returnLogin">Login</b-button>

            <p class="changeCursor" style="margin-top: 70px" @click="newUser">New to Study Buddy? Click here to create a new account!</p> 
        </b-card>
    </div>
</div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { db } from '../firestore/db'

export default {
    name: 'login',
    data() {
        return {
            newAccount: false,
            username: ''
        }
    }, 
    methods: {
        async returnLogin() {
            if (this.username) {
                const doc = await db.collection('users').doc(this.username).get();

                // If user does not exist, alert that user does not exist
                if (!(await doc).exists) {
                    alert("Account does not exist");
                }
                else {
                    this.newItem = '';

                    // Set global "current user" to username
                    this.$root.currentUser = this.username;

                    localStorage.setItem('currentUser', this.username);

                    // Route to "Add Task" page
                    this.$router.push('/addtask');
                }
            }
            else {
                alert("Please enter your username");
            }
        },
        async newLogin() {
            if (this.username) {
                const doc = await db.collection('users').doc(this.username).get();

                // If user exists, alert that user already exists
                if ((await doc).exists) {
                    alert("Username is taken");
                }
                else {
                    // Add new user to data
                    await db.collection('users').doc(this.username).set({ 
                        name: this.username,
                        hat_index: 0,
                        mask_index: 0,
                        scarf_index: 0,
                        glove_index: 0,
                        point_total: 0
                    });

                    localStorage.setItem('currentUser', this.username);

                    // Set default customizations as unlocked
                    await db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedHats').doc(String(0)).set({
                        unlocked: true
                    });
                    await db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedMasks').doc(String(0)).set({
                        unlocked: true
                    });
                    await db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedScarves').doc(String(0)).set({
                        unlocked: true
                    });
                    await db.collection("users").doc(localStorage.getItem('currentUser')).collection('unlockedGloves').doc(String(0)).set({
                        unlocked: true
                    });
                
                    this.newItem = '';

                    // Set global "current user" to username
                    this.$root.currentUser = this.username;

                    // Route to "Add Task" page
                    this.$router.push('/addtask');
                }
            }
            else {
                alert("Please enter a username");
            }
        },
        newUser() {
            this.username="";
            this.newAccount = true;
        },
        returningUser() {
            this.username="";
            this.newAccount = false;
        }
    }
}
</script>

<style scoped>
#outerDiv {
    background-color: #FFEFD5;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.loginDiv {
    padding-top: 10px;
}

.changeCursor {
  cursor: pointer;
}
.changeCursor:hover{
    color: #6495ED;
}
</style>