import PageComponent from '../base/PageComponent';

export default class Checkbox extends PageComponent
{
    /**
     * Initialise
     */
    init() {
        this.bindInputChange();
        this.toggleChecked();
    }

    /**
     * Listen to the onchange for the radio input
     */
    bindInputChange() {
        this.getInput().on('change', () => this.toggleChecked());
    }

    /**
     * Update css to show if the element is checked or not
     */
    toggleChecked() {
        console.log('checkbox changed', this.element);
        if (this.getInput().is(':checked')) {
            this.getLabel().addClass('checked');
        } else {
            this.getLabel().removeClass('checked');
        }
    }

    /**
     * Get the radio input
     *
     * @returns {HTMLElement|jQuery}
     */
    getInput() {
        return this.childElements('input');
    }

    /**
     * Get the label element
     *
     * @returns {jQuery}
     */
    getLabel() {
        return this.childElements('label');
    }
}