module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // Directory dove Jest deve cercare i test
  testMatch: ['<rootDir>/tests/**/*.spec.js'],

  // Directory dove Jest deve cercare i moduli
  moduleDirectories: ['node_modules', 'src'],

  // Indica se Jest deve raccogliere la copertura del codice
  collectCoverage: true,

  // Directory dove Jest deve mettere i risultati della copertura
  coverageDirectory: '<rootDir>/coverage',

  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },

  snapshotSerializers: [
    'jest-serializer-vue',
  ],

  testURL: 'http://localhost/',

  moduleFileExtensions: [
    'js',
    'json',
    // tell Jest to handle `*.vue` files
    'vue'
  ],

  moduleNameMapper: {
    "^axios$": "axios/dist/node/axios.cjs",
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)',
    '/node_modules/(?!(bootstrap)/)',
    '\\.css$'
  ],
}
