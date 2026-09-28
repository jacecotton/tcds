window.addEventListener("DOMContentLoaded", function () {
  var forms = document.querySelectorAll(".tcds-form");
  forms.forEach(function (form) {
    initalizeRadioOther(form);
  });
  function initalizeRadioOther(form) {
    var radioOther = form.querySelector("[data-tcds-form=radio-other] [type=radio]");
    var radioOtherValue = form.querySelector("[data-tcds-form=radio-other] [type=text]");
    function syncRequired() {
      radioOtherValue.required = radioOther.checked;
    }

    // Pointer clicks on the radio move focus to the field. Keyboard/arrow-key
    // selection (detail === 0) leaves focus where it is.
    radioOther.addEventListener("click", function (event) {
      if (event.detail > 0) radioOtherValue.focus();
    });

    // Clicking into the field counts as choosing "Other"; tabbing through it
    // doesn't.
    radioOtherValue.addEventListener("pointerdown", function () {
      radioOther.checked = true;
      syncRequired();
    });

    // Typing a value also selects "Other".
    radioOtherValue.addEventListener("input", function () {
      if (radioOtherValue.value !== "") {
        radioOther.checked = true;
      }
      syncRequired();
    });
    form.addEventListener("change", syncRequired);
    window.addEventListener("pageshow", syncRequired);

    // Rewrite only the submitted data, so the URL has a single field name
    // parameter.
    form.addEventListener("formdata", function (event) {
      event.formData["delete"](radioOtherValue.name);
      if (radioOther.checked) {
        event.formData.set(radioOther.name, radioOtherValue.value);
      }
    });
  }
});
