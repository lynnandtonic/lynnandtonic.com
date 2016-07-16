function createHiddenField(name, value) {
  var field = document.createElement('input');
  field.setAttribute('type', 'hidden');
  field.setAttribute('name', name);
  field.setAttribute('value', value);
  return field;
}

function injectHiddenFields(form) {
  if (!form.querySelector('[name=source]')) {
    form.appendChild(createHiddenField('source', document.location));
  }

  if (!form.querySelector('[name=referer]')) {
    form.appendChild(createHiddenField('referer', document.referrer));
  }
}

[].forEach.call(
  document.querySelectorAll('[data-hook~="howdy-form"]'),
  injectHiddenFields
);
