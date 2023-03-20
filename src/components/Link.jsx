import { useEffect, useRef, useState } from "react";
import style from "./link.module.css";

export default function Link({ docId, title, url, onDelete, onUpdate }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [editTitle]);

  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.focus();
    }
  }, [editUrl]);

  //-------funciones--------

  function handleEditTitle() {
    setEditTitle(true);
  }
  function handleEditUrl() {
    setEditUrl(true);
  }

  function handleChangeTitle(e) {
    setCurrentTitle(e.target.value);
  }

  function handleChangeUrl(e) {
    setCurrentUrl(e.target.value);
  }

  function handleBlurTitle(e) {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  }
  function handleBlurUrl(e) {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleDelete() {
    onDelete(docId);
  }
  //---------------------------

  return (
    <div className={style.link}>
      <div className={style.linkInfo}>



        <div className={style.linkTitle}>
          {editTitle ? (
            <>
              <input
                type={"text"}
                ref={titleRef}
                value={currentTitle}
                onChange={handleChangeTitle}
                onBlur={handleBlurTitle}
              />
            </>
          ) : (
            <div className={style.actions}>
              <button className={style.btnEdit} onClick={handleEditTitle}>
                <span className="material-icons">edit</span>
              </button>
              <p>{currentTitle}</p>
            </div>
          )}
        </div>

        
        <div className={style.linkUrl}>
          {editUrl ? (
            <>
              <input
                type={"text"}
                ref={urlRef}
                value={currentUrl}
                onChange={handleChangeUrl}
                onBlur={handleBlurUrl}
              />
            </>
          ) : (
            <div className={style.actions}>
              <button className={style.btnEdit} onClick={handleEditUrl}>
                <span className="material-icons">edit</span>
              </button>
              <p>{currentUrl}</p>
            </div>
          )}
        </div>
      </div>

      <div className={style.linkActions}>
        <button className={style.btnDelete} onClick={handleDelete}>
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
}
