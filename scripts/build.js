const webpack = require('webpack')
const chalk = require('chalk')
const rimraf = require('rimraf')

const webpackConfig = require('@mrk-beta/webpack').default

const { logMessage, compilerPromise } = require('./helpers')

const build = async () => {
    const { client: baseClient, server: baseServer } = webpackConfig
    rimraf.sync(baseClient.output.path)
    rimraf.sync(baseServer.output.path)

    const multiCompiler = webpack([baseClient, baseServer])

    const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client')
    const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server')

    const clientPromise = compilerPromise('client', clientCompiler)
    const serverPromise = compilerPromise('server', serverCompiler)
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    serverCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            // console.log(stats.toString(baseServer.stats))
            return
        }
        console.error(chalk.red(stats.compilation.errors))
    })
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    clientCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            // console.log(stats.toString(baseClient.stats))
            return
        }
        console.error(chalk.red(stats.compilation.errors))
    })

    // wait until client and server is compiled
    try {
        await serverPromise
        await clientPromise
        logMessage('Done!', 'info')
        process.exit(0)
    } catch (error) {
        logMessage(error, 'error')
        process.exit(1)
    }
}

build()
