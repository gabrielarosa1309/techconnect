import React, { useContext , useState } from "react";
import Background, { BgType } from "../../Components/Background";
import { News } from "./Components/News";
import { ViewPost } from "../../Components/ViewPost"
import { Friends } from "./Components/Friends"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import logoSymbol from "../../assets/images/logo_symbol.svg"
import context from "../../context/context";
import Header from "../Home/Components/Header"

const Home = () => {
    const { user } = useContext(context)
    const [isOpenNews, setIsOpenNews] = useState(false)

    return (
        <>
            <Background bgType={BgType.home} isHidden={!isOpenNews}>
                <Header setIsOpenNews={setIsOpenNews} isOpenNews={isOpenNews} />
                <div className={`flex mx-[5%] max-lg:m-0 max-lg:mt-[20px] max-lg:mb-[20px] gap-[4%] justify-between`}>
                    <div className={`flex flex-[12] flex-col gap-[20px]`}>
                        <ViewPost />
                    </div>
                    <div className={`flex flex-col flex-[5]  max-w-[370px] max-lg:w-full max-lg:fixed max-lg:z-10 ${isOpenNews ? 'max-lg:right-0' : 'max-lg:left-[100%]'} max-lg:bg-complementary-gray max-lg:h-full  max-lg:top-[0px] max-lg:w-full max-lg:items-center max-lg:justify-start max-lg:transition-all max-lg:bg-bgGradient max-lg:overflow-auto max-lg:px-4 max-lg:py-[30px]`}>
                        <button className="flex gap-3 items-center absolute top-4 right-10 max-lg:z-50 lg:hidden" onClick={() => setIsOpenNews(!isOpenNews)}>
                            <FontAwesomeIcon style={{ color: "white", fontSize: "25px", textAlign: "center", paddingTop: "5px" }} icon={faClose} />
                        </button>
                        <div className="flex justify-center items-center lg:hidden">
                            <img src={logoSymbol} alt="logo" />
                        </div>
                        <News />
                        <Friends
                            listFriends={user}
                        />
                    </div>
                </div>
            </Background >
        </>
    )
}

export default Home;