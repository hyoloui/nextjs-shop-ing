"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = useCallback(() => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("👉  allData  allData:", allData);
        setData(allData);
        setIsLoading(false);
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, [collectionName]);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  return { data, isLoading };
};

export default useFetchCollection;
