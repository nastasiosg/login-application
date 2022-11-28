<template>
  <div>
    <nav class="logged-in py-4 mb-1 border border-slate-300 rounded-md w-2/3 mx-auto" ref="navIsLogged">
      <input type="button" class="font-bold cursor-pointer" value="Logout" @click="logout">
    </nav>
    <div class="border border-slate-300 rounded-md py-10 w-2/3 mx-auto">
      <div class="flex justify-center items-center gap-5 mb-3">
        <div class="rounded-full p-10 bg-gray-400">img</div>
        <h1 class="text-3xl"> {{ email }} </h1>
      </div>
      <p>Name: {{ first_name }}</p>
      <p class="my-1" id="text">Country: {{ country }}</p>
      <input type="text" class="mt-1 mx-auto m px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-gray-600 shadow-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400" placeholder="Update Country" v-model="countryText">
      <input type="button" class="cursor-pointer bg-green-400 hover:bg-green-300 text-gray-600 font-bold ml-1 px-6 py-2 rounded-md text-sm shadow-sm" value="Update" @click="updateCountry">
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default {
  data() {
    return {
      secretMessage: '',
      email: '',
      first_name: '',
      country: ''
    };
  },
  async created() {
    if(!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }    
    this.email = this.$store.getters.getUser.email;
    this.first_name = this.$store.getters.getUser.first_name;
    this.country = this.$store.getters.getUser.country;
    // for country update
    this.id = this.$store.getters.getUser.id;
    this.countryText = "";

    this.secretMessage = await AuthService.getSecretContent();
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    async updateCountry() {
        const credentials = {
          id: this.id,
          country: this.countryText,
          
        };
        const response = await AuthService.updateCountry(credentials);
        console.log(response.msg)
        document.getElementById("text").innerHTML = "<p>Country: " + this.countryText + "</p>";
    }
  }
}
</script>
