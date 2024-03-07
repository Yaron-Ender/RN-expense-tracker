import { getDoc,setDoc,collection,doc,updateDoc,deleteDoc } from "firebase/firestore";
import { db } from "../store/config";
export function useFirestore(_collection){
  const colref = collection(db, _collection);
  const addDocument = async (addObj) => {
    try {
      //grab the id and add it to the document
      const newDoc = doc(colref);
      const id = newDoc._key.path.segments[1];
      const docObj = await setDoc(newDoc, { ...addObj, id: id });
    } catch (e) {
      console.log(e);
    }
  };
  //update document
  const updateDocuemt = async (id, value) => {
    console.log(id, value);
    const docRef = doc(colref, id);
    try {
      await updateDoc(docRef, value);
    } catch (err) {
      console.log(err.message);
    }
  };
  const getDocFromFirestore = async (id) => {
    const docRef = doc(colref, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("document doesn't exsist");
    }
  };
  //Delete Document
  const deleteDocument = async (id) => {
    try {
      await deleteDoc(doc(colref, id));
    } catch (err) {
      console.log(err);
    }
  };
  return { addDocument, getDocFromFirestore, updateDocuemt,deleteDocument};
}