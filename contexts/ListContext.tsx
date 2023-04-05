import * as React from "react";
import { tareasInitial } from "@/pages/api/hello";

export interface Tarea {
  id: number;
  text: string;
  status: boolean;
}

export type TareasContexts = {
  tareas: Tarea[];
  addTarea: (tarea: Tarea) => void;
  updateTarea: (id: number) => void;
  deleteTarea: (id: number) => void;
  deleteChecked: () => void;
};

export const TareaContext = React.createContext<TareasContexts | null>(null);

interface MyComponentProps {
  children: React.ReactNode;
}

function TareaProvider({ children }: MyComponentProps): JSX.Element {
  const [tareas, setTareas] = React.useState<Tarea[]>(tareasInitial);

  const addTarea = (tarea: Tarea) => {
    const nuevaTarea = {
      id: Math.random(),
      text: tarea.text,
      status: tarea.status,
    };

    setTareas([...tareas, nuevaTarea]);
  };

  const updateTarea = (id: number) => {
    const newList = tareas.map((tarea: Tarea) =>
      tarea.id == id ? { ...tarea, status: !tarea.status } : tarea
    );
    setTareas(newList);
  };

  const deleteTarea = (id: number) => {
    const newList = tareas.filter((tarea: Tarea) => tarea.id != id);
    setTareas(newList);
  };

  const deleteChecked = () => {
    const newList = tareas.filter((tarea: Tarea) => tarea.status != true);
    setTareas(newList);
  };

  return (
    <TareaContext.Provider
      value={{ tareas, addTarea, updateTarea, deleteTarea, deleteChecked }}
    >
      {children}
    </TareaContext.Provider>
  );
}

export default TareaProvider;
