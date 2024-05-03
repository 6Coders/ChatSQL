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
    '^.+\\.jsx?$': 'babel-jest',
  },

  moduleNameMapper: {
    "^axios$": "axios/dist/node/axios.cjs"
  },

   transformIgnorePatterns: [
    'node_modules/(?!(axios)/)',
    '/node_modules/(?!(bootstrap)/)',
    '\\.css$'
  ],
}
