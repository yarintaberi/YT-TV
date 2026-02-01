const http = require("http");
const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
  id: "org.cbs.live",
  version: "1.0.0",
  name: "CBS Live",
  description: "Watch CBS live",
  resources: ["stream"],
  types: ["tv"],
  catalogs: []
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(({ id }) => {
  if (id !== "cbs") return Promise.resolve({ streams: [] });

  return Promise.resolve({
    streams: [
      {
        title: "CBS Live",
        url: "https://list.iptvcat.com/my_list/s/1d0316d039eedda854185dd09a33a72a.m3u8"
      }
    ]
  });
});

// ⭐ חובה ב-BeamUp
const port = process.env.PORT || 7000;

http.createServer((req, res) => {
  builder.getInterface()(req, res);
}).listen(port, () => {
  console.log("Stremio addon running on port " + port);
});
