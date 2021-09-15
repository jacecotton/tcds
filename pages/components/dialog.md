<twig>
  {{ include("templates/components/button/button.html.twig", {
    label: "Open dialog",
    custom_attributes: {
      "data-dialog-toggle": "my-dialog",
    },
  }) }}
  {{ include("templates/components/dialog/dialog.html.twig", {
    title: "My dialog",
  }) }}
</twig>