import React, { Component } from 'react'

import Link from 'next/link';
import './Navigation.css'


const Navigation = () => {
    return (
        <div className="Nav">
            <Link href="/">
                <ul className="breadcrumb">
                    <li>
                        <a>Home</a>
                    </li>
                </ul>
            </Link>
        </div>
    )
}


export default Navigation