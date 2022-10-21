export const changeData =  (data) => {
  try{
    var tmp = new DOMParser();
    let xml = tmp.parseFromString(data, "text/html"); //解析xml时为text/xml
    let dataList = xml.querySelectorAll("item");
  
    dataList = Array.prototype.map.call(dataList, (item) => {
      return {
        title: item?.querySelector("title")?.innerText,
        link: item?.querySelector("link")?.nextSibling.data,
        description: item?.querySelector("description")?.innerText,
        author: item?.querySelector("author")?.innerText,
        pubdate: item?.querySelector("pubdate")?.innerText,
      };
    });
    return dataList;
  }catch(err){
    console.log(err);
      return false
  }
  
};
