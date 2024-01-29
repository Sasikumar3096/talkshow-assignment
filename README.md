#Social Media Analytics 

##SET-UP
  This Application uses a Sqlite database and ioredis-mock npm library as redis 
## Execution
  `npm run dev` to start the sever. 
##Endpoints 
  Post Creation (POST /api/v1/posts/): Accept a JSON payload with text content and a unique identifier.
  GET Analysis (GET /api/v1/posts/{id}/analysis/): Endpoint that returns the number of words and average word length in a post.

## Assumptions & Decisions
