const User = require('../models/user.model');
const Post = require('../models/post.model');
const paginate = require('jw-paginate');



  
    exports.userByPost = async (req,res)=>{
        const { id } = req.params;
        const userByPost = await Post.findById(id).populate('user');
        res.send(userByPost);
    };

    exports.getPost =  async (req,res) =>{
        const posta =  await Post.find().sort({date: -1});
        
        const page = parseInt(req.query.page) || 1
        const pageSize = 5;
        const pager = paginate(posta.length, page, pageSize);
        const pageOfItems = posta.slice(pager.startIndex, pager.endIndex + 1);
        res.status(200).send({ pager, pageOfItems });
    };
    exports.submitPost = async (req, res) =>{
        
      
         user = req.params;
            id = user.id;
            const userById = await User.findById(id);
                author = userById.username
           
            const { title, content} = req.body;
            const post = await Post ({
                title: title,
                content: content,
                user:id,
                author: author
                

            });
          
            await post.save();
      
     
            userById.posts.push(post);
            await userById.save();
            
    
           return res.status(200).send(userById );
        
    };
    exports.specificPost= async(req, res) =>{
        post = req.params;
        id = post.id
             const specificPost = await Post.findById(id);
                 res.send(specificPost);
    };
    exports.deletePost= async(req, res) =>{
    await Post.deleteOne({ _id: req.params.id });
        res.send("Deletd Post Succesfully");
    };
    exports.updatepost = async (req, res) =>{
         
        await Post.updateOne({ _id: req.params.id }, {$set:{title: req.body.title, content:req.body.content }});
        res.send( "User was updated successfully!" );
   
 
    };
    exports.searchpost = async (req, res) =>{
        search = req.params.query;
    const searchpost = await Post.find({$or: [{title: {$regex: search, '$options':'i' }},{content: {$regex: search, '$options':'i'}}, {author: {$regex: search, $options:'i'}}]});
                 res.send(searchpost);
                 
                
// //  { $or: [
//     { $text: { $search: query } },
//     { companyName: { $regex: '^' + 'copmany name'} }
//  ]
    };
    // exports.updatePost= async(req,res)=>{
    //     post = req.params;
    //     id = post.id
        
    //     const updatedPost = await Post.updateOne({ id: req.params.postId }, {$set:{title: req.body.title}});
    //      res.send(updatedPost);
    // };



// // Gets back the post 
// module.exports = function(app) {
// app.get('/api/test/posts', async (req,res) => {
//     
//     

//     // return pager object and current page of items
//     

// //     const stratindex = (page -1) * limit
// //     const endIndex = page * limit
// //     const totalpages = Math.ceil( posts.length/limit)
// //     const post = {}
// //     if (posts.length > endIndex)
// //     post.next = {
// //         page: page +1,
// //         limit: limit,
// //         endPage: totalpages
// //     }
// //     if (stratindex>0){
// //     post.previous = {
// //         page: page - 1,
// //         limit: limit,
// //         endPage: totalpages
// //     }
// // }
// //      post.post = posts.slice(stratindex, endIndex)
//     // try{
//         // const posts = await Post.find();
       
//     // }catch(err){
//     //     res.json({message: err});
//     // }
  
// });

// app.use('/api/test/posts', function(req, res) {
//     request('http://localhost:3000' + req.path)
//         .on('error', err => res.send('client not started yet, try refreshing in a few seconds'))
//         .pipe(res);
// });
// };
// // // submits the post 
// // router.post('/api/test/submitpost', async (req, res) =>{


// //     try { 
        

// //     console.log('err');
// //     }catch(err){
// //         res.json({message: err});
// //     }
// // });

// // // specific post 
// // router.get('/api/test/:postId', async (req, res) => {
// //     try{
// //      const post = await Post.findById(req.params.postId);
// //         res.json(post);
// //     }catch(err){
// //         res.json({message: err});

// //     }

// // });

// // //Delete Post
// // router.delete('/api/test/:postId', async (req, res) => {
// //     try{
// //      const removedPost = await Post.remove({ _id: req.params.postId });
// //         res.json(removedPost);
// //     }catch(err){
// //         res.json({message: err});

// //     }

// // });

// // //Update a post 
// // router.patch('/api/test/:postId', async (req, res) => {
// //     try{
// //      const updatedPost = await Post.updateOne({ _id: req.params.postId }, {$set:{title: req.body.title}});
// //         res.json(updatedPost);
// //     }catch(err){
// //         res.json({message: err});

// //     }

// // });

// // module.exports = router;