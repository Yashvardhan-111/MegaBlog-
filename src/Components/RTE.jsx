import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';

//editor to edit the text for posts
//documentation used . Control is of similar use as forward ref
//Controller a feature of react hook form Helps integrate 3rd-party inputs like TinyMCE
//plugins and toolbar have the features of editor

//Since <Editor /> is not a plain <input />, RHF can’t just use register().
//TinyMCE uses onEditorChange instead of onChange
//When the user types or formats text, onEditorChange fires → react hook form’s onChange 
// onChange (RHF)	Updates form state(anmed content) when value changes
export default function RTE({name, control, label, defaultValue =""}) {
  // Replace with your actual TinyMCE API key
  const TINYMCE_API_KEY = "op4nk9n21f73698dl30h17e6jpi9ru7o1xs583ybpl4627ag";
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        apiKey={TINYMCE_API_KEY}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}