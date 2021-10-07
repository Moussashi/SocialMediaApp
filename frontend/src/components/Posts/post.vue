<template>
    <post-card>
        <li>
            <h3 id="title"> {{ title }} </h3>
            <img :src="img">
            <p>{{ text }}  </p>
            <div id="postData">
                <p @click="showComments">comments</p>
                <p id="date"> created by {{ username }} {{ date }} </p>
            </div>
            
            <ul>
                <section id="comments">
                        <ul>
                            <comments
                            v-for="com in comments"
                            :key="com.id"
                            :username="com.username"
                            :text="com.text"
                            :date="com.date_comment"></comments>
                        </ul>
                    </section>
            </ul>
            <slot></slot>
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
            comments: [],
        }
    },
    methods: {
        async loadPost(postId) {
            console.log(postId);
            const myHeaders = new Headers();
            const token = localStorage.getItem('Token-Frontend-Login')

            myHeaders.append('Authorization', token);

            await fetch(`http://localhost:3000/groupomania/posts/${postId}`, {
                headers: myHeaders
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((data) => {
                console.log({data});
                const mypost = data[0];

                this.post = {
                        id: mypost.id, 
                        username: mypost.from_user, 
                        title: mypost.title,
                        date: mypost.date.slice(0, 19).replace('T', ' '),
                        text: mypost.text,
                        img: mypost.img
                }
                console.log(data);
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
                        username: data[id].username,
                        id_post: data[id].id_post,
                        date_comment: data[id].date_comment.slice(0, 19).replace('T', ' '),
                        text: data[id].text})
                }

                for (let i = results.length - 1; i >= 0; i--) {
                        this.comments.push(results[i])
                }
                console.log('comments');
                console.log(this.comments);
            })

        },
        LogOut() {
            return  localStorage.clear()
        }
    },
    mounted() {
        console.log('mounted Post');
        console.log(this.postId);
        this.loadPost(this.postId)
        this.loadComments(this.postId)
    }
}
</script>

<style scoped>
ul {
    padding: 0;
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
}

</style>