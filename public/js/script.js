const fetchData = async (url)=>{
     let response = await fetch(url)
     const  data = await response.json()
     console.log(data)
     return data
}

const setSlider = async ( setCards, url, container )=>{
     await setCards(url, container)
     $(container).slick({
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 1,
          variableWidth: true,
          autoplay: true,
          autoplaySpeed: 2000,
     });
}

const setSingleSlider = async (setCard, container )=>{
     await  setCard()
     $(container).slick();
}

const getGenres = (genre_ids, {genres})=>{
     let genre_names = []
     genre_ids.forEach(id => {
          genres.forEach(genre=>{
               if(genre.id === id)
                    genre_names.push(genre.name)
          })
     });
     return genre_names
}