<template>
  <article class="wt-omni-widget-appointment-calendar">
    <calendar-title
      :visible-prev="visiblePrev"
      :visible-next="visibleNext"
      @previous="$refs.myVueperSlides.previous()"
      @next="$refs.myVueperSlides.next()"
    >
      {{ timeZone }}
    </calendar-title>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <vueper-slides
        ref="myVueperSlides"
        class="no-shadow"
        :class="'wt-omni-widget-appointment-calendar__slider'"
        :visible-slides="this.calendar.length > 7 ? 7 : this.calendar.length"
        :gap="2"
        :fixed-height="sliderHeight"
        :bullets="false"
        :touchable="false"
        :arrows="false"
        :infinite="false"
        :initSlide="4"
        :breakpoints="{
          1024: {
          visibleSlides: this.calendar.length > 5 ? 5 : this.calendar.length,
          initSlide: 3,
          },
          820: {
          visibleSlides: this.calendar.length > 3 ? 3 : this.calendar.length,
          initSlide: 2,
          },
        }"
        @ready="handleSlideReady($event.currentSlide.index)"
        @slide="handleSlide($event.currentSlide.index)"
      >
        <vueper-slide v-for="({ date, times }) of calendar" :key="date">
          <template #content>
            <calendar-date
              ref="date"
              :value="{ date, times }"
              :selected-value="{ date:value.scheduleDate, time:value.scheduleTime }"
              @select="selectTime"
            ></calendar-date>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
  </article>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
import CalendarTitle from './wt-omni-widget-appointment-calendar-title.vue';
import CalendarDate from './date/wt-omni-widget-appointment-calendar-date.vue';

