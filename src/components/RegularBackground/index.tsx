import React from 'react';
import {Image} from 'react-native';

import {styles} from './styles';
import imgBg from '../../assets/regular-bg.png';

const RegularBackground: React.FC = () => {
  return <Image style={styles.container} source={imgBg} />;
};

export default RegularBackground;
