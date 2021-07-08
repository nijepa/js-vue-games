<template>
  <div
    :id="id"
    :class="square"
    :data="num"
    :style="{ color: nrcol }"
    @click="revealed"
    @contextmenu.prevent="flaged"
  >
    {{ show }}
  </div>
</template>

<script>
export default {
  name: "Square",
  props: ["square", "num", "id", "show", "nrcol"],
  data() {
    return {
      cards: this.square,
    };
  },
  methods: {
    revealed() {
      this.$emit("revealed", this.square);
    },
    flaged() {
      this.$emit("flaged", this.square);
    },
  },
};
</script>

<style lang="scss"></style>
