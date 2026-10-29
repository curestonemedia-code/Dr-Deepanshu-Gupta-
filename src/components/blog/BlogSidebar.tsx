import Link from "next/link";
import { ArrowRight, Folder, Search, Sparkles } from "lucide-react";
import type { BlogTaxonomy } from "@/lib/blogs";

export default function BlogSidebar({
  searchQuery,
  categories,
  activeCategorySlug,
}: {
  searchQuery?: string;
  categories: BlogTaxonomy[];
  activeCategorySlug?: string;
}) {
  // Categories with no posts on THIS site are hidden rather than shown
  // greyed-out: the taxonomy is shared with thecurestone.com, so most of it
  // would otherwise render here as a long list of dead zero-count rows.
  const withPosts = categories.filter((item) => (item.count || 0) > 0);

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <a
        href="https://www.google.com/preferences/source?q=https://drdeepanshugupta.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-[1.5rem] bg-gradient-to-br from-blue-900 via-blue-700 to-[#2563eb] p-4 shadow-xl shadow-blue-600/25 transition-transform hover:scale-[1.015]"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/75">Google Search</span>
        </div>
        <h2 className="text-base font-black leading-snug text-white">Prefer Dr. Deepanshu Gupta on Google</h2>
        <p className="mt-1 text-xs font-medium leading-relaxed text-white/80">
          See more from drdeepanshugupta.com in your search results and AI Overviews.
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-black text-blue-600 transition-colors group-hover:bg-blue-50">
          Add as Preferred Source <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </a>

      <form action="/blog" className="rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm">
        <label
          htmlFor="blog-search"
          className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-500"
        >
          Search Articles
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            id="blog-search"
            name="q"
            defaultValue={searchQuery}
            placeholder="RIRS, kidney stones, prostate..."
            className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>
        <button className="mt-3 w-full rounded-xl bg-[#2563eb] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700">
          Search
        </button>
      </form>

      {withPosts.length > 0 && (
        <div className="rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
            <Folder className="h-4 w-4" />
            Categories
          </h2>
          <div className="space-y-2">
            {withPosts.map((item) => {
              const isActive = activeCategorySlug === item.slug;

              return (
                <Link
                  key={item._id}
                  href={`/blog?category=${item.slug}`}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-[#2563eb] text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  <span>{item.title}</span>
                  <span className={isActive ? "text-white/70" : "text-slate-400"}>{item.count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
