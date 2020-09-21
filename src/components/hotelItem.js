import React from 'react';
import { defaultImage } from '../constants';


const Content = ({title, secondaryTitle, url}) => {

    return(
        <div className="hotel-content">
            <p className="hotel-title"> {title} </p>
            <p> {secondaryTitle} </p>
            <div style={{marginTop:"auto"}}>
                <a href={url} className="hotelLink" target="_blank" rel="noopener noreferrer">{url}</a>
            </div>
        </div>
    )
};


const HotelItem = ({item}) => {
    
    const imgLink = item.fields["Header image"]? item.fields["Header image"][0].url : defaultImage;
    const imgFileName = item.fields["Header image"]? item.fields["Header image"][0].filename : defaultImage;
    const title = item.fields.Headline;
    const subTitle = item.fields["Sub-headline"] || "" ;
    const link = item.fields.Link;

    return (
        <div className="border-2 shadow-lg hotel-item">
            <div className="hotel-image" style={{backgroundImage: `url(${imgLink})`}} alt={imgFileName}/>
            <Content title={title} secondaryTitle={subTitle} url={link}/>
        </div>
    )
};

export default HotelItem;