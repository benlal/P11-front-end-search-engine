import { displayData } from "../pages/index.js";
import { recipes } from "../../data/recipes.js";

function formatTextForFilter(text) {
    return text.trim().toLowerCase();
}

function getDisplayedRecipes() {
    let recipesString = localStorage.getItem("displayedRecipes");
    let localRecipes = JSON.parse(recipesString);
    return localRecipes;
}

document.querySelector(".search-bar_input").addEventListener('input', function () {
    getFilteredRecipes();
});

function getFilteredRecipes() {

    let localRecipes = getDisplayedRecipes();
    console.log(localRecipes);

    var searchBarinput = document.querySelector('.search-bar_input');
    const recipesSection = document.querySelector('.recipes_section');
    const filter = formatTextForFilter(searchBarinput.value).replace(/( )+/g, " ");

    if (filter.length > 2) {
        recipesSection.innerHTML = '';
        const filteredRecipes = [];
        recipes.forEach((recipe) => {
            if (formatTextForFilter(recipe.name).includes(filter)) {
                filteredRecipes.push(recipe);
            }
            else if (formatTextForFilter(recipe.description).includes(filter)) {
                filteredRecipes.push(recipe);
            }
            else if (formatTextForFilter(recipe.appliance).includes(filter)) {
                filteredRecipes.push(recipe);
            }
            else {
                recipe.ingredients.forEach((ingredient) => {
                    if (formatTextForFilter(ingredient.name).includes(filter)) {
                        filteredRecipes.push(recipe);
                    }
                })
                recipe.ustensils.forEach((ustensil) => {
                    if (formatTextForFilter(ustensil).includes(filter)) {
                        filteredRecipes.push(recipe);
                    }
                })
            }
        })
        displayData(filteredRecipes);
    }

    else {
        recipesSection.innerHTML = '';
        displayData(recipes);
    }
}


function ingredientsCompiling(localRecipes) {
    const compiledIngredients = [];
    localRecipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            if (compiledIngredients.includes(ingredient.name) == false) {
                compiledIngredients.push(ingredient.name);
            }
        })
    })
    compiledIngredients.sort();
    return compiledIngredients;
}

function displayIngredientsList(compiledIngredients) {
    const filterList = document.querySelector('.filter-list');
    compiledIngredients.forEach((ingredient) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${ingredient}`;
        filterList.appendChild(listItem);
    })
    if (compiledIngredients.length > 10) {
        filterList.classList.add("column-3");
    }
}

//opens list of filters
function setEventsToArrows() {
    let arrows = document.getElementsByClassName("fa-angle-down");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener('click', function (event) {
            displayList(event.target);
        });
    }
}

function displayList(targetedButton) {
    const sortArrow = targetedButton;
    const filterButton = sortArrow.closest(".filter-button");
    const filterTitle = filterButton.querySelector(".filter-title");
    const filterSearchbar = filterButton.querySelector(".filter-searchbar");
    const filterList = filterButton.querySelector(".filter-list");

    //checks if list is closed the opens it
    if (filterButton.classList.contains("closed-button")) {
        filterButton.classList.remove("closed-button");
        filterSearchbar.classList.remove("hidden");
        filterTitle.classList.add("hidden");
        filterList.classList.remove("hidden");
        sortArrow.style.transform = 'rotate(180deg)';
    }
    else {
        closeList(targetedButton);
    }
}

//closes list of filters
function closeList(targetedButton) {
    const sortArrow = targetedButton;
    const filterButton = sortArrow.closest(".filter-button");
    const filterTitle = filterButton.querySelector(".filter-title");
    const filterSearchbar = filterButton.querySelector(".filter-searchbar");
    const filterList = filterButton.querySelector(".filter-list");

    filterButton.classList.add("closed-button");
    filterSearchbar.classList.add("hidden");
    filterTitle.classList.remove("hidden");
    filterList.classList.add("hidden");
    sortArrow.style.transform = 'rotate(0deg)';
}



function init() {
    getDisplayedRecipes();

    setEventsToArrows();

    ingredientsCompiling(recipes);
    const compiledIngredients = ingredientsCompiling(recipes);
    displayIngredientsList(compiledIngredients);

}

init()