import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';
import 'storybook-chromatic';
import '../src/index.css';

// automatically import all files ending in *.stories.js
// configure(require.context('../src/stories', true, /\.stories\.js$/), module);

const req = requireContext('../src/__stories__', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
