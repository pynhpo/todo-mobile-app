import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ArrowDownSvg = (props: SvgProps): React.ReactElement => {
  const {fill = '#ddd', width = 24, height = 24} = props;
  return (
    <Svg
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
      {...props}>
      <Path d="M18.364 13.636a1 1 0 00-1.414 0L13 17.586V4a1 1 0 00-2 0v13.586l-3.95-3.95a1 1 0 00-1.414 1.414l5.657 5.657a1 1 0 001.414 0l5.657-5.657a1 1 0 000-1.414z" />
    </Svg>
  );
};
