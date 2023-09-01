import {IForm} from "../types/Lists";

const Form = ({handleSubmit, handleChange, task, isEdit, isLoading, handleCancel}: IForm) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className={'mb-4'}>{isEdit ? 'Edit the todo' : 'Create New Todo'}</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title: <span
              className={'text-danger'}>*</span></label>
            <input onChange={handleChange} value={task.title} type="text" name={'title'} required={true}
                   className="form-control" id="title"
                   placeholder="What's in your mind"/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description: <i
              className={'text-muted'}>(optional)</i></label>
            <textarea value={task.description} name={'description'} onChange={handleChange}
                      className="form-control" id="description"
                      rows={3}/>
          </div>
          <div className="mb-3">
            <label htmlFor="level" className="form-label">Level of todo: <i
              className={'text-muted'}>(optional)</i></label>
            <select value={task.level} name={'level'} className="form-select" id={'level'} onChange={handleChange}
                    aria-label="Default select example">
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">Highest</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status: <i
              className={'text-muted'}>(optional)</i></label>
            <select value={task.status} name={'status'} className="form-select" id={'status'}
                    onChange={handleChange}
                    aria-label="Default select example">
              <option value="1">Pending</option>
              <option value="2">Ongoing</option>
              <option value="3">Completed/Done</option>
            </select>
          </div>

          <div className="mb-3">
            <button disabled={isLoading} type={"submit"}
                    className={'btn btn-info btn-sm'}>{isEdit ? 'Update' : 'Create'}</button>
            {" "}
            <button type={"button"} onClick={handleCancel}
                    className={`btn btn-danger btn-sm ${!isEdit && 'd-none'}`}>Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form;