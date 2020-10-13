import Moment from 'simple-time-mj'
/**
 * 
 * @param {{year: number, month: number}} 
 * @param {number} year 年
 * @param {number} month 月
 */
let day = ({ year, month }, length) => {
    let result = [];
    let start = new Moment(`${year}-${month}-01`);
    // 如果当前为周末, dow为0, 赋值为7
    let dow = start.day() || 7; 
    // start设置为周一
    start.add(1 - dow, 'd');
    let arr = [];
    while (
        arr.length ||
        (start.month() <= month && !(month == 12 && start.month() == 1)) ||
        (start.month() == 12 && month == 1 ) || length && result.length < length
    ) {
        arr.push({
            day: start.date(),
            month: start.month(),
            year: start.year(),
            week: start.monthWeek(),
        });
        if (arr.length == 7) {
            result.push(arr);
            arr = [];
        }
        start.add(1, 'd');
    }
    return result;
}

let difference = {
    0: () => {
        Moment
        return {
            start_time: new Moment().add(-1, 'd').format(),
            end_time: new Moment().add(-1, 'd').format(),
            date_trunc: 'hour',
            date_sign: 'DAY',
        };
    },
    1: () => {
        return {
            start_time: new Moment().add(0, 'd').format(),
            end_time: new Moment().add(0, 'd').format(),
            date_trunc: 'hour',
            date_sign: 'DAY',
        };
    },
    2: () => {
        let weekOfday = new Moment().day(); // 计算今天是这周第几天  周日为一周中的第一天
        let start_time = new Moment()
            .add(-weekOfday - 6, 'd')
            .format(); // 周一日期
        let end_time = new Moment()
            .add(-weekOfday, 'd')
            .format(); // 周日日期
        return { start_time, end_time, date_trunc: 'day', date_sign: 'WEEK' };
    },
    3: () => {
        let weekOfday = new Moment().day(); // 计算今天是这周第几天  周日为一周中的第一天
        let start_time = new Moment()
            .add(1 - weekOfday, 'd')
            .format(); // 周一日期
        let end_time = new Moment()
            .add(7 - weekOfday, 'd')
            .format(); // 周日日期
        return { start_time, end_time, date_trunc: 'day', date_sign: 'WEEK' };
    },
    4: () => {
        let start_time = new Moment().add(-1, 'M');
        start_time = start_time.format('YYYY-MM') + '-01'
        let end_time = new Moment(start_time)
            .add(1, 'M')
            .add(-1, 'd')
            .format();
        return {
            start_time,
            end_time,
            date_trunc: 'day',
            date_sign: 'MONTH',
        };
    },
    5: () => {
        let start_time = new Moment().add(0, 'M').format('YYYY-MM') + '-01';
        let end_time = new Moment(start_time)
            .add(1, 'M')
            .add(-1, 'd')
            .format();

            new Moment().format();
        return {
            start_time,
            end_time,
            date_trunc: 'day',
            date_sign: 'MONTH',
        };
    },
    6: () => {
        let start_time = new Moment().add(-1, 'Q').startDay('Q')
        let end_time = new Moment().add(-1, 'Q').endDay('Q')
        return {
            start_time,
            end_time,
            date_trunc: 'month',
            date_sign: 'SEASON',
        };
    },
    7: () => {
        let start_time = new Moment().startDay('Q')
        let end_time = new Moment().endDay('Q')
        return {
            start_time,
            end_time,
            date_trunc: 'month',
            date_sign: 'SEASON',
        };
    },
    8: () => {
        let start_time = new Moment().add(-7, 'd').format();
        let end_time = new Moment().add(-1, 'd').format();
        return {
            start_time,
            end_time,
            date_trunc: 'day',
            date_sign: 'LATEST-7',
        };
    },
    9: () => {
        let start_time = new Moment().add(-28, 'd').format();
        let end_time = new Moment().add(-1, 'd').format();
        return {
            start_time,
            end_time,
            date_trunc: 'day',
            date_sign: 'LATEST-28',
        };
    },
    10: () => {
        let start_time = new Moment().add(-91, 'd').format();
        let end_time = new Moment().add(-1, 'd').format();
        return {
            start_time,
            end_time,
            date_trunc: 'day',
            date_sign: 'LATEST-91',
        };
    },
    11: () => {
        let start_time = `2016-01-01`;
        let end_time = new Moment().endDay('Y');
        return { start_time, end_time, date_trunc: 'year', date_sign: 'all' };
    },
};

export {
    day,
    difference
}