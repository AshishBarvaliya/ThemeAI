const frontendConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["<rootDir>/__tests__/frontend/**/*.[jt]s?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

const apiConfig = {
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@auth/drizzle-adapter$": "<rootDir>/node_modules/@auth/drizzle-adapter",
  },
  testMatch: ["<rootDir>/__tests__/api/**/*.[jt]s?(x)"],
};

module.exports = {
  projects: [apiConfig, frontendConfig],
};
