import addTask from '../components/addTask.vue'
import taskList from '../components/taskList.vue'
import login from '../components/login.vue'
import study from '../components/study.vue'
import customize from '../components/customize.vue'
import winterMemory from '../components/winterMemory.vue'
import hangman from '../components/hangman.vue'
import wintermonster from '../components/wintermonster.vue'
import completedTasks from '../components/completedTasks.vue'

export default [
    {
        path: '/',
        component: login
    },
    {
        path: '/addtask',
        component: addTask
    },
    {
        path: '/tasklist',
        component: taskList
    },
    {
        path: '/study',
        component: study
    },
    {
        path: '/customize',
        component: customize
    },
    {
        path: '/winterMemory',
        component: winterMemory
    },
    {
        path: '/hangman',
        component: hangman
    },
    {
        path: '/wintermonster',
        component: wintermonster
    },
    {
        path: '/completedTasks',
        component: completedTasks
    },
]