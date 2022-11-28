<template>
  <div id="app" class="text-center flex justify-center aling-center flex-col h-screen">
    <nav class="logged-off py-4 mb-1 border border-slate-300 rounded-md w-2/3 mx-auto" ref="navNotLogged">
      <router-link class="font-bold cursor-pointer" to="/login">Login</router-link> |
      <router-link class="font-bold cursor-pointer" to="/sign-up">Sign-up</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
 mounted() {
    this.$nextTick(function () {
      if(this.$store.getters.isLoggedIn) {
       this.$refs.navNotLogged.style.display = "none";
      } else {
        this.$refs.navNotLogged.style.display = "block"
      }
    })
  } 
}
</script>

<style>
body {
  background: #333333;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #fff;
}

nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}
</style>
