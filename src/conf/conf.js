//production mei itna lamba direct access nhi lete app mei ,eenv variable agar load hie na ho 
// toh crash hoga jiska error dhundhne mei dikkat . iss file se liye jaenge saare env 
//variables . incase id is made of only numbers it will be stored as one avoid that

const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf