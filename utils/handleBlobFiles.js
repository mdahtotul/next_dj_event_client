export const blobToDataURL = (blob, setFile) => {
  if (blob === undefined) {
    setFile("");
    return;
  }

  let reader = new FileReader();
  reader.onload = (e) => {
    setFile({
      file: e.target.result,
      name: blob.name,
      type: blob.type,
      size: blob.size,
    });
  };
  reader.readAsDataURL(blob);
};
