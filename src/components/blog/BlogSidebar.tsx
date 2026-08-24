import Link from "next/link";
import { Folder, Search } from "lucide-react";
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
