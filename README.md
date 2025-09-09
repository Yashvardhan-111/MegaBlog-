# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

==================================================================

 Environment Variables are hidden values that your app can access without hardcoding them into the code.Secret settings your app can read from the system or a .env file.they’re used to store things like:
 API keys,Database URLs,App settings (like production or development mode),sensitive data that can't be made accessible even if source code is open to public.

 In Create React App (CRA), environment variables must begin with the prefix REACT_APP_  .Access them in your React code using process.env.REACT_APP_API_URL
 In Vite, the required prefix for environment variables is VITE_. For example, you might write VITE_API_URL=https://api.example.com in your .env file. These variables are accessed using import.meta.env.VITE_API_URL in your code.


 conf created to export env variables 

services are in appwrite folder. we try to avoid vendor lock in . most of the code is in documenatation of appwrite  refer to it but we modify it to avoid vendor lock in . Client and account are basic so we import it


register is used to connect your input field to React Hook Form.
<input {...register("username")} />
Track the input’s value under the name username .Manage its state internally — no need for useState

handleSubmit wraps your form's submit handler to Collect all input values,Pass those values to your function.Prevents the default form submit (event.preventDefault())
Gathers all the data from inputs registered using register()
Validates the data (based on the rules you gave)
If valid ➜ calls your onSubmit(data) with the input values


watch(...) sets up a listener on all fields.Every time any field changes, this callback runs.You check if (name === "title") so we take action only when the title input changes.setValue to update value of slug




/////////////////////debug
Images Not Displaying / Broken Image Icons
Cause: Wrong attribute name (featuredImage vs featuredimage), Appwrite permissions, and using the wrong endpoint (/preview instead of /view).
Solution:
Fixed attribute name to match Appwrite.
Switched image URLs to use the /view endpoint.
Set Appwrite storage bucket/file permissions to allow public read (role:all)


On current (v1.5+) or Appwrite Cloud 14.x, use createEmailPasswordSession(...) instead of account.createEmailSession(...)

Appwrite File Preview Issue
Cause: Using getFilePreview (the /preview endpoint) for images, which is blocked or limited on free Appwrite plans and can cause CORS issues.
Solution: Switched all image display logic to use getFileView (the /view endpoint), which works reliably for public images and avoids CORS problems.

Log in tinyMCE and put its API in RTE.jsx

Git Case Sensitivity Issues
Cause: Import paths like "./Header/header" or "./postForm/PostForm" did not match actual folder/file casing.

Set the bucket's permissions to allow "read" for "role:all" (for public images) or for the specific user/role that should have access.
