import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import TextTransition, { presets } from 'react-text-transition';
import BookSection from '../Components/BookSection';
import { TopSection } from '../Components/TopSection';
import Button from '../Components/Button'
import Loader from '../Components/Loader';
import NoBooks from '../Components/NoBooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { FavoriteContext } from '../ContextProvider'

export default function Home() {
    const sectionRef = useRef()
    const [page, setPage] = useState(1)
    const [Loading,setLoading] = useState(false)
    const navigate = useNavigate()


    const placeHolder = () => {
        switch (searchFor) {
            case 'Book Name': return 'eg: Harry Potter'
            case 'Author': return 'eg: J K Rowling'
            case 'Genre': return 'eg: Adventure'
            case 'ISBN': return 'eg: 0613942892'
            case 'Person': return 'eg: Hermione'
            default: return 'search for a book'
        }
    }

    const [search, setSearch] = useState('')
    const [searchFor, setSearchFor] = useState('title')
    const searchTag = ['Book Name', 'Author', 'Genre', 'ISBN', 'Person']

    const set_search_type = () => {
        switch (searchFor) {
            case 'Book Name': return 'title'
            case 'Author': return 'author'
            case 'Genre': return 'subject'
            case 'ISBN': return 'isbn'
            case 'Person': return 'person'
            default: return 'title'
        }
    }

    const { BookResults, setBookResults } = useContext(FavoriteContext)

    useEffect(() => {
        if (BookResults) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [BookResults]);

    const SearchBook = async () => {
        setLoading(true)
        const type = set_search_type() || 'title'
        try {
            const result = await axios.get(`https://openlibrary.org/search.json?${type}=${search || 'all'}&limit=100&page=${page}`)
            if (result.status === 200) {
                setBookResults(result.data)
                setLoading(false)
            } else {
                console.error('Error in fetching books')
            }
        } catch (err) {
            toast("OPPS!!, Error in Connecting. Please try again after some time");
            console.error("Error fetching Books")
        }
    }

    useEffect(() => {
        if(search){
            setLoading(true)
            SearchBook();
        }
    }, [page]);

    const handleSearchFor = (val)=>{
        setSearchFor(val)
    }

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    }
    const handlePrevPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <ToastContainer />
                <TopSection />
                <div className='w-full max-w-md flex md:flex-row items-center gap-2 my-2'>
                    {searchTag.map((val, ind) => (
                        <p key={ind} className='p-2 border rounded-[50px] cursor-pointer'
                            onClick={() => handleSearchFor(val)}
                            style={{
                                borderColor: searchFor === val ? 'red' : 'darkgray',
                                color: searchFor === val ? 'red' : 'darkgray',
                            }}
                        >
                            {val}
                        </p>
                    ))}
                </div>
                <div className="w-full max-w-md flex flex-col md:flex-row items-center gap-2">
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder={`${placeHolder()}`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        onClick={SearchBook}
                        disabled={Loading}
                        className='w-full md:w-auto px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out'
                    >
                        {Loading? <Loader/> : 'Search'}
                    </Button>
                </div>
            </div>
            <div ref={sectionRef} className='mx-10'>
                {
                    BookResults?.numFound === 0 || BookResults?.docs.length === 0 ?
                    <NoBooks/>
                    :
                    <BookSection books={BookResults} />
                }
            </div>

            {
                BookResults?.numFound > 100 &&
                <div className="flex justify-center items-center my-4">
                    <button 
                        onClick={handlePrevPage} 
                        className={`px-4 py-2 mx-2 border rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`} 
                        disabled={page === 1}
                    >
                        &larr; Previous
                    </button>
                    {
                        Loading?
                        <span>Loading...</span>
                        :
                        <span>Page {page}</span>
                    }
                    <button 
                        onClick={handleNextPage} 
                        className="px-4 py-2 mx-2 border rounded hover:bg-gray-200"
                    >
                        Next &rarr;
                    </button>
                </div>
            }
        </div>
    )
}