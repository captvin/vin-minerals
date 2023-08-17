export function base64ToBlob(base64Data, contentType = 'image/png') {
    const base64ImageData = base64Data.replace(/^data:image\/(png|jpeg);base64,/, '');
    const byteCharacters = atob(base64ImageData);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
}

//   // Contoh penggunaan:
//   const base64ImageData = '...'; // Ganti ini dengan data gambar base64
//   const imageBlob = base64ToBlob(base64ImageData);