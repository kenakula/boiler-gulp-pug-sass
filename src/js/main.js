import { initPage } from './modules/init-page';
import { initTogglers } from '../components';

document.addEventListener('DOMContentLoaded', () => {
  initPage();
  initTogglers();
});
