import { TinaMarkdown } from "tinacms/dist/rich-text";
import DocsMDXComponentRenderer from "../markdown-component-mapping";

export const Table = (props) => {
  // Navigate through the nested structure to find the actual table content
  const tableRows = props?.children?.props?.children || [];
  const rowCount = tableRows.length;

  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-neutral-border-subtle bg-neutral-background-secondary/50 shadow-sm">
      <table className="min-w-full table-auto text-sm leading-6">
        <tbody>
          {tableRows.map((row, rowIndex) => {
            // Each row has its own props.children array containing cells
            const cells = row?.props?.children || [];
            const CellComponent = rowIndex === 0 ? "th" : "td";

            return (
              <tr
                key={`row-${rowIndex}`}
                className={
                  rowIndex === 0
                    ? "bg-neutral-surface"
                    : "bg-neutral-background-secondary/35"
                }
              >
                {cells.map((cell, cellIndex) => {
                  return (
                    <CellComponent
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className={`align-top px-4 py-3 ${
                        rowIndex === 0
                          ? "border-b border-neutral-border text-left font-tuner text-brand-primary-text"
                          : ""
                      } ${cellIndex === 0 ? "max-w-xs break-words" : ""}
                      ${
                        rowIndex === 0 || rowIndex === rowCount - 1
                          ? ""
                          : "border-b border-neutral-border"
                      }
                      `}
                    >
                      {cell?.props?.children}
                      <TinaMarkdown
                        content={cell?.props?.content as any}
                        components={DocsMDXComponentRenderer}
                      />
                    </CellComponent>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
