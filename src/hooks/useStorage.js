import { useState, useEffect } from 'react';
import { storage, firestore, timestamp } from '../firebase';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setURL] = useState(null);

  useEffect(() => {
    // references
    const fileRef = storage.ref(file.name);
    const collectionRef = firestore.collection('images');

    fileRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await fileRef.getDownloadURL();
        collectionRef.add({ url, createdAt: timestamp() });
        setURL(url);
      }
    );
  }, [file]);

  return { progress, error, url };
};

export default useStorage;
