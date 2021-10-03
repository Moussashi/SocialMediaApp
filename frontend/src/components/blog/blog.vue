<template>
    <post-card>
        <li>
            <h3> {{ title }} </h3>
            <p> {{ text }} </p>
            <p> {{ date }} </p>
        </li>
    </post-card>
</template>

<script>
import PostCard from '../UI/PostCard.vue'
export default {
    components: {
        PostCard
    },
    props: [ 'title', 'date', 'text'],
}
</script>

<style scoped>
li {
    list-style: none;
}
</style>

