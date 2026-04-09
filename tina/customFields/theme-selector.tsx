import React, { type FC } from "react";
import { wrapFieldsWithMeta } from "tinacms";

// Theme definitions with their color palettes
const themes = [
  {
    value: "pine",
    label: "Pine",
    description: "Natural green tones across the full docs site",
    colors: {
      primary: "#30A46C",
      secondary: "#5bb98c",
      accent: "#c4e8d1",
    },
  },
  {
    value: "hark",
    label: "Hark",
    description: "Hark green primary with OACP orange accents",
    colors: {
      primary: "#30A46C",
      secondary: "#e9a215",
      accent: "#f8ddad",
    },
  },
];

interface ThemeOptionProps {
  theme: {
    value: string;
    label: string;
    description: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  isSelected: boolean;
  onClick: () => void;
}

const ThemeOption: FC<ThemeOptionProps> = ({ theme, isSelected, onClick }) => {
  return (
    <div
      className={`
        relative p-4 rounded-lg border cursor-pointer transition-all duration-200 bg-white max-w-sm hover:shadow-md
        ${
          isSelected
            ? "border-brand-primary shadow-md"
            : "border-neutral-border-subtle hover:border-neutral-border shadow-sm"
        }
      `}
      onClick={onClick}
    >
      {/* Color palette preview */}
      <div className="flex space-x-2 mb-3">
        <div
          className="w-6 h-6 rounded-full border border-neutral-border-subtle shadow-sm"
          style={{ backgroundColor: theme.colors.primary }}
          title={`Primary: ${theme.colors.primary}`}
        />
        <div
          className="w-6 h-6 rounded-full border border-neutral-border-subtle shadow-sm"
          style={{ backgroundColor: theme.colors.secondary }}
          title={`Secondary: ${theme.colors.secondary}`}
        />
        <div
          className="w-6 h-6 rounded-full border border-neutral-border-subtle shadow-sm"
          style={{ backgroundColor: theme.colors.accent }}
          title={`Accent: ${theme.colors.accent}`}
        />
      </div>

      {/* Theme info */}
      <div>
        <div className="font-semibold text-neutral-text mb-1">
          {theme.label}
        </div>
        <div className="text-sm text-neutral-text-secondary">
          {theme.description}
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export const ThemeSelector = wrapFieldsWithMeta(({ input, field }) => {
  const currentValue = input.value || "pine";

  const handleThemeChange = (themeValue: string) => {
    input.onChange(themeValue);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {themes.map((theme, index) => (
          <ThemeOption
            key={`theme-${theme.value}-${index}`}
            theme={theme}
            isSelected={currentValue === theme.value}
            onClick={() => handleThemeChange(theme.value)}
          />
        ))}
      </div>

      {/* Current selection display */}
      <div className="mt-4 p-3 bg-neutral-background-secondary rounded-md">
        <div className="text-sm text-neutral-text-secondary">
          Current theme:{" "}
          <span className="font-semibold text-neutral-text">
            {themes.find((t) => t.value === currentValue)?.label ||
              currentValue}
          </span>
        </div>
      </div>
      {/* Instructions for custom themes */}
      <div className="mb-6 p-4 bg-neutral-background-secondary border border-neutral-border rounded-lg text-wrap">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-brand-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-text mb-1">
              Want to tweak these themes?
            </h3>
            <p className="text-sm text-neutral-text-secondary mb-2">
              Keep the public site on `pine` or `hark`. If you need to adjust
              either one, update the theme tokens in the files below.
            </p>
            <div className="text-xs text-neutral-text-secondary">
              <strong>Files to modify:</strong>{" "}
              <code className="bg-neutral-surface px-1 rounded">
                src/styles/global.css
              </code>
              ,
              <code className="bg-neutral-surface px-1 rounded">
                tina/customFields/theme-selector.tsx
              </code>
              , and
              <code className="bg-neutral-surface px-1 rounded">
                src/components/ui/theme-selector.tsx
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
