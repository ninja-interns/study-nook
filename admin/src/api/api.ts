//const ADDRESS = "https://studynook.xyz/admin"
const ADDRESS = "/admin"

// JSON payload sent in HTTP request
interface IUserRequest {
	[k: string]: string | boolean | undefined
	username: string
	name: string
	email: string
	password?: string
	confirmPassword?: string
}

// JSON payload received in HTTP response
interface IUserResponse {
	[k: string]: string | boolean
	id: string
	username: string
	name: string
	email: string
	isVerified: boolean
	token: string
}

// HTTP status and text received in HTTP response
interface IResponse {
	status: number
	text: string
}

// isIResponse checks if the response is IResponse or not
const isIResponse = (response: IResponse | IUserResponse | IUserResponse[]): response is IResponse => {
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

const deleteUser = async (id: string): Promise<IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/users/${id}`, {
		method: "DELETE",
	})
	status = res.status
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const getUserByID = async (id: string): Promise<IUserResponse | IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/users/${id}`, {
		method: "GET",
	})
	status = res.status
	if (status === 200) {
		const user: IUserResponse = await res.json()
		return user
	}
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const createUser = async (u: IUserRequest): Promise<IUserResponse | IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/users`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			username: u.username,
			name: u.name,
			email: u.email,
			password: u.password,
			confirmPassword: u.confirmPassword,
		}),
	})

	status = res.status
	// HTTP 201 Created success status code
	if (status === 201) {
		const user: IUserResponse = await res.json()
		return user
	}
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const updateUser = async (id: string, u: IUserRequest): Promise<IUserResponse | IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/users/${id}`, {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			username: u.username,
			name: u.name,
			email: u.email,
			password: u.password,
			confirmPassword: u.confirmPassword,
		}),
	})

	status = res.status
	// HTTP 200 OK success status code
	if (status === 200) {
		const user: IUserResponse = await res.json()
		return user
	}
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const updateUserExceptPassword = async (id: string, u: IUserRequest): Promise<IUserResponse | IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/user_details_only/${id}`, {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			username: u.username,
			name: u.name,
			email: u.email,
		}),
	})

	status = res.status
	// HTTP 200 OK success status code
	if (status === 200) {
		const user: IUserResponse = await res.json()
		return user
	}
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

const getAllUsers = async (): Promise<IUserResponse[] | IResponse> => {
	let status: number
	let text: string
	const res = await fetch(`${ADDRESS}/users`, {
		method: "GET",
	})
	status = res.status
	// HTTP 200 OK success status code
	if (status === 200) {
		const users: IUserResponse[] = await res.json()
		return users
	}
	text = await res.text()

	return {
		status: status,
		text: text,
	}
}

export { login, logout, createUser, deleteUser, updateUser, updateUserExceptPassword, getAllUsers, getUserByID, isIResponse }
export type { IResponse, IUserResponse, IUserRequest }
