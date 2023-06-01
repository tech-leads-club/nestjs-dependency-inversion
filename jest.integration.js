module.exports = {
  collectcoveragefrom: ['**/*.(t|j)s'],
  coveragedirectory: '../coverage/integration',
  moduledirectories: ['node_modules', '<rootdir>'],
  modulefileextensions: ['js', 'json', 'ts'],
  modulenamemapper: {
    '^@api/(.*)$': '<rootdir>/src/$1',
    '^@resources/(.*)$': '<rootdir>/resources/$1'
  },
  rootdir: '.',
  setupfiles: ['<rootdir>/test/integration/setup.ts'],
  testenvironment: 'node',
  testregex: '.test.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  transformignorepatterns: ['/node_modules/(?!(axios)/)']
}
