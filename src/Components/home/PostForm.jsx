import GlassBox from "../../auth/components/GlassBox.jsx";
import { InputFile, InputFileEdit } from "../../../Components/Input.jsx";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Components/Button.jsx";
import { useContext, useEffect, useState } from "react";
import context from "../../../context/context.js";
import { v4 as uuid } from "uuid";
import { CreateImageFile } from "../../../configAzure/serverconfig.js";
import InputText from "../../../Components/InputTextArea.tsx";
import { Paragraph } from "../../../Components/Fonts.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostForm = ({ getPosts }) => {
    //Tenho que fazer:
    //Bug: Imagem nao aparece quando seleciona imagem depois exclui e depois seleciona a mesma imagem

    const { user } = useContext(context);
    const [post, setPost] = useState('');
    const [file, setFile] = useState(null);
    const [validationText, setValidationText] = useState(false);
    const [deletePhoto, setDeletePhoto] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(false);

    const postSucessfull = () => toast("Publicação realizada com sucesso!");

    const selectImage = (e) => {
        e.preventDefault();


        try {
            setFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        } catch (error) {
            console.log(error);
            setFile(null);
        }


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
            setButtonLoading(false);
            return null;
        }
    }

    const makePost = async (e) => {
        e.preventDefault();
        try {

                setButtonLoading(true);

                const url = await imageUpload();

                const data = {
                    postDescription: post,
                    user: user,
                    id: uuid(),
                    postDate: new Date().toLocaleString(),
                    photo: url
                };

                fetch("http://localhost:3000/post", {
                    method : "POST",
                    body : JSON.stringify(data)
                })
                .then(()=>{
                    setFile(null);
                    setImagePreview(null);
                    postSucessfull();
                    setPost('');
                    getPosts();
                   
                })    
                setButtonLoading(false);

            

        } catch (error) {
            console.log("Erro ao fazer a postagem");
            console.log(error);
            setButtonLoading(false);
        }

    }

    const cancelPostInput = (e, input) => {
        e.preventDefault();
        if (input == "texto") {
            setPost('');
            setValidationText(false);
        }

        if (input == "foto") {
            setImagePreview(null);
            setFile(null);
            setDeletePhoto(false);
        }
    }

    useEffect(() => {
        console.log(file);
        if (post === '') {
            setValidationText(false);
        }
        else {
            setValidationText(true);
        }

        if (imagePreview === null) {
            setDeletePhoto(false);
        }
        else {
            setDeletePhoto(true);
        }
    }, [post, imagePreview]);

    return (
        <div className="w-full">
            <GlassBox px={20}>
                <div className="flex flex-row gap-6 w-full items-start justify-start">

                    <img className="w-[60px] h-[60px] rounded-full max-lg:hidden" src={user.photo} alt="foto de perfil" />

                    <form onSubmit={makePost} className="w-full flex flex-col gap-5">

                        {/* Input do texto da publicacao */}

                        <InputText
                            id={"textopost"}
                            placeholder={"Comece uma publicação"}
                            textValue={post}
                            setValue={setPost}
                            onChange={(e) => {
                                setPost(e.target.value)
                            }}
                        >
                        </InputText>

                        {
                            imagePreview === null ?
                            (
                            <></>
                            ) :
                            (
                                <div className="flex w-full justify-center">
                                    <img className="rounded-xl" src={imagePreview} alt="Imagem que vai ser carregada" />
                                </div>
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
                        <div className="flex justify-between content-center" style={{ height: "25%" }}>

                            {/* Botao upload de imagem */}
                            <InputFile
                                icon={faImage}
                                id="input-file"
                                onChange={e => selectImage(e)}
                            />

                            {/* Botao para publicar */}
                            <div className="h-full w-[30%]">
                                <Button isLoading={buttonLoading} buttonType="submit" styles={`h-[40px] my-0 py-0 px-0`} fontSize="20px">
                                    <Paragraph styles={'max-lg:hidden'}>Publicar</Paragraph>
                                    <FontAwesomeIcon className="lg:hidden" icon={faPaperPlane} />
                                </Button>
                            </div>

                        </div>
                    </form>

                </div>
            </GlassBox>
        </div>
    )
}

export default PostForm;