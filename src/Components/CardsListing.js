import React from 'react';
import RestaurantsCard from './RestaurantCard';

const cardStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    maxWidth: "900px",
    margin: 'auto'
  }

const CardsListing = ({
  rests,
  onSelect,
  onDelete,
}) => {
  return (
    <div className={cardStyle}>
      {rests.map((rest, i) => (
        <RestaurantsCard
          key={rest.place}
          data={rest}
          // onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CardsListing;