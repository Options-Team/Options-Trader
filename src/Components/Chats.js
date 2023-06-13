import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { destroyFriend, logout, updateFriend } from '../store';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createMessage, createMessage1, createFriend, createHype } from '../store';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const Chats = ()=> {
    const { messages, auth, onlineUsers, users, friends, hypes } = useSelector(state => state)
    const dispatch = useDispatch();

    const chatMap = messages.reduce((acc, message) => {
        const withUser = message.fromId === auth.id ? message.to : message.from;
        
        const online = onlineUsers.find(user => user.id === withUser.id)
        acc[withUser.id] = acc[withUser.id] || { messages: [], withUser, online };
        acc[withUser.id].messages.push({...message, mine: auth.id === message.fromId});
        return acc
    }, {});
    const chats = Object.values(chatMap)

    const friendRequestsPending = friends.filter(friend => friend.toId === auth.id && friend.status === 'Pending')

    const friendsList = friends.filter(friend =>( friend.toId === auth.id || friend.fromId === auth.id)  && friend.status === 'Accepted')

    const hypeList = hypes.filter((hype) => hype.toId === auth.id)
    const lastFiveHypes = hypeList.filter((hype, idx) => idx > hypeList.length - 6 )

    const acceptFriend = async (friend) => {
      friend.status = 'Accepted'
      await dispatch(updateFriend(friend))
    }

    const denyFriend = (friendId) => {
      console.log()
      dispatch(destroyFriend(friendId)) 
    }

    //CHAT NOTES... scheduler to delete data... reminder type stuff... CHEAP WAY delete pokes if too old, only show ones that are X old

    
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
                                     color="primary" aria-label="Send Message" disabled={messages.find(message => message.fromId === user.id || message.toId === user.id) || user.id === auth.id ? true : false}>
                                        <SendTwoToneIcon />
                                    </IconButton>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                                    <IconButton 
                                     onClick={()=> {
                                        dispatch(createFriend({ toId: user.id}))
                                     }}
                                     color="primary" aria-label="Send Friend Request" disabled={friends.find(friend => friend.fromId === user.id || friend.toId === user.id) ? true : user.id === auth.id ? true : false}>
                                        <PersonAddIcon />
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
          Users ({users.length}):
        </Typography>
        <ul>
              {users.map(user => {
                return(
                  <li key={user.id} style={{ display: 'flex', alignItems: 'center'}}>
                    {user.username}
                    
                     { user.id !== auth.id ? <div style={{ display: 'flex', alignItems: 'center'}}><Stack direction="row" spacing={1}>
                                     <IconButton 
                                     onClick={()=> {
                                        dispatch(createMessage1({ toId: user.id, txt: 'Hey!'}))
                                     }}
                                     color="primary" aria-label="Send Message" disabled={messages.find(message => message.fromId === user.id || message.toId === user.id) || user.id === auth.id ? true : false}>
                                        <SendTwoToneIcon />
                                   </IconButton>
                                 </Stack>
                                  <Stack direction="row" spacing={1}>
                                    <IconButton 
                                     onClick={()=> {
                                        dispatch(createFriend({ toId: user.id}))
                                     }}
                                     color="primary" aria-label="Send Friend Request" disabled={friends.find(friend => friend.fromId === user.id || friend.toId === user.id) ? true : user.id === auth.id ? true : false}>
                                        <PersonAddIcon />
                                    </IconButton>
                                  </Stack></div> : null}
                                  
                  </li>
                )
              })}
            </ul>
      </CardContent>
     
    </Card>   

{friendRequestsPending.length ? <Card sx={{ width: 300  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Friend Requests ({friendRequestsPending.length}):
        </Typography>
        <ul>
              {friendRequestsPending ? friendRequestsPending.map(user => {
                return(
                  <li key={user.id} style={{ display: 'flex', alignItems: 'center'}}>
                    {user.from.username}
                        <Stack direction="row" spacing={1}>
                                    <IconButton 
                                     onClick={()=> {
                                      acceptFriend(user)
                                     }}
                                     color="primary" aria-label="Accept Friend Request" >
                                        <CheckCircleIcon />
                                    </IconButton>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                                    <IconButton 
                                     onClick={()=> {
                                        denyFriend(user.id)
                                     }}
                                     color="primary" aria-label="Deny Friend Request" >
                                        <DoNotDisturbOnIcon />
                                    </IconButton>
                        </Stack>

                  </li>
                )
              }) : null }

              
            </ul>
      </CardContent>
     
    </Card> : null}

    {friendsList.length ? <Card sx={{ width: 300  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Friends ({friendsList.length}):
        </Typography>
        <ul>
              {friendsList.length ? friendsList.map(friend => {
                return(
                  <li key={friend.id} style={{ display: 'flex', alignItems: 'center'}}>
                    {friend.from.username !== auth.username ? friend.from.username : friend.to.username}
                    <Stack direction="row" spacing={1}>
                                    <IconButton 
                                     onClick={()=> {
                                        friend.fromId === auth.id ? dispatch(createHype({ toId: friend.toId})) : dispatch(createHype({ toId: friend.fromId}))
                                     }}
                                     color="primary" aria-label="Hype Your Friend Up">
                                        <AccessibilityNewIcon />
                                    </IconButton>
                                  </Stack>
                  </li>
                )
              }) : null }
           
            </ul>
      </CardContent>
     
    </Card> : null}

    {hypeList.length ? 
      
        <ul style={{ listStyle: 'none'}}>
              {hypeList.length ? lastFiveHypes.map(hype => {
                return(
                  <li key={hype.id} style={{ display: 'flex', alignItems: 'center', width: 300}}>
                    <Alert severity="success">{hype.from.username !== auth.username ? hype.from.username : hype.to.username} Hyped you up!</Alert>
                  </li>
                )
              }) : null }
           
            </ul>
      
     
    : null}
     
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

                           
                            

    