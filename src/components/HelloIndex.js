
import Vue from "vue";
import HelloStuffComponent from "./HelloStuff";

export default Vue.extend({
    template: `
    <div>
        Name: <input v-model="name" type="text">
        <hello-stuff-component :name="name" :initialEnthusiasm="15" />
        <!-- <hello-stuff-component :name="name" :initialEnthusiasm="7" /> -->
    </div>
    `,
    data: () => ({ name: "Dick" }),
    components: {
        HelloStuffComponent
    }
});