import React from 'react'
import bannerBg from '../assest/images/cyberbg.jpg'

const Comingsoon = () => {
    return (
        <>
            <div className='banner'>
                <img src={bannerBg} />
                <h2 className='banner-title'>Cyber Forest</h2>
                <h2 className='banner-text'>Coming Soon</h2>
            </div>
        </>
    )
}

export default Comingsoon