import './App.css';
import React from 'react';
import io from 'socket.io-client'
import axios from 'axios';

let socket = io.connect("https://server-chat-react.herokuapp.com/")
function App() {
    let [value, setValue] = React.useState()
    let [value11, setValue11] = React.useState()
    let [page, setPage] = React.useState(true)
    let [mySms, setMySms] = React.useState([])  

    async function  send() {
        await axios.post('https://server-chat-react.herokuapp.com/room', {
            name: value
        })
        setPage(false)
        socket.emit('joined', value )
        socket.on('getMessage', data => {
            setMySms(data)
        })
    }

    function setMessages(value11) {
        if (!value11) return
        socket.emit('message', {
            value,
            value11
        })
        setValue11('')
    }

  return (   
      <div className='App'>  
        {page && <div className='login__page'>
                    <div>
                        <div>
                            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                        </div>
                        <div>
                            <button onClick={send}>Войти</button>
                        </div>                  
                    </div>         
                </div> }      

        {!page && <div className='main__page'>
            {mySms.map(item => {
                if (item.name ===  value) {
                    return (<div className='message__body'>
                        <div className="my__message">
                            <div>{item.text}</div>                      
                        </div>
                        <p className='my_name'>{item.name}</p>
                    </div>)
                }
                else 
                    return (<div className='message__body'>
                        <div className="someone__message">
                            <div>{item.text}</div>
                        </div>
                        <p>{item.name}</p>
                    </div>)
            })}
           
        </div>}
        <div className="form">
            <textarea type="text" value={value11} onChange={(e) => setValue11(e.target.value)} rows='3'></textarea>
            <button onClick={() => setMessages(value11)}>Отправить</button>
        </div>   
      </div> 
  );
}

export default App;
