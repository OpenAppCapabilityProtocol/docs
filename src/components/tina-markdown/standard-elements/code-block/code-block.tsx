import { useEffect, useState } from "react";
import "./code-block.css";
import { useTheme } from "next-themes";
import { FaCheck } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { CodeBlockSkeleton } from "./code-block-skeleton";
import { shikiSingleton } from "./shiki-singleton";

export function CodeBlock({
  value,
  lang = "ts",
  showCopyButton = true,
  showBorder = true,
  setIsTransitioning,
}: {
  value: string;
  lang?: string;
  showCopyButton?: boolean;
  showBorder?: boolean;
  setIsTransitioning?: (isTransitioning: boolean) => void;
}) {
  const [html, setHtml] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setIsLoading(true);

      // Guard clause to prevent processing undefined/null/empty values - shiki will throw an error if the value is not a string as it tries to .split all values
      if (!value || typeof value !== "string") {
        if (isMounted) {
          setHtml("");
          setIsLoading(false);
        }
        return;
      }

      try {
        const code = await shikiSingleton.codeToHtml(value, lang, isDarkMode);

        if (isMounted) {
          setHtml(code);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          // Fallback to plain text if highlighting fails
          setHtml(`<pre><code>${value}</code></pre>`);
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [value, lang, isDarkMode]);

  useEffect(() => {
    if (setIsTransitioning && html !== "") {
      // Increase timeout to 200ms for smoother transitions, especially on slower devices.
      setTimeout(() => setIsTransitioning(false), 200);
    }
  }, [html, setIsTransitioning]);

  // Show skeleton while loading
  if (isLoading && showCopyButton) {
    return <CodeBlockSkeleton />;
  }

  return (
    <div className="my-4 w-full">
      <div
        className={`code-block-frame overflow-hidden bg-neutral-background-secondary/80 ${
          showBorder
            ? "rounded-xl border border-neutral-border-subtle shadow-sm"
            : "rounded-b-xl"
        }`}
      >
        {showCopyButton && (
          <div className="flex items-center justify-between border-b border-neutral-border-subtle px-4 py-2">
            <span className="rounded-full bg-neutral-surface px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-text-secondary">
              {lang}
            </span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(value);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 1000);
              }}
              className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-neutral-text-secondary transition hover:bg-neutral-surface hover:text-neutral-text"
            >
              {isCopied ? <FaCheck size={12} /> : <MdOutlineContentCopy />}
              <span>{isCopied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        )}
        <div
          className="code-block-content overflow-x-auto px-4 py-4 text-[13px] leading-6 sm:text-sm"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is trusted and already escaped for XSS safety.
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
