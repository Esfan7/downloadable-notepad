import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
  const jateDB = await openDB('jate',1);
  const transaction = jateDB.transaction('jate','readwrite');
  const store = transaction.objectStore('jate');
  const result = await store.put({id:1, value: content})
  console.log("content saved", result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB('jate',1);
  const transaction = jateDB.transaction('jate','readwrite');
  const store = transaction.objectStore('jate');
  const result = await store.get(1);
  console.log("content saved", result)
  return result.value
  
}


initdb();
