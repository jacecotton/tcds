const standardDesc = {
  design: (subj) => {
    return `Guidelines and resources for using ${subj} across Texas Children's digital projects.`;
  },

  components: (subj) => {
    return `Guidelines and resources for using the Texas Children's Design System's ${subj} component.`;
  },

  patterns: (subj) => {
    return `Guidelines and resources for using the Texas Children's Design System's ${subj} pattern.`;
  },

  primitives: (subj) => {
    return `${subj} styles and guidelines in the Texas Children's Design System.`;
  },
};

module.exports = [
  // Top-level
  {
    pages: [
      {
        // Covers principles and project structure (find design stuff <here>,
        // components <here>, patterns are <this> and you can find them <here>,
        // etc...)
        route: "",
        template: "index",
        title: "Introduction",
        description: "Introduction to the Texas Children's Design System.",
        audience: ["developers", "content editors", "designers"],
      },
      {
        // Covers installation and how to use the design system documentation to
        // achieve what is needed
        title: "Getting Started",
        description: "Getting started with the Texas Children's Design System.",
        audience: ["developers", "content editors"],
      },
      {
        // Link to the repo, issues/zoho, list of maintainers similar to web.dev
        // author area
        title: "Contributing",
        description: "Contributing to the Texas Children's Design System.",
        audience: ["developers", "content editors", "designers"],
      },
    ],
  },

  // Design
  {
    // Includes guidelines, usage instructions, as well as code documentation
    // for utilities, etc.
    title: "Design",
    pages: [
      {
        title: "Animation",
        description: standardDesc.design("animation"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Branding",
        description: standardDesc.design("Texas Children's branding"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Color",
        description: standardDesc.design("color"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Icons",
        description: standardDesc.design("icons"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        // Images should serve a clear purpose
        // Design standards for image quality and use
        title: "Imagery",
        description: standardDesc.design("images"),
        audience: ["designers", "content editors"],
      },
      {
        title: "Typography",
        description: standardDesc.design("typography"),
        audience: ["developers", "content editors", "designers"],
      },
    ]
  },

  // Components
  {
    title: "Components",
    pages: [
      {
        title: "Accordion",
        description: standardDesc.components("Accordion"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Breadcrumb",
        description: standardDesc.components("Breadcrumb"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Button",
        description: standardDesc.components("Button"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Callout",
        description: standardDesc.components("Callout"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Card",
        description: standardDesc.components("Card"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Carousel",
        description: standardDesc.components("Carousel"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Drawer",
        description: standardDesc.components("Drawer"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Icon",
        description: standardDesc.components("Icon"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Modal",
        description: standardDesc.components("Modal"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Notification",
        description: standardDesc.components("Notification"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Tabs",
        description: standardDesc.components("Tabs"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Tile",
        description: standardDesc.components("Tile"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
      {
        title: "Tooltip",
        description: standardDesc.components("Tooltip"),
        audience: ["developers", "content editors", "designers"],
        category: [],
      },
    ],
  },

  // Patterns
  {
    title: "Patterns",
    pages: [
      {
        title: "Action Bar",
        description: standardDesc.patterns("Action Bar"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Footer",
        description: standardDesc.patterns("Footer"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Header",
        description: standardDesc.patterns("Header"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Hero",
        description: standardDesc.patterns("Hero"),
        audience: ["developers", "content editors", "designers"],
      },
    ],
  },

  // Primitives
  {
    title: "Primitives",
    pages: [
      {
        title: "Blockquote",
        description: standardDesc.primitives("Blockquote"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Form controls",
        description: standardDesc.primitives("Form control"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Headings and paragraphs",
        description: standardDesc.primitives("Heading and paragraph"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Horizontal rule",
        description: standardDesc.primitives("Horizontal rule"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Links",
        description: standardDesc.primitives("Link"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Lists",
        description: standardDesc.primitives("List"),
        audience: ["developers", "content editors", "designers"],
      },
      {
        title: "Table",
        description: standardDesc.primitives("Table"),
        audience: ["developers", "content editors", "designers"],
      },
    ],
  },

  // Content
  {
    title: "Content Guidelines",
    pages: [
      {
        // Tone: Child-friendly but not childish
        title: "Manual of Style",
        description: "Texas Children's Manual of Style.",
        audience: ["content editors", "designers"],
      },
      {
        // Make links explicit (no "click here" or "read more" link labels)
        // Writing better alt text (also include figcaption advice, etc.)
        // Use simple and literal language (avoid abstract language)
        title: "Writing accessible text",
        description: "Guidelines for writing more accessible text content for Texas Children's.",
        audience: ["content editors", "designers"],
      },
    ],
  },

  // Code reference
  {
    title: "Code Reference",
    pages: [
      {
        // gulp setup, linting setup, general workflow, etc.
        // For the workflow and setup of the design system site itself, point to
        // the repo, where the readme/wiki will cover it.
        route: "general",
        title: "General Reference",
        displaytitle: "General",
        description: "General code reference in the Texas Children's Design System.",
        audience: ["developers"],
      },
      {
        // utilities, public methods, babel, etc.
        route: "javascript",
        title: "JavaScript Reference",
        displaytitle: "JavaScript",
        description: "Code reference for JavaScript in the Texas Children's Design System.",
        audience: ["developers"],
      },
      {
        // sass, postcss, autoprefixer, etc.
        route: "css",
        title: "CSS Reference",
        displaytitle: "CSS",
        description: "Code reference for CSS in the Texas Children's Design System.",
      },
      {
        // meta component that all others extend, how it works, etc.
        route: "twig",
        title: "Twig Reference",
        displaytitle: "Twig",
        description: "Code reference for Twig in the Texas Children's Design System.",
        audience: ["developers"],
      },
    ],
  },

  // Style guide
  {
    title: "Style Guide",
    pages: [
      {
        route: "general",
        title: "General Style Guide",
        displaytitle: "General",
        description: "General style guide for the Texas Children's Design System.",
        audience: ["developers"],
      },
      {
        route: "css",
        title: "CSS Style Guide",
        displaytitle: "CSS",
        description: "Stylesheet style guide for the Texas Children's Design System.",
        audience: ["developers"],
      },
      {
        route: "html",
        title: "HTML Style Guide",
        displaytitle: "HTML",
        description: "HTML style guide for the Texas Children's Design System.",
        audience: ["developers"],
      },
      {
        route: "javascript",
        title: "JavaScript Style Guide",
        displaytitle: "JavaScript",
        description: "JavaScript style guide for the Texas Children's Design System.",
        audience: ["developers"],
      },
      {
        route: "php",
        title: "PHP Style Guide",
        displaytitle: "PHP",
        description: "PHP style guide for the Texas Children's Design System.",
        audience: ["developers"],
      },
      {
        route: "twig",
        title: "Twig Style Guide",
        displaytitle: "Twig",
        description: "Twig style guide for the Texas Children's Design System.",
        audience: ["developers"],
      },
    ],
  },
];