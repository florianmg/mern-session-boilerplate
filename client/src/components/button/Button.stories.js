import React from 'react';
import Button from './';

export default {
  title: 'Button',
  components: Button
}

export const ButtonTapMe = () => {
  return <Button text="Tap me" type="submit"/>
}