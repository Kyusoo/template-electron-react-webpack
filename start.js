const chalk = require('chalk') // From ver 5.0.0 chalk is pure ESM, cannot use require.
const { exec } = require('child_process')
const { EOL } = require('os')
const EventEmitter = require('events')

const eventEmitter = new EventEmitter()

const launchElectron = delayTime => {
    setTimeout(() => {
        console.log('Launch Electron !')
        const launchElectron = exec('electron .')

        launchElectron.stdout.on('data', data => {
            console.log(data.toString())
        })

        launchElectron.on('exit', code => {
            console.log(`Exit Code = ${code}`)

            if(code === 88) {
                eventEmitter.emit('electron-reload', 0)
            }
            else {
                process.exit(code)
            }
        })

    }, delayTime)
}

eventEmitter.once('electron-init', () => {
    launchElectron(0)
})

eventEmitter.on('electron-reload', (delayTime) => {
    launchElectron(delayTime)
})

const webpackWatch = exec('npm run webpack:watch')
webpackWatch.stdout.on('data', data => {
    console.log(data.toString())

    data.toString().split(EOL).forEach(line => {
        if(line.includes('compiled')) {
            if(line.includes('successfully')) {
                console.log(`Webpack Compiled ${chalk.green('Successfully')}`)
                eventEmitter.emit('electron-init')
            }
            else {
                // Webpack Compile Error
                console.log(`Webpack Compiled ${chalk.red('Failed')}`)
            }
        }
    })
})