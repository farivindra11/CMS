<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <router-link to="/" class="navbar-brand text-black-50">CMS</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto p-3 lead">
        <li class="nav-item" :class="{active:whatPage==='home'}"> 
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>

        <li class="nav-item" :class="{active:whatPage==='data'}">
          <router-link to="/data" class="nav-link" >Data</router-link>
        </li>
        <li class="nav-item" :class="{active:whatPage==='dataDate'}">
          <router-link to="/dataDate" class="nav-link" >Data Date</router-link>
        </li>
        <li class="nav-item" :class="{active:whatPage==='dataMap'}"> 
          <router-link to="/maps" class="nav-link" >Maps</router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Chart</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/line" class="dropdown-item" href="#">Line</router-link>
            <router-link to="/pie" class="dropdown-item" href="#">Pie</router-link>
            <router-link to="/bar" class="dropdown-item" href="#">Bar</router-link>
            <router-link to="/map" class="dropdown-item" href="#">Maps</router-link>

          </div>
        </li>
      </ul>
      <button
        type="submit"
        class="btn-login p-2 mb-2"
        v-if="isLoggedIn"
        @click="handleLogout"
      >Logout</button>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    isLoggedIn: Boolean,
    whatPage:String
  },
  data() {
    return {
      url: "http://localhost:3000/api/users/destroy",
    };
  },
  methods: {
    async handleLogout() {
      try {
        const {
          data: { logout },
        } = await this.axios.get(this.url, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        });
        if (logout) {
          localStorage.removeItem("email");
          localStorage.removeItem("Authorization");
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          title: "Something when wrong!",
          text: "Please ask administrator to fix the issue",
          icon: "error",
          timer: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.btn-login {
  color: white;
  border-radius: 5px;
  background-color: black;
  transition: transform 0.2s;
  font-size: 1.5em;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border: none;
}
.btn-login:hover {
  color: black;
  background-color: white;
  transform: scale(1.02);
}
</style>