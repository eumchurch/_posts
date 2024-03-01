
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PLAYLIST_ID_SERMON = "PLzCVCPy03Qq1ySW_mrIsXdrrDw35NBRyE";
const PLAYLIST_ID_QT = "PLzCVCPy03Qq2itb1HzvL5CV-TwTCRfFRA";

const baseurl = 'https://www.googleapis.com/youtube/v3/playlistItems';
const params = {
    key: GOOGLE_API_KEY,
    playlistId: PLAYLIST_ID_SERMON,
    maxResults: 20,
    part: "snippet"
};

const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
const requrl = `${baseurl}?${queryString}`;

const getData = async() => {
  const res = await fetch(requrl);
  const data = await res.json();

  let items = data?.["items"];
  if (items) {
    console.log("items ok");
    for (const item of items) {
      let snippet = item?.["snippet"];
      if (snippet) {
        let publishedAt = snippet?.["publishedAt"];
        let videoId = snippet?.["resourceId"]?.["videoId"];
        let description = snippet?.["description"];

        let array = description.split("\n\n");

        console.log("publishedAt: " + publishedAt + ", videoId: " + videoId);

        if array.length == 3 {
          console.log("  title: " + array[1] + ", subtitle: " + array[0] + ", contents: " + array[2]);
        } else {
          console.log("  " + array.length + ", " + array);
        }
      }
    }
  }
};

getData();
