import React, {useState, useContext} from 'react';
import NavHeader from './NavHeader'
import { WeedContext } from '../context/WeedContext';
import { ProductContext } from '../context/ProductContext';
import { Link } from "react-router-dom";
const Saved = () => {
    const{savedList, setDummy}=useContext(WeedContext);
    const {deleteItem} = useContext(ProductContext);
    const [form,setForm] = useState({
        Strain:""
    })
    const handleClick = (item) => {
        setDummy(item);
        console.log(item)
    }
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
        <NavHeader />
        <div>
        <h3 className="ml-auto text-align-center">savedList</h3>
        {savedList.map((weed)  => (
           <div key={weed.id}>
           <h2>{weed.Strain}</h2>
           <Link key = {weed.id} to = {`/update-list/${weed.id}`} >
            <button onClick = {() => (handleClick(weed))}>Update Strain Name</button>
            </Link>
           <p>{weed.Description}</p>
           <button onClick = {() => (deleteItem(weed))}>Delete</button>
       </div> 
        ))}
        </div>
        </>
    )
}

export default Saved;
