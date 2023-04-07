import React, { useContext, useState } from "react";
import styles from "@/styles/inputs.module.scss";
import Check from "./icon/Check";

import { TareaContext, TareasContexts } from "../contexts/ListContext";

type Tarea = {
  id: number;
  text: string;
  status: boolean;
};

export default function Input() {
  const { addTarea } = useContext(TareaContext) as TareasContexts;

  const [createTarea, setCreateTarea] = useState<Tarea>({
    id: generateRandomNumber(),
    text: "",
    status: false,
  });

  function generateRandomNumber(): number {
    const min = 1;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (createTarea.text.trim() != "") {
      addTarea(createTarea);

      setCreateTarea({ id: generateRandomNumber(), text: "", status: false });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateTarea({ ...createTarea, text: event.target.value });
  };

  const handleClick = () => {
    setCreateTarea({ ...createTarea, status: !createTarea.status });
  };

  return (
    <div className={styles.containInput}>
      <button
        className={createTarea.status ? styles.buttonTrue : styles.buttonCheck}
        onClick={handleClick}
      >
        {createTarea.status && <Check />}
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create a new todo..."
          name="tarea"
          id="tarea"
          onChange={handleChange}
          value={createTarea.text || ""}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
