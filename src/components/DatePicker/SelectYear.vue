<script>
import { randomId } from '../../utils';
export default {
  functional: true,
  props: {
    date: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  render(createElement, context) {
    const selectTime = context.props.date.startTime && context.props.date.startTime.slice(0, 4);
    let id = randomId();
    /** 起始年份 */
    const startYear = 2016;
    /** 今年 */
    const currentYear = new Date().getFullYear();
    /** 选择年 */
    const selectYear = (event) => {
      let target = event.target;
      // 如果点击的属性没有 year, 证明点击的不是某年
      if (!target.className.includes('year')) return;
      let year = target.innerText.slice(0, 4);
      context.listeners.change({ startTime: `${year}-01-01`, endTime: `${year}-12-31` });
      document.querySelector(`#${id}`).click();
    };
    /** 通过循环, 遍历出需要展示的年份 */
    const showYear = () => {
      let _startYear = startYear;
      let reseult = [];
      while (_startYear <= currentYear) {
        reseult.push(<div class={['year', _startYear == selectTime && 'select-year']}>{_startYear} 年</div>);
        _startYear++;
      }
      return reseult;
    };

    return (
      <div class="select-year">
        <el-popover placement="bottom" width="266" trigger="click">
          <header>{`${startYear}年 至 ${currentYear}年`}</header>
          <article onClick={selectYear}>{showYear()}</article>
          <span slot="reference" ref="popover" id={id}>
            {context.children}
          </span>
        </el-popover>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
header {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
article {
  margin-top: 10px;
  width: 240px;
  display: flex;
  flex-wrap: wrap;
  .year {
    width: 60px;
    padding: 15px 0;
    text-align: center;
    border-radius: 4px;
    &:hover {
      color: #fff;
      background: #3f78f6;
    }
    &.select-year {
      color: #fff;
      background: #3f78f6;
    }
  }
}
</style>
