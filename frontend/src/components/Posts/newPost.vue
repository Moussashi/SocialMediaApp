<template>
    <the-header></the-header>
    <form @submit.prevent="register">
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" v-model.trim="title" />
    </div>
    <div class="form-control">
      <label for="img">Gif</label>
      <input type="text" id="img" v-model.trim="img" />
    </div>
    <div class="form-control">
      <label for="text">text</label>
      <textarea id="text" cols="30" rows="10" v-model="text"></textarea>
    </div>
    <div class="actions">
      <button>New Post</button>
    </div>
  </form>
          <router-link id="newpost" to="/groupomania/posts">back to all post</router-link>

</template>
 
 <script>
 import TheHeader from '../interface/TheHeader.vue'
 export default {
     components: {
         TheHeader
     }, 
      data() {
         return {
             date: '',
             title: '',
             img: '',
             text: '',
             user: '',
         }
     },
     methods: {
         register() {

            fetch("http://localhost:3000/groupomania/posts", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    id_user: this.user.id,
                    from_user: this.user.username,
                    title: this.title,
                    img: this.img,
                    text: this.text,
                })
                })
                .then( (response) => {
                    console.log(response);
                    this.$router.replace('/groupomania/posts')
                }
            );
        },
        getUser() {
          this.user = JSON.parse(localStorage.getItem('userLoggedIn'))
        }
     },
     mounted() {
       this.getUser()
     }
 }
 </script>

 <style scoped>

form {
  margin: 1rem;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  width: 50%;
  margin: auto;
  margin-top: 2%;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
#newpost {
    position: fixed;
    width: 70px;
    bottom: 1%;
    right: 1%;
    color: white;
    background: tomato;
    padding: 1%;
    border-radius: 100%;
}
</style>