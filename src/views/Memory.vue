<template>
  <div class="memory">
    <h1>Memory</h1>
    <div class="stats">
      <div class="info-detail">
        <p>score</p>
        <h3 class="info__text">
          {{ result }}
        </h3>
      </div>
      <div class="info-detail">
        <p>attempts</p>
        <h3 class="info__text">
          {{ attempts }}
        </h3>
      </div>
    </div>
    <Timer ref="timer" @started="handleStart" @paused="handlePause" />
    <!-- <div id="stopwatch">{{ time }}</div> -->
    <!-- <button v-if="!isStarted" @click="handleStart">start</button> -->
    <div v-if="isStarted" class="">
      <!-- <div class="actions">
        <button v-if="!paused" @click="stop">pause</button>
        <button v-else @click="start">resume</button>
        <button @click="restart">restart</button>
      </div> -->
      <div class="grid">
        <li v-for="card in cardArray" :key="card.name">
          <Card :card="card" @fliped="handleFlip" />
        </li>
      </div>
    </div>
    <div v-if="won" class="won">{{ result }}</div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import Timer from '@/components/Timer.vue'
export default {
  components: { Card, Timer },
  data() {
    return {
      cardArray: [
        {
          id: 1,
          name: "eyeemotions001",
          img: "images/blank.png",
        },
        {
          id: 2,
          name: "eyeemotions001",
          img: "images/blank.png",
        },
        {
          id: 3,
          name: "eyeemotions002",
          img: "images/blank.png",
        },
        {
          id: 4,
          name: "eyeemotions002",
          img: "images/blank.png",
        },
        {
          id: 5,
          name: "eyeemotions003",
          img: "images/blank.png",
        },
        {
          id: 6,
          name: "eyeemotions003",
          img: "images/blank.png",
        },
        {
          id: 7,
          name: "eyeemotions004",
          img: "images/blank.png",
        },
        {
          id: 8,
          name: "eyeemotions004",
          img: "images/blank.png",
        },
        {
          id: 9,
          name: "eyeemotions005",
          img: "images/blank.png",
        },
        {
          id: 10,
          name: "eyeemotions005",
          img: "images/blank.png",
        },
        {
          id: 11,
          name: "eyeemotions006",
          img: "images/blank.png",
        },
        {
          id: 12,
          name: "eyeemotions006",
          img: "images/blank.png",
        },
        {
          id: 13,
          name: "eyeemotions007",
          img: "images/blank.png",
        },
        {
          id: 14,
          name: "eyeemotions007",
          img: "images/blank.png",
        },
        {
          id: 15,
          name: "eyeemotions008",
          img: "images/blank.png",
        },
        {
          id: 16,
          name: "eyeemotions008",
          img: "images/blank.png",
        },
        {
          id: 17,
          name: "eyeemotions009",
          img: "images/blank.png",
        },
        {
          id: 18,
          name: "eyeemotions009",
          img: "images/blank.png",
        },
        {
          id: 19,
          name: "eyeemotions010",
          img: "images/blank.png",
        },
        {
          id: 20,
          name: "eyeemotions010",
          img: "images/blank.png",
        },
        {
          id: 21,
          name: "eyeemotions011",
          img: "images/blank.png",
        },
        {
          id: 22,
          name: "eyeemotions011",
          img: "images/blank.png",
        },
        {
          id: 23,
          name: "eyeemotions012",
          img: "images/blank.png",
        },
        {
          id: 24,
          name: "eyeemotions012",
          img: "images/blank.png",
        },
        {
          id: 25,
          name: "eyeemotions013",
          img: "images/blank.png",
        },
        {
          id: 26,
          name: "eyeemotions013",
          img: "images/blank.png",
        },
        {
          id: 27,
          name: "eyeemotions014",
          img: "images/blank.png",
        },
        {
          id: 28,
          name: "eyeemotions014",
          img: "images/blank.png",
        },
        {
          id: 29,
          name: "eyeemotions015",
          img: "images/blank.png",
        },
        {
          id: 30,
          name: "eyeemotions015",
          img: "images/blank.png",
        },
        {
          id: 31,
          name: "eyeemotions016",
          img: "images/blank.png",
        },
        {
          id: 32,
          name: "eyeemotions016",
          img: "images/blank.png",
        },
        {
          id: 33,
          name: "eyeemotions017",
          img: "images/blank.png",
        },
        {
          id: 34,
          name: "eyeemotions017",
          img: "images/blank.png",
        },
        {
          id: 35,
          name: "eyeemotions018",
          img: "images/blank.png",
        },
        {
          id: 36,
          name: "eyeemotions018",
          img: "images/blank.png",
        },
        {
          id: 37,
          name: "eyeemotions019",
          img: "images/blank.png",
        },
        {
          id: 38,
          name: "eyeemotions019",
          img: "images/blank.png",
        },
        {
          id: 39,
          name: "eyeemotions020",
          img: "images/blank.png",
        },
        {
          id: 40,
          name: "eyeemotions020",
          img: "images/blank.png",
        },
      ],
      isStarted: false,
      cardsChosen: [],
      cardsWon: [],
      result: 0,
      attempts: 0,
      // time: "00:00:00",
      // timeBegan: null,
      // timeStopped: null,
      // stoppedDuration: 0,
      // started: null,
      // running: false,
      // paused: false,
      won: false,
      i: 0,
      pause: false
    };
  },
  methods: {
    handleStart() {
      this.cardArray.forEach((x) => (x.img = "images/blank.png"));
      //this.cardArray.sort(() => 0.5 - Math.random())
      this.cardArray = this.cardArray
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      this.cardsWon = [];
      this.won = false;
      this.isStarted = true;
      //this.reset();
      //this.start();
    },

    handlePause() {
      this.pause = true
    },

    checkCard(array, card) {
      if (array.length) {
        const found = array.find(({ id }) => id === card.id);
        if (found) {
          return true;
        }
      }
    },

    handleFlip(card) {
      if (this.pause === true) {
        this.$refs.timer.start()
      }
      if (this.checkCard(this.cardsChosen, card)) return;
      if (this.checkCard(this.cardsWon, card)) return;
      this.cardsChosen.push(card);
      card.img = "images/" + card.name + ".png";
      this.cardArray[
        this.cardArray.findIndex((el) => el.id === card.id)
      ] = card;
      if (this.cardsChosen.length === 2) {
        this.attempts++;
        setTimeout(this.checkForMatch, 300);
      }
    },

    checkForMatch() {
      if (this.cardsChosen[0].name === this.cardsChosen[1].name) {
        this.result++;
        this.cardsWon.push(...this.cardsChosen);
      } else {
        this.cardsChosen.map((el) => (el.img = "images/blank.png"));
        // this.cardsChosen[0].img = 'images/blank.png'
        // this.cardsChosen[1].img = 'images/blank.png'
        this.cardArray[
          this.cardArray.findIndex((el) => el.id === this.cardsChosen[0].id)
        ] = this.cardsChosen[0];
        this.cardArray[
          this.cardArray.findIndex((el) => el.id === this.cardsChosen[1].id)
        ] = this.cardsChosen[1];
      }
      this.cardsChosen = [];
      if (this.cardsWon.length === this.cardArray.length) {
        this.won = true;
        this.result = "BRAVO BEŠTIJO";
        //this.isStarted = false;
        //this.stop();
        this.$refs.timer.stop()
      }
    },

/*     restart() {
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
    }, */
  },
};
</script>

<style lang="scss" scoped>
.memory {
  display: grid;
  justify-items: center;
}
#stopwatch {
  font-size: 1.5em;
  margin: 1em;
}
.stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  border: 2px solid crimson;
  border-radius: 1em;
  box-shadow: 0px 0px 5px 2px rgba(220, 20, 60, 0.75);

  p {
    margin: 0;
  }
}
h3 {
  text-transform: uppercase;
}
.won {
  font-size: 10em;
  color: crimson;
}
button {
  margin: 1em;
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
.grid {
  display: grid;
  grid-template-columns: repeat(8, auto);
  justify-content: center;

  li {
    list-style: none;
    border: 2px solid transparent;
    border-radius: 0.5em;
    //transform: rotateY(0);
    transition: all 0.5s ease;
  }

  li:hover {
    border: 2px solid crimson;
    transform: scale(1.1);
    background-color: rgba(220, 20, 60, 0.25);
    box-shadow: 0px 0px 5px 2px rgba(220, 20, 60, 0.75);
  }
}
.info-detail {
  padding: 5px;
  border-radius: 5px;
  /* border: 2px solid black; */
  text-transform: uppercase;
  margin: 0 2px;
}
.info__text {
  font-size: 1.5em;
  margin: 0;
}
</style>
