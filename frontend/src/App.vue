<template>
  <div class="content">
      <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <div :key="route.fullPath">
              <component :is="Component" />
            </div>
          </transition>
      </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  methods: {
    redirect() {
      if (window.location.pathname != '/groupomania/users/login' && !localStorage.getItem('userLoggedIn')) {
        window.location = '/groupomania/users/login'
      }
    }
  },
  mounted() {
    this.redirect()
  }
}
</script>

<style>

::-webkit-scrollbar {
    width: 1em;
}
::-webkit-scrollbar-track {
    background: hsl(15, 3%, 76%);
    border-radius: 100vw;
    margin-block: .5em;

}
::-webkit-scrollbar-thumb {
    background: hsl(0, 1%, 35%);
    border-radius: 100vw;
    border: .25em solid hsl(15, 3%, 76%);
}
::-webkit-scrollbar-thumb:hover {
    background: tomato;
}

#app {
  font-family: 'Courier New', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  margin: 0;
  padding: 0;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.fade-leave-active {
  transition: all 0.3s ease-in;
}
</style>
