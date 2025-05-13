export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.test.{js,jsx,ts,tsx}"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  globals: {},
};
