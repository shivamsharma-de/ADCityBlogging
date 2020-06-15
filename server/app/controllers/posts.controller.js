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
  const posta = await Post.find().sort({ date: -1 });

  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const pager = paginate(posta.length, page, pageSize);
  const pageOfItems = posta.slice(pager.startIndex, pager.endIndex + 1);
  res.status(200).send({ pager, pageOfItems });
};

// Post when submitted mai data would be captured in mongo
//while realtionship to categories and posts will be sent to Neo4j.
exports.submitPost = async (req, res) => {
  const session = driver.session();
  const session2 = driver.session();
  user = req.params;
  id = user.id;
  const { title, content, category } = req.body;
  const userById = await User.findById(id);
  const username = userById.username;

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
      "MATCH ( a:Person { name: $username }) MERGE ( b: Post { name:$title, likes: 0, idm: $id1, comment: 0}) MERGE (a)-[: Wrote {created_at: TIMESTAMP()}]->(b)",
      { username: username, id1: id1, title: title }
    )
  );
  writeTxPromise.then(() => {
    console.log("in the write");
    const write1TxPromise = session.writeTransaction((tx) =>
      tx.run(
        " MATCH (a:Post {idm: $id1}),(b:Category{name : $category}) CREATE (a)-[: Belongs_to ]->(b)",
        {
          id1: id1,
          category: category,
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
exports.searchpost = async (req, res) => {
  search = req.params.query;
  const searchpost = await Post.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
    ],
  });
  res.send(searchpost);
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
      " MATCH (x:Post) <-[r:Did_activity_on]- (p:Person) WHERE x.idm=$postid RETURN r.comment AS comment , p.idm AS userid",
      {
        postid: postid })
        .then(result => {
            const commentarray =[];
            result.records.forEach(record => {
                commentarray.push({
                    comment: record._fields[0],
                    userid: record._fields[1]
                })
            })

            res.send(commentarray)
          })
         
          .catch(error => {
            console.log(error)
          })
          .then(() => session.close())
    
};
exports.searchpost=(req,res) => {
    const session = driver.session();
    const userid = req.params.id
    const kkeyword = req.body.keyword
  console.log(typeof(kkeyword))
    session
    .run(
        ` MATCH (p:Person)
        WHERE p.idm= $id
        MATCH (p)-[:Wrote]->(post)
        WITH collect(post.pidm) AS myposts
        WITH "(" + apoc.text.join( myposts, " , " ) + ")^1" AS queryPart 
        CALL db.index.fulltext.queryNodes('posts', 'title: ${kkeyword}  p.idm: ' + queryPart)
        YIELD node, score 
        RETURN node, score ` ,
      {
        id:userid,
        keyword: kkeyword
  
      }
    )
    .then(result => {
      console.log(result)
      const post =[];
      result.records.forEach(record => {
          post.push({
              node: record._fields[0].properties,
              score: record._fields[1]
          })
      })
  
      res.send(post)
    })
    .catch(error => {
      console.log(error)
    })
    .then(() => {
  
      session.close(() => {
        console.log(` Followed`);
      });
    });
  }