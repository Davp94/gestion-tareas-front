import http from "../../../config/service";
export const authUser = async (dataLogin) => {
    return await http.post('/login', dataLogin).then(
        res => {
            return res;
        }
    )
}

export const dataUser = async (token) => {
    return await http.get(`/usuario/token?token=${token}`).then(
        res => {
            return res;
        }
    )
}