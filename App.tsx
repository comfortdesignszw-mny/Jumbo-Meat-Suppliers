
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ButcherAssistant from './components/ButcherAssistant';
import Testimonials from './components/Testimonials';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import Blog from './components/Blog';
import BlogMarquee from './components/BlogMarquee';
import { PRODUCTS, BUSINESS_INFO } from './constants';
import { Product, CartItem, WebsiteSettings, AdminAccount, BlogPost } from './types';
import { Eye, ArrowLeft } from 'lucide-react';

type View = 'home' | 'products' | 'about' | 'contact' | 'admin' | 'blog';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentUser, setCurrentUser] = useState<AdminAccount | null>(null);
  const [isAdminPreview, setIsAdminPreview] = useState(false);
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('jumbo_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('jumbo_blog_posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [admins, setAdmins] = useState<AdminAccount[]>(() => {
    const saved = localStorage.getItem('jumbo_admins');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('jumbo_settings');
    const initialSettings: WebsiteSettings = {
      ...BUSINESS_INFO,
      heroTitle: "Premium Quality Meat You Can Trust.",
      heroSubtitle: "Serving Bulawayo with the freshest cuts, traditional boerewors, and wholesale supplies. Freshly sourced and expertly butchered daily.",
      heroImage: "https://images.unsplash.com/photo-1529692236671-f1f6cf9583b5?auto=format&fit=crop&q=80&w=2000"
    };
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('jumbo_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('jumbo_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('jumbo_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('jumbo_admins', JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, isAdminPreview]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleAdminUpdateProducts = (newProducts: Product[]) => setProducts(newProducts);
  const handleAdminUpdateSettings = (newSettings: WebsiteSettings) => setSettings(newSettings);
  const handleAdminUpdateAdmins = (newAdmins: AdminAccount[]) => setAdmins(newAdmins);
  const handleAdminUpdateBlogPosts = (newPosts: BlogPost[]) => setBlogPosts(newPosts);

  if (currentView === 'admin' && !isAdminPreview) {
    return (
      <AdminPanel 
        products={products} 
        settings={settings}
        admins={admins}
        blogPosts={blogPosts}
        currentUser={currentUser}
        onUpdateProducts={handleAdminUpdateProducts}
        onUpdateSettings={handleAdminUpdateSettings}
        onUpdateAdmins={handleAdminUpdateAdmins}
        onUpdateBlogPosts={handleAdminUpdateBlogPosts}
        onExit={() => { setCurrentView('home'); setCurrentUser(null); }}
        onLogin={(user) => setCurrentUser(user)}
        onTogglePreview={() => setIsAdminPreview(true)}
        isLoggedIn={!!currentUser}
      />
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return (
          <div className="pt-24 pb-20 min-h-screen bg-white">
            <div className="bg-slate-50 py-12 mb-12 border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-black text-slate-900 mb-4 uppercase">Our Meat Catalog</h1>
                <p className="text-slate-600">Browse our premium selection of fresh local cuts.</p>
              </div>
            </div>
            <Products products={products} onAddToCart={addToCart} />
          </div>
        );
      case 'blog':
        return (
          <div className="pt-24 pb-20 min-h-screen bg-white">
            <Blog posts={blogPosts} />
          </div>
        );
      case 'about':
        return (
          <div className="pt-32 pb-20 min-h-screen bg-[#FAF9F6]">
            <About settings={settings} />
            <div className="mt-20">
               <Testimonials />
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="pt-32 pb-20 min-h-screen bg-[#FAF9F6]">
            <Contact settings={settings} />
          </div>
        );
      default:
        return (
          <>
            <BlogMarquee posts={blogPosts} onNavigate={() => setCurrentView('blog')} />
            <Hero settings={settings} onNavigate={setCurrentView} />
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                <h2 className="text-3xl font-black text-slate-900">Featured Specialties</h2>
                <div className="w-16 h-1 bg-red-800 mx-auto mt-4"></div>
              </div>
              <Products products={products} onAddToCart={addToCart} featuredOnly={true} />
              <div className="text-center mt-12">
                <button 
                  onClick={() => setCurrentView('products')}
                  className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-red-800 transition-colors uppercase tracking-widest text-sm"
                >
                  VIEW FULL PRODUCT LIST
                </button>
              </div>
            </section>
            <section className="py-20 bg-slate-50">
              <About settings={settings} />
            </section>
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {isAdminPreview && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-slate-900 text-white py-2 px-4 flex items-center justify-between border-b border-red-800 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Live Preview Mode</span>
          </div>
          <button 
            onClick={() => setIsAdminPreview(false)}
            className="flex items-center gap-2 bg-red-800 hover:bg-red-900 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
          >
            <ArrowLeft size={14} />
            RETURN TO ADMIN
          </button>
        </div>
      )}
      <Navbar 
        activeView={currentView} 
        onNavigate={setCurrentView} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <main className={isAdminPreview ? 'pt-10' : ''}>
        {renderView()}
      </main>
      <Footer settings={settings} onNavigate={setCurrentView} />
      <Cart 
        settings={settings}
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
      />
      <ButcherAssistant products={products} blogPosts={blogPosts} />
    </div>
  );
};

export default App;
