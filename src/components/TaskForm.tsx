import { useState, useRef, KeyboardEvent } from "react";

const TaskForm = () => {
  const [taskCode, setTaskCode] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [message, setMessage] = useState<string>(
    "Enter task code (C for Coding, R for Reading, A for Action, W for Writing, L for Learning, Ch for Chores, E for Entertainment, or X to exit):"
  );
  const [feedback, setFeedback] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const taskNames: { [key: string]: string } = {
    C: "Coding",
    R: "Reading",
    A: "Action",
    W: "Writing",
    L: "Learning",
    CH: "Chores",
    E: "Entertainment",
  };

  const handleTaskCodeInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value.trim().toUpperCase();
      if (value === "X") {
        resetForm();
        setMessage(
          "Enter task code (C for Coding, R for Reading, A for Action, W for Writing, L for Learning, Ch for Chores, E for Entertainment, or X to exit):"
        );
        setFeedback("");
        clearInput();
      } else if (taskNames[value]) {
        setTaskCode(value);
        setMessage(
          `Enter start time for ${taskNames[value]} (HH:MM or HHMM) or 'now' for the current time (or X to change task code):`
        );
        setFeedback(""); // Clear feedback
        clearInput();
      } else {
        setFeedback("Error: Invalid task code. Please try again.");
      }
    }
  };

  const handleStartTimeInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputValue = (e.target as HTMLInputElement).value
        .trim()
        .toLowerCase();
      const startTimeInput =
        inputValue === "" || inputValue === "now"
          ? new Date().toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : formatTime(inputValue);

      if (inputValue === "x") {
        resetForm();
        setMessage(
          "Enter task code (C for Coding, R for Reading, A for Action, W for Writing, L for Learning, Ch for Chores, E for Entertainment, or X to exit):"
        );
        setFeedback("");
        clearInput();
      } else if (startTimeInput) {
        setStartTime(startTimeInput);
        setMessage(
          `Started at ${startTimeInput}. Enter end time for ${taskNames[taskCode]} (HH:MM or HHMM) or 'now' for the current time (or X to change task code):`
        );
        setFeedback(""); // Clear feedback
        clearInput();
      } else {
        setFeedback("Error: Invalid time format. Please try again.");
      }
    }
  };

  const handleEndTimeInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputValue = (e.target as HTMLInputElement).value
        .trim()
        .toLowerCase();
      const endTimeInput =
        inputValue === "" || inputValue === "now"
          ? new Date().toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : formatTime(inputValue);

      if (inputValue === "x") {
        resetForm();
        setMessage(
          "Enter task code (C for Coding, R for Reading, A for Action, W for Writing, L for Learning, Ch for Chores, E for Entertainment, or X to exit):"
        );
        setFeedback("");
        clearInput();
      } else if (endTimeInput) {
        if (isEndTimeValid(startTime, endTimeInput)) {
          const timeSpent = calculateTimeSpent(startTime, endTimeInput);
          setFeedback(`You Spent ${timeSpent} Minutes ${taskNames[taskCode]}`);
          setMessage(
            "Enter task code (C for Coding, R for Reading, A for Action, W for Writing, L for Learning, Ch for Chores, E for Entertainment, or X to exit):"
          );
          resetForm();
        } else {
          setFeedback(
            "Error: End time cannot be earlier than start time. Please try again."
          );
        }
      } else {
        setFeedback("Error: Invalid time format. Please try again.");
      }
      clearInput();
    }
  };

  const formatTime = (time: string): string | null => {
    if (/^\d{4}$/.test(time)) {
      return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
    } else if (/^\d{2}:\d{2}$/.test(time)) {
      return time;
    } else {
      return null;
    }
  };

  const isEndTimeValid = (start: string, end: string): boolean => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    return (
      endHour > startHour || (endHour === startHour && endMinute >= startMinute)
    );
  };

  const calculateTimeSpent = (start: string, end: string): number => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(startHour, startMinute);
    endDate.setHours(endHour, endMinute);
    const diff = (endDate.getTime() - startDate.getTime()) / 1000 / 60; // Difference in minutes
    return diff;
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setTaskCode("");
    setStartTime("");
  };

  return (
    <div>
      <h2>Add Today's Tasks</h2>
      <p>{message}</p>
      <input
        type="text"
        onKeyDown={
          taskCode
            ? startTime
              ? handleEndTimeInput
              : handleStartTimeInput
            : handleTaskCodeInput
        }
        ref={inputRef}
        autoFocus
      />
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default TaskForm;
