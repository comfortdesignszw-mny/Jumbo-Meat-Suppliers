
import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Calendar, Clock, ChevronRight, BookOpen } from 'lucide-react';

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
        <button 
          onClick={() => setSelectedPost(null)}
          className="mb-8 text-red-800 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all"
        >
          <ChevronRight className="rotate-180" size={16} />
          Back to all updates
        </button>

        <img 
          src={selectedPost.image} 
          alt={selectedPost.title} 
          className="w-full h-[400px] object-cover rounded-3xl shadow-xl mb-12"
        />

        <div className="flex items-center gap-6 mb-6 text-slate-400">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Calendar size={14} className="text-red-800" />
            {new Date(selectedPost.date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Clock size={14} className="text-red-800" />
            5 min read
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
          {selectedPost.title}
        </h1>

        <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
          {selectedPost.content}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 mb-4 uppercase">News & Events</h1>
        <div className="w-20 h-1.5 bg-red-800 mx-auto mb-6"></div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Stay updated with the latest from Bulawayo's favorite butcher shop. 
          From new cuts to special braai events.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-900">No updates yet</h3>
          <p className="text-slate-500">Check back later for fresh news!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.sort((a,b) => b.date - a.date).map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {post.isHighlighted && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-800 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-red-800 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-red-800 font-black text-xs uppercase tracking-widest">Read More</span>
                  <ChevronRight size={18} className="text-red-800 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
