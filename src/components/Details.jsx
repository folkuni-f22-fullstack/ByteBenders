import { BiArrowBack, BiMinus, BiPlus } from 'react-icons/bi'
import { BsFillCartPlusFill } from 'react-icons/bs'
import '../styles/details.css'

const Details = () => {
    return (
        <>
            <main className="details-page">
                <img className="background-img"></img>
                <div className='back-container'>
                    <BiArrowBack className='BiArrowBack' />
                </div>
                <section className='detail-popup'>
                    <section className='top-row'>
                        <div className='amount'>
                            <BiMinus className='BiMinus' />
                            <div className='amount-count'>1</div>
                            <BiPlus className='BiPlus' />
                        </div>
                        <p className='price'>129 :-</p>
                    </section>
                    <div className='description'>
                        <h5 className='detail-header'>Beskrivning</h5>
                        <p className='description-text'>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                    </div>
                    <button className='cart-btn'>
                        <p className='btn-text'>Lägg till vara</p>
                        < BsFillCartPlusFill className='BsFillCartPlusFill' />
                    </button>
                </section>
            </main>
        </>
    )
}

export default Details