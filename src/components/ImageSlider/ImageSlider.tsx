import React from 'react'
import SlickSlider, { Settings } from 'react-slick'
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../css/index.css'

export interface ImageSliderProps {
  urls: string[]
  onChangeSlide?: (currentSlide: number) => void
}

const ImageSliderContainer = styled.div`
  height: 100%;
  width: 100%;
`

const ImageSlider = ({ urls, onChangeSlide }: ImageSliderProps) => {
  const settings: Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
  }

  return (
    <ImageSliderContainer>
      <SlickSlider
        afterChange={(currentSlide) => {
          if (onChangeSlide) {
            onChangeSlide(currentSlide)
          }
        }}
        {...settings}
      >
        {urls.map((url) => (
          <div className="slick-slide" key={url}>
            <img className="slick-slide-image" src={url} />
          </div>
        ))}
      </SlickSlider>
    </ImageSliderContainer>
  )
}

export default ImageSlider
