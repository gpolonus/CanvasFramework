<template>
  <div>
    <div class="greeting stuff">Hello Fart: {{name}}{{exclamationMarks}}</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: ['name', 'initialEnthusiasm'],
  data() {
    // alert(this.name);
    return {
      enthusiasm: this.initialEnthusiasm,
    }
  },
  methods: {
    increment() { this.enthusiasm++; },
    decrement() {
      if (this.enthusiasm > 1) {
        this.enthusiasm--;
      }
    },
  },
  computed: {
    exclamationMarks() {
      return Array(this.enthusiasm + 1).join('!');
    }
  }
});
</script>

<style lang="scss" scoped>
.greeting {
  &.stuff {
    color: blue;
  }
  font-size: 20px;
}
</style>