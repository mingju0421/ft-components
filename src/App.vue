<template>
  <div>
    <ft-date-picker
      currentTabComponent="SelectMonth"
      :propDate="{ startTime: '2020,1,1', endTime: '2020,1,31' }"
      @change="() => {}"
    />
  </div>
</template>

<script>
import ftDatePicker from "./components/DatePicker/inde";
export default {
  data() {
    return {};
  },
  components: {
    ftDatePicker,
  },
};
</script>

<style lang="scss" scoped></style>
