<template>
  <div>
    <hello-index-component/>
    <message-component :cameraHolder="cameraHolder"/>
    <canvas v-init></canvas>
  </div>
</template>

<script>

import Vue from 'vue';
import MessageComponent from './Message';
import HelloIndexComponent from './HelloIndex';
import CanvasUtil from '../utils/CanvasUtil';
import DrawingUtil from '../utils/DrawingUtil';
import DrawingStack from '../objects/DrawingStack';
import Drawer from '../objects/Drawer';
import Camera from '../objects/Camera';
import Renderer from '../objects/Renderer';

export default Vue.extend({
  // imported props from parent using component
  props: [],
  // gets called upon initialization
  data() {
    // return {camera: camera};
    let cameraResolve;
    const cameraPromise = new Promise(resolve => {
      cameraResolve = resolve;
      this.camera && resolve(this.camera);
    });
    return {
      cameraHolder: cameraPromise,
      cameraResolve: cameraResolve
    };
  },
  // methods callable from template
  methods: {
    method: () => {}
  },
  // gets called upon view render
  // computed prop to be used in template
  computed: {
    message: () => {}
  },
  directives: {
    init: {
      bind: (canvasElement, binding, {context: component}) => {
        // boilerplate for testing
        const cu = new CanvasUtil(canvasElement, {
          paneView: 'square',
          responsive: {
            refresh: () => ds.draw()
          }
        });
        // const camera = new Camera({
        const camera = new Camera({
          x: 0,
          y: 0,
          w: 1750,
          h: 1750
        });
        component.cameraResolve(camera);
        const du = new DrawingUtil(cu, camera);
        const draw = new Drawer(du);
        const ds = new DrawingStack();
        ds.push([
          () => cu.background('black'),
          draw.background,
          () => cu.rectangle(5, 5, 10, 10, 'red')
        ]);
        document.body.addEventListener('keyup', () => {
          camera.x += 20;
          camera.y += 20;
          camera.w /= 1.1;
          camera.h /= 1.1;
        });
        (new Renderer(() => ds.draw())).start();
      }
    }
  },
  components: {
    HelloIndexComponent,
    MessageComponent
  }
});
</script>

<style lang="scss" scoped>
  .data {
    position: absolute;
    top: 0px;
    left: 0px;
    color: black;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode';
  }
</style>
