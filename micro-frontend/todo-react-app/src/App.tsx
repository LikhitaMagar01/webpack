import './App.css'
import TodoList from './components/MainPage/MainPage'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className='text-3xl text-red-300 p-4'>
          My Todos
        </div>
        <TodoList />
      </div>
    </>
  )
}

export default App
