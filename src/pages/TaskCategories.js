import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/navbar/Sidebar";
import { userStore } from "../stores/UserStore";
import { taskStore } from "../stores/TaskStore";
import { useNavigate } from "react-router-dom";
import "../index.css";

const TaskCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryIdToRemove, setCategoryIdToRemove] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    // Fetch categories when component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/project3-backend/rest/tasks/category/all',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            token: sessionStorage.getItem('token'),
          },
        }
      );
      if (response.ok) {
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } else {
        throw new Error(`Failed to fetch categories: ${response.text()}`);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleEditCategory = async (categoryId, newName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/project3-backend/rest/tasks/category/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            token: sessionStorage.getItem('token'),
          },
          body: JSON.stringify({ id: categoryId, name: newName }),
        }
      );
      if (response.ok) {
        alert('Category updated successfully');
        fetchCategories();
      } else {
        throw new Error(`Failed to update category: ${response.text()}`);
      }
    } catch (error) {
      console.error('Error editing category:', error);
      alert('Error editing category');
    }
  };

  const handleRemoveCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/project3-backend/rest/tasks/category/remove`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            token: sessionStorage.getItem('token'),
          },
          body: JSON.stringify({ id: categoryIdToRemove }),
        }
      );
      if (response.ok) {
        alert('Category removed successfully');
        fetchCategories();
      } else {
        throw new Error(`Failed to remove category: ${response.text()}`);
      }
    } catch (error) {
      console.error('Error removing category:', error);
      alert('Error removing category');
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/project3-backend/rest/tasks/category/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            token: sessionStorage.getItem('token'),
          },
          body: JSON.stringify({ name: newCategoryName }),
        }
      );
      if (response.ok) {
        alert('Category added successfully');
        fetchCategories();
      } else {
        throw new Error(`Failed to add category: ${response.text()}`);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category');
    }
  };

  const handleCategoryNameDoubleClick = (categoryId) => {
    setEditingCategory(categoryId);
  };

  return (
    <div className="container" id="categories-outer-container">
      <Header />
      <Sidebar
        pageWrapId={"categories-page-wrap"}
        outerContainerId={"categories-outer-container"}
      />
      <aside>
        <button onClick={() => handleAddCategory()}>Add Category</button>
        <button onClick={() => handleRemoveCategory()}>Remove Category</button>
      </aside>
      <main>
        <table className="table-category-tasks">
          <thead className="table-header-category-tasks">
            <tr>
              <th className="table-header-category">Id</th>
              <th className="table-header-category">Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td
                  className="clickable text-center"
                  onDoubleClick={() => handleCategoryNameDoubleClick(category.id)}
                >
                  {editingCategory === category.id ? (
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) => handleEditCategory(category.id, e.target.value)}
                      onBlur={() => setEditingCategory(null)}
                    />
                  ) : (
                    category.name
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default TaskCategories;
