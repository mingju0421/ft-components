<script>
import moment from "simple-time-mj";

export default {
  //   functional: true,
  props: {
    date: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      year: "",
      selectTime: "",
    };
  },
  watch: {
    date: {
      handler(val) {
        let time = moment(val.startTime);
        this.year = time.year();
        this.selectTime = this.date.startTime && time.format("YYYY-MM");
      },
      immediate: true,
    },
  },
  render() {
    let monthList = [
      { label: "一月", value: "01" },
      { label: "二月", value: "02" },
      { label: "三月", value: "03" },
      { label: "四月", value: "04" },
      { label: "五月", value: "05" },
      { label: "六月", value: "06" },
      { label: "七月", value: "07" },
      { label: "八月", value: "08" },
      { label: "九月", value: "09" },
      { label: "十月", value: "10" },
      { label: "十一月", value: "11" },
      { label: "十二月", value: "12" },
    ];
    /** 展示的年 */
    const year = this.year;
    /** 选择的月份 */
    const selectTime = this.selectTime;
    /** 当前月份, 用来判断月份是否大于当前月 */
    const currentMonth = moment().format("YYYY-MM");

    /** 选择月份 */
    const selectMonth = (month) => {
      let dateObj = {
        startTime: `${year}-${month}-01`,
        endTime: moment(`${year}-${month}-01`)
          .add(1, "M")
          .add(-1, "d")
          .format("YYYY-MM-DD"),
      };
      this.$refs.popover.click();
      this.$emit("change", dateObj);
    };
    /** 下一年 */
    const nextYear = () => this.year++;
    /** 上一年 */
    const lastMonth = () => this.year--;
    return (
      <div class="select-month">
        <el-popover placement="bottom" width="266" trigger="click">
          <header>
            <i
              class={[
                "el-icon-d-arrow-left",
                "pointer",
                year <= 2016 && "disable",
              ]}
              onClick={lastMonth}
            ></i>
            <span>{year}</span>
            <i
              class={[
                "el-icon-d-arrow-right",
                "pointer",
                year >= currentMonth.slice(0, 4) && "disable",
              ]}
              onClick={nextYear}
            ></i>
          </header>
          <article class="month-wrap">
            {monthList.map((month) => (
              <div
                class={[
                  "month",
                  "pointer",
                  selectTime == `${year}-${month.value}` && "selectMonth",
                  `${year}-${month.value}` > currentMonth && "disable",
                ]}
                onClick={() => selectMonth(month.value)}
              >
                {month.label}
              </div>
            ))}
          </article>
          <span slot="reference" ref="popover">
            {this.$slots.default}
          </span>
        </el-popover>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.month-wrap {
  margin-top: 10px;
  width: 240px;
  display: flex;
  flex-wrap: wrap;
  .month {
    width: 60px;
    padding: 15px 0;
    text-align: center;

    border-radius: 4px;
    &:hover {
      color: #fff;
      background: #3f78f6;
    }
    &.selectMonth {
      color: #fff;
      background: #3f78f6;
    }
  }
}
header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.pointer {
  cursor: pointer;
}
.disable {
  pointer-events: none;
  color: #ccc;
}
</style>
