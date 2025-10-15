import { featureDetect } from "./feature-detect.js"
import { initLiveReload } from "./live-reload.js"
import { initMobilePopover } from "./init-mobile-popover.js"
import { initPerformanceAwarePreloading } from "./utils/preloading.js"
import { initViewTransitions } from "./view-transitions/init.js"
import { initWorklets } from "./utils/worklets.js"
import { initializeOrderSelect } from "./components/order-select.js"
import { isLocalhost } from "./is-localhost.js"
import { setScrollbarWidth } from "./utils/scrollbar-width.js"

const viewTransitionManager = initViewTransitions()

initWorklets()
setScrollbarWidth()
initializeOrderSelect(viewTransitionManager)
initPerformanceAwarePreloading()
initMobilePopover()
// featureDetect("feature-detect-popover")

// if (isLocalhost) {
//   initLiveReload()
// }

function handleNavigationEnd() {
  initializeOrderSelect(viewTransitionManager)
  initMobilePopover()
}

document.addEventListener("app:navigationend", handleNavigationEnd)
