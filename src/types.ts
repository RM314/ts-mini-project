 export type DiaryEntry = {
  id: string;
  date: string;
  title: string;
  text: string;
  imageUrl: string;
};



export type NewEntryInput = Omit<DiaryEntry, "id">;
