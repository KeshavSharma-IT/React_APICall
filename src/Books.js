import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { BiLinkExternal } from "react-icons/bi";



const Books = () => {
    const [books,setBooks]=useState([])
    useEffect(()=>{
        
        const fetchBooks=async()=>{
            const res=await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_BOOKS_API_KEY}`)
            console.log(res.data);
            setBooks(res.data.results.books)
        }
        fetchBooks()
    },[])

  return <div>
      <h1 className='font-bold text-center text-4xl py-10 lg:text-8xl'>Books</h1>
      <section className="grid grid-cols-1 gap-10 px-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book)=>{
              const {author,book_image,buy_links,
            description,primary_isbn10,publisher,rank,
        title}=book

        return(
        <article key={rank} className="bg-gray-100 py-5 px-10 rounded-lg sm:px-5 mb-10">
            <div >
                <img src={book_image} alt={title} 
                className="block mx-auto my-2 w-1/2"/>
            </div>
            <hr></hr>
            <div>
                <h3 className='font-bold my-2 text-2xl'>{title}</h3>
                <p className='mb-4'>  {description}</p>
                <p ><span className='font-bold'>Author: </span>{author}</p>
                <ul>
                    <li ><span className='font-bold'>Publisher: </span>{publisher}</li>
                    <li ><span className='font-bold'>ISBN: </span>{primary_isbn10}</li>
                </ul>
                <ul>
                    <h3 className='font-bold text-xl'>Buy now</h3>
                    {buy_links.map((link)=>{
                        const{name,url}=link
                        return(
                            
                            <div key={name}>
                                <a href={url} className='flex item-center' target="_blank"> {name}<BiLinkExternal className='ml-1'/></a>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </article>)
          })}
      </section>
  </div>;
};

export default Books;
