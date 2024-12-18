import Head from "next/head";
import Link from "next/link";
import Input from "@/components/Input";
import { useContext, useState, useEffect } from "react";
import { TareaContext, TareasContexts, Tarea } from "../contexts/ListContext";

import styles from "@/styles/inicio.module.scss";
import BtonTheme from "@/components/BtonTheme";
import List from "@/components/List";

type menu = "all" | "active" | "completed";

export default function Home() {
  const anio = new Date().getFullYear();
  const { tareas, deleteChecked } = useContext(TareaContext) as TareasContexts;

  const [menuActive, setMenuActive] = useState<menu>("all");

  const [contadorActive, setContadorActive] = useState<number>();

  const [listTareas, setListTareas] = useState<Tarea[]>(tareas);

  useEffect(() => {
    const newList = tareas.filter((tarea: Tarea) => tarea.status != true);

    setContadorActive(newList.length);
  }, [listTareas]);

  useEffect(() => {
    if (menuActive == "all") {
      handleAll();
    } else {
      if (menuActive == "active") {
        handleActive();
      } else {
        handleCompleted();
      }
    }
  }, [tareas]);

  const handleClickClear = () => {
    deleteChecked();
    handleAll();
  };

  const handleAll = () => {
    setListTareas(tareas);
    setMenuActive("all");
  };
  const handleActive = () => {
    const newList = tareas.filter((tarea: Tarea) => tarea.status != true);
    setListTareas(newList);
    setMenuActive("active");
  };
  const handleCompleted = () => {
    const newList = tareas.filter((tarea: Tarea) => tarea.status != false);
    setListTareas(newList);
    setMenuActive("completed");
  };

  return (
    <div className={styles.containGral}>
      <Head>
        <title>Frontend Mentor | Todo app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.mainInicio}>
        <div className={styles.imagenDeco}></div>

        <div className={styles.titleInicio}>
          <h1>TODO</h1>

          <BtonTheme />
        </div>

        <Input />

        <div className={styles.bodyTareas}>
          <List props={listTareas} menu={menuActive} />
          <div className={styles.containTablero}>
            <div className={styles.contador}>
              <p>{contadorActive} items left</p>
            </div>
            <div className={styles.filtroList}>
              <button
                className={menuActive == "all" ? styles.activeMenu : ""}
                onClick={handleAll}
              >
                All
              </button>
              <button
                className={menuActive == "active" ? styles.activeMenu : ""}
                onClick={handleActive}
              >
                Active
              </button>
              <button
                className={menuActive == "completed" ? styles.activeMenu : ""}
                onClick={handleCompleted}
              >
                Completed
              </button>
            </div>
            <div className={styles.containClear}>
              <button onClick={handleClickClear}>Clear Completed</button>
            </div>
          </div>
        </div>

        <p className={styles.dropText}>Drag and drop to reorder list</p>
      </main>

      <footer>
        <span>
          Copyright © {anio} | Hecho por{" "}
          <Link
            href="https://agueroluca.site/"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Agüero Luca
          </Link>
        </span>
      </footer>
    </div>
  );
}
