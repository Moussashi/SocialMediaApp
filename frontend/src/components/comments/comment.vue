<template>
        <li>
            <h4> {{ username }} </h4>
            <p> {{ text }} </p>
            <p id="date"> created: {{ date }} </p>
        </li>
</template>

<script>
export default {
    props: {
        username: {
            type: String,
            required: true
        },
        text: {
            type: String, 
            required: true
        },
        date: {
            type: String, 
            required: true
        }
    }
}
</script>

<style scoped>

li {
    border-top: 2px solid ;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    font-size: 0.8rem;
}
#date {
    font-size: 0.8rem;
}
</style>