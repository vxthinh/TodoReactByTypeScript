import { useState } from 'react'
import PropTypes from 'prop-types'

import { Todo } from '../../@type/todo.type'
import styles from './TaskInput.module.scss'
import { TodoTypes } from '../../PropTypes/todo.proptypes'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}
function TaskInput(props: TaskInputProps) {
  const [name, setName] = useState<string>('')
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    //when currentTodo is true, that'll be edit mode. Otherwise that's submit mode
    if (currentTodo) {
      editTodo(value)
      return
    } else {
      setName(value)
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>Todo List typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={(event) => onChangeInput(event)}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}

export default TaskInput
