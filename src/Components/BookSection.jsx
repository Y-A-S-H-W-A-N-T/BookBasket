import React, { useEffect, useState, memo } from 'react'
import { useNavigate } from 'react-router';

const BookSection = memo(({ books }) => {
    const navigate = useNavigate()

    // opening a particular book in a new page
    const View_Book = (e,book_key,author_name)=>{
        e.preventDefault()
        navigate(`/book${book_key}?&author=${author_name}`);
    }
    console.log(books)

    // Directing user to amazon page to buy the clicked product
    const Purchase_Book = (e,amazon_id)=>{
        e.preventDefault()
        e.stopPropagation()
        window.open(`https://www.amazon.com/dp/${amazon_id}`, "_blank"); // navigating to amazon with amazon id
    }

    // Books card section
    // Contains details about books
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books && books.docs.map((book, ind) => (
                <div key={ind} className="bg-white p-4 shadow-red-200 rounded-lg shadow-sm mb-4 flex items-center space-x-4 hover:shadow-red-200 hover:shadow-2xl transition-shadow duration-300"
                    onClick={(e)=>View_Book(e,book.key,book.author_name)}
                >
                    <div className="h-40 w-32 overflow-hidden rounded-lg border border-gray-300">
                        <img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`}
                            alt="book image"
                            className="w-full h-full"
                        />
                    </div>
                    
                    {/* Book Details */}
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 font-bold">{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
                        <p className="text-sm text-gray-500">Reviews: {book.ratings_count? book.ratings_count : 'none'}</p>
                        <p className="text-sm text-gray-500">Read by: {book.already_read_count? book.already_read_count : '0'}</p>
                        <p className="text-sm text-gray-500">Rating: {book.ratings_sortable? <>{`${book.ratings_sortable?.toFixed(2)}`}&#9733;</> : 'none'}</p>
                        <div className='flex'>
                            <p className="text-sm text-gray-500 mr-1">{book.first_publish_year ? `Published on: ${book.first_publish_year}` : 'Year Unknown'}</p>
                            <p className='ml-auto border p-2 rounded-xl border-black hover:border-green-400 cursor-pointer hover:text-green-400'
                                onClick={(e)=>Purchase_Book(e,book.id_amazon[0])}
                            >
                                PURCHASE
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default BookSection;