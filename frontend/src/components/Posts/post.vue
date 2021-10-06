<template>
    <post-card>
        <li>
            <h3 id="title"> {{ title }} </h3>
            <img :src="img">
            <p>{{ text }}  </p>
            <p id="date"> created by {{ username }} {{ date }} </p>
            <like></like>
        </li>
    </post-card>
</template>

<script>
import PostCard from '../UI/PostCard.vue'
import Like from '../Posts/like.vue'
export default {
    components: {
        PostCard,
        Like
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
        }
    },
}
</script>

<style scoped>
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

</style>