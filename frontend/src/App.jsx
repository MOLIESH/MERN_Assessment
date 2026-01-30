import DataTable from "./components/DataTable";

const App = () => {
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "name" },
    { label: "Price", accessor: "price" },
  ];

  const data = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headset", price: 2000 },
  ];

  return (
    <div>
      <h2>Products Table</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default App;
