import {Dimensions} from 'react-native';

export enum Side {
  LEFT,
  RIGHT,
  NONE,
}
export const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');
export const MIN_LEDGE = 25;
export const MARGIN_WIDTH = MIN_LEDGE + 50;
