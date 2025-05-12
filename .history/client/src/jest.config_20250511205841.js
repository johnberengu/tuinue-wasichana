export default {
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx"],
    moduleDirectories: ["node_modules", "src"],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    testMatch: ["**/__tests__/**/*.test.jsx"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};