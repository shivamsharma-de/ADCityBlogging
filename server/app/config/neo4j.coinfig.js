
const neo4j =  require("neo4j-driver");

 const driver =   neo4j.driver(
	'neo4j://localhost',
	neo4j.auth.basic('neo4j', 'admin')
  )

   try {
    driver.verifyConnectivity()
    console.log('Successfully connect to Neo4j')
  } catch (error) {
    console.log(`connectivity verification failed. ${error}`)
  }

const neosession = driver.session(); 
module.exports = neosession;


