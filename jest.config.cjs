module.exports = {
  // other configurations
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
      "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // If you're using ES modules
  extensionsToTreatAsEsm: [".ts"],
};