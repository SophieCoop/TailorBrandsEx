import React from 'react';


const PageNumber = ({pageNum, isCurrent, onPageClick}) => {
    const basicClass = "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium";
    const hoverFocusStyle = " hover:text-gray-300 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue";
    const activeStyle = "active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150";
    
    const classChosenItem = basicClass + " text-gray-700" + hoverFocusStyle + activeStyle;
    const classNotChosenItem = basicClass + " text-gray-500" + hoverFocusStyle + activeStyle;
    
    return (
        <a href="#" className={isCurrent? classChosenItem: classNotChosenItem} onClick={() => onPageClick(pageNum)}>
            {pageNum}
        </a>
    )
};


const Pages = ({totalPages, currPage, onPageClick}) => {

    let pagesList = [];

    for (var i=1; i<totalPages+1; i++){

        if (i === 4 && totalPages > 6){
            let middleItem = (<span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
            ...
            </span>);
            pagesList = [...pagesList, middleItem];
            i = totalPages - 2;
        }

        pagesList = [ ...pagesList, <PageNumber key={i} pageNum={i} isCurrent={i===currPage} onPageClick={onPageClick}/>];
    }

    return (
        <div>
            {pagesList}
        </div>
    )
}

const NavigationErrows = ({isPrev, onClickCallback}) => {

const dPrev = "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z";
const dNext = "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z";

const generalClass = "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
const classPrev = generalClass + " rounded-l-md";
const classNext = "-ml-px " + generalClass + " rounded-r-md";
    return (
        <a href="#" onClick={onClickCallback} className={isPrev? classPrev: classNext} aria-label={isPrev ? "Previous": "Next"}>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d={isPrev? dPrev: dNext} clipRule="evenodd" />
            </svg>
        </a>
    )
}


const Pagination = ({totalPages, currPage, onNextPageClick, onPrevPageClick, onPageClick}) => {

    return (
        <div className="bg-white px-4 py-3 flex justify-center items-center border-t border-gray-200 sm:px-6">
            <nav className="relative z-0 inline-flex shadow-sm">
                {currPage === 1 ? null : <NavigationErrows isPrev={true} onClickCallback={onPrevPageClick}/>}
                <Pages totalPages={totalPages} currPage={currPage} onPageClick={onPageClick}/>
                {currPage === totalPages ? null :<NavigationErrows isPrev={false} onClickCallback={onNextPageClick}/>}
            </nav>
        </div>
    )
}

export default Pagination;