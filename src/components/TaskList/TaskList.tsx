import PropTypes from 'prop-types'
import { Todo } from '../../@type/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptypes'
import styles from './TaskList.module.scss'

interface TaskListProps {
  doneTaskList?: Boolean
  todos: Todo[]
  handleCheckedTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleCheckedTodo, startEditTodo, deleteTodo } = props

  // const handlecheckbox = (todoId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   return handleCheckedTodo(todoId, event.target.checked)
  // }
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Success' : 'UnSuccess'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => {
          return (
            <div className={styles.task} key={todo.id}>
              <input
                type='checkbox'
                className={styles.taskCheckbox}
                checked={todo.done}
                onChange={(event) => handleCheckedTodo(todo.id, event.target.checked)}
                // onChange={handlecheckbox(todo.id)}
              />
              <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
              <div className={styles.taskActions}>
                <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                  🖋
                </button>
                <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
                  🗑
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(TodoTypes),
  handleCheckedTodo: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

export default TaskList
