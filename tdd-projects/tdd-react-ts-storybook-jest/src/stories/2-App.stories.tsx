import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import App from '../App';

export default {
  title: 'App',
  component: App,
  decorators: [withKnobs],
};

export const content = () => {
  const content = text('content', 'Hello storybook!');
  return <App content={content} />;
};
