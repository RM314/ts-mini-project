import { de } from "zod/locales";
import type { DiaryEntry, NewEntryInput } from "../types";

const STORAGE_KEY : string = 'personal_diary_entries';

export function loadDiaryEntries() : DiaryEntry[]  {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return (raw) ? JSON.parse(raw) as DiaryEntry[] : [];
    } catch (error) {
        console.error("Failed to load diary entries:", error);
        return [];
    }
}

export function saveDiaryEntries(entries: DiaryEntry[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
        console.error("Can't save diary entries:", error);
    }
}

export function tryAddToDiary(entry:  DiaryEntry | NewEntryInput, isEdit: boolean) {
    let entries :  DiaryEntry[] = loadDiaryEntries();

    // double checking the date, in case UI fails
    //const dateExsists = entries.some((d) => d.date === entry.date);

     const withId: DiaryEntry = isEdit ? (entry as DiaryEntry) : { ...(entry as NewEntryInput), id: crypto.randomUUID() };

     const dateExisting = entries.find(d => d.date === withId.date);

    if ((!isEdit && dateExisting) || (isEdit && dateExisting && dateExisting.id != withId.id) ) {
        throw new Error(
            "Date already exists! \nChoose a new one or come back tomorrow 💤"
        );
    }
    // sort missing (overwritten anyway)
    try {
        if (!isEdit) {
            entries.push(withId);
        } else {
            const i = entries.findIndex(e => e.id === withId.id);
            if (i !== -1) {
                entries[i] = withId;
            }
        }
        entries=entries.sort((a, b) => a.date.localeCompare(b.date));
        saveDiaryEntries(entries);
    } catch (error) {
        console.error("Can't add to Diary", error);
        throw error;
    }
}