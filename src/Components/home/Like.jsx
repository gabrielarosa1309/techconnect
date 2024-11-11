import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartRed } from "@fortawesome/free-solid-svg-icons";
import { Paragraph } from '../../../components/Fonts';
import { v4 as uuid } from 'uuid'
import context from "../../../context/context";

export default function Like({ postId, posts }) {
    const { user } = useContext(context);

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likeId, setLikeId] = useState();
    const [animateHeart, setAnimateHeart] = useState(false); // Novo estado para animação

    async function likePost(postId) {
        const likeData = {
            id: uuid(),
            id_user: user.id,
            id_post: postId
        };
        try {
            const response = await fetch("http://localhost:3000/likes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(likeData)
            });

            if (!response.ok) {
                alert("Erro ao adicionar like");
                return;
            }
            const data = await response.json();
            console.log("Like adicionado:");
            setLikeId(data.id);
            setAnimateHeart(true); 
            getLikesPost(postId);

        } catch (error) {
            console.log("Erro ao adicionar o like: " + error);
        }
    };

    async function deslikePost() {
        try {
            const response = await fetch(`http://localhost:3000/likes/${likeId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro:', errorData);
                alert("Erro ao remover like: " + errorData.message || "Erro desconhecido");
                return;
            }

            console.log("Like removido");
            getLikesPost(postId);

        } catch (error) {
            console.log("Erro ao remover o like: " + error);
        }
    }

    async function getLikesPost(postId) {
        try {
            const response = await fetch("http://localhost:3000/likes");

            if (!response.ok) {
                throw new Error("Erro ao buscar os likes");
            }

            const likes = await response.json();

            const likesForPost = likes.filter(like => like.id_post === postId);
            const likeCount = likesForPost.length;
            setLikesCount(prev => ({ ...prev, [postId]: likeCount }));

            const userLike = likesForPost.find(like => like.id_user === user.id);
            if (userLike) {
                setLiked(true);
                setLikeId(userLike.id);
            } else {
                setLiked(false);
            }

        } catch (error) {
            console.error("Erro ao buscar os likes: ", error);
        }
    }

    useEffect(() => {
        if (animateHeart) {
            const timeout = setTimeout(() => setAnimateHeart(false), 300); // Duração da animação
            return () => clearTimeout(timeout);
        }
    }, [animateHeart]);

    useEffect(() => {
        getLikesPost(postId);
    }, [posts, postId]);

    return (
        <div 
            className="flex items-center gap-[12px] cursor-pointer"
            onClick={liked ? () => deslikePost() : () => likePost(postId)}
        >
            <FontAwesomeIcon
                icon={liked ? faHeartRed : faHeart}
                className={`text-[25px] transition-transform duration-300 ease-in-out transform ${animateHeart ? "scale-125" : ""}`} 
                style={{ color: liked ? "red" : "white" }}
            />

            <Paragraph size={16}>
                {likesCount[postId] || 0}  Curtidas
            </Paragraph>
        </div>
    )
}