export default {
  name: 'wt-omni-widget-appointment-calendar',
  components: {
    CalendarDate,
    CalendarTitle,
    VueperSlides,
    VueperSlide,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    // calendar: {
    //   type: Array,
    // },
    timeZone: {
      type: String,
    },
  },
  data: () => ({
    calendar: [
      {
        date: '2022-11-30',
        times: [
          {
            time: '12:00',
            reserved: false,
          },
          {
            time: '12:30',
            reserved: true,
          },
          {
            time: '13:00',
            reserved: false,
          },
          {
            time: '13:30',
            reserved: true,
          },
          {
            time: '14:00',
            reserved: false,
          },
          {
            time: '14:30',
            reserved: false,
          },
          {
            time: '15:00',
            reserved: true,
          },
          {
            time: '15:30',
            reserved: true,
          },
          {
            time: '16:00',
            reserved: false,
          },
          {
            time: '16:30',
            reserved: true,
          },
          {
            time: '17:00',
            reserved: true,
          },
        ],
      },
      {
        date: '2022-12-01',
        times: [
          {
            time: '12:00',
            reserved: false,
          },
          {
            time: '12:30',
            reserved: false,
          },
          {
            time: '13:00',
            reserved: false,
          },
          {
            time: '13:30',
            reserved: true,
          },
          {
            time: '14:00',
            reserved: true,
          },
          {
            time: '14:30',
            reserved: true,
          },
          {
            time: '15:00',
            reserved: true,
          },
          {
            time: '15:30',
            reserved: false,
          },
          {
            time: '16:00',
            reserved: false,
          },
          {
            time: '16:30',
            reserved: false,
          },
          {
            time: '17:00',
            reserved: false,
          },
        ],
      },
      {
        date: '2022-12-02',
        times: [
          {
            time: '12:00',
            reserved: true,
          },
          {
            time: '12:30',
            reserved: true,
          },
          {
            time: '13:00',
            reserved: true,
          },
          {
            time: '13:30',
            reserved: false,
          },
          {
            time: '14:00',
            reserved: false,
          },
          {
            time: '14:30',
            reserved: true,
          },
          {
            time: '15:00',
            reserved: false,
          },
          {
            time: '15:30',
            reserved: true,
          },
          {
            time: '16:00',
            reserved: true,
          },
          {
            time: '16:30',
            reserved: true,
          },
          {
            time: '17:00',
            reserved: true,
          },
        ],
      },
      {
        date: '2022-12-03',
        times: [
          {
            time: '12:00',
            reserved: false,
          },
          {
            time: '12:30',
            reserved: true,
          },
          {
            time: '13:00',
            reserved: false,
          },
          {
            time: '13:30',
            reserved: true,
          },
          {
            time: '14:00',
            reserved: false,
          },
          {
            time: '14:30',
            reserved: false,
          },
          {
            time: '15:00',
            reserved: true,
          },
          {
            time: '15:30',
            reserved: true,
          },
          {
            time: '16:00',
            reserved: false,
          },
          {
            time: '16:30',
            reserved: true,
          },
          {
            time: '17:00',
            reserved: true,
          },
        ],
      },
      {
        date: '2022-12-04',
        times: [
          {
            time: '12:00',
            reserved: false,
          },
          {
            time: '12:30',
            reserved: true,
          },
          {
            time: '13:00',
            reserved: false,
          },
          {
            time: '13:30',
            reserved: true,
          },
          {
            time: '14:00',
            reserved: false,
          },
          {
            time: '14:30',
            reserved: false,
          },
          {
            time: '15:00',
            reserved: true,
          },
          {
            time: '15:30',
            reserved: true,
          },
          {
            time: '16:00',
            reserved: false,
          },
          {
            time: '16:30',
            reserved: true,
          },
          {
            time: '17:00',
            reserved: true,
          },
        ],
      },
      {
        date: '2022-12-05',
        times: [
          {
            time: '12:00',
            reserved: false,
          },
          {
            time: '12:30',
            reserved: true,
          },
          {
            time: '13:00',
            reserved: false,
          },
          {
            time: '13:30',
            reserved: true,
          },
          {
            time: '14:00',
            reserved: false,
          },
          {
            time: '14:30',
            reserved: false,
          },
          {
            time: '15:00',
            reserved: true,
          },
          {
            time: '15:30',
            reserved: true,
          },
          {
            time: '16:00',
            reserved: false,
          },
          {
            time: '16:30',
            reserved: true,
          },
          {
            time: '17:00',
            reserved: true,
          },
        ],
      },
      {
        date: '2022-12-06',
        times: [
          {
            time: '12:00',
            reserved: false,
          },
          {
            time: '12:30',
            reserved: true,
          },
          {
            time: '13:00',
            reserved: false,
          },
          {
            time: '13:30',
            reserved: true,
          },
          {
            time: '14:00',
            reserved: false,
          },
          {
            time: '14:30',
            reserved: false,
          },
          {
            time: '15:00',
            reserved: true,
          },
          {
            time: '15:30',
            reserved: true,
          },
          {
            time: '16:00',
            reserved: false,
          },
          {
            time: '16:30',
            reserved: true,
          },
          {
            time: '17:00',
            reserved: true,
          },
        ],
      },
      {
        date: '2022-12-07',
        times: [
          {
            time: '12:00',
            reserved: false,
          },
          {
            time: '12:30',
            reserved: true,
          },
          {
            time: '13:00',
            reserved: false,
          },
          {
            time: '13:30',
            reserved: true,
          },
          {
            time: '14:00',
            reserved: false,
          },
          {
            time: '14:30',
            reserved: false,
          },
          {
            time: '15:00',
            reserved: true,
          },
          {
            time: '15:30',
            reserved: true,
          },
          {
            time: '16:00',
            reserved: false,
          },
          {
            time: '16:30',
            reserved: true,
          },
          {
            time: '17:00',
            reserved: true,
          },
        ],
      },
      {
        date: '2022-12-08',
        times: [
          {
            time: '12:00',
            reserved: false,
          },
          {
            time: '12:30',
            reserved: true,
          },
          {
            time: '13:00',
            reserved: false,
          },
          {
            time: '13:30',
            reserved: true,
          },
          {
            time: '14:00',
            reserved: false,
          },
          {
            time: '14:30',
            reserved: false,
          },
          {
            time: '15:00',
            reserved: true,
          },
          {
            time: '15:30',
            reserved: true,
          },
          {
            time: '16:00',
            reserved: false,
          },
          {
            time: '16:30',
            reserved: true,
          },
          {
            time: '17:00',
            reserved: true,
          },
        ],
      },
      {
        date: '2022-12-09',
        times: [
          {
            time: '12:00',
            reserved: false,
          },
          {
            time: '12:30',
            reserved: true,
          },
          {
            time: '13:00',
            reserved: false,
          },
          {
            time: '13:30',
            reserved: true,
          },
          {
            time: '14:00',
            reserved: false,
          },
          {
            time: '14:30',
            reserved: false,
          },
          {
            time: '15:00',
            reserved: true,
          },
          {
            time: '15:30',
            reserved: true,
          },
          {
            time: '16:00',
            reserved: false,
          },
          {
            time: '16:30',
            reserved: true,
          },
          {
            time: '17:00',
            reserved: true,
          },
        ],
      },
    ],
    visiblePrev: true,
    visibleNext: true,
    initItem: 0,
    sliderHeight: '100%',
  }),
  mounted() {
    this.getSliderHeight();
  },
  methods: {
    selectTime({ date, time }) {
      const value = {
        ...this.value,
        scheduleDate: date,
        scheduleTime: time,
      };
      this.$emit('input', value);
    },
    handleSlideReady(index) {
      this.initItem = index;
      this.visiblePrev = false;
    },
    handleSlide(index) {
      this.visibleNext = (this.initItem + 1 + index) !== this.calendar.length;
      this.visiblePrev = this.initItem !== index;
    },
    getSliderHeight() {
      this.sliderHeight = `${this.$refs.date[0].$el.clientHeight}px`;
    },
  },
};
</script>

<style lang="scss" scoped>

#wt-omni-widget {
  .wt-omni-widget-appointment-calendar {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    color: var(--contrast-color);
    gap: var(--gap-md);

    &__wrapper {
      @extend %wt-scrollbar;
      position: relative;
      overflow-y: auto;
      padding-right: var(--gap-md);

      @media (max-width: $breakpoint-xs) {
        padding-right: 0;
      }
    }
  }
  .vueperslides--fixed-height {
    margin-bottom: 0;
  }
}

</style>
