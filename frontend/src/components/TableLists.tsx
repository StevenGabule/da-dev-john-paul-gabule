import {IList, ITableLists} from "../types/Lists";
import {LEVEL, STATUS} from "../constant/todos";
import TimeAgo from "timeago-react";

const TableLists = ({todoLists, setTask, setCurrentId, setEdit, handleMarkAsDone}: ITableLists) => {
  return todoLists && todoLists.length !== 0 && todoLists.map((list: IList) => (
    <tr key={list.id || new Date().toString()}>
      <td><span className={'text-limit-display-title'}>{list.title}</span></td>
      <td><span className={'text-limit-display-description'}>{list.description}</span></td>
      <td>{STATUS[list.status]}</td>
      <td>{LEVEL[list.level]}</td>
      <td><TimeAgo datetime={list.created_at}/></td>
      <td>
        <div className={'d-flex'}>
          <button title={'Edit Task'} type={"button"} className={'btn btn-info btn-sm'} onClick={() => {
            setTask({
              title: list.title,
              description: list.description,
              status: list.status,
              level: list.level,
            })
            setCurrentId(String(list.id));
            setEdit(true);
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
          }}>&#x270D;
          </button>
          <button title={'Mark as Done'} onClick={() => handleMarkAsDone(Number(list.id))} type={"button"}
                  className={'btn btn-success btn-sm'}>&#x2713;
          </button>
        </div>
      </td>
    </tr>
  ))
}

export default TableLists;