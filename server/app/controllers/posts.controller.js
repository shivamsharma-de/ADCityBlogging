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
  author = userById.username;
  const username = author;
  const writeTxPromise = session.writeTransaction((tx) =>
    tx.run(
      "MATCH ( a:Person { name: $username }) MERGE ( b: Post {name: $title, likes: 0, author: $username, comment: 0}) MERGE (a)-[: Wrote {created_at: TIMESTAMP()}]->(b)",
      { username: username, title: title }
    )
  );
  writeTxPromise.then(() => {
    console.log("in the write");
    const write1TxPromise = session.writeTransaction((tx) =>
      tx.run(
        " MATCH (a:Post {name: $title}),(b:Category{name : $category}) CREATE (a)-[: Belongs_to ]->(b)",
        {
          title: title,
          category: category,
        }
      )
    );

    write1TxPromise.then((result) => {
      session.close();
      console.log("Matched created node with id: ");
    });
  });
  const post = await Post({
    title: title,
    content: content,
    user: id,
    author: author,
  });

  await post.save();

  userById.posts.push(post);
  await userById.save();

  return res.status(200).send(userById);
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
