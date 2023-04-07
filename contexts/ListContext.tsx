import * as React from "react";
import { tareasInitial } from "@/pages/api/hello";

export interface Tarea {
  id: number;
  text: string;
  status: boolean;
}

export type TareasContexts = {
  tareas: Tarea[];
  setTareas: (lista: Tarea[]) => void;
  updateOrder: (itemsOrder: Tarea[]) => void;
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
  const [tareas, setTareas] = React.useState<Tarea[]>([]);

  React.useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareaListas");
    setTareas(tareasGuardadas ? JSON.parse(tareasGuardadas) : tareasInitial);
  }, []);

  React.useEffect(() => {
    if (tareas.length != 0 && tareas !== tareasInitial) {
      localStorage.setItem("tareaListas", JSON.stringify(tareas));
    }
  }, [tareas]);

  const updateOrder = (itemsOrder: Tarea[]) => {
    setTareas(itemsOrder);
  };

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

    if (newList.length == 0) {
      localStorage.removeItem("tareaListas");
    }
  };

  const deleteChecked = () => {
    const newList = tareas.filter((tarea: Tarea) => tarea.status != true);
    setTareas(newList);
  };

  return (
    <TareaContext.Provider
      value={{
        tareas,
        setTareas,
        updateOrder,
        addTarea,
        updateTarea,
        deleteTarea,
        deleteChecked,
      }}
    >
      {children}
    </TareaContext.Provider>
  );
}

export default TareaProvider;
