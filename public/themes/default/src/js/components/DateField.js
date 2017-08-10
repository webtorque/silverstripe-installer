import PageComponent from '../base/PageComponent';
import Pikaday from "pikaday";

export default class DateField extends PageComponent
{
    init() {
        this.setupCalendar();
    }

    /**
     * Sets up the calendar using pikaday
     */
    setupCalendar() {
        this.dateOfBirthCalendar = new Pikaday({
            field: this.domElement(),
            format: 'YYYY-MM-DD',
            minDate: this.getMinDate(),
            maxDate: this.getMaxDate(),
            yearRange: this.getYearRange()
        });
    }

    /**
     * Gets the year range or defaults to 1900 - current year + 10.
     *
     * @returns {[*,*]}
     */
    getYearRange() {
        let minYear = this.element.data('min-year') || 1900;
        let maxYear = this.element.data('max-year') || ((new Date()).getFullYear() + 20);

        return [minYear, maxYear];
    }

    /**
     * Gets the min date or defaults to 1st January 1900.
     *
     * @returns {Date}
     */
    getMinDate() {
        return this.element.data('min-date') ?
            new Date(this.element.data('min-date')) :
            new Date('1900-01-01');
    }

    /**
     * Gets the max date or defaults to nothing (no max date).
     *
     * @returns {Date|null}
     */
    getMaxDate() {
        return this.element.data('max-date') ?
            new Date(this.element.data('max-date')) :
            null;
    }

}