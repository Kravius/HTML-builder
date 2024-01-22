const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
	if (err) {
		console.error(err);
		return;
	}
	for (let file of files) {
		const filePath = path.join(folderPath, file);

		fs.stat(filePath, (err, stats) => {
			if(err){
				console.error(err);
				return;
			}
			if(stats.isFile()) {
				const nameFile = path.parse(filePath).name;
				const extName = path.extname(filePath).slice(1);
				const size = stats.size / 1024;
				console.log(`${nameFile} - ${extName} - ${size.toFixed(3)}kb`)
			}
		})
	}
})