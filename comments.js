//! 4.0.0 - WHAT ARE DATABASE ASSOCATIONS?
//! _____________________________________

//? What are database associations?

//* Information and Data aren't just statements of variables' names and values, but also possible meaning and use of the data itself. For example, your name is Steve - people call you Steve, but they can also use your name to get your attention, to look you up on Facebook, connect you to a club you joined or a sports team you're involved with, etc. This is the main point of Data Associations. Sets of data and information you are using and storing may be related (linked) to other stored data, or necessary to fully use other information or sets of data.

//* In programming, these connections are useful in retrieving the relevant information from a database, through services and controllers, to be used or displayed in a meaningful way. On the front-end of an application, every time you fetch from an API endpoint, and on your server end, every time you call your database for information, you use a bit of processing power and storage. Associations can help organize and minimize this.

//* Associations connect one set of data to another so that when you call the user information on Steve, for example - you also get the connected data of their sports team, their Facebook profile, etc. One database call, or one fetch, for multiple sets of data.

//? ______________

//* Lets look at a brief example, and as you progress through the modules, you will eventually end up with tables identical to the ones pictured below, and that are associated to one another! Our database is going to store user information, post information, and comment information - those tables may look something like this:
//! 400Images/db-associations.png
//* How would these tables be associated to each other? Users can create posts, as well as comments - and there is no limit to how many posts or comments a user can create. A post itself will directly belong to the user who created it. A post could also have many comments, but those comments would be associated with not only the post the comment belongs to, but also the user who created the comment.

//* Understanding these associations beforehand will help you organize your database - this ensures that as users input information into the database, that comments are associated with both the correct post and correct user, and that posts are associated with the correct user.

//* In order to do this, we need to add new columns in our tables to give them the correct associations. These additional table headers will ensure that our posts table also stores the userId of the user who created the post, and that the comments table stores the postId of the post that the comment belongs to, as well as the userId of the user who created the comment.
//? ______________
//* Let's dig in! 
//* Follow this link (https://github.com/ElevenfiftyAcademy/associations_boilerplate) 
//* to clone the associations_boilerplate repository. You can clone this repo in any directory on your system, just make sure you're not nesting any GitHub repo's. It's recommended to clone to either desktop or documents - you can always go and move the files later on!

//! _____________________________________
//! 4.01 - Basic Terms and Understanding
//! _____________________________________
//? Basic Terms and Understanding

//* Terms covered:

//* Associations: relationship between models
//* Source model: the model defining an association
//* Target model: the model to which an association is being defined
//* Foreign Key: the database column that contains reference to another table
//* Target key: a database column that a foreign key references

//* Let's use our 3 data tables referenced in the previous module:
//! 400Images/db-associations.png

//* A User can have many Posts and many comments, but both a Post and a Comment only belong to one User. A Post can also have many comments, meaning those comments belong to a single Post, as well as a single user. 

//* To connect one table to another we need a Foreign Key. A Foreign Key is a reference in one Table that calls to the id of another table. 

//* When using Foreign Keys and Associations, a Source is a model that the function is being invoked on, while the Target is the second model being passed as an argument in the called function. This is shown below.

//* There are four type of associations available in Sequelize:
//* 1.) BelongsTo()
//* 2.) HasOne()
//* 3.) HasMany()
//* 4.) BelongsToMany()

//! One-To-One Associations

//* This is a single connection from one model to another by injecting a Foreign Key. When you create associations between your models in sequelize, foreign key references will automatically be created.

//? HasOne vs. BelongsTo

//* User.hasMany(Posts) --> the relationship between the User and Post models will inject a foreign key of userId in the Post Data Table, and mark it as reference to the User table. One-To-Many associations are connecting one source with multiple targets. The targets however are again connected to exactly one specific source.

    //*  User is the source model and Posts is the target model
