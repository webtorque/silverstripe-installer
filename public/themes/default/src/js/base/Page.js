import BaseComponent from './BaseComponent';

/**
 * Represents a Page component
 */
export default class Page extends BaseComponent
{
    /**
     * Pass in the css selector for this page
     *
     * @param selector
     */
    constructor(selector) {
        super();

        this.selector = selector;
        this.element = $(this.selector);

        if (this.element.length) {
            this.init();
        }
    }
}