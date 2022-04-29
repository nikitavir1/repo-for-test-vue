<script setup>
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

let cart = [];

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

function updateCartStorage(cart_info) {
  let new_cart = [];
  for (let index in cart_info) {
    if (cart_info[index].count > 0) {
      new_cart.push(cart_info[index]);
    }
  }
  localStorage.setItem("cart", JSON.stringify(new_cart));
  return new_cart;
}

function decCount(cart_info, item_info) {
  for (let index in cart_info) {
    if (
      cart_info[index].id == item_info.id &&
      cart_info[index].article == item_info.article
    ) {
      if (cart_info[index].count > 0) {
        cart_info[index].count--;
      }

      return cart_info;
    }
  }
}

function incCount(cart_info, item_info) {
  for (let index in cart_info) {
    if (
      cart_info[index].id == item_info.id &&
      cart_info[index].article == item_info.article
    ) {
      if (cart_info[index].count < item_info.balance) {
        cart_info[index].count++;
      }
      return cart_info;
    }
  }
  cart_info.push({
    id: item_info.id,
    article: item_info.article,
    count: 1,
  });
  return cart_info;
}

function changeCount(cart_info, item_info, new_count) {
  for (let index in cart_info) {
    if (
      cart_info[index].id == item_info.id &&
      cart_info[index].article == item_info.article
    ) {
      if (new_count < 0) {
        cart_info[index] = 1;
      } else if (new_count > item_info.balance) {
        cart_info[index].count = item_info.balance;
      } else {
        cart_info[index].count = new_count;
      }
      return cart_info;
    }
  }
  if (new_count < 0) {
    cart_info.push({ id: item_info.id, article: item_info.article, count: 0 });
  } else if (new_count > item_info.balance) {
    cart_info.push({
      id: item_info.id,
      article: item_info.article,
      count: item_info.balance,
    });
  } else {
    cart_info.push({
      id: item_info.id,
      article: item_info.article,
      count: new_count,
    });
  }
  return cart_info;
}

$(document).ready(() => {
  $(document).on("click", "button", function() {
    let methodName = $(this).attr("name");
    let item = $(this)
      .closest(".catalog")
      .data();
    if (methodName == "inc-count") {
      cart = incCount(cart, item);
      cart = updateCartStorage(cart);

      console.log(cart);
    } else if (methodName == "dec-count") {
      cart = decCount(cart, item);
      cart = updateCartStorage(cart);

      console.log(cart);
    } else if (methodName == "delete-item") {
      console.log(item.index);
      cart.splice(item.index, 1);
      cart = updateCartStorage(cart);
      console.log(cart);
    } else if (methodName == "clear-cart") {
      cart = updateCartStorage([]);
      console.log(cart);
    }

    if (methodName == "open-mini-cart") {
      $("#mini-cart").show("slow");
      $(this).hide("slow");
    } else if (methodName == "close-mini-cart") {
      $("#mini-cart").hide("slow");
      $("[name=open-mini-cart]").show();
    }

    return false;
  });

  $(document).on("change", "input", function() {
    let methodName = $(this).attr("name");
    if (methodName == "change-count") {
      let item = $(this)
        .closest(".catalog")
        .data();
      $(this).val(
        $(this)
          .val()
          .toString()
          .replace(/[^0-9,.]+/g, "")
          ? $(this)
              .val()
              .toString()
              .replace(/[^0-9,.]+/g, "")
          : 0
      );
      $(this).val($(this).val() > item.balance ? item.balance : $(this).val());
      let newCount = $(this).val();

      cart = changeCount(cart, item, newCount);
      cart = updateCartStorage(cart);

      console.log(cart);
    }

    return false;
  });
});
</script>

<template>
  <div></div>
  <div></div>
  <div></div>

  <div class="jqery-test">
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-1">
          <button name="open-mini-cart" class="btn w-100 h2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart"
              style="width: 45px;height: 45px;"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div id="mini-cart" style="display:none">
      <div class="container ">
        <div class="row ">
          <div class="col">
            <button name="close-mini-cart" class="btn btn-lg btn-outline-dark">
              Закрыть корзину
              <span class="fw-bold p-1">✕</span>
            </button>
          </div>
          <div class="col d-flex justify-content-end">
            <button
              v-if="cart.length > 0"
              name="clear-cart"
              class="btn btn-lg btn-outline-danger"
            >
              Очистить корзину
            </button>
          </div>
        </div>

        <div v-if="cart.length > 0" class="justify-content-center mt-3 row">
          <div
            v-for="(item, index) in cart"
            :key="index"
            class="col-3 text-center card mx-3 my-2 catalog"
            :data-id="item.id"
            :data-article="item.article"
            :data-balance="item.balance"
            :data-index="index"
          >
            <button
              class="align-self-sm-end btn btn-close p-3"
              name="delete-item"
            ></button>
            <p class="h4">
              {{
                item.id == 1
                  ? "Мыло"
                  : item.id == 2
                  ? "Расчёска"
                  : item.id == 3
                  ? "Гель"
                  : ""
              }}
            </p>
            <p class="text-muted">Артикул: {{ item.article }}</p>
            <p class="text-muted">
              Осталось: {{ item.balance - item.count }} шт
            </p>
            <p v-if="item.count">{{ item.price }} Р x {{ item.count }} шт</p>
            <p class="h3">Всего: {{ item.price * item.count }} Р</p>
            <div class="d-flex justify-content-center fs-5 py-3 mb-4">
              <button name="dec-count" class="btn btn-outline-dark w-25">
                <span class="fw-bold h4">–</span>
              </button>
              <input
                :value="item.count"
                name="change-count"
                class="text-sm-center w-25"
              />
              <button name="inc-count" class="btn btn-outline-dark w-25">
                <span class="fw-bold h4">+</span>
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="h4 text-muted text-sm-center">Товара нет в корзине</p>
        </div>
      </div>
    </div>
    <hr />
    <div class="container">
      <div class="row ">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="col-2 text-center card mx-3 my-2 catalog"
          :data-id="item.id"
          :data-article="item.article"
          :data-balance="item.balance"
        >
          <p class="h5">
            {{
              item.id == 1
                ? "Мыло"
                : item.id == 2
                ? "Расчёска"
                : item.id == 3
                ? "Гель"
                : ""
            }}
          </p>
          <p class="text-muted">Артикул: {{ item.article }}</p>
          <p class="text-muted">Осталось: {{ item.balance - item.count }} шт</p>
          <p>{{ item.price }} Р</p>
          <div class="row">
            <button name="dec-count">
              -
            </button>
            <input :value="item.count" name="change-count" />
            <button name="inc-count">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "CheckJQuery",
  methods: {
    getCart() {
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      }
    },
    updateCount() {
      for (let i in this.items) {
        this.items[i].count = 0;
        for (let j in this.cart) {
          if (
            this.items[i].article == this.cart[j].article &&
            this.items[i].id == this.cart[j].id
          ) {
            this.items[i].count = this.cart[j].count;
            this.cart[j].balance = this.items[i].balance;
            this.cart[j].price = this.items[i].price;
          } else {
          }
        }
      }
    },
    toWatchChangeStorage() {
      var originalSetItem = localStorage.setItem;

      localStorage.setItem = function(key, value) {
        var event = new Event("itemInserted");
        event.value = value; // Optional..
        event.key = key; // Optional..
        document.dispatchEvent(event);
        originalSetItem.apply(this, arguments);
      };

      var localStorageSetHandler = (e) => {
        if (e.key == "cart") {
          setTimeout(() => {
            this.getCart();
            this.updateCount();
          }, 100);
        }
      };

      document.addEventListener("itemInserted", localStorageSetHandler, false);
    },
    check() {
      let i;
    },
  },
  mounted() {
    this.getCart();
    this.updateCount();
    this.toWatchChangeStorage();
    // localStorage.setItem("cart", JSON.stringify(this.items));
  },
  data() {
    return {
      cart: [],
      items: [
        {
          id: 1,
          article: 1,
          price: 100,
          count: 0,
          balance: 432,
        },
        {
          id: 1,
          article: 2,
          price: 125,
          count: 0,
          balance: 55,
        },
        {
          id: 1,
          article: 3,
          price: 95,
          count: 0,
          balance: 67,
        },
        {
          id: 1,
          article: 4,
          price: 150,
          count: 0,
          balance: 34,
        },
        {
          id: 2,
          article: 10,
          price: 250,
          count: 0,
          balance: 15,
        },
        {
          id: 2,
          article: 11,
          price: 350,
          count: 0,
          balance: 57,
        },
        {
          id: 2,
          article: 12,
          price: 400,
          count: 0,
          balance: 104,
        },
        {
          id: 3,
          article: 20,
          price: 600,
          count: 0,
          balance: 55,
        },
        {
          id: 3,
          article: 21,
          price: 720,
          count: 0,
          balance: 72,
        },
        {
          id: 3,
          article: 22,
          price: 780,
          count: 0,
          balance: 12,
        },
        {
          id: 3,
          article: 23,
          price: 800,
          count: 0,
          balance: 11,
        },
      ],
    };
  },
};
</script>
