// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/js-with-ts", // ⬅ necessário para suportar JSX (tsx)
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
};

export default config;
