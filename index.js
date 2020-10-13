import date from './src/components/calender'

date.install = (Vue) => Vue.component(date.name, date)

export {
    date
}