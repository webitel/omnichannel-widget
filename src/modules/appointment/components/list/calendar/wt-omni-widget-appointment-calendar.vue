<template>
  <article class="wt-omni-widget-appointment-calendar">
    <calendar-title
      :disabled-prev="disabledPrev"
      :disabled-next="disabledNext"
      :show-buttons="maxVisibleItems < calendar.length"
      @previous="$refs.myVueperSlides.previous()"
      @next="$refs.myVueperSlides.next()"
    >
      {{ timeZone }}
    </calendar-title>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <vueper-slides
        ref="myVueperSlides"
        class="no-shadow"
        :visible-slides="this.calendar.length > 7 ? 7 : this.calendar.length"
        :gap="2"
        :slide-ratio="11 / 12"
        :bullets="false"
        :touchable="false"
        :arrows="false"
        :infinite="false"
        :initSlide="4"
        :breakpoints="{
          1024: {
          visibleSlides: this.calendar.length > 5 ? 5 : this.calendar.length,
          slideRatio: '1.21',
          initSlide: 3,
          },
          820: {
          visibleSlides: this.calendar.length > 3 ? 3 : this.calendar.length,
          slideRatio: '1.69',
          initSlide: 2,
          },
        }"
        @ready="handleSlideReady($event.currentSlide.index)"
        @slide="handleSlide($event.currentSlide.index)"
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
    initItem: 0,
    breakpoints: {
      lg: 1024,
      md: 820,
      sm: 648,
    },
  }),
  mounted() {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const element = entry.contentRect;
        console.log('Element:', entry.target);
        console.log(`Element size: ${element.width + element.x*2}px x ${element.height}px`);
        console.log('element padding: ', element);
        //визначати initItem саме для цього бп
        switch (element.width + element.x*2) {
          case this.breakpoints.lg: this.handleSlideReady(4);
          break;
          case this.breakpoints.md: this.handleSlideReady(3);
          break;
          case this.breakpoints.sm: this.handleSlideReady(2);
          break
        }
      }
    });
    resizeObserver.observe(document.getElementsByClassName('wt-omni-widget-popup__popup')[0]);
  },
  computed: {
    maxVisibleItems() {
      if (this.isCurrentBreakpoint(this.breakpoints.lg)) return 7;
      if (this.isCurrentBreakpoint(this.breakpoints.md)) return 5;
      return 3;
    }
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
      console.log('ready:', index, 'calendar.length:', this.calendar.length, this.maxVisibleItems);
      this.initItem = index;
      this.disabledPrev = true;
      this.$refs.myVueperSlides.goToSlide(index);
    },
    handleSlide(index) {
      this.disabledNext = (this.initItem + 1 + index) === this.calendar.length;
      this.disabledPrev = this.initItem === index;
      document.getElementsByClassName('wt-omni-widget-popup__popup')
      // console.log('disabledNext:', (this.initItem + params.currentSlide.index) === this.calendar.length,
      //   'disabledPrev:', this.initItem - 1 === params.currentSlide.index,
      //   'params.currentSlide.index:', params.currentSlide.index);
    },
    isCurrentBreakpoint(value) {
      return window.matchMedia(`(min-width: ${value}px)`).matches;
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
