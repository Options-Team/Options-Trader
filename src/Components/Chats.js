import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createMessage } from '../store';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Chats = ()=> {
  const { auth, messages, onlineUsers } = useSelector(state => state);
  const dispatch = useDispatch();
  const [txt, setTxt] = useState('')
  const [toId, setToId] = useState('')
  const fromId = auth.id

  let sorted = messages.sort((a, b) => a.num - b.num)
  console.log(sorted)
  
const chats = messages.reduce((acc, message) => {
    if(message.fromId !== auth.id){
        if(!acc[message.fromId]){
            acc[message.fromId] = []
             acc[message.fromId].push(message)
        } else if( acc[message.fromId] ){
             acc[message.fromId].push(message)
        }
    } else {
        if(!acc[message.toId]){
            acc[message.toId] = []
             acc[message.toId].push(message)
        } else if( acc[message.toId] ){
             acc[message.toId].push(message)
        }
    }
    return acc
}, {})


  let usersMessages = messages.filter(message => {
    return message.toId === auth.id
  })

  let usersOutgoing = messages.filter(message => {
    return message.toId !== auth.id
  })

const sendMessage = async (ev)=> {
    ev.preventDefault()

    await dispatch(createMessage({ toId, fromId, txt}))
    setTxt('')
}


  return (
    <div>
      <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Chats</h1>
        { auth.id ? <div> Welcome { auth.username }!!
        <button onClick={()=> dispatch(logout())}>Logout</button>
      </div> : <Link to='/login' style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Login</Link>}
      <div>
      {
        !!auth.id && (
          <div>
            <h1>Online Users ({onlineUsers.length})</h1>
            <ul>
              {onlineUsers.map(user => {
                return(
                  <li key={user.id}>
                    {user.username}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }
     
       {
        !!auth.id && (
          <div>
            <h1> Chats ({Object.keys(chats).length})</h1>
            {Object.values(chats).map((chat, idx) => {
                return( 
                    <ul key={idx} style={{listStyle: 'none'}}>
                        <h3>{chat[0].from.username !== auth.id ? chat[0].from.username : chat[1].from.username}</h3>
                        {chat.map(message => {
                           
                            
                            return(
                                message.fromId === auth.id ?
                                <li key={message.id} style={{ width: 500}}>
                                   <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'flex-end' }}>
                                      <CardContent>
                                          <Typography variant="body2">
                                              { message.txt }
                                          </Typography>
                                      </CardContent>
                                      
                                  </Card>
                                </li> : <div key={message.id}> <li key={message.id} style={{ width: 500}}>
                                   <Card sx={{ minWidth: 275 }}>
                                      <CardContent>
                                          <Typography variant="body2">
                                              { message.txt }
                                          </Typography>
                                      </CardContent>
                                      
                                  </Card>
                                </li>
                            
                               
                                </div>
                   
                            )
                        })}
                        <div>
                         <form onSubmit={ sendMessage } style={{ display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                        <Box>
                            <FormControl sx={{ minWidth: 100 }}>
                                <InputLabel id="demo-simple-select-label">Send To</InputLabel>
                                <Select
                                value={ toId }
                                label="Send To"
                                onChange={(ev) => setToId(ev.target.value)}
                               
                                >
                                    {onlineUsers.map(onlineUser => {
                                        return (
                                            <MenuItem key={onlineUser.id} value={onlineUser.id}>{onlineUser.username}</MenuItem>
                                        )
                                    })}
                                
                            
                                </Select>
                            </FormControl>
                        </Box>
                            <TextField label="Message" variant="outlined" value={ txt } onChange={ev => setTxt(ev.target.value)} style={{ width: 400 }}/>
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" aria-label="Send Message" onClick={ sendMessage }>
                                        <SendTwoToneIcon />
                                    </IconButton>
                                </Stack>

                         </form>
                         </div>
                    </ul>
                )
            })}
          </div>
        )
      }
       
     
      </div>
    </div>
  );
};

export default Chats;


 