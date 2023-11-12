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

  export const putDb = async (content)  => {
    console.log('PUT to the database');
  
    //Create a connection to the chosen database with the chosen database version.
    const contactDb = await openDB('jate', 1);
  
    //Make a transation with the database and the privileges we need.
    const tx = contactDb.transaction('jate', 'readwrite');
  
    //Open up an object store for the transaction... seems like too many steps to me.
    const store = tx.objectStore('jate');
  
    //invoke the put method on the created store and store the procided content  
    const request = store.put({ id: 1, value: content });
  
    //Get confirmation of the result and log it.
    const result = await request;
    console.log('Data saved to the database', result);
  };

  export const getDb = async () => {
    console.log('GET from the database');
  
    //Open a connection to the chosen database with the chosen version.
    const contactDb = await openDB('jate', 1);
  
    //Make a new transaction with the chosen database and privilages.
    const tx = contactDb.transaction('jate', 'readonly');
  
    //Open up that object store...
    const store = tx.objectStore('jate');
  
    //Invoke getAll() to get the data out.
    const request = store.getAll();
  
    //Get confirmation and then log it. 
    const result = await request;
    console.log('The result value:', result);
    return result?.value;
  };

initdb();
