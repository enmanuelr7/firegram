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

    function delay(t, v) {
      return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t);
      });
    }

    function keepTrying(triesRemaining, storageRef) {
      if (triesRemaining < 0) {
        return Promise.reject('out of tries');
      }

      return storageRef
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .catch((error) => {
          switch (error.code) {
            case 'storage/object-not-found':
              return delay(2000).then(() => {
                return keepTrying(triesRemaining - 1, storageRef);
              });
            default:
              console.log(error);
              return Promise.reject(error);
          }
        });
    }

    function resizedName(fileName, dimensions) {
      const extIndex = fileName.lastIndexOf('.');
      const ext = fileName.substring(extIndex);
      return `${fileName.substring(0, extIndex)}_${dimensions}${ext}`;
    }

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
        const storageRef = storage.ref(resizedName(file.name, '1000x1000'));
        const thumbnailRef = storage.ref(resizedName(file.name, '200x200'));

        keepTrying(10, storageRef).then((fullSizeURL) => {
          keepTrying(10, thumbnailRef).then((thumbnailURL) => {
            setURL(thumbnailURL);
            collectionRef.add({
              fullSizeURL,
              thumbnailURL,
              createdAt: timestamp(),
            });
          });
        });
      }
    );
  }, [file]);

  return { progress, error, url };
};

export default useStorage;
