import { createContainer } from "unstated-next"

/**
 * * DOMAIN CONTEXT CONTAINER
 * * Provides a different url to the rest of the application for api calls
 * * depending on whether the build is development or production
 */
function DomainContainerProvider() {
	let url = "http://localhost:8080"
	if (process.env.NODE_ENV === "production") {
		url = "http://localhost:8080"
	}

	return {
		url,
	}
}
export const DomainContainer = createContainer(DomainContainerProvider)
