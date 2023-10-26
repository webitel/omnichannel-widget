<template>
  <a
    v-if="url"
    :class="`wt-omni-widget-btn--${type}`"
    :href="url"
    class="wt-omni-widget-btn"
    target="_blank"
  >
    <wt-icon
      :icon="type"
      color="contrast"
      icon-prefix="wt-omni-widget"
    ></wt-icon>
  </a>
  <button
    v-else
    :class="`wt-omni-widget-btn--${type}`"
    class="wt-omni-widget-btn"
    @click.prevent="$emit('click', type)"
  >
    <wt-icon
      :icon="type"
      color="contrast"
      icon-prefix="wt-omni-widget"
    ></wt-icon>
  </button>
</template>

<script>
export default {
  name: 'wt-omni-widget-button',
  props: {
    type: {
      type: String,
      required: true,
      options: ['chat', 'call', 'appointment', 'email', 'whatsapp', 'messenger', 'viber', 'telegram', 'open'],
    },
    url: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  $viber: #6F3FAA;
  $telegram: #7AA5DA;
  $email: #44ADFB;
  $whatsapp: #75B73B;
  $messenger: #4189BE;

  .wt-omni-widget-btn {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius--square);
    transition: var(--transition);
    cursor: pointer;
    background: var(--wt-omni-widget__accent-color);
    pointer-events: auto; // cause its wrapper p-events is none

    &:hover {
      box-shadow: var(--morf-style-up-50);
    }

    &--chat,
    &--appointment {
      background: var(--wt-omni-widget__accent-color);
    }
    &--viber {
      background: $viber;
    }
    &--whatsapp {
      background: $whatsapp;
    }
    &--telegram {
      background: $telegram;
    }
    &--email {
      background: $email;
    }
    &--messenger {
      background: $messenger;
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-btn {
      border-radius: var(--border-radius--rounded-btn);
    }
  }
}
</style>
