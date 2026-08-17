import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useTasks } from "./TaskContext";

function TaskItem({ task }) {
  const {
    deleteTask,
    toggleTask,
    updateTask,
  } = useTasks();

  const [isEditing, setIsEditing] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: task.title,
    },
  });

  useEffect(() => {
    reset({
      title: task.title,
    });
  }, [task.title, reset]);

  const handleUpdate = async (data) => {
    await updateTask(
      task.id,
      data.title.trim()
    );

    setIsEditing(false);
  };

  const handleCancel = () => {
    reset({
      title: task.title,
    });

    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <form
          className="edit-wrapper"
          onSubmit={handleSubmit(handleUpdate)}
          noValidate
        >
          <input
            type="text"
            maxLength={100}
            {...register("title", {
              required:
                "Task adı boş ola bilməz.",
              validate: (value) => {
                const trimmedValue =
                  value.trim();

                if (trimmedValue.length < 3) {
                  return "Task adı ən azı 3 simvoldan ibarət olmalıdır.";
                }

                return true;
              },
            })}
          />

          {errors.title && (
            <p className="field-error">
              {errors.title.message}
            </p>
          )}

          <div className="task-actions">
            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Yadda saxlanılır..."
                : "Yadda saxla"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
            >
              Ləğv et
            </button>
          </div>
        </form>
      ) : (
        <>
          <span
            className={
              task.completed
                ? "task-title completed"
                : "task-title"
            }
            onClick={() =>
              toggleTask(task.id)
            }
          >
            {task.title}
          </span>

          <div className="task-actions">
            <button
              onClick={() => {
                reset({
                  title: task.title,
                });

                setIsEditing(true);
              }}
            >
              Redaktə
            </button>

            <button
              onClick={() =>
                deleteTask(task.id)
              }
            >
              Sil
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;