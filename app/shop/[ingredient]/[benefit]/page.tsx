import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, Sparkles, Heart, Leaf } from 'lucide-react';
import { getProductMatch, getAllProductPaths } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type Params = Promise<{ ingredient: string; benefit: string }>;

interface PageProps {
  params: Params;
}

export async function generateStaticParams() {
  const paths = getAllProductPaths();
  return paths.map(path => ({
    ingredient: path.ingredient,
    benefit: path.benefit
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // 2. UPDATE: Await the params before using them
  const { ingredient, benefit } = await params;

  const product = getProductMatch(ingredient, benefit);

  if (!product) {
    return {
      title: 'Product Not Found'
    };
  }

  return {
    title: `Best ${product.ingredient.name} Soap for ${product.benefit.name} | Cindy's Bliss`,
    description: product.productDescription,
    openGraph: {
      title: `Best ${product.ingredient.name} Soap for ${product.benefit.name}`,
      description: product.productDescription,
      images: [product.imageUrl]
    }
  };
}

export default async function ProductPage({ params }: PageProps) {
  // 3. UPDATE: Await the params here too
  const { ingredient, benefit } = await params;

  const product = getProductMatch(ingredient, benefit);

  if (!product) {
    notFound();
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.productName,
    description: product.productDescription,
    image: product.imageUrl,
    brand: {
      '@type': 'Brand',
      name: "Cindy's Bliss"
    },
    offers: {
      '@type': 'Offer',
      price: product.price.replace('$', ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://cindysbliss.com'
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-light tracking-wider text-slate-800">
              Cindy's Bliss
            </Link>
            <nav className="flex gap-6 items-center">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
              >
                Ingredient Guide
              </Link>
              <a
                href="https://cindysbliss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm flex items-center gap-1"
              >
                Shop Main Store
                <ExternalLink className="w-3 h-3" />
              </a>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-2xl">
                <Image
                  src={product.imageUrl}
                  alt={product.productName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority 
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-semibold">{product.price}</div>
                  <div className="text-xs opacity-90">per bar</div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Featured Solution
                </div>
                <h1 className="text-4xl lg:text-5xl font-light text-slate-900 leading-tight mb-4">
                  Best <span className="font-medium">{product.ingredient.name}</span> Soap for{' '}
                  <span className="font-medium">{product.benefit.name}</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {product.productDescription}
                </p>
              </div>

              <div className="space-y-4 bg-slate-50 rounded-xl p-6">
                <h2 className="text-lg font-medium text-slate-900 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  Key Benefits
                </h2>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <span>{product.ingredient.description}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <span>{product.benefit.description}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <span>Handcrafted in small batches with premium natural ingredients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <span>Free from harsh chemicals, parabens, and sulfates</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <a
                    href="https://cindysbliss.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Buy Now at Cindy's Bliss
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <p className="text-center text-sm text-slate-500">
                  Free shipping on orders over $35 • 30-day satisfaction guarantee
                </p>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <Link
                  href="/"
                  className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-2 transition-colors"
                >
                  ← Explore More Ingredients & Benefits
                </Link>
              </div>
            </div>
          </div>

          <section className="mt-20 lg:mt-32">
            <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-2xl p-8 lg:p-12">
              <h2 className="text-3xl font-light text-slate-900 mb-4 text-center">
                Why Choose {product.ingredient.name}?
              </h2>
              <p className="text-slate-600 text-center max-w-3xl mx-auto leading-relaxed">
                {product.ingredient.name} has been used for centuries in natural skincare for its remarkable
                therapeutic properties. When specifically formulated to target {product.benefit.name.toLowerCase()},
                this powerhouse ingredient works in harmony with your skin's natural processes to deliver
                visible, lasting results. Our artisanal soap combines traditional wisdom with modern
                skincare science to create a truly transformative bathing experience.
              </p>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200 mt-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-slate-600 text-sm">
            <p className="font-light tracking-wide text-lg text-slate-800 mb-2">Cindy's Bliss</p>
            <p>Handcrafted Natural Skincare • Made with Love</p>
          </div>
        </footer>
      </div>
    </>
  );
}