import { createRouter, createWebHistory } from 'vue-router';
import signup from './components/auth/signup.vue'
import Login from './components/auth/Login.vue'
import allPosts from './components/Posts/allPosts.vue'
import UserPage from './components/User/UserPage.vue'
import newPost from './components/Posts/newPost.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/groupomania/posts'},
        {path: '/groupomania/users/login', component: Login},
        {path: '/groupomania/users/signup', component: signup},
        {path: '/groupomania/posts', component: allPosts},
        {path: '/groupomania/posts/new', component: newPost},
        {path: '/groupomania/users/:id', component: UserPage},
        {path: '/:notFound(.*)', component: null},
    ]
})

export default router;