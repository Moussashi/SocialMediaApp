<template>
    <post-card>
        <li id="wholePost">
            <div id="topPost">
                <h3 id="title"> {{ title }} </h3>
                <fa @click="deletePost" id="trash" icon="trash"/>
            </div>
            
            <img :src="img">
            <p>{{ text }}  </p>
            <div id="postData">
                <button @click="showComments">comments</button>
                <p id="date"> created by {{ username }} {{ date }} </p>
            </div>
            
            <ul>
                <section id="comments">
                        <ul>
                            <comments
                            v-for="com in comments"
                            :key="com.id"
                            :id="com.id"
                            :id_user="com.id_user"
                            :username="com.username"
                            :text="com.text"
                            :date="com.date_comment"></comments>
                        </ul>
                    </section>
            </ul>
            <slot></slot>
            <form @submit.prevent="addNewComment">
                <input type="text"  placeholder="add new comment" v-model="newComment">
                <button>Add</button>
            </form>
        </li>
    </post-card>
</template>

<script>
import PostCard from '../UI/PostCard.vue'
import Comments from '../comments/comment.vue'
export default {
    components: {
        PostCard,
        Comments
    },
    props: {
        title: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        },
        date: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        postId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            post: {},
            users: [],
            comments: [],
            newComment: ''
        }
    },
    methods: {
        addNewComment() {
            console.log('try to go');
            const user = JSON.parse(localStorage.getItem('userLoggedIn'))
            fetch("http://localhost:3000/groupomania/comments", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    id_user: user.id,
                    id_post: this.post.id,
                    text: this.newComment,
                })
                })
                .then( (response) => {
                    window.location.reload()
                    console.log(response);
                }
            );
        },
        deletePost() {
            console.log(this.post.id);
            const id = this.post.id
            const userLogged = JSON.parse(localStorage.getItem('userLoggedIn'))

            if (userLogged.id === this.post.id_user || userLogged.isAdmin === true ) {

                fetch(`http://localhost:3000/groupomania/posts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({id})

                }).then((response) => {
                    window.location.reload()
                    return response.json()
                })
            } else {
                alert('You are not allowed to delete this post')
            }
        },


        async loadPost() {
            const myHeaders = new Headers();
            const token = localStorage.getItem('Token-Frontend-Login')

            myHeaders.append('Authorization', token);

            await fetch(`http://localhost:3000/groupomania/posts/${this.postId}`, {
                headers: myHeaders
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((data) => {
                const mypost = data[0];

                this.post = {
                        id: mypost.id,
                        id_user: mypost.id_user,
                        username: mypost.from_user, 
                        title: mypost.title,
                        date: mypost.date.slice(0, 19).replace('T', ' '),
                        text: mypost.text,
                        img: mypost.img,
                        isAdmin: mypost.isAdmin
                }
            })

        },
        async loadComments(postId) {

            const myHeaders = new Headers();
            const token = localStorage.getItem('Token-Frontend-Login')

            myHeaders.append('Authorization', token);

            await fetch(`http://localhost:3000/groupomania/comments/${postId}`, {
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
                        id_user: data[id].id_user,
                        username: data[id].username,
                        id_post: data[id].id_post,
                        date_comment: data[id].date_comment.slice(0, 19).replace('T', ' '),
                        text: data[id].text})
                }

                for (let i = results.length - 1; i >= 0; i--) {
                        this.comments.push(results[i])
                }
            })

        },
        async loadUsers() {

            const myHeaders = new Headers();
            const token = localStorage.getItem('Token-Frontend-Login')

            myHeaders.append('Authorization', token);

            await fetch('http://localhost:3000/groupomania/users', {
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
                        username: data[id].username})
                }

                this.users = results
                console.log(this.users);
            })

        },
        LogOut() {
            return  localStorage.clear()
        }
    },
    mounted() {
        this.loadPost(this.postId)
        this.loadComments(this.postId)
        this.loadUsers()
    }
}
</script>

<style scoped>
ul {
    padding: 0;
    width: 95%;
}
li {
    list-style: none;
}
li img {
    width: 60%;
}
#title {
    text-align: left;
}
#date {
    text-align: right;
}
#postData {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
#postData button {
    height: min-content;
    border-radius: 15%;
    background-color: white;
}
#topPost {
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
}
#trash:hover {
    color: red;
}

</style>