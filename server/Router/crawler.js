const express = require('express'); 
const router = express.Router(); 
const axios = require('axios');
const cheerio = require('cheerio');


const getHtml = async() =>{
  try{
    //여기에 크롤링할 웹페이지 주소 입력
    return await axios.get('https://pedia.watcha.com/ko-KR/decks/qxIT5ReveFkY');
  }
  catch(err){
    console.log(err);
  }
}

router.get('/crawler', (req, res) => {
  getHtml()
  .then((html)=> {
    //cheerio로 html 파싱 제이쿼리 문법 사용
  const $ = cheerio.load(html.data);
  //니가 원하는 데이터를 추출하는 부분의 클래스명이나 아이디값 입력
  const $movieList = $(".css-1hp6p72")

  let movies = [];
  $movieList.each((idx,node)=>{
    //여기선 구체적으로 어떤 값을 추출할건지 클래스명이나 아이디 값 태그이름 등으로 정의
    const title =$(node).find(".css-niy0za").text();
    movies.push({
      title: $(node).find(".css-niy0za").text(),
      img: $(node).find(".ezcopuc1").attr("src"),
      link:`https://pedia.watcha.com`+ $(node).find(".css-1hp6p72 > a").attr("href")
    })
  })

  return movies;
  

  }).then((data,err)=>{
    if(err) return res.status(400).send(err);
    res.status(200).json({success:true, data:data});
  })
});




module.exports =router;