import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Props } from 'react-responsive-carousel/lib/ts/components/Carousel'
import { CarouselItem } from '../..'

export interface CarouselProps {
  items: CarouselItem[]
  carouselProps?: Partial<Props>
}

export default ({ items, carouselProps }: CarouselProps) => {
  return (
    <Carousel {...carouselProps}>
      {items.map((carouselItem) => {
        return (
          <div>
            <img src={carouselItem.src} />
            {carouselItem.label ? (
              <p className="legend">{carouselItem.label}</p>
            ) : null}
          </div>
        )
      })}
    </Carousel>
  )
}