//? ______________
//* This results in multiple sets of Post data containing userId's to the same user - if that user has created multiple posts. To make this connection circular, you need to use:

    //* Post.belongsTo(User) --> the relationship between the Posts and Users models will inject a foreign key of userId in the Post Data Table, and mark it as a reference to the User table. BelongsTo associations are associations where the foreign key for the one-to-one relation exists on the source model.

//* When querying for data, Users can now return multiple sets of Post data, but the Post only contains a single Users data.

//! One-To-Many Associations:

//* This is a connection from one model to many rows of another model. Such as one User having many Posts.

//? User.hasMany(Posts);
//* This is a connection from one model to many rows of another model. Such as one Post having many Users.
//* The relationship between the User and Post models will inject a foreign key of userId in the Post Data Table, and mark it as reference to the User table. One-To-Many associations are connecting one source with multiple targets. The targets however are again connected to exactly one specific source.
//*  User is the source model and Posts is the target model

//TODO This results in multiple sets of Post data containing userId's to the same user - if that user has created multiple posts. To make this connection circular, you need to use:
//? Post.belongsTo(User);
//* the relationship between the Posts and Users models will inject a foreign key of userId in the Post Data Table, and mark it as a reference to the User table. BelongsTo associations are associations where the foreign key for the one-to-one relation exists on the source model.
//* When querying for data, Users can now return multiple sets of Post data, but the Post only contains a single Users data.

//! Belongs-To-Many Associations
//? (Use for both One-To-Many and Many-To-Many)
//* belongsToMany differs from hasMany, in that belongsToMany creates a whole separate data table containing id's of both connecting models. This isn't functionality we'll need in the server we're building, but if we hypothetically wanted to associate comments with multiple posts, we could do that.
//? Comment.belongsToMany(Posts, { through: 'CommentOnMultiplePosts' });
//* This will create a new Data Table called CommentOnMultiple with the equivalent foreign keys of the commentId and postId.
//* Though seeing as a Comment usually only belongs to one Post, using a many-to-many association may be unnecessary, but possible.
//* The through option is used to specify the name of the new Data Table.

//! ________________________
//! 4.02 - Basic Setup and Creating Associations: (https://sequelize.org/master/manual/associations.html)
//! ________________________

//! Creating a Local Database and Editing .env:
//* Before we dive into writing any code, make sure that you have created a database in PGAdmin called associations to match what has been defined in the .env file. You will also need to edit the .env file in the boilerplate application you cloned to include your PGAdmin password: 

//? .env:
// PORT = 5000
// DATABASE_NAME = associations
// DATABASE_HOST = localhost
// DATABASE_USERNAME = postgres
// DATABASE_PASSWORD = <your pgadmin password here>  //? include your own password here
// DATABASE_PORT = 5432
// DATABASE_DIALECT = postgres
// JWT_SECRET = i_am_secret

//* Lastly, you will need to run an npm install inside of the associations_boilerplate directory to install all of the dependencies listed in the package.json file - this command will generate your node_modules folder.
//* You should now be able to run either an npm start command, or a npm run dev command to boot up your server. Once your server is running, you should be able to see tables in PGAdmin identical to the ones used as reference in the last couple of modules.
//? *Don't forget to add your .env file to .gitignore!

//! Creating the Associations:
//* Now that our server is running and we are able to connect to our local database in PGAdmin, let's create our associations. We will do this inside of the index.js file in the /models directory.
//* Your index.js file in the /models directory should currently contain the following code: 

// const db = require('../db');

// const UsersModel = require('./users');
// const PostsModel = require('./posts');
// const CommentsModel = require('./comments');

// //? associations will go below

// module.exports = {
//     dbConnection: db,
//     models: {
//         UsersModel,
//         PostsModel,
//         CommentsModel
//     }
// };

//? Under the comment in the index.js file, add the following lines of code:
// //? associations will go below
// UsersModel.hasMany(PostsModel);
// UsersModel.hasMany(CommentsModel);

// PostsModel.belongsTo(UsersModel);
// PostsModel.hasMany(CommentsModel);

// CommentsModel.belongsTo(PostsModel);

//* Here we are stating the following:

