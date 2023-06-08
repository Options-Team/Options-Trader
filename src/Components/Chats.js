// import React, {useState} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../store';
// import { Link } from 'react-router-dom';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import { createMessage } from '../store';
// import IconButton from '@mui/material/IconButton';
// import Stack from '@mui/material/Stack';
// import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// //few buggy things... when you refresh the accounts page after I added the choose file to upload a picture it crashes because of the useRef I believe...

// const Chats = ()=> {
//   const { auth, messages, onlineUsers } = useSelector(state => state);
//   const dispatch = useDispatch();
//   const [txt, setTxt] = useState('')
//   const [toId, setToId] = useState('')
//   const fromId = auth.id

//   let sorted = messages.sort((a, b) => a.num - b.num)
 
  
// const chats = messages.reduce((acc, message) => {
//     if(message.fromId !== auth.id){
//         if(!acc[message.fromId]){
//             acc[message.fromId] = []
//              acc[message.fromId].push(message)
//         } else if( acc[message.fromId] ){
//              acc[message.fromId].push(message)
//         }
//     } else {
//         if(!acc[message.toId]){
//             acc[message.toId] = []
//              acc[message.toId].push(message)
//         } else if( acc[message.toId] ){
//              acc[message.toId].push(message)
//         }
//     }
//     return acc
// }, {})


//   let usersMessages = messages.filter(message => {
//     return message.toId === auth.id
//   })

//   let usersOutgoing = messages.filter(message => {
//     return message.toId !== auth.id
//   })

// const sendMessage = async (ev)=> {
//     ev.preventDefault()

//     await dispatch(createMessage({ toId, fromId, txt}))
//     setTxt('')
// }


//   return (
//     <div>
//       <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Chats</h1>
//         { auth.id ? <div> Welcome { auth.username }!!
//         <button onClick={()=> dispatch(logout())}>Logout</button>
//       </div> : <Link to='/login' style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Login</Link>}
//       <div>
//       {
//         !!auth.id && (
//           <div>
//             <h1>Online Users ({onlineUsers.length})</h1>
//             <ul>
//               {onlineUsers.map(user => {
//                 return(
//                   <li key={user.id}>
//                     {user.username}
//                   </li>
//                 )
//               })}
//             </ul>
//           </div>
//         )
//       }
     
//        {
//         !!auth.id && (
//           <div>
//             <h1> Chats ({Object.keys(chats).length})</h1>
//             {Object.values(chats).map((chat, idx) => {
//                 return( 
//                     <ul key={idx} style={{listStyle: 'none'}}>
//                         {/* trying to show the user the auth is chatting with using the fromId but need to locate the correct message first */}
//                         <h3>{chat[0].from.username !== auth.id ? chat[0].from.username : chat[1].from.username}</h3>
//                         {chat.map(message => {
                           
                            
//                             return(
//                                 message.fromId === auth.id ?
//                                 <li key={message.id} style={{ width: 500}}>
//                                    <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'flex-end' }}>
//                                       <CardContent>
//                                           <Typography variant="body2">
//                                               { message.txt }
//                                           </Typography>
//                                       </CardContent>
                                      
//                                   </Card>
//                                 </li> : <div key={message.id}> <li key={message.id} style={{ width: 500}}>
//                                    <Card sx={{ minWidth: 275 }}>
//                                       <CardContent>
//                                           <Typography variant="body2">
//                                               { message.txt }
//                                           </Typography>
//                                       </CardContent>
                                      
//                                   </Card>
//                                 </li>
                            
                               
//                                 </div>
                   
//                             )
//                         })}
//                         <div>
//                          <form onSubmit={ sendMessage } style={{ display: 'flex', flexDirection:'row', alignItems: 'center'}}>
//                         <Box>
//                             <FormControl sx={{ minWidth: 100 }}>
//                                 <InputLabel id="demo-simple-select-label">Send To</InputLabel>
//                                 <Select
//                                 value={ toId }
//                                 label="Send To"
//                                 onChange={(ev) => setToId(ev.target.value)}
                               
//                                 >
//                                     {onlineUsers.map(onlineUser => {
//                                         return (
//                                             <MenuItem key={onlineUser.id} value={onlineUser.id}>{onlineUser.username}</MenuItem>
//                                         )
//                                     })}
                                
                            
//                                 </Select>
//                             </FormControl>
//                         </Box>
//                             <TextField label="Message" variant="outlined" value={ txt } onChange={ev => setTxt(ev.target.value)} style={{ width: 400 }}/>
//                                 <Stack direction="row" spacing={1}>
//                                     <IconButton color="primary" aria-label="Send Message" onClick={ sendMessage }>
//                                         <SendTwoToneIcon />
//                                     </IconButton>
//                                 </Stack>

//                          </form>
//                          </div>
//                     </ul>
//                 )
//             })}
//           </div>
//         )
//       }
       
     
//       </div>
//     </div>
//   );
// };

// export default Chats;


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

//few buggy things... when you refresh the accounts page after I added the choose file to upload a picture it crashes because of the useRef I believe...

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
        {/* {
        !!auth.id && (
          <div>
            <h1>Online Users ({onlineUsers.length})</h1>
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
            
          </div>
        )
      } */}

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

                           
                            

    