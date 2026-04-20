const fs = require('fs');
const parser = require('@babel/parser');

try {
  const code = fs.readFileSync('src/app/pages/samaj/RegistrationPage.tsx', 'utf-8');
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });
  print('Success!');
} catch (e) {
  console.log('Error Location:', e.loc);
  console.log('Error Message:', e.message);
}
