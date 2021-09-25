import Color from 'color';
import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Svg, {RadialGradient, Defs, Rect, Stop} from 'react-native-svg';

const {width, height} = Dimensions.get('screen');
const SIZE = width - 75;

export interface SlideProps {
  slide: {
    color: string;
    title: string;
    circle: string;
  };
}

const SlideItem = ({slide: {circle, color, title}}: SlideProps) => {
  const lighterColor = Color(color).lighten(0.8).toString();
  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <View style={styles.container}>
        <View style={[styles.circle, {backgroundColor: circle}]} />
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 150,
    alignItems: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE * 2,
    marginBottom: SIZE / 4,
  },
  title: {
    fontSize: 48,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
export default SlideItem;
