import Link from 'next/link';
import { ExternalLink, Sparkles, Leaf } from 'lucide-react';
import { ingredients, benefits } from '@/lib/data';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-emerald-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light tracking-wider text-slate-800">
            Cindy's Bliss
          </h1>
          <nav className="flex gap-6 items-center">
            <span className="text-slate-600 text-sm">Ingredient Guide</span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Discover Your Perfect Match
          </div>
          <h2 className="text-4xl lg:text-6xl font-light text-slate-900 mb-6 leading-tight">
            Natural Skincare,
            <br />
            <span className="font-normal">Tailored to You</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore our handcrafted soaps by ingredient or skin concern. Each bar is lovingly made
            with premium botanicals to nourish, heal, and transform your skin naturally.
          </p>
        </section>

        <section className="pb-16 lg:pb-20">
          <div className="flex items-center gap-3 mb-8">
            <Leaf className="w-6 h-6 text-emerald-600" />
            <h3 className="text-2xl lg:text-3xl font-light text-slate-900">
              Shop by Skin Concern
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map(benefit => (
              <Card
                key={benefit.id}
                className="group relative overflow-hidden bg-white hover:shadow-xl transition-all duration-300 border-slate-200"
              >
                <div className="p-6 space-y-3">
                  <h4 className="text-xl font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {benefit.name}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {ingredients.slice(0, 3).map(ingredient => (
                        <Link
                          key={ingredient.id}
                          href={`/shop/${ingredient.slug}/${benefit.slug}`}
                          className="inline-flex items-center text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full transition-colors"
                        >
                          {ingredient.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-20 lg:pb-28">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            <h3 className="text-2xl lg:text-3xl font-light text-slate-900">
              Shop by Key Ingredient
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ingredients.map(ingredient => (
              <Card
                key={ingredient.id}
                className="group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 border-slate-200"
              >
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={ingredient.imageUrl}
                    alt={ingredient.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h4 className="text-xl font-medium text-slate-900">
                    {ingredient.name}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {ingredient.description}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    {benefits.slice(0, 2).map(benefit => (
                      <Link
                        key={benefit.id}
                        href={`/shop/${ingredient.slug}/${benefit.slug}`}
                        className="inline-flex items-center text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors"
                      >
                        {benefit.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-20 lg:pb-28">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl">
            <h3 className="text-3xl lg:text-4xl font-light mb-4">
              Ready to Transform Your Skincare Routine?
            </h3>
            <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
              With {ingredients.length} premium ingredients and {benefits.length} targeted solutions,
              we have {ingredients.length * benefits.length} unique soap formulations waiting to be discovered.
            </p>
            <a
              href="https://cindysbliss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-medium hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Visit Our Main Store
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-slate-600">
          <p className="font-light tracking-wide text-lg text-slate-800 mb-2">Cindy's Bliss</p>
          <p className="text-sm">Handcrafted Natural Skincare • Made with Love</p>
          <p className="text-xs mt-4 text-slate-500">
            Each product page is uniquely optimized for search engines
          </p>
        </div>
      </footer>
    </div>
  );
}
