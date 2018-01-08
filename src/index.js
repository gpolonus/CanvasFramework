
import Vue from "vue";
import ScoreBoardComponent from "./components/ScoreBoard";
import Sand from "./components/Sand";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <component :is="currentComponent"></component>
    </div>
    `,
    data: () => ({ currentComponent: Sand }),
    components: {
        ScoreBoardComponent,
        Sand
    }
});