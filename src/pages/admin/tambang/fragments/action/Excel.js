import * as ExcelJS from 'exceljs';

export default async function Excel(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data Tambang');

    const headerRow = worksheet.addRow(['Nama Tambang']);

    headerRow.eachCell(cell => {
        cell.font = { bold: true };
    });

    headerRow.eachCell((cell, colNumber) => {
        worksheet.getColumn(colNumber).width = cell.value.toString().length + 5; // Tambahkan margin
    });

    await Promise.all(data.map(async item => {

        worksheet.addRow([
            item.nama,
            '',
        ]);

    }));

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'Data Tambang.xlsx';
    link.click();

    URL.revokeObjectURL(url)
}