import { translate } from '@/lang/i18n';

interface ColumnField {
  name: string;
  label: string;
  textField?: string;
  type?: string;
  required?: string | boolean;
  placeholder?: string;
  group?: string;
  searchable?: boolean;
  defaultValue?: any;
}

export const makeFormRules = function(fields: Array<ColumnField>) {
  return Object.assign({}, ...fields.filter(field => field.required).map(field => ({
    [field.name]: [{
      required: true,
      trigger: typeof field.required === 'string' ? field.required : 'blur',
      message: translate('common.fieldRequired', { field: field.label }),
    }],
  })));
};

export const makeSearchFields = function(fields: Array<ColumnField>) {
  return fields.filter(field => field.searchable);
};

export const createEmptyFormData = function(fields: Array<ColumnField>) {
  return Object.assign({}, ...fields.map(field => ({ [field.name]: {}.hasOwnProperty.call(field, 'defaultValue') ? field.defaultValue : null })));
};