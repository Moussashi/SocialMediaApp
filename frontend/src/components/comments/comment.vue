<template>
        <li>
            <h4> {{ username }} </h4>
            <p> {{ text }} </p>
            <p id="date"> created: {{ date }} </p> 
            <fa  @click="deleteComment" id="trash" icon="trash"/>
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
        },
        id: {
            type: Number,
            required: true
        },
        id_user: {
            type: Number,
            required: true
        }
    },
    methods: {
        deleteComment() {
            console.log(this.id);
            const id = this.id
            const userId = JSON.parse(localStorage.getItem('userLoggedIn'))

            if (userId.id === this.id_user || userId.isAdmin === true) {
                fetch(`http://localhost:3000/groupomania/comments/${id}?id_user=${userId.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }).then((response) => {
                    window.location.reload()
                    return response.json()
                })
            } else {
                alert('You are not allowed to delete this comment')
            }
        },


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
li:hover {
    background-color: whitesmoke;
}
#trash:hover {
    color: red;
}
#date {
    font-size: 0.8rem;
}
</style>