import { ContextContainer } from "../../../contexts/ContextContainer"
import { useGetState } from "../../../utils/getState"

export function Profile() {
    useGetState()
    const { currentUser } = ContextContainer.useContainer()
    return (
        <div>
            Profile
            <h2>{currentUser.name}</h2>
        </div>
    )
}
