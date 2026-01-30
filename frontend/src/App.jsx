import DataTable from "./components/DataTable";

function App() {
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "name" },
    { label: "Price", accessor: "price" },
  ];

  const data = [
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 },
    { id: 4, name: "Keyboard", price: 1500 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task 1: Reusable Table Component</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default App;


