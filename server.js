const express = require("express");
const fs = require("fs");
var ytdl = require("ytdl-core");
const app = express();


app.get("/data", async (req, res) => {
    var url = req.query.url;
    var data = await ytdl.getInfo(url);
    res.send({
        title: data.videoDetails.title,
        Total_Views: data.videoDetails.viewCount,
        Category: data.videoDetails.category,
        thumbnail: data.videoDetails.thumbnails[0].url,
        Download: `http://localhost:5000/download?url=${data.videoDetails.video_url}`,
        videos: [
            {
                itag: data.formats[0].itag,
                url: data.formats[0].url,
                Quality: data.formats[0].qualityLabel,
            },
            {
                itag: data.formats[16].itag,
                url: data.formats[16].url,
                Quality: data.formats[16].qualityLabel,
            },
            {
                itag: data.formats[17].itag,
                url: data.formats[17].url,
                Quality: data.formats[17].qualityLabel,
            },
        ],
    });
});

app.get("/download", async (req, res) => {
    res.header("Content-Disposition", 'attachment;  filename="Youtube Video.mp4');
    ytdl(req.query.url, { format: "mp4" }).pipe(
        fs.createReadStream("Youtube.mp4"),
        res
    );
});

app.listen(5000, () => {
    console.log(`Listening to server 5000`);
});
