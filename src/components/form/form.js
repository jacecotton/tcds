window.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".tcds-form");

  forms.forEach((form) => {
    initalizeRadioOther(form);
  });

  function initalizeRadioOther(form) {
    const radioOther = form.querySelector("[data-tcds-form=radio-other] [type=radio]");
    const radioOtherValue = form.querySelector("[data-tcds-form=radio-other] [type=text]");

    function syncRequired() {
      radioOtherValue.required = radioOther.checked;
    }

    // Pointer clicks on the radio move focus to the field. Keyboard/arrow-key
    // selection (detail === 0) leaves focus where it is.
    radioOther.addEventListener("click", (event) => {
      if (event.detail > 0) radioOtherValue.focus();
    });

    // Clicking into the field counts as choosing "Other"; tabbing through it
    // doesn't.
    radioOtherValue.addEventListener("pointerdown", () => {
      radioOther.checked = true;
      syncRequired();
    });

    // Typing a value also selects "Other".
    radioOtherValue.addEventListener("input", () => {
      if (radioOtherValue.value !== "") {
        radioOther.checked = true;
      }

      syncRequired();
    });

    form.addEventListener("change", syncRequired);
    window.addEventListener("pageshow", syncRequired);

    // Rewrite only the submitted data, so the URL has a single field name
    // parameter.
    form.addEventListener("formdata", (event) => {
      event.formData.delete(radioOtherValue.name);

      if (radioOther.checked) {
        event.formData.set(radioOther.name, radioOtherValue.value);
      }
    });
  }
});
