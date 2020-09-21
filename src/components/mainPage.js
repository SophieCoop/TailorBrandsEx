import React, { useState, useEffect } from 'react';
import '../assets/styles/hotelItem.css';
import { items_per_page, min_width } from '../constants';
import Pagination from '../components/pagination/pagination';
import {getPageRecords, getAllRecords, getNumOfRecords} from '../api/apicalls';
import useWindowDimensions from './hooks/pageDimentionsHook';
import HotelItemsGrid from './hotelItemsGrid';
import HotelItem from './hotelItem';




const MainPage = () => {
    const [allItems, setAllItems] = useState([]);
    const [totalNumOfPages, setTotalNumOfPages] = useState(0);
    const [allOffSets, setOffSet] = useState([""]);
    const [currPage, setPage] = useState(1);
    const { width } = useWindowDimensions();
    
    
    useEffect(() => {
        if (totalNumOfPages === 0){
            getNumOfPages();
        }else{
            getRecords(allOffSets[currPage-1]);
        }      
    },[currPage, width]);

    const getNumOfPages = () => {
        getNumOfRecords()
        .then(numOfRecords => setTotalNumOfPages(Math.ceil(numOfRecords/items_per_page)))
        .then(() => getRecords(allOffSets[currPage-1]));
    }

    const getRecordsAccordingToScreenSize = (offSet) => {
        if (width > min_width){
            return getPageRecords(offSet);
        }
        return getAllRecords();
    }


    const getRecords = (offSet) => {
        getRecordsAccordingToScreenSize(offSet)
        .then(response => {
            if (!allOffSets[currPage]){
                const _allOffSets = [...allOffSets];
                _allOffSets[currPage] = response.offset;
                setOffSet(_allOffSets);
            }
            return response.records.map(item => {
                console.log("item: ", item);
                return(<HotelItem key={item.id} item ={item} />)
            })
        })
        .then(componentsList => {
            setAllItems(componentsList);
        });
    };

    const onNextPageClick = () => {
        console.log("onNextPageClick");
        const nextPage = currPage+1;
        if (nextPage <= totalNumOfPages){
            setPage(nextPage);
        }
    }
    const onPrevPageClick = () => {
        console.log("onPrevPageClick");
        const prevPage = currPage-1;
        if (prevPage >= 1) {
            setPage(prevPage);
        }
    }

    const onPageClick = (pageNum) => {
        console.log("pageClick");
        debugger;
        if (totalNumOfPages <= 2 && pageNum !== currPage){
            getPageRecords(allOffSets[pageNum-1]);
            setPage(pageNum);
        }
    }

    return (
        <div>
            <HotelItemsGrid items={allItems} />  
            {width > min_width && totalNumOfPages > 1 ?
                <Pagination totalPages={totalNumOfPages} 
                            currPage={currPage} 
                            onNextPageClick={onNextPageClick}
                            onPrevPageClick={onPrevPageClick}
                            onPageClick={onPageClick}/>
            : null}
        </div>
    )
};

export default MainPage;