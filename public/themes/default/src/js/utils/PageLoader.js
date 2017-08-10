export default class PageLoader {
    constructor(pages) {
        this.pages = pages;
    }

    load() {
        _.each(this.pages, page => {
            let newPage = new page();
        });
    }
}