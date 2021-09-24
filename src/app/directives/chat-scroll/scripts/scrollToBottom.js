const scrollToBottom = (el) => {
  if (typeof el.scroll === 'function') {
    el.scroll({ top: el.scrollHeight });
  } else {
    // eslint-disable-next-line no-param-reassign
    el.scrollTop = el.scrollHeight;
  }
};

export default scrollToBottom;
