const express = require("express");
const fs = require("fs");
var ytdl = require("ytdl-core");
const app = express();


app.get("/fetch", async (req, res) => {

    try {
        var url = req.query.url;
        var data = await ytdl.getInfo(url);
        res.send({
            title: data.videoDetails.title,
            Total_Views: data.videoDetails.viewCount,
            Category: data.videoDetails.category,
            thumbnail: data.videoDetails.thumbnails[0].url,
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
        
    }
    catch {
        return res.status(201).send({ status: false, code: 201, message: "Something went Wrong" })
    }

});

app.listen(5000, () => {
    console.log(`Listening to server 5000`);
});
