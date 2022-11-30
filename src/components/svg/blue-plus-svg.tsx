import React from 'react';
import Svg, {Path, Circle, SvgProps} from 'react-native-svg';

export const BluePlusSvg = (props: SvgProps): React.ReactElement => {
  const {fill = '#ddd', width = 24, height = 24} = props;
  return (
    <Svg
      width={width}
      height={height}
      fill={fill}
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      {...props}>
      <Circle cx={256} cy={256} r={256} fill="#7ab9e8" />
      <Path
        d="M256 0v512c141.385 0 256-114.615 256-256S397.385 0 256 0z"
        fill="#579adf"
      />
      <Path
        d="M384 228.571L283.429 228.571 283.429 128 228.571 128 228.571 228.571 128 228.571 128 283.429 228.571 283.429 228.571 384 283.429 384 283.429 283.429 384 283.429z"
        fill="#f2f2f4"
      />
      <Path d="M283.429 228.571H384V283.428H283.429z" fill="#dfdfe1" />
    </Svg>
  );
};