//? 1.) Users can have many Posts
//? 2.) Users can have many Comments
//? 3.) A Post belongs to a specific User
//? 4.) A Post can have many Comments
//? 5.) A Comment belongs to a specific Post

//* These associations will automatically inject foreign keys into the Posts and Comments tables, but we won't see those table headers populate without first dropping the current tables in our database, and re-syncing them to assign the associations and populate the foreign keys. 

//? You can do this in app.js by uncommenting { force: true } in the sequelize.sync() method:
//! app.js:
// try {
//        dbConnection
//            .authenticate()
//            .then(async () => await dbConnection.sync({force: true})) //? force: true will drop all tables in pgAdmin and resync them. This is necessary after you make a change to a model, and need to sync any new table headers to the database.
//            .then(() => {
//                app.listen(process.env.PORT, () => {
//                    console.log(`[SERVER]: App is listening on ${process.env.PORT}`);
//                });
//            });
//    } catch (err) {
//        console.log('[SERVER]: Server crashed');
//        console.log(err);
//    }

//? *{ force: true }
//*  adds a DROP TABLE IF EXISTS before trying to create the tables in PGAdmin. This will ensure our current tables without the foreign keys are dropped, and that our now associated models are what gets synced to the database along with the automatically injected foreign keys. 

//* Once you have ran the server with { force: true } included in the sync() method, you can comment it back out and re-start the server so our tables aren't perpetually being dropped. You may need to manually restart your server before and after un-commenting/commenting { force: true } if you're not running your application with npm run dev. Remember that nodemon re-boots your server every time you save a file - whereas a basic npm start command does not.

//* After you've re-synced your tables to the database, you should have tables that match up with the screenshot below:
//? Screenshot:
//!402Image 2022-01-14-23-36-54.png

//! ________________________
//! 4.03 - Controllers Setup:
//! ________________________
//? The next step is to create a controller for each model. We will do this in the /controllers directory.
//? The controllers will be named after the model they are associated with, and will be exported as a module.
//? The controllers will contain the CRUD methods for each model.
//? The controllers will also contain a method for each association defined in the model.
//? The controllers will be imported into the index.js file in the /controllers directory.
//? The controllers will be imported into the app.js file in the /app directory.

//* Now that we have our server connected to the database with the appropriate associations, we can flesh out the controllers. We'll start by creating post requests in userscontroller.js (signup), postscontroller.js (create post), and commentscontroller.js (create comment). This will allow us to post information to each table and see our associations in action during testing. 

//! usercontroller.js
//* Lets start with a function to allow users to signup. Under your imports in userscontroller.js, add the following code:

// const router = require('express').Router();
// const { models } = require('../models');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { UniqueConstraintError } = require('sequelize/lib/errors');

// router.post('/signup', async (req, res) =>{
//     const {username, password} = req.body.user;
//     try {
//         await models.UsersModel.create({
//             username: username,
//             password: bcrypt.hashSync(password, 10)
//         })
//         .then(
//             user => {
//                 let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
//                 res.status(201).json({
//                     user: user,
//                     message: 'user created',
//                     sessionToken: `Bearer ${token}`
//                 });
//             }
//         )
//     } catch (err) {
//         if (err instanceof UniqueConstraintError) {
//             res.status(409).json({
//                 message: 'Username already in use'
//             });
//         } else {
//             res.status(500).json({
//                 error: `Failed to register user: ${err}`
//             });
//         };
//     };
// });

// module.exports = router;

//! postscontroller.js
//* Next, lets allow users to create a post. Under your imports in postscontroller.js, add the following code: 
// const router = require('express').Router();
// const { models } = require('../models');

// router.post('/post', async (req, res) => {

//     const {title, content} = req.body.post;

//     try {
//         await models.PostsModel.create({
//             title: title,
//             content: content,
//             userId: req.user.id
//         })
//         .then(
//             post => {
//                 res.status(201).json({
//                     post: post,
//                     message: 'post created'
//                 });
//             }
//         )
//     } catch (err) {
//         res.status(500).json({
//             error: `Failed to create post: ${err}`
//         });
//     };
// });

