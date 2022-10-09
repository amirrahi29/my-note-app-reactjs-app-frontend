import React,{useEffect,useState} from "react";
import {Link} from 'react-router-dom';

const Notes = () => {

    //locastorage
    const auth = localStorage.getItem('user');

    //parameter
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async()=>{
        let result = await fetch("http://localhost:9000/api/get_notes",{
            method:'post',
            body:JSON.stringify({"user_id":JSON.parse(auth)._id}),
            headers:{
                'Content-Type':'application/json',
                'authorization':JSON.parse(auth).token
            }
        });

        result = await result.json();
        if(result.success === true){
            console.log(result);
            setProducts(result.data);
        }else if(result.success === false){
            console.log(result.msg);
        }else{
            console.log("no response");
        }
    }

    const deleteSubmit = async(note_id)=>{
        let result = await fetch("http://localhost:9000/api/delete_notes",{
            method:'post',
            body:JSON.stringify({"note_id":note_id}),
            headers:{
                'Content-Type':'application/json',
                'authorization':JSON.parse(auth).token
            }
        });

        result = await result.json();
        if(result.success === true){
            getProducts();
        }else{
            console.log("no response");
        }
    }

    const searchNote=async(e)=>{
        var serachKey = e.target.value;

        if(serachKey){
            let result = await fetch("http://localhost:9000/api/serach_note/"+serachKey+"/"+JSON.parse(auth)._id,{
                method:'get',
                headers:{
                    'authorization':JSON.parse(auth).token
                }
            });

            result = await result.json();
            if(result.success === true){
                setProducts(result.data);
            }else{
                console.log("no response");
            }
        }else{
            getProducts();
        }
    }

    return (
        <div>
             <br/>
            <div className="row">
               
                <div className="col-md-4">
                   <input type="search" onChange={searchNote} className="form-control" placeholder="Search here...." />
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {products.map((item,index)=>
                     <tr>
                        <th scope="row">{index+1}</th>
                        <td><img src={"http://localhost:9000/NotesImages/"+item.image} style={{borderRadius:8}}
                         height={50} width={50} /></td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td><Link to={'/update/'+item._id} className="btn btn-primary">Edit</Link></td>
                        <td><button className="btn btn-danger" onClick={()=>deleteSubmit(item._id)}>Delete</button></td>
                    </tr>
                    )}
                   
                </tbody>
            </table>
        </div>
    )
}

export default Notes;