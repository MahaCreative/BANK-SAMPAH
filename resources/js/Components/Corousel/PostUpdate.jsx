import { usePage } from '@inertiajs/react';
import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import TextInput from '../TextInput';
export default function PostUpdate() {
    const {informasi_update} = usePage().props
    
  return (
    <>
    <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={2000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
            desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
            },
            mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
            },
            tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 1,
            partialVisibilityGutter: 30
            }
        }}
        rewind
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        >
            {informasi_update.data.length > 0 ? informasi_update.data.map((item, key) => (
                <div className='shadow-md border border-gray-600/50 rounded-md w-full shadow-gray-800/50' key={key +1}>
                    <div className='w-full relative h-36'>
                        <img src={'/storage/' + item.gambar_informasi} className={'w-full h-36 absolute top-0 left-0 object-cover object-center'}/>
                        <div className='bg-black/30  absolute top-0 left-0 w-full h-full'></div>
                        <h3 className='absolute bg-white/50 py-2.5 bottom-1.5 inset-x-auto w-full text-center text-black font-bold'>{item.judul}</h3>
                    </div>
                </div>
            )) : ''}
    </Carousel>
    </>
  )
}