// module.exports = router;

//! commentscontroller.js
//* Lastly, we'll allow users to create comments. Under your imports in commentscontroller.js, add the following code:

// const router = require('express').Router();
// const { models } = require('../models');

// router.post('/comment', async (req, res) => {

//     const {content, postId} = req.body.comment;

//     try {
//         await models.CommentsModel.create({
//             content: content,
//             postId: postId,
//             userId: req.user.id
//         })
//         .then(
//             comment => {
//                 res.status(201).json({
//                     comment: comment,
//                     message: 'comment created'
//                 });
//             }
//         )
//     } catch (err) {
//         res.status(500).json({
//             error: `Failed to create comment: ${err}`
//         });
//     };
// });

// module.exports = router;

//! ________________________
//* You may be asking why the postId is being supplied manually through the req.body. Remember that the user (and their respective id) who is creating the data is being pulled from the token being passed in the authorization header (this happens in the validate-session.js file) - so we can pull the userId directly from the request object supplied by the request from the client, and send it through to the database. The postId on the other hand is not being passed along in the request object, so we need to manually supply the postId in which this comment will be connected to. If you were to ever create a client for this server, everything will still work as expected since we'll need to fetch all of the Posts before displaying the comments, anyways. This means that we will have the id's of all the Posts we fetch, and can then supply the id of the Post in which a comment we are creating is tied to. 

//! ________________________

//* Our application now has the functionality to allow users to signup, create Posts, and create comments - but there's one more request we want to add so we can see that our Data Tables are associated.

//* We're going to make a get request in userscontroller.js that will show us not only all of the Users stored in the database, but any associated Posts and Comments with those Users, as well. 

//* In userscontroller.js, add the following code under the signup function. 

// const router = require('express').Router();
// const { models } = require('../models');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { UniqueConstraintError } = require('sequelize/lib/errors');

// router.post('/signup', async (req, res) =>{

//     const {username, password} = req.body.user;

//     try {
//         await models.UsersModel.create({
//             username: username,
//             password: bcrypt.hashSync(password, 10)
//         })
//         .then(
//             user => {
//                 let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
//                 res.status(201).json({
//                     user: user,
//                     message: 'user created',
//                     sessionToken: `Bearer ${token}`
//                 });
//             }
//         )
//     } catch (err) {
//         if (err instanceof UniqueConstraintError) {
//             res.status(409).json({
//                 message: 'Username already in use'
//             });
//         } else {
//             res.status(500).json({
//                 error: `Failed to register user: ${err}`
//             });
//         };
//     };
// });

// router.get('/userinfo', async (req, res) => {
//     try {
//         await models.UsersModel.findAll()
//         .then(
//             users => {
//                 res.status(200).json({
//                     users: users
//                 });
//             }
//         )
//     } catch (err) {
//         res.status(500).json({
//             error: `Failed to retrieve users: ${err}`
//         });
//     };
// });

// module.exports = router;

//* If we were to test the above request in Postman, we'd be able to fetch all Users stored in our database - which is what we want! But we also want to be able to see any other data that is also associated with that user. To do this, we need to add a bit of code inside of the  method in our get request. This is what's known as Eager Loading (Links to an external site.), as specified by the Sequelize docs. Eager Loading is the act of querying data of several models at once (one 'main' model and one or more associated models). When this is done, the associated models will be added by Sequelize in appropriately named, automatically created field(s) in the returned objects.

//* In Sequelize, Eager Loading is mainly done by using the   option on a model finder query (such as , , etc) - so let's edit our code to include that!

//* Inside of the  method, add the following code:
// router.get('/userinfo', async (req, res) => {
//         try {
//             await models.UsersModel.findAll({
//                 include: [
//                     {
//                         model: models.PostsModel,
//                         include: [
//                             {
//                                 model: models.CommentsModel
//                             }
//                         ]
//                     }
//                 ]
//             })
//             .then(
//                 users => {
//                     res.status(200).json({
//                         users: users
//                     });
//                 }
//             )
//         } catch (err) {
//             res.status(500).json({
//                 error: `Failed to retrieve users: ${err}`
//             });
//         };
//     });

