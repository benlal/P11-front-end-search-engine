function recipeFactory(data) {
  const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;

  // recipe card template
  function getRecipeCardDOM() {
    const article = document.createElement('article');
    article.classList.add('card', 'border-0');
    const img = document.createElement('img');
    img.classList.add('card-picture', 'rounded-top');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'grey-background', 'rounded-bottom');
    const titleRow = document.createElement('div');
    titleRow.classList.add('row');
    const titleCol = document.createElement('div');
    titleCol.classList.add('col-8');
    const recipeTitle = document.createElement('h4');
    recipeTitle.textContent = `${name}`;
    recipeTitle.classList.add('recipe_title');
    const timeCol = document.createElement('div');
    timeCol.classList.add('col', 'prep-time');
    const recipeTime = document.createElement('h5');
    const timeIcon = document.createElement('i');
    timeIcon.classList.add('fa-regular', 'fa-clock');
    recipeTime.textContent = `${time} min`;
    const contentRow = document.createElement('div');
    contentRow.classList.add('row');
    const ingredientsCol = document.createElement('div');
    ingredientsCol.classList.add('col');
    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('ingredients_list');
    const recipeCol = document.createElement('div');
    recipeCol.classList.add('col');
    const recipeText = document.createElement('p');
    recipeText.textContent = `${description}`;
    recipeText.classList.add('recipe_description');

    article.appendChild(img);
    article.appendChild(cardBody);
    cardBody.appendChild(titleRow);
    titleRow.appendChild(titleCol);
    titleCol.appendChild(recipeTitle);
    titleRow.appendChild(timeCol);
    timeCol.appendChild(timeIcon);
    timeCol.appendChild(recipeTime);
    cardBody.appendChild(contentRow);
    contentRow.appendChild(ingredientsCol);
    ingredientsCol.appendChild(ingredientsList);



    ingredients.forEach((ingredient) => {
      const ingredientItem = document.createElement('li');
      ingredientItem.innerHTML = `<b>${ingredient.name} ${ingredient.quantity ? ':' : ''}</b> ${ingredient.quantity ?? ''} ${ingredient.unit ?? ''}`;
      ingredientsList.appendChild(ingredientItem);
    })


    contentRow.appendChild(recipeCol);
    recipeCol.appendChild(recipeText);

    return (article);
  }



  return { id, name, servings, ingredients, time, description, appliance, ustensils, getRecipeCardDOM }
}
