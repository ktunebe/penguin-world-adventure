import { openDB } from 'idb'

const dbName = 'jate'
const dbVersion = 1
const objectStoreName = 'jate'

const initdb = async () =>
	openDB(dbName, dbVersion, {
		upgrade(db) {
			if (db.objectStoreNames.contains(objectStoreName)) {
				console.log(`${dbName} database already exists`)
				return
			}
			db.createObjectStore(objectStoreName, { 
        keyPath: 'id', 
        autoIncrement: true 
      })
			console.log(`${dbName} database created`)
		},
	})

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
	// Open db
	const db = await openDB(dbName, dbVersion)
	// Transaction
	const tx = db.transaction(objectStoreName, 'readwrite')
	// Access store from tx
	const store = tx.objectStore(objectStoreName)
	// Add content to db
	const request = store.put({
		id: 0,
    content
	})

	const result = await request

	console.log(result)
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Open db
  const db = await openDB(dbName, dbVersion)
  // Transaction
  const tx = db.transaction(objectStoreName, 'readonly')
  // Access store from tx
  const store = tx.objectStore(objectStoreName)
  // Get all content
  const request = store.getAll()

	const result = await request
  return result.content
}

initdb()
