
export const ProfileUser = ({user, dayPost}) => {

    return (
            <a className={`flex items-center gap-[23.9px]`} href={`https://github.com/${user.login}`} target='_blank' rel="noreferrer">
                <img src={user?.photo} alt={`Foto de perfil do usuário ${user?.name}`} className={`rounded-full size-[60px]`}/>
                <div className={`gap items-center`}>
                    <p className={`text-white break-all line-clamp-1`}>{user?.name}</p>
                    <p className={`text-white break-all line-clamp-1`}>{dayPost}</p> 
                    {/* Inserir Funcionalidade de calculo da horas / dias da postagem atual ate o momneto atual. */}
                </div>
            </a>
    );
}