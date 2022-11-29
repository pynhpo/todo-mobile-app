import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ArrowUpSvg = (props: SvgProps): React.ReactElement => {
  const {fill = '#ddd', width = 24, height = 24} = props;
  return (
    <Svg
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
      {...props}>
      <Path d="M18.364 8.95l-5.657-5.657a1 1 0 00-1.414 0L5.636 8.95a1 1 0 001.414 1.414L11 6.414V20a1 1 0 002 0V6.414l3.95 3.95a1 1 0 001.414-1.414z" />
    </Svg>
  );
};
