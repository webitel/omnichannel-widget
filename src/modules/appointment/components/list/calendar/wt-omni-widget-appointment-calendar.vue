<template>
  <article class="wt-omni-widget-appointment-calendar">
    <calendar-title
      :disabled-prev="disabledPrev"
      :disabled-next="disabledNext"
      @previous="$refs.myVueperSlides.previous()"
      @next="$refs.myVueperSlides.next()"
    >
      {{ timeZone }}
    </calendar-title>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
    <vueper-slides
      ref="myVueperSlides"
      class="no-shadow"
      :visible-slides="calendar.length > 7 ? 7 : calendar.length"
      :gap="2"
      :dragging-distance="70"
      :slide-ratio="11 / 12"
      :bullets="false"
      :touchable="false"
      :arrows="false"
      :infinite="false"
      :initSlide="4"
      :breakpoints="{
        1024: {
        visibleSlides: calendar.length > 5 ? 5 : calendar.length,
        slideRatio: '1.21',
        },
        820: {
        visibleSlides: calendar.length > 3 ? 3 : calendar.length,
        slideRatio: '1.69',
        },
      }"
      @ready="handleReady($event)"
      @next="handleNext($event)"
      @previous="handlePrev($event)"
    >
      <vueper-slide v-for="({ date, times }, index) of calendar" :key="date">
        <template #content>
          <calendar-date
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
import CalendarDate from './wt-omni-widget-appointment-calendar-date.vue';

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
    position: 0,
    step: 1, // how many date items should be changing
    visibleItems: 2, // how many date items can be visible
    breakpoints: {
      lg: 1024,
      md: 820,
      sm: 648,
    },
    popUpWidth: 0,
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
    disabledPrev: false,
    disabledNext: false,
  }),
  // mounted() {
  //   console.log(document.getElementsByClassName('wt-omni-widget-popup__popup')[0].getBoundingClientRect());
  //   window.addEventListener('resize', () => {
  //     this.popUpWidth = document.getElementsByClassName('wt-omni-widget-popup__popup')[0].clientWidth;
  //   });
  // },
  computed: {
    maxVisibleItems() {
      const popup = document.getElementsByClassName('wt-omni-widget-popup__popup')[0];
      console.log('this.popUpWidth:', this.popUpWidth);
      // треба визначати ширину попапу та фіксувати її
      // треба відстежувати зміну розміру попапу
      switch (this.popUpWidth) {
        case this.breakpoints.lg: return 7;
        case this.breakpoints.md: return 5;
        case this.breakpoints.sm: return 3;
        default: return 3;
      }
    },
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
    handleReady(params) {
      console.log('ready:', params, 'calendar.length:', this.calendar.length);
      this.disabledPrev = 4 - 1 === params.currentSlide.index;
      this.disabledNext = (4 + 1 + params.currentSlide.index) === this.calendar.length;
    },
    handlePrev(params) {
      this.disabledPrev = 4 - 1 === params.currentSlide.index;
    },
    handleNext(params) {
      this.disabledNext = (4 + 1 + params.currentSlide.index) === this.calendar.length;
      console.log((4 + 1 + params.currentSlide.index) === this.calendar.length);
    },
    // isDateHidden(index) {
    //   console.log('index', index, index < this.position && index >= (this.position + this.maxVisibleItems));
    //   return index < this.position || index >= (this.position + this.maxVisibleItems);
    // },
    handlePrevDate() {
      console.log('click', this.$refs.slider);
      this.$refs.slider.prev();
    },
    handleNextDate() {
      if (this.position + this.maxVisibleItems < this.calendar.length) this.position += this.step;
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
    min-height: 0;
    color: var(--contrast-color);
    gap: var(--gap-md);
    //width: 73%;

    @media (max-width: $breakpoint-xs) {
      min-height: auto;
    }

    &__wrapper {
      @extend %wt-scrollbar;
      position: relative;
      //display: flex;
      overflow-y: auto;
      //flex-grow: 1;
      //justify-content: space-between;
      padding-right: var(--gap-md);
      //gap: var(--gap-md);

      @media (max-width: $breakpoint-xs) {
        padding-right: 0;
      }
    }
  }

}
</style>
