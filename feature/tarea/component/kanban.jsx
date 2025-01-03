'use client'
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import InputTextController from '../../../common/component/input-text-controller';
import { useForm } from 'react-hook-form';

export const KanvanView = () => {
    const [tasks, setTasks] = useState({
        todo: {
            name: 'TO DO',
            items: [
                { id: '1', title: 'Diseñar Mockups', description: 'Create UI Dashboard design' },
                { id: '2', title: 'Crear Servicio', description: 'Create servicio para consumir data' }
            ]
        },
        inProgress: {
            name: 'IN PROGRESS',
            items: [
                { id: '1', title: 'Diseñar Mockups 2', description: 'Create UI Dashboard design 2' },
                { id: '2', title: 'Crear Servicio 2', description: 'Create servicio para consumir data 2' }
            ]
        },
        done: {
            name: 'DONE',
            items: [{ id: '1', title: 'Diseñar Mockups 3', description: 'Create UI Dashboard design 3' }]
        }
    });

    const [dragging, setDragging] = useState(false);
    const [draggedTask, setDraggedTask] = useState(null);
    const [visible, setVisible] = useState(false);

    const {
        control,

        formState: { errors }
    } = useForm({
        defaultValues: {
            titulo: '',
            descripcion: '',
        }
    });

    const handleDragStart = (columnId, task) => {
        setDragging(true);
        setDraggedTask({ task, sourceColumn: columnId });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (targetColumnId) => {
        if (!draggedTask) return;

        const { task, sourceColumn } = draggedTask;

        if (sourceColumn === targetColumnId) {
            setDragging(false);
            setDraggedTask(null);
            return;
        }

        setTasks((prev) => {
            const newColumns = { ...prev };

            newColumns[sourceColumn].items = newColumns[sourceColumn].items.filter((item) => item.id !== task.id);

            newColumns[targetColumnId].items.push(task);

            return newColumns;
        });

        setDragging(false);
        setDraggedTask(null);
    };

    const closeDialog = () => {
        setVisible(false);
    }

    return (
        <div className="card p-6">
            <h1 className="font-bold mb-6">Tablero kanban</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(tasks).map(([columnId, column]) => (
                    <div key={columnId} className="flex flex-column" onDragOver={handleDragOver} onDrop={() => handleDrop(columnId)}>
                        <h4>{column.name}</h4>
                        <p>{columnId}</p>
                        {column.items.map((task) => (
                            <Card className="w-25rem mb-4 cursor-pointer" key={task.id} draggable onDragStart={() => handleDragStart(columnId, task)}>
                                <h6>{task.title}</h6>
                                <p className="m-0">{task.description}</p>
                            </Card>
                        ))}
                        {columnId === 'todo' && <Button label="Añadir" outlined icon="pi pi-plus" className="align-self-end" size="small" onClick={() => setVisible(true)} />}
                    </div>
                ))}
            </div>
            <Dialog visible={visible} onHide={() => closeDialog()} className="w-30rem" headerClassName="p-0" contentClassName="py-2">
                <h4 className="font-semibold">Crear Nueva Tarea</h4>
                <form className="flex flex-column gap-2">
                    <div className="p-fluid">
                        <InputTextController control={control} name="titulo" placeholder="Ingrese el titulo" rules={{ required: true }} label="Titulo" />
                    </div>
                    <div className="p-fluid">
                        <InputTextController control={control} name="descripcion" placeholder="Ingrese la descripcion" rules={{ required: true }} label="Descripcion" />
                    </div>
                    <div className="flex gap-2 align-self-end">
                        <Button label="Cancelar" size="small" onClick={() => closeDialog()} />
                        <Button label="Crear" size="small" />
                    </div>
                </form>
            </Dialog>
        </div>
    );
}