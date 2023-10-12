"use client";

import { useCallback, useEffect, useState } from "react";

import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  type WhereFilterOp,
  type DocumentData,
} from "firebase/firestore";

const useFetchDocuments = (
  collectionName: string,
  arg: [string, WhereFilterOp, string]
) => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);

  const getDocuments = useCallback(async () => {
    const docRef = collection(db, collectionName);
    const q = query(docRef, where(arg[0], arg[1], arg[2]));
    const querySnapshot = await getDocs(q);
    let documentsArray: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      };
      documentsArray.push(data);
    });

    setDocuments(documentsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, arg[0], arg[1], arg[2]]);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  return { documents };
};

export default useFetchDocuments;
