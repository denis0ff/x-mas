import App from './components/app/App';

const app = new App();

window.onhashchange = app.start;
window.onload = app.start;
