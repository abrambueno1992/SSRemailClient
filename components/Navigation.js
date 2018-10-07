import React, { Component } from 'react'

import Link from 'next/link';
import './Navigation.css'


const Navigation = () => {
    return (
        <div className="Nav">
            <ul className="breadcrumb">
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}


export default Navigation