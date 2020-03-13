import path from 'path';
import fs from 'fs';
import axios from 'axios';
import sharp from 'sharp';

class Thumbnail {
    generateThumbnail(req, res) {
        const imageUri = req.query.imageUrl;
        console.log(imageUri)
        axios({
            method: "get",
            url: imageUri,
            responseType: "stream"
        }).then(function (response) {
            const newName = Date.now();
            response.data.pipe(fs.createWriteStream(`./thumbnails/${newName}.jpg`));
            const filePath = path.join(__dirname, `../../thumbnails${newName}.jpg`)
            // const downloadImagePath = filePath;
            sharp(filePath)
                .resize({
                    width: 50,
                    height: 50
                })
                // .toBuffer()
                .toFile(`./thumbnails/resize/${filePath}.jpg`, (err) => {
                    if (err) throw err;
                    res.json(`./thumbnails/resize/${filePath}.jpg`)
                })
                // .then();
        });
    }
}

export default new Thumbnail;