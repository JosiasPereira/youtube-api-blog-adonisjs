'use strict'


const Post = use('App/Models/Post');

class PostController {

  async store({request, response, auth}){
    const { id } = auth.user;

    // title, body
    const {title, body} = request.all();

    const post = await Post.create({title, body, user_id: id});

    return post;
  }

  async update ({request, response, params}){
    const {title, body} = request.all();

    const post = await Post.find(params.id);

    if (!post){
      return response.status(404).send({message: 'this item is not found'});
    }

    post.title = title;
    post.body  = body;

    await post.save();

    return post;

  }

  async destroy ({response, params}){

    const post = await Post.find(params.id);

    if (!post){
      return response.status(404).send({message: 'this item is not found'});
    }

    await post.delete();

    return response.status(200).send({message: 'this item has been deleted'});

  }

  async index ({request, response}){
    const posts = await Post.query().with('user').fetch();
    return posts;
  }

}

module.exports = PostController
