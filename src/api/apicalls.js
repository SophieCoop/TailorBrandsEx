import { items_per_page, mainUrl } from '../constants';

const pageSize = "&pageSize=" + items_per_page; 


const getNumOfRecords = () => {
    const urlParams = mainUrl + "&fields[]=Headline";
    return sendGetRequest(urlParams)
            .then(data => data.records.length);
}

const getAllRecords = () => {
    var neededFields = ["Headline", "Header image", "Sub-headline", "Link"];
    neededFields = neededFields.map(field => "&fields[]="+field).join("");
    
    const urlParams = mainUrl + neededFields;
    return sendGetRequest(urlParams);
}


const getPageRecords = (offset) => {
    let offsetStr = "";
    if (offset) {
        offsetStr = "&offset="+offset;
    }

    var neededFields = ["Headline", "Header image", "Sub-headline", "Link"];
    neededFields = neededFields.map(field => "&fields[]="+field).join("");
    
    const urlParams = mainUrl + pageSize + offsetStr + neededFields;
    return sendGetRequest(urlParams);
}


const sendGetRequest = (urlRequest) => {
    return fetch(encodeURI(urlRequest), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then((resp) => resp.json())
    .then(data => {
        return data;
    }).catch(err => {
        console.error(err);
    });
}

export {getPageRecords, getAllRecords, getNumOfRecords};