import {
  faFloppyDisk,
  faPen,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import context from "../context/context.js";
import InputText from "./InputTextArea.tsx";
import 'react-toastify/dist/ReactToastify.css';
import { postErroToSave } from "../pages/Home/components/FormComment.jsx";
import Like from "../pages/Home/components/Like.jsx";
import Comment from "../pages/Home/components/Comment.jsx";
import Button from "./Button.jsx";
import { Paragraph } from "./Fonts.jsx";
import { v4 as uuid } from "uuid";


export default function Comments({
  idPost,
  dayPost,
  calcDaysPost,
  posts,
  setExpandedIdPost,
  expandedIdPost
}) {
  const { user } = useContext(context);

  const [comments, setComments] = useState([]);
  const [coment, setComment] = useState("");
  const [commentCount, setCommentCout] = useState();
  const [newComent, setNewComment] = useState({});
  // const [showMoreComment, setShowMoreComment] = useState()
  const [showAll, setShowAll] = useState(false);
  let showMoreComment;

  const [showEdit, setShowEdit] = useState(false);
  function handleCommentCount(count) {
    setCommentCout(count);
  }

  const [commentId, setCommentId] = useState();

  const [commentUpdate, setCommenteUpdate] = useState("");

  async function getComments() {
    // console.log("Post ID : " + idPost);
    await fetch(`http://localhost:3000/comment/?id_post=${idPost}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // data.forEach(comentario => {
          //   console.log(comentario.id_post)
          //   console.log(comentario.commentDescription)
          // });
          setComments(
            data.sort(function (a, b) {

              if (new Date(a.commentDate) < new Date(b.commentDate)) {
                return 1;
              }
              if (new Date(a.commentDate) > new Date(b.commentDate)) {
                return -1;
              }
              return 0;
            })
          );

          handleCommentCount(data.length);
        }
      })
      .catch((error) => console.log("Erro ao obter dados dos comentarios"));
  }

  async function removeComments(id) {
    fetch("http://localhost:3000/comment/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(comments);
        console.log("Item deletado com sucesso: " + data);
        const updateComments = comments.filter((item) => item.id !== id)
        setComments(updateComments);
        setCommentCout(updateComments.length)
      })
      .catch((error) =>
        console.log(
          `Erro ao deletar
Error: ${error}
`
        )
      );
  }

  async function updateComments(id, comment) {

    const data = {
      ...comment,
      commentDescription: commentUpdate
    }

    await fetch("http://localhost:3000/comment/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        console.log("Cadastrado com sucesso!")
        setCommenteUpdate("");
        setCommentId()
      })
      .catch(error => console.log("Erro ao salvar alterações"))
  }

  async function postComment(e, post_id) {
    e.preventDefault();
    if (coment.trim() !== "") {
      await fetch("http://localhost:3000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuid(),
          user: user,
          id_post: post_id,
          commentDescription: coment,
          commentDate: new Date().toLocaleString(),
        }),
      });

      setNewComment({
        id: uuid(),
        user: user,
        id_post: post_id,
        commentDescription: coment,
        commentDate: new Date().toLocaleString(),
      });

      setComment("");
    } else {
      postErroToSave();
    }
  }

  useEffect(() => {
    getComments();
  }, [newComent, commentId, commentUpdate, posts, expandedIdPost, commentCount]);

  useEffect(() => {
    setShowAll(false); // Resetar a exibição de todos os comentários
    setExpandedIdPost(null); // Desmarcar o post expandido
  }, [idPost]);

  useEffect(() => {
    if (expandedIdPost === idPost) {
      setShowAll(true)
    }
  }, [expandedIdPost]);
  
  showMoreComment = showAll && expandedIdPost === idPost ? comments : comments.slice(0, 3)
  return showMoreComment ?
    <>
      <div className="flex gap-[26px] w-full">

        <Like postId={idPost} posts={posts} />

        <Comment coments={comments} newComent={newComent} postId={idPost} posts={posts} />
      </div>
      <form
        onSubmit={(e) => postComment(e, idPost)}
        className="flex items-start w-full gap-[33px] max-lg:flex-col max-lg:gap-3"
      >
        <InputText
          placeholder={"Deixe seu comentário"}
          styles={"flex flex-[5]"}
          textValue={coment}
          setValue={setComment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button styles={"flex flex-[1] "}>
          <Paragraph>Enviar</Paragraph>
        </Button>
      </form>
      {showMoreComment.map((comment, index) => {
        // console.log("id do post " + comment.id_post)
        console.log("quantidade de comentarios: "+commentCount)
        return (
          comment.id_post === idPost ? <div key={index} className="w-full">
            <div className={`flex gap-[23.9px]`}>
              <img
                src={comment?.user?.photo}
                alt={`Foto de perfil do usuário ${comment?.user?.name}`}
                className={`rounded-full size-[50px]`}
              />
              <div className="w-full flex flex-col gap-[10px]">
                <div className={`gap justify-between flex gap-[5px]`}>
                  <div className={`flex item gap-[5px]`}>
                    <p className={`text-white break-all line-clamp-1`}>
                      {comment?.user?.name}
                    </p>
                    <p className={`text-white break-all line-clamp-1`}>•</p>
                    <p className={`text-white break-all line-clamp-1`}>
                      {calcDaysPost(comment.commentDate)}
                    </p>
                    {/* Inserir Funcionalidade de calculo da horas / dias da postagem atual ate o momneto atual. */}
                  </div>

                  {user?.id === comment?.user?.id ? (
                    <div className={`flex gap-[10px]`}>
                      {comment.id === commentId ? (
                        <div className={`flex gap-[10px]`}>
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className={`cursor-pointer text-[16px] p-[8px] text-[#FFF]`}
                            onClick={() => {
                              if (commentUpdate.trim()) {
                                updateComments(commentId, comment)
                              } else {
                                postErroToSave();
                              }
                            }}
                          />
                          <FontAwesomeIcon
                            icon={faXmark}
                            className={`cursor-pointer text-[16px] p-[8px] text-[#FFF]`}
                            onClick={() => {
                              setCommenteUpdate("")
                              setCommentId()
                            }}
                          />
                        </div>
                      ) : (
                        <FontAwesomeIcon
                          icon={faPen}
                          className={`cursor-pointer text-[16px] p-[8px] text-[#FFF]`}
                          onClick={() => {
                            console.log("valor de id do comment = " + comment.id);
                            setCommentId(comment.id);
                            setCommenteUpdate(comment.commentDescription);
                          }}
                        />
                      )}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={`cursor-pointer text-[16px] p-[8px] text-[#FFF]`}
                        onClick={() => removeComments(comment.id)}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {comment.id === commentId ? (
                  <InputText
                    placeholder={"Deixe seu comentário"}
                    styles={"flex flex-[5]"}
                    textValue={commentUpdate}
                    setValue={setCommenteUpdate}
                    onChange={(e) => {
                      setCommenteUpdate(e.target.value)
                    }}
                  />
                ) : (
                  <p className={`text-white  whitespace-pre-wrapd`}
                    style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                  >
                    {comment.commentDescription}
                  </p>
                )}
              </div>
            </div>
          </div> : <></>
        );

      })}

      {commentCount > 3 && expandedIdPost != idPost ? <p className="text-white hover:text-blue-500 break-all w-full underline cursor-pointer" 
      onClick={() => {
        setShowAll(true)
        setExpandedIdPost(idPost)
      }
        
        }>Exibir mais</p> : <></>}
    </>

    : (
      <></>
    );
}
