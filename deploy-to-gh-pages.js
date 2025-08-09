const ghpages = require('gh-pages');
const path = require('path');

const options = {
  branch: 'gh-pages',
  repo: 'https://github.com/sahilthecoder/Sahil-Ali-Portfolio.git',
  message: 'Deploy to GitHub Pages',
  dotfiles: true
};

console.log('Starting deployment to GitHub Pages...');

ghpages.publish('dist', options, (err) => {
  if (err) {
    console.error('Deployment failed:');
    console.error(err);
    process.exit(1);
  }
  console.log('Successfully deployed to GitHub Pages!');
  console.log('Your site should be live at: https://sahilthecoder.github.io/Sahil-Ali-Portfolio/');
});
