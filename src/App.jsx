import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit]= useState(4);
  const [input, setInput] = useState(1);
  const [photos, setPhotos] = useState([]);
  
  useEffect(()=>{
    setLoading(true);
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((res)=>res.json())
    .then((data)=>{
      setPhotos(data);
      setLoading(false);
    })
    .catch(()=>setLoading(false));
  }, [page, limit]);

  function handleSubmit(e){
    e.preventDefault();
    setPage(input);
  }

  function handlelPage(value){
    if(value < 1) return;
    setPage(parseInt(value));
  }

  if(loading){ return <p>Loading...</p>;}

  return (
    <main className='container'>
      <h3>Random Image</h3>
    
      <form onSubmit={(e)=>handleSubmit(e)} className='mb-3'>
        <div className='input-group'>
          <label className='input-group-text'>Page Size</label>
          <select onChange={(e)=>setLimit(e.target.value)} value={limit}
            className='form-select'>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
          <label className='input-group-text'>Page</label>
          <input type='number' onChange={e=>setInput(e.target.value)} 
          min={1} className='form-control'
          />
          <button type='submit' className='btn btn-info'>Load</button>
        </div>
      </form>

      <ul className='d-flex flex-wrap'>
        {photos.map((photo)=>(
          <li key={photo.id} className='card photo-card'>
            <img src={photo.download_url} className='photo-img'/>
            <span className='photo-id badge bg-light text-dark'>{parseInt(photo.id)+1}</span>
          </li>
        ))}
        
      </ul>

      <div className='d-flex justify-content-center'>
        <div className='btn-group'>
          <button className='btn btn-outline-info'
            onClick={()=>handlelPage(page-1)}>&laquo;</button>
          <span className='btn btn-info'>{page}</span>
          <button className='btn btn-outline-info'
          onClick={()=>handlelPage(page+1)}>&raquo;</button>
        </div>
      </div>
      
    </main>
  )
}

export default App
