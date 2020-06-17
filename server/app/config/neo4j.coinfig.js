const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "admin")
);

try {
  driver.verifyConnectivity();
  console.log("Successfully connect to Neo4j");
} catch (error) {
  console.log(`connectivity verification failed. ${error}`);
}

const session = driver.session();

session
  .run('MATCH (c:Category {name: "Visas"}) RETURN c')
  .then(function (results) {
    if (results.records.length == 0) {
      const categoryNames = [
        "Accomodation",
        "Visas",
        "City_Office",
        "Flights",
        "Universities",
      ];
      categoryNames.forEach(function addCategory(categoryName) {
        const session = driver.session();
        session
          .run("CREATE (c:Category {name: $categoryName})", {
            categoryName: categoryName,
          })
          .then(() => {
            session.close(() => {
              console.log(` addded in categories`);
            });
          });
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });

module.exports =  driver;
