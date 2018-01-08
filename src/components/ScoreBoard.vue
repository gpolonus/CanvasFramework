<template>
    <canvas class="fullscreen-canvas"></canvas>
</template>

<script>

import Vue from "vue";
import Score from "../objects/Score";
import CanvasUtil from "../utils/CanvasUtil";

export default Vue.extend({
    // imported props from parent using component
    props: [],
    // gets called upon initialization
    data() {
        console.log(this.$children);
        return {
        };
    },
    // methods callable from template
    methods: {
        
    },
    // gets called upon view render
    // computed props to be used in template
    computed: {
        
    }
});
</script>

<style lang="scss" scoped>
    .fullscreen-canvas {
        /* width: 100rem;
        height: 100rem; */
        width: 100%;
        height: 100%;
    }
</style>
