import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

function Crawler() {
  const [crawler, setCrawler] = useState()

  useEffect(()=>{


    axios.get('/api/crawler')
    .then(response =>{
      
      if(response.data.success){
        console.log(response.data.data)
        const movies = response.data.data
        setCrawler(movies)
        
      } else{
        alert("Couldn't get quest list")
      }
    })
  },[])


  


  return (
    <>
    <h1>2021 BIFF recommended works</h1>
    <h2>source: https://pedia.watcha.com/ko-KR/decks/qxIT5ReveFkY</h2>
      {crawler && crawler.map((movie,index)=>{
        return(
          <div key={index}>
            <h1>{movie.title}</h1>
            <div><img src={movie.img}></img></div>
            <a href={movie.link}>more detail</a>
          </div>
        )
      })}
    </>
  )
}


export default withRouter(Crawler);
