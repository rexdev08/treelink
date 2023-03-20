import style from "./publicLink.module.css";

const PublicLink = ({ url, title }) => {


console.log(url)

  return (
    <a href={url} target={"_blank"} className={style.publicLinkContainer}>
      <div>{title}</div>
    </a>
  );
};

export default PublicLink;
