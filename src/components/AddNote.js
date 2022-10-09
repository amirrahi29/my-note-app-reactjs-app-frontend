import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const AddNote = () => {

    const auth = localStorage.getItem('user');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [loader, isLoading] = useState(false);

    //navigate
    const navigate = useNavigate();


    //image handle
    const handleImageChange=(e)=>{
        console.log(e.target.files);
        setImage(e.target.files[0]);
    }

    const submitAddNote = async()=>{
        isLoading(true);
        const formData = new FormData();
        formData.append('user_id', JSON.parse(auth)._id);
        formData.append('title',title);
        formData.append('description',description);
        formData.append('image',image);

        let result = await fetch("http://localhost:9000/api/add_note",{
            method:'post',
            body:formData,
            headers:{
                'authorization':JSON.parse(auth).token
            }
        });

        result = await result.json();
        if(result.success === true){
            console.log(result);
            isLoading(false);
            navigate('/');
        }
        else if(result.success === false){
            console.log(result.msg);
            isLoading(false);
        }
        else{
            console.log('no response');
            isLoading(false);
        }

    }

    return (
        <div>
            <div className="addNoteForm">
                <h5>Add Note</h5>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Title</label>
                            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter title" className="form-control" />
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Description</label>
                            <textarea  value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter description" className="form-control" rows={5}></textarea>
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Choose Image</label>
                            <input type="file" onChange={handleImageChange}  placeholder="Enter title" className="form-control" />
                        </div>
                    </div>
                </div>

                <br />

                {loader?<div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>:<div className="row">
                    <div className="col-md-12">
                        <button className="form-control" onClick={submitAddNote}>Submit</button>
                    </div>
                </div>}
                
            </div>
        </div>
    )
}

export default AddNote;