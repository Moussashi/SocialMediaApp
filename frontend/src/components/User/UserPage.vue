<template>
<the-header></the-header>
        <section id="profile">
           <post-card>
               <div id="profilePicture">
                   <img :src="PP" >
               </div>
               <h1> {{ username }} </h1>
           </post-card>
        </section>
           <h2>Recent Posts</h2>
           <ul>
               <post
                    v-for="po in RecentPosts"
                    :key="po.id"
                    :title="po.title"
                    :img="po.img"
                    :text="po.text"
                    :date="po.date"
                    :username="po.username"></post>
           </ul>

           <div id="deleteAccount">
               <p>Delete Account ?</p>
               <button @click="deletePost"><fa icon="trash"/></button>
           </div>
           

</template>

<script>
import TheHeader from '../interface/TheHeader.vue'
import PostCard from '../UI/PostCard.vue'
import Post from '../Posts/post.vue'
export default {
    components: {
        TheHeader,
        PostCard,
        Post
    },
    data() {
        return {
            PP: '',
            username: '',
            id: '',
            RecentPosts: []
        }
    },
    methods: {
        redirect() {
            if (window.location.pathname != '/groupomania/users/login' && !localStorage.getItem('userLoggedIn')) {
                window.location = '/groupomania/users/login'
            }
        },
        userInfo() {
            const user = JSON.parse(localStorage.getItem('userLoggedIn'))
            this.PP = user.ProfilePicture
            this.username = user.username
            this.id = user.id
        },
        fetchRecentPosts() {
            const myHeaders = new Headers();
            const token = localStorage.getItem('Token-Frontend-Login')

            myHeaders.append('Authorization', token);

            fetch('http://localhost:3000/groupomania/posts', {
                
                headers: myHeaders
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((data) => {
                const results = [];
                for (const id in data) {
                    results.push({
                        id: id, 
                        username: data[id].from_user, 
                        title: data[id].title,
                        date: data[id].date,
                        text: data[id].text,
                        img: data[id].img})
                }

                for (let i = results.length - 1; i >= 0; i--) {
                    if (results[i].username === this.username) {
                        this.RecentPosts.push(results[i])
                    } else {
                        continue
                        }
                }

            })

        },
        deletePost() {
            const id = this.id
            //Params
            fetch('http://localhost:3000/groupomania/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({id})
            }).then((response) => {
                localStorage.clear()
                this.$router.replace('/groupomania/users/login')
                return response.json()
            })

        },
        
    },
    mounted() {
        this.userInfo()
        this.fetchRecentPosts()
        this.redirect()
    }
}
</script>

<style scoped>

#profile {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 70%;
    background-color: rgb(226, 209, 192);
}
#profile img {
    width: 38%;
    border-radius: 100%;
}
#deleteAccount button{
width: 10%;
background-color: rgb(235, 57, 57);
}
</style>