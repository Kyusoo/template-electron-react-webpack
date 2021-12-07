const concurrently = require('concurrently')

concurrently([
    { command: 'npm run webpack:watch', name: 'Webpack'},
    { command: 'electron .', name: 'Electron'}
], {
    prefix: 'name',
    killOthers: ['failure', 'success']
}).then(
    exitInfo => {
        console.log(exitInfo)
    },
    exitInfo => {
        console.log(exitInfo)
    }
)