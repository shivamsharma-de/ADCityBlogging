const User = require("../models/user.model");
const Post = require("../models/post.model");
const paginate = require("jw-paginate");

const driver = require("../config/neo4j.coinfig");

exports.userByPost = async (req, res) => {
  const { id } = req.params;
  const userByPost = await Post.findById(id).populate("user");
  res.send(userByPost);
};
exports.getPost = async (req, res) => {
  var data = [];
  const userid = req.params.id;
  const session4 = driver.session();
  const session5 = driver.session();
  const session6 = driver.session();
  session4
    .run(
      `MATCH (p:Person)
      WHERE p.pidm= $id
      MATCH (p)-[:Follows]->(p2) WITH collect(p2.pidm) AS followers RETURN followers`,
      {
        id: userid,
      }
    )
    .then((result) => {
      const data3 = [];
      result.records.forEach((record) => {
        data3.push(record._fields[0]);
      });
      c = data3[0].length;

      if (c <= 1) {
        session5
          .run(
            ` MATCH (p1:Person{pidm:$id})-[:Have_interests_in]->(c:Category)<-[:Belongs_to]-(p3:Post) RETURN p3.title, p3.pidm `,
            {
              id: userid,
            }
          )
          .then((result) => {
            const data1 = [];
            result.records.forEach((record) => {
              data1.push({
                title: record._fields[0],
                id: record._fields[1],
              });
            });
            //pagination 
            const page = parseInt(req.query.page) || 1;
            const pageSize = 5;
            const pager = paginate(data1.length, page, pageSize);
            const pageOfItems = data1.slice(
              pager.startIndex,
              pager.endIndex + 1
            );
            res.status(200).send({ pager, pageOfItems });
          })
          .catch((error) => {
            res.send(error);
          })
          .then(() => {
            session5.close(() => {});
          });
      } else {
        session6
          .run(
            `MATCH (p:Person)
            WHERE p.pidm= $id
            MATCH (p)-[:Follows]->(p2) 
             MATCH (p2)-[:Wrote]->(p3:Post)  RETURN p3.pidm ,p3.title`,
            {
              id: userid,
            }
          )
          .then((result) => {
            const data2 = [];
            result.records.forEach((record) => {
              data2.push({
                title: record._fields[1],
                id: record._fields[0],
              });
            });
            console.log("inhere");
            const page = parseInt(req.query.page) || 1;
            const pageSize = 5;
            const pager = paginate(data2.length, page, pageSize);
            const pageOfItems = data2.slice(
              pager.startIndex,
              pager.endIndex + 1
            );
            res.status(200).send({ pager, pageOfItems });
          })
          .catch((error) => {
            res.send(error);
          })
          .then(() => {
            session6.close(() => {
              console.log(` Followed`);
            });
          });
      }
    })
    .catch((error) => {
      res.send(error);
    })
    .then(() => {
      session4.close(() => {
        console.log(` Followed`);
      });
    });
};

// Post when submitted  data would be captured in mongo
//while realtionship to categories and posts will be sent to Neo4j.
exports.submitPost = async (req, res) => {
  const session = driver.session();
  const session2 = driver.session();
  user = req.params;
  id = user.id;
  const { title, content, selectedCgt } = req.body;
  const userById = await User.findById(id);
  const username = userById.username;
  console.log(selectedCgt);
  const post = await Post({
    title: title,
    content: content,
    user: id,
    author: username,
  });

  await post.save();

  userById.posts.push(post);
  await userById.save();
  const id1 = post.id;
  const writeTxPromise = session.writeTransaction((tx) =>
    tx.run(
      "MATCH ( a:Person { name: $username }) MERGE ( b: Post { title:$title, likes: 0, pidm: $id1, comment: 0}) MERGE (a)-[: Wrote {created_at: TIMESTAMP()}]->(b)",
      { username: username, id1: id1, title: title }
    )
  );
  writeTxPromise.then(() => {
    console.log("in the write");
    const write1TxPromise = session.writeTransaction((tx) =>
      tx.run(
        " MATCH (a:Post {idm: $id1}),(b:Category{name : $selectedCgt}) CREATE (a)-[: Belongs_to ]->(b)",
        {
          id1: id1,
          selectedCgt: selectedCgt,
        }
      )
    );

    write1TxPromise.then(() => {
      session.close();
      console.log("Matched created node with id ");
    });
  });

  return res.status(200).send("added");
};
exports.specificPost = async (req, res) => {
  post = req.params;
  id = post.id;
  const specificPost = await Post.findById(id);
  res.send(specificPost);
};
exports.deletePost = async (req, res) => {
  await Post.deleteOne({ _id: req.params.id });
  res.send("Deletd Post Succesfully");
};
exports.updatepost = async (req, res) => {
  await Post.updateOne(
    { _id: req.params.id },
    { $set: { title: req.body.title, content: req.body.content } }
  );
  res.send("User was updated successfully!");
};

exports.createcomment = async (req, res) => {
  const session2 = driver.session();
  const uid = req.body.userid;
  const pid = req.body.postid;
  const comment = req.body.comment;

  await session2
    .run(
      " MATCH (a:Person {idm: $uid}) MATCH (b:Post {idm: $pid}) MERGE (a)-[: Did_activity_on {commented_on: TIMESTAMP(), comment: $comment}]->(b) ",
      {
        uid: uid,
        pid: pid,
        comment: comment,
      }
    )
    .then(() => {
      session2.close();
    });
  res.send("Addedcomment");
};
exports.likepost = async (req, res) => {
  const session = driver.session();
  const userid = req.body.userid;
  const postid = req.body.postid;

  await session
    .run(
      "MATCH (a:Person {idm: $userid}) MATCH (b:Post {idm: $postid}) MERGE (a)-[: Did_activity_on {liked_on: TIMESTAMP(), like: true}]->(b) ",
      {
        userid: userid,
        postid: postid,
      }
    )
    .then(() => {
      session.close(() => {
        console.log(` addded in comment`);
      });
    });
  res.send("Addedcomment");
};
exports.getcomments = async (req, res) => {
  const session = driver.session();
  const postid = req.body.postid;

  await session
    .run(
      " MATCH (x:Post) <-[r:Did_activity_on]- (p:Person) WHERE x.pidm=$postid RETURN r.comment AS comment , p.pidm AS userid",
      {
        postid: postid,
      }
    )
    .then((result) => {
      const commentarray = [];
      result.records.forEach((record) => {
        commentarray.push({
          comment: record._fields[0],
          userid: record._fields[1],
        });
      });

      res.send(commentarray);
    })

    .catch((error) => {
      console.log(error);
    })
    .then(() => session.close());
};
exports.searchpost = (req, res) => {
  const session = driver.session();
  const id = req.params.id;
  const kkeyword = req.params.q;
  session
    .run(
      ` MATCH (p:Person)
        WHERE p.pidm= "${id}"
        MATCH (p)-[:Wrote]->(post)
        WITH collect(post.pidm) AS mypost
        WITH "(" + apoc.text.join( mypost, " OR " ) + ")^3" AS queryPart 
        CALL db.index.fulltext.queryNodes('myposts', 'title: ${kkeyword}  pidm: ' + queryPart)
        YIELD node, score 
        RETURN node.pidm, node.title, score `,
      {
        id: id,
        keyword: kkeyword,
      }
    )
    .then((result) => {
      console.log(result);
      const post = [];
      result.records.forEach((record) => {
        post.push({
          id: record._fields[0],
          title: record._fields[1],
          score: record._fields[2],
        });
      });

      res.send(post);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close(() => {
        console.log(` Followed`);
      });
    });
};
