import {graphql} from "gatsby"
import React from "react"
import {Content} from "src/components/Content"
import {CottagesCategories} from "src/components/CottagesCategories"
import {Groups} from "src/components/Groups"
import {Html} from "src/components/Html"
import {Offers} from "src/components/Offers"
import {Services} from "src/components/Services"
import {LayoutPage} from "src/layouts/page"

export default ({data: {page, services, groups}}) => {
  const {offers} = page.frontmatter
  return (
    <LayoutPage page={page} withBreadcrumb={false}>
      <Content>
        <CottagesCategories />
      </Content>
      <Offers cover={offers.cover} text={offers.text} />
      <Content>
        <Services services={services} />
      </Content>
      <Groups groups={groups} />
      {page.html && (
        <Content>
          <Html html={page.html} />
        </Content>
      )}
    </LayoutPage>
  )
}

export const query = graphql`
  query Home($path: String!, $locale: String!) {
    page: markdownRemark(fields: {path: {eq: $path}}) {
      ...PageFragment
      frontmatter {
        offers {
          cover {
            image
            alt
          }
          text
        }
      }
    }
    services: allMarkdownRemark(
      filter: {fields: {locale: {eq: $locale}, template: {eq: "Service"}}}
    ) {
      ...ServicesFragment
    }
    groups: allMarkdownRemark(
      filter: {fields: {locale: {eq: $locale}, template: {eq: "Group"}}}
    ) {
      ...GroupsFragment
    }
  }
`
