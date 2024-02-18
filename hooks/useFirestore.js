import { addDoc, collection } from "firebase/firestore";
import { db } from "../store/config";
export function useFirestore(_collection){
const colref = collection(db,_collection);
const addDocument = async(addObj)=>{
try{
   const docObj=await addDoc(colref,addObj)
}
catch(e){
console.log(e)
} 
}
return {addDocument}
}