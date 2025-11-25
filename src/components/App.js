import React, { useState } from "react";


// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: true },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form() {
  const [description, setDescription] = useState("");   
  const [quantity, setQuantity] = useState(1);          
  function handleSubmit(e) {
    e.preventDefault();
    console.log("SUBMIT:", description, quantity);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <div>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add</button>
      </div>
    </form>
  );
}


function Item({ item }) {
  return (
    <li style={ item.packed ? { textDecoration: "line-through" } : {} }>
      {item.description} ({item.quantity})
    </li>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}



export default App;
