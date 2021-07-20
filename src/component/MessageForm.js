import React from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../index'
import screp from './image/screp.svg'
import send from './image/send.svg'
import VoiceMessage from './VoiceMessage'

function MessageForm({ name }) {
    let [text, setText] = React.useState('')
    let user = useSelector(state => state.userReducer.user)

    function setMessages(text, e) {
        e.preventDefault()
        if (!text) return
        socket.emit('message', {
            name,
            text,
            room: user.room,
            img: false,
            voice: false
        })
        setText('')
    }

    async function send_img(e) {
        if (e.target.files[0]) {
            if (e.target.files[0].type.includes('/jpeg') || 
                e.target.files[0].type.includes('/png') ||
                e.target.files[0].type.includes('/jpg')
                ) {
                    let reader = new FileReader();
                    reader.onload = await function() {
                        socket.emit('message', {
                            name,
                            text: reader.result,
                            room: user.room,
                            img: true,
                            voice: false
                        })
                    };
            
                    reader.readAsDataURL(e.target.files[0]);
                }
        }
    }

    return (
        <form className="form" onSubmit={(e) => setMessages(text, e)}>
            <textarea type="text" value={text} onKeyPress={(e) => e.key === 'Enter' && setMessages(text, e)} onChange={(e) => setText(e.target.value)}></textarea>
            <div className='form__send'>
                <button className='form__button'><img src={send} width='17' height='17' alt=''/></button>
                <input  onChange={(e) => send_img(e)} accept=".jpg, .jpeg, .png" type="file" id='file' />
                <VoiceMessage name={name} text={text} room={user.room} />
                <label className='form__button ' htmlFor="file"><img src={screp} width='20' height='25' alt=''/></label>
            </div>
        </form> 
    )
}

export default MessageForm
