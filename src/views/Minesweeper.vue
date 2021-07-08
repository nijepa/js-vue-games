<template>
  <div class="game">
    <h1>Minesweeper</h1>
    <!-- The Modal -->
    <div id="myModal" class="modal" :style="{ display: displayModal }">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h1>YOU WON !!!</h1>
      </div>
    </div>

    <div class="info">
      <div class="info-detail">
        <p>💣 total</p>
        <h3 class="info__text bombs__total">{{ bombsTotal }}</h3>
      </div>
      <div class="info-detail">
        <p>💣 found</p>
        <h3 class="info__text bombs__found">{{ bombsFound }}</h3>
      </div>
      <div class="info-detail">
        <p>&numero; clicks</p>
        <h3 class="info__text clicks">{{ nrOfClicks }}</h3>
      </div>
      <div class="info-detail">
        <p>&#9634; revealed</p>
        <h3 class="info__text revealed">{{ revealed }}</h3>
      </div>
    </div>

    <Timer ref="timer" @paused="handlePause" />

    <!-- <div class="reset" @click="reset">New game</div> -->

    <div class="settings">
      <div
        class="levels"
        @click="setLevel(10)"
        :class="bombsTotal === 10 ? 'lvl__selected' : ''"
      >
        <h3>Level 1</h3>
        <h3><span class="level" id="lvl0">10</span> 💣</h3>
      </div>
      <div
        class="levels"
        @click="setLevel(15)"
        :class="bombsTotal === 15 ? 'lvl__selected' : ''"
      >
        <h3>Level 2</h3>
        <h3><span class="level" id="lvl1">15</span> 💣</h3>
      </div>
      <div
        class="levels"
        @click="setLevel(20)"
        :class="bombsTotal === 20 ? 'lvl__selected' : ''"
      >
        <h3>Level 3</h3>
        <h3><span class="level" id="lvl2">20</span> 💣</h3>
      </div>
      <div
        class="levels"
        @click="setLevel(25)"
        :class="bombsTotal === 25 ? 'lvl__selected' : ''"
      >
        <h3>Level 4</h3>
        <h3><span class="level" id="lvl3">25</span> 💣</h3>
      </div>
      <div
        class="levels"
        @click="setLevel(30)"
        :class="bombsTotal === 30 ? 'lvl__selected' : ''"
      >
        <h3>Level 5</h3>
        <h3><span class="level" id="lvl4">30</span> 💣</h3>
      </div>
    </div>

    <div class="grid">
      <li v-for="(square, index) in squares" :key="index">
        <Square
          :square="square.type"
          :num="square.data"
          :id="square.id"
          :show="square.show"
          :nrcol="square.nrcol"
          @revealed="squareClicked(square)"
          @flaged="setFlag(square)"
        />
      </li>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Square from "@/components/Square";
import Timer from "@/components/Timer.vue";

