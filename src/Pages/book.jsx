import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import Skeleton from '../Components/Skeleton';

export default function Book() {
    const location = useLocation()
  const { bookID } = useParams();
  const queryPrams = new URLSearchParams(location.search)
  const author = queryPrams.get('author')
  const [book, setBook] = useState();
  const [Loading,setLoading] = useState(false)

  const [choice,setChoice] = useState('Tags')

  const fetchBook = async () => {
    setLoading(true)
    try {
      const result = await axios.get(`https://openlibrary.org/works/${bookID}.json`);
      console.log(JSON.stringify(result.data,null,2))
      if (result.status === 200) {
        setBook(result.data);
        setLoading(false)
      } else {
        console.error('Error while fetching book details');
      }
    } catch (err) {
      console.error("Error while fetching book details");
    }
  };

  useEffect(() => {
    fetchBook();
  }, [bookID]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  // displaying selected component to ui (Tags|Characters|Places)
  const ShowChoice = ()=>{
    if(choice === 'Tags'){
        return (
            <div className="flex flex-wrap p-4 gap-2">
            {/* linking each key words/ data to wikipedia links */}
            {book.subjects?.map((tag, ind) => (
              <Link to={`https://en.wikipedia.org/wiki/${tag}`} target='_blank' key={ind} className="border p-2 rounded-2xl border-gray-400">
                {tag}
              </Link>
            ))}
          </div>
        )
    }
    if(choice === 'Characters'){
        return (
            <div className="flex flex-wrap p-4 gap-2">
            {/* linking each key words/ data to wikipedia links */}
            {book.subject_people?.map((tag, ind) => (
              <Link to={`https://en.wikipedia.org/wiki/${tag}`} target='_blank' key={ind} className="border p-2 rounded-2xl border-gray-400">
                {tag}
              </Link>
            ))}
          </div>
        )
    }
    if(choice === 'Places'){
        return (
            <div className="flex flex-wrap p-4 gap-2">
            {/* linking each key words/ data to wikipedia links */}
            {book.subject_places?.map((tag, ind) => (
              <Link to={`https://en.wikipedia.org/wiki/${tag}`} target='_blank' key={ind} className="border p-2 rounded-2xl border-gray-400">
                {tag}
              </Link>
            ))}
          </div>
        )
    }
  }

  return (
    <>
      {Loading?
        <div className='m-20'>
          {/* Skeleton loader */}
          <Skeleton/>
        </div>
        :
        <>
          { book && 
          <>
            {/* Displaying Individual Book Detail */}
            <div className="flex flex-col lg:flex-row p-4 w-full mt-10 overflow-x-hidden">
                <div className="lg:w-1/3 w-full mb-4 lg:mb-0">
                {/* Image slider */}
                <Slider {...settings}>
                    {book.covers?.filter(coverId => coverId !== -1).map((coverId, index) => (
                        <div key={index}>
                        <div className="flex justify-center items-center">
                            <img
                                src={`https://covers.openlibrary.org/b/id/${coverId}.jpg`}
                                alt={`Cover ${index + 1}`}
                                className="w-80 h-80 rounded mb-10"
                            />
                        </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="lg:w-2/3 w-full flex flex-col lg:pl-8">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 mt-1">
                {book.title || 'Untitled'}
                </h1>
                <div className='h-[1px] bg-gray-400 w-[350px] md:w-[600px]'></div>
                <p className="text-gray-700 w-[350px] justify-center text-center flex flex-col md:w-[600px] mt-5">
                {book.description?.value || book.description || 'No description available'}
                </p>
            </div>
            <div>
            </div>
            </div>
            {author &&
            <div className='ml-20 mt-5 flex'>
                <p className='font-bold mr-2'>Author:</p><span>{author}</span>
            </div>}
            {book.revision &&
            <div className='ml-20 mt-5 flex'>
                <p className='font-bold mr-2'>Revision:</p><span>{book.revision}</span>
            </div>}
            {
              book.links?.length > 0 &&
              <div className='ml-20 mt-5'>
                  <p className='font-bold'>Relevant Links:</p>
                  <div className='flex flex-wrap'>
                      {
                          book.links?.map((ref,ind)=>(
                              <div key={ind} className='flex mx-3 my-2'>
                                  <Link to={ref.url} target='_blank'
                                      className='border p-2 text-blue-400'
                                  >
                                      {ref.title}
                                  </Link>
                              </div>
                          ))
                      }
                </div>
              </div>
            }
            <div className='flex ml-20 mt-5'>
                <p className='mx-2 cursor-pointer'
                    onClick={()=>setChoice('Tags')}
                    style={{
                        borderBottomWidth: choice === 'Tags'? 2 : 0,
                        borderColor: 'black'
                    }}
                >Tags</p>
                <span className='text-gray-400'>|</span>
                <p className='mx-2 cursor-pointer'
                    onClick={()=>setChoice('Characters')}
                    style={{
                        borderBottomWidth: choice === 'Characters'? 2 : 0,
                        borderColor: 'black'
                    }}
                >Characters</p>
                <span className='text-gray-400'>|</span>
                <p className='mx-2 cursor-pointer'
                    onClick={()=>setChoice('Places')}
                    style={{
                        borderBottomWidth: choice === 'Places'? 2 : 0,
                        borderColor: 'black'
                    }}
                >Places</p>
            </div>
            <div className='ml-20 mt-5'>
                <div>
                    {ShowChoice()}
                </div>
            </div>
          </>
          }
        </>
      }
    </>
  );
}
