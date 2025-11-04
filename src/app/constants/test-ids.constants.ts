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
  TEST_PLAYGROUND: {
    CONTAINER: 'test-playground-container',
    HEADING: 'test-playground-heading',
    PARAGRAPH: 'test-playground-paragraph',
    // Form Controls
    INPUT_TEXT: 'input-text',
    INPUT_EMAIL: 'input-email',
    INPUT_PASSWORD: 'input-password',
    INPUT_NUMBER: 'input-number',
    TEXTAREA: 'textarea',
    CHECKBOX: 'checkbox',
    RADIO_OPTION_1: 'radio-option-1',
    RADIO_OPTION_2: 'radio-option-2',
    RADIO_OPTION_3: 'radio-option-3',
    SELECT_DROPDOWN: 'select-dropdown',
    DATE_PICKER: 'date-picker',
    FILE_UPLOAD: 'file-upload',
    FORM_SUBMIT: 'form-submit',
    FORM_ERROR: 'form-error',
    // Buttons
    BUTTON_PRIMARY: 'button-primary',
    BUTTON_SECONDARY: 'button-secondary',
    BUTTON_DISABLED: 'button-disabled',
    BUTTON_ICON: 'button-icon',
    BUTTON_INCREMENT: 'button-increment',
    BUTTON_DECREMENT: 'button-decrement',
    // Display Elements
    LINK: 'link',
    IMAGE: 'image',
    ICON: 'icon',
    // Lists
    LIST_UNORDERED: 'list-unordered',
    LIST_ORDERED: 'list-ordered',
    LIST_ITEM_1: 'list-item-1',
    LIST_ITEM_2: 'list-item-2',
    LIST_ITEM_3: 'list-item-3',
    LIST_ITEM_4: 'list-item-4',
    // Modal
    MODAL_TRIGGER: 'modal-trigger',
    MODAL_CONTENT: 'modal-content',
    MODAL_CLOSE: 'modal-close',
    // Tooltip
    TOOLTIP_TRIGGER: 'tooltip-trigger',
    // Accordion
    ACCORDION_1: 'accordion-1',
    ACCORDION_2: 'accordion-2',
    ACCORDION_3: 'accordion-3',
    // Tabs
    TAB_1: 'tab-1',
    TAB_2: 'tab-2',
    TAB_3: 'tab-3',
    TAB_PANEL_1: 'tab-panel-1',
    TAB_PANEL_2: 'tab-panel-2',
    TAB_PANEL_3: 'tab-panel-3',
    // Table
    TABLE: 'table',
    TABLE_HEADER_ID: 'table-header-id',
    TABLE_HEADER_NAME: 'table-header-name',
    TABLE_HEADER_EMAIL: 'table-header-email',
    TABLE_HEADER_ROLE: 'table-header-role',
    // Navigation
    NAV_MENU: 'nav-menu',
    NAV_ITEM_HOME: 'nav-item-home',
    NAV_ITEM_ABOUT: 'nav-item-about',
    NAV_ITEM_CONTACT: 'nav-item-contact',
    BREADCRUMB: 'breadcrumb',
    // Feedback
    ALERT: 'alert',
    TOAST_TRIGGER: 'toast-trigger',
    LOADING_SPINNER: 'loading-spinner',
    PROGRESS_BAR: 'progress-bar',
    // State
    COUNTER_VALUE: 'counter-value',
    TOGGLE_BUTTON: 'toggle-button',
    TOGGLE_CONTENT: 'toggle-content',
    // Angular-specific
    CONDITIONAL_ELEMENT: 'conditional-element',
    NGFOR_LIST: 'ngfor-list',
    PIPED_VALUE: 'piped-value',
    CUSTOM_COMPONENT: 'custom-component',
  },
} as const;

export type TestIds = typeof TEST_IDS;