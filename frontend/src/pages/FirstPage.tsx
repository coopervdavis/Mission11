import { useState } from 'react';
import '../App.css';
import BookList from '../components/BookList';
import Filter from '../components/Filter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function FirstPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container-fluid">
      {/* Cart floats top-right */}
      <div className="position-fixed top-0 end-0 p-3 z-3">
        <CartSummary />
      </div>

      {/* Welcome Band */}
      <div className="row mt-4 mb-3">
        <div className="col">
          <WelcomeBand />
        </div>
      </div>

      {/* Main Content */}
      <div className="row gx-4">
        {/* Filters - hug the left */}
        <div className="col-md-2">
          <div className="bg-light p-3 rounded shadow-sm sticky-top pe-md-4" style={{ top: '100px', minHeight: '300px' }}>
            <h5 className="mb-3">Book Categories</h5>
            <Filter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>

        {/* Book List - wide middle */}
        <div className="col-md-10">
          <div className="p-2">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
