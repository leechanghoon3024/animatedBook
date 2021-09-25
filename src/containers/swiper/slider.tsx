import React, {ReactElement, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {HEIGHT, MARGIN_WIDTH, Side, WIDTH} from './const';
import {SlideProps} from './slider.item';
import {snapPoint, useVector} from 'react-native-redash';
import {PanGestureHandler} from 'react-native-gesture-handler';
import MaskView from './maskView';

const PREV = WIDTH;
const NEXT = 0;
const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];

interface SliderProps {
  index: number;
  setIndex: (value: number) => void;
  children: ReactElement<SlideProps>;
  prev?: ReactElement<SlideProps>;
  next?: ReactElement<SlideProps>;
}

const Slider = ({
  index,
  children: current,
  prev,
  next,
  setIndex,
}: SliderProps) => {
  const hasPrev = !!prev;
  const hasNext = !!next;
  const zIndex = useSharedValue(0); // zIndex
  const left = useVector();
  const right = useVector();
  const activeItem = useSharedValue(Side.NONE);
  const isTransitionLeft = useSharedValue(false);
  const isTransitionRight = useSharedValue(false);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({x}) => {
      if (x < MARGIN_WIDTH) {
        activeItem.value = Side.LEFT;
        zIndex.value = 50;
      } else if (x >= WIDTH - MARGIN_WIDTH) {
        activeItem.value = Side.RIGHT;
      } else {
        activeItem.value = Side.NONE;
      }
    },
    onActive: ({x, y}) => {
      if (activeItem.value === Side.LEFT) {
        left.x.value = x;
        left.y.value = y;
      } else if (activeItem.value === Side.RIGHT) {
        right.x.value = WIDTH - x;
        right.y.value = y;
      }
    },
    onEnd: ({x, velocityX, velocityY}) => {
      if (activeItem.value === Side.LEFT) {
        const snapPoints = [MARGIN_WIDTH, WIDTH];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransitionLeft.value = dest === WIDTH;
        left.x.value = withSpring(
          dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitionLeft.value ? true : false,
            restSpeedThreshold: isTransitionLeft.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitionLeft.value ? 100 : 0.01,
          },
          () => {
            if (isTransitionLeft) {
              runOnJS(setIndex)(index - 1);
            }
          },
        );
      } else if (activeItem.value === Side.RIGHT) {
        const snapPoints = [WIDTH - MARGIN_WIDTH, WIDTH];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransitionRight.value = dest === 0;
        right.x.value = withSpring(
          WIDTH - dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitionRight.value ? true : false,
            restSpeedThreshold: isTransitionRight.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitionRight.value ? 100 : 0.01,
          },
          () => {
            if (isTransitionRight) {
              runOnJS(setIndex)(index + 1);
            }
          },
        );
      }
    },
  });

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: zIndex.value,
  }));

  useEffect(() => {
    left.x.value = withSpring(MARGIN_WIDTH);
    right.x.value = withSpring(MARGIN_WIDTH);
  }, [left.x, right.x]);
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {current}
        {prev && (
          <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
            <MaskView side={Side.LEFT} position={left}>
              {prev}
            </MaskView>
          </Animated.View>
        )}
        {next && (
          <Animated.View style={[StyleSheet.absoluteFill]}>
            <MaskView side={Side.RIGHT} position={right}>
              {next}
            </MaskView>
          </Animated.View>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Slider;
