import React from 'react';

const HotelItemsGrid = ({items}) => {
   
    return(
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 justify-items-center hotel-items-container">
            {items}
        </div>
    )
};

export default HotelItemsGrid;

