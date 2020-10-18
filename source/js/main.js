import { ieFix } from './utils/ie-fix';
import { iosVhFix } from './utils/ios-vh-fix';

import { initModals } from './modules/init-modals';
import { menuToggler, onMenuTogglerToggleClass } from './modules/toggler';

// Utils
// ---------------------------------

ieFix();
iosVhFix();

// Modules
// ---------------------------------

initModals();
if (menuToggler) {
  menuToggler.addEventListener('click', onMenuTogglerToggleClass);
}
