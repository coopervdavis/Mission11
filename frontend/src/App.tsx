import { useState } from 'react'
import './App.css'
import BookList from './BookList'
import Filter from './Filter'
import WelcomeBand from './WelcomeBand'
function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  return (    
  <>
      <div className='container'>
      <div className='row'>
        <WelcomeBand />
      </div>
        <div className='row'>
          <div className='col-md-3'>
              <Filter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
          </div>
          <div className='col-md-9'>
                  <BookList selectedCategories={selectedCategories}/>
          </div>
        </div>

      </div>




    </>
  )
}

export default App
