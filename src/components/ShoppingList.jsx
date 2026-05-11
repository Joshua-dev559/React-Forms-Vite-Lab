import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [itemsList, setItemsList] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  // THIS is what fixes the failing test
  function handleAddItem(newItem) {
    setItemsList(prevItems => [...prevItems, newItem]);
  }

  const filteredItems = itemsList
    .filter(item =>
      selectedCategory === "All"
        ? true
        : item.category === selectedCategory
    )
    .filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleAddItem} />

      <Filter
        search={search}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />

      <ul className="Items">
        {filteredItems.map(item => (
          <Item
            key={item.id}
            name={item.name}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;