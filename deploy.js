import { publish } from 'gh-pages';

const options = {
  branch: 'gh-pages',
  repo: 'https://github.com/Sahilthecoder/Sahil-Ali-Portfolio.git',
  message: 'Auto-deployed by script',
  dotfiles: true,
  history: false,
  add: true
};

const callback = (err) => {
  if (err) {
    console.error('Deployment error:', err);
    process.exit(1);
  }
  console.log('Site has been published to GitHub Pages!');
  console.log('View your site at: https://sahilthecoder.github.io/Sahil_Ali-Portfolio/');
};

console.log('Starting deployment to GitHub Pages...');
publish('dist', options, callback);
