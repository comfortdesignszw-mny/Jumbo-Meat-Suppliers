
import React from 'react';
import { BlogPost } from '../types';
import { Sparkles } from 'lucide-react';

interface BlogMarqueeProps {
  posts: BlogPost[];
  onNavigate: () => void;
}

const BlogMarquee: React.FC<BlogMarqueeProps> = ({ posts, onNavigate }) => {
  const highlightedPosts = posts.filter(p => p.isHighlighted);
  
  if (highlightedPosts.length === 0) return null;

  return (
    <div className="bg-slate-900 py-3 relative z-[45] overflow-hidden border-b border-slate-800 cursor-pointer group" onClick={onNavigate}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {highlightedPosts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 px-12 border-r border-slate-800">
                <Sparkles size={14} className="text-red-500 animate-pulse" />
                <span className="text-white text-xs font-black uppercase tracking-widest">
                  {post.title}
                </span>
                <span className="text-slate-500 text-[10px] font-bold">
                  {post.excerpt.slice(0, 60)}...
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default BlogMarquee;
