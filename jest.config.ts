import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@auth/drizzle-adapter$": "<rootDir>/node_modules/@auth/drizzle-adapter",
  },
};

export default config;
