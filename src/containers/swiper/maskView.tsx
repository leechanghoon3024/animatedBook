import React, {ReactElement, ReactNode} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {SlideProps} from './slider.item';
import Svg, {Path} from 'react-native-svg';
import {HEIGHT, Side, WIDTH} from './const';
import {Vector} from 'react-native-redash';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import MaskedView from '@react-native-community/masked-view';
interface MaskViewProps {
  side: Side;
  position: Vector<Animated.SharedValue<number>>;
  children: ReactElement<SlideProps>;
}
const AnimatedPath = Animated.createAnimatedComponent(Path);
const MaskView = ({side, children, position: {x, y}}: MaskViewProps) => {
  const animatedProps = useAnimatedProps(() => {
    const d = ['M 0 0', `H ${x.value}`, `V ${HEIGHT}`, 'H 0', 'Z'];
    return {
      d: d.join(' '),
    };
  });

  const maskElement = (
    <Svg style={[StyleSheet.absoluteFill]}>
      <AnimatedPath fill={'black'}></AnimatedPath>
    </Svg>
  );
  return (
    <MaskedView
      style={StyleSheet.absoluteFill}
      maskElement={
        <Svg
          style={[
            StyleSheet.absoluteFill,
            {transform: [{rotateY: side === Side.RIGHT ? '180deg' : '0deg'}]},
          ]}>
          <AnimatedPath animatedProps={animatedProps} fill={'black'} />
        </Svg>
      }>
      {children}
    </MaskedView>
  );
};

export default MaskView;
