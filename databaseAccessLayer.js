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
    "delete from ingredient where recipe_id = :recipeID and description = :description and ingredienter_name= :ingredienterName and rating = :rating limit 1";
  let Params = {
    recipeID: ingredient.id,
    description: ingredient.ingredient,
    rating: ingredient.rating,
    //href="/deleteIngredient?id=<%= recipeID %>&ingredient=<%= recipe[i].description %>&ingredienterName=<%= recipe[i].ingredienter_name %>&rating=<%= recipe[i].rating %>"
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
    "select r.recipe_id, name, ingredient_id, ingredienter_name, description from recipe as r join ingredient as i  on r.recipe_id = i.recipe_id where r.recipe_id= :recipeID;";
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
    "INSERT INTO ingredient (recipe_id, ingredienter_name, description, rating) VALUES (:recipeID ,:ingredienterName, :description, :rating);";
  let params = {
    recipeID: postData.id,
    ingredienterName: postData.name,
    description: postData.ingredient,
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
