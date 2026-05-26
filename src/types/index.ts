export type MenuItem = {
  id: string
  name: string
  nameNl?: string
  price: number
  description: string
  descriptionNl?: string
  category: MenuCategory
  dietary: DietaryTag[]
  image?: string
  featured?: boolean
  isDrink?: boolean
}

export type MenuCategory =
  | 'starters'
  | 'soups'
  | 'vegan'
  | 'tandoori'
  | 'veg-curries'
  | 'chicken'
  | 'lamb-mutton'
  | 'indo-chinese'
  | 'biryani'
  | 'breads'
  | 'rice-sides'
  | 'desserts'
  | 'drinks'

export type DietaryTag = 'veg' | 'vegan' | 'halal' | 'spicy' | 'mild' | 'glutenFree'

export type BlogPost = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  h1: string
  primaryKeyword: string
  language: 'en' | 'nl'
  author: string
  excerpt: string
  content: string
  publishedAt: string
  readingTime: number
  faqs?: Array<{ question: string; answer: string }>
}

export type Vacancy = {
  id: string
  title: string
  type: 'FULL_TIME' | 'PART_TIME' | 'OTHER'
  hours: string
  description: string
  requirements: string[]
  benefits: string[]
}

export type FaqItem = {
  question: string
  answer: string
}
