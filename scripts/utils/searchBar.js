import { displayData } from "../pages/index.js";
import { recipes } from "../../data/recipes.js";


function handleSearchBarEvents() {
    var input = document.querySelector('.search-bar_input');
    const recipesSection = document.querySelector('.recipes_section');
    function formatTextForFilter(text) {
        return text.trim().toLowerCase();
    }

    input.addEventListener('input', function () {
        const filter = formatTextForFilter(input.value).replace(/( )+/g, " ");
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
            }
            )
            displayData(filteredRecipes);
            console.log(filteredRecipes);
        }
        else {
            recipesSection.innerHTML = '';
            displayData(recipes);
        }
    });
}



//opens list of filters
function setEventsToArrows() {
    let arrows = document.getElementsByClassName("fa-angle-down");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener('click', function () {
            displayList();
            ingredientsCompiling();
        });
    }
}

function displayList() {
    const filterButton = document.querySelector(".filter-button");
    const filterTitle = document.querySelector(".filter-title");
    const filterSearchbar = document.querySelector(".filter-searchbar");
    const sortArrow = document.querySelector(".fa-angle-down");
    const filterList = document.querySelector(".filter-list");

    //checks if list is closed the opens it
    if (filterButton.classList.contains("closed-button")) {
        filterButton.classList.remove("closed-button");
        filterSearchbar.classList.remove("hidden");
        filterTitle.classList.add("hidden");
        filterList.classList.remove("hidden");
        sortArrow.style.transform = 'rotate(180deg)';
    }
    else {
        closeList();
    }
}


//closes list of filters
function closeList() {
    const filterButton = document.querySelector(".filter-button");
    const filterTitle = document.querySelector(".filter-title");
    const filterSearchbar = document.querySelector(".filter-searchbar");
    const sortArrow = document.querySelector(".fa-angle-down");
    const filterList = document.querySelector(".filter-list");


    filterButton.classList.add("closed-button");
    filterSearchbar.classList.add("hidden");
    filterTitle.classList.remove("hidden");
    filterList.classList.add("hidden");
    sortArrow.style.transform = 'rotate(0deg)';
}

function ingredientsCompiling() {
    let compiledIngredients;
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            compiledIngredients.push(ingredient);
        })
    })
}


function init() {
    handleSearchBarEvents();
    setEventsToArrows();
}

init()