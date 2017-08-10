import PageComponent from '../base/PageComponent';

export default class Radio extends PageComponent
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
        if (this.getInput().is(':checked')) {
            this.getLabel().addClass('checked');
            this.uncheckSiblings();
        } else {
            this.getLabel().removeClass('checked');
        }
    }

    /**
     * Get the radio input
     *
     * @returns {jQuery}
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

    /**
     * Find sibling radio buttons and uncheck them
     */
    uncheckSiblings() {
        this.element.siblings('.radio').each(function() {
           $(this).find('input').prop('checked', '').trigger('change');
        });
    }
}