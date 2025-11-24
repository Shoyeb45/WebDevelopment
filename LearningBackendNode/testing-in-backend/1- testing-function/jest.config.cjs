const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  transform: tsJestTransformCfg,
  extensionsToTreatAsEsm: [".ts"]
};
