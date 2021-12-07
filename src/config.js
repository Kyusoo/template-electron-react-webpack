class Config {

    static app = {
        "development": {
            width: 800,
            height: 600,
            title: `Electron + React + Webpack (DEV)`
        },
        "production": {
            width: 600,
            height: 400,
            title: `Electron + React + Webpack`
        }
    }
}

module.exports.Config = Config