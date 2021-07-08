<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/memory">Memory</router-link> |
    <router-link to="/minesweeper">Minesweeper</router-link> |
    <router-link to="/rockpaperscissors">Rock Paper Scissors</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Gugi&display=swap");
#app {
  font-family: "Gugi", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  margin: .5em;
}

#nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #e023e0;
    }
  }
  a:hover {
    color: #e785e7;
  }
}
</style>
