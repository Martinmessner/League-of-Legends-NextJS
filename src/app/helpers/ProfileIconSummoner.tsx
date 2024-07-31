import useSummonerStore from "../store/Store";
import styles from "../page.module.css";

const ProfileIcon = ({ iconId }: { iconId: string | number }) => {
  const { summonerName } = useSummonerStore();

  if (!iconId) {
    return;
  }

  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/profileicon/${String(
    iconId
  )}.png`;

  return (
    <img
      className={`${styles["profile-icon"]}`}
      width="100"
      src={iconUrl}
      alt="Icono de perfil"
      title={
        summonerName
          ? summonerName.name
          : "No se encuentra el nombre de invocador."
      }
    />
  );
};

export default ProfileIcon;
