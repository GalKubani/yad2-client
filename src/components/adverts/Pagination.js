import React from 'react'

const Pagination = ({ currentPage, advertsPerPage, totalAdverts, paginate }) => {

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalAdverts / advertsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className="paginate-container">
            <ul className="number-wrapper">
                {pageNumbers.map(number => (
                    <li className={currentPage === number ? "active-page" : ""} onClick={() => paginate(number)} key={number}>
                        <span>   {number} </span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination