import { displayData } from "../pages/index.js";
import { recipes } from "../../data/recipes.js";

const tagFilters = [];

function formatTextForFilter(text) {
    return text.trim().toLowerCase();
}

async function getDisplayedRecipes() {
    let recipesString = localStorage.getItem("displayedRecipes");
    let localRecipes = JSON.parse(recipesString);
    return localRecipes;
}

document.querySelector(".search-bar_input").addEventListener('input', async function () {
    let localRecipes = await getDisplayedRecipes();
    getFilteredRecipes(localRecipes);
});

function ingredientsFilterListUpdate(localRecipes) {
    let ingredientsList = document.querySelector('.ingredients-list');
    ingredientsList.textContent = '';
    const compiledIngredients = ingredientsCompiling(localRecipes);
    displayIngredientsList(compiledIngredients);
}

async function getFilteredRecipes(localRecipes) {
    var searchBarinput = document.querySelector('.search-bar_input');
    const recipesSection = document.querySelector('.recipes_section');
    const filter = formatTextForFilter(searchBarinput.value).replace(/( )+/g, " ");
    if (filter.length > 2 || tagFilters.length != 0) {
        recipesSection.innerHTML = '';
        // const filteredRecipes = [];
        // localRecipes.forEach((recipe) => {
        //     if (filter != "" && (formatTextForFilter(recipe.name).includes(filter) || formatTextForFilter(recipe.description).includes(filter) || formatTextForFilter(recipe.appliance).includes(filter))) {
        //         filteredRecipes.push(recipe);
        //     } else {
        //         recipe.ingredients.forEach((ingredient) => {
        //             if (formatTextForFilter(ingredient.name).includes(filter) || tagFilters.includes(formatTextForFilter(ingredient.name))) {
        //                 filteredRecipes.push(recipe);
        //             }
        //         })
        //         recipe.ustensils.forEach((ustensil) => {
        //             if (formatTextForFilter(ustensil).includes(filter)) {
        //                 filteredRecipes.push(recipe);
        //             }
        //         })
        //     }
        // })

        let filteredRecipes = localRecipes.filter((recipe) => {
            if (filter != "" && (formatTextForFilter(recipe.name).includes(filter) || formatTextForFilter(recipe.description).includes(filter) || formatTextForFilter(recipe.appliance).includes(filter))) {
                return true;
            } else {
                return false;
            }
        });
        
        

        displayData(filteredRecipes);
        localStorage.setItem("displayedRecipes", JSON.stringify(filteredRecipes));
        console.log(localRecipes);
        ingredientsFilterListUpdate(filteredRecipes);
    }

    else {
        recipesSection.innerHTML = '';
        displayData(recipes);
        localStorage.setItem("displayedRecipes", JSON.stringify(recipes));
        ingredientsFilterListUpdate(recipes);
    }
}

document.querySelector(".filter-searchbar").addEventListener('input', async function () {
    let localRecipes = await getDisplayedRecipes();
    let compiledIngredients = ingredientsCompiling(localRecipes);
    getFilteredIngredientsList(compiledIngredients);
});

function getFilteredIngredientsList(compiledIngredients) {
    var filterSearchbar = document.querySelector('.filter-searchbar');
    const ingredientsList = document.querySelector('.ingredients-list');
    const filter = formatTextForFilter(filterSearchbar.value).replace(/( )+/g, " ");
    if (filter.length > 2) {
        ingredientsList.innerHTML = '';
        const filteredIngredients = [];
        compiledIngredients.forEach((ingredient) => {
            if (formatTextForFilter(ingredient).includes(filter)) {
                filteredIngredients.push(ingredient);
            }
        })
        displayIngredientsList(filteredIngredients);
    }
    else {
        ingredientsList.innerHTML = '';
        displayIngredientsList(compiledIngredients);
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
        listItem.classList.add('pointer');
        listItem.addEventListener('click', function (event) {
            tagCreator(event);
        });
        filterList.appendChild(listItem);
    })
    if (compiledIngredients.length < 10) {
        filterList.classList.remove("column-2", "column-3");
    } else if (compiledIngredients.length < 20) {
        filterList.classList.remove("column-3");
        filterList.classList.add("column-2");
    } else {
        filterList.classList.remove("column-2");
        filterList.classList.add("column-3");
    }
}

async function tagCreator(event) {
    let tagName = event.target.textContent;
    let tagFilter = formatTextForFilter(event.target.textContent).replace(/( )+/g, " ");
    const tagSection = document.querySelector('#tag-section');
    const tagItem = document.createElement('span');
    const xMarkIcon = document.createElement('i');
    xMarkIcon.classList.add('fa-sharp', 'fa-regular', 'fa-circle-xmark', 'pointer');
    tagFilters.push(tagFilter);
    let localRecipes = await getDisplayedRecipes();
    getFilteredRecipes(localRecipes);
    tagItem.innerHTML = `${tagName}`;
    tagSection.appendChild(tagItem);
    tagItem.appendChild(xMarkIcon);
    tagItem.classList.add('tag');
    xMarkIcon.addEventListener('click', function (event) {
        for (var i = 0; i < tagFilters.length; i++) {
            if (tagFilters[i] === tagFilter) {
                tagFilters.splice(i, 1);
            }
        }
        let targetedTag = event.target.closest(".tag");
        targetedTag.remove();
        getFilteredRecipes(localRecipes);
    });
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

async function init() {
    let localRecipes = await getDisplayedRecipes();
    setEventsToArrows();
    ingredientsFilterListUpdate(localRecipes);
}

init()