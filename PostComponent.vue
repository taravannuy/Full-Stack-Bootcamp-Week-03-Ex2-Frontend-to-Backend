<template>
  <div class="container">
    <h1>Latest Posts</h1>  
    <div class="create-post">
      <label for="create-post">Say something...</label>
      <input type="text" id="create-post" v-model="task" placeholder="Create post..">
      <button v-on:click="createPost">Post</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="posts_container">
      <div class="post"
        v-for="(mytask, index) in mytasks"
        v-bind:item="mytask"
        v-bind:index="index"
        v-bind:key="mytask._id"
        v-on:dblclick="deletePost(mytask._id)"
      >
        {{mytask.dateCreated.substring(0,10)}}
        <p class="task">{{ mytask.task }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';
export default {
  name: 'PostComponent',
  data (){
      return{
        mytasks: [],
        error: '',
        task: ''
      }
  },
  async created(){
    try{
      this.mytasks = await PostService.getPosts();
    } catch (err){
      this.error = err.message;
    }
  },
  methods: {
    async createPost(){
      await PostService.insertPost(this.task);
      this.mytasks = await PostService.getPosts();
      // this.task="";
    },
    async deletePost(id){
      await PostService.deletePost(id);
      this.mytasks = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.container{
    max-width: 800px;
    margin: 0 auto;
  }

  p.error{
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }
  div.post{
    position: relative;
    border: 1px solid #5bd658;
    background-color: #bcffb8;
    padding: 10px 10px 30px 10px;
    margin-bottom: 15px;
  }
  div.created_at{
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 15px 5px 15px;
    background-color: darkgreen;
    color: white;
    font-size: 13px;
  }
  p.task{
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0;
  }
</style>
