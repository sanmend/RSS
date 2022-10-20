import axios from "axios"
export const getData=async ()=>{
  let {data:res}=await axios({
    method: "get",
    url: "https://sspai.com/feed",
  })
  console.log(res.toString());
  console.log(typeof res);
  var substr2 = res.match(/\<channel\>(\S*)\<\/channel\>/);
  console.log("substr2");
  console.log(substr2);
}
