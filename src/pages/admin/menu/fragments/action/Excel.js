import * as ExcelJS from 'exceljs';
import { base64ToBlob } from '../../../../../utils/helper/base64toimage';

export default async function Excel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data Unit');

  const headerRow = worksheet.addRow(['nomor', 'model', 'BBM', 'angkutan', 'status', 'average', 'service', 'service terakhir', 'pemakaian', 'gambar'])

  headerRow.eachCell(cell => {
    cell.font = { bold: true };
  });

  headerRow.eachCell((cell, colNumber) => {
    worksheet.getColumn(colNumber).width = cell.value.toString().length + 5; // Tambahkan margin
  });
  await Promise.all(data.map(async item => {
    const imageBlob = base64ToBlob(item.imageData); // Ganti ini dengan properti yang sesuai dari objek data Anda

    // Menambahkan gambar ke dalam sel
    const pictureId = await workbook.addImage({
      buffer: await imageBlob.arrayBuffer(),
      extension: 'png', // Pastikan gambar dalam format PNG
    });

    const row = worksheet.addRow([
      item.nomor_unit,
      item.nama_model,
      item.jenis_BBM,
      item.jenis_angkutan,
      item.status,
      `${item.average_BBM} Km/l`,
      `setiap ${item.service} bulan`,
      item.terakhir_service,
      item.pemakaian,
      '',
    ]);

    worksheet.addImage(pictureId, {
      tl: { col: 9, row: row.number },
      br: { col: 10, row: row.number + 1 },
    });
  }));

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'Data Unit.xlsx';
  link.click();

  URL.revokeObjectURL(url)
}