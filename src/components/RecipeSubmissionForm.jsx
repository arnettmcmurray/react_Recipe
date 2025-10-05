import { useState } from "react";
import "./RecipeSubmissionForm.css";

function RecipeSubmissionForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    servings: "",
    difficulty: "",
    category: "",
    cuisine: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.ingredients];
    updated[index][name] = value;
    setFormData((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  const removeIngredient = (index) => {
    const updated = [...formData.ingredients];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, ingredients: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe submitted:", formData);
    alert("Recipe submitted successfully!");
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h2>Submit a New Recipe</h2>

      <label>Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Servings</label>
      <input
        type="number"
        name="servings"
        min="1"
        max="20"
        value={formData.servings}
        onChange={handleChange}
        required
      />

      <label>Difficulty</label>
      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        required
      >
        <option value="">Select difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <h3>Ingredients</h3>
      {formData.ingredients.map((ing, index) => (
        <div key={index} className="ingredient-row">
          <input
            type="text"
            name="name"
            placeholder="Ingredient"
            value={ing.name}
            onChange={(e) => handleIngredientChange(index, e)}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Qty"
            value={ing.quantity}
            onChange={(e) => handleIngredientChange(index, e)}
            required
          />
          <select
            name="unit"
            value={ing.unit}
            onChange={(e) => handleIngredientChange(index, e)}
            required
          >
            <option value="">Unit</option>
            <option value="cups">cups</option>
            <option value="tbsp">tablespoons</option>
            <option value="tsp">teaspoons</option>
            <option value="oz">ounces</option>
            <option value="lb">pounds</option>
            <option value="g">grams</option>
            <option value="pcs">pieces</option>
          </select>
          <button type="button" onClick={() => removeIngredient(index)}>
            
          </button>
        </div>
      ))}
      <button type="button" onClick={addIngredient}>
        ➕ Add Ingredient
      </button>

      <label>Recipe Image (URL)</label>
      <input
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
      />

      <button type="submit">Submit Recipe</button>
    </form>
  );
}

export default RecipeSubmissionForm;
