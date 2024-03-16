import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/navbar/Sidebar";
import { userStore } from "../stores/UserStore";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "./TaskCategories.css";

const TaskCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState(null); 
  const { token } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories when component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/project4vc/rest/tasks/categories',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            token: token,
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
    setEditedCategoryName(null);
    try {
      const response = await fetch(
        `http://localhost:8080/project4vc/rest/tasks/category`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            token: token,
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



  const handleRemoveCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/project4vc/rest/tasks/category`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            token: token,
          },
          body: JSON.stringify({ id: categoryId }),
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
      alert('Category with associated tasks');
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/project4vc/rest/tasks/category`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            token: token,
          },
          body: JSON.stringify({ name: newCategoryName }),
        }
      );
      if (response.ok) {
        alert('Category added successfully');
        fetchCategories();
        setNewCategoryName('');
      } else {
        throw new Error(`Failed to add category: ${response.text()}`);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category');
    }
  };

  const handleEditCategoryName = (categoryId, categoryName) => {
    setEditingCategory(categoryId);
    setEditedCategoryName(categoryName);
  };

  const handleSaveEdit = (categoryId, editedName) => {
    handleEditCategory(categoryId, editedName);
    setEditingCategory(null);
  };

  

  return (
    <div className="container" id="categories-outer-container">
      <Header />
      <Sidebar
        pageWrapId={"categories-page-wrap"}
        outerContainerId={"categories-outer-container"}
      />
      <main>
        <table className="table-category-tasks">
          <thead className="table-header-category-tasks">
            <tr>
              <th className="table-header-category">Id</th>
              <th className="table-header-category">Name</th>
              <th className="table-header-category">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td
                  className="clickable text-center"
                  onDoubleClick={() => handleEditCategoryName(category.id, category.name)}
                >
                  {editingCategory === category.id ? (
                    <input
                      type="text"
                      value={editedCategoryName || category.name}
                      onChange={(e) => setEditedCategoryName(e.target.value)}
                      onBlur={() => handleSaveEdit(category.id, editedCategoryName)}
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td>
                  <button onClick={() => handleRemoveCategory(category.id)}>Remove Category</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="save-category-container">
        {editingCategory && (<button onClick={() => handleSaveEdit(editingCategory, editedCategoryName)}> Save</button> )}
        </div>
        <div className="input-category-container">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <div className="homeMenu-button-container">
        <button onClick={() => navigate("/Home")}>Back to Scrum Board</button>
      </div>
      </main>
    </div>
  );
};


export default TaskCategories;