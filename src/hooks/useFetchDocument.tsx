import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

import { doc, getDoc, type DocumentData } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const useFetchDocument = (collectionName: string, documentID: string) => {
  const [document, setDocument] = useState<DocumentData | null>(null);

  const getDocument = useCallback(async () => {
    const docRef = doc(db, collectionName, documentID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: documentID,
        ...docSnap.data(),
      };

      setDocument(obj);
    } else {
      toast.error("해당 데이터가 존재하지 않습니다.");
    }
  }, [collectionName, documentID]);

  useEffect(() => {
    getDocument();
  }, [getDocument]);

  return { document };
};

export default useFetchDocument;