// The above code will also now include our PostsModel, as well as our CommentsModel when querying users. We've also appropriately structured the associated models we're including, so that they're returned in a cohesive, easy to read manner (both Posts and Comments will be returned in an array storing the objects of all the Posts and Comments. 

//! ________________________
//! 4.04 - POSTMAN TESTING
//! ________________________

//? Postman Testing
//* Now that we have our controllers set up, let's post some information to our database! We'll start by creating a User, followed by a Post, and then finally create a Comment. Once we have the aforementioned data created, we can run our get request in the userscontoller to query all of our information at once. 
//! ________________________
//? Create New User
//* We're reaching out to an endpoint of http://localhost:5000/auth/signup - this is specified in both app.js and in userscontroller.js - where in app.js we set up a base endpoint of , that points to our userscontroller where we have a sub-route of .

//* Our request body should be structured as follows:
// {
//         "user": {
//             "username": "testUserOne",
//             "password": "testUserOne"
//         }
//     }

//! 404PostmanScreenshotOfUserController.png
//* As shown above, our server sends us back a response in the form of a JSON object with all of our User information. Your information should look very similar, but a few fields will be different since we're hashing passwords, generating UUID's as the user id, etc. 

//* If you look in your users.js file in the models directory, you'll see that we're setting the DataType of our User id to UUID, and assigning the default value of the User id to be a UUIDV4 :

// const Users = db.define("users", {
//       id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//       },
//       // ...
//     });

//*  UUID, or a Universally Unique Identifier, are 128 bit numbers, composed of 16 octets and represented as 32 base-16 characters, that can be used to identify information across a computer system. This specification was originally created by Microsoft. A UUIDV4 is the most “unique” of the versions. The bits that comprise a UUID v4 are generated randomly and with no inherent logic. Take a look at this article (Links to an external site.) if you want some more information on UUID's and the different versions.

//? Create New Post
//* We're reaching out to an endpoint of http://localhost:5000/posts/post- this is specified in both app.js and in postscontroller.js - where in app.js we set up a base endpoint of /posts, that points to our postscontroller where we have a sub-route of /post.

//* Since this is a protected route, so we need to supply our JsonWebToken in the authorization headers using the Bearer schema. You can copy the token generated from creating a new user. 

//* Our request body should be structured as follows:
// {
//         "post": {
//             "title": "test title",
//             "content": "test post"
//         }
//     }
//! CreateNewPostImage.png
//* Notice that the UUID that was generated when creating a new User matches the userId in the JSON response object returned from the server when creating a new Post (again, these numbers will be different for you since this is a generated id):
//? Create User
// {
//         "user": {
//             "id": "5b9bcdf7-d12b-4af2-a82f-059bcbb52b9f",
//             "username": "testUserOne",
//             "password": "$2a$10$SnYK3BaeFP6hHZZyFPm2.eJXh1RddNk62KM/eclei32cmrv0L8AaS",
//             "updatedAt": "2021-03-25T14:10:10.391Z",
//             "createdAt": "2021-03-25T14:10:10.391Z"
//         },
//         "message": "user created",
//         "sessionToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOWJjZGY3LWQxMmItNGFmMi1hODJmLTA1OWJjYmI1MmI5ZiIsImlhdCI6MTYxNjY4MTQxMCwiZXhwIjoxNjE2NzY3ODEwfQ.jsDVF4mSdPwH_UTA1V3rwVjZWJnN3jIXLw94TyzjdUs"
//     }

//? Create Post
// {
//         "post": {
//             "id": "c83c8c0e-8644-42e2-af9d-445957e31fb0",
//             "title": "test title",
//             "content": "test post",
//             "userId": "5b9bcdf7-d12b-4af2-a82f-059bcbb52b9f",
//             "updatedAt": "2021-03-25T14:53:13.166Z",
//             "createdAt": "2021-03-25T14:53:13.166Z"
//         },
//         "message": "post created"
//     }

