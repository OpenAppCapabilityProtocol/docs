"use client";

import navigationBar from "@/content/navigation-bar/docs-navigation-bar.json";
import { getUrl } from "@/utils/get-url";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useRef, useState } from "react";
import { SearchResults } from "./search-results";

const isDev = process.env.NODE_ENV === "development";
const configuredPagefindPath = process.env.NEXT_PUBLIC_PAGEFIND_PATH;
const pagefindPath =
  configuredPagefindPath ||
  (isDev
    ? "/pagefind"
    : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/_next/static/pagefind`);

type NavigationItem = {
  title?: string;
  slug?: string;
  items?: NavigationItem[];
};

type SearchResult = {
  url: string;
  title: string;
  excerpt: string;
  sectionPath: string[];
};

const normalizeUrl = (url: string) =>
  url
    .replace(/\.html$/, "")
    .replace(/\/+/g, "/")
    .replace(/\/$/, "") || "/";

const buildSectionLookup = () => {
  const lookup = new Map<string, string[]>();
  const groups = navigationBar.tabs.flatMap((tab) => tab.supermenuGroup || []);

  const walkItems = (items: NavigationItem[], sectionPath: string[]) => {
    for (const item of items) {
      if (item.slug) {
        lookup.set(normalizeUrl(getUrl(item.slug)), sectionPath);
      }

      if (item.items?.length) {
        walkItems(
          item.items,
          item.title ? [...sectionPath, item.title] : sectionPath
        );
      }
    }
  };

  for (const group of groups) {
    walkItems(group.items || [], group.title ? [group.title] : []);
  }

  return lookup;
};

const sectionLookup = buildSectionLookup();

export function Search({ className }: { className?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const shortcutLabel = useMemo(() => {
    if (typeof navigator === "undefined") return "Ctrl K";
    return /Mac|iPhone|iPad|iPod/i.test(navigator.platform)
      ? "Cmd K"
      : "Ctrl K";
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const isSearchShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (!isSearchShortcut) return;

      event.preventDefault();
      if (isOpen) {
        closeSearch();
        return;
      }
      setIsOpen(true);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 10);

    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeSearch = () => {
    setIsOpen(false);
    setResults([]);
    setSearchTerm("");
    setError(null);
    setIsLoading(false);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setError(null);

    if (!value.trim()) {
      setResults([]);
      setSearchTerm("");
      return;
    }

    setIsLoading(true);

    try {
      if (typeof window !== "undefined") {
        let pagefindModule: any;
        try {
          pagefindModule = await (window as any).eval(
            `import("${pagefindPath}/pagefind.js")`
          );
        } catch {
          setError(
            "Unable to load search right now. Rebuild the Pagefind index and refresh the page."
          );
          return;
        }

        const search = await pagefindModule.search(value);

        const searchResults = await Promise.all(
          search.results.map(async (result: any) => {
            const data = await result.data();

            const searchTerms = value.toLowerCase().match(/\w+/g) || [];
            const textToSearch = `${data.meta.title || ""} ${
              data.excerpt
            }`.toLowerCase();

            const words = textToSearch.match(/\w+/g) || [];

            const matchFound = searchTerms.every((term) =>
              words.some((word: string) => word.includes(term))
            );

            if (!matchFound) return null;

            return {
              url: normalizeUrl(
                data.raw_url.replace(/^\/server\/app/, "").trim()
              ),
              title: data.meta.title || "Untitled",
              excerpt: data.excerpt,
              sectionPath:
                sectionLookup.get(
                  normalizeUrl(
                    data.raw_url.replace(/^\/server\/app/, "").trim()
                  )
                ) || [],
            };
          })
        );

        setResults(searchResults.filter(Boolean));
      }
    } catch {
      setError("An error occurred while searching. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`w-full max-w-[17rem] md:max-w-[22rem] ${className || ""}`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-between gap-3 rounded-full border border-neutral-border/50 bg-neutral-background-secondary/85 px-4 py-2 text-left text-neutral-text shadow-lg transition hover:border-brand-primary/40 hover:bg-neutral-surface dark:border-neutral-border-subtle/50 dark:bg-neutral-surface/60"
          aria-label="Open search"
        >
          <span className="flex min-w-0 items-center gap-3">
            <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0 text-brand-primary" />
            <span className="truncate text-sm md:text-base text-neutral-text-secondary">
              Search docs
            </span>
          </span>
          <span className="hidden rounded-md border border-neutral-border-subtle bg-neutral-surface/80 px-2 py-1 text-xs font-medium text-neutral-text-secondary md:inline-flex dark:bg-neutral-background-secondary/80">
            {shortcutLabel}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-[#020617]/45 backdrop-blur-md"
            onClick={closeSearch}
          />
          <div className="relative z-10 flex min-h-full items-start justify-center px-4 pt-[12vh]">
            <div className="w-full max-w-2xl overflow-hidden rounded-[28px] bg-neutral-background/92 shadow-2xl backdrop-blur-2xl dark:bg-neutral-background/90">
              <div className="border-b border-neutral-border-subtle/60 p-3 md:p-4">
                <div className="flex items-center gap-3 rounded-2xl border border-brand-primary/20 bg-neutral-surface/80 px-4 py-3 shadow-sm dark:bg-neutral-surface/40">
                  <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0 text-brand-primary" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    className={`w-full bg-transparent text-base text-neutral-text outline-none placeholder:text-neutral-text-secondary md:text-lg ${
                      error !== null ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    placeholder="Search OACP docs..."
                    onChange={handleSearch}
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="rounded-full p-1 text-neutral-text-secondary transition hover:bg-neutral-background-secondary hover:text-neutral-text"
                    aria-label="Close search"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between px-1 text-xs text-neutral-text-secondary">
                  <span>Jump to any doc page with keyboard-first search.</span>
                  <span className="hidden md:inline">
                    {shortcutLabel} or Esc to close
                  </span>
                </div>
              </div>

              <div className="max-h-[65vh] overflow-y-auto p-3 md:p-4">
                {error ? (
                  <div className="rounded-2xl border border-red-300/60 bg-red-50/80 p-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-200">
                    {error}
                  </div>
                ) : (
                  <SearchResults
                    results={results}
                    isLoading={isLoading}
                    searchTerm={searchTerm}
                    onSelect={closeSearch}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