export default {
  name: "Minesweeper",

  components: { Square, Timer },

  data() {
    return {
      bombsTotal: 0,
      bombsFound: 0,
      nrOfClicks: 0,
      revealed: 0,
      width: 10,
      bombAmount: 10,
      nrClicks: 0,
      flags: 0,
      squaresRevealed: 0,
      isGameOver: false,
      squares: [],
      displayModal: "none",
      pause: false
    };
  },

  methods: {
    handlePause() {
      this.pause = true
    },

    createBoard() {
      let bombsArray = [];
      let emptyArray = [];
      let gameArray = [];

      bombsArray = Array(this.bombAmount)
        .fill(null)
        .map(() => ({ type: "bomb" }));
      emptyArray = Array(this.width * this.width - this.bombAmount)
        .fill(null)
        .map(() => ({
          type: "valid",
          data: 0,
        }));
      gameArray = emptyArray.concat(bombsArray);

      this.squares = gameArray
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

      for (let i = 0; i < this.squares.length; i++) {
        this.squares[i].id = i;
      }
    },

    setLevel(nr) {
      this.clearBoard();
      this.setInfo();
      this.bombAmount = nr;
      this.bombsTotal = nr;
      this.createBoard();
      this.addNumbers();
      this.$refs.timer.handleStart();
    },

    setFlag(square) {
      this.addFlag(square);
    },

    addFlag(square) {
      if (this.isGameOver) return;
      if (square.type !== "checked" && this.flags < this.bombAmount) {
        if (square.type !== "flag") {
          /*           if (square.type === 'bomb') {
            square.type = 'bomb flag'
          } else {
            square.type = "flag";
          } */
          square.type = "flag";
          square.show = "🚩";
          this.flags++;
          this.checkForWin();
        } else {
          //square.classList.remove("flag");
          square.show = "";
          square.type = "";
          this.flags--;
        }
      }
      this.bombsFound = this.flags;
    },

    addNumbers() {
      for (let i = 0; i < this.squares.length; i++) {
        let total = 0;
        const isLeftEdge = i % this.width === 0;
        const isRightEdge = i % this.width === this.width - 1;

        if (this.squares[i].type === "valid") {
          if (i > 0 && !isLeftEdge && this.squares[i - 1].type === "bomb")
            total++;
          if (
            i > 9 &&
            !isRightEdge &&
            this.squares[i + 1 - this.width].type === "bomb"
          )
            total++;
          if (i > 9 && this.squares[i - this.width].type === "bomb") total++;
          if (
            i > 10 &&
            !isLeftEdge &&
            this.squares[i - 1 - this.width].type === "bomb"
          )
            total++;
          if (i < 99 && !isRightEdge && this.squares[i + 1].type === "bomb")
            total++;
          if (
            i < 90 &&
            !isLeftEdge &&
            this.squares[i - 1 + this.width].type === "bomb"
          )
            total++;
          if (
            i < 89 &&
            !isRightEdge &&
            this.squares[i + 1 + this.width].type === "bomb"
          )
            total++;
          if (i < 90 && this.squares[i + this.width].type === "bomb") total++;

          this.squares[i].data = total;
        }
      }
    },

    squareClicked(square) {
      this.nrOfClicks++;
      console.log(this.pause)
      if (this.pause === true) {
        this.$refs.timer.start()
      }
      this.squareClick(square);
    },

    squareClick(square) {
      let currentId = square.id;
      if (this.isGameOver) return;
      if (square.type === "checked" || square.type === "flag") return;
      if (square.type === "bomb") {
        this.gameOver(square);
      } else {
        this.squareReveal();
        let total = parseInt(square.data); //square.getAttribute("data");
        if (total !== 0) {
          square.type = "checked";
          this.setColor(square, total);
          return;
        }
        this.checkSquare(currentId);
      }
      square.type = "checked";
    },

    // check neighboring squares once square is clicked
    checkSquare(currentId) {
      const isLeftEdge = currentId % this.width === 0;
      const isRightEdge = currentId % this.width === this.width - 1;

      setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
          const newId = this.squares[parseInt(currentId) - 1].id;
          this.setSquare(newId);
        }
        if (currentId > 9 && !isRightEdge) {
          const newId = this.squares[parseInt(currentId) + 1 - this.width].id;
          this.setSquare(newId);
        }
        if (currentId > 10) {
          const newId = this.squares[parseInt(currentId) - this.width].id;
          this.setSquare(newId);
        }
        if (currentId > 11 && !isLeftEdge) {
          const newId = this.squares[parseInt(currentId) - 1 - this.width].id;
          this.setSquare(newId);
        }
        if (currentId < 99 && !isRightEdge) {
          const newId = this.squares[parseInt(currentId) + 1].id;
          this.setSquare(newId);
        }
        if (currentId < 90 && !isLeftEdge) {
          const newId = this.squares[parseInt(currentId) - 1 + this.width].id;
          this.setSquare(newId);
        }
        if (currentId < 88 && !isRightEdge) {
          const newId = this.squares[parseInt(currentId) + 1 + this.width].id;
          this.setSquare(newId);
        }
        if (currentId < 89) {
          const newId = this.squares[parseInt(currentId) + this.width].id;
          this.setSquare(newId);
        }
      }, 10);
    },

    setSquare(newId) {
      const newSquare = this.squares.find((s) => s.id === newId);
      this.squareClick(newSquare);
    },

    squareReveal() {
      this.squaresRevealed++;
      this.revealed = this.squaresRevealed;
      if (
        parseInt(this.squaresRevealed) ===
        parseInt(this.width * this.width - this.bombAmount)
      ) {
        this.isGameOver = true;
        console.log("finito", this.squaresRevealed);
        this.endGame();
        return;
      }
    },

    gameOver() {
      console.log("BUUM!!! Game is over!");
      this.isGameOver = true;

      // show all the bombs
      this.squares.forEach((square) => {
        if (square.type === "bomb") {
          square.show = "💣";
        }
      });
      this.$refs.timer.stop();
    },

    checkForWin() {
      let matches = 0;
      console.log(matches);
      for (let i = 0; i < this.squares.length; i++) {
        if (
          this.squares[i].type === "flag" &&
          this.squares[i].type === "bomb"
        ) {
          matches++;
        }
        if (matches === parseInt(this.bombAmount)) {
          console.log("WIN!!!");
          this.endGame();
          this.isGameOver = true;
        }
      }
    },

    setColor(square, total) {
      let numColor = "black";
      switch (total) {
        case 2:
          numColor = "#b32626";
          break;
        case 3:
          numColor = "#cc1ea1";
          break;
        case 4:
          numColor = "#6710b8";
          break;
        case 5:
          numColor = "#25259e";
          break;
        case 6:
          numColor = "#1a920f";
          break;
        default:
          numColor = "#c98b06";
      }
      square.nrcol = numColor;
      square.show = total;
    },

    clearBoard() {
      this.nrClicks = 0;
      this.width = 10;
      this.bombAmount = 10;
      this.flags = 0;
      this.squares = [];
      this.squaresRevealed = 0;
      this.isGameOver = false;
    },

    reset() {
      this.clearBoard();
      this.setInfo();
      this.createBoard();
      this.addNumbers();
    },

    setInfo() {
      this.nrOfClicks = 0;
      this.bombsTotal = this.bombAmount;
      this.bombsFound = 0;
      this.revealed = 0;
    },

    endGame() {
      this.displayModal = "block";
      this.$refs.timer.stop();
    },

    closeModal() {
      this.displayModal = "none";
    },
  },

  setup() {
    //const grid = document.querySelector(".grid1");
    //console.log(grid)
    const bombsTotal = ref(30);
    const bombsFound = ref(0);
    const nrOfClicks = ref(0);
    const revealed = ref(0);
    //const bombsTotal = document.querySelector(".bombs__total");
    //const bombsFound = document.querySelector(".bombs__found");
    //const nrOfClicks = document.querySelector(".clicks");
    //const revealed = document.querySelector(".revealed");

    //let nrClicks = 0;
    let width = 10;
    let bombAmount = 30;
    //let flags = 0;
    let squares = [];
    let squaresRevealed = 0;
    let isGameOver = false;

    // get shuffle game array with random bombs
    //let bombsArray = [];
    //let emptyArray = [];
    //let gameArray = [];
    //let shuffledArray =  []
    //let squaresArray = computed(() => shuffledArray)
    //const squ = ref(shuffledArray)
    //shuffledArray = gameArray
    //.map((a) => ({ sort: Math.random(), value: a }))
    // .sort((a, b) => a.sort - b.sort)
    //  .map((a) => a.value);

    // create board
    const createBoard = () => {
      console.log("uzzz");
      //bombsArray = []
      //emptyArray = []
      //gameArray = []
      //shuffledArray = []
      /*       bombsArray = Array(bombAmount).fill({ type: "bomb", data: 0 });
      emptyArray = Array(width * width - bombAmount).fill({
        type: "valid", data: 0
      }); */
      //gameArray = emptyArray.concat(bombsArray);
      /*       shuffledArray = gameArray
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value); */
      /*     for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      // normal click
      square.addEventListener("click", function () {
        click(square);
        if (!isGameOver) {
          nrClicks++;
          nrOfClicks.innerHTML = nrClicks;
        }
      });

      // right click
      square.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(square);
      };*/
    };

    createLevels();
    // create levels
    function createLevels() {
      const lvls = document.getElementsByClassName("levels");
      for (let i = 0; i < lvls.length; i++) {
        setBombs(lvls[i], i);
      }
    }
    setInfo();

    // set bombs
    function setBombs(lvl, i) {
      const lvlType = document.getElementById("lvl" + i);
      lvl.addEventListener("click", () => {
        bombAmount = parseInt(lvlType.innerHTML);
        setLevel(lvl);
      });
    }

    // set level
    const setLevel = (lvl) => {
      const lvls = document.getElementsByClassName("levels");
      for (let i = 0; i < lvls.length; i++) {
        lvls[i].classList.remove("lvl__selected");
      }
      lvl.classList.add("lvl__selected");
      for (let i = 0; i < width * width; i++) {
        document.getElementById(i).remove();
      }
      //nrClicks = 0;
      width = 10;
      //bombAmount = 30;
      //flags = 0;
      squares = [];
      squaresRevealed = 0;
      isGameOver = false;
      nrOfClicks.value = 0;
      bombsTotal.value = bombAmount;
      bombsFound.value = 0;
      revealed.value = 0;
      createBoard();
    };

    // add numbers
    /*     const addNumbers = () => {
      for (let i = 0; i < shuffledArray.length; i++) {
        let total = 0;
        const isLeftEdge = i % width === 0;
        const isRightEdge = i % width === width - 1;

        if (shuffledArray[i].type === "valid") {
          if (i > 0 && !isLeftEdge && shuffledArray[i - 1].type === "bomb")
            total++;
          if (
            i > 9 &&
            !isRightEdge &&
            shuffledArray[i + 1 - width].type === "bomb"
          )
            total++;
          if (i > 10 && shuffledArray[i - width].type === "bomb") total++;
          if (
            i > 11 &&
            !isLeftEdge &&
            shuffledArray[i - 1 - width].type === "bomb"
          )
            total++;
          if (i < 98 && !isRightEdge && shuffledArray[i + 1].type === "bomb")
            total++;
          if (
            i < 90 &&
            !isLeftEdge &&
            shuffledArray[i - 1 + width].type === "bomb"
          )
            total++;
          if (
            i < 88 &&
            !isRightEdge &&
            shuffledArray[i + 1 + width].type === "bomb"
          )
            total++;
          if (i < 89 && shuffledArray[i + width].type === "bomb") total++;
          console.log(i, total);
          shuffledArray[i].data = total;
        }
      }
    }; */
    //};

    //createBoard();

    // add flag with right click
    /*   function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains("checked") && flags < bombAmount) {
      if (!square.classList.contains("flag")) {
        square.classList.add("flag");
        square.innerHTML = "🚩";
        flags++;
        checkForWin();
      } else {
        square.classList.remove("flag");
        square.innerHTML = "";
        flags--;
      }
    }
    bombsFound.innerHTML = flags;
  } */

    // set number color
    function setColor(square, total) {
      let numColor = "black";
      switch (total) {
        case "2":
          numColor = "#b32626";
          break;
        case "3":
          numColor = "#cc1ea1";
          break;
        case "4":
          numColor = "#6710b8";
          break;
        case "5":
          numColor = "#25259e";
          break;
        case "6":
          numColor = "#1a920f";
          break;
        default:
          numColor = "#c98b06";
      }
      square.style.color = numColor;
      //square.innerHTML = total;
    }

    // click on square actions
    function click(square) {
      let currentId = square.id;
      if (isGameOver) return;
      if (square === "checked" || square === "flag") return;
      if (square === "bomb") {
        gameOver(square);
      } else {
        squareReveal();
        console.log(square);
        let total = 0; //square.getAttribute("data");
        if (total != 0) {
          square.classList.add("checked");
          setColor(square, total);
          return;
        }
        checkSquare(currentId);
      }
      square = "checked";
    }

    function setSquare(newId) {
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }

    // check neighboring squares once square is clicked
    function checkSquare(currentId) {
      const isLeftEdge = currentId % width === 0;
      const isRightEdge = currentId % width === width - 1;

      setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) - 1].id;
          setSquare(newId);
        }
        if (currentId > 9 && !isRightEdge) {
          const newId = squares[parseInt(currentId) + 1 - width].id;
          setSquare(newId);
        }
        if (currentId > 10) {
          const newId = squares[parseInt(currentId) - width].id;
          setSquare(newId);
        }
        if (currentId > 11 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) - 1 - width].id;
          setSquare(newId);
        }
        if (currentId < 98 && !isRightEdge) {
          const newId = squares[parseInt(currentId) + 1].id;
          setSquare(newId);
        }
        if (currentId < 90 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) - 1 + width].id;
          setSquare(newId);
        }
        if (currentId < 88 && !isRightEdge) {
          const newId = squares[parseInt(currentId) + 1 + width].id;
          setSquare(newId);
        }
        if (currentId < 89) {
          const newId = squares[parseInt(currentId) + width].id;
          setSquare(newId);
        }
      }, 10);
    }

    // game over
    function gameOver() {
      console.log("BUUM!!! Game is over!");
      isGameOver = true;

      // show all the bombs
      squares.forEach((square) => {
        if (square.classList.contains("bomb")) {
          //square.innerHTML = "💣";
        }
      });
    }

    //check for win
    /*   function checkForWin() {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains("flag") &&
        squares[i].classList.contains("bomb")
      ) {
        matches++;
      }
      if (matches === bombAmount) {
        console.log("WIN!!!");
        endGame();
        isGameOver = true;
      }
    }
  } */

    // reveal square
    function squareReveal() {
      squaresRevealed++;
      //revealed.innerHTML = squaresRevealed;
      if (squaresRevealed === width * width - bombAmount) {
        isGameOver = true;
        console.log("finito", squaresRevealed);
        endGame();
        return;
      }
    }

    /*     const reset = async () => {
           for (let i = 0; i < width * width; i++) {
      document.getElementById(i).remove();
    } 
      //nrClicks = 0;
      width = 10;
      //bombAmount = 30;
      //flags = 0;
      squares = [];
      squaresRevealed = 0;
      isGameOver = false;
      setInfo();
      await createBoard();
      addNumbers();
    }; */
    /*   const btnr = document.querySelector(".reset");
  btnr.addEventListener("click", () => {
    for (let i = 0; i < width * width; i++) {
      document.getElementById(i).remove();
    }
    nrClicks = 0;
    width = 10;
    //bombAmount = 30;
    flags = 0;
    squares = [];
    squaresRevealed = 0;
    isGameOver = false;
    setInfo();
    createBoard();
  }); */

    function setInfo() {
      //nrOfClicks.innerHTML = 0;
      //bombsTotal.innerHTML = bombAmount;
      //bombsFound.innerHTML = 0;
      //revealed.innerHTML = 0;
    }

    function endGame() {
      modal.style.display = "block";
    }

    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    //const span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    /*     const closeModal = () => {
      modal.style.display = "none";
    }; */
    /*   span.onclick = function () {
    modal.style.display = "none";
  }; */

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    /*     const squareClick = (square) => {
      click(square);
    }; */

    return {};
  },
};
</script>

<style scoped>
.game {
  display: grid;
  justify-items: center;
}

.grid {
  height: 600px;
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  /* background-color: rgba(220, 20, 60, 0.35); */
  margin-top: 1em;
  /* box-shadow: inset 0 0 8px rgb(47, 50, 255);  */
}

.grid::after {
  border: 5px solid black;
}

.grid li {
  list-style: none;
}

.grid div {
  display: grid;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 0.5em;
  /* border: 2px solid gainsboro;  */
  text-align: center;
  box-shadow: inset 0 0 4px rgba(220, 20, 60, 0.75);
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
}

.grid div:hover {
  background-color: rgba(220, 20, 60, 0.75);
}

.checked {
  background-color: rgba(220, 20, 60, 0.25);
}

.bomb {
  /* background-color: #1a920f;  */
}

.reset {
  margin: 1em;
  padding: 1em;
  background-color: rgba(220, 20, 60, 0.35);
  text-transform: uppercase;
  font-size: 1.2em;
  font-family: "Gugi", cursive;
  border: 2px solid transparent;
  border-radius: 1em;
  box-shadow: 0px 0px 5px 2px rgba(220, 20, 60, 0.75);
  cursor: pointer;
  transition: all 0.4s ease;
}
.reset:hover {
  background-color: rgba(220, 20, 60, 075);
  color: whitesmoke;
  border: 2px solid crimson;
}

