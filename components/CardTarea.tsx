import { Tarea, TareaContext, TareasContexts } from "@/contexts/ListContext";
import React, { useContext } from "react";
import Check from "./icon/Check";

import styles from "@/styles/cardTarea.module.scss";
import Cross from "./icon/Cross";

export default function CardTarea(props: Tarea) {
  const { updateTarea, deleteTarea } = useContext(
    TareaContext
  ) as TareasContexts;

  const handleClickChecked = () => {
    updateTarea(props.id);
  };

  const handleClickCross = () => {
    deleteTarea(props.id);
  };

  return (
    <li className={styles.containTarea}>
      <div className={styles.containChecked}>
        <button
          className={props.status ? styles.buttonTrue : styles.buttonCheck}
          onClick={handleClickChecked}
        >
          {props.status && <Check />}
        </button>
      </div>
      <div className={styles.textTarea}>
        <p className={props.status ? styles.active : ""}>{props.text}</p>
      </div>
      <div>
        <button className={styles.buttonDelete} onClick={handleClickCross}>
          <Cross />
        </button>
      </div>
    </li>
  );
}
