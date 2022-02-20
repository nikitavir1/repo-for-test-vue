<template>
  <div class="bg-light py-4">
    <h1 class="py-3 text-center">Калькулятор авто</h1>
    <div class="d-flex justify-content-between container my-3">
      <div class="col-3 row">
        <label>Дата начала</label>
        <input v-model="dateStart" class="form-control w-75" type="date" />
      </div>
      <div class="col-3 row">
        <label>Дата конца</label>
        <input v-model="dateEnd" class="form-control w-75" type="date" />
      </div>
      <div class="col-3 row">
        <label>Желаемая машина</label>
        <select v-model="selectedAuto" class="form-select mt-3 w-75">
          <option disabled selected>Выберите авто</option>
          <option v-for="(auto, index) in autos" :key="index" :value="auto">
            {{ auto.name }}
          </option>
        </select>
      </div>
      <div class="col-3 d-grid">
        <button
          @click.prevent="calculateSum(selectedAuto)"
          class="btn btn-outline-dark mb-2"
        >
          Расчитать
        </button>
        <button class="btn btn-secondary" @click.prevent="setInfoAboutAllAuto">
          Расчитать все машины
        </button>
      </div>
    </div>
    <transition name="fade">
      <table v-if="showAllAutos.length > 0" class="table mt-3 container">
        <thead>
          <tr>
            <th scope="col">Наимнование марки</th>
            <th scope="col">Общая сумма</th>
            <th scope="col">Количество дней</th>
            <th scope="col">(рублей/сутки)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="auto in showAllAutos" :key="auto">
            <td>{{ auto.name }}</td>
            <td>{{ Number(auto.sum).toLocaleString() }} руб.</td>
            <td>{{ auto.days }}</td>
            <td>
              {{ Number(auto.sumPerDay.toFixed(2)).toLocaleString() }}
              (руб./сут.)
            </td>
          </tr>
        </tbody>
      </table>
    </transition>
  </div>
</template>

<script>
Date.prototype.daysInMonth = function() {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

export default {
  name: "Auto",
  methods: {
    calculateSum(auto) {
      let startDay = {
        year: new Date(this.dateStart).getFullYear(),
        month: new Date(this.dateStart).getMonth() + 1,
        day: new Date(this.dateStart).getDate(),
      };
      let endDay = {
        year: new Date(this.dateEnd).getFullYear(),
        month: new Date(this.dateEnd).getMonth() + 1,
        day: new Date(this.dateEnd).getDate(),
      };
      let countDays =
        (new Date(this.dateEnd).getTime() -
          new Date(this.dateStart).getTime()) /
          (60 * 60 * 24 * 1000) +
        1;
      let rate = 0;
      if (countDays > 0 && countDays < 3) rate = 0;
      else if (countDays >= 3 && countDays < 7) rate = 1;
      else if (countDays >= 7 && countDays < 15) rate = 2;
      else if (countDays >= 15 && countDays < 26) rate = 3;
      else if (countDays >= 26) rate = 4;
      let objYearsCalc = {};
      let calendarOfDays = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31,
      };
      let seasonId = 0;

      for (let year = startDay.year; year <= endDay.year; year++) {
        //високосный или нет
        if (this.isLeapYear(year)) calendarOfDays[2] = 29;
        else calendarOfDays[2] = 28;
        //количество сезонов(периодов)
        objYearsCalc[year] = { season: [] };
        for (let i = 0; i < Object.keys(this.seasons).length; i++) {
          objYearsCalc[year].season.push(0);
        }
        if (year == endDay.year && startDay.year == endDay.year) {
          for (let month = startDay.month; month <= endDay.month; month++) {
            if (month == endDay.month && startDay.month == endDay.month) {
              for (let day = startDay.day; day <= endDay.day; day++) {
                seasonId = this.chooseSeason(month, day);
                objYearsCalc[year].season[seasonId]++;
              }
            } else if (month == startDay.month) {
              for (
                let day = startDay.day;
                day <= calendarOfDays[month];
                day++
              ) {
                seasonId = this.chooseSeason(month, day);
                objYearsCalc[year].season[seasonId]++;
              }
            } else if (month == endDay.month) {
              for (let day = 1; day <= endDay.day; day++) {
                seasonId = this.chooseSeason(month, day);
                objYearsCalc[year].season[seasonId]++;
              }
            } else {
              for (let day = 1; day <= calendarOfDays[month]; day++) {
                seasonId = this.chooseSeason(month, day);
                objYearsCalc[year].season[seasonId]++;
              }
            }
          }
        } else if (endDay.year - startDay.year >= 1) {
          if (year == startDay.year) {
            for (let month = startDay.month; month <= 12; month++) {
              if (month == startDay.month) {
                for (
                  let day = startDay.day;
                  day <= calendarOfDays[month];
                  day++
                ) {
                  seasonId = this.chooseSeason(month, day);
                  objYearsCalc[year].season[seasonId]++;
                }
              } else {
                for (let day = 1; day <= calendarOfDays[month]; day++) {
                  seasonId = this.chooseSeason(month, day);
                  objYearsCalc[year].season[seasonId]++;
                }
              }
            }
          } else if (year == endDay.year) {
            for (let month = 1; month <= endDay.month; month++) {
              if (month == endDay.month) {
                for (let day = 1; day <= endDay.day; day++) {
                  seasonId = this.chooseSeason(month, day);
                  objYearsCalc[year].season[seasonId]++;
                }
              } else {
                for (let day = 1; day <= calendarOfDays[month]; day++) {
                  seasonId = this.chooseSeason(month, day);
                  objYearsCalc[year].season[seasonId]++;
                }
              }
            }
          } else {
            for (let month = 1; month <= 12; month++) {
              for (let day = 1; day <= calendarOfDays[month]; day++) {
                seasonId = this.chooseSeason(month, day);
                objYearsCalc[year].season[seasonId]++;
              }
            }
          }
        }
      }

      let finalSum = 0;
      let days = 0;
      for (let year in objYearsCalc) {
        objYearsCalc[year].season.forEach((seasonDays, seasonId) => {
          finalSum = auto.prices[seasonId + 1][rate] * seasonDays;
          days += seasonDays;
        });
        console.log(
          "Год:",
          year,
          ", тариф:",
          rate,
          ", сезоны: ",
          objYearsCalc[year].season
        );
      }
      console.log("finalSum", finalSum);

      return { finalSum, days };
    },
    isLeapYear(year) {
      return year % 4 === 0;
    },
    chooseSeason(month, day) {
      let now = this.convertToDay(
        `${month < 10 ? "0" + String(month) : String(month)}.${
          day < 10 ? "0" + String(day) : String(day)
        }`
      );
      for (let id in this.seasonsInDays) {
        if (this.seasonsInDays[id].start < this.seasonsInDays[id].end) {
          if (
            now >= this.seasonsInDays[id].start &&
            now <= this.seasonsInDays[id].end
          ) {
            return id - 1;
          }
        } else {
          if (
            (now >= this.seasonsInDays[id].start && now <= 365) ||
            (now >= 1 && now <= this.seasonsInDays[id].end)
          ) {
            return id - 1;
          }
        }
      }
    },
    setSeasonsDay() {
      for (let id in this.seasons) {
        this.seasonsInDays[id] = {
          start: this.convertToDay(
            `${this.seasons[id].start.split(".")[1]}.${
              this.seasons[id].start.split(".")[0]
            }`
          ),
          end: this.convertToDay(
            `${this.seasons[id].end.split(".")[1]}.${
              this.seasons[id].end.split(".")[0]
            }`
          ),
        };
      }
    },
    convertToDay(date) {
      let now = new Date(String(date));
      let start = new Date(now.getFullYear(), 0, 0);
      return Math.floor((now - start) / (1000 * 60 * 60 * 24));
    },
    setInfoAboutAllAuto() {
      this.showAllAutos = [];
      setTimeout(() => {
        for (let autoId in this.autos) {
          let cals = this.calculateSum(this.autos[autoId]);
          this.showAllAutos.push({
            name: this.autos[autoId].name,
            sum: cals.finalSum,
            days: cals.days,
            sumPerDay: Number(cals.finalSum / cals.days),
          });
        }
      }, 500);
    },
  },
  mounted() {
    this.setSeasonsDay();
    console.log("daysInMonth:", new Date("01.06").daysInMonth());
  },
  data() {
    return {
      seasons: {
        1: {
          name: "Период А",
          start: "01.06", //День.Месяц
          end: "31.08", //День.Месяц
        },
        2: {
          name: "Период Б",
          start: "01.12",
          end: "10.12",
        },
        3: {
          name: "Период В",
          start: "01.09",
          end: "30.11",
        },
        4: {
          name: "Период Г",
          start: "11.12",
          end: "31.05",
        },
      },
      autos: {
        1: {
          name: "BMW",
          prices: {
            1: [1500, 1200, 1000, 800, 700],
            2: [1700, 1400, 1200, 1000, 900],
            3: [1900, 1600, 1400, 1200, 1000],
            4: [1902, 1602, 1402, 1202, 1002],
          },
        },
        2: {
          name: "Mercedes",
          prices: {
            1: [500, 300, 200, 100, 50],
            2: [600, 400, 300, 200, 100],
            3: [700, 500, 400, 300, 200],
            4: [705, 505, 405, 305, 205],
          },
        },
        3: {
          name: "Lada",
          prices: {
            1: [500, 300, 200, 100, 50],
            2: [600, 400, 300, 200, 100],
            3: [700, 500, 400, 300, 200],
            4: [705, 505, 405, 305, 205],
          },
        },
      },

      //
      selectedAuto: "Выберите авто",
      dateStart: "",
      dateEnd: "",
      showAllAutos: [],
      seasonsInDays: {},
      show: false,
    };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
