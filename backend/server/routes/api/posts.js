const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

// To GET data from database
router.get('/', async(req, res) => {
    const posts = await loadPostsCollections();
    res.send(await posts.find({}).toArray());
})


// To POST the data
router.post('/', async(req, res) =>{
    const posts = await loadPostsCollections();
    await posts.insertOne({
        projectTitle:req.body.projectTitle,
        projectOwner:req.body.projectOwner,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        collaborators: req.body.collaborators,
        description: req.body.description,
        comments:req.body.comments,
        createdAt : new Date()
    })
    res.status(201).send()
})


// To DELETE data from database to corresponding specific id
router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollections();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send()
})



async function loadPostsCollections() {
    const client = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/projectManagement', {
        useNewUrlParser:true
    });
    return client.db('projectManagement').collection('projectDetails')
}
module.exports = router