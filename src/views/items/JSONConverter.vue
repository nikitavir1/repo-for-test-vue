<template>
  <div class="ms-5">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-3">NAME</div>
      <div class="col-4">INFO</div>
      <div class="col-1"></div>
    </div>

    <hr class="hr" />

    <div v-for="(item, key) in items" :key="key" class="row">
      <div class="col-1"></div>
      <div class="col-3">
        <input class="form-control mt-3" v-model="item.name" />
      </div>
      <div class="col-4">
        <template v-for="(block, index) in item.blocks" :key="index">
          <div class="d-flex">
            <textarea class="form-control mt-3" v-model="item.blocks[index]" />

            <div class="ms-3 mt-3">
              <button @click="deleteBlock(key, index)" class="btn btn-danger ">
                <span class="plus-button ">-</span>
              </button>
            </div>
          </div>

          <div v-if="index + 1 === item?.blocks?.length" class="mt-3">
            <button @click="addBlock(key, index)" class="btn btn-primary ">
              <span class="plus-button ">+</span>
            </button>
          </div>
        </template>
      </div>

      <div class="row d-flex justify-content-center mt-3 ">
        <hr class="hr col-11" />
      </div>

      <div v-if="key + 1 === items?.length">
        <button @click="addItem()" class=" ms-4 btn btn-secondary ">
          <span class="plus-button ">+</span>
        </button>
      </div>
    </div>

    <hr class="hr" />

    <pre>{{ makeJSON }}</pre>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "about",

  setup() {
    const items = ref([
      {
        name: "block_0",
        blocks: [""],
      },
    ]);

    const addItem = () => {
      items.value.push({
        name: `block_${items.value.length}`,
        blocks: [""],
      });
    };

    const deleteBlock = (key, indexBlock) => {
      delete items.value[key].blocks.splice(indexBlock, 1);
    };

    const addBlock = (key, indexBlock) => {
      console.log("items[key]", items.value[key].blocks);
      items.value[key].blocks.push("");
      //   items[key].blocks.push("");
    };

    const makeJSON = computed(() => {
      let JSONObj = {};

      for (let index in items.value) {
        const currentItem = items.value[index];

        JSONObj[currentItem.name] = [];

        let obj = {};

        for (let indexB in currentItem.blocks) {
          obj["text" + (Number(indexB) + 1)] = currentItem.blocks[indexB];
        }

        JSONObj[currentItem.name].push(obj);
      }

      return JSONObj;
    });

    return {
      items,
      addBlock,
      deleteBlock,
      addItem,

      makeJSON,
    };
  },
};
</script>

<style scoped>
.plus-button {
  font-size: 28px;
  padding-left: 9px;
  padding-right: 9px;
}
</style>
