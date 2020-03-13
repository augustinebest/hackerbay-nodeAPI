import sharp from 'sharp';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
const dir = path.join(__dirname, '/../../thumbnails/');

class Thumbnail {
    generateThumbnail(req, res) {
        const filename = req.query.imageUrl;
        axios({
            method: "get",
            url: filename,
            responseType: "stream"
        }).then(function (response) {
            const newName = Date.now(), w = 50, h = 50;
            const downloadImagePath = path.resolve(dir, `${newName}.jpg`)
            const writeImage = fs.createWriteStream(downloadImagePath);
            response.data.pipe(writeImage);
            const thumbnailPath = path.resolve(dir, `resize/thumb-${newName}-${w}x${h}.jpg`);
            writeImage.on('close', () => {
                sharp(downloadImagePath).resize({ width: w, height: h }).toFile(thumbnailPath).then(re => {
                    res.send(path.join(__dirname, `/../../thumbnails/resize/${newName}-${w}x${h}.jpg`))
                }).catch(err => console.log('error just happened', err))
            })
        });
    }
}

export default new Thumbnail;