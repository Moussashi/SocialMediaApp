<template>
    <header>
        <img src="../../assets/groupo.png">
        <ul>
            <router-link to="/groupomania/posts">Posts</router-link>
            <router-link to="/groupomania/users/:id"> Profil <fa icon="user"/></router-link>
        </ul>
    </header>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
header {
    height: 15%;
    background-color: rgb(231, 231, 231);
    display: flex;
    align-items: center;
    justify-content: space-between;
}
header ul {
    width: 20%;
    display: flex;
    justify-content: space-around;
}
header a {
    width: 30%;
}
a {
    background-color: tomato;
    color: rgb(70, 70, 95);
    padding: 5%;
    border-radius: 15%;
}
a:hover {
        background-color: rgb(247, 57, 57);
}
img {
    width: 30%;
    height: 15%;
}
.fa {
    font-size: 1.5rem;
}
</style>