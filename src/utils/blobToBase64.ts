
//callback - where we want to get result
const blobToBase64 = (blob : any, callback : any) => {
    const reader = new FileReader();
    reader.onload = function () {
      let base64data = reader?.result;
      base64data = (base64data as string).split(",")[1]
      callback(base64data);
    };
    reader.readAsDataURL(blob);
  };
  
  export { blobToBase64 };