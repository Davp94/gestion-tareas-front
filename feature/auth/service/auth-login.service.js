import http from "../../../config/service";
export const authUser = async (dataLogin) => {
    return await http.post('/login', dataLogin).then(
        res => {
            return res;
        }
    )
}