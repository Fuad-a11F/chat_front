import React from 'react'
import micro from './image/micro.svg'
import { socket } from '../index'

let mediaRecorder;
const VoiceMessage = ({ name, room }) => {

    let [record, setRecord] = React.useState(false)

    function media_action() {
        if (!record) {
            setRecord(true)
            mediaRecorder.start()
        }
        else if (record) {
            setRecord(false)
            mediaRecorder.stop()
        }
    }

    React.useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
                mediaRecorder = new MediaRecorder(stream);
        
                let chunks = [];
        
                mediaRecorder.ondataavailable = function(e) {
                    chunks.push(e.data);        
                }
        
                mediaRecorder.onstop = function(e) {             
                    const audio = document.createElement('audio');
                    
                    const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                    const audioURL = window.URL.createObjectURL(blob);
                    audio.src = audioURL;
                    audio.setAttribute('controls', 'controls');
                    chunks = []
                    socket.emit('message', {
                        name, 
                        text: audioURL,
                        room,
                        img: false,
                        voice: true
                    })
                    
                }
        
               })
               .catch(function(err) {
                  console.log('The following getUserMedia error occured: ' + err);
               }
            );
         } else {
            console.log('getUserMedia not supported on your browser!');
         }
    }, [])

    return (
        <button onClick={() => media_action()} style={!record ? {backgroundColor: 'lightgray'} : {backgroundColor: 'red'}} className='form__button right'><img src={micro} width='18' height='25' alt=''/></button>
    )
}

export default VoiceMessage
