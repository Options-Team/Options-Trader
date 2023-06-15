import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X_RapidAPI_Key } from '../../secrets';
import { logout } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Carousel from './Carousel';


const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [marketTrend, setMarketTrend] = useState('')
  const [trends, setTrends] = useState([])
  const [news, setNews] = useState([])

  const goToDeposit = ()=> {
    navigate('/deposit')
  };

  const marketTrendsAPICall = async () => {
    const options = {
        method: 'GET',
        url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
        params: {
          trend_type: `${marketTrend}`,
          country: 'us',
          language: 'en'
        },
        headers: {
          'X-RapidAPI-Key': `${X_RapidAPI_Key}`,
          'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data)
        console.log(response.data.data.trends)
        console.log(response.data.data.news)
        setTrends(response.data.data.trends)
        setNews(response.data.data.news)
      } catch (error) {
        console.error(error);
      }
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  

  return (
    <>
        <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
          <div>
          <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Home</h1>
            {/* { auth.id ? <div> Welcome { auth.username }!! */}
            {/* <button onClick={()=> dispatch(logout())}>Logout</button> */}
          {/* </div> : <Link to='/login' style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Login</Link>} */}
          <div  >
            <h1 style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Need A Place To Start?</h1>
            <Link to={`/riskAssessment/${auth.id}`} style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>Click Here to Complete Risk Assessment</Link>
            {/* <Button component='div' style={{display: 'flex', justifyContent:'center', alignItems:'center'}} onClick={ goToDeposit } >Deposit</Button> */}
          
            {/* {auth.tradingFunds === 0 || null ? <><Button onClick={ goToDeposit } >Deposit</Button></> : null } */}
          </div>
          <Button sx={{display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 2, backgroundColor: 'green'}} component="div" variant="contained" onClick={ goToDeposit }>Deposit</Button>
          </div>

          
        </div>
        {
          news.length ?
            <Carousel news={ news } />
            :
            ''
        }
        <div>
                        <form onSubmit={ marketTrendsAPICall }>
                        
                              <Box sx={{ minWidth: 300, display: 'flex', justifyContent: 'center'  }}>
                                <FormControl sx={{ minWidth: 300 }} >
                                    <InputLabel id="demo-simple-select-label">Market Trend</InputLabel>
                                    <Select
                                    value={ marketTrend }
                                    label="Years of Experience"
                                    onChange={(ev) => setMarketTrend(ev.target.value)}
                                    >
                                      <MenuItem value={'MARKET_INDEXES'}>Market Indexes</MenuItem>
                                      <MenuItem value={'MOST_ACTIVE'}>Most Active</MenuItem>
                                      <MenuItem value={'GAINERS'}>Gainers</MenuItem>
                                      <MenuItem value={'LOSERS'}>Losers</MenuItem>
                                      <MenuItem value={'CLIMATE_LEADERS'}>Climate Leaders</MenuItem>
                                    
                                    </Select>
                                </FormControl>
                              </Box>
                        
                          <Button onClick={ marketTrendsAPICall } >Tell Me More</Button>
                        </form>
                    </div>

  //                  <div sx={{display: 'flex', flexWrap: 'wrap'}}>

//                     {news.map((article, idx) => {
//                       return(

//                         <Card sx={{display: 'flex', flexWrap: 'wrap'}} key={idx}>
//                           <CardMedia
//                             sx={{ height: 300, width: 700 }}
//                             image={article.article_photo_url}
//                             title={article.source}
//                             href={article.article_url}
//                           />
//                           <CardContent>
//                             {/* <Typography href={article.article_url} gutterBottom variant="h5" component="button">
//                               {article.source}
//                             </Typography> */}
//                             <Button href={article.article_url}>{article.source}</Button>
//                             <Typography variant="body2" color="text.secondary">
//                               {article.article_title}
//                             </Typography>
//                             <ul style={{listStyle: 'none'}}>
//                             <Typography variant="body2" color="text.secondary">
//                               Stocks:
//                               {article.stocks_in_news.map((stock, idxx) => {
//                                 return (
//                                   <li key={idxx}>
//                                     {stock.name}
//                                   </li>
//                                 )
//                               })}
//                             </Typography>
//                             </ul>
//                           </CardContent>
//                         </Card>

                       
//                       )
//                     })}
//                     </div>

                    {/* <div>

                    {trends.map((trend, idx) => {
                      return(
                        <Box sx={{ p: 2, border: '1px dashed grey', display: 'flex', flexWrap: 'wrap', maxWidth: 300}} key={idx}>
                          <Card >
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {trend.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {trend.symbol}
                              </Typography>
                              <Typography gutterBottom variant="h6" component="div">
                                Prev. Close: {trend.previous_close}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Change: {trend.change} ({trend.change_percent.toFixed(2)}%)
                              </Typography>
                              <Typography gutterBottom variant="h6" component="div">
                                Now: {trend.price}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      )
                    })}
                    </div> */}


                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                              {trends.map((trend, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                  <Item>
                                    <Typography gutterBottom variant="h5" component="div">
                                      {trend.name}
                                    </Typography>
                                    <Typography component='a' href={`/#/stocks/${trend.symbol.split(':')[0]}`} variant="body2" color="text.secondary">
                                      {trend.symbol.split(':')[0]}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                      Prev. Close: {trend.previous_close}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Change: {trend.change} ({trend.change_percent.toFixed(2)}%)
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                      Now: {trend.price}
                                    </Typography>
                                  </Item>
                                </Grid>
                              ))}
                            </Grid>
                            </Box>




    </>
  );
};

export default Home;












    // <Card sx={{ maxWidth: 345 }}>
    //   <CardMedia
    //     sx={{ height: 140 }}
    //     image={article.article_photo_url}
    //     title={article.source}
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {article.title}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       {article.description}
    //     </Typography>
    //   </CardContent>
    // </Card>


     // <Card key={ article.id }sx={{ 
                        //   maxWidth: 375,
                        //   ':hover':{
                        //     boxShadow: 5
                        //   },
                        //   display: 'flex', 
                        //   flexDirection: 'column' 
                        //   }}>
                        //     <CardMedia
                        //       component="img"
                        //       image={article.article_photo_url}
                        //       alt={article.source}
                        //       sx={{ 
                        //         aspectRatio: "4/5",
                        //         objectFit: "cover",
                        //         padding:"0", 
                        //         borderRadius: ".5rem",
                        //       }}
                        //       />
                        //     <CardContent  sx={{flexGrow: 1}}>
                        //     <Typography href={article.article_url} gutterBottom variant="h4" component="div">
                        //         {article.source}
                        //       </Typography>
                        //       <Typography gutterBottom variant="h5" component="div">
                        //         {article.title}
                        //       </Typography>
                        //       {/* <Typography variant="body2" color="text.secondary">
                        //         {article.description}
                        //       </Typography> */}
                        //     </CardContent>  
                        // </Card>