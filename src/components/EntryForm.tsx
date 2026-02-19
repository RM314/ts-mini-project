import { useEffect, useState } from "react";
import { tryAddToDiary } from "../util/storage.js";
import ErrorMessage from "./ErrorMessage"

import type { DiaryEntry, NewEntryInput } from "../types";

type Props = {
  onSubmit: (entry: DiaryEntry | NewEntryInput) => void;
  onClose: () => void;
  entry: DiaryEntry | null;
};

const EntryForm = ({ onSubmit, onClose, entry} : Props) => {

  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");



 function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Cancelling entry addition...");
    setError(null);
    onClose();
  }

  function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Resetting form...");
    setError(null);
    setTitle("");
    setDate("");
    setImageUrl("");
    setContent("");
    //setFormKey(k => k + 1);  hack to enforce redisplay
  }


    useEffect(() => {
    setTitle(entry?.title ?? "");
    setDate(entry?.date ?? "");
    setImageUrl(entry?.imageUrl ?? "");
    setContent(entry?.content ?? "");
  }, [entry]);

  // check if fields are ok, if so, send it to the parent form to save to the storage
  function checkForErrors(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('checking for errors.... ')

    if (error) {
      setError(null); // reset previous errors
    }

    //const formData = new FormData(e.currentTarget);

    // setting up the checkpoint
    if (!validated) {
      setError("All fields are required."); return;
    }

    console.log("⭐️ Alles in ordnung! ")

    let newEntry: DiaryEntry | NewEntryInput;

    if (entry) {
        newEntry = {
          id: entry.id,
          title,
          date,
          imageUrl,
          content,
        };
    } else {
        newEntry = {
          title,
          date,
          imageUrl,
          content,
        };
    }


    // dublicate date checkpoint
    // using Try just in case UI fails to catch

    try {
      tryAddToDiary(newEntry,entry!=null);
    } catch (diaryError) {
      setError(diaryError instanceof Error ? diaryError.message : "Unknown error");
      return;
    }


    // finalising
    onSubmit(newEntry) // no need to pass event

  }

  const validated = title && date && imageUrl && content
  const isEmpty = !title && !date && !imageUrl && !content

  //console.log(" ggg ",title,date,imageUrl,content);


  const today = new Date().toISOString().split('T')[0];

  function setTodayDate() {
    setDate(today);
  }
//value={entry ? entry.date : {date}}
  //console.log("EntryForm entry=",entry);

  if (false) {
    setTitle(entry.title)
    setDate(entry.date)
    setImageUrl(entry.imageUrl)
    setContent(entry.content)
  }

  return (
    <div className="flex flex-col space-y-4 p-4 rounded-lg shadow-md ">
      <h2 className="font-bold text-secondary">Add New Diary Entry</h2>
      {error && <ErrorMessage error={error} onExit={() => setError(null)} />}
      <form onSubmit={checkForErrors} className="flex flex-col space-y-4">
        <label className="flex gap-4">
          Title:
          <input type="text" name="title" className="input" defaultValue={entry ? entry.title : ""} onChange={(e) => setTitle(e.target.value.trim())} />
        </label>
        <label className="flex gap-4">
          Date:
          <input type="date" name="date" className="input"  value={date} onChange={(e) => setDate(e.target.value.trim())} />
          <button className="btn" hidden={date === today} type="button" onClick={setTodayDate}>Today</button>
        </label>
        <label className="flex gap-4">
          Picture URL:
          <input type="url" name="imageUrl" className="input" defaultValue={entry ? entry.imageUrl : ""} onChange={(e) => setImageUrl(e.target.value.trim())} />

        </label>
        <label className="flex gap-4">
          Content:
          <textarea name="content" className="textarea textarea-bordered" defaultValue={entry ? entry.content : ""} onChange={(e) => setContent(e.target.value.trim())} />
        </label>

        <span className="flex gap-2">
          <button disabled={!validated} type="submit" className="btn btn-primary">Save Entry</button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
          <button disabled={isEmpty || entry} type="button" onClick={handleReset} className="btn btn-tertiary">Reset</button>
        </span>
      </form>
    </div>

  );



};

export default EntryForm;