module.exports = {
  useEslint: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/style.scss";`,
      },
    },
  },
};
