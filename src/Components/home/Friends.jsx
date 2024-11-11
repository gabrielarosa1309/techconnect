import React, { useEffect, useState } from "react"
import { Paragraph, Title } from "../../../Components/Fonts"
import { octokit } from "../../../utils/githubkey"

export const Friends = ({ userName, userPhoto, profileLink, listFriends }) => {
    const [lFriends, setLFriends] = useState([])
    async function ListFriends() {
        await octokit.request(`GET /users/{username}/following`, {
            username: listFriends.login,
            headers: { "X-GitHub-Api-Version": "2022-11-28" }
        }).then(response => {
            setLFriends(response.data);
        })
            .catch(() => alert("Usuario nao encontrado, tente novamente"))
    }

    useEffect(() => {
        ListFriends();
    }, [])
   
    useEffect(() => {
    }, [lFriends])

    return (
        <div className="w-full">
            <Title styles={"p-10 text-[40px]"}>Amigos</Title>
            <div className=" backdrop-blur-sm bg-[#15133A] rounded-[12px] flex items-start justify-center flex-col overflow-invisible w-[100%]">
                {lFriends.map((item, index) => {
                    return (
                        <div key={index} className="flex gap-1">
                            <div className="p-[20px] flex">
                                <a className="cursor-pointer flex items-center gap-3" href={item.html_url} target='_blank' rel="noreferrer">  <img className="w-[40px] text-[white] overflow-hidden font-semibold rounded-full" src={item.avatar_url} alt="profileImg" />
                                <Paragraph size={16} styles={"filter-none"}>{item.login}</Paragraph>
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}