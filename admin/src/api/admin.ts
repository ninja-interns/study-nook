//const ADDRESS = "https://studynook.xyz/admin"
const ADDRESS = "/admin"

// JSON payload sent in HTTP request
interface IAdminRequest {
	[k: string]: string | boolean | undefined
	name: string
	email: string
	password?: string
	adminType: string
	confirmPassword?: string
}

// JSON payload received in HTTP response
interface IAdminResponse {
	[k: string]: string | boolean
	id: string
	name: string
	email: string
	adminType: string
}

// HTTP status and text received in HTTP response
interface IResponse {
	status: number
	text: string
}

// isIResponse checks if the response is IResponse or not
const isIResponse = (response: IResponse | IAdminResponse | IAdminResponse[]): response is IResponse => {
	return (response as IResponse).text !== undefined
}

const login = async (email: string, password: string): Promise<IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/login`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	})
	status = res.status
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const logout = async (): Promise<IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/logout`, {
		method: "POST",
	})
	status = res.status
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const deleteAdmin = async (id: string): Promise<IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/admins/${id}`, {
		method: "DELETE",
	})
	status = res.status
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const getAdminByID = async (id: string): Promise<IAdminResponse | IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/admins/${id}`, {
		method: "GET",
	})
	status = res.status
	if (status === 200) {
		const admin: IAdminResponse = await res.json()
		return admin
	}
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const createAdmin = async (a: IAdminRequest): Promise<IAdminResponse | IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/admins`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			name: a.name,
			email: a.email,
			adminType: a.adminType,
			password: a.password,
			confirmPassword: a.confirmPassword,
		}),
	})

	status = res.status
	// HTTP 201 Created success status code
	if (status === 201) {
		const admin: IAdminResponse = await res.json()
		return admin
	}
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const updateAdmin = async (id: string, a: IAdminRequest): Promise<IAdminResponse | IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/admins/${id}`, {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			name: a.name,
			email: a.email,
			adminType: a.adminType,
			password: a.password,
			confirmPassword: a.confirmPassword,
		}),
	})

	status = res.status
	// HTTP 200 OK success status code
	if (status === 200) {
		const admin: IAdminResponse = await res.json()
		return admin
	}
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const updateAdminExceptPassword = async (id: string, a: IAdminRequest): Promise<IAdminResponse | IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/admins/details_only/${id}`, {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			name: a.name,
			email: a.email,
			adminType: a.adminType,
		}),
	})

	status = res.status
	// HTTP 200 OK success status code
	if (status === 200) {
		const admin: IAdminResponse = await res.json()
		return admin
	}
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const getAllAdmins = async (): Promise<IAdminResponse[] | IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/admins`, {
		method: "GET",
	})
	status = res.status
	// HTTP 200 OK success status code
	if (status === 200) {
		const admins: IAdminResponse[] = await res.json()
		return admins
	}
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

export { login, logout, createAdmin, deleteAdmin, updateAdmin, updateAdminExceptPassword, getAllAdmins, getAdminByID, isIResponse }
export type { IResponse, IAdminResponse, IAdminRequest }
