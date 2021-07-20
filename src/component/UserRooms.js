import React from 'react'
import { socket } from '../index'

function UserRooms() {
    let [usersRoom, setUsersRoom] = React.useState([])
    React.useEffect(() => {
        socket.on('getUsers', data => setUsersRoom(data))
    }, [])
    
    return (
        <div className='user__rooms'>
            <h3>Люди в чате:</h3>
            {usersRoom && (
                usersRoom.map(item => {
                    return <p key={item.value}>{item.value}</p>
                })
            )}
        </div>
    )
}

export default UserRooms
