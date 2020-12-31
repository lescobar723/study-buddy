import addTask from './components/addTask.vue'
import taskList from './components/taskList.vue'
import login from './components/login.vue'
import study from './components/study.vue'
import customize from './components/customize.vue'
import snowballFight from './snowballFight/index.html'
import winterMemory from './components/winterMemory.vue'

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
        path: '/snowball',
        component: snowballFight
    },
    {
        path: '/winterMemory',
        component: winterMemory
    },
]