//* We are signing a JsonWebToken to the users id upon creation of the User. Since our postscontroller is protected by the validate-session.js file, the Users token needs to be supplied in the authorization headers, so our validate-session file can decode the Users token and verify that they are who they say they are. We then capture the request object from the client when we hit the /posts/post endpoint, and we now have access to the User object so we can pass along their id in the newly created Post -  associating the new Post with a specific User. 

//? Create Comment
//* We're reaching out to an endpoint of http://localhost:5000/comments/comment - this is specified in both app.js and in commentscontroller.js - where in app.js we set up a base endpoint of , that points to our commentscontroller where we have a sub-route of .

//* Since this is a protected route, so we need to supply our JsonWebToken in the authorization headers using the Bearer schema. You can copy the token generated from creating a new user. 

//* This is also where we needy to manually supply the id of the Post we just created. As stated in the previous module, this won't cause any hiccups on the client side of the application if you were to create a client. Since the Comments are tied directly to a single Post, we would have already fetched our Posts and would have access to their id's so we could create a Comment tied to a specific Post. 

//* Our request body should be structured as follows:
// {
//         "comment": {
//             "content": "test comment",
//             "postId": "c83c8c0e-8644-42e2-af9d-445957e31fb0"
//         }
//     }
//! CreateCommentImage.png
//* You should now have a Comment containing references to both the id of the Post, as well as the id of the User who created the comment: 

//? User
// {
//         "user": {
//             "id": "5b9bcdf7-d12b-4af2-a82f-059bcbb52b9f",
//             "username": "testUserOne",
//             "password": "$2a$10$SnYK3BaeFP6hHZZyFPm2.eJXh1RddNk62KM/eclei32cmrv0L8AaS",
//             "updatedAt": "2021-03-25T14:10:10.391Z",
//             "createdAt": "2021-03-25T14:10:10.391Z"
//         },
//         "message": "user created",
//         "sessionToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOWJjZGY3LWQxMmItNGFmMi1hODJmLTA1OWJjYmI1MmI5ZiIsImlhdCI6MTYxNjY4MTQxMCwiZXhwIjoxNjE2NzY3ODEwfQ.jsDVF4mSdPwH_UTA1V3rwVjZWJnN3jIXLw94TyzjdUs"
//     }

//? Post
// {
//         "post": {
//             "id": "c83c8c0e-8644-42e2-af9d-445957e31fb0",
//             "title": "test title",
//             "content": "test post",
//             "userId": "5b9bcdf7-d12b-4af2-a82f-059bcbb52b9f",
//             "updatedAt": "2021-03-25T14:53:13.166Z",
//             "createdAt": "2021-03-25T14:53:13.166Z"
//         },
//         "message": "post created"
//     }

//? Comment
// {
//         "comment": {
//             "id": "6dbd093c-067d-4068-a20c-05b722d9cd86",
//             "content": "test comment",
//             "postId": "c83c8c0e-8644-42e2-af9d-445957e31fb0",
//             "userId": "5b9bcdf7-d12b-4af2-a82f-059bcbb52b9f",
//             "updatedAt": "2021-03-25T15:16:04.485Z",
//             "createdAt": "2021-03-25T15:16:04.485Z"
//         },
//         "message": "comment created"
//     }

//* We now have one cool User who has created their own Post, and then Commented on their own Post.

//! Get Users
//* The last thing we need to do is fire off our get request defined in the userscontroller. This get request will return us our User information, as well as the associated Data Tables. 

//* We're reaching out to an endpoint of http://localhost:5000/auth/userinfo - this is specified in both app.js and in userscontroller.js - where in app.js we set up a base endpoint of , that points to our userscontroller where we have a sub-route of .

//* This is a get request, so we do not need to send a request body through to the server.

//! GetUsersImage.png
//* With the help of Sequelize, associations, and Eager Loading - we're now able to see all of our information stored in the database returned in a single fetch request. 

//! ________
//! Practice
//! ________

//* Take some time to create another User or two, and have different Users create new Posts, as well as Comments - so you get a better idea of how everything is associated. You can also write out a get request in the postscontroller and use Eager Loading to include the Comments table - this will return only the Posts and Comments, but we'll still be able to see the User Id who created the Post!

//* Remember that you can always use the get request defined in the usercontroller to show all of your information. This is useful when you need to grab the id of a specific Post you want to create a Comment for. 

//* Here's some data I created that more closely resembles an actual database:

// {
//         "users": [
//             {
//                 "id": "8f79a310-3f11-4c73-ad9f-317bddc82de1",
//                 "username": "redcat",
//                 "password": "$2a$10$XciN0MgLo76Z7B1o/c7tC.s0m8oEzjKwfhMR6a8a/waouSGC3ZVjq",
//                 "createdAt": "2021-03-25T16:11:16.323Z",
//                 "updatedAt": "2021-03-25T16:11:16.323Z",
//                 "posts": [
//                     {
//                         "id": "2fd48a9b-4964-4d99-9deb-cccb47eb4ae7",
//                         "title": "What's the best Mario game for each system?",
//                         "content": "What's the best Mario game for Super Nintendo, N64, Wii, and Switch?",
//                         "createdAt": "2021-03-25T16:12:51.847Z",
//                         "updatedAt": "2021-03-25T16:12:51.847Z",
//                         "userId": "8f79a310-3f11-4c73-ad9f-317bddc82de1",
//                         "comments": [
//                             {
//                                 "id": "9b05df59-4084-4d86-95c3-f99ef1726262",
//                                 "content": "Super Nintedo: Super Mario All-Stars - N64: Mario 64 - Wii: Super Mario Galaxy - Switch: Mario Odyssey",
//                                 "createdAt": "2021-03-25T16:15:27.392Z",
//                                 "updatedAt": "2021-03-25T16:15:27.392Z",
//                                 "userId": "f137dc36-4433-4914-9a42-4a08022d4966",
//                                 "postId": "2fd48a9b-4964-4d99-9deb-cccb47eb4ae7"
//                             },
//                             {
//                                 "id": "40541b03-bfbd-4882-872e-037f991748b6",
//                                 "content": "mario sucks",
//                                 "createdAt": "2021-03-25T16:20:29.056Z",
//                                 "updatedAt": "2021-03-25T16:20:29.056Z",
//                                 "userId": "ef291cb4-5ef5-4297-a12a-7832007c1677",
//                                 "postId": "2fd48a9b-4964-4d99-9deb-cccb47eb4ae7"
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "id": "ef291cb4-5ef5-4297-a12a-7832007c1677",
//                 "username": "donutowl",
//                 "password": "$2a$10$A.k2rB7rB55wXqUx1fq4fOxc2I5cADi83nxstBwbd2iwBoxqtUVxe",
//                 "createdAt": "2021-03-25T16:17:23.581Z",
//                 "updatedAt": "2021-03-25T16:17:23.581Z",
//                 "posts": [
//                     {
//                         "id": "d66bc80b-748d-406d-ad23-d1c39af7b6df",
//                         "title": "HOW DO I TURN OFF CAPSLOCK?????",
//                         "content": "PLS SEND HELP NOW!!!",
//                         "createdAt": "2021-03-25T16:23:46.742Z",
//                         "updatedAt": "2021-03-25T16:23:46.742Z",
//                         "userId": "ef291cb4-5ef5-4297-a12a-7832007c1677",
//                         "comments": [
//                             {
//                                 "id": "e63f77e2-70d2-4c73-82a3-53c549262741",
//                                 "content": "press the capslock button on your keyboard...",
//                                 "createdAt": "2021-03-25T16:34:53.695Z",
//                                 "updatedAt": "2021-03-25T16:34:53.695Z",
//                                 "userId": "f137dc36-4433-4914-9a42-4a08022d4966",
//                                 "postId": "d66bc80b-748d-406d-ad23-d1c39af7b6df"
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "id": "f137dc36-4433-4914-9a42-4a08022d4966",
//                 "username": "sodamilk",
//                 "password": "$2a$10$veRZpTg6wcCQkc4nWOAnV./N9Ly74qL8i5NHWrlrqo3I5HGHyT/8S",
//                 "createdAt": "2021-03-25T16:13:28.360Z",
//                 "updatedAt": "2021-03-25T16:13:28.360Z",
//                 "posts": [
//                     {
//                         "id": "e06ce473-650a-4b5d-a2c3-8914320b5e6f",
//                         "title": "is a hotdog a sandwhich?",
//                         "content": "yes or no? and why?",
//                         "createdAt": "2021-03-25T16:36:33.537Z",
//                         "updatedAt": "2021-03-25T16:36:33.537Z",
//                         "userId": "f137dc36-4433-4914-9a42-4a08022d4966",
//                         "comments": [
//                             {
//                                 "id": "e1545230-3e3c-4760-86a7-3af98b053b7a",
//                                 "content": "is cereal soup?",
//                                 "createdAt": "2021-03-25T16:39:40.968Z",
//                                 "updatedAt": "2021-03-25T16:39:40.968Z",
//                                 "userId": "8f79a310-3f11-4c73-ad9f-317bddc82de1",
//                                 "postId": "e06ce473-650a-4b5d-a2c3-8914320b5e6f"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
    
//* The highlighted UUID's should give you better clarification of the associations in place, as well as depicting who posted what, and what it's related to.
//? _________________
//* If you need a login method for testing purposes, you can find that code below. This will go in the userscontroller under the signup method:

// const router = require('express').Router();
// const { models } = require('../models');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { UniqueConstraintError } = require('sequelize/lib/errors');

// router.post('/signup', async (req, res) =>{

//     const {username, password} = req.body.user;

//     try {
//         await models.UsersModel.create({
//             username: username,
//             password: bcrypt.hashSync(password, 10)
//         })
//         .then(
//             user => {
//                 let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
//                 res.status(201).json({
//                     user: user,
//                     message: 'user created',
//                     sessionToken: `Bearer ${token}`
//                 });
//             }
//         )
//     } catch (err) {
//         if (err instanceof UniqueConstraintError) {
//             res.status(409).json({
//                 message: 'Username already in use'
//             });
//         } else {
//             res.status(500).json({
//                 error: `Failed to register user: ${err}`
//             });
//         };
//     };
// });

// router.post('/login', async (req, res) => {

//     const { username, password } = req.body.user;

//     try {
//         await models.UsersModel.findOne({
//             where: {
//                 username: username
//             }
//         })
//         .then(
//             user => {
//                 if (user) {
//                     bcrypt.compare(password, user.password, (err, matches) => {
//                         if (matches) {
//                             let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
//                             res.json({
//                                 user: user,
//                                 message: 'logged in',
//                                 sessionToken: `Bearer ${token}`
//                             })
//                         } else {
//                             res.status(502).send({
//                                 error: 'bad gateway'
//                             })
//                         }
//                     })
//                 } else {
//                     res.status(500).send({
//                         error: 'failed to authenticate'
//                     })
//                 }
//             }
//         )
//     } catch (err) {
//         res.status(501).send({
//             error: 'server does not support this functionality'
//         })
//     }
// })

// router.get('/userinfo', async (req, res) => {

//     try {
//         await models.UsersModel.findAll({
//             include: [
//                 {
//                     model: models.PostsModel,
//                     include: [
//                         {
//                             model: models.CommentsModel
//                         }
//                     ]
//                 }
//             ]
//         })
//         .then(
//             users => {
//                 res.status(200).json({
//                     users: users
//                 });
//             }
//         )
//     } catch (err) {
//         res.status(500).json({
//             error: `Failed to retrieve users: ${err}`
//         });
//     };
// });

// module.exports = router;

