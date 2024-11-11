import { useEffect, useRef, useState } from "react";

export const ContentPost = ({ description, posts, idpost,setExpandedIdPost, expandedIdPost }) => {
  const [viewFullText, setViewFullText] = useState("");
  const [viewMore, setViewMore] = useState("");
  const descriptionRef = useRef(null);

  /**
   * Exibe o conteúdo completo do texto ao remover a classe de limitação de linhas.
   * Também esconde o botão ou link que exibe mais conteúdo.
   *
   * @function
   * @returns {void}
   */
  function viewContentFull() { 
    setExpandedIdPost(idpost)   
    setViewFullText("line-clamp-none")
    setViewMore("hidden")
  }

  /**
   * Verifica se o texto foi truncado (cortado) devido à limitação de altura imposta pela classe CSS.
   * Compara o `scrollHeight` (altura total do conteúdo, incluindo a parte oculta) com o `clientHeight` (altura visível).
   * Se o conteúdo for maior que a área visível, mostra o botão "ver mais".
   * Caso contrário, o botão "ver mais" é ocultado.
   *
   * @function
   * @returns {void}
   */
  function verifyTextTruncate() {
    // Obtendo acesso ao texto elemento que contem o texto.
    const element = descriptionRef.current;

    if (element && element.scrollHeight > element.clientHeight) {
      setViewMore(""); // Mostra o botão 'ver mais' se o texto for cortado
    } else {
      setViewMore("hidden"); // Esconde o botão 'ver mais' se o texto não for cortado
    }
  }

  useEffect(() => {
    verifyTextTruncate();
  }, [posts,expandedIdPost]);

  return (
    <div className="flex flex-col items-end w-full ">
      <p
        ref={descriptionRef}
        className={`w-full whitespace-pre-wrap text-[#FFF] ${idpost === expandedIdPost ? viewFullText : "line-clamp-3"}`}
        style={{overflowWrap: "break-word", wordBreak: "break-word"}}
      >
        {description}
      </p>
      <span
        className={`text-[#FFF] hover:text-blue-500 cursor-pointer underline w-max ${viewMore}`}
        onClick={()=>{
          viewContentFull()         
        }}
      >
        Ver mais
      </span>
    </div>
  );
};
