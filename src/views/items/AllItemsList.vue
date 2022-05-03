<script setup>
import PlasticService from "@/services/plastic.service";
import { config } from "@/services/config.js";
import { reactive } from "vue";

console.log(config);

const state = reactive({
  items: null,
  config: config,
});

function changeItem() {
  state.items = {};
}

PlasticService.goodsGet().then((response) => {
  console.log(response);

  state.items = response.result;
});
</script>

<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">All Items List</h1>
        <p class="lead text-muted">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don’t simply skip over it entirely.
        </p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p>
      </div>
    </div>
  </section>
  <div class="container">
    <div
      v-if="state.items"
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
    >
      <div v-for="(item, index) in state.items" :key="index" class="col">
        <div class="card shadow-sm">
          <img
            class="bd-placeholder-img card-img-top w-75 align-self-center"
            :src="
              state.config.IMAGE_URL +
                `/goods/${item.id}/` +
                item.cover.cover.replace('.', '-small.')
            "
          />

          <div class="card-body">
            <p class="card-text">
              {{ item.description_mini }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Открыть
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Добавить в корзину
                </button>
              </div>
              <small class="text-muted">от {{ item.price_minimal }} ₽</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div v-for="item in [0, 1, 2, 3, 4, 5]" :key="item" class="col">
        <div class="card shadow-sm">
          <svg
            class="bd-placeholder-img card-img-top"
            width="100%"
            height="225"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Thumbnail"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#55595c"></rect>
          </svg>

          <div class="card-body">
            <p class="card-text">
              Loading...
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  View
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Add to Cart
                </button>
              </div>
              <small class="text-muted">Price</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
