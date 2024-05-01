module.exports = {
  preset: '@vue/cli-plugin-unit-jest',

  // Directory dove Jest deve cercare i moduli
  moduleDirectories: ['node_modules', 'src'],
  
  // Indica se Jest deve raccogliere la copertura del codice
  collectCoverage: true,
  
  // Directory dove Jest deve mettere i risultati della copertura
  coverageDirectory: '<rootDir>/coverage',

  transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
}
