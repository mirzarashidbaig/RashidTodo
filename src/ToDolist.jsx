/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { React, useEffect, useState } from 'react';
import './App.css'
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdRestoreFromTrash } from 'react-icons/md';
import { MdOutlineEditNote } from 'react-icons/md';

const ToDolist = () => {

    // to get data from local stoarage

    const DataBack = () =>{
        let Data = localStorage.getItem('items');

        if(Data){
          return  JSON.parse(localStorage.getItem('items'));
        }
        return [];

    }


// intiazing usestate for inputs and update in array and toggle buttons and edit elements
    const [items, Setitems] = useState('');
    const [AddItem, setAddItem] = useState(DataBack());
    const [togle, settogle] = useState(true);
    const [editItems, SetEditItmes] = useState(null);



    const AddItems = () => {

        if (!items) {
            alert("You Must Add Something")
        }
        else if (items && !togle) {
            setAddItem(

                AddItem.map((Elem) => {
                    if (Elem.id === editItems) {
                        return { ...Elem, input: items }
                    }
                    return Elem;
                })
            )

            settogle(true)

            Setitems(" ");

            SetEditItmes(null)


        }
        else {

            const Allitems = { id: new Date().getTime().toString(), input: items }
            setAddItem((preVal) => {
                return (

                    [...preVal, Allitems]
                )

            })

            Setitems('');
        }




    }

    // Deleting button function

    const BtnDlt = (index) => {
        const updatedData = AddItem.filter((Elem) => {
            return index !== Elem.id;
        })

        setAddItem(updatedData);
    }

    // Edit button function

    const editbtn = (id) => {
        const newEditItems = AddItem.find((Elem) => {
            return id === Elem.id;
        })

        settogle(false)

        Setitems(newEditItems.input);

        SetEditItmes(id)
    }


  // to set data from local stoarage
  
    useEffect(()=>{
        localStorage.setItem('items',JSON.stringify(AddItem));
    },[AddItem])

    return (
        <>
            <div className="toDo">
                <div className="contentoftodo">

                    <div className="headaing">
                        <h1>ToDoList</h1>
                    </div>
                    <div className="inputbox">
                        <input type="text" name="" id="" value={items} onChange={(e) => Setitems(e.target.value)} />
                        {
                            togle ? <button className='addbtn' onClick={AddItems}><FaPlus className='Add' /></button> :
                                <button className='addbtn' onClick={AddItems}><FaEdit className='Add' /></button>
                        }

                    </div>
                </div>
                <div className="Listitem">
                    <ul className="List" >

                        {
                            AddItem.map((curEle, index) => {
                                return (
                                    <>
                                        <div className="listitems" key={index}>
                                            <li key={curEle.id} className="" >{curEle.input} </li>
                                            <button className='edit' onClick={() => editbtn(curEle.id)}> <MdOutlineEditNote className='edit' /></button>
                                            <button className='delete' onClick={() => BtnDlt(curEle.id)} ><MdRestoreFromTrash className='delete' /></button>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </ul>





                </div>
            </div>
        </>

    )
}

export default ToDolist
