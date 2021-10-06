<template>
    <the-header></the-header>
    <router-link to="/groupomania/users/login">Already one of us ? Sign in</router-link>
    <form @submit.prevent="register">
    <div class="form-control">
      <label for="username">Username</label>
      <input type="text" id="usename" v-model.trim="username" />
    </div>
    <div class="form-control">
      <label for="ProfilePicture">Profile Picture</label>
      <input type="text" id="ProfilePicture" v-model.trim="ProfilePicture" />
    </div>
    <div class="form-control">
      <label for="message">Email</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input type="text" id="password" v-model.trim="password" />
    </div>
    <p class="errors" v-if="!formIsValid">Please enter a valid email and password.</p>
    <div class="actions">
      <button>Register</button>
    </div>
  </form>
</template>

<script>
import TheHeader from '../interface/TheHeader.vue'
export default {
    components: {
        TheHeader
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            ProfilePicture: '',
            formIsValid: true
        }
    }, 
    methods: {
        register() {
            this.formIsValid = true;
                if (
                    this.email === '' ||
                    this.username === '' ||
                    this.ProfilePicture === '' ||
                    !this.email.includes('@') ||
                    this.password === ''
                ) {
                    this.formIsValid = false;
                    return;
                }
            fetch("http://localhost:3000/groupomania/users/signup", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    ProfilePicture: this.ProfilePicture
                })
                })
                .then( (response) => {
                    console.log(response);
                }
            );
            this.$router.replace('/groupomania/posts')

        }
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
</style>