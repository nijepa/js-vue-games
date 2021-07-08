<template>
  <div class="card" @click="flip">
    <img :src="require('../assets/' + card.img)" alt="" />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["card"],
  data() {
    return {
      cards: this.card,
    };
  },
  methods: {
    flip() {
      this.$emit("fliped", this.card);
    },
  },
};
</script>

<style lang="scss">
.card {
  img {
    width: 130px;
    height: 130px;
    cursor: pointer;
  }
}
</style>
