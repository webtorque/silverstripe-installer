import StatefulComponent from '../base/StatefulComponent';
import parse from 'url-parse';

export default class AjaxTable extends StatefulComponent {
    init() {
        this.state = {
            page: 1,
            sortField: null,
            sortDirection: null
        };

        this.bindSorting();
        this.bindPaging();
    }

    /**
     * Get the url for making ajax requests
     */
    getUrl() {
        return this.element.data('url');
    }

    /**
     * Setup dom events for sorting
     */
    bindSorting() {
        this.element.on('click', 'th.sortable', (e) => this.sort(e.currentTarget));
    }

    /**
     * Perform the sort
     *
     * @param {HTMLElement} element
     */
    sort(element) {
        let $el = $(element),
            field = $el.data('field');

        // if field where already sorting, then switch direction
        if (field === this.state.sortField) {
            this.setState({
                sortDirection: this.state.sortDirection === 'ASC' ? 'DESC' : 'ASC',
                page: 1
            });
        } else {
            this.setState({
                sortDirection: 'ASC',
                sortField: field,
                page: 1
            })
        }
    }

    /**
     * Setup dom events for handling paging
     */
    bindPaging() {
        this.element.on('click', '.pagination a', (e) => {
            e.preventDefault();
            this.page(this.getPageFromLink(e.currentTarget));
        });
    }

    /**
     * Get the page number from an anchor html element
     *
     * @param {HTMLElement} element
     * @returns {int}
     */
    getPageFromLink(element) {
        let $el = $(element),
            pageNumber = $el.data('page');

        // get from url instead
        if (!pageNumber) {
            let url = parse($el.attr('href'), true),
                pageSize = $el.data('page-size');

            if (url.query.start && pageSize) {
                pageNumber = (url.query.start / pageSize) + 1;
            }
        }

        return pageNumber;
    }

    /**
     * Perform paging
     *
     * @param element
     */
    page(pageNumber) {
        this.setState({
            page: pageNumber
        });
    }

    /**
     * Set correct classes for sorting on table header columns
     */
    updateSortableHeaders() {
        this.childElements('th.sortable').each((index, el) => {
            let $el = $(el);

            // remove any previous sortable classes
            $el.removeClass('sortable--asc')
                .removeClass('sortable--desc');

            if ($el.data('field') === this.state.sortField) {
                $el.addClass(this.state.sortDirection === 'DESC' ? 'sortable--desc' : 'sortable--asc');
            }
        });
    }

    render() {
        if (this.hasStateChanged()) {
            this.element.addClass('loading');
            $.get(this.getUrl(), _.pick(this.state, this.ajaxStateVars()), this.state)
                .done((response) => {
                    this.element.removeClass('loading');
                    if (response.html) {
                        this.element.html(response.html);
                        this.updateSortableHeaders();
                    }
                });
        }
    }

    /**
     * List of state variables to append to the AJAX request.
     * @return string[]
     */
    ajaxStateVars() {
        return ['page', 'sortField', 'sortDirection'];
    }
}
