
import React, { useState, useRef } from 'react';
import { 
  Package, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  LogOut, 
  Save, 
  X,
  User,
  Users,
  CheckCircle2,
  Clock,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Search,
  Key,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  BookOpen,
  Sparkles,
  Eye
} from 'lucide-react';
import { Product, WebsiteSettings, AdminAccount, BlogPost } from '../types';

interface AdminPanelProps {
  products: Product[];
  settings: WebsiteSettings;
  admins: AdminAccount[];
  blogPosts: BlogPost[];
  currentUser: AdminAccount | null;
  onUpdateProducts: (p: Product[]) => void;
  onUpdateSettings: (s: WebsiteSettings) => void;
  onUpdateAdmins: (a: AdminAccount[]) => void;
  onUpdateBlogPosts: (b: BlogPost[]) => void;
  onExit: () => void;
  onLogin: (user: AdminAccount) => void;
  onTogglePreview: () => void;
  isLoggedIn: boolean;
}

type AdminTab = 'products' | 'settings' | 'users' | 'blog';

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, 
  settings, 
  admins,
  blogPosts,
  currentUser,
  onUpdateProducts, 
  onUpdateSettings, 
  onUpdateAdmins,
  onUpdateBlogPosts,
  onExit,
  onLogin,
  onTogglePreview,
  isLoggedIn
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [isEditingProduct, setIsEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingBlog, setIsEditingBlog] = useState<BlogPost | null>(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>(admins.length === 0 ? 'register' : 'login');
  
  // Modal State for Uploads
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageSource, setImageSource] = useState<'url' | 'upload'>('url');
  
  // Auth Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const flashSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = admins.find(a => a.username === username && a.passwordHash === password);
    if (!user) { setError('Invalid credentials.'); return; }
    if (!user.isApproved) { setError('Pending approval.'); return; }
    onLogin(user);
    setError('');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (admins.some(a => a.username === username)) { setError('Exists.'); return; }
    const isFirst = admins.length === 0;
    const newAdmin: AdminAccount = {
      id: Date.now().toString(), username, passwordHash: password,
      isApproved: isFirst, isPrimary: isFirst, createdAt: Date.now()
    };
    onUpdateAdmins([...admins, newAdmin]);
    if (isFirst) { onLogin(newAdmin); } else { setAuthView('login'); }
    setUsername(''); setPassword('');
  };

  // Blog Logic
  const deleteBlogPost = (id: string) => {
    if (window.confirm('Delete this blog post?')) {
      onUpdateBlogPosts(blogPosts.filter(p => p.id !== id));
      flashSuccess('Post Deleted.');
    }
  };

  const saveBlogPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData: Partial<BlogPost> = {
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      isHighlighted: formData.get('isHighlighted') === 'on',
      image: imageSource === 'upload' ? imagePreview : (formData.get('image') as string),
      date: isEditingBlog ? isEditingBlog.date : Date.now(),
    };

    if (isEditingBlog) {
      onUpdateBlogPosts(blogPosts.map(p => p.id === isEditingBlog.id ? { ...isEditingBlog, ...postData } as BlogPost : p));
      setIsEditingBlog(null);
    } else {
      onUpdateBlogPosts([...blogPosts, { ...postData as BlogPost, id: Date.now().toString() }]);
      setIsAddingBlog(false);
    }
    setImagePreview('');
    flashSuccess('Blog Published!');
  };

  // Product Logic
  const deleteProduct = (id: string) => {
    if (window.confirm('Remove this item from inventory?')) {
      onUpdateProducts(products.filter(p => p.id !== id));
      flashSuccess('Item Removed.');
    }
  };

  const saveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pData: Partial<Product> = {
      name: formData.get('name') as string,
      category: formData.get('category') as any,
      priceRange: formData.get('priceRange') as string,
      description: formData.get('description') as string,
      image: imageSource === 'upload' ? imagePreview : (formData.get('image') as string),
    };
    if (isEditingProduct) {
      onUpdateProducts(products.map(p => p.id === isEditingProduct.id ? { ...isEditingProduct, ...pData } as Product : p));
      setIsEditingProduct(null);
    } else {
      onUpdateProducts([...products, { ...pData as Product, id: Date.now().toString() }]);
      setIsAddingProduct(false);
    }
    setImagePreview('');
    flashSuccess('Inventory Updated!');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-900 uppercase">Backend Control</h1>
          </div>
          <form onSubmit={authView === 'login' ? handleLogin : handleRegister} className="space-y-6">
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full px-4 py-3 bg-slate-100 rounded-xl" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 bg-slate-100 rounded-xl" required />
            {error && <p className="text-red-600 text-xs font-bold text-center">{error}</p>}
            <button className="w-full bg-slate-900 hover:bg-red-800 text-white py-4 rounded-xl font-black">CONTINUE</button>
            <button type="button" onClick={onExit} className="w-full text-slate-300 text-xs font-bold uppercase pt-4">Return Home</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="w-64 bg-slate-900 text-slate-400 flex flex-col fixed inset-y-0 z-20">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-800 rounded flex items-center justify-center text-white font-black">J</div>
          <span className="text-white font-black uppercase">Admin</span>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'products' ? 'bg-red-800 text-white' : 'hover:bg-slate-800'}`}>
            <Package size={20} /> <span className="text-sm font-bold">Inventory</span>
          </button>
          <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'blog' ? 'bg-red-800 text-white' : 'hover:bg-slate-800'}`}>
            <BookOpen size={20} /> <span className="text-sm font-bold">Blog & Events</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'settings' ? 'bg-red-800 text-white' : 'hover:bg-slate-800'}`}>
            <Settings size={20} /> <span className="text-sm font-bold">Identity</span>
          </button>
          {currentUser?.isPrimary && (
            <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'users' ? 'bg-red-800 text-white' : 'hover:bg-slate-800'}`}>
              <Users size={20} /> <span className="text-sm font-bold">Users</span>
            </button>
          )}
          
          <div className="pt-8 px-2">
            <button 
              onClick={onTogglePreview}
              className="w-full flex items-center gap-3 px-4 py-4 bg-slate-800/50 border border-slate-700 hover:bg-slate-800 text-red-500 rounded-2xl transition-all group"
            >
              <Eye size={20} className="group-hover:scale-110 transition-transform" /> 
              <span className="text-[10px] font-black uppercase tracking-widest">View Live Site</span>
            </button>
          </div>
        </nav>
        <div className="p-4 border-t border-slate-800">
           <button onClick={onExit} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl">
             <LogOut size={20} /> <span className="text-sm font-bold">Logout</span>
           </button>
        </div>
      </div>

      <div className="ml-64 flex-grow p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 uppercase">{activeTab} Manager</h2>
          {success && <div className="text-green-600 bg-green-50 px-4 py-2 rounded-full text-xs font-bold uppercase">{success}</div>}
        </div>

        {activeTab === 'blog' ? (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button onClick={() => { setIsAddingBlog(true); setImagePreview(''); setImageSource('url'); }} className="bg-red-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                <Plus size={20} /> NEW POST
              </button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] font-black text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Article Title</th>
                    <th className="px-6 py-4">Highlights</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {blogPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-900">{post.title}</td>
                      <td className="px-6 py-4">
                        {post.isHighlighted ? <span className="text-red-800 font-black text-[10px] uppercase">Home Page</span> : '-'}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">{new Date(post.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button onClick={() => { setIsEditingBlog(post); setImagePreview(post.image); setImageSource(post.image.startsWith('data:') ? 'upload' : 'url'); }} className="p-2 text-slate-400 hover:text-slate-900"><Edit size={18} /></button>
                        <button onClick={() => deleteBlogPost(post.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'products' ? (
          <div className="space-y-6">
             <div className="flex justify-end">
               <button onClick={() => { setIsAddingProduct(true); setImagePreview(''); setImageSource('url'); }} className="bg-red-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                 <Plus size={20} /> NEW PRODUCT
               </button>
             </div>
             <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
               <table className="w-full text-left">
                 <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] font-black text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Item Details</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price Range</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                 <tbody className="divide-y divide-slate-100">
                   {products.map(p => (
                     <tr key={p.id} className="hover:bg-slate-50">
                       <td className="px-6 py-4 flex items-center gap-4">
                         <img src={p.image} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                         <span className="font-bold text-slate-900">{p.name}</span>
                       </td>
                       <td className="px-6 py-4">
                        <span className="text-[10px] font-black uppercase text-red-800 bg-red-50 px-2 py-1 rounded">{p.category}</span>
                       </td>
                       <td className="px-6 py-4 font-mono text-sm">{p.priceRange}</td>
                       <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-2">
                          <button onClick={() => { setIsEditingProduct(p); setImagePreview(p.image); setImageSource(p.image.startsWith('data:') ? 'upload' : 'url'); }} className="p-2 text-slate-400 hover:text-slate-900"><Edit size={18} /></button>
                          <button onClick={() => deleteProduct(p.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18} /></button>
                         </div>
                       </td>
                     </tr>
                   ))}
                   {products.length === 0 && (
                     <tr>
                       <td colSpan={4} className="px-6 py-20 text-center text-slate-400">
                         <Package size={40} className="mx-auto mb-4 opacity-20" />
                         No products in catalog. Add your first item.
                       </td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        ) : activeTab === 'settings' ? (
          <div className="max-w-2xl bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6 uppercase">Store Settings</h3>
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newSettings = {
                ...settings,
                name: formData.get('name') as string,
                phone: formData.get('phone') as string,
                whatsapp: formData.get('whatsapp') as string,
                email: formData.get('email') as string,
                address: formData.get('address') as string,
                heroTitle: formData.get('heroTitle') as string,
                heroSubtitle: formData.get('heroSubtitle') as string,
              };
              onUpdateSettings(newSettings);
              flashSuccess('Settings Saved!');
            }}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Business Name</label>
                <input name="name" defaultValue={settings.name} className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Phone</label>
                  <input name="phone" defaultValue={settings.phone} className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">WhatsApp</label>
                  <input name="whatsapp" defaultValue={settings.whatsapp} className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Address</label>
                <input name="address" defaultValue={settings.address} className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
              </div>
              <hr />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Hero Heading</label>
                <input name="heroTitle" defaultValue={settings.heroTitle} className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Hero Sub-text</label>
                <textarea name="heroSubtitle" defaultValue={settings.heroSubtitle} rows={3} className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
              </div>
              <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase">Save All Changes</button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
             <p className="text-slate-400">Settings and User controls are available to the Primary Admin.</p>
          </div>
        )}
      </div>

      {/* Blog Modal */}
      {(isAddingBlog || isEditingBlog) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { setIsAddingBlog(false); setIsEditingBlog(null); }}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="font-black uppercase text-slate-900">Publish News / Event</h3>
               <button onClick={() => { setIsAddingBlog(false); setIsEditingBlog(null); }}><X /></button>
             </div>
             <form onSubmit={saveBlogPost} className="p-10 space-y-6 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400">Article Title</label>
                 <input name="title" defaultValue={isEditingBlog?.title} required className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400">Highlights / Excerpt (Max 150 chars)</label>
                 <textarea name="excerpt" rows={2} defaultValue={isEditingBlog?.excerpt} maxLength={150} required className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-400">Full Story Content</label>
                 <textarea name="content" rows={5} defaultValue={isEditingBlog?.content} required className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
               </div>
               
               <div className="flex items-center gap-4">
                 <label className="flex items-center gap-3 cursor-pointer bg-slate-100 px-4 py-3 rounded-xl flex-grow">
                   <input type="checkbox" name="isHighlighted" defaultChecked={isEditingBlog?.isHighlighted} className="accent-red-800" />
                   <span className="text-xs font-bold text-slate-700">Display as highlights on home page</span>
                   <Sparkles size={16} className="text-amber-500" />
                 </label>
               </div>

               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-400">Post Image</label>
                 <div className="flex gap-4">
                   <button type="button" onClick={() => setImageSource('url')} className={`px-4 py-2 rounded-lg text-xs font-bold ${imageSource === 'url' ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}>External URL</button>
                   <button type="button" onClick={() => setImageSource('upload')} className={`px-4 py-2 rounded-lg text-xs font-bold ${imageSource === 'upload' ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}>Upload File</button>
                 </div>
                 {imageSource === 'url' ? (
                   <input name="image" placeholder="https://..." defaultValue={isEditingBlog?.image} onChange={e => setImagePreview(e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
                 ) : (
                   <div className="relative">
                     <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200" />
                   </div>
                 )}
                 {imagePreview && <img src={imagePreview} className="h-32 w-full object-cover rounded-xl shadow-md border border-white" />}
               </div>

               <button className="w-full bg-red-800 text-white py-5 rounded-2xl font-black uppercase shadow-xl hover:bg-red-900 transition-all">
                 {isEditingBlog ? 'Update Post' : 'Publish to Live Site'}
               </button>
             </form>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {(isAddingProduct || isEditingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { setIsAddingProduct(false); setIsEditingProduct(null); }}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-black text-slate-900 uppercase">Product Details</h3>
              <button onClick={() => { setIsAddingProduct(false); setIsEditingProduct(null); }}><X /></button>
            </div>
            <form onSubmit={saveProduct} className="p-10 space-y-6 overflow-y-auto">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Product Name</label>
                <input name="name" defaultValue={isEditingProduct?.name} required placeholder="e.g. Premium T-Bone Steak" className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Pricing</label>
                  <input name="priceRange" defaultValue={isEditingProduct?.priceRange} required placeholder="e.g. $12.50 /kg" className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                  <select name="category" defaultValue={isEditingProduct?.category} className="w-full px-4 py-3 bg-slate-50 rounded-xl">
                    <option>Beef</option><option>Pork</option><option>Chicken</option><option>Offals</option><option>Boerewors</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Description</label>
                <textarea name="description" rows={3} defaultValue={isEditingProduct?.description} placeholder="Short selling description..." className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
              </div>
              
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-slate-400">Product Photo</label>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setImageSource('url')} className={`px-4 py-2 rounded-lg text-xs font-bold ${imageSource === 'url' ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}>External URL</button>
                  <button type="button" onClick={() => setImageSource('upload')} className={`px-4 py-2 rounded-lg text-xs font-bold ${imageSource === 'upload' ? 'bg-slate-900 text-white' : 'bg-slate-100'}`}>Upload File</button>
                </div>
                {imageSource === 'url' ? (
                  <input name="image" placeholder="https://..." defaultValue={isEditingProduct?.image} onChange={e => setImagePreview(e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl" />
                ) : (
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200" />
                  </div>
                )}
                {imagePreview && <img src={imagePreview} className="h-40 w-full object-cover rounded-xl shadow-inner border bg-slate-100" />}
              </div>

              <button className="w-full bg-red-800 text-white py-5 rounded-2xl font-black uppercase shadow-xl hover:bg-red-900 transition-all">SAVE TO CATALOG</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
