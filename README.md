# ( BookBasket ) Search For Your Desired Book

A web application for searching, viewing and getting a better understanding of books. Responsive designs to enhance user experience as well as eye pleasing user interface.
  ****
## Table of Contents

- [Project Overview](#project-overview)
- [Deployment](#deployment)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Walk Through](#walk-through)
- [APP Routes](#app-routes)
- [Documentation](#documentation)
- [Project Startup](#project-startup)
- [ChatGPT Links](#chatgpt-links)
- [Development Time](#development-time)
 ****

## Project Overview

Web application made using React, and public API to fetch book details. Users can search for their desired books by using book title, author, genre, person and isbn number. Look for a certain book, gather details about it, navigate through all provided links to have a better understanding on the book. A Purchase link is available, which will navigate you to an Amazon link where you can buy that particular book. Brief details of the books are provided including keywords, click on it to read the article about it. React state management tool is used to prevent the website from fetching the books from the server frequently. It also boosts the user experience as user does not have to re-search his book. Responsive and eye pleasing designs for all types of screen
  ****
## Deployment
- **Hosted Link**: [BookBasket](https://book-basket-one.vercel.app/)
 ****

## Features

- **Search Books**
- **Purchase Book**
- **View Book**
- **View Relevant Link**
- **Briefing of Book Details**

  ****

## Technologies Used

- **Frontend**:
  - **React**: For building the user interface.
  - **Vite**: A frontend tool that is used for building fast and optimized web applications.
  - **CSS**: For utility-first CSS styling.
  - **Tailwind**:  Makes it quicker to write and maintain the code quikly and effectively.
  - **Material UI**: For quick component and styling use.
  - **NPM packages**: For text animations and image slider.
- **Deployment**:
  - **Vercel**: For Hosting the Website.
  ****

  ## Walk Through
    ****

    1. Search For Books using multiple options such as title, genre,author, ISBN number and person.
    2. Books are fetched according to the search results.
    3. Pagination to show book results, navigate between pages to search for your required book.
    4. Click on a book to view all the details of that book.
    5. Clicking on "PURCHASE" will navigate you to an Amazon link where you can buy that product.
    6. All the details of the book such as author name, title, description, relevant links, tags, characters, places and many more.
     ****

  ## APP Routes
  **userRoutes :**
  - **/** - `Initial Route, where users can search for desired books`
  - **/book/works/:bookID** - `Individual book information`

  ## Documentation

  **File Structure :**
```plaintext
├── BookBasket      # Frontend React.js code
│    |──src 
|        |─components
|            |─BookSection      # displaying all fetched books
|            |─Button           # custom button
|            |─Loader           # custom circular loading
|            |─NoBooks          # books not found component
|            |─Skeleton         # skeleton loader for book
|            |─TopSection       # text animation section
|        |─pages
|            |─book             # displaying individual book
|            |─home             # book view and search functionality
```

  ## Project Startup
  - `npm install`
  - `npm run dev`

  ## ChatGPT Links
- [Link 1](https://chatgpt.com/share/672dc93c-d8bc-8013-b5eb-cf435996f984)
- [Link 2](https://chatgpt.com/share/672dc959-a8b4-8013-abc6-d8cb7384eb22)
- [Link 3](https://chatgpt.com/share/672dc96b-99e4-8013-9d61-07bc0e97420a)
- [Link 4](https://chatgpt.com/share/672dc91b-7348-8013-97a9-25f957dcb63f)
- [Link 5](https://chatgpt.com/share/672de664-64c8-8013-b894-a35fb5a71f19)
- [Link 6](https://chatgpt.com/share/672e0cc7-cdc0-8013-8118-51aadc028e1a)

  ## Development Time : **8 hours**