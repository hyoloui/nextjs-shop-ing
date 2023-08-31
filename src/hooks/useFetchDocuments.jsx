"use client";

import { useCallback, useEffect, useState } from "react";

import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const useFetchDocuments = (collectionName, arg) => {
  const [documents, setDocuments] = useState([]);

  const getDocuments = useCallback(async () => {
    const docRef = collection(db, collectionName);
    const q = query(docRef, where(arg[0], arg[1], arg[2]));
    const querySnapshot = await getDocs(q);
    let documentsArray = [];

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
