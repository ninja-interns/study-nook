import { createContainer } from "unstated-next"

//! Comment
function DomainContainerProvider() {
	let scheme = "http://"
	let domain = "localhost:8080"
	if (process.env.NODE_ENV === "production") {
		scheme = "https://"
		domain = "studynook.xyz"
	}
	const url = scheme + domain

	return {
		url,
	}
}
export const DomainContainer = createContainer(DomainContainerProvider)
