export interface Ingredient {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface Benefit {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface ProductMatch {
  ingredient: Ingredient;
  benefit: Benefit;
  productName: string;
  productDescription: string;
  price: string;
  imageUrl: string;
}

export const ingredients: Ingredient[] = [
  {
    id: '1',
    name: 'Shea Butter',
    slug: 'shea-butter',
    description: 'Rich in vitamins A and E, deeply moisturizes and nourishes skin',
    imageUrl: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'
  },
  {
    id: '2',
    name: 'Lavender',
    slug: 'lavender',
    description: 'Calming botanical with anti-inflammatory and antimicrobial properties',
    imageUrl: 'https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg'
  },
  {
    id: '3',
    name: 'Aloe Vera',
    slug: 'aloe-vera',
    description: 'Soothing plant extract that hydrates and heals irritated skin',
    imageUrl: 'https://images.pexels.com/photos/4505455/pexels-photo-4505455.jpeg'
  },
  {
    id: '4',
    name: 'Goat Milk',
    slug: 'goat-milk',
    description: 'Creamy and gentle, packed with lactic acid and nourishing fats',
    imageUrl: 'https://images.pexels.com/photos/4022087/pexels-photo-4022087.jpeg'
  },
  {
    id: '5',
    name: 'Activated Charcoal',
    slug: 'activated-charcoal',
    description: 'Powerful detoxifier that draws out impurities and excess oil',
    imageUrl: 'https://images.pexels.com/photos/5240645/pexels-photo-5240645.jpeg'
  },
  {
    id: '6',
    name: 'Honey',
    slug: 'honey',
    description: 'Natural humectant with antibacterial properties for soft, clear skin',
    imageUrl: 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg'
  },
  {
    id: '7',
    name: 'Oatmeal',
    slug: 'oatmeal',
    description: 'Gentle exfoliant that soothes inflammation and relieves itching',
    imageUrl: 'https://images.pexels.com/photos/5560011/pexels-photo-5560011.jpeg'
  },
  {
    id: '8',
    name: 'Tea Tree Oil',
    slug: 'tea-tree-oil',
    description: 'Potent antimicrobial essential oil for acne-prone and problem skin',
    imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg'
  }
];

export const benefits: Benefit[] = [
  {
    id: '1',
    name: 'Dry Skin',
    slug: 'dry-skin',
    description: 'Intense hydration for parched, flaky skin'
  },
  {
    id: '2',
    name: 'Eczema Relief',
    slug: 'eczema-relief',
    description: 'Soothing care for sensitive, irritated skin conditions'
  },
  {
    id: '3',
    name: 'Relaxation',
    slug: 'relaxation',
    description: 'Calming aromatherapy for stress relief and better sleep'
  },
  {
    id: '4',
    name: 'Anti-Aging',
    slug: 'anti-aging',
    description: 'Nourishing ingredients to promote youthful, radiant skin'
  },
  {
    id: '5',
    name: 'Acne Treatment',
    slug: 'acne-treatment',
    description: 'Clarifying formulas to combat breakouts and blemishes'
  },
  {
    id: '6',
    name: 'Sensitive Skin',
    slug: 'sensitive-skin',
    description: 'Gentle, hypoallergenic care for reactive skin types'
  },
  {
    id: '7',
    name: 'Deep Cleansing',
    slug: 'deep-cleansing',
    description: 'Purifying treatment to remove impurities and toxins'
  },
  {
    id: '8',
    name: 'Skin Brightening',
    slug: 'skin-brightening',
    description: 'Illuminating formulas for a more even, radiant complexion'
  }
];

export function getProductMatch(ingredientSlug: string, benefitSlug: string): ProductMatch | null {
  const ingredient = ingredients.find(i => i.slug === ingredientSlug);
  const benefit = benefits.find(b => b.slug === benefitSlug);

  if (!ingredient || !benefit) {
    return null;
  }

  return {
    ingredient,
    benefit,
    productName: `${ingredient.name} Soap for ${benefit.name}`,
    productDescription: `Our handcrafted ${ingredient.name} soap is specially formulated to address ${benefit.name.toLowerCase()}. ${ingredient.description}. Perfect for ${benefit.description.toLowerCase()}.`,
    price: '$12.99',
    imageUrl: ingredient.imageUrl
  };
}

export function getAllProductPaths() {
  const paths: { ingredient: string; benefit: string }[] = [];

  ingredients.forEach(ingredient => {
    benefits.forEach(benefit => {
      paths.push({
        ingredient: ingredient.slug,
        benefit: benefit.slug
      });
    });
  });

  return paths;
}
