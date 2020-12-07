<template>
  <div class="date">
    <div class="dateItem">
      <span class="dateTitle">时间选择:</span>
      <el-popover
        placement="bottom"
        ref="popover"
        :width="showDateTrunc ? '430' : '265'"
        trigger="click"
      >
        <div class="contentBox">
          <div class="dateLeft" v-if="showDateTrunc">
            <div
              v-for="(item, index) in lastDate"
              class="lastDate pointer"
              @click="selectLately(index)"
              :class="{ selected: control.selected == item }"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <div class="line" v-if="showDateTrunc"></div>
          <div class="detaRight" v-else>
            <div class="DAY">
              <div class="tabHeader">
                <i
                  class="el-icon-d-arrow-left pointer"
                  :class="{ disabled: control.day.year <= 2016 }"
                  @click="subtractYear('day')"
                ></i>
                <i
                  class="el-icon-arrow-left pointer"
                  :class="{
                    disabled:
                      control.day.year <= 2016 && control.day.month <= 1,
                  }"
                  @click="subtractMonth('day')"
                ></i>
                {{ control.day.year }}年{{ control.day.month }}月
                <i
                  class="el-icon-arrow-right pointer"
                  :class="{
                    disabled:
                      control.day.year >= new Date().getFullYear() &&
                      control.day.month >= new Date().getMonth() + 1,
                  }"
                  @click="addMonth('day')"
                ></i>
                <i
                  class="el-icon-d-arrow-right pointer"
                  :class="{
                    disabled: control.day.year >= new Date().getFullYear(),
                  }"
                  @click="addYear('day')"
                ></i>
              </div>
              <div class="tabContent">
                <div class="week">
                  <span
                    v-for="(item, index) in week"
                    class="weekItem"
                    :key="index"
                    >{{ item }}</span
                  >
                </div>
                <div
                  v-for="(item, index) in day"
                  :class="[
                    { weekHover: activeName == 'WEEK' && showDateTrunc },
                    {
                      selected:
                        control.selected == JSON.stringify(item) &&
                        showDateTrunc,
                    },
                  ]"
                  class="week pointer"
                  @click="
                    () => {
                      activeName == 'WEEK' && showDateTrunc && selectWeek(item);
                    }
                  "
                  :key="index"
                >
                  <span
                    v-for="(oneDay, i) in item"
                    :data-week="
                      i > 2
                        ? `${oneDay.year}-${+oneDay.week + 1}`
                        : `${oneDay.year}-${oneDay.week}`
                    "
                    @click="selectDay(oneDay, i)"
                    class="weekItem item"
                    :class="[
                      {
                        disabled:
                          new Date(oneDay.year, oneDay.month - 1, oneDay.day) >
                          new Date(),
                      },
                      { noEvents: activeName == 'WEEK' && showDateTrunc },
                      {
                        selected:
                          control.selected ==
                          `${oneDay.year}-${oneDay.month}-${oneDay.day}`,
                      },
                      { ontherMonth: oneDay.month != control.day.month },
                      {
                        selectedDay:
                          !showDateTrunc &&
                          (i > 2
                            ? `${oneDay.year}-${+oneDay.week + 1}`
                            : `${oneDay.year}-${oneDay.week}`) == selectWeekDay,
                      },
                    ]"
                    :key="i"
                    >{{ oneDay.day }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="detaRight" v-if="showDateTrunc">
            <el-tabs v-model="activeName">
              <el-tab-pane
                v-for="(item, index) in signs"
                :key="index"
                :label="item.label"
                :name="item.name"
              ></el-tab-pane>
            </el-tabs>
            <!-- 选择天 -->
            <div class="DAY" v-if="activeName == 'DAY' || activeName == 'WEEK'">
              <div class="tabHeader">
                <i
                  class="el-icon-d-arrow-left pointer"
                  :class="{ disabled: control.day.year <= 2016 }"
                  @click="subtractYear('day')"
                ></i>
                <i
                  class="el-icon-arrow-left pointer"
                  :class="{
                    disabled:
                      control.day.year <= 2016 && control.day.month <= 1,
                  }"
                  @click="subtractMonth('day')"
                ></i>
                {{ control.day.year }}年{{ control.day.month }}月
                <i
                  class="el-icon-arrow-right pointer"
                  :class="{
                    disabled:
                      control.day.year >= new Date().getFullYear() &&
                      control.day.month >= new Date().getMonth() + 1,
                  }"
                  @click="addMonth('day')"
                ></i>
                <i
                  class="el-icon-d-arrow-right pointer"
                  :class="{
                    disabled: control.day.year >= new Date().getFullYear(),
                  }"
                  @click="addYear('day')"
                ></i>
              </div>
              <div class="tabContent">
                <div class="week">
                  <span
                    v-for="(item, index) in week"
                    class="weekItem"
                    :key="index"
                    >{{ item }}</span
                  >
                </div>
                <div
                  v-for="(item, index) in day"
                  :class="[
                    { weekHover: activeName == 'WEEK' && showDateTrunc },
                    {
                      selected:
                        control.selected == JSON.stringify(item) &&
                        showDateTrunc,
                    },
                  ]"
                  class="week pointer"
                  @click="
                    () => {
                      activeName == 'WEEK' && showDateTrunc && selectWeek(item);
                    }
                  "
                  :key="index"
                >
                  <span
                    v-for="(oneDay, i) in item"
                    :data-week="
                      i > 2
                        ? `${oneDay.year}-${+oneDay.week + 1}`
                        : `${oneDay.year}-${oneDay.week}`
                    "
                    @click="selectDay(oneDay, i)"
                    class="weekItem item"
                    :class="[
                      {
                        disabled:
                          new Date(oneDay.year, oneDay.month - 1, oneDay.day) >
                          new Date(),
                      },
                      { noEvents: activeName == 'WEEK' && showDateTrunc },
                      {
                        selected:
                          control.selected ==
                          `${oneDay.year}-${oneDay.month}-${oneDay.day}`,
                      },
                      { ontherMonth: oneDay.month != control.day.month },
                    ]"
                    :key="i"
                    >{{ oneDay.day }}</span
                  >
                </div>
              </div>
            </div>
            <!-- 选择月 -->
            <div class="MONTH" v-else-if="activeName == 'MONTH'">
              <div class="tabHeader">
                <i
                  class="el-icon-d-arrow-left pointer"
                  :class="{ disabled: control.month.year <= 2016 }"
                  @click="subtractYear('month')"
                ></i>
                {{ control.month.year }}年
                <i
                  class="el-icon-d-arrow-right pointer"
                  :class="{
                    disabled: control.month.year >= new Date().getFullYear(),
                  }"
                  @click="addYear('month')"
                ></i>
              </div>
              <div class="tabContent">
                <div
                  class="month pointer"
                  v-for="(item, index) in month"
                  @click="selectMonth(index)"
                  :class="[
                    {
                      selected:
                        control.month.year == control.month.selectedYear &&
                        control.selected == item,
                    },
                    {
                      disabled:
                        new Date() <
                        new Date(
                          `${control.month.year}-${
                            index > 8 ? index + 1 : '0' + (index + 1)
                          }`
                        ),
                    },
                  ]"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
            </div>

            <!-- 季度选择器 -->
            <div class="SEASON" v-else-if="activeName == 'SEASON'">
              <div class="tabHeader">
                <i
                  class="el-icon-d-arrow-left"
                  :class="{ disabled: control.season.year <= 2016 }"
                  @click="subtractYear('season')"
                ></i>
                {{ control.season.year }}
                <i
                  class="el-icon-d-arrow-right"
                  :class="{
                    disabled: control.season.year >= new Date().getFullYear(),
                  }"
                  @click="addYear('season')"
                ></i>
              </div>
              <div class="tabContent">
                <div
                  class="season"
                  v-for="(item, index) in season"
                  :key="index"
                  :class="[
                    {
                      selected:
                        control.season.year == control.season.selectedYear &&
                        control.selected == item.label,
                    },
                    {
                      disabled:
                        new Date() < new Date(control.season.year + item.time),
                    },
                  ]"
                  @click="selectSeason(index)"
                >
                  {{ item.label }}
                </div>
              </div>
            </div>
            <!-- 年选择器 -->
            <div class="YEAR" v-else-if="activeName == 'YEAR'">
              <div class="tabHeader">
                2016年 - {{ new Date().getFullYear() }}年
              </div>
              <div class="tabContent">
                <div
                  class="year"
                  v-for="(item, index) in year"
                  @click="selectYear(item)"
                  :class="[{ selected: control.selected == item }]"
                  :key="index"
                >
                  {{ item }}年
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="selectItem" slot="reference">
          <i class="el-icon-date"></i>
          <div
            v-if="showText[control.selected] || control.selectedType"
            class="showText"
          >
            {{ control.selectedType || control.selected }}
          </div>
          <div v-else>
            {{ date.start_time }} 至
            {{
              date.date_sign === "all"
                ? $moment().format("YYYY-MM-DD")
                : date.end_time
            }}
          </div>
        </div>
      </el-popover>
    </div>
    <div class="showItem" v-if="showDateTrunc">
      <span class="dateTitle">时间展示维度:</span>
      <el-select
        v-model="date.date_trunc"
        @click="closePopover"
        size="mini"
        @change="date_truncChange"
        placeholder="请选择"
      >
        <el-option
          v-for="item in date_truncOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { day, difference } from "./calender";
import moment from "simple-time-mj";
export default {
  name: "date",
  props: {
    sign: {
      type: Array,
      default: () => [],
    },
    showDateTrunc: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    return {
      showText: {
        昨日: 1,
        今日: 1,
        上周: 1,
        本周: 1,
        上月: 1,
        本月: 1,
        上季度: 1,
        本季度: 1,
        最近7天: 1,
        最近28天: 1,
        最近91天: 1,
      },
      control: {
        season: {
          year: year,
          selectedYear: "",
        },
        month: {
          year: year,
          selectedMonth: "",
        },
        day: {
          year: year,
          month: month,
        },
        selected: "",
        selectedType: "",
      },
      selectWeekDay: "",
      week: ["一", "二", "三", "四", "五", "六", "日"],
      date: {
        end_time: "",
        start_time: "",
        date_trunc: "", // hour day week month quarter year  展示粒度
        date_sign: "", // DAY WEEK MONTH SEASON YEAR all LATEST-7 LATEST-28 LATEST-91  选择的日期范围
      },
      lastDate: [
        "昨日",
        "今日",
        "上周",
        "本周",
        "上月",
        "本月",
        "上季度",
        "本季度",
        "最近7天",
        "最近28天",
        "最近91天",
        "显示全部",
      ],
      season: [
        { time: "-01-01", label: "第一季度" },
        { time: "-04-01", label: "第二季度" },
        { time: "-07-01", label: "第三季度" },
        { time: "-10-01", label: "第四季度" },
      ],
      activeName: "MONTH",
      month: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
    };
  },
  computed: {
    signs() {
      let arr = [
        { label: "日", name: "DAY" },
        { label: "周", name: "WEEK" },
        { label: "月", name: "MONTH" },
        { label: "季度", name: "SEASON" },
        { label: "年", name: "YEAR" },
      ];
      let obj = {};
      for (let item of this.sign) {
        obj[item] = true;
      }
      arr = this.sign.length ? arr.filter((item) => obj[item.name]) : arr;
      if (!this.showDateTrunc) arr = [{ label: "周", name: "WEEK" }];
      return arr;
    },
    date_truncOptions() {
      let { date_sign } = this.date;
      let result = [];
      if (date_sign == "DAY") {
        result = [{ label: "按小时展示", value: "hour" }];
      } else if (date_sign == "WEEK") {
        result = [{ label: "按天展示", value: "day" }];
      } else if (date_sign == "MONTH") {
        result = [
          { label: "按周展示", value: "week" },
          { label: "按天展示", value: "day" },
        ];
      } else if (date_sign == "SEASON") {
        result = [
          { label: "按月展示", value: "month" },
          { label: "按周展示", value: "week" },
          { label: "按天展示", value: "day" },
        ];
      } else if (date_sign == "YEAR") {
        result = [
          { label: "按季度展示", value: "quarter" },
          { label: "按月展示", value: "month" },
          { label: "按周展示", value: "week" },
        ];
      } else if (date_sign == "all") {
        result = [
          { label: "按年展示", value: "year" },
          { label: "按季度展示", value: "quarter" },
          { label: "按月展示", value: "month" },
          { label: "按周展示", value: "week" },
        ];
      } else {
        result = [{ label: "按天展示", value: "day" }];
      }
      return result;
    },
    year() {
      let result = [];
      let now = new Date().getFullYear();
      for (let i = 2016; i <= now; i++) {
        result.push(i);
      }
      return result;
    },
    day() {
      return day(this.control.day);
    },
  },
  watch: {
    date() {
      this.$emit("change", JSON.parse(JSON.stringify(this.date)));
    },
    "$route.name": {
      handler() {
        if (!this.showDateTrunc) {
          this.selectDay();
        } else {
          this.selectLately(4);
        }
      },
      immediate: true,
    },
  },
  created() {
    this.$moment = moment;
  },
  methods: {
    date_truncChange() {
      this.$emit("change", JSON.parse(JSON.stringify(this.date)));
    },
    /** 关闭时间控件 */
    closePopover() {
      this.$refs.popover && this.$refs.popover.doClose();
    },
    /** 选择周 */
    selectWeek(week) {
      let start_time = `${week[0].year}-${
        week[0].month > 9 ? week[0].month : "0" + week[0].month
      }-${week[0].day > 9 ? week[0].day : "0" + week[0].day}`;
      let end_time = `${week[6].year}-${
        week[6].month > 9 ? week[6].month : "0" + week[6].month
      }-${week[6].day > 9 ? week[6].day : "0" + week[6].day}`;
      this.date = {
        ...this.date,
        end_time,
        start_time,
        date_trunc: "day",
        date_sign: "WEEK",
      };
      this.control.selected = JSON.stringify(week);
      this.control.selectedType = "";
      this.closePopover();
    },
    /** 选择日 */
    selectDay(dayObj = {}, i) {
      let { day, month, year } = dayObj;
      let start_time = `${year}-${month > 9 ? month : "0" + month}-${
        day > 9 ? day : "0" + day
      }`;
      if (this.showDateTrunc) {
        this.date = {
          ...this.date,
          end_time: start_time,
          start_time,
          date_trunc: "hour",
          date_sign: "DAY",
        };

        this.control.selected = `${year}-${month}-${day}`;
        this.control.selectedType = "";
      } else if (year) {
        let date = moment(start_time).day();
        let start, end;
        if (date > 3) {
          start = moment(start_time)
            .day(4)
            .format();
          end = moment(start_time)
            .day(10)
            .format();
        } else {
          start = moment(start_time)
            .day(-3)
            .format();
          end = moment(start_time)
            .day(3)
            .format();
        }
        this.selectWeekDay =
          i > 2
            ? `${dayObj.year}-${+dayObj.week + 1}`
            : `${dayObj.year}-${dayObj.week}`;

        this.date = {
          ...this.date,
          end_time: end,
          start_time: start,
          date_trunc: "day",
          date_sign: "WEEK",
        };
        this.control.selected = "";
        this.control.selectedType = "";
      } else {
        let start, end;
        let time = new Date();
        start = moment(time)
          .day(-3)
          .format();
        end = moment(time)
          .day(3)
          .format();
        this.selectWeekDay = moment(time)
          .day(3)
          .format();
        this.date = {
          ...this.date,
          end_time: end,
          start_time: start,
          date_trunc: "day",
          date_sign: "WEEK",
        };
        this.control.selected = "";
        this.control.selectedType = "";
      }
      this.closePopover();
    },
    /** 选择月 */
    selectMonth(num) {
      this.control.selected = this.month[num];
      this.control.month.selectedYear = this.control.month.year;
      num++;
      this.control.month.year;
      let start_time = `${this.control.month.year}-${num}-01`;
      let end_time = moment(start_time).endDay("M");
      let obj = { end_time, start_time, date_sign: "MONTH" };
      if (this.date.date_sign != "MONTH") obj.date_trunc = "day";
      this.date = { ...this.date, ...obj };
      this.control.selectedType = `${this.control.month.year}年${num}月`;
      this.closePopover();
    },
    /** 选择季度 */
    selectSeason(num) {
      let season = 1 + num * 3;
      let start_time = `${this.control.season.year}-${season}-01`;
      let end_time = moment(start_time).endDay("Q");
      this.control.season.selectedYear = this.control.season.year;
      this.control.selected = this.season[num].label;
      let obj = { end_time, start_time, date_sign: "SEASON" };
      if (this.date.date_sign != "SEASON") obj.date_trunc = "month";
      this.date = { ...this.date, ...obj };
      this.control.selectedType = `${this.control.season.year}年第${num +
        1}季度`;
      this.closePopover();
    },
    /** 选择年 */
    selectYear(year) {
      this.control.selected = year;
      let start_time = year + "-01-01";
      let end_time = moment(start_time).endDay("Y");
      let obj = { end_time, start_time, date_sign: "YEAR" };
      if (this.date.date_sign != "YEAR") obj.date_trunc = "month";
      this.date = { ...this.date, ...obj };
      this.control.selectedType = `${year}年`;
      this.closePopover();
    },
    /** 减少年 */
    subtractYear(key) {
      this.control[key].year -= 1;
    },
    subtractMonth(key) {
      this.control[key].month -= 1;
      if (this.control[key].month <= 0) {
        this.control[key].month = 12;
        this.control[key].year -= 1;
      }
    },
    addMonth(key) {
      this.control[key].month = +this.control[key].month + 1;
      if (this.control[key].month > 12) {
        this.control[key].month = 1;
        this.control[key].year = +this.control[key].year + 1;
      }
    },
    /** 增加年 */
    addYear(key) {
      this.control[key].year = +this.control[key].year + 1;
    },
    /** 选择最近日期  */
    selectLately(index) {
      this.control.selectedType = "";
      this.control.selected = this.lastDate[index];
      this.date = { ...this.date, ...difference[index]() };
      this.closePopover();
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.showText {
  // margin-left: 80px;
  width: 100%;
  // text-align: center;
  margin-left: 5px;
  font-size: 12px;
  line-height: 16px;
}
.date {
  height: 40px;
  display: flex;
  padding: 5px 0px 5px 10px;
  background: #e9eef3;
  box-sizing: border-box;
  align-items: center;
  .dateItem {
    margin: 0 50px 0 0;
    display: flex;
    align-items: center;
    .selectItem {
      cursor: pointer;
      display: flex;
      background: #fff;
      padding: 5px 5px;
      border-radius: 4px;
      border: 1px solid #3f78f6;
      color: #3f78f6;
      width: 250px;
    }
  }
}
.contentBox {
  display: flex;
  .dateLeft {
    width: 140px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    flex-shrink: 0;
    .lastDate {
      width: 50%;
      padding: 10px;
    }
    .lastDate:hover {
      border-radius: 4px;

      background: #3f78f6;
      color: #fff;
    }
    .lastDate:nth-of-type(n + 9) {
      width: 100%;
    }
  }
  .line {
    border-right: 1px solid #ccc;
    margin: 0 12px;
  }
  .detaRight {
    // flex-shrink: 0;
    width: 265px;
  }
}
.tabHeader {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.tabContent {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
.SEASON {
  .season {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    &:hover {
      border-radius: 4px;

      background: #3f78f6;
      color: #fff;
    }
  }
}

.YEAR {
  .year {
    width: 25%;
    padding: 15px 0;
    text-align: center;
    &:hover {
      border-radius: 4px;

      background: #3f78f6;
      color: #fff;
    }
  }
}

.MONTH {
  .month {
    width: 25%;
    padding: 15px 0;
    text-align: center;
    &:hover {
      border-radius: 4px;

      background: #3f78f6;
      color: #fff;
    }
  }
}
.week {
  width: 100%;
  display: flex;
  padding: 7px 0;
  .weekItem {
    width: calc(100% / 7);
    text-align: center;
    &.item:hover {
      background: #3f78f6;
      border-radius: 4px;
      color: #fff;
    }
  }
  .ontherMonth {
    color: #ccc;
  }
}
.weekHover:hover {
  background: #3f78f6;
  border-radius: 4px;
  color: #fff;
  .weekItem.item {
    color: #fff;
  }
}
.contentBox .selected {
  border-radius: 4px;
  color: #fff;
  background: #3f78f6;
  .weekItem {
    color: #fff;
  }
}
.disabled {
  color: #ccc;
  pointer-events: none;
}
.pointer {
  cursor: pointer;
}
.noEvents {
  pointer-events: none;
}
.dateTitle {
  color: #999;
  margin-right: 10px;
  font-size: 14px;
}
.date >>> .el-input__inner {
  color: #3f78f6;
  border: 1px solid #3f78f6;
}
.detaRight >>> .el-tabs__item {
  color: #3f78f6;
  &.is-active {
    color: #3f78f6;
  }
}
.detaRight >>> .el-tabs__active-bar {
  background-color: #3f78f6;
}
.selectedDay {
  background-color: #3f78f6;
  color: #fff;
}
[data-week] {
  padding: 7px 0;
  margin: -7px 0;
}
</style>
