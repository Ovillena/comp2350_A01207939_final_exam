const database = include("/databaseConnection");

function getAllRecipes(callback) {
  let sqlQuery = "select recipe_id, name, description from recipe;";
  database.query(sqlQuery, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function addRecipe(postData, callback) {
  let sqlInsert =
    "INSERT INTO recipe (name, description) VALUES (:name, :description);";
  let params = {
    name: postData.name,
    description: postData.description,
  };
  console.log(sqlInsert);
  database.query(sqlInsert, params, (err, results, fields) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function deleteAllIngredients(recipeId, callback) {
  let sqlDeleteIngredient =
    "delete from ingredient where recipe_id = :recipeID";
  let Params = {
    recipeID: recipeId,
  };

  console.log(sqlDeleteIngredient);
  database.query(sqlDeleteIngredient, Params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function deleteOneIngredient(ingredient, callback) {
  let sqlDeleteIngredient =
    "delete from ingredient where recipe_id = :recipeID and details = :details and ingredienter_name= :ingredienterName and rating = :rating limit 1";
  let Params = {
    recipeID: ingredient.id,
    details: ingredient.ingredient,
    rating: ingredient.rating,
    //href="/deleteIngredient?id=<%= recipeID %>&ingredient=<%= recipe[i].details %>&ingredienterName=<%= recipe[i].ingredienter_name %>&rating=<%= recipe[i].rating %>"
  };

  console.log(sqlDeleteIngredient);
  database.query(sqlDeleteIngredient, Params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function deleteRecipe(recipeId, callback) {
  let sqlDeleteRecipe = "delete from recipe where recipe_id = :recipeID";
  let params = {
    recipeID: recipeId,
  };
  console.log(sqlDeleteRecipe);
  database.query(sqlDeleteRecipe, params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function showIngredients(recipeId, callback) {
  let sqlRecipeIngredients =
    "select rest.recipe_id, name, ingredient_id, ingredienter_name, details, rating from recipe as rest join ingredient as rev  on rest.recipe_id = rev.recipe_id where rest.recipe_id= :recipeID;";
  let params = {
    recipeID: recipeId,
  };
  console.log(sqlRecipeIngredients);
  database.query(sqlRecipeIngredients, params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

function addIngredient(postData, callback) {
  let sqlInsert =
    "INSERT INTO ingredient (recipe_id, ingredienter_name, details, rating) VALUES (:recipeID ,:ingredienterName, :details, :rating);";
  let params = {
    recipeID: postData.id,
    ingredienterName: postData.name,
    details: postData.ingredient,
  };
  console.log(sqlInsert);
  database.query(sqlInsert, params, (err, results, fields) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
}

module.exports = {
  getAllRecipes,
  addRecipe,
  deleteAllIngredients,
  deleteRecipe,
  showIngredients,
  addIngredient,
  deleteOneIngredient,
};
