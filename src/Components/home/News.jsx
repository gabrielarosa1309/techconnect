import React, { useEffect, useState } from "react";
import { Title } from "../../../Components/Fonts"


export const News = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {

        const fetchNews = async () => {
            try {
                const apiKey = "c990c083498b498e830b8bda50dd322c";
                const response = await fetch(`https://newsapi.org/v2/everything?q=programação OR desenvolvimento de software OR python OR javascript OR devops OR computação em nuvem&language=pt&apiKey=${apiKey}`);
                const data = await response.json();
                // console.log(data.articles)
                setNews(data.articles.slice(1,4));
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    function formatTimeDifference(publishedAt) {
        const now = new Date();
        const publishedDate = new Date(publishedAt);

        const diffInMilliseconds = now - publishedDate;
    
        const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      
      
        if (days > 0) {
          return `${days} dia${days > 1 ? 's' : ''} atrás`;
        }
          
        const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    
        if (hours > 0) {
          return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
        } else {
          const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
          return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
        }
      }

    return (
        <div>
            <Title styles={"p-10 text-[40px]"}>Notícias</Title>
            <div className="w-[100%] p-[13px] bg-[#15133A] rounded-[12px] flex justify-center center">
                <div className="p-[10px] flex flex-col gap-3 w-[100%]">
             
                    {news.map((article, index) => (
                        <a href={article.url} target="_blank" rel="noreferrer" key={index} className="flex flex-col gap-1 w-[92%]">
                            <p className="text-[white] overflow-hidden font-semibold">
                                {article.title || "Título não disponível"}
                            </p>
                            <p className="text-[white] overflow-hidden font-thin">
                
                                {formatTimeDifference(article.publishedAt)} • {article.author}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );

}