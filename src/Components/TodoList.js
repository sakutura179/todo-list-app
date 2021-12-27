import { useState } from "react";
import '../assets/TodoList.css';

function TodoList() {
    const [name, setName] = useState('');
    const [todo, setTodo] = useState(() => {
        const localStoreTodo = JSON.parse(localStorage.getItem('todo'));
        return localStoreTodo ?? [];
    });
    const [done, setDone] = useState(() => {
        const localStoreDone = JSON.parse(localStorage.getItem('done'));
        return localStoreDone ?? [];
    });

    const handleAdd = () => {
        if (!todo.includes(name) && name !== ''){
            setTodo(prev => {
                const newTodo = [...prev, name];

                const jsonTodo = JSON.stringify(newTodo);
                localStorage.setItem('todo', jsonTodo);

                return newTodo;
            });
            setName('');
        }
    }

    const handleDelete = (work) => {
        setTodo(() => {
            const newTodo = todo.filter(item => item !== work);

            const jsonTodo = JSON.stringify(newTodo);
            localStorage.setItem('todo', jsonTodo);

            return newTodo;
        });

        setDone(prevDone => {
            const newDone = [...prevDone, work];

            const jsonDone = JSON.stringify(newDone);
            localStorage.setItem('done', jsonDone);
            
            return newDone;
        });
    }

    const handleDeleteDone = (workDone) => {
        setDone(() => {
            const newDone = done.filter(item => item !== workDone);

            const jsonDone = JSON.stringify(newDone);
            localStorage.setItem('done', jsonDone);

            return newDone;
        })
    }

    return (
        <div className="container">
            <div className="input">
                <input className="input-work" placeholder="Nhập công việc..." type={'text'} value={name} onChange={e => setName(e.target.value)}/>
                <button className="add-btn" onClick={handleAdd}>Add</button>
            </div>
            <div className="list-container">
                <ul className="todo-list list">
                    <li className="title">Công việc đang làm</li>
                    { todo.length !== 0 ? todo.map((work, index) => {
                        return (
                            <li key={index} className="list-item">
                                {work}
                                <box-icon class="btn" name='trash' onClick={() => handleDelete(work)}></box-icon>
                            </li>
                        )
                    }) : <li>Tuyệt vời! Không có công việc cần phải làm</li>}
                </ul>
                <ul className="done-list list">
                    <li className="title">Công việc đã hoàn thành</li>
                    {done.length !== 0 ? done.map((workDone, index) => {
                        return (
                            <li key={index} className="list-item">
                                {workDone}
                                <box-icon class="btn" name='check'></box-icon>
                                <box-icon class="btn" name='trash' onClick={() => handleDeleteDone(workDone)}></box-icon>
                            </li>
                        )
                    }) : <li>Chưa hoàn thành công việc nào</li>}
                </ul>
            </div>
        </div>
    )
}

export default TodoList