import React from 'react';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';
import Modal from './components/Modal';
import { useState } from 'react';

function App() {
  const [selectedImg, setSelectedImage] = useState(null);

  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImage={setSelectedImage} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImage={setSelectedImage} />
      )}
    </div>
  );
}

export default App;
