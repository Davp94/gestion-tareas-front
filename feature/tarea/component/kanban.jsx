'use client'
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import InputTextController from '../../../common/component/input-text-controller';
import { useForm } from 'react-hook-form';
import { getTareas, createTarea, changeTareaStatus } from '../service/tarea.service'
import { useStore } from '@/state-management/store'
import Cookies from 'js-cookie'; 
import { ESTADO_TAREA } from '@/common/constant/estadoTarea.enum'

export const KanvanView = () => {
    const [tasks, setTasks] = useState([]);

    const [dragging, setDragging] = useState(false);
    const [draggedTask, setDraggedTask] = useState(null);
    const [visible, setVisible] = useState(false);
    const proyecto = useStore((state) => state.proyecto);

    const {
        control,
        getValues,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            titulo: '',
            descripcion: '',
        }
    });

    const initComponent = async() => {
        const usuarioId = Cookies.get('user');
        const dataTarea = {
            usuarioId: usuarioId,
            proyectoId: proyecto.id
        }
        const tareasList = await getTareas(dataTarea);
        console.log("🚀 ~ initComponent ~ tareasList:", tareasList)
        let dataTareas = [];
        for(const estado of ESTADO_TAREA){
            dataTareas.push({
                id: estado.name,
                name: estado.displayName,
                value: estado.value,
                items: tareasList.data.filter(tarea=>tarea.estado === estado.value)
            })
        }
        setTasks(dataTareas);
    }

    const crearTarea = async (e) => {
        e.preventDefault();
        const dataTarea = getValues();
        const usuarioId = Cookies.get('user');
        dataTarea.usuarioId = usuarioId
        dataTarea.proyectoId = proyecto.id;
        closeDialog(e);
        await createTarea(dataTarea);
        await initComponent();
    }

    const closeDialog = (e) => {
        if(e){
            e.preventDefault();
        }
        reset();
        setVisible(false);
    }
    //Dragable functions

    const handleDragStart = (columnId, task) => {
        setDragging(true);
        setDraggedTask({ task, sourceColumn: columnId });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = async (targetColumnId) => {
        if (!draggedTask) return;

        const { task, sourceColumn } = draggedTask;

        if (sourceColumn === targetColumnId) {
            setDragging(false);
            setDraggedTask(null);
            return;
        }

        await changeTareaStatus({tareaId: task.id, estadoTarea: targetColumnId});
        await initComponent();

        setDragging(false);
        setDraggedTask(null);
    };

    //HOOKS
    useEffect(() => {
      initComponent();
      return () => {}
    }, [])
    

    return (
        <div className="card p-6">
            <h1 className="font-bold mb-6">Tablero kanban</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <div key={task.id} className="flex flex-column" onDragOver={handleDragOver} onDrop={() => handleDrop(task.id)}>
                        <h4>{task.name}</h4>
                        {task.items.map((item) => (
                            <Card className="w-25rem mb-4 cursor-pointer" key={item.id} draggable onDragStart={() => handleDragStart(task.id, item)}>
                                <h6>{item.titulo}</h6>
                                <p className="m-0">{item.descripcion}</p>
                            </Card>
                        ))}
                        {task.id === 'TO_DO' && <Button label="Añadir" outlined icon="pi pi-plus" className="align-self-end" size="small" onClick={() => setVisible(true)} />}
                    </div>
                ))}
            </div>
            <Dialog visible={visible} onHide={() => closeDialog()} className="w-30rem" headerClassName="p-0" contentClassName="py-2">
                <h4 className="font-semibold">Crear Nueva Tarea</h4>
                <form className="flex flex-column gap-4">
                    <div className="p-fluid">
                        <InputTextController control={control} name="titulo" placeholder="Ingrese el titulo" rules={{ required: true }} label="Titulo" />
                    </div>
                    <div className="p-fluid">
                        <InputTextController control={control} name="descripcion" placeholder="Ingrese la descripcion" rules={{ required: true }} label="Descripcion" />
                    </div>
                    <div className="flex gap-2 align-self-end">
                        <Button label="Cancelar" size="small" onClick={(e) => closeDialog(e)} severity='danger'/>
                        <Button label="Crear" size="small" onClick={(e)=> crearTarea(e)}/>
                    </div>
                </form>
            </Dialog>
        </div>
    );
}