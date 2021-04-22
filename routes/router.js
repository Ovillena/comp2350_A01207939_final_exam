const router = require("express").Router();
const database = include("databaseConnection");
const dbModel = include("databaseAccessLayer");
//const dbModel = include('staticData');

router.get("/", (req, res) => {
  console.log("page hit");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      dbModel.getAllRecipes((err, result) => {
        if (err) {
          res.render("error", { message: "Error reading from MySQL" });
          console.log("Error reading from mysql");
          console.log(err);
        } else {
          //success
          res.render("index", { allRecipes: result });

          //Output the results of the query to the Heroku Logs
          console.log(result);
        }
      });
      dbConnection.release();
    }
  });
});

router.post("/addRecipe", (req, res) => {
  console.log("form submit");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      console.log(req.body);
      dbModel.addRecipe(req.body, (err, result) => {
        if (err) {
          res.render("error", { message: "Error writing to MySQL" });
          console.log("Error writing to mysql");
          console.log(err);
        } else {
          //success
          res.redirect("/");

          //Output the results of the query to the Heroku Logs
          console.log(result);
        }
      });

      dbConnection.release();
    }
  });
});

router.get("/deleteRecipe", (req, res) => {
  console.log("delete recipe");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      console.log(req.query);

      let recipeId = req.query.id;
      if (recipeId) {
        //delete from person_skill where person_id = :person_id;
        dbModel.deleteAllIngredients(recipeId, (err, result) => {
          if (err) {
            res.render("error", { message: "Error writing to MySQL" });
            console.log("Error writing to mysql");
            console.log(err);
          } else {
            //success
            //delete from person where person_id = :person_id;
            dbModel.deleteRecipe(recipeId, (err, result) => {
              if (err) {
                res.render("error", { message: "Error writing to MySQL" });
                console.log("Error writing to mysql");
                console.log(err);
              } else {
                //success
                res.redirect("/");

                //Output the results of the query to the Heroku Logs
                console.log(result);
              }
            });
          }
        });
      } else {
        res.render("error", { message: "Error on Delete" });
      }

      dbConnection.release();
    }
  });
});

router.get("/showIngredients", (req, res) => {
  console.log("show recipe ingredients");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      console.log(req.query);

      let recipeId = req.query.id;
      if (recipeId === "undefined") {
        res.redirect("/");
      }
      if (recipeId) {
        //delete from person_skill where person_id = :person_id;
        dbModel.showIngredients(recipeId, (err, result) => {
          if (err) {
            res.render("error", { message: "Error writing to MySQL" });
            console.log("Error writing to mysql");
            console.log(err);
          } else {
            //success
            //delete from person where person_id = :person_id;
            //success
            res.render("ingredient", {
              recipe: result,
              recipeID: recipeId,
            });

            //Output the results of the query to the Heroku Logs
            console.log(result);
          }
        });
      } else {
        res.render("ingredient", { message: "Error on Show Ingredient" });
      }

      dbConnection.release();
    }
  });
});

router.post("/addIngredient", (req, res) => {
  console.log("form submit");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      console.log(req.body);
      dbModel.addIngredient(req.body, (err, result) => {
        if (err) {
          res.render("error", { message: "Error writing to MySQL" });
          console.log("Error writing to mysql");
          console.log(err);
        } else {
          //success
          const currentPage = `showIngredients?id=${req.body.id}`;
          console.log(
            "current page URL-------------------------------" + currentPage
          );
          res.redirect(currentPage);

          //Output the results of the query to the Heroku Logs
          console.log(result);
        }
      });

      dbConnection.release();
    }
  });
});

router.get("/deleteIngredient", (req, res) => {
  console.log("delete ingredient");
  database.getConnection(function (err, dbConnection) {
    if (err) {
      res.render("error", { message: "Error connecting to MySQL" });
      console.log("Error connecting to mysql");
      console.log(err);
    } else {
      console.log(req.query);

      let ingredient = req.query;
      if (ingredient) {
        //delete from person_skill where person_id = :person_id;
        dbModel.deleteOneIngredient(ingredient, (err, result) => {
          if (err) {
            res.render("error", { message: "Error writing to MySQL" });
            console.log("Error writing to mysql");
            console.log(err);
          } else {
            //success

            const currentPage = `showIngredients?id=${req.query.id}`;

            res.redirect(currentPage);

            //Output the results of the query to the Heroku Logs
            console.log(result);
          }
        });
      } else {
        res.render("error", { message: "Error on Delete" });
      }

      dbConnection.release();
    }
  });
});

module.exports = router;
