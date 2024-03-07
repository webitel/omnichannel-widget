<template>
  <section class="wt-omni-widget-window">
    <portal-target name="in-window-popup"></portal-target>
    <wt-omni-widget-header
      :channel="channel"
      @close="$emit('close')"
    ></wt-omni-widget-header>
    <!--    <component-->
    <!--      :is="`${channel}-wrapper`"-->
    <!--      :namespace="namespace"-->
    <!--    ></component>-->

    <button id="cptch" type="button">click me</button>

    <div id="g-recaptcha-v2"></div>
    <button id="cptch2" type="button">click me v2</button>
    {{ state }}
  </section>
</template>

<script>
import ChatWrapper from '../../../modules/chat/components/wt-omni-widget-chat-wrapper.vue';
import CallWrapper from '../../../modules/call/components/wt-omni-widget-call-wrapper.vue';
import WidgetChannel from '../../enums/WidgetChannel.enum';
import WtOmniWidgetHeader from './wt-omni-widget-window-header/wt-omni-widget-window-header.vue';

const script = document.createElement('script');
script.src = `https://www.google.com/recaptcha/api.js?render=${sitekey}`;
// script.async = true;
document.head.appendChild(script);

import axios from 'axios';

export default {
  name: 'wt-omni-widget-window',
  components: {
    WtOmniWidgetHeader,
    ChatWrapper,
    CallWrapper,
  },
  data: () => ({
    state: 'empty',
    sitekeyv2,
  }),
  props: {
    channel: {
      type: String, // WidgetChannel.enum
      required: true,
    },
  },
  computed: {
    namespace() {
      switch (this.channel) {
        case WidgetChannel.CHAT:
          return 'chat';
        case WidgetChannel.CALL:
          return 'call';
        default:
          throw new Error(`Unknown channel: ${this.channel}`);
      }
    },
  },
  methods: {
    onVerify(state, response) {
      // console.info('response', state, response);
      // this.state = state;
    },
  },
  mounted() {
    const button = document.getElementById('cptch');
    button.addEventListener('click', () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(sitekey, { action: 'homepage' })
        .then(async (token) => {
          this.onVerify('verified', token);
          const res = await axios.post('https://dev.webitel.com/api/recaptcha', {
            response: token,
            version: '3',
          });
          console.info(res.data.success, res.data.score);
        });
      });
    });

    const button2 = document.getElementById('cptch2');
    button2.addEventListener('click', () => {
      window.grecaptcha.render(document.getElementById('g-recaptcha-v2'), {
        sitekey: sitekeyv2,
        callback: async (response) => {
          this.onVerify('verified v2', response);
          const res = await axios.post('https://dev.webitel.com/api/recaptcha', {
            version: '2',
            response,
          });
          console.info(res.data);
        },
      });
    });
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-window {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    width: calc(100vw - var(--chat-offset) * 2);
    max-width: 390px;
    height: calc(100vh - var(--chat-offset) * 2);
    max-height: 560px;
    padding: var(--main-app-padding);
    border-radius: var(--border-radius--square);
    background: var(--background-color);
    box-shadow: var(--morf-style-font);

    ::v-deep .wt-omni-widget-window-content-wrapper {
      flex-grow: 1;
      min-height: 0;
      margin-bottom: 10px;
    }
  }

  .wt-omni-widget-window-header {
    margin-bottom: 10px;
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-window {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
