const fetchData = async (url)=>{
     let response = await fetch(url)
     const  data = await response.json()
     console.log(data)
     return data
}
const setSlider = async ( setCards, slider )=>{
     await setCards()
     $(slider).slick({
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 1,
          variableWidth: true,
          autoplay: true,
          autoplaySpeed: 2000,
     });
 }