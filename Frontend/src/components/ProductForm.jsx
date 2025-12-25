import { useEffect, useState } from "react";
import API from "../Api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", casNumber: "", unit: "KG" });

  const load = async () => {
    const res = await API.get("/products");
    setProducts(res.data.products);
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    await API.post("/products", form);
    load();
  };

  const remove = async (id) => {
    await API.delete(`/products/${id}`);
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chemical Products</h1>

      {/* Create */}
      <div className="flex gap-2 mb-4">
        <input placeholder="Name" className="border p-2" onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="CAS" className="border p-2" onChange={e=>setForm({...form,casNumber:e.target.value})}/>
        <select className="border p-2" onChange={e=>setForm({...form,unit:e.target.value})}>
          <option>KG</option>
          <option>MT</option>
          <option>Litre</option>
        </select>
        <button onClick={submit} className="bg-green-600 text-white px-4">
          Add
        </button>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>CAS</th>
            <th>Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border">
              <td>{p.name}</td>
              <td>{p.casNumber}</td>
              <td>{p.unit}</td>
              <td>
                <button onClick={()=>remove(p._id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
