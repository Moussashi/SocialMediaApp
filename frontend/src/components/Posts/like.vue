<template>
    <div v-if="liked" id="liked">
        <fa icon="heart" @click="addLike"/>
        <p id="likeCount" v-if="likeCount > 0"> {{ likeCount }} </p>
    </div>
    <div v-else id="notliked" @click="addLike">
        <fa icon="heart-crack"/>
        <p id="likeCount" v-if="likeCount > 0"> {{ likeCount }} </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            liked: false,
            likeCount: 0,
            userLike: []
        }
    },
    methods: {
        addLike() {
            this.liked = !this.liked

            const user = JSON.parse(localStorage.getItem('userLoggedIn'))

            if (!this.liked) {
                this.userLike.push(user.username)
            } else {
                const newArray = this.userLike.filter(element => element != user.username)
                this.userLike = newArray

            }
            console.log(this.userLike);
        }
    }
}
</script>

<style scoped>
#notliked {
    color: black;
}
#liked {
    color: tomato;
}

</style>