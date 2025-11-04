export const TEST_IDS = {
  APP: {
    CONTAINER: 'app-container',
    ROUTER_OUTLET_CONTAINER: 'router-outlet-container',
    NAV_CONTAINER: 'nav-container',
  },
  PAGE_1: {
    CONTAINER: 'page-1-container',
    TITLE: 'page-1-title',
    GOTO_PAGE_2_BTN: 'page-1-goto-page-2-btn',
    GOTO_PAGE_3_BTN: 'page-1-goto-page-3-btn',
  },
  PAGE_2: {
    CONTAINER: 'page-2-container',
    TITLE: 'page-2-title',
    GOTO_PAGE_1_BTN: 'page-2-goto-page-1-btn',
    GOTO_PAGE_3_BTN: 'page-2-goto-page-3-btn',
  },
  PAGE_3: {
    CONTAINER: 'page-3-container',
    TITLE: 'page-3-title',
    GOTO_PAGE_1_BTN: 'page-3-goto-page-1-btn',
    GOTO_PAGE_2_BTN: 'page-3-goto-page-2-btn',
  },
} as const;

export type TestIds = typeof TEST_IDS;