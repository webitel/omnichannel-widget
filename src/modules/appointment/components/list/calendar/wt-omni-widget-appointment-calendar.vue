<template>
  <article class="wt-omni-widget-appointment-calendar">
    <div class="wt-omni-widget-appointment-calendar__title-wrap">
    <span class="wt-omni-widget-appointment-calendar__title">
      {{ $t('appointment.calendar.title') }}
    </span>
      <div class="wt-omni-widget-appointment-calendar__time-zone">
        <div class="wt-omni-widget-appointment-calendar__time-zone-icon">
          <img
            src="../../../assets/appointment-time-zone.svg"
            alt="time zone icon"
          >
        </div>
        <span class="title">
         {{ timeZone + ' Time Zone' }}
       </span>
      </div>
    </div>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <calendar-date
        v-for="({ date, times }) of calendar"
        :key="date"
        :value="{ date, times }"
        :selected-value="{ date:value.scheduleDate, time:value.scheduleTime }"
        @select="selectTime"
      >
      </calendar-date>
    </div>
  </article>
</template>

<script>

import CalendarDate from './wt-omni-widget-appointment-calendar-date.vue';

export default {
  name: 'wt-omni-widget-appointment-calendar',
  components: {
    CalendarDate,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    calendar: {
      type: Array,
    },
    timeZone: {
      type: String,
    },
    locates: {
      type: String,
    },
  },
  methods: {
    formattingDateTitle(currentDateForm) {
      const currentDate = new Date(currentDateForm);
      const options = { day: 'numeric', weekday: 'short' };
      const dateStr = currentDate.toLocaleDateString(this.locates || 'en-US', options).toString();
      const subStr1 = dateStr.substring(0, dateStr.indexOf(',' || '' || '.'));
      const subStr2 = dateStr.substring(dateStr.indexOf(',' || '' || '.') + 1, dateStr.length + 1);
      return Number(dateStr.substring(0, 1))
        ? `${subStr1} ${subStr2}`
        : `${subStr2} ${subStr1}`
    },
    selectTime({ date, time }) {
      const value = {
        ...this.value,
        scheduleDate: date,
        scheduleTime: time,
      };
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-calendar {
    display: flex;
    flex-direction: column;
    flex: 1;
    color: var(--contrast-color);

    &__title {
      @extend %typo-heading-md;

      @media (max-width: $breakpoint-xxs) {
        max-height: 50%;
        gap: 8px;
      }
    }

    &__title-wrap {
      @extend %typo-body-md;
      margin-bottom: var(--gap-md);
      padding: var(--main-app-padding);
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: $breakpoint-md) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      @media (max-width: $breakpoint-xxs) {
        margin-bottom: 0;
        padding: 16px 0;
        gap: var(--gap-md);
      }
    }

    &__time-zone {
      display: flex;
      align-items: center;
      gap: var(--gap-md);
    }

    &__time-zone-icon {
      width: 16px;
      height: 16px;
    }

    &__wrapper {
      @extend %wt-scrollbar;
      display: flex;
      overflow-y: auto;
      justify-content: space-between;
      gap: var(--gap-md);

      @media (max-width: $breakpoint-xxs) {
        max-height: 284px;
      }
    }
  }
}
</style>
