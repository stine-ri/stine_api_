import db from "./drizzle/db"
import {eq} from "drizzle-orm"
import {ProfileTable,PostTable } from "./drizzle/schema"
import { TIPost,TIUser,TSUser,TIProfile,TSProfile } from "./drizzle/schema";
//query
const getUsers = async (): Promise<TSUser[] | null>=>{
    return await db.query.UserTable.findMany();
}
//query2
const getProfile = async (): Promise<TSProfile[] | null>=>{
     return await db.select().from(ProfileTable);
}
//insert
const createUser = async(user: TIProfile) =>{
    await db.insert(ProfileTable ).values({
        userId:user.userId,
        bio: user.bio,
        image: user.image,
        skills: user.skills
    }).returning()
}

// insert on post table--it will create a new user

const createPost = async(post: TIPost) =>{
    await db.insert(PostTable).values({
        userId:post.userId,
        title: post.title,
        content: post.content
    }).returning()
}

//update

const updateUserProfile = async (bio:string, user_id:number)=>{
    await db.update(ProfileTable).set({bio}).where(eq(ProfileTable.id, user_id)).returning({id: ProfileTable.id})
}
//delete
const deleteUserProfile = async (user_id: number)=>{
    return db.delete(ProfileTable).where(eq(ProfileTable.id, user_id))
}
//1-1 relationship

const getUserWithProfile = async()=>{
    return await db.query.UserTable.findFirst({
      with:{
        profile: true
      }
    })
}

//one to many relationship

const getUsersWithPosts = async ()=>{
   return await db.query.UserTable.findMany({
    with:{
      posts:true  
    }
   })
}
const getPostsWithUsers = async ()=>{
    return await db.query.PostTable.findMany({
     with:{
       user:true  
     }
    })
 }
async function main (){
    // console.log (await getUsers())
    // console.log((await createUser({userId:1, bio:"developer", image:"lovely", skills:"react"})))
    // console.log(await updateUserProfile("I am a senior developer", 3))
    // console.log(await deleteUserProfile(4))
    // console.log(await getProfile());
    // console.log(await getUserWithProfile());
    // console.log((await createPost({userId:1, title:"love", content:"Love is a beautiful thing"}))) 
    //   console.log(await getUsersWithPosts())
    // console.log(await getPostsWithUsers())
    

}

main ();
