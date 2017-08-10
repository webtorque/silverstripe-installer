export default class PageComponentLoader {
    /**
     * Pass in aa map of components in the form:
     * <code>
     * {
     *    'cssSelector': 'ClassName'
     * }
     * </code>
     * @param components {} Array of modules to load
     */
    constructor(components) {
        this.components = components;
    }

    load() {
        let components = this.components;

        for (let selector in components) {
            $(selector).each(function () {

                let component = new components[selector](this);
                component.init();
            });
        }
    }
}
