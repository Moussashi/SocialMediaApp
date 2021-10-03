<template>
<the-header></the-header>
    <div id="UsersPage">
        <section id="profile">
            <img src="../../assets/snapes.png">
            <h2>Severus Snapes</h2>
            <h4>personnal quote:</h4>
            <p>"you have your mother's eyes"</p>
        </section>
        <section>
            
        </section>
    </div>

</template>

<script>
import TheHeader from '../interface/TheHeader.vue'
export default {
    components: {
        TheHeader
    }
}
</script>

<style scoped>
#UsersPage {
    height: 75%;
    display: flex;
    justify-content: center;
}
#profile {
    width: 100%;
    background-color: wheat;
    height: 50%;
}
#profile img {
    height: 20%;
    width: 40%;
    border-radius: 100%;
}
</style>