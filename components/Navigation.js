import React, { Component } from 'react'

import Link from 'next/link';
import './Navigation.css'


const Navigation = () => {
    return (
        <div className="Nav">
            <Link href="/">
                <div className="breadcrumb">
                        <a>Home</a>
                </div>
            </Link>
        </div>
    )
}


export default Navigation