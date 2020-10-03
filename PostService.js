import axios from 'axios';

const url = 'api/tasklist/';

class PostService {
      //Get Posts
      static async getPosts() {
      const response = await axios.get(url);
      const data = response.data;

            return data.map(mytask => ({
                  ...mytask,
                  createAt: new Date(mytask.createAt)
            }));
      }

      // Create Post
      static insertPost(task){
            return axios.post(url, {
                  task
            });
      }

      // Delete Post
      static deletePost(id){
            return axios.delete(`${url}${id}`);
      }
}
export default PostService;