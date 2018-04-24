const path = require("path");
const casing = require("case");

const devTemplate = {
  lang: "en",
  favicon: "favicon.ico",
  head: {
    scripts: [
      {
        src: "//cdn.polyfill.io/v2/polyfill.min.js?features=Set"
      }
    ]
  }
};
const productionTemplate = {
  lang: "en",
  favicon: "favicon.ico",
  head: {
    scripts: [
      {
        src: "//cdn.polyfill.io/v2/polyfill.min.js?features=Set"
      },
      {
        src:
          "https://assets.adobedtm.com/6462022b939758565769298a6393ed7a46ee6817/satelliteLib-1a62f312773f2a4b9eaa85dbf0ec0bb49095fd2e.js"
      }
    ],
    raw: `
<script>
  window.dataLayer = {
    page: {
      name: 'TELUS Design System Community'
    }
  }
</script>`
  },
  body: {
    raw: `<script type="text/javascript">_satellite.pageBottom();</script>`
  }
};

module.exports = {
  title: "TELUS Design System Community",

  skipComponentsWithoutExample: true,
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.jsx?$/, ".md");
  },
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, ".jsx");

    const kebabizeName = casing.kebab(name);

    return `import ${name} from '@tds/community-${kebabizeName}'`;
  },

  showUsage: false,
  showCode: false,

  sections: [
    {
      name: "TELUS Design System Community",
      content: path.resolve("docs/intro/welcome.md"),
      sections: [
        {
          name: "Community Components",
          components: path.resolve("packages/**/*.jsx")
        },
        {
          name: "Sample Components",
          components: path.resolve("samples/**/*.jsx")
        }
      ]
    }
  ],

  template: styleguidistEnv === "production" ? productionTemplate : devTemplate,
  assetsDir: path.resolve("docs/assets/"),
  styleguideDir: path.resolve(`styleguide/${styleguidistEnv}`),
  require: [
    "@tds/core-css-reset/dist/index.css",
    path.resolve("docs/scss/styleguide.scss"),
    path.resolve("docs/setup/tds-core-globals.js")
  ],
  styleguideComponents: {
    Editor: path.resolve("docs/components/overrides/Editor/Editor"),
    Logo: path.resolve("docs/components/custom/Logo/Logo"),
    "Markdown/List": path.resolve(
      "docs/components/custom/MarkdownList/MarkdownList"
    ),
    "Markdown/MarkdownHeading": path.resolve(
      "docs/components/custom/MarkdownHeading/MarkdownHeading"
    ),
    "Markdown/Markdown": path.resolve(
      "docs/components/overrides/Markdown/Markdown"
    ),
    PathlineRenderer: path.resolve(
      "docs/components/overrides/Pathline/PathlineRenderer"
    ),
    SectionHeadingRenderer: path.resolve(
      "docs/components/custom/SectionHeading/SectionHeadingRenderer"
    ),
    StyleGuideRenderer: path.resolve(
      "docs/components/overrides/StyleGuide/StyleGuideRenderer"
    ),
    TabButtonRenderer: path.resolve(
      "docs/components/overrides/TabButton/TabButtonRenderer"
    ),
    TableOfContentsRenderer: path.resolve(
      "docs/components/custom/TableOfContents/TableOfContentsRenderer"
    )
  },
  theme: {
    fontFamily: {
      base: ["TELUS-Web", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
    },
    color: {
      link: "#4B286D",
      linkHover: "#54595F",
      sidebarBackground: "#ffffff",
      codeBackground: "#ffffff"
    },
    sidebarWidth: 240
  },
  styles: {
    // Fixing mobile overflow of code examples
    Markdown: {
      pre: {
        "overflow-x": "auto"
      }
    },
    ReactComponent: {
      tabs: {
        "overflow-x": "auto"
      }
    },
    // [TDS-381] Increase font size in props tables to match default Paragraph size.
    Table: {
      cell: {
        fontSize: "1rem"
      },
      cellHeading: {
        fontSize: "1rem"
      }
    },
    Name: {
      name: {
        fontSize: "inherit"
      }
    },
    Type: {
      type: {
        fontSize: "inherit"
      }
    },
    Text: {
      text: {
        fontSize: "inherit"
      }
    }
  },
  updateDocs(docs, file) {
    const updatedDocs = Object.assign({}, docs);

    if (updatedDocs.doclets.version) {
      const versionFilePath = path.resolve(
        path.dirname(file),
        updatedDocs.doclets.version
      );
      const version = require(versionFilePath).version; // eslint-disable-line import/no-dynamic-require

      updatedDocs.doclets.version = version;
      updatedDocs.tags.version[0].description = version;
    }

    return updatedDocs;
  },
  webpackConfig: {
    devServer: {
      disableHostCheck: true
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "TDS_[name]__[local]___[hash:base64:5]",
                importLoaders: 2 // Number of loaders applied before CSS loader
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("autoprefixer")()]
              }
            },
            "sass-loader"
          ]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpg|svg)$/,
          use: "url-loader"
        }
      ]
    }
  }
};
