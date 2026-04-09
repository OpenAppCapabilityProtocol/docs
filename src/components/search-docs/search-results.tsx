import Link from "next/link";

interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
  sectionPath: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  searchTerm: string;
  onSelect?: () => void;
}

const searchResultsContainer =
  "rounded-2xl bg-neutral-surface/35 p-1 dark:bg-neutral-surface/20";

export function SearchResults({
  results,
  isLoading,
  searchTerm,
  onSelect,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div
        className={searchResultsContainer}
        data-testid="search-results-container"
      >
        <h4 className="px-3 py-4 text-sm font-semibold text-brand-primary">
          Searching docs...
        </h4>
      </div>
    );
  }

  if (results.length > 0) {
    return (
      <div
        className={searchResultsContainer}
        data-testid="search-results-container"
      >
        {results.map((result, index) => (
          <Link
            key={index}
            href={result.url}
            className="group block rounded-xl px-3 py-3 transition hover:bg-brand-primary/8"
            onClick={onSelect}
          >
            {result.sectionPath.length > 0 && (
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-text-secondary">
                {result.sectionPath.join(" / ")}
              </p>
            )}
            <h3 className="font-medium text-brand-primary group-hover:text-brand-primary-hover">
              {result.title}
            </h3>
            <p
              className="mt-1 text-sm text-neutral-text-secondary"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: For Highlighting the search term, it is important to use dangerouslySetInnerHTML
              dangerouslySetInnerHTML={{
                __html: result.excerpt || "",
              }}
            />
          </Link>
        ))}
      </div>
    );
  }

  if (searchTerm.length > 0) {
    return (
      <div
        className={searchResultsContainer}
        data-testid="search-results-container"
      >
        <div
          className="px-3 py-4 text-sm font-semibold text-neutral-text-secondary"
          data-testid="no-results-message"
        >
          No matching docs found.
        </div>
      </div>
    );
  }

  return null;
}
