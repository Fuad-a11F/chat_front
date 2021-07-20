import React from "react";

function Login({ send, setName, setRoom, room, name }) {
  return (
    <div className="login__page">
        <div>
            <div className='login__data'>
                <div>
                    <input type="text" value={name} placeholder='Введите логин' onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <input type="text" alue={room} placeholder='Введите комнату' onChange={(e) => setRoom(e.target.value)} />
                </div>
                {/* <div>
                    <select name="" id="">
                        <option value="red">Красный</option>
                        <option value="purple">Фиолетовый</option>
                        <option value="green">Зеленый</option>
                        <option value="yellow">Желтый</option>
                    </select>
                </div>
                    <input type="file" id='file' style={{display: 'none'}} />
                    <label htmlFor="file">Выберете изображение</label>
                <div>

                </div> */}
            </div>

            <div>
                <button onClick={send}>Войти</button>
            </div>
        </div>
    </div>
  );
}

export default Login;
