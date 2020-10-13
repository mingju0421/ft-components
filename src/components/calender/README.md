使用方法: 
```javascript
<date @change="handlerChange" />
```
选择时间触发 change 事件, 值: 
```javascript
date: {
    date_trunc: '展示粒度', // hour day week month quarter year
    start_time: '开始时间', // 2020-02-02T00:00:00
    end_time: '结束时间',  // 次日 00:00:00
    date_sign: '展示周期', //DAY WEEK MONTH SEASON YEAR all LATEST-7 LATEST-28 LATEST-91
    grain_size: '数据页面的选择时间单位'  // day week month quarter year
}
```