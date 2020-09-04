export default {
  bind(elem, { value }) {
    window.M.Tooltip.init(elem, { html: value, position: "left" });
  },
  unbind(elem) {
    const tooltip = window.M.Tooltip.getInstance(elem);
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
