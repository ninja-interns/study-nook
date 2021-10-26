import { IErrorMessage } from "../pages/UserCreate"

const APIEndpoint = "/admin/users"
const deleteUserByID = async (userID: string): Promise<IErrorMessage> => {
	const res = await fetch(`${APIEndpoint}/${userID}`, {
		method: "DELETE",
	})
	const msg = await res.json()
	return msg
}

export { deleteUserByID }
