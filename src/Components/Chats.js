import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createMessage, createMessage1 } from '../store';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Chats = ()=> {
    const { messages, auth, onlineUsers, users } = useSelector(state => state)
    const dispatch = useDispatch();

    const chatMap = messages.reduce((acc, message) => {
        const withUser = message.fromId === auth.id ? message.to : message.from;
        
        const online = onlineUsers.find(user => user.id === withUser.id)
        acc[withUser.id] = acc[withUser.id] || { messages: [], withUser, online };
        acc[withUser.id].messages.push({...message, mine: auth.id === message.fromId});
        return acc
    }, {});
    const chats = Object.values(chatMap)
    
    return (
    <div>
        <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Chats</h1>

{
    !!auth.id && (
      <div style={{float: 'right'}}>
         <Card sx={{ width: 300  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Online Users ({onlineUsers.length}):
        </Typography>
        <ul>
              {onlineUsers.map(user => {
                return(
                  <li key={user.id} style={{ display: 'flex', alignItems: 'center'}}>
                    {user.username}
                        <Stack direction="row" spacing={1}>
                                    <IconButton 
                                     onClick={()=> {
                                        dispatch(createMessage1({ toId: user.id, txt: 'Hey!'}))
                                     }}
                                     color="primary" aria-label="Send Message" disabled={messages.find(message => message.fromId === user.id || message.toId === user.Id)}>
                                        <SendTwoToneIcon />
                                    </IconButton>
                        </Stack>
                  </li>
                )
              })}
            </ul>
      </CardContent>
     
    </Card>   

    <Card sx={{ width: 300  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Online Users ({users.length}):
        </Typography>
        <ul>
              {users.map(user => {
                return(
                  <li key={user.id} style={{ display: 'flex', alignItems: 'center'}}>
                    {user.username}
                        <Stack direction="row" spacing={1}>
                                     <IconButton 
                                     onClick={()=> {
                                        dispatch(createMessage1({ toId: user.id, txt: 'Hey!'}))
                                     }}
                                     color="primary" aria-label="Send Message" disabled={messages.find(message => message.fromId === user.id || message.toId === user.Id)}>
                                        <SendTwoToneIcon />
                                   </IconButton>
                                 </Stack>
                  </li>
                )
              })}
            </ul>
      </CardContent>
     
    </Card>   
      </div>
    )
  }
        <div id='chats' style={{ width: 500 }}>

            {
                chats.map( (chat, idx) => {
                    return (
                        <div key={ idx } className={ chat.online ? 'online' : ''}>
                            <h3 style={{ marginLeft: 210}}>{ chat.withUser.username }</h3>
                            <ul style={{listStyle: 'none'}}>
                                {
                                    chat.messages.map( message => {
                                        return (
                                            message.fromId === auth.id ?
                                            <li key={message.id} style={{ width: 400, maxHeight: 700}} className={ !message.mine ? 'yours' : 'mine'}>
                                               <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'flex-end' }}>
                                                  <CardContent>
                                                      <Typography variant="body2">
                                                          { message.txt }
                                                      </Typography>
                                                  </CardContent>
                                                  
                                              </Card>
                                            </li> : <li key={message.id} style={{ width: 400, maxHeight: 700}}>
                                               <Card sx={{ minWidth: 275 }}>
                                                  <CardContent>
                                                      <Typography variant="body2">
                                                          { message.txt }
                                                      </Typography>
                                                  </CardContent>
                                                  
                                              </Card>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <form onSubmit={(ev)=> { 
                                ev.preventDefault();
                                const txt = ev.target.querySelector('input').value;
                                dispatch(createMessage1({ txt, toId: chat.withUser.id }));
                                ev.target.querySelector('input').value = '';
                            }
                        }>
                                
                                <TextField label="Message" variant="outlined" style={{ width: 400, marginLeft: 40 }}/>
                                  
                            </form>
                        </div>
                    )
                })
            }
        </div>
    </div>
    )
}


export default Chats;

                           
                            

    