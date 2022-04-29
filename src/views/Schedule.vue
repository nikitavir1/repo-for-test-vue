<script setup>
try {
  $(document).ready(() => {
    $(function() {
      // console.log("" + $("#chart").shieldChart);

      if (!$("#chart").shieldChart) {
        document.location.reload();
      } else {
        $("#chart").shieldChart({
          theme: "light",
          primaryHeader: {
            text: "Продажи автомобилей система сравнения цен на нефть",
          },
          exportOptions: {
            image: false,
            print: false,
          },
          axisY: [
            {
              min: 1,
              max: 60,
              title: {
                text: "Средняя заработная плата (тысяч долларов США)",
                style: {
                  color: "#4DB0F5",
                },
              },
              axisTickText: {
                style: {
                  color: "#4DB0F5",
                },
              },
            },
            {
              min: 1,
              max: 5,
              title: {
                text: "Цены на газ (долл./галлон)",
                style: {
                  color: "#FFC500",
                },
              },
              swapLocation: true,
              axisTickText: {
                style: {
                  color: "#FFC500",
                },
              },
            },
            {
              min: 1,
              max: 40,
              title: {
                text: "Проданных Автомобилей (В Миллионах)",
                style: {
                  color: "#FF1800",
                },
              },
              swapLocation: true,
              axisTickText: {
                style: {
                  color: "#FF1800",
                },
              },
            },
          ],
          dataSeries: [
            {
              seriesType: "line",
              axis: 0,
              collectionAlias: "Зарплата",
              data: [42.7, 52.8, 63.1, 23.5, 53, 55.8, 57.7],
            },
            {
              seriesType: "line",
              axisY: 1,
              collectionAlias: "Цены на газ (долл./галлон)",
              data: [2.75, 2.8, 2, 2.55, 2.6, 2.9, 3.05],
            },
            {
              seriesType: "line",
              axisY: 2,
              collectionAlias: "Продажи Автомобилей",
              data: [20, 22.9, 32.1, 31, 22.8, 22.4, 32.1],
            },
          ],
        });

        if (!$(".shield-container")[0]) {
          document.location.reload();
        }
      }
    });
  });
} catch (e) {
  // инструкции для обработки ошибок
  console.log(e); // передать объект исключения обработчику ошибок
}
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div id="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Schedule",
  mounted() {},
  data() {
    return {};
  },
};
</script>
