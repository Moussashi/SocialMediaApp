<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0;
  padding: 0;
}
</style>
