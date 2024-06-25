import { renderFile } from 'ejs';
import { writeFileSync } from 'fs';
import { join } from 'path';

const templatePath = join(__dirname, 'views', 'index.ejs');
const outputPath = join(__dirname, 'public', 'index.html');

renderFile(templatePath, {}, (err, str) => {
    if (err) {
        console.error(err);
    } else {
        writeFileSync(outputPath, str);
        console.log('HTML file generated successfully!');
    }
});
