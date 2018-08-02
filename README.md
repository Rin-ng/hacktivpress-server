# HacktivPress
HactivPress is a free blogging site where you can view other users' submissions.
Want to contribute? No worries, just sign up - it's free!

# How to Access
Access the localsite (eg: http://localhost:8080/) or the deployed site at: <coming soon>

## End Points:
##### No Account Needed : 

    - Get ALL Posts (at Home) : "/" with method: GET
       
    - Sign in: "/users/signin" with method: POST
       
    - Register: "/users/signup" with method: POST
    
    - Post Detail: "/singlePost" with method: GET
       
    - Find Post by Author (through author id): "/find/" with method: POST
       
    - Find Single Post: "/find/:id" with method: GET
    
    - Find Post by Category: "/find?category=${categoryName}" with method: GET
    
  ##### Account Needed:      
    - Add Post: "/addNew" with method: POST
           
    - Edit Post: "/:id/edit" with method: PUT
           
    - Delete Post: "/:id/delete" with method: DELETE
  
 
###### PS: You can only edit, delete and update your own posts!
