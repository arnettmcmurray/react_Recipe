import { useState } from "react";
import "./RecipeSubmissionForm.css";

function RecipeSubmissionForm() {
  // === form data and errors ===
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
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  // === field updates ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // === ingredient updates ===
  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...formData.ingredients];
    list[index][name] = value;
    setFormData((prev) => ({ ...prev, ingredients: list }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  const removeIngredient = (index) => {
    const list = [...formData.ingredients];
    list.splice(index, 1);
    setFormData((prev) => ({ ...prev, ingredients: list }));
  };

  // === inline validation ===
  const validate = () => {
    const err = {};
    if (formData.title.trim().length < 3)
      err.title = "Title must be at least 3 characters.";
    if (formData.description.trim().length < 10)
      err.description = "Description too short.";
    if (!formData.servings || formData.servings < 1 || formData.servings > 20)
      err.servings = "Servings must be 1–20.";
    if (!formData.difficulty) err.difficulty = "Select difficulty.";
    if (!formData.category) err.category = "Select category.";
    if (!formData.cuisine) err.cuisine = "Select cuisine.";
    formData.ingredients.forEach((ing, i) => {
      if (!ing.name.trim()) err[`ingredient-${i}`] = "Missing ingredient name.";
      if (!ing.quantity) err[`quantity-${i}`] = "Missing quantity.";
      if (!ing.unit) err[`unit-${i}`] = "Select unit.";
    });
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // === handle submit ===
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(formData);
      // reset
      setFormData({
        title: "",
        description: "",
        servings: "",
        difficulty: "",
        category: "",
        cuisine: "",
        ingredients: [{ name: "", quantity: "", unit: "" }],
        image: "",
      });
      setErrors({});
    }
  };

  return (
    <div>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h2>Submit a New Recipe</h2>

        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe title"
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write something about this recipe"
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <label>Servings</label>
        <input
          type="number"
          name="servings"
          min="1"
          max="20"
          value={formData.servings}
          onChange={handleChange}
        />
        {errors.servings && <p className="error">{errors.servings}</p>}

        <label>Difficulty</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="">Select difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        {errors.difficulty && <p className="error">{errors.difficulty}</p>}

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Side Dish">Side Dish</option>
          <option value="Beverage">Beverage</option>
        </select>
        {errors.category && <p className="error">{errors.category}</p>}

        <label>Cuisine</label>
        <select name="cuisine" value={formData.cuisine} onChange={handleChange}>
          <option value="">Select cuisine</option>
          <option value="American">American</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Asian">Asian</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Other">Other</option>
        </select>
        {errors.cuisine && <p className="error">{errors.cuisine}</p>}

        <h3>Ingredients</h3>
        {formData.ingredients.map((ing, i) => (
          <div key={i} className="ingredient-row">
            <input
              name="name"
              placeholder="Name"
              value={ing.name}
              onChange={(e) => handleIngredientChange(i, e)}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Qty"
              value={ing.quantity}
              onChange={(e) => handleIngredientChange(i, e)}
            />
            <select
              name="unit"
              value={ing.unit}
              onChange={(e) => handleIngredientChange(i, e)}
            >
              <option value="">Unit</option>
              <option value="cups">cups</option>
              <option value="tbsp">tbsp</option>
              <option value="tsp">tsp</option>
              <option value="oz">oz</option>
              <option value="lb">lb</option>
              <option value="g">g</option>
              <option value="pcs">pcs</option>
            </select>
            <button type="button" onClick={() => removeIngredient(i)}></button>
          </div>
        ))}
        {errors.ingredients && <p className="error">{errors.ingredients}</p>}

        <button type="button" onClick={addIngredient}>
          ➕ Add Ingredient
        </button>

        <label>Image URL</label>
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/recipe.jpg"
        />

        <button type="submit">Submit Recipe</button>
      </form>

      {submitted && (
        <div className="recipe-summary">
          <h3>{submitted.title}</h3>
          {submitted.image && (
            <img
              src={submitted.image}
              alt={submitted.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            />
          )}
          <p>
            <strong>Servings:</strong> {submitted.servings}
          </p>
          <p>
            <strong>Difficulty:</strong> {submitted.difficulty}
          </p>
          <p>
            <strong>Category:</strong> {submitted.category}
          </p>
          <p>
            <strong>Cuisine:</strong> {submitted.cuisine}
          </p>
          <p>
            <strong>Description:</strong> {submitted.description}
          </p>
          <h4>Ingredients</h4>
          <ul>
            {submitted.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.quantity} {ing.unit} {ing.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeSubmissionForm;
