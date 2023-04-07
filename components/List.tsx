import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

import { Tarea, TareaContext, TareasContexts } from "@/contexts/ListContext";
import styles from "../styles/list.module.scss";

interface Props {
  props: Tarea[];
  menu: string;
}

export default function List({ props, menu }: Props) {
  const { updateOrder, tareas } = React.useContext(
    TareaContext
  ) as TareasContexts;

  const [items, setItems] = useState<Tarea[]>(props);

  function combinarListas(listaFiltrada: Tarea[], listaOriginal: Tarea[]) {
    const listOrdenada: Tarea[] = [];

    listaOriginal.forEach((itemTareas) => {
      if (itemTareas.id != -1) {
        listOrdenada.push(itemTareas);
      } else {
        const itemFiltrado = listaFiltrada.shift();
        if (itemFiltrado) {
          listOrdenada.push(itemFiltrado);
        }
      }
    });
    updateOrder(listOrdenada);
  }

  const update = (tareasDrag: Tarea[]) => {
    if (menu === "all") {
      updateOrder(tareasDrag);
    } else {
      if (menu === "active") {
        const taskOriginal = tareas.map((tarea: Tarea) => {
          if (tarea.status) {
            return tarea;
          } else {
            return { id: -1, text: "", status: false };
          }
        });
        combinarListas(tareasDrag, taskOriginal);
      } else {
        const taskOriginal = tareas.map((tarea: Tarea) => {
          if (tarea.status) {
            return { id: -1, text: "", status: false };
          } else {
            return tarea;
          }
        });
        combinarListas(tareasDrag, taskOriginal);
      }
    }
  };

  React.useEffect(() => {
    setItems(props);
  }, [props]);

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={update}
      className={styles.listPrincipal}
    >
      {items.length === 0 && (
        <li className={styles.mensajeVacio}>
          <p>There are no registered tasks</p>
        </li>
      )}
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Reorder.Group>
  );
}
