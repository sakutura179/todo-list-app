import { useState, useRef } from "react";
import '../assets/TodoList.css';

function TodoList() {
    const [name, setName] = useState('');
    const [jobs, setJobs] = useState(() => {
        const localStoreJobs = JSON.parse(localStorage.getItem('jobs'));
        return localStoreJobs ?? [];
    });
    const [done, setDone] = useState(() => {
        const localStoreDone = JSON.parse(localStorage.getItem('done'));
        return localStoreDone ?? [];
    });


    const id = useRef(0);
    const handleAdd = () => {
        if (name !== ''){
            setJobs(prev => {
                const newJobs = [...prev, { 'id': id.current, 'name': name}];

                const jsonJobs = JSON.stringify(newJobs);
                localStorage.setItem('jobs', jsonJobs);

                return newJobs;
            });
            setName('');
            id.current++;
        }
    }

    const handleDelete = (jobId, job) => {
        setJobs(() => {
            const newJobs = jobs.filter(item => item.id !== jobId);

            const jsonJobs = JSON.stringify(newJobs);
            localStorage.setItem('jobs', jsonJobs);

            return newJobs;
        });

        setDone(prevDone => {
            const newDone = [...prevDone, { 'id': jobId, 'name': job}];

            const jsonDone = JSON.stringify(newDone);
            localStorage.setItem('done', jsonDone);
            
            return newDone;
        });
    }

    const handleDeleteDone = (jobId) => {
        setDone(() => {
            const newDone = done.filter(item => item.id !== jobId);

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
                    { jobs.length !== 0 ? jobs.map((job) => {
                        return (
                            <li key={job.id} className="list-item">
                                {job.name}
                                <box-icon class="btn" name='trash' onClick={() => handleDelete(job.id, job.name)}></box-icon>
                            </li>
                        )
                    }) : <li>Tuyệt vời! Không có công việc cần phải làm</li>}
                </ul>
                <ul className="done-list list">
                    <li className="title">Công việc đã hoàn thành</li>
                    {done.length !== 0 ? done.map((jobDone) => {
                        return (
                            <li key={jobDone.id} className="list-item">
                                {jobDone.name}
                                <box-icon class="btn" name='check'></box-icon>
                                <box-icon class="btn" name='trash' onClick={() => handleDeleteDone(jobDone.id)}></box-icon>
                            </li>
                        )
                    }) : <li>Chưa hoàn thành công việc nào</li>}
                </ul>
            </div>
        </div>
    )
}

export default TodoList