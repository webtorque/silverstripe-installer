import PageLoader from './utils/PageLoader';
import PageComponentLoader from './utils/PageComponentLoader';

import { pages } from './pages';
import { components } from './components';

// shims
import promise from 'es6-promise';
import objAssign from 'es6-object-assign';
import includes from 'array-includes';

promise.polyfill();
objAssign.polyfill();
includes.shim();

(function ($) {
    const pageLoader = new PageLoader(pages);
    const cLoader = new PageComponentLoader(components);

    $(document).ready(() => {
        $(document).scrollTop(0);

        if (pages.length) {
            pageLoader.load();
        }

        if (components) {
            cLoader.load();
        }
    });

    window.$ = $;
}(jQuery));
