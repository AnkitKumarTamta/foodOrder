import React, { useRef, useState,useEffect } from "react";
import { useCartDispatch,useCartState } from "./ContextReducer";

const Card = (props) => {

  const [qty, setQty] = useState('1');
  const [size, setSize] = useState('')

  const priceRef = useRef();

  let dispatch = useCartDispatch();
  let data = useCartState();

  let options = props.options;
  let optionskey = Object.keys(options)
  
  const handleAddtoCart = async()=>{
    let food = [];
    for(const item of data)
    {
      if(item.id === props.foodItem._id)
      {
        food = item;
        break;
      }
    }

    if(food !== [])
    {
      if(food.size === size)
      {
        await dispatch({type:"UPDATE", id:props.foodItem._id, price: finalPrice, qty:qty})
        return
      }
      else if(food.size !== size)
      {
        await dispatch({type: "ADD", id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty: qty,size: size})
        return
      }
      return
    }
    await dispatch({type: "ADD",id:props.foodItem._id, name:props.foodItem.name,price:finalPrice,qty: qty,size: size})
    console.log(data)
  }

  let finalPrice = qty * parseInt(options[size])
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="ki" />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                {
                  optionskey.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                  })
                }
              </select>
              <div className="d-inline h-100 fs-">{finalPrice}/-</div>
            </div>
            <hr></hr>
            <button className="btn btn-success justify-center " onClick={handleAddtoCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
