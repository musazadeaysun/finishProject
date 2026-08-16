const initialState = {
  tasks: [],
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload
        ),
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                completed: !task.completed,
              }
            : task
        ),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                title: action.payload.title,
              }
            : task
        ),
      };

    case "UPDATE_TASK_FROM_SERVER":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.temporaryId
            ? action.payload.task
            : task
        ),
      };

    case "REPLACE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? action.payload
            : task
        ),
      };

    case "CLEAR_TASKS":
      return {
        ...state,
        tasks: [],
      };

    default:
      return state;
  }
}