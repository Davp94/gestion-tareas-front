import http from "../../../config/service";
export const changeTareaStatus = async (data) => {
    return await http.put('/tarea', data).then(
        res => {
            return res;
        }
    )
}

export const getTareas = async (data) => {
    return await http.get(`/tarea`, {params: data}).then(
        res => {
            return res;
        }
    )
}

export const createTarea = async (dataTarea) => {
    return await http.post(`/tarea`, dataTarea).then(
        res => {
            return res;
        }
    )
}