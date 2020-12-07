<template>
  <div class="date-picker">
    <component :is="currentTabComponent" :date="date" @change="setDate">
      <div class="date-picker-showText">
        <i class="el-icon-date"></i>
        <span class="showText">{{
          `${date.startTime} 至 ${date.endTime}`
        }}</span>
      </div>
    </component>
  </div>
</template>

<script>
const SelectMonth = () => import("./SelectMonth");
const SelectYear = () => import("./SelectYear");
export default {
  name: "ft-date-picker",
  props: {
    currentTabComponent: {
      type: String,
      default: "SelectYear",
    },
    propDate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      date: {},
    };
  },
  watch: {
    propDate: {
      handler(val) {
        if (val) {
          this.date = val;
        }
      },
      immediate: true,
    },
  },
  methods: {
    setDate(date) {
      this.date = { ...date };
      this.$emit("change", { ...date });
    },
  },
  components: {
    SelectMonth,
    SelectYear,
  },
};
</script>

<style lang="scss" scoped>
.date-picker {
  display: flex;
  .date-picker-showText {
    cursor: pointer;
    background: #fff;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #3f78f6;
    color: #3f78f6;
    width: 250px;
  }
  .showText {
    margin-left: 5px;
  }
}
</style>
