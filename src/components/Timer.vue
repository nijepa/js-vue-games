<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <div id="stopwatch">{{ time }}</div>
    <button v-if="!isStarted" @click="handleStart">start</button>
    <div v-else class="">
      <div class="actions">
        <button v-if="!paused" @click="stop">pause</button>
        <button v-else @click="start">resume</button>
        <!-- <button @click="restart">restart</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timer',
/*   props: {
    msg: String
  }, */
  data() {
    return {
      isStarted: false,
      time: 0,
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
      paused: false,
    }
  },
  methods: {
    handleStart() {
      this.isStarted = true;
      this.reset();
      this.start();
      this.$emit("started");
    },

    restart() {
      this.reset();
      this.isStarted = false;
    },

    start() {
      if (this.running) return;

      if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
      }

      if (this.timeStopped !== null) {
        this.stoppedDuration += new Date() - this.timeStopped;
      }

      this.started = setInterval(this.clockRunning, 10);
      this.running = true;
      this.paused = false;
    },

    stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
      this.paused = true;
      this.$emit("paused");
    },

    reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = "00:00:00.000";
      this.result = 0;
      this.attempts = 0;
    },

    clockRunning() {
      let currentTime = new Date(),
        timeElapsed = new Date(
          currentTime - this.timeBegan - this.stoppedDuration
        ),
        hour = timeElapsed.getUTCHours(),
        min = timeElapsed.getUTCMinutes(),
        sec = timeElapsed.getUTCSeconds(),
        ms = timeElapsed.getUTCMilliseconds();

      this.time =
        this.zeroPrefix(hour, 2) +
        ":" +
        this.zeroPrefix(min, 2) +
        ":" +
        this.zeroPrefix(sec, 2) +
        "." +
        this.zeroPrefix(ms, 3);
    },

    zeroPrefix(num, digit) {
      let zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#stopwatch {
  font-size: 1.5em;
  margin: .5em 0 .2em 0;
}

button {
  margin: .5em;
  padding: 1em;
  background-color: rgba(220, 20, 60, 0.35);
  text-transform: uppercase;
  font-size: 1.2em;
  font-family: "Gugi", cursive;
  //font-weight: 600;
  border: 2px solid transparent;
  border-radius: 1em;
  box-shadow: 0px 0px 5px 2px rgba(220, 20, 60, 0.75);
  cursor: pointer;
  transition: all 0.4s ease;
}
button:hover {
  background-color: rgba(220, 20, 60, 075);
  color: whitesmoke;
  border: 2px solid crimson;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
