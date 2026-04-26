export interface NYTMultimedia {
  url: string
  format: string
  height: number
  width: number
  type: string
  subtype: string
  caption: string
  copyright: string
}

export interface NYTTopStoriesResult {
  section: string
  subsection: string
  title: string
  abstract: string
  url: string
  uri: string
  byline: string
  item_type: string
  updated_date: string
  created_date: string
  published_date: string
  material_type_facet: string
  kicker: string
  des_facet: string[]
  org_facet: string[]
  per_facet: string[]
  geo_facet: string[]
  multimedia: NYTMultimedia[] | null
  short_url: string
}

export interface NYTTopStoriesResponse {
  status: string
  copyright: string
  section: string
  last_updated: string
  num_results: number
  results: NYTTopStoriesResult[]
}

export interface NYTSearchMultimedia {
  default: string
  thumbnail: string
}

export interface NYTSearchHeadline {
  main: string
  kicker: string | null
  content_kicker: string | null
  print_headline: string | null
  name: string | null
  seo: string | null
  sub: string | null
}

export interface NYTSearchByline {
  original: string | null
  person: {
    firstname: string
    middlename: string | null
    lastname: string
    qualifier: string | null
    title: string | null
    role: string
    organization: string
    rank: number
  }[]
  organization: string | null
}

export interface NYTSearchDoc {
  abstract: string
  web_url: string
  snippet: string
  lead_paragraph: string
  print_section: string | null
  print_page: string | null
  source: string
  multimedia: {
    rank: number
    subtype: string
    caption: string | null
    credit: string | null
    type: string
    url: string
    height: number
    width: number
    legacy: NYTSearchMultimedia
    subType: string
    crop_name: string
  }[]
  headline: NYTSearchHeadline
  keywords: {
    name: string
    value: string
    rank: number
    major: string
  }[]
  pub_date: string
  document_type: string
  news_desk: string | null
  section_name: string | null
  byline: NYTSearchByline
  type_of_material: string | null
  _id: string
  word_count: number
  uri: string
}

export interface NYTSearchResponse {
  status: string
  copyright: string
  response: {
    docs: NYTSearchDoc[]
    meta: {
      hits: number
      offset: number
      time: number
    }
  }
}