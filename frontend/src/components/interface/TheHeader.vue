<template>
    <header>
        <img src="../../assets/Vi-Motiv.png">
        <ul>
            <router-link to="/groupomania/posts">Posts</router-link>
            <router-link id="news" to="/groupomania/news">News</router-link>
            <router-link id="profil" to="/groupomania/users/:id">Profil</router-link>
        </ul>
    </header>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
header {
    margin: 0;
    width: 100%;
    height: 7%;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: space-between;
}
header ul {
    display: flex;
    justify-content: space-around;
    margin-right: 2%;
}

a {
    font-size: 110%;
    color: rgb(70, 70, 95);
    padding: 5%;
    border-radius: 15%;
}
a:hover {
        background-color: rgb(247, 57, 57);
}
img {
    width: 25%;
    padding: 0;
    margin: 0;

}
.fa {
    font-size: 1.5rem;
}
</style>