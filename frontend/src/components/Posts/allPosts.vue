<template>
<the-header></the-header>
    <h1>HomePage</h1>
    <ul>
        <post
            v-for="po in posts"
            :key="po.id"
            :postId="po.id"
            :title="po.title"
            :img="po.img"
            :text="po.text"
            :date="po.date"
            :username="po.username"
        >
        <!-- <input type="text" placeholder="add new comment" v-model=""> -->
        </post>
    </ul>
        <router-link to="/groupomania/users/login">login</router-link>
        <router-link id="newpost" to="/groupomania/posts/new">Create new Post</router-link>
        <router-link id="logOut" to="/groupomania/users/login" @click="LogOut">Log Out</router-link>

</template>


<script>
import post from './post.vue'
import TheHeader from '../interface/TheHeader.vue'
export default {
    components: {
        post,
        TheHeader,
    },
    data() {
        return {
            posts: [],
            comments: [],
            showComments: true,
            // newComment:   
        }
    },
    methods: {
        redirect() {
            if (window.location.pathname != '/groupomania/users/login' && !localStorage.getItem('userLoggedIn')) {
                window.location = '/groupomania/users/login'
            }
        },
        async loadData() {

            const myHeaders = new Headers();
            const token = localStorage.getItem('Token-Frontend-Login')

            myHeaders.append('Authorization', token);

            await fetch('http://localhost:3000/groupomania/posts', {
                headers: myHeaders
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((data) => {
                const results = [];
                for (const id in data) {
                    results.push({
                        id: data[id].id, 
                        username: data[id].from_user, 
                        title: data[id].title,
                        date: data[id].date.slice(0, 19).replace('T', ' '),
                        text: data[id].text,
                        img: data[id].img,
                        postId: data[id].id})
                }

                for (let i = results.length - 1; i >= 0; i--) {
                    this.posts.push(results[i])
                }
                console.log(this.posts);
            })

        },
        async loadComments() {

            const myHeaders = new Headers();
            const token = localStorage.getItem('Token-Frontend-Login')

            myHeaders.append('Authorization', token);

            await fetch('http://localhost:3000/groupomania/comments', {
                headers: myHeaders
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((data) => {
                const results = [];
                for (const id in data) {
                    results.push({
                        id: data[id].id, 
                        username: data[id].id_user,
                        id_post: data[id].id_post,
                        date_comment: data[id].date_comment.slice(0, 19).replace('T', ' '),
                        text: data[id].text})
                }

                for (let i = results.length - 1; i >= 0; i--) {
                        this.comments.push(results[i])
                }

                console.log(this.comments);
            })

        },
        LogOut() {
            return  localStorage.clear()
        }
    },
    mounted() {
        console.log('mounted');
        this.redirect()
        this.loadData()
        this.loadComments()
    }
}
</script>
<style scoped>
#newpost {
    position: fixed;
    width: 70px;
    bottom: 1%;
    left: 1%;
    color: white;
    background: tomato;
    padding: 1%;
    border-radius: 15%;
}
#logOut {
    position: fixed;
    width: 70px;
    bottom: 1%;
    right: 1%;
    color: white;
    background: rgb(107, 107, 109);
    padding: 1%;
    border-radius: 15%;
}
</style>