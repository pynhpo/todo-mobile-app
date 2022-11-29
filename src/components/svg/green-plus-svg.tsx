import React from 'react';
import Svg, {Path, Circle, SvgProps} from 'react-native-svg';

export const GreenPlusSvg = (props: SvgProps): React.ReactElement => {
  const {fill = '#ddd', width = 24, height = 24} = props;
  return (
    <Svg
      width={width}
      height={height}
      fill={fill}
      x="0px"
      y="0px"
      viewBox="0 0 484.8 484.8"
      {...props}>
      <Circle cx={242.4} cy={242.4} r={242.4} fill="#0d9b79" />
      <Path
        d="M0 242.4C0 376 108 484 242.4 484 376 484 484 376 484 242.4"
        fill="#056b5c"
      />
      <Path
        d="M394.4 202.4L282.4 202.4 282.4 90.4 202.4 90.4 202.4 202.4 90.4 202.4 90.4 282.4 202.4 282.4 202.4 394.4 282.4 394.4 282.4 282.4 394.4 282.4z"
        fill="#ebfff6"
      />
      <Path
        d="M282.4 200.8L200.8 282.4 202.4 282.4 202.4 394.4 282.4 394.4 282.4 282.4 394.4 282.4 394.4 202.4 282.4 202.4z"
        fill="#d6eae0"
      />
    </Svg>
  );
};
