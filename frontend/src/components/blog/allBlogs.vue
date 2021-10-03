<template>
<the-header></the-header>
    <h1>All blogs posts</h1>
    <blog
        v-for="blo in blogs"
        :key="blo.id"
        :title="blo.title"
        :text="blo.text"
        :date="blo.date"></blog>

        <router-link id="newpost" to="/groupomania/blogs/new">new Post ?</router-link>
    <router-view></router-view>
</template>

<script>
import Blog from '../blog/blog.vue'
import TheHeader from '../interface/TheHeader.vue'
export default {
    components: {
        Blog,
        TheHeader
    },
    data() {
        return {
            blogs: [],
        }
    },
    methods: {
        loadData() {
            fetch('http://localhost:3000/groupomania/blogs').then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((data) => {
                const results = [];
                for (const id in data) {
                    results.push({
                        id: id, 
                        id_user: data[id].id_user, 
                        title: data[id].title,
                        text: data[id].text,
                        date: data[id].date})
                }
                this.blogs = results;
            })

        }
    },
    created() {
        this.loadData()
    }
}
</script>

<style scoped>
#newpost {
    position: fixed;
    bottom: 1%;
    right: 1%;
    color: white;
    background: tomato;
    padding: 1%;
    border-radius: 100%;
}
</style>