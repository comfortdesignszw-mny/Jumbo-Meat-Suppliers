
import React, { useState } from 'react';
import { Plus, Check, Search, XCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductsProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  featuredOnly?: boolean;
}

const Products: React.FC<ProductsProps> = ({ products, onAddToCart, featuredOnly = false }) => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);
  
  const categories = ['All', 'Beef', 'Chicken', 'Pork', 'Offals', 'Boerewors'];

  const allProducts = featuredOnly ? products.slice(0, 3) : products;

  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const clearFilters = () => {
    setFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {!featuredOnly && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Select Your Choice</h2>
          <div className="w-20 h-1.5 bg-red-700 mx-auto mb-8"></div>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-10 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for T-Bone, Boerewors, Chicken..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-800/10 focus:border-red-800 outline-none shadow-sm transition-all text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XCircle size={20} />
              </button>
            )}
          </div>

          <p className="text-slate-600 max-w-2xl mx-auto">
            Browse our full selection of premium local meats. Add items to your braai basket to place an order.
          </p>
        </div>
      )}

      {/* Categories */}
      {!featuredOnly && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-black tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-red-800 text-white shadow-lg scale-105' 
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-red-800 hover:text-red-800'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!featuredOnly && filteredProducts.length === 0 && (
        <div className="text-center py-24 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
            <Search size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">No matching products</h3>
          <p className="text-slate-500 mb-8">We couldn't find any items matching "{searchQuery}" in {filter === 'All' ? 'our catalog' : filter}.</p>
          <button 
            onClick={clearFilters}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-800 transition-colors shadow-lg"
          >
            CLEAR ALL FILTERS
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-red-800 hover:scale-[1.02] flex flex-col cursor-pointer"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-800 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-lg">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-800 transition-colors duration-300">
                  {product.name}
                </h3>
                <span className="text-red-700 font-black whitespace-nowrap bg-red-50 px-2 py-1 rounded text-sm">
                  {product.priceRange.split(' ')[0]}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
                {product.description}
              </p>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd(product);
                }}
                className={`w-full py-4 rounded-xl font-black text-sm tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md hover:shadow-lg ${
                  addedId === product.id 
                    ? 'bg-green-600 text-white' 
                    : 'bg-slate-900 hover:bg-red-800 text-white'
                }`}
              >
                {addedId === product.id ? <Check size={18} /> : <Plus size={18} />}
                {addedId === product.id ? 'ADDED TO BASKET' : 'ADD TO BASKET'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
