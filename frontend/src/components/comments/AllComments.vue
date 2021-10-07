<template>
    <h3>Comments</h3>
    <ul>
        <comments >
            <comments
            v-for="com in comments"
            :key="com.id"
            :username="com.username"
            :comment="po.comment"
            :date="po.date"></comments>
        </comments>

    </ul>
</template>

<script>
import Comments from './comment.vue'
export default {
    components: {
        Comments
    },
    data() {
        return {
            comments: []
        }
    },
    methods: {
        async loadComments() {

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
                        id: id, 
                        username: data[id].from_user, 
                        title: data[id].title,
                        date: data[id].date.slice(0, 19).replace('T', ' '),
                        text: data[id].text,
                        img: data[id].img})
                }

                for (let i = results.length - 1; i >= 0; i--) {
                    this.posts.push(results[i])
                }
                console.log(this.posts);
            })

        },
    }

}
</script>