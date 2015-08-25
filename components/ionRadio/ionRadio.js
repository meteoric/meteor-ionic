Template.ionRadio.helpers({
  inputAttrs: function () {
    var attrs = {
      type: 'radio'
    };

    if (this.name) {
      attrs.name = this.name;
    } else {
      attrs.name = 'radio-group';
    }

    if (this.value) {
      attrs.value = this.value;
    } else {
      attrs.value = '';
    }

    if (this.disabled) {
      attrs.disabled = true;
    }

    if (this.checked) {
      attrs.checked = true;
    }

    return attrs;
  }
})
