<script setup>
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

$(document).ready(() => {
  $(document).on("click", "button", function() {
    let buttonName = $(this).attr("name");
    console.log(
      $(this)
        .closest(".catalog")
        .data()
    );
    if (buttonName == "inc-count-catalog") {
      console.log("увеличить");
    } else if (buttonName == "dec-count-catalog") {
      console.log("уменьшить");
    } else if (buttonName == "open-mini-cart") {
      $("#mini-cart").show("slow");
      $(this).hide("slow");
    } else if (buttonName == "close-mini-cart") {
      $("#mini-cart").hide("slow");
      $("[name=open-mini-cart]").show();
    }

    // $(this).fadeOut(1000);
    return false;
  });
  // $("button").click((e) => {
  //   console.log(e);
  //   console.log(e.attr(""));
  //   let buttomInfo = { ...e.currentTarget.__vnode.props };
  //   if (buttomInfo.name == "dec-count-catalog") {
  //     console.log("уменьшить");
  //   } else if (buttomInfo.name == "inc-count-catalog") {
  //     console.log("увеличить");
  //   } else if (buttomInfo.name == "open-mini-cart") {
  //     console.log("asddasas");
  //     $("#mini-cart").show("slow");
  //   } else if (buttomInfo.name == "close-mini-cart") {
  //     console.log("asddasas");
  //     $("#mini-cart").hide("slow");
  //   }
  // });

  $("input").change((e) => {
    let buttomInfo = { ...e.currentTarget.__vnode.props };
    if (buttomInfo.name == "change-count") {
      console.log("изменить");
    }
  });

  $("#p1").hover(
    function() {
      console.log("You entered p1!");
    },
    function() {
      console.log("Bye! You now leave p1!");
    }
  );

  $("#dec").click(() => {
    console.log("ADD");
  });
});
</script>

<template>
  <div class="jqery-test">
    <h2>This is a heading</h2>

    <p>This is a paragraph.</p>
    <p>This is another paragraph.</p>

    <button class="btn btn-success">Click me</button>

    <button class="btn btn-danger">Click me 2</button>
    <hr />
    <p id="p1">This is a paragraph.</p>
    <hr />

    <hr />
    <button name="open-mini-cart">Открыть мини корзину</button>
    <div id="mini-cart" style="display:none">
      <button name="close-mini-cart">Закрыть корзину</button>
      adsads
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
          <p>{{ item.price }} Р</p>
          <div class="row">
            <button name="dec-count-catalog">
              -
            </button>
            <input :value="item.count" name="change-count-catalog" />
            <button name="inc-count-catalog">
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
    check() {
      let i;
    },
  },
  mounted() {
    // localStorage.setItem("cart", JSON.stringify(this.items));
  },
  data() {
    return {
      items: [
        {
          id: 1,
          article: 1,
          price: 100,
          count: 0,
        },
        {
          id: 1,
          article: 2,
          price: 125,
          count: 0,
        },
        {
          id: 1,
          article: 3,
          price: 95,
          count: 0,
        },
        {
          id: 1,
          article: 4,
          price: 150,
          count: 0,
        },
        {
          id: 2,
          article: 10,
          price: 250,
          count: 0,
        },
        {
          id: 2,
          article: 11,
          price: 350,
          count: 0,
        },
        {
          id: 2,
          article: 12,
          price: 400,
          count: 0,
        },
        {
          id: 3,
          article: 20,
          price: 600,
          count: 0,
        },
        {
          id: 3,
          article: 21,
          price: 720,
          count: 0,
        },
        {
          id: 3,
          article: 22,
          price: 780,
          count: 0,
        },
        {
          id: 3,
          article: 23,
          price: 800,
          count: 0,
        },
      ],
    };
  },
};
</script>
