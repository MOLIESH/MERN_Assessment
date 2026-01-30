import { useState } from "react";

const DataTable = ({ columns, data }) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;

    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                onClick={() => handleSort(col.accessor)}
                style={{ cursor: "pointer" }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.accessor}>{row[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
