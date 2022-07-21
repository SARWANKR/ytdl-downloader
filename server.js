const express = require("express");
const fs = require("fs");
var ytdl = require("ytdl-core");
const app = express();


app.get("/fetch", async (req, res) => {

    try {
        var url = req.query.url;
        var data = await ytdl.getInfo(url);
        var videos = [];
        for(const obj of data.formats){
            if(obj.itag == 137 || obj.itag == 22 || obj.itag == 18){
                videos.push(obj)
            }
        }
        if(videos.length>0){
            var datam = []
            for(const objects of videos){
               
                datam.push({
                    itag: objects.itag,
                    url: objects.url,
                    Quality: objects.qualityLabel,
                })
              
            }
            res.send({
                title: data.videoDetails.title,
                length : datam.length,
                Total_Views: data.videoDetails.viewCount,
                Category: data.videoDetails.category,
                thumbnail: data.videoDetails.thumbnails[0].url,
                videos:datam
            });
        }
        else {
            res.send({
                status : 400,
                message : "Cannot find this video"
            });

        }     
    }
    catch(err) {
        return res.status(201).send({ status: false, code: 201, message:err.message })
    }

});

app.listen(5000, () => {
    console.log(`Listening to server 5000`);
});
