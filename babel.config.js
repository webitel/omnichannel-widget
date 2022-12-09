module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    '@babel/preset-env', // fixes jest @babel/plugin-proposal-private-methods
  ],
};
