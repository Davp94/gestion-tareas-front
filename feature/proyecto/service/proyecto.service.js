import http from "../../../config/service";
export const getProyectos = async (usuarioId) => {
    return await http.get(`/proyecto?usuarioId=${usuarioId}`).then(
        res => {
            return res;
        }
    )
}

export const createProyecto = async (data) => {
    return await http.post(`/proyecto`, data).then(
        res => {
            return res;
        }
    )
}