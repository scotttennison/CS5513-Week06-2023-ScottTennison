import app from "./firebase-app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);



export async function getTeamList() {
    const snapshot = await getDocs(collection(db, "teams"));
    return snapshot.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => a.odds_to_win - b.odds_to_win)
        .map(({ id, team_name }) => ({ id: id.toString(), team_name }));
}



export async function getTeamIds() {
    const snapshot = await getDocs(collection(db, "teams"));
    return snapshot.docs
        .map(d => ({ id: d.id }))
        .map(({ id }) => ({ params: { id: id.toString() } }));
}


export async function getTeamData(idRequested) {
  const docRef = doc(db, "teams", idRequested);
  const d = await getDoc(docRef);

  let objReturned;
  if(!d.exists){
    objReturned = {};
  }else{
    objReturned = d.data();
  }
  return objReturned;
}