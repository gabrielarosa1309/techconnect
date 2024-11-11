import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ProfileUser } from "./ProfileUser";

export const TopPost = ({user, displayNone, dayPost, handleEdit, handleDelete, styles, styles2, handleCancelEdit}) => {
    return(
        <div className={`flex justify-between items-center w-full`}>
            <ProfileUser user={user} dayPost={dayPost} />

            <div className={`gap-[35px] ${displayNone === false? "hidden" : "flex"}`}>
                <FontAwesomeIcon icon={faPen} onClick={handleEdit} className={`cursor-pointer text-[20px] p-[8px] text-[#FFF]`}/>
                <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className={`cursor-pointer text-[20px] p-[8px] text-[#FFF] ${styles}`}/>
                <FontAwesomeIcon icon={faXmark} onClick={handleCancelEdit} className={`cursor-pointer text-[20px] p-[8px] text-[#FFF] ${styles2}`}/>
            </div>
        </div>
    );
}