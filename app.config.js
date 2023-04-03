export default ({ config }) => ({
  ...config,
  icon:
    "https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/icon.png?raw=true",
  splash: {
    image: "./assets/splash-screen.png",
    resizeMode: "contain",
    backgroundColor: "#18181B",
  },
});
