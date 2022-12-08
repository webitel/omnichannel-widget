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
    <div
      class="wt-omni-widget-appointment-calendar__wrapper"
      v-if="calendar"
    >
      <vueper-slides
        ref="myVueperSlides"
        class="no-shadow"
        :class="'wt-omni-widget-appointment-calendar__slider'"
        :visible-slides="calendar.length > 7 ? 7 : calendar.length"
        :gap="2"
        :fixed-height="sliderHeight"
        :bullets="false"
        :touchable="false"
        :arrows="false"
        :infinite="false"
        :initSlide="4"
        :breakpoints="{
          1024: {
          visibleSlides: calendar.length > 5 ? 5 : calendar.length,
          initSlide: 3,
          },
          820: {
          visibleSlides: calendar.length > 3 ? 3 : calendar.length,
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
    calendar: {
      type: Array,
    },
    timeZone: {
      type: String,
    },
  },
  data: () => ({
    visiblePrev: true,
    visibleNext: true,
    initItem: 0,
    sliderHeight: '672px',
  }),
  mounted() {
    // this.getSliderHeight();
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
