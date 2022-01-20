import { useEffect, useState } from 'react';
import styles from './styles.module.css'

import { BiUpArrow, BiDownArrow } from 'react-icons/bi'
import { getLocalstorage, isEqualData, setLocalstorage } from '../../core/services/localstorage';

type taskListType = {
  name: string,
  order: number
}

const localStorageTaskList:taskListType[] = getLocalstorage()

export const Home = () => {
  const [newInput, setNewInput] = useState('')
  const [taskLists, setTaskLists] = useState<taskListType[]>(localStorageTaskList)
  const taskListsSorted: taskListType[] = taskLists.sort((a, b) => a.order > b.order ? 1 : -1 )

  function handleInput(event: any) {
    setNewInput(event.target.value)
  }



  function handleReturn(event: any) {
    if(event.key === 'Enter') {
      let maxOrder = 0
      if(taskLists.length > 0 ) {
        const maxOrderObject = taskLists.reduce((max, obj) => (max.order > obj.order) ? max : obj)
        maxOrder = maxOrderObject.order + 1
      }

      setTaskLists((prev) => [...prev, {name: newInput, order: maxOrder}])
      setNewInput('')
    }
  }

  function deleteTask(taskOrder: number) {
    const taskListsRemains: taskListType[] = taskLists.filter(task => task.order !== taskOrder)
    setTaskLists(taskListsRemains)
  }

  function putPosition(position: 'TOP' | 'BOTTOM', referenceIndex: number) {
    let data = [...taskLists]

    const base = taskLists[referenceIndex]
    const bottom = taskLists[referenceIndex + 1]
    const top = taskLists[referenceIndex - 1]
    const orderBase = base.order

    if(position === 'BOTTOM' && bottom) {
      const orderBottom = bottom.order

      data[referenceIndex].order = orderBottom
      data[referenceIndex + 1].order = orderBase
    } else  if(position === 'TOP' && top) {
      const orderTop = top.order

      data[referenceIndex].order = orderTop
      data[referenceIndex - 1].order = orderBase
    }
    setTaskLists(data)
  }
  useEffect(() => {
    setLocalstorage(taskLists)
  }, [taskLists])

  return (
  <>
    {/* <Header /> */}
    <main className={styles.main}>
    {taskListsSorted.map(({order, name}, index) => {
      return <div key={order} className={styles.task}>
        <button className={styles.task__name}><span>{name}</span></button>

        <div className={styles.task__arrow}>
          <button onClick={() => putPosition('TOP', index)}><BiUpArrow /></button>
          <button onClick={() => putPosition('BOTTOM', index)}><BiDownArrow /></button>
        </div>
        <button className={styles.task__close} onClick={() => deleteTask(order)}>X</button>
      </div>
    })}

    <div className={styles.input} >
      <input type="text" value={newInput} onChange={handleInput} onKeyPress={handleReturn}/>
    </div>

    </main>


    {/* <Footer /> */}
  </>
  )
}
