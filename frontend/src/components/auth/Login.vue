<template>
    <the-header></the-header>
    <div id="wrapper">
        <router-link to="/groupomania/users/signup">No account yet ? Join Us</router-link>
        <form @submit.prevent="register">
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
                <button>Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import TheHeader from '../interface/TheHeader.vue'
export default {
    components: {
        TheHeader
    },
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true
        }
    }, 
    methods: {
        register() {
            this.formIsValid = true;
                if (
                    this.email === '' ||
                    !this.email.includes('@') ||
                    this.password === ''
                ) {
                    this.formIsValid = false;
                    return;
                }
            fetch("http://localhost:3000/groupomania/users/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }).then( (response) => {
                    return response.json()
                }
            ).then( (response) => {
                localStorage.setItem('Token-Frontend-Login', response.Usertoken)
                localStorage.setItem('userLoggedIn', JSON.stringify(response.user))
                this.$router.push('/groupomania/posts')
            })

        }
    }
}
</script>

<style scoped>

#wrapper {
    height: 80vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

form {
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
  width: 50%;
  margin-top: 2%;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
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
  border-color: tomato;
  background-color: rgba(255, 99, 71, 0.342);
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