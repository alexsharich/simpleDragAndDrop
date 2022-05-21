import logo from './logo.svg';
import React from 'react';
import { useState } from 'react'
import './App.css';

function App() {

  const [boards, setBoards] = useState([
    { id: 1, title: 'Сделать', items: [{ id: 1, title: 'Покормить кота' }, { id: 2, title: 'Полить цветы' }, { id: 3, title: 'Приготовить ужин' }] },
    { id: 2, title: 'В процессе', items: [{ id: 4, title: 'Задачи на факториал' }, { id: 5, title: 'Ревью кода' }, { id: 6, title: 'Задачи на фибоначчи' }] },
    { id: 3, title: 'Сделано', items: [{ id: 7, title: 'Прогулка в парке' }, { id: 8, title: 'Встреча с друзьями' }, { id: 9, title: 'Сон' }] },
  ])
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  const dragOverHandler = (e) => {
    e.preventDefault()
    if (e.target.className == 'item') {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  }
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }
  const dropHandler = (e, board, item) => {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    e.target.style.boxShadow = 'none'
  }
  const dropCardHandler = (e, board) => {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    e.target.style.boxShadow = 'none'
  }

  return (
    <div className="App">
      {boards.map(board =>
        <div className='board'
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className='board__title'> {board.title}</div>
          {board.items.map(item =>
            <div
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              draggable={true}
              className='item'>
              {item.title}
            </div>
          )}
        </div>
      )}
    </div >
  );
}

export default App;
