import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const UncheckBoxSvg = (props: SvgProps): React.ReactElement => {
  const {fill = '#ddd', width = 24, height = 24} = props;
  return (
    <Svg
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 32 32"
      {...props}>
      <Path d="M26 4H6a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2zM6 26V6h20v20z" />
      <Path
        id="_Transparent_Rectangle_"
        data-name="&lt;Transparent Rectangle&gt;"
        d="M0 0H32V32H0z"
        fill="none"
      />
    </Svg>
  );
};
