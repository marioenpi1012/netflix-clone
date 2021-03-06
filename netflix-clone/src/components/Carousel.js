import { FaLessThan, FaGreaterThan, FaPlayCircle, FaInfoCircle  } from "react-icons/fa";
import {Children, useState, React, useRef, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import MovieInfo from "./MovieInfo";
const Carousel = ({data}) => {

    const carousel = useRef(null)
    const list = useRef(null)
    const item = useRef(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [touch, setTouch] = useState(false)
    const allCarousel = document.querySelectorAll('.Carousel')

    useEffect(() => {
        if('ontouchstart' in document.documentElement){
        setTouch(!touch)
    }
    }, [])
    
    let page = 0
    allCarousel.forEach(carousel => {
        page = Math.ceil(carousel.scrollWidth / carousel.clientWidth)
    })
    const prev = (e) =>{
        // get the target parent element (carousel-btns) and the the previous sibling (Carousel)
        const carousel = e.target.parentElement.previousSibling
        carousel.scrollLeft -= carousel.offsetWidth
        const prevBtn = document.getElementsByClassName('prev')
        if(currentPage > 0){
            setCurrentPage(currentPage - 1 )
        }
        
        
    }
    
    const next = (e) =>{
        // const carbtns = e.target.parentElement
        // const carousel = carbtns.previousSibling
        // // Get the children of Carousel (list) and then the children of list (item)
        // const movies = carousel.childNodes[0].children
        // // const page = carousel.scrollWidth / carousel.clientWidth
        // carousel.scrollLeft += (carousel.scrollWidth / movies.length ) + carousel.clientWidth - 500 
        const padding = 20

        carousel.current.scrollLeft += carousel.current.offsetWidth - 140
        console.log(carousel.current.offsetWidth + 100 )
        
        if( currentPage < page - 1){
            setCurrentPage(currentPage + 1)
        }
        
        
    }
    
    const hover  = (e) =>{
        setH(true)
    }
    const notHover = (e) =>{
        setH(false)
    }

    // Display information about the hover item 
    const itemHover = (e) =>{
        const info = e.target
        if (info.classList.contains('item')){
            info.firstElementChild.style.display = 'flex'
            const title = info.getAttribute('data-title')
            const description = info.getAttribute('data-description')
            // console.log(title)
            // console.log(description)

            

            if(!info.nextSibling){
                info.style.transformOrigin = 'right'
                for(let i = 0; i< 5; i ++){
                    list.current.children[18 - i].style.transform ='translateX(-50%)'
            }
                // info.style.transform = 'translateX(50%)'
            }
            else if(!info.previousSibling){
                info.style.transformOrigin = 'left'

            }
        }
    }
    // Hide information when mouse leave 
    const itemNotHover = (e) =>{
        const info = e.target
        if (info.classList.contains('item')){
            info.firstElementChild.style.display = 'none'
            
        }
        
        else if(info.classList.contains('info')){
            info.style.display = 'none'
        }
        for(let i = 0; i< 5; i ++){
                    list.current.children[18 - i].style.transform =''
            }
        
    }
    const showDetails = (e) =>{
        const title = e.target.parentElement.getAttribute('data-title')
        MovieInfo.bind(title)
        
    }
    const [h, setH] = useState(false)
    const handleSetClick = (e) =>{
        setCurrentPage(e.target.getAttribute('data-index'))
    }
    if('ontouchstart' in document.documentElement){
        console.log('touch')
    }else{
        console.log('no-touch')
    }
    return (
        <div className="slider" onMouseEnter={hover} onMouseLeave={notHover}>
            <div className="dots-container">
                {Array.apply(null, { length: page}).map((e, i) => (
                    i == currentPage
                    ? <Current className='dots'/>
                    : <span className="dots" key={i} data-index={i} onClick={handleSetClick}/> 
                ))}
            </div>
            <div className='Carousel' ref={carousel}  >
                <div className="list" ref={list} >
                    {data.map(data =>(
                    
                        <div className="item"  
                        ref={item}
                        onMouseEnter={itemHover} 
                        onMouseLeave={itemNotHover}
                        data-title={data.title}
                        data-description={data.overview}

                        >        
                        <div className="info">
                            <div className="info_title">
                            {data.title ? data.title : data.name}
                            
                            </div>
                                <FaInfoCircle className='info_btn_icon' />
                            </div>
                            <img src={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`} />
                        </div>
                        
                    ))}
                        
                </div>
                
            </div>
            <div className="carousel-btns" style={h?{display:'contents'}:{display:'none'}}>
                
                <div className="prev"  onClick={prev} style={currentPage == 0  ? {display:'none'} : {}} >
                    <FaLessThan style={{pointerEvents:'none'}}/>
                </div>
                <div className="next"  onClick={next}  >
                    <FaGreaterThan style={{pointerEvents:'none'}} />
                </div>
                
            </div>
            
        </div>
    )
}
// const current page styles 
const Current =  styled.span `
    :before {
        content: " ";
        height: 5px;
        width: 20px;
        background: red;
        transition: background 0.3s ease;
    }
`
const prev = `
    transform :'translateX(-50%)
`



export default Carousel
