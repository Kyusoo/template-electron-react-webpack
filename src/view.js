import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { IPC } from './ipc'

// This module runs on Render Process

const App = () => {

    const [message, setMessage] = useState('')

    const onClickHandler = (e) => {
        console.log(`[Renderer][Log] ${message}`)

        IPC.sendToMain('Log', message)
    }

    return (
        <div>
            <h1>Electron + React + WebPack</h1>
            { MODE === 'development' &&
            <div>
                <h3>Open Dev Tool : Cmd(MAC) or Ctrl(Windows) + F12 </h3>
                <div>
                    <span> Send a message to Main Process </span>
                    <input placeholder="Message" onChange={e => setMessage(e.target.value)} />
                    <button onClick={onClickHandler}>Send</button>
                </div>
            </div>
            }
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))