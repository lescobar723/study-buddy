<template>
<body>
    <navbar></navbar>

    <h1 style="margin-top: 20px">Hello {{ this.currentUser }}!</h1>

    <section class="tasks">
        <div class="totalAssignments">
            <transition name="fade">
                <h2 v-if="totalTasks">Total Assignments: {{ totalTasks }}</h2>
            </transition>
        </div>
        <p>
            Enter new assignment here:
        </p>
        <div id="inputTask">
            <input type="text"
                id="classInput"
                class="input"
                required="required"
                v-model="className"
                placeholder="Class Name"
            >
            <input type="text"
                id="assignmentInput"
                class="input"
                required="required"
                v-model="assignmentName"
                placeholder="Assignment Name"
            >
            <input type="date"
                id="dueDateInput"
                class="input"
                required="required"
                v-model="dueDate"
                placeholder="Due Date"
            >
            <input type="number"
                id="timeNeededInput"
                class="input"
                min="0"
                required="required"
                v-model="timeNeeded"
                placeholder="Time Needed (Hours)"
            >
            Is this an exam?
            <input type="checkbox"
                id="examInput"
                class="input"
                v-model="exam"
            >
            <span id="input">
                <b-button v-b-modal.modal-1 style="margin-bottom: 10px" variant="primary" @click="addTask" class="button">
                    <i class="add"></i> Add Task
                </b-button>
            </span>
        </div>
    </section>

    <b-modal id="modal-1" title="Assignment Added" v-if=this.okay hide-footer>

        <p class="my-4"><b>Class Name:</b> {{ this.className }} </p>
        <p class="my-4"><b>Assignment Name:</b> {{ this.assignmentName }} </p>
        <p class="my-4"><b>Due Date:</b> {{ this.dueDate }} </p>
        <p class="my-4"><b>Time Needed:</b> {{ this.timeNeeded }} Hours </p>
        <p class="my-4" v-if="this.exam"><b>Exam?</b> Yes </p>
        <p class="my-4" v-if="!this.exam"><b>Exam?</b> No </p>

        <br>
        <b-button class="button" variant="primary" block @click="reset();$bvModal.hide('modal-1')">OK</b-button>

    </b-modal>

</body>
</template>

<script>
import navbar from './navbar.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { db } from '../firestore/db'

export default {
    name: 'addTask',
    components: {
        navbar
    },
    data() {
        return {
            // newTask in tasks list (will later add a new Task to DOM)
            tasks: [],
            currentUser: '',
            okay: false
        };
    },
    mounted() {
        if (localStorage.getItem('currentUser')) {
            this.currentUser = localStorage.getItem('currentUser');
        }
    },
    created() {
        // Bind "tasks" data to "tasks" subcollection of current user
        this.$bind('tasks', db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks')).then(tasks => {
            this.tasks === tasks;
        })
    },
    // describes a value that depends on other value
    computed: {
        // returns total tasks not completed
        totalTasks() {
            // starts with 0
            if (this.tasks.filter(this.inProgress).length < 1){
                return "0";
            }
            // increments total Assignment when adding new Assignment
            return this.tasks.filter(this.inProgress).length;
        }
    },
    methods: {
        // add Assignment to DOM
        async addTask() {
            // if all these input areas filled
            if (this.className && this.dueDate && this.timeNeeded && this.assignmentName) {
                this.okay = true;
                let examBool = "No";
                if(this.exam){
                    examBool = "Yes";
                }
                await db.collection('users').doc(this.currentUser).collection('tasks').add({
                // await db.collection('tasks').add({
                    className: this.className,
                    assignmentName: this.assignmentName,
                    dueDate: this.dueDate,
                    timeNeeded: this.timeNeeded,
                    isExam: examBool,
                    completed: false,
                    // Default background color
                    backgroundColor: 'background-color: aliceblue'
                });

                // Clear inputs and text field values
                this.className = '';
                this.assignmentName = '';
                this.dueDate = '';
                this.timeNeeded = '';
                this.exam = false;
                document.getElementById("classInput").value = '';
                document.getElementById("assignmentInput").value = '';
                document.getElementById("dueDateInput").value = '';
                document.getElementById("timeNeededInput").value = '';
                document.getElementById("examInput").checked = false;
            }
        },
        removeTask(id) {
            db.collection('users').doc(this.currentUser).collection('tasks').doc(id).delete();
        },
        completeTask(task) {
            task.completed = ! task.completed;
        },
        // helps to keep track of total Assignments
        inProgress(task) {
            return ! this.isCompleted(task);
        },
        isCompleted(task) {
            return task.completed;
        },
        reset() {
            this.okay = false;
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
input{
    margin: 20px;
}
#inputTask{
    border: 1px solid black;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .5s;
}
.fade-enter, .fade-leave-active{
  opacity: 0;
}
.tasks{
  width: 100%;
  max-width: 70rem;
  padding: 1em;
  margin: 1em auto;
  overflow: auto;
  border: 5px solid black;
  background-color: white;
  box-shadow: 8px 8px 8px 8px #888888;
}
.list{
  clear: both;
  list-style-type: none;
}
.tasks__item{
  margin-bottom: .5em;
  position: relative;
}
.assignment-item{
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: .85em 2.25em .85em 1em;
  background-color: rgba(black, .05);
  border: 1px solid rgba(black, .1);
}
.assignment-item:hover{
  background-color: rgba(black, .1);
  border-color: rgba(black, .15);
}
.assignment-item--completed{
  text-decoration: line-through;
  background-color: rgba(green, .15);
  border-color: rgba(green, .2);
}
.assignment-item--completed:hover{
  background-color: rgba(green, .25);
  border-color: rgba(green, .3);
}
.tasks__item__remove{
  position: absolute;
  height: 100%;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.tasks__item__remove i{
  vertical-align: middle;
}
</style>