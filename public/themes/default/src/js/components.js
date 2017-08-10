//load modules
import AjaxForm from './components/AjaxForm';
import AjaxTable from './components/AjaxTable';
import Header from './components/Header';
import PatientRequestForm from './components/PatientRequest/PatientRequestForm';
import SearchForm from './components/SearchForm.js';

import Checkbox from './components/Checkbox';
import DateField from './components/DateField';
import Radio from './components/Radio';

//components
export const components = {
    '.ajax-form': AjaxForm,
    '.ajax-table': AjaxTable,
    'header': Header,
    '.radio': Radio,
    'div.checkbox': Checkbox,
    'input.date': DateField
};
