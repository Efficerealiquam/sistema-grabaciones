import React from 'react'
import "@styles/Loader.css";

const LoaderT = () => {
  return (
    <div className='cont_loader l2' >
            <div className='cont_lod_opt l2' >
                <div className='reflect_loader' >
                    <div className='loader_2' >
                        <div className="ball"></div>
                    </div>
                    <div className='loader' >
                        <h2>Cargando...</h2>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default LoaderT