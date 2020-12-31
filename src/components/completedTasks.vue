<template>
<body>
	<navbar></navbar>

	<div id= "tasks">
		<h1>Completed Tasks</h1>
		<p> Look at all the work you've accomplished! </p>
		<div id="tableDiv">
			<table style="width:100%">
				<thead>
					<tr>
						<th>Class</th>
						<th>Assignment Name</th>
						<th>Due Date</th>
						<th>Assignment Time</th>
						<th>Exam?</th>
						<th>Mark as Uncomplete</th>
					</tr>
				</thead>
			<!--ADD INFO FROM DATABASE IN HERE-->
				<tbody v-for="task in completedTasks" :key="task.id">
					<tr :style="task.backgroundColor">
						<td >{{ task.className }}</td>
						<td >{{ task.assignmentName }}</td>
						<td >{{ task.dueDate }}</td>
						<td >{{ task.timeNeeded }} Hours</td>
						<td >{{ task.isExam }} </td>
						<td><input type="checkbox" @click="uncompleteTask(task.id)"></td>
					</tr>
				</tbody>
			</table>
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
	name: 'completedTasks',
	components: {
		navbar,
	},
	data() {
        return {
            // newTask in tasks list (will later add a new Task to DOM)
			completedTasks: [],
        };
	},
	created() {
        // Bind "tasks" data to "tasks" subcollection of current user
        this.$bind('completedTasks', db.collection('users').doc(localStorage.getItem('currentUser')).collection('completedTasks').orderBy('dueDate')).then(completedTasks => {
            this.completedTasks === completedTasks;
        })
    },
	methods: {
		async uncompleteTask(id) {
			// Add task to current tasks collection in database
			var docRef = db.collection('users').doc(localStorage.getItem('currentUser')).collection('completedTasks').doc(id);
			await docRef.get().then(async function(doc) {
				db.collection('users').doc(localStorage.getItem('currentUser')).collection('tasks').add(doc.data());
			});

			// Delete it from current tasks collection in database
			db.collection('users').doc(localStorage.getItem('currentUser')).collection('completedTasks').doc(id).delete();

			// Get user's current total points
			var userRef = db.collection("users").doc(localStorage.getItem('currentUser'));
            var currentPointTotal = 0;
            await userRef.get().then(function(doc) {
				currentPointTotal = doc.get('point_total');
			});

			if(currentPointTotal > 0){
				// Update point total in database
				db.collection('users').doc(localStorage.getItem('currentUser')).update({
					point_total: (currentPointTotal - 10)
				});
			}
        },
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