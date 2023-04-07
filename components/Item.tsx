import * as React from "react";
import { Reorder } from "framer-motion";
import { Tarea, TareaContext, TareasContexts } from "@/contexts/ListContext";

import styles from "../styles/cardTarea.module.scss";

import Check from "./icon/Check";
import Cross from "./icon/Cross";

interface Props {
  item: Tarea;
}

export const Item = ({ item }: Props) => {
  const { updateTarea, deleteTarea } = React.useContext(
    TareaContext
  ) as TareasContexts;

  const handleClickChecked = () => {
    updateTarea(item.id);
  };

  const handleClickCross = () => {
    deleteTarea(item.id);
  };

  return (
    <Reorder.Item
      value={item}
      id={item.id.toString()}
      dragElastic={0}
      className={styles.containTarea}
    >
      <div className={styles.containChecked}>
        <button
          className={item.status ? styles.buttonTrue : styles.buttonCheck}
          onClick={handleClickChecked}
        >
          {item.status && <Check />}
        </button>
      </div>
      <div className={styles.textTarea}>
        <p className={item.status ? styles.active : ""}>{item.text}</p>
      </div>
      <div>
        <button className={styles.buttonDelete} onClick={handleClickCross}>
          <Cross />
        </button>
      </div>
    </Reorder.Item>
  );
};
