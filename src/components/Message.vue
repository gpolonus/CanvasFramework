<template>
  <div>
    <p class="lvl-0">Dimesions:</p>
    <p class="lvl-1">x: {{camera.x}}</p>
    <p class="lvl-1">y: {{camera.y}}</p>
    <p class="lvl-1">w: {{camera.w}}</p>
    <p class="lvl-1">h: {{camera.h}}</p>
  </div>
</template>

<script>

import Vue from "vue";
import Camera from "../objects/Camera";

export default Vue.extend({
  // imported props from parent using component
  props: ['cameraHolder'],
  // gets called upon initialization
  data() {
    // camera = this.cameraHolder ? this.cameraHolder.camera : {};
    this.cameraHolder.then(camera => {
      this.camera = camera;
    });
    return {
      camera: new Camera()
    };
  },
  // gets called upon view render
  // computed prop to be used in template
  computed: {
    prop: () => {}
  }
});
</script>

<style lang="scss" scoped>
  .lvl-1 {
    margin-left: 20px;
  }
</style>
