import BaseComponent from './BaseComponent';

/**
 * Represents a "Component" inside a page, e.g. a module
 */
export default class PageComponent extends BaseComponent
{
    constructor(domElement) {
        super();
        this.element = $(domElement);
    }

    init() {
        throw new Error('You must override the init function on PageComponents');
    }
}