import './App.css';
import React, { useRef } from 'react';
import { socket } from './index'
import { useDispatch } from 'react-redux'
import Login from './component/login';
import {set_user} from './redux/actions'
import MessageForm from './component/MessageForm';
import UserRooms from './component/UserRooms';

function App() {
    const dispatch = useDispatch()
    let [name, setName] = React.useState('')
    let [room, setRoom] = React.useState('')
    let [page, setPage] = React.useState(true)
    let [mySms, setMySms] = React.useState([])  
    let message_ref = useRef()

    React.useEffect(() => {
        if (message_ref.current) message_ref.current.scrollTop = message_ref.current.scrollHeight
    }, [mySms])

    async function  send() {
        if (name && room) {
            setPage(false)
            dispatch(set_user({value: name, room}))
            socket.emit('joined', { value: name, room })
            socket.on('getMessage', data => {
                setMySms(data)
            })
        }
    }

  return (   
      <div className='App'>  
        {page && <Login name={name} room={room} setName={setName} setRoom={setRoom} send={send}/> }      

        {!page && <>
            <div className='main__page'>
                <UserRooms />
                <div ref={message_ref} className='messages__wrapper'>
                    {mySms.map((item, index) => {
                        if (item.name ===  name) {
                            if (item.img) {
                                return (<div key={index} className='message__body'>
                                            <div className="my__message" >
                                                <div>
                                                    <img width='350' height='230' src={item.text} alt='' />                   
                                                </div>
                                            </div>
                                            <p className='my_name'>{item.name}</p>
                                        </div>)
                            }

                            else if (item.voice) {
                                 return (<div key={index} className='message__body'>
                                            <div className="my__message ">
                                                <audio src={item.text} controls></audio>                     
                                            </div>
                                            <p className='my_name'>{item.name}</p>  
                                        </div>)

                            }

                            else {
                                return (<div key={index} className='message__body'>
                                            <div className="my__message">
                                                <p>{item.text}</p>
                                            </div>
                                            <p className='my_name'>{item.name}</p>
                                        </div>)
                            }       
                        }

                        else {
                            if (item.img) {
                                return (<div key={index} className='message__body'>
                                            <div className="someone__message">
                                                <img width='300' height='200' src={item.text} alt="" />
                                            </div>
                                            <p className='someone_name'>{item.name}</p>
                                        </div>)
                            }

                            else if (item.voice) {
                                return (<div key={index} className='message__body'>
                                            <div className="someone__message">
                                                <audio src={item.text} controls ></audio>
                                            </div>
                                            <p className='someone_name'>{item.name}</p>
                                        </div>)
                            }
                            
                            else {
                                return (<div key={index} className='message__body'>
                                            <div className="someone__message">
                                                <p>{item.text}</p>
                                            </div>
                                            <p className='someone_name'>{item.name}</p>
                                        </div>)
                            }
                        }
                         
                    })}
                </div>        
                <MessageForm name={name}/> 
            </div>
        </> }
 
      </div> 
  );
}

export default App;
