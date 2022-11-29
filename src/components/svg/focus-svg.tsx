import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const FocusSvg = (props: SvgProps): React.ReactElement => {
  const {fill = '#ddd', width = 24, height = 24} = props;
  return (
    <Svg
      width={width}
      height={height}
      fill={fill}
      x="0px"
      y="0px"
      viewBox="0 0 491.2 491.2"
      {...props}>
      <Path d="M470.3 224.6H265.9V21.4C265.9 9.9 256.5.5 245 .5s-20.9 9.4-20.9 20.9v203.3H20.9C9.4 224.7 0 234.1 0 245.6c0 11.5 9.4 20.9 20.9 20.9h203.3v203.3c0 11.5 9.4 20.9 20.9 20.9s20.9-9.4 20.9-19.8V266.4h203.3c11.5 0 20.9-9.4 21.9-20.9-.1-11.5-9.5-20.9-20.9-20.9z" />
      <Path d="M441.1 182.9c11.5 0 20.9-9.4 21.9-20.9 0-11.5-9.4-20.9-20.9-20.9-44.8 0-82.4-36.5-82.4-82.4 0-11.5-9.4-20.9-20.9-20.9s-20.9 9.4-20.9 20.9c.2 67.9 55.4 124.2 123.2 124.2zM49.1 182.9c67.8 0 123-56.3 124.1-124.1 0-11.5-9.4-20.9-20.9-20.9s-20.9 9.4-20.9 20.9c0 44.8-36.5 82.4-82.4 82.4-11.5 0-20.9 9.4-20.9 20.9s9.5 20.8 21 20.8zM441.1 308.1c-67.8 0-123 56.3-124.1 124.1 0 11.5 9.4 20.9 20.9 20.9s20.9-9.4 20.9-20.9c0-44.8 36.5-82.4 82.4-82.4 11.5 0 20.9-9.4 20.9-20.9-.2-11.5-9.6-20.8-21-20.8zM49.1 308.1c-11.5 0-20.9 9.4-20.9 20.9s9.4 20.9 20.9 20.9c44.8 0 82.4 36.5 82.4 82.4 0 11.5 9.4 20.9 20.9 20.9 10.4 0 19.8-9.4 19.8-20.9-.1-67.9-55.4-124.2-123.1-124.2z" />
    </Svg>
  );
};
