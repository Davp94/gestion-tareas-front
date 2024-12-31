import http from "../../../config/service";
export const getProyectos = async () => {
    return await http.get('/proyecto').then(
        res => {
            return res;
        }
    )
}