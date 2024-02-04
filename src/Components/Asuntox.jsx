import React from 'react'
import useAsuntos from '../Hooks/useAsuntos'
import Loading from './Loading'

const Asuntox = () => {

    const asuntos = useAsuntos()
    const currentURL = 'https://unibarranquilla-newspaper.netlify.app/#/ASUNTOS'
    return (
        <article className="engineering_section">
            <div className="visualization-div-header"></div>
            <h2 className="title-actualidad">
                Mi universidad, mi ciudad 
            </h2>
            <p className='description-actualidad'>
            Esta sección es una ventana al vibrante entrelazamiento entre la vida estudiantil y el pulso urbano. Desde eventos académicos destacados hasta iniciativas comunitarias, esta sección captura la esencia de cómo las instituciones educativas y sus entornos se complementan, impactando tanto a estudiantes como a residentes locales.
            </p>

            {asuntos ? (
                <div className="body-actualidad">
                    {
                        asuntos?.map((asunto, i) => (
                            <div className="Card-actualidad" key={i}>
                                <div className="news-number">{`News #${i + 1}`}</div>
                                <h3 className="Card-actualidad-title">{asunto.Title}</h3>
                                <img className='img-actualidad' src={asunto.Pic} alt="" />
                                <h4 className="Card-actualidad-Editor">{`By ${asunto.Editor}`}</h4>
                                <p className="Card-actualidad-body">
                                    
                                    {asunto.Body.split('\n').map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))}
                                </p>
                                <h5 className="Card-actualidad-Date">{asunto.Date}</h5>
                                <button className="Card-link"> <a href={asunto.Link} target="_blank" rel="noopener noreferrer">Ver más</a> </button>
                                <div className='Card-social'>
                                    <h5>Comparte:</h5>
                                    <div className="Card-social-btn">
                                        <button
                                            onClick={() => {
                                                const url = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;
                                                window.open(url, '_blank');
                                            }}
                                        ><i className='bx bxl-facebook-square'></i></button>
                                        <button
                                            onClick={() => {
                                                const truncatedText = asunto.Title.slice(0, 50);
                                                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(truncatedText)}&url=https://bit.ly/3SzyQkU`;
                                                window.open(url, '_blank');
                                            }}
                                        ><i className='bx bxl-twitter' ></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            ) : (
                <Loading />
            )}
        </article>
    )
}

export default Asuntox