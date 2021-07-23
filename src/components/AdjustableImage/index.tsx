import React from 'react';
import {ImageProps} from 'react-native';
import {Container, IContainerProps} from './styles';

import IconDefault from '../../assets/icon-default.png';

interface Props {
  isUri?: boolean;
  image: string | any;
}
export function AdjustableImage({
  isUri,
  image,
  size,
  ...rest
}: Props & IContainerProps & Omit<ImageProps, 'source'>) {
  if (!image) {
    image = IconDefault;
    isUri = false;
  }

  return (
    <Container
      resizeMode="contain"
      width={0}
      height={0}
      size={size}
      source={isUri ? {uri: `${image}?a=${Math.random()}`} : image}
      {...rest}
    />
  );
}
