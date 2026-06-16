const XLSX = require('xlsx');
const wb = XLSX.readFile('../Controle Novos Clientes .xlsx');
console.log('Sheets:', wb.SheetNames);
for (const name of wb.SheetNames) {
  const ws = wb.Sheets[name];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  console.log('\n=== Sheet:', name, '===');
  console.log('Rows:', data.length);
  if (data[0]) console.log('Header:', data[0]);
  if (data[1]) console.log('Row 1:', JSON.stringify(data[1]));
  if (data[2]) console.log('Row 2:', JSON.stringify(data[2]));
}
