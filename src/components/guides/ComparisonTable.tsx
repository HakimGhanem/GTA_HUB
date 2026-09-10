type Props = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export function ComparisonTable({ caption, headers, rows }: Props) {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        {caption ? (
          <caption className="border-b border-white/10 px-3 py-3 text-left text-xs uppercase tracking-wider text-white/45">
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr className="bg-white/[0.04]">
            {headers.map((header) => (
              <th
                key={header}
                className="px-3 py-2.5 text-left font-semibold text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-white/8">
              {row.map((cell, j) => (
                <td
                  key={`${i}-${j}`}
                  className={
                    j === 0
                      ? "px-3 py-2.5 font-medium text-white/85"
                      : "px-3 py-2.5 text-white/65"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
