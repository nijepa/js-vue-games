<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="home__item"></div>

    <router-link to="/memory" class="home__item"> Memory</router-link>

    <div class="home__item"></div>

    <router-link to="/minesweeper" class="home__item">Minesweeper</router-link>
    <svg
      version="1.1"
      id="Layer_1"
      width="175px"
      x="0px"
      y="0px"
      viewBox="0 0 496 496"
      style="enable-background:new 0 0 496 496;"
      xml:space="preserve"
    >
      <polygon
        style="fill:#008AAA;"
        points="312,0 294.4,16 184,16 184,124 176,128 185.6,144 320,144 320,15.2 "
      />
      <rect x="176" style="fill:#07BED6;" width="136" height="128" />
      <polygon
        style="fill:#04A0BA;"
        points="312,100 244.8,32.8 209.6,96 242.4,128 312,128 "
      />
      <polygon style="fill:#FFFFFF;" points="280,96 244.8,32.8 208.8,96 " />
      <polygon
        style="fill:#1A1E1E;"
        points="312,176 294.4,192 184,192 184,299.2 176,304 185.6,320 320,320 320,190.4 "
      />
      <rect x="176" y="176" style="fill:#4A514F;" width="136" height="128" />
      <polygon
        style="fill:#911C0D;"
        points="144,176 128,192 16,192 16,299.2 8,304 19.2,320 152,320 152,190.4 "
      />
      <rect x="8" y="176" style="fill:#DB5435;" width="136" height="128" />
      <polygon
        style="fill:#B52D1F;"
        points="144,244 108.8,208.8 48,272 80.8,304 144,304 "
      />
      <rect x="48" y="208" style="fill:#FFFFFF;" width="64" height="64" />
      <polygon
        style="fill:#236D00;"
        points="480,176 460.8,192 352,192 352,299.2 344,304 352,320 488,320 488,190.4 "
      />
      <rect x="344" y="176" style="fill:#329908;" width="136" height="128" />
      <polygon
        style="fill:#2B7C00;"
        points="480,257.6 436,214.4 385.6,264.8 425.6,304 480,304 "
      />
      <circle style="fill:#FFFFFF;" cx="411.2" cy="240" r="36.8" />
      <polygon
        style="fill:#5B3F7A;"
        points="312,352 294.4,368 184,368 184,473.6 176,480 185.6,496 320,496 320,364.8 "
      />
      <rect x="176" y="352" style="fill:#835EA5;" width="136" height="128" />
      <polygon
        style="fill:#6D4B9B;"
        points="312,431.2 276.8,396.8 222.4,441.6 260.8,480 312,480 "
      />
      <rect
        id="SVGCleanerId_0"
        x="209.118"
        y="404.842"
        transform="matrix(-0.7073 -0.7069 0.7069 -0.7073 123.5876 881.6545)"
        style="fill:#FFFFFF;"
        width="70.399"
        height="20.8"
      />
      <g transform="matrix(0 -1 1 0 -21.27 84.4)">
        <rect
          id="SVGCleanerId_0_1_"
          x="209.882"
          y="404.483"
          transform="matrix(-0.7069 0.7073 -0.7073 -0.7069 711.7808 534.8181)"
          style="fill:#FFFFFF;"
          width="70.399"
          height="20.8"
        />
      </g>
    </svg>
    <router-link to="/rockpaperscissors" class="home__item">Rock Paper Scissors</router-link>
    <div class="home__item"></div>
    <div class="home__item"></div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" class="home__item" /> -->
    <div class="home__item"></div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    //HelloWorld
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin: 1em;
  padding: 0.5em;
  justify-items: center;
  align-items: center;

  .home__item {
    margin: 1em;
    padding: 1em;
    background-color: rgba(220, 20, 60, 0.35);
    color: rgb(228, 34, 92);
    text-transform: uppercase;
    font-size: 1.2em;
    font-family: "Gugi", cursive;
    text-decoration: none;
    //font-weight: 600;
    border: 2px solid transparent;
    border-radius: 1em;
    box-shadow: 0px 0px 5px 2px rgba(220, 20, 60, 0.75);
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .home__item:hover {
    background-color: rgba(220, 20, 60, 075);
    color: whitesmoke;
    border: 2px solid crimson;
  }
}
</style>
