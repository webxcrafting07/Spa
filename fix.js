const fs = require('fs');
const file = 'd:/luxury-spa/src/app/(public)/booking/page.tsx';
let data = fs.readFileSync(file, 'utf8');
data = data.replace(/\\`/g, '`').replace(/\\\$\{/g, '${');
fs.writeFileSync(file, data);
