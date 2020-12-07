import date from "./src/components/calender";
import ftDatePicker from "./src/components/DatePicker";

date.install = (Vue) => Vue.component(date.name, date);
ftDatePicker.install = (Vue) => Vue.component(date.name, date);
export { date, ftDatePicker };
