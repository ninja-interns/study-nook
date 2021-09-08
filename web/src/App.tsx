import { AuthContainer } from "./containers/AuthContainer"

// Importing Components
import TodoListApp from "./components/todoList"
// import { TimerApp } from "./components"

function App() {
    return (
        <AuthContainer.Provider>
            <TodoListApp />
            {/* <TimerApp /> */}
        </AuthContainer.Provider>
    )
}
export default App
