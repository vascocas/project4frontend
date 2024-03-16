import React, { useState } from "react";
import { taskStore } from "../../stores/TaskStore";

const CategoriesFilter = ({ onFilter }) => {
  const { categories } = taskStore();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilter = () => {
    if (selectedCategory) {
      // Call the onFilter function with the selected category
      onFilter(selectedCategory);
       // Reset the selectedUser state to clear the dropdown menu
       setSelectedCategory("");
    }
  };

  return (
    <div>
      <label htmlFor="category">Tasks by Category: </label>
      <br></br>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default CategoriesFilter;
