'use client'
import { useEffect, useState } from "react"
import { getProyectos, createProyecto } from '../service/proyecto.service'
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { useStore } from '@/state-management/store'
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'; 
import { Dialog } from "primereact/dialog";
import InputTextController from "@/common/component/input-text-controller";
import { useForm } from "react-hook-form";

export const ProyectoView = () => {

    const [proyectos, setProyectos] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [loading, setLoading] = useState(true);
    const addProyecto = useStore((state) => state.addProyecto);
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const {
        control,
        getValues,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            nombre: '',
            descripcion: ''
        }
    });

    const initComponent  = async () => {
        const usuarioId = Cookies.get('user');
        const dataProyectos = await getProyectos(usuarioId);
        setProyectos(dataProyectos.data);
    }

    const crearProyecto = async (e) => {
        e.preventDefault();
        const dataForm = getValues();
        dataForm.usuarioId = Cookies.get('user');
        await createProyecto(dataForm);
        await initComponent();
        closeDialog(e);

    }

    useEffect(()=> {
        initComponent();
    }, [])

    const dataViewHeader = (
        <div className="flex md:flex-row md:justify-content-end gap-2">
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );

    const goToTasks = (data) => {
        addProyecto(data)
        router.push('/tablero-kanban');
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
                        <Button icon="pi pi-arrow-right" label="Ver" size="small" className="mb-2" onClick={() => goToTasks(data)}></Button>
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
                        <Button icon="pi pi-arrow-right" label="Ver" className="align-self-end" onClick={() => goToTasks(data)}/>
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

    const closeDialog = (e) => {
        if(e){
            e.preventDefault();
        }
        reset();
        setVisible(false);
    }

    return (
        <>
            <div className="card">
                <div className="flex justify-content-between align-items-center mb-4">
                    <h5>Mis Proyectos</h5>
                    <Button label="Crear" icon="pi pi-plus" onClick={() => setVisible(true)}/>
                </div>
        
            <DataView value={proyectos} layout={layout} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
            </div>
            <Dialog visible={visible} onHide={() => closeDialog()} className="w-30rem" headerClassName="p-0" contentClassName="py-2">
                <h4 className="font-semibold">Crear Nuevo Proyecto</h4>
                <form className="flex flex-column gap-4">
                    <div className="p-fluid">
                        <InputTextController control={control} name="nombre" placeholder="Ingrese el nombre" rules={{ required: true }} label="Nombre" />
                    </div>
                    <div className="p-fluid">
                        <InputTextController control={control} name="descripcion" placeholder="Ingrese la descripcion" rules={{ required: true }} label="Descripcion" />
                    </div>
                    <div className="flex gap-2 align-self-end">
                        <Button label="Cancelar" size="small" onClick={(e) => closeDialog(e)} severity='danger'/>
                        <Button label="Crear" size="small" onClick={(e)=> crearProyecto(e)}/>
                    </div>
                </form>
            </Dialog>
        </>
    )
}