import React, { useCallback } from 'react'
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//form to edit or create post . if edit then existing post is passed
export default function PostForm( {post} ) {
    //all these hook form features to manage inputs
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {/////data from RHF
        if (post) {                 // if post already existed(editing) upload new img(if present) and delete old
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            console.log('uploaded file:', file);
            let updateData = { ...data };
            // Remove image file object from updateData before sending to Appwrite
            delete updateData.image;
            if (file && file.$id) {
                if (post.featuredimage) {
                    appwriteService.deleteFile(post.featuredimage);
                }
                updateData.featuredimage = file.$id;
            }
            //update post , can check parameters in config 
            const dbPost = await appwriteService.updatePost(post.$id, updateData);
            console.log('updated dbPost:', dbPost);
            if (dbPost) {//if updated navigate
                navigate(`/post/${dbPost.$id}`);
            }
        } else {        //new post
            const file = await appwriteService.uploadFile(data.image[0]);
            console.log('uploaded file:', file);
            if (file && file.$id) {
                data.featuredimage = file.$id;
                // Remove image file object from data before sending to Appwrite
                delete data.image;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData?.$id });
                console.log('created dbPost:', dbPost);
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                console.log('File upload failed or file.$id missing:', file);
            }
        }
    };

    //the title is turned to slug 
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()                             //extra space 
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")    //regEx to convert space into -
                .replace(/\s/g, "-");

        return "";
    }, []);

    //calling slugTransform ...confusing
    //watch(...) sets up a listener on all fields.Every time any field changes, this callback runs.
    // You check if (name === "title") so we take action only when the title input changes.
    // setValue to update value of slug
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    //slug input has onInput This allows manual editing of the slug by typing it .
  return (
    <form onSubmit={handleSubmit(submit, (errors) => { console.log('form errors:', errors); })} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {//
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {/* Show preview of newly selected image, else show post.featuredimage if exists */}
                {post && (
                    <div className="w-full mb-4">
                        {(() => {
                            const imgFile = watch("image") && watch("image")[0];
                            if (imgFile) {
                                const previewUrl = URL.createObjectURL(imgFile);
                                console.log("[DEBUG] Showing preview for selected file:", previewUrl);
                                return (
                                    <img
                                        src={previewUrl}
                                        alt={post.title}
                                        className="rounded-lg"
                                    />
                                );
                            } else if (post.featuredimage) {
                                const viewUrl = appwriteService.getFileView(post.featuredimage);
                                return (
                                    <img
                                        src={viewUrl}
                                        alt={post.title}
                                        className="rounded-lg"
                                    />
                                );
                            } else {
                                console.log("[DEBUG] No image to preview for this post.");
                                return null;
                            }
                        })()}
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

