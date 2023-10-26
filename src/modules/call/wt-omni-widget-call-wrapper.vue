<template>
  <fragment>
    <content-wrapper>
      <wt-button @click="makeCall">call</wt-button>
      <wt-button @click="hangup">hangup</wt-button>
      <wt-button @click="toggleMute">toggle mute</wt-button>
      <wt-button @click="toggleHold">toggle hold</wt-button>
    </content-wrapper>
    <footer-wrapper>
    </footer-wrapper>
  </fragment>
</template>

<script>
import JsSIP from 'jssip';
import { Fragment } from 'vue-fragment';
import ContentWrapper
  from '../../app/components/wt-omni-widget-window/wt-omni-widget-window-content-wrapper/wt-omni-widget-window-content-wrapper.vue';
import FooterWrapper
  from '../../app/components/wt-omni-widget-window/wt-omni-widget-window-footer-wrapper/wt-omni-widget-window-footer-wrapper.vue';

export default {
  name: 'wt-omni-widget-call-wrapper',
  components: {
    Fragment,
    ContentWrapper,
    FooterWrapper,
  },
  data: () => ({
    phone: null,
    call: null,
  }),
  methods: {
    makeCall() {
      // Register callbacks to desired call events
      const eventHandlers = {
        'progress': function(e) {
          console.log('call is in progress');
        },
        'failed': function(e) {
          console.log('call failed with cause: ' + e);
        },
        'ended': function(e) {
          console.log('call ended with cause: ' + e);
        },
        'confirmed': function(e) {
          console.log('call confirmed');
        },
      };

      const options = {
        eventHandlers,
        mediaConstraints: { audio: true },
        sessionTimersExpires: 300,
      };
      this.call = this.phone.call('sip:call-from-web@dev.webitel.com', options);
    },
    hangup() {
      this.call.terminate();
    },
    toggleMute() {
      if (this.call.isMuted()) {
        this.call.unmute();
      } else {
        this.call.mute();
      }
    },
    toggleHold() {
      if (this.call.isOnHold()) {
        this.call.unhold();
      } else {
        this.call.hold();
      }
    },
  },
  mounted() {
    const socket = new JsSIP.WebSocketInterface(this.config.call.url);
    const configuration = {
      sockets: [socket],
      uri: 'sip:site@dev.webitel.com',
      register: false,
    };
    this.phone = new JsSIP.UA(configuration);
    this.phone.start();
  },
  beforeDestroy() {
    this.hangup();
    this.phone.stop();
  },
};
</script>

<style lang="scss" scoped>

</style>
