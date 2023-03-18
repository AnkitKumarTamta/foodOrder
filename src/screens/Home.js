import React,{useState,useEffect} from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import img1 from '../components/images/img1.jpg'
import img2 from '../components/images/img2.jpg'
import img3 from '../components/images/img3.jpg'

const Home = () => {
     const [fooditems,setFooditems] = useState([]);
     const [foodcategory,setFoodcategory] = useState([]);
     const [search, setSearch] = useState('')

     const loadData = async()=>{
        let response = await fetch('http://localhost:5000/api/foodData',{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            }
        })

        response = await response.json();
        setFooditems(response[0]);
        setFoodcategory(response[1]);
     }

     useEffect(() => {

        loadData()
       
     }, [])
     

  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner" id='crouel' style={{objectFit:"contain !important"}}>
    <div className='carousel-caption' style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active">
      <img src={img1} style={{filter:"brightness(30%)"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={img2} style={{filter:"brightness(30%)"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={img3} style={{filter:"brightness(30%)"}} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </div>
        <div className='container'>
            
            {
                foodcategory !==[]
                ? foodcategory.map((data)=>{
                    return(
                        <div className='row mb-3'>
                        <div key={data._id} className='fs-3 m-3'>
                          {data.CategoryName}
                        </div>
                        <hr/>
                        {fooditems !==[] 
                        ? 
                        fooditems.filter((item)=> (item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                        .map((filterItems)=>{
                            return(
                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'> 
                                <Card
                                foodItem ={filterItems} options={filterItems.options[0]} ></Card>
                                </div> 
                            )
                        } 
                        ): <div>no such data</div> }
                        
                        </div>
                    )
                }) 
                : ""
                
            }
            
            
        </div>
        <div>
            <Footer />
        </div>
    </div>
  )
}

export default Home