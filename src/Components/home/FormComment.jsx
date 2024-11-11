import React from "react";
import Comments from "../../Home/Components/Comment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export const postErroToSave = () =>
  toast(
    <div className="flex gap-[10px] items-center">
      <FontAwesomeIcon icon={faTriangleExclamation} color="red" />O campo deve
      conter no minimo 3 caracteres não nulos.
    </div>
  );


export default function FormComment({ postId, calcDaysPost, posts, setExpandedIdPost, expandedIdPost }) {



  return (
    <>

      <Comments
        posts={posts}
        idPost={postId}
        calcDaysPost={calcDaysPost} 
        setExpandedIdPost={setExpandedIdPost}
        expandedIdPost={expandedIdPost}
        
        />

    </>
  );
}
