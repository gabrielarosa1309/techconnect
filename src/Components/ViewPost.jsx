import { useContext, useEffect, useState } from "react";
import { TopPost } from "./TopPost";
import { ContentPost } from "./ContentPost";
import PostForm from "../pages/Home/Components/PostForm.jsx";
import context from "../context/context";
import Input, { InputFile, InputFileEdit } from "./Input";
import Button from "./Button";
import FormComment from "../pages/Home/Components/FormComment.jsx";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { CreateImageFile } from "../configAzure/serverconfig";
import InputText from "./InputTextArea.tsx";


export const ViewPost = () => {

  const [posts, setPosts] = useState([]);

  const { user } = useContext(context);


  //Edicao do post
  const [openEditModal, setOpenEditModal] = useState(false);
  const [updatedDescription, setUpdateDescripton] = useState("")
  const [updatedDescriptionI, setUpdateDescriptonI] = useState("")
  const [postPosition, setPostPosition] = useState();
  const [expandedIdPost, setExpandedIdPost] = useState();
  const [deletePhoto, setDeletePhoto] = useState(false);
  const [styles, setStyles] = useState("")
  const [styles2, setStyles2] = useState("hidden")

  //Delete do post
  const [deletedPostId, setDeletedPost] = useState()


  const [file, setFile] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [validationText, setValidationText] = useState(null);

  const [editImageOption, setEditImageOption] = useState('')




  const selectImage = (e) => {
    e.preventDefault();

    setValidationText(null);

    setFile(e.target.files[0]);

    setImagePreview2(URL.createObjectURL(e.target.files[0]));

    setEditImageOption("imagemSelecionada");


  }

  const imageUpload = async () => {

    try {
      if (file) {
        const urlImage = await CreateImageFile(file);

        if (urlImage) {
          return urlImage;
        }
      };

      return null;
    } catch {

      console.log("Erro ao carregar imagem no azure");
      return null;
    }
  }



  function handleDelete(post) {
    setDeletedPost(post.id)
    fetch(`http://localHost:3000/post/${post.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(json => console.log(json))
    DeleteComments(post.id)

  }

  async function DeleteComments(postId) {
    try {
      const responseComments = await fetch(`http://localhost:3000/comment?id_post=${postId}`);
      const comments = await responseComments.json();

      if (comments.length === 0) {
        console.log("Nenhum comentário encontrado para excluir.");
        return;
      }

      const postExists = await (await fetch("http://localhost:3000/post")).json()
        .then(posts => posts.some(post => post.id === postId));

      if (!postExists) {
        await Promise.all(comments.map(comment =>
          fetch(`http://localhost:3000/comment/${comment.id}`, { method: 'DELETE' })
        ));
        console.log(`Comentários excluídos para o post ID: ${postId}`);
      }
    } catch (error) {
      console.error("Erro ao excluir comentários:", error);
    }
  }

  function ModalHandle(index) {
    setOpenEditModal(true)
    setPostPosition(index)
    setStyles("hidden")
    setStyles2("")
  }

  function handleCancelEdit(params) {
    setStyles("")
    setStyles2("hidden")
    setOpenEditModal(false)
    
  }

  async function handleEdit(post) {


    if (updatedDescription === '' && file === null) {
      setValidationText("Digite algo ou insira uma foto para publicar");
    }
    else {

      setUpdateDescriptonI(post.postDescription)




      const url = await imageUpload();

      const data = {
        id: post.id,
        postDescription: updatedDescription,
        user: post.user,
        postDate: post.postDate,
        photo: url
      };

      fetch(`http://localhost:3000/post/${post.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data)
        });

      setOpenEditModal(false)
      console.log(data);
    }
  }

  async function getPost() {
    await fetch("http://localhost:3000/post")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setPosts(data.sort((function (a, b) {
          if (new Date(a.postDate) < new Date(b.postDate)) {
            return 1;
          }
          if (new Date(a.postDate) > new Date(b.postDate)) {
            return -1;
          }
          return 0;
        })));
      })
      .catch(error => console.log("Erro ao obter acesso aos post."));
  }

  const formatData = (dataStr) => {
    // Separar a parte da data e da hora
    const [date, hour] = dataStr.split(", ");

    // Separar dia, mês e ano
    const [day, month, year] = date.split("/");

    // Retornar no formato que o JavaScript entende: "YYYY-MM-DDTHH:MM:SS"
    return `${year}-${month}-${day}T${hour}`;
  };

  function calcDaysPost(postDate) {
    const post_date = new Date(formatData(postDate));

    //Obter a data e hora atuais
    const current_date = new Date();

    const diferenceMilisecond = current_date - post_date; // Calcular a diferença

    const min = Math.floor(diferenceMilisecond / (1000 * 60));
    const hours = Math.floor(diferenceMilisecond / (1000 * 60 * 60));
    const days = Math.floor(diferenceMilisecond / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);

    if (months >= 1) {
      return `Postado há ${months} mês(es)`;
    } else if (days >= 1) {
      return `Postado há ${days} dia(s)`;
    } else if (hours >= 1) {
      return `Postado há ${hours} hora(s)`;
    } else {
      return `Postado há ${min} minuto(s)`;
    }
  }

  useEffect(() => {
    getPost();

  }, [openEditModal, deletedPostId]);

  // Logica dos botoes de excluir imagem e texto

  const cancelPostInput = (e, input) => {
  
    e.preventDefault();
    if (input == "texto") {
        setUpdateDescripton('');
        setValidationText(false);
    }

    if (input == "foto") {
        setImagePreview2(null);
        setFile(null);
        setEditImageOption("semImagem");
        setDeletePhoto(false);
    }
}

  useEffect(() => {
    if (updatedDescription === '') {
      setValidationText(false);
    }
    else {
      setValidationText(true);
    }

    if (imagePreview2 === null) {
      setDeletePhoto(false);
    }
    else {
      setDeletePhoto(true);
    }
  }, [updatedDescription, imagePreview2]);

  return (
    <>
      <PostForm getPosts={getPost} />
      {posts.map((post, index) => {
        return (

          <div
            key={index}
            className={`bg-[#D4D4D4]/[0.08] backdrop-blur-[40px] p-[20px] max-lg:p-4 flex flex-col items-center gap-[21px] rounded-[12px] max-lg:rounded-none`}
          >

            <TopPost
              handleEdit={() => { ModalHandle(index) }}
              handleDelete={() => handleDelete(post)}
              handleCancelEdit={() =>{ handleCancelEdit()}}
              dayPost={calcDaysPost(post?.postDate)}
              user={post?.user}
              styles={styles}
              styles2={styles2}
              displayNone={post?.user?.id === user?.id ? true : false}
            />
            <ContentPost expandedIdPost={expandedIdPost} setExpandedIdPost={setExpandedIdPost} posts={posts} idpost={post.id} description={post.postDescription} />

            {openEditModal && index === postPosition ? (<div className="flex flex-col max-w-[800px] w-[100%] gap-5">
              <InputText

                styles={"flex flex-[5]"}
                textValue={updatedDescription}
                setValue={setUpdateDescripton}
                onChange={(e) => {
                  setUpdateDescripton(e.target.value);
                }}
              />



              {
                editImageOption === 'semImagem' ?
                  (
                    <>
                    </>
                  ) : editImageOption === 'imagemSelecionada' ?
                    (
                      <div className="flex w-full justify-center ">
                        <img className="rounded-xl" src={imagePreview2} alt="Imagem que vai ser carregada" />
                      </div>
                    ) : (
                      <>
                        {
                          post?.photo ? (
                            <img
                              className={`max-h-[471px] rounded`}
                              src={post?.photo}
                              alt="Imagem refetente ao post"
                            />

                          ) : (
                            <></>
                          )
                        }
                      </>
                    )
              }

              {/* Botoes de Cancelar postagem e Excluir botao */}
              <div className="flex justify-end gap-3">
                {
                  validationText === false ?
                    (
                      <></>
                    ) :
                    (
                      <p onClick={(e) => cancelPostInput(e, "texto")} className={`text-[13px] font-normal text-complementary-white italic underline cursor-pointer`}>
                        Cancelar
                      </p>
                    )
                }

                {
                  deletePhoto === false ?
                    (
                      <></>
                    ) :
                    (
                      <p onClick={(e) => cancelPostInput(e, "foto")} className={`text-[13px] font-normal text-complementary-white italic underline text cursor-pointer`}>
                        Excluir foto
                      </p>
                    )
                }
              </div>

              <div className="flex items-center justify-between max-w-[800px] w-[100%]">
                {/* Botao upload de imagem */}
                <InputFileEdit
                  icon={faImage}
                  id="input-file-edit"
                  onChange={e => selectImage(e)}
                />

                <Button styles={"max-w-[350px] w-[100%] h-[40px]"} onClick={() => handleEdit(post)}>salvar</Button>
              </div>




            </div>) : (<div className="flex flex-col max-w-[800px] w-[100%] gap-5">



              {post?.photo ? (
                <img
                  className={`max-h-[471px] rounded`}
                  src={post?.photo}
                  alt="Imagem refetente ao post"
                />)

                :

                (<></>)}

            </div>)}








            <FormComment
              posts={posts}
              postId={post.id}
              calcDaysPost={calcDaysPost}
              setExpandedIdPost={setExpandedIdPost}
              expandedIdPost={expandedIdPost}
            />

          </div>
        );
      })}
    </>
  );
};
