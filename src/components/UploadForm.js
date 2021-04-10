import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const allowedTypes = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError(`Please select a valid file type (${allowedTypes.join(', ')})`);
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      {error && <div className="error">{error}</div>}
      {file && <div>{`uploading ${file.name}...`}</div>}
      {file && <ProgressBar file={file} setFile={setFile} />}
    </form>
  );
};

export default UploadForm;
