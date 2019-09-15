module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.js': 'babel-jest',
    },
    testRegex: '(\\.|/)(test|spec)\\.(t|j)s',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
}
