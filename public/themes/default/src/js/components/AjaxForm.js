import PageComponent from "../base/PageComponent";
import "bootstrap3/js/modal";
import Radio from "./Radio";
import Checkbox from "./Checkbox";
import DateField from "./DateField";
import Parsley from 'parsleyjs';

export default class AjaxForm extends PageComponent {
    init() {
        this.action = null;

        this.bindSubmit();
        this.bindButtons();
        this.validation();
    }

    /**
     * Setup form validation
     */
    validation() {
        this.validator = this.element.parsley({
            excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden], .ignore-validation',
            errorsContainer: function(el) {
                return el.$element.closest(".form-group");
            },
            // include focusout to make sure copy paste is properly validated
            triggerAfterFailure: 'input focusout'
        });
    }

    /**
     * Setup form submit handler
     */
    bindSubmit() {
        this.element.on('submit', (e) => this.handleSubmit(e));
    }

    /**
     * Handle form submission
     *
     * @param e
     */
    handleSubmit(e) {
        e.preventDefault();

        // don't submit if form isn't valid
        if (this.validator && !this.validator.isValid()) return;

        let form = this.element;
        let formData = form.serialize();

        if (this.action) {
            formData += '&' + this.action.name + '=' + this.action.value;
        }

        form.addClass('loading');

        this.disableButtons();

        $.post(form.attr('action'), formData, (response) => {
            form.removeClass('loading');
            this.enableButtons();
            // we got json response
            if (typeof response === 'object') {
                if (response.status === 1) {
                    // show popup
                    $(response.html).modal('show');

                    this.bindModalLinks();
                } else {
                    this.refreshForm(response.html);
                    this.scrollToFirstError();
                }

                // we got html, ss native form error
            } else {
                this.refreshForm(response);
                this.scrollToFirstError();
            }
        });
    }

    /**
     * Bind buttons in modals which link (has data-link attribute)
     */
    bindModalLinks() {
        $('.modal button[data-link]').on('click', (e) => {
            window.location = $(e.currentTarget).data('link');
        });
    }

    /**
     * Records action so we can use it in form submissions
     *
     * @param {HTMLElement} button
     */
    setAction(button) {
        this.action = {
            name: $(button).attr('name'),
            value: $(button).val()
        }
    }

    /**
     * Bind the actions being clicked so we can record the clicked action
     */
    bindButtons() {
        // handle cancel action
        this.element.on('click', '[name=action_cancel]', (e) =>{
            e.preventDefault();
            this.cancel();
        });

        // record button action for form submission
        this.element.on('click', 'button,input[type=submit]', (e) => {
           this.setAction(e.currentTarget);
        });
    }

    /**
     * Get form actions
     *
     * @returns {*}
     */
    getButtons() {
        return this.childElements('button,input[type=submit]');
    }

    /**
     * Disable form buttons, used when submitting
     */
    disableButtons() {
        this.getButtons().attr('disabled', 'disabled');
    }

    /**
     * Enable buttons
     */
    enableButtons() {
        this.getButtons().removeAttr('disabled');
    }

    /**
     * Refresh form content, used to refresh after an ajax call
     *
     * @param {string} formHtml
     */
    refreshForm(formHtml) {
        this.element.html($(formHtml).html());
        // allow binding after the form content has been refreshed
        this.afterRefresh();
    }

    /**
     * Executed after content inside form is refreshed.
     *
     * If element is passed, only refreshes inside the element, otherwise defaults to whole form.
     *
     * @param {HTMLElement} element
     */
    afterRefresh(element) {
        if (!element) {
            element = this.element;
        }

        this.updateRadioButtons(element);
        this.updateCheckboxes(element);
        this.updateDateFields(element);
    }

    /**
     * Setups up radio buttons, useful after html has been updated
     *
     * @param {HTMLElement} element
     */
    updateRadioButtons(element) {
        // setup radio buttons
        element.find('.radio').each((i, el) => {
            let r = new Radio(el);
            r.init();
        });
    }

    /**
     * Setups up radio buttons, useful after html has been updated
     *
     * @param {HTMLElement} element
     */
    updateCheckboxes(element) {
        // setup radio buttons
        element.find('div.checkbox').each((i, el) => {
            let c = new Checkbox(el);
            c.init();
        });
    }

    /**
     * Setups up date fields, useful after html has been updated
     *
     * @param {HTMLElement} element
     */
    updateDateFields(element) {
        element.find('input.date').each((i, el) => {
            let d = new DateField(el);
            d.init();
        });
    }

    /**
     * Scrolls to first error in form
     */
    scrollToFirstError() {
        let errors = this.childElements('.error');

        if (errors.length) {
            this.scrollTo(errors.first());
        }
    }

    /**
     * Cancels editing the form, checks for data-cancel-url on form, otherwise uses browsers history.
     */
    cancel() {
        let url = this.element.data('cancel-url');

        if (url) {
            window.location = url;
        } else {
            window.history.go(-1);
        }
    }
}

window.Parsley.on('field:error', function() {
    // This global callback will be called for any field that fails validation.
    this.$element.closest('.form-group')
        .removeClass('has-success')
        .addClass('has-error');
});

window.Parsley.on('field:success', function() {
    // This global callback will be called for any field that fails validation.
    this.$element.closest('.form-group')
        .addClass('has-success')
        .removeClass('has-error');
});