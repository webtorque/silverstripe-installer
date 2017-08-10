import PageComponent from './PageComponent';

/**
 * Provides a component which is driven by state, when state is updated
 * the element is re-rendered
 */
export default class StatefulComponent extends PageComponent
{
    constructor(element) {
        super(element);
        this.oldState = {};
    }

    /**
     * Updates the state
     *
     * @param {object} newState
     */
    setState(newState) {
        this.oldState = this.state;
        this.state = Object.assign({}, this.state, newState);

        if (typeof this.render === 'function') {
            this.render();
        }
    }

    /**
     * Check if the state has changed
     */
    hasStateChanged() {
        return !_.isMatch(this.oldState, this.state);
    }
}