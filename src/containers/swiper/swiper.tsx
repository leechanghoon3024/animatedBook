import React, {useState} from 'react';
import {Text} from 'react-native';
import Slider from './slider';
import Slide from './slider.item';

const slides = [
  {
    color: '#F2A1AD',
    title: 'RED',
    circle: '#ff0000',
  },
  {
    color: '#00bdd6',
    title: 'BLUE',
    circle: '#0048ff',
  },
  {
    color: '#c9c587',
    title: 'YELLOW',
    circle: '#ffdd00',
  },
  {
    color: '#c8f87f',
    title: 'GREEN',
    circle: '#3a844a',
  },
  {
    color: '#c367ff',
    title: 'PURPLE',
    circle: '#9500ff',
  },
];

export const assets = slides.map(({circle}) => circle);

const Swiper = () => {
  const [index, setIndex] = useState<number>(1);
  const prevIndex = slides[index - 1];
  const nextIndex = slides[index + 1];
  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={prevIndex && <Slide slide={prevIndex} />}
      next={nextIndex && <Slide slide={nextIndex} />}>
      <Slide slide={slides[index]!} />
    </Slider>
  );
};

export default Swiper;
