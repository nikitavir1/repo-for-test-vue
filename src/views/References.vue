<template>
  <div ref="root">This is a root element</div>
  <div ref="datefile">This is a datefile element</div>
  <button @click="showRefs">SHOW REFS</button>
  <button @click="changeDate">CHANGE DATE</button>
  <hr />
  <!-- --------------------------------------------------------------------- -->
  <div
    v-for="(item, i) in list"
    :key="item"
    :ref="
      (el) => {
        if (el) divs[i] = el;
      }
    "
  >
    {{ item }}
  </div>
  <button @click="changeItem">CHANGE ITEM</button>
</template>

<script>
import { ref, onMounted, reactive, onBeforeUpdate } from "vue";

export default {
  setup() {
    const root = ref(null);
    const cats = ref();

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log("root element value: ", root.value); // <div>This is a root element</div>
      console.log("cats element value:", cats.value);
    });

    //---------------------------------------------------------------------

    const list = reactive([1, 2, 3]);
    const divs = ref([]);

    // make sure to reset the refs before each update
    onBeforeUpdate(() => {
      divs.value = [];
      console.log(divs.value);
    });

    return {
      root,
      cats,
      list,
      divs,
    };
  },
  methods: {
    showRefs() {
      console.log(this.$refs); // <div>This is a root element</div>
    },
    changeDate() {
      var today = new Date();
      this.$refs.datefile.innerText = `DateTime now is ${today}`;
      console.log("change date:");
    },
    changeItem() {
      console.log(this.$refs);
    },
  },
};
</script>
