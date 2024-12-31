'use client'
import { useEffect, useState } from "react"
import { getProyectos } from '../service/proyecto.service'
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";

export const ProyectoView = () => {

    const [proyectos, setProyectos] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [loading, setLoading] = useState(true);
    const { proyecto, addProyecto } = useStore();
    const router = useRouter();

    const initComponent  = async () => {
        const dataProyectos = await getProyectos();
        setProyectos(dataProyectos);
    }

    useEffect(()=> {
        initComponent();
    }, [])

    const dataViewHeader = (
        <div className="flex md:flex-row md:justify-content-end gap-2">
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );

    goToTasks = (data) => {
        addProyecto(data)
        router.push('/tareas');
    }


    const dataviewListItem = (data) => {
        return (
            <div className="col-12">
                <div className="flex flex-column md:flex-row align-items-start justify-content-between p-3 w-full">
                    <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
                        <div className="font-bold text-2xl">{data.nombre}</div>
                        <div className="mb-2">{data.descripcion}</div>
                    </div>
                    <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <Button icon="pi pi-arrow-right" label="Ver" size="small" className="mb-2" onClick={(data) => goToTasks(data)}></Button>
                    </div>
                </div>
            </div>
        );
    };


    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 lg:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex flex-column align-items-center text-center mb-3 gap-2">
                        <div className="text-2xl font-bold">{data.nombre}</div>
                        <div className="mb-3">{data.descripcion}</div>
                        <Button icon="pi pi-shopping-cart" label="Ver" className="align-self-end" onClick={(data) => goToTasks(data)}/>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            return dataviewListItem(data);
        } else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    return (
        <>
            <div className="card">
            <h5>DataView</h5>
            <DataView value={proyectos} layout={layout} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
            </div>
        </>
    )
}