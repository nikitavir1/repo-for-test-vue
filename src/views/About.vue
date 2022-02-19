<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>
    <input v-model="valueLi" @keyup.enter="addLi" />
    <button @click="addLi">Доабвить элемент</button>
  </div>
  <div>
    <h4>Список элементов:</h4>
    <ul>
      <li v-for="(li, index) in arrayUl" :key="index">
        {{ li }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "about",
  methods: {
    addLi() {
      this.arrayUl.push(this.valueLi);
      this.valueLi = null;
    },
  },
  data() {
    return {
      valueLi: null,
      arrayUl: [],
    };
  },
};
</script>
