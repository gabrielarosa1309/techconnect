import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Paragraph } from '../../../Components/Fonts'
import { faComment } from "@fortawesome/free-regular-svg-icons";

export default function Comment({ postId, posts, newComent, coments }) {

    const [commentQuantity, setCommentQuantity] = useState(0)

    async function getCommentsQuantity(params) {
        await fetch(`http://localhost:3000/comment/?id_post=${postId}`)
            .then((response) => response.json())
            .then((data) => {
                setCommentQuantity(data.length)
                console.log("sucesso quantidade comentarios")
            })
            .catch(error => {
                setCommentQuantity(0)
                console.log("erro ao buscar quantidade comentarios", error)
            })
    }

    useEffect(() => {
        getCommentsQuantity()
    }, [postId, posts, newComent, coments])

    return (
        <div className="flex items-center gap-[12px]">
            <FontAwesomeIcon
                icon={faComment}
                className="text-[25px]"
                inverse
            />
            <Paragraph size={16}>{commentQuantity}  Comentários</Paragraph>
        
        </div>
    )
}
