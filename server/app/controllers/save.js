CREATE CONSTRAINT ON (p: Person) ASSERT p.idm IS UNIQUE
CREATE CONSTRAINT ON (a: Post) ASSERT a.idm IS UNIQUE

CALL apoc.import.csv([{fileName: 'file:/adcityblog.csv’, labels: ['Person’,’Posts’,’Categories’] ,type:[‘’Belongs_to,’Did_activity_on’, ’Follows’, ’Wrote’, ‘Have_interests_in’]}], [], {})

MATCH (p:Person {username: “Dinesh”})-[:Follows]->(following)
WITH “(“ + apoc.text.join(following(following.idm), ‘OR’) + “)^1” AS queryPart
CALL db.index.fulltext.queryNodes(‘persons’, ‘name: Monic id: ’ + queryPart)
YIELD node, score
RETURN node, score


CALL db.index.fulltext.createNodeIndex(‘persons’, [‘Person’], [‘fullname’, ‘idm’])

// get the users searches. 
MATCH (p:Person {name: "Dinesh"})<-[:Follows]-(following)
WITH "(" + apoc.text.join( collect( following.idm), 'OR') + ")^2" AS queryPart
CALL db.index.fulltext.queryNodes('persons', 'name: mon id: ' + queryPart)
YIELD node, score
RETURN node, score

// to change the names of all properties of nodes
MATCH (p:Post)
WITH collect(p) AS posts
call apoc.refactor.rename.nodeProperty("name", "title", posts)
YIELD committedOperations
RETURN committedOperations

// change properties all

MATCH (post:post)
WITH collect(post) AS post
CALL apoc.refactor.rename.nodeProperty("idm", "pidm", post)
YIELD committedOperations
RETURN committedOperations



// CALL db.indexes()


//
Match and update:
MATCH (n:Person {name: ‘Dinesh’})
SET n.reputation = 1
RETURN n

// get the posts searches. 
CALL db.index.fulltext.createNodeIndex(‘searchposts’, [‘Posts’], [‘Person’] ,[‘name’, ‘pidm’, ‘title’])


LOAD CSV WITH HEADERS FROM "file:///adcityblog2.csv" AS line
MERGE (p:Person{name:line.name, fullname:line.fullname, idm:line.idm})
MERGE (b:Post{title:line.title,  pidm:line.pidm})
MERGE (c:Category{name:line.name})
MERGE (p)-[:Wrote {}]->(b)
MERGE (b)-[:Belongs_To]->(c)
MERGE (p)-[:Have_ineterests_in]->(c)
MERGE (p)-[:Follows]->(p)
MERGE (p)-[:Did_activity_on]->(b)