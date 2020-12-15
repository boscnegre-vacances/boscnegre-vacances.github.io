const path = require("path")

require("dotenv").config()

const {NODE_ENV, GOOGLE_ANALYTICS_ID} = process.env

const content = [
  "_uploads",
  "_fr_pages",
  "_fr_services",
  "_fr_cottages_categories",
  "_fr_groups",
  "_fr_posts",
  "_nl_cottages_categories",
  "_nl_pages",
  "_nl_posts",
  "_nl_services",
  // "_test",
]

module.exports = {
  flags: {
    FAST_DEV: true,
  },
  siteMetadata: {
    title: "Bosc Nègre",
    siteUrl: "https://www.boscnegre-vacances.com",
  },
  plugins: [
    ...content.map((name) => ({
      resolve: `gatsby-source-filesystem`,
      options: {
        name,
        path: `${__dirname}/${name}`,
      },
    })),
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",

    // {
    //   resolve: "gatsby-plugin-copy-files",
    //   options: {
    //     source: `${__dirname}/_uploads`,
    //     destination: `/uploads`,
    //   },
    // },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-replace-frontmatter",
            options: {
              items: [
                {from: "/uploads/", to: "../_uploads/"},
                {from: "%20", to: " "},
              ],
            },
          },
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              staticFolderName: "_uploads",
              // include: ["image"],
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              showCaptions: false,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },

    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: "_uploads",
    //     path: `${__dirname}/_uploads`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: "_fr_pages",
    //     path: `${__dirname}/_fr_pages`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: "_fr_services",
    //     path: `${__dirname}/_fr_services`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: "_fr_cottages_categories",
    //     path: `${__dirname}/_fr_cottages_categories`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: "_fr_groups",
    //     path: `${__dirname}/_fr_groups`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("postcss-import")({
            path: path.resolve(__dirname, "src", "styles"),
          }),
          require("postcss-calc"),
          require(`postcss-preset-env`)({stage: 1}),
        ],
      },
    },
    {
      resolve: "gatsby-plugin-webfonts",
      options: {
        fonts: {
          google: [
            {
              family: "Lato",
              variants: ["300", "400", "700"],
              fontDisplay: "fallback",
            },
          ],
        },
        formats: ["woff2"],
        usePreload: true,
      },
    },
    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     name: "Bosc Nègre, Village de Vacances",
    //     short_name: "Bosc Nègre",
    //     description:
    //       "Découvrez village de vacances le Bosc Nègre en Lot-et-Garonne, limitrophe de la Dordogne. Profitez des gîtes au calme et d'installations nombreux dans ce village de gîtes familiales.",
    //     start_url: "/",
    //     background_color: "#8bc59d",
    //     theme_color: "#8bc59d",
    //     display: "standalone",
    //     icon: "static/favicon.svg",
    //     lang: "fr",
    //     icon_options: {
    //       purpose: "any maskable",
    //     },
    //     localize: [
    //       {
    //         start_url: "/nl",
    //         lang: "nl",
    //         name: "Vakantiepark Bosc Nègre",
    //         short_name: "Bosc Nègre",
    //         description:
    //           "Vakantiehuisjes op Bosc Nègre met restaurant, verwarmd zwembad en tennisbaan. Een kleinschalig vakantiepark tussen Dordogne en Lot in Frankrijk voor het gezin, met welness, sport en ontspanning",
    //       },
    //     ],
    //   },
    // },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: GOOGLE_ANALYTICS_ID,
        anonymize: true,
        respectDNT: true,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-layout",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-remove-trailing-slashes",
    "gatsby-plugin-netlify",
  ],
}
