import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from './components/WelcomePage.vue'
import ChoosePet from './components/ChoosePet.vue';
import PlayGround from './components/PlayGround.vue';
import PetDied from './components/PetDied.vue';

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: WelcomePage
    },
    {
        path: '/ChoosePet',
        name: 'ChoosePet',
        component:ChoosePet
    }, {
        path: '/PlayGround',
        name: 'PlayGround',
        component:PlayGround
        
    }, {
        path: '/PetDied',
        name: 'PetDied',
        component:PetDied

    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})  
export default router;