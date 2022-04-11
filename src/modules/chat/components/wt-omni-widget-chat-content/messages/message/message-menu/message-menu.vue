<template>
  <footer
    v-if="showMenu"
    class="wt-omni-widget-chat-message-menu"
  >
    <menu-button
      v-for="(button, key) of menu"
      :key="key"
      :type="button.type"
      @click="handleMenuInput(button)"
    >{{ button.text || button.code || button }}
    </menu-button>
  </footer>
</template>

<script>
import { mapActions } from 'vuex';
import MenuButton from './menu-button.vue';
import MenuButtonType from '../../../../../enums/MenuButtonType.enum';

const ALLOWED_BUTTON_TYPES = {
  [MenuButtonType.REPLY]: true,
  [MenuButtonType.POSTBACK]: true,
  [MenuButtonType.URL]: true,
};

export default {
  name: 'message-menu',
  components: { MenuButton },
  props: {
    buttons: {
      type: Array,
      required: true,
    },
    namespace: {
      type: String,
    },
  },
  computed: {
    menu() {
      // [{ button: [{}, {}] }, { button: [{}] }] -> [{}, {}, {}]
      return this.buttons.reduce((buttons, { button }) => buttons.concat(
        button.filter(({ type }) => ALLOWED_BUTTON_TYPES[type]),
      ), []);
    },
    showMenu() {
      return this.menu.length;
    },
  },
  methods: {
    ...mapActions({
      sendMenu(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_MENU`, payload);
      },
    }),
    handleMenuInput(button) {
      switch (button.type) {
        case MenuButtonType.REPLY:
        case MenuButtonType.POSTBACK:
          this.sendMenu(button);
          break;
        case MenuButtonType.URL:
          this.openLink(button);
          break;
        default:
          console.error('Not supported button type handle error', button);
      }
    },
    openLink({ url }) {
      window.open(url, '_blank').focus();
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-chat-message-menu {
    --chat-menu-message-gap: 8px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--chat-menu-message-gap);
  }
}
</style>
