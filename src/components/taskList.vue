<template>
<body>
	<navbar></navbar>

	<div id= "tasks">
		<h1>Tasks</h1>
		<p> (Click on task to edit, delete, or highlight) </p>
		<div id="tableDiv">
			<table style="width:100%">
				<thead>
					<tr>
						<th>Class</th>
						<th>Assignment Name</th>
						<th>Due Date</th>
						<th>Assignment Time</th>
						<th>Exam?</th>
						<th>Completed?</th>
					</tr>
				</thead>
			<!--ADD INFO FROM DATABASE IN HERE-->
				<tbody v-for="task in tasks" :key="task.id">
					<tr :style="task.backgroundColor">
						<td @click="clickedTask(task.id, task.className); $bvModal.show('editTask')">{{ task.className }}</td>
						<td @click="clickedTask(task.id, task.className); $bvModal.show('editTask')">{{ task.assignmentName }}</td>
						<td @click="clickedTask(task.id, task.className); $bvModal.show('editTask')">{{ task.dueDate }}</td>
						<td @click="clickedTask(task.id, task.className); $bvModal.show('editTask')">{{ task.timeNeeded }} Hours</td>
						<td @click="clickedTask(task.id, task.className); $bvModal.show('editTask')">{{ task.isExam }} </td>
						<td><input type="checkbox" @click="completedTask(task.id)"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<b-modal id="editTask" hide-footer>
		<template #modal-title>
		Edit Assignment
		</template>
		<div class="d-block text-center">
			
			<h6> Would you like to delete this assignment? </h6>
			<input type="checkbox" @click="deleteTask(editID); $bvModal.hide('editTask') ">

			<hr>

			<div id="editAssignment">

				<h6> Edit Assignment </h6>
				<p>(Only fill in fields that you would like to update)<p>

				<p> Edit class name:
				<input type="text"
					id="classInput"
					class="input"
					v-model="newClassName"
					placeholder="Class Name"
				> </p>
				<p> Edit assignment name:
				<input type="text"
					id="assignmentInput"
					class="input"
					v-model="newAssignmentName"
					placeholder="Assignment Name"
				> </p>
				<p> Edit due date:
				<input type="date"
					id="dueDateInput"
					class="input"
					v-model="newDueDate"
					placeholder="Due Date"
				> </p>
				<p> Edit time needed:
				<input type="number"
					id="timeNeededInput"
					class="input"
					v-model="newTimeNeeded"
					placeholder="Time Needed (Hours)"
					min="0"
				> </p>

				Is this an exam?
				<p> 
					<input class="mr-1" type="radio" id="true" value="t" v-model="picked">
					<label class="mr-3" for="true">Yes</label>
					
					<input class="mr-1" type="radio" id="false" value="f" v-model="picked">
					<label for="false">No</label>
				</p>
			</div>

			<div id="editAssignmentButtons">
				<b-button class="mr-1" variant="success" size="sm" @click="handleSave(); $bvModal.hide('editTask')">Save</b-button>
				<b-button variant="danger" size="sm" @click="handleCancel(); $bvModal.hide('editTask')">Cancel</b-button>
			</div>

			<hr>

			<h6> Change Highlight Color </h6>
			<div>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('aliceblue')"> Default </b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#FF7373')"> Red </b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#FFA536')"> Orange</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#FFFCA3')"> Yellow</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#B8FE7E')"> Green</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#80C2FF')"> Blue</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#EBC2FF')"> Purple</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#FFD0F7')"> Pink</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#CFCFCF')"> Grey</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#98FFA6')"> Mint</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#FFCCA8')"> Peach</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#98EFFF')"> Sky Blue</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#FFD3D3')"> Salmon</b-button>
				<b-button pill class="mr-1" variant="outline-dark" size="sm" @click="changeColor('#94ABFF')"> Periwinkle</b-button>
			</div>

			<b-button variant="success" style="margin-left: 5px; margin-top: 10px;" size="sm" @click="saveAndAskForClasses">Apply to all assignments for this class</b-button>
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
	name: 'taskList',
	components: {
		navbar,
	},
	data() {
        return {
            // newTask in tasks list (will later add a new Task to DOM)
			tasks: [],
			clicked: false,
			editID: '',
			lastColor: 'aliceblue',
			currentClassName: '',
			picked: []
        };
	},
	created() {
        // Bind "tasks" data to "tasks" subcollection of current user
        this.$bind('tasks', db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').orderBy('dueDate')).then(tasks => {
            this.tasks === tasks;
        })
    },
	methods: {
		async completedTask(id) {
			// Add task to completed tasks collection in database
			var docRef = db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(id);
			await docRef.get().then(async function(doc) {
				db.collection('users').doc(localStorage.getItem('currentUser')).collection('completedTasks').add(doc.data());
			});
			
			// Delete it from current tasks collection in database
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
		deleteTask(){
			db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(this.editID).delete();
		},
		// when you click on the row --> then you can press the editTask
		clickedTask(id, classname) {
			this.clicked = !this.clicked;
			this.editID = id;
			this.currentClassName = classname;
		},
		handleSave(){
			if (this.newClassName) {
				db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(this.editID).update({ className: this.newClassName });
			}
			if(this.newAssignmentName){
				db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(this.editID).update({ assignmentName: this.newAssignmentName });
			}
			if(this.newDueDate){
				db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(this.editID).update({ dueDate: this.newDueDate });
			}
			if(this.newTimeNeeded){
				db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(this.editID).update({ timeNeeded: this.newTimeNeeded });
			}

			// Only update database if one of the radio buttons is selected
			if(this.picked[0] == "t" || this.picked[0] == "f") {

				let examBool = "No";
				if(this.picked == "t"){
					examBool = "Yes";
				}

				db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(this.editID).update({ isExam: examBool });

				// Clear radio buttons
				this.picked = [];
			}

			this.editID = '';
			this.clicked = false;

			// Clear inputs and text field values
			this.newClassName = '';
			this.newAssignmentName = '';
			this.newDueDate = '';
			this.newTimeNeeded = '';
			document.getElementById("classInput").value = '';
			document.getElementById("assignmentInput").value = '';
			document.getElementById("dueDateInput").value = '';
			document.getElementById("timeNeededInput").value = '';
		},
		handleCancel(){
			this.editID = '';
			this.clicked = false;
		},
		changeColor(color) {
			db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(this.editID).update({ backgroundColor: 'background-color: ' + color });
			this.lastColor = color;
		},
		saveAndAskForClasses() {
			for (var i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i].className == this.currentClassName) {
					db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').doc(this.tasks[i].id).update({ backgroundColor: 'background-color: ' + this.lastColor });
				}
			}
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
#tasks{
  width: 100%;
  max-width: 70rem;
  padding: 1em;
  margin: 1em auto;
  overflow: auto;
  border: 5px solid black;
  background-color: white;
  box-shadow: 8px 8px 8px 8px #888888;
}
#grid_tasks {
  overflow-y: scroll;
  height: 500px;
}
#grid_tasks thead th {
  position: sticky;
  top: 0;
}
table, th, td {
  border: 1px solid black;
  padding: 5px;
}
#container-form{
	top: 50%;
	position: absolute;
	background-color: white;
	border: 1px solid black;
	padding: 20px;
	width: 75%;
}
.highlight{
	color: red;
}

#tableDiv {
    max-height: 400px;
    overflow: auto;
}

tbody tr:hover{
    cursor: pointer;
	color:red;
}

#editAssignment {
	display: flex;
	align-items: left;
	flex-direction: column;
}

#colorButtonsDiv {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
hr {
	height: 0px;
    border: none;
    border-top: 1px solid black;
}
</style>