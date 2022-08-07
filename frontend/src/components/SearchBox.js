import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const SearchBox = () => {
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState("");


    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
        setKeyword('')
    }

    const inputHandler = (e) => {
        setKeyword(e.target.value)
    }


    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control 
             type='text' 
             name='q' 
             placeholder='Search Products...' 
             value={keyword}
             onChange={inputHandler} 
             className="mr-sm-2 ml-sm-5"></Form.Control>
            <Button type='submit' variant='success' className='p-2'>Search</Button>
        </Form>
    );
};

export default SearchBox;