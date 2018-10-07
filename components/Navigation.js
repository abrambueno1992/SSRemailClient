import React, { Component } from 'react'

import Link from 'next/link';
import './Navigation.css'


const Navigation = () => {
    return (
        <div className="Nav">
            <Link href="/">
                <div className="breadcrumb">
                    {/* <li> */}
                        <a>Home</a>
                    {/* </li> */}
                </div>
            </Link>
        </div>
    )
}


export default Navigation