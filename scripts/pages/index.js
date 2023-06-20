import { recipes } from "../../data/recipes.js";

export function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes_section");
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
    let recipesString = JSON.stringify(recipes);
    localStorage.setItem("displayedRecipes", recipesString);
}

function init() {
    displayData(recipes);
}

init()