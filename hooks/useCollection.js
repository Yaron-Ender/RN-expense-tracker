import { collection,onSnapshot,toDate } from "firebase/firestore";
import { useState,useEffect } from "react";
import { db } from "../store/config";
export const useCollection = (_collection) => {
  const [documents,setDocuments]=useState(null); 
  const [msg,setmsg]=useState('') 
    const colref = collection(db, _collection);
useEffect(()=>{
 const unsub = onSnapshot(colref,(docs)=>{
if(docs.empty){
return setmsg('there are no expenses ')
}
const arr=[]
docs.forEach((item)=>{
    arr.push({
      ...item.data(),
      id: item.id,
      date:item.data().date.toDate().toISOString().slice(0, 10),
    }); 
})
setDocuments(arr)
 },
 (err)=>(
    setmsg(err.message)
 ))
 return ()=>unsub()
},[_collection])

return {msg,documents}
};
