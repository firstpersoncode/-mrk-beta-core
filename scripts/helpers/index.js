const chalk = require('chalk')

exports.logMessage = (message, level = 'info') => {
    const color =
        level === 'error'
            ? 'red'
            : level === 'warning'
            ? 'yellow'
            : level === 'info'
            ? 'blue'
            : 'white'
    // eslint-disable-next-line security/detect-object-injection
    console.log(`[${new Date().toISOString()}]`, chalk[color](message))
}

exports.compilerPromise = (name, compiler) => {
    return new Promise((resolve, reject) => {
        compiler.hooks.compile.tap(name, () => {
            logMessage(`[${name}] Compiling `)
        })
        compiler.hooks.done.tap(name, (stats) => {
            if (!stats.hasErrors()) {
                return resolve()
            }
            return reject(`Failed to compile ${name}`)
        })
    })
}

exports.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

exports.clientOnly = () => process.argv.includes('--client-only')
