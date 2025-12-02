import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: true },
  { id: 2, description: "Pants", quantity: 2, packed: true },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItem(newItem);
    setDescription("");
    setQuantity();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <div>
        <input
          type="number"
          min="1"
          value={quantity}
          placeholder="How many?"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

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

function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={(e) => onUpdateItem(item.id, e.target.checked)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} ({item.quantity})
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}


function PackingList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  const total = items.length;
  const packed = items.filter((item) => item.packed).length;
  const percent = total === 0 ? 0 : Math.round((packed / total) * 100);

  return (
    <footer className="stats">
      <em>
        {percent === 100
          ? "You got everything! "
          : `You have ${total} items in the list. You already packed ${packed} (${percent}%).`}
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(newItem) {
  const existing = items.find(
    (item) => item.description.toLowerCase() === newItem.description.toLowerCase()
  );
  if (existing) {
    setItems(
      items.map((item) =>
        item.id === existing.id
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      )
    );
  } else {
    setItems([...items, newItem]);
  }
}


  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id, packed) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