.info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  border: 2px solid crimson;
  border-radius: 1em;
  box-shadow: 0px 0px 5px 2px rgba(220, 20, 60, 0.75);
}

.info-detail {
  padding: 5px;
  border-radius: 5px;
  /* border: 2px solid black; */
  text-transform: uppercase;
  margin: 0 2px;
}

.info-detail p {
  margin: 0;
}

.info__text {
  font-size: 1.5em;
  margin: 0;
}

.settings {
  margin-top: 1em;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
}

/* .levels {
  padding: 5px;
  margin: 0 5px;
  border: 2px solid blueviolet;
  border-radius: 5px;
  background-color: rgb(172, 109, 231);
  font-size: 12px;
  box-shadow: inset 0 0 10px rgb(47, 50, 255);
  cursor: pointer;
  text-align: center;
}

.levels:hover {
  background-color: rgb(208, 179, 235);
} */

.levels {
  margin: 0.5em;
  padding: 0.5em 1em;
  background-color: rgba(220, 20, 60, 0.35);
  text-transform: uppercase;
  font-size: 1em;
  font-family: "Gugi", cursive;
  border: 2px solid transparent;
  border-radius: 1em;
  box-shadow: 0px 0px 5px 2px rgba(220, 20, 60, 0.75);
  cursor: pointer;
  transition: all 0.4s ease;
}
.levels:hover {
  background-color: rgba(220, 20, 60, 075);
  color: whitesmoke;
  border: 2px solid crimson;
}

.lvl__selected {
  background-color: rgba(220, 20, 60, 075);
  color: whitesmoke;
  box-shadow: inset 0 0 10px rgba(220, 20, 60, 0.15);
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.8s;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
</style>
