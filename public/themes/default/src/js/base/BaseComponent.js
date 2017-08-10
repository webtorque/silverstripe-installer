import _ from 'underscore';

export default class BaseComponent
{
    constructor() {
        this.resizeTimer = 100;
        this.scrollTimer = 50;
        this.events = [];
        this.setupWindowEvents();
        this.setupWindowResize();
    }

    /**
     * Adds an event for the selector.
     *
     * @param selector
     * @param eventName
     * @param callback
     */
    addEvent(selector, eventName, callback) {
        this.events.push(this.element.find(selector).on(eventName, e => callback(e)));
    }

    setupWindowResize() {
        if (typeof this.onWindowResize !== 'undefined') {
            _.debounce(() => {
                this.onWindowResize();
            }, 100);
        }
    }

    /**
     * Sets up events for listening to window scrolling and resizing.
     *
     * Implement methods onWindowScroll and onWindowResize to use.
     */
    setupWindowEvents() {
        if (typeof this.onWindowResize !== 'undefined') {
            $(window).on('resize', _.debounce(() => {
                this.onWindowResize();
            }, this.resizeTimer));
        }

        if (typeof this.onWindowScroll !== 'undefined') {
            $(window).on('scroll', _.debounce(() => {
                this.onWindowScroll();
            }, this.scrollTimer));
        }
    }

    /**
     * Get a list of child elements
     *
     * @param {string} selector
     * @returns {HTMLElement[]}
     */
    childElements(selector)
    {
        if (this.element) {
            return this.element.find(selector);
        }

        return null;
    }

    /**
     * Get the dom element for this component
     *
     * return {HTMLElement}
     */
    domElement() {
        return this.element.get(0);
    }

    /**
     * Scrolls to an element on the page.
     *
     * @param {HTMLElement} element
     * @param {int} offset
     */
    scrollTo(element, offset = 20) {
        $('html.body').animate({
            scrollTop: element.offset().top - offset
        });
    }
}