import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CheckBoxSvg = (props: SvgProps): React.ReactElement => {
  const {fill = '#ddd', width = 24, height = 24} = props;
  return (
    <Svg
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 24 24"
      {...props}>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm7.003 13l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" />
    </Svg>
  );
};
