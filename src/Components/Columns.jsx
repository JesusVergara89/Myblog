import React from 'react'
import '../Styles/Columns.css'
import { useNavigate } from 'react-router-dom'

/**
 * Functional component representing a grid of buttons linking to different sections.
 * Each button navigates to a specific route when clicked.
 */
const Columns = () => {
    // Navigation hook for different sections
    const navigateEngi = useNavigate()
    const navigateTravel = useNavigate()
    const navigateLiterature = useNavigate()
    const navigateExperience = useNavigate()
    const navigateAsuntos = useNavigate()
    const navigateVida = useNavigate()
    const navigateEvento = useNavigate()
    const navigateEntrevista = useNavigate()

    return (
        <div className="container">
            {/* Button for Engineering section */}
            <button className='outside-btn' onClick={() => navigateEngi('/ENGINEERING')}  >
                <img onClick={() => navigateEngi('/ENGINEERING')} src="https://photo-data-base.netlify.app/assets/people.dd634ce8.jpg" />
                <h2 >Ver más</h2>
                <h3>Actualidad Universitaria</h3>
            </button>

            {/* Button for Travel section */}
            <button id='outside-btn' onClick={() => navigateTravel('/TRAVEL')}  >
                <img onClick={() => navigateTravel('/TRAVEL')} src="https://photo-data-base.netlify.app/assets/arte.be73a92a.jpg" />
                <h2 >Ver más</h2>
                <h3>Cultura y Arte</h3>
            </button>

            {/* Button for Literature section */}
            <button className='outside-btn' onClick={() => navigateLiterature('/LITERATURE')} >
                <img onClick={() => navigateLiterature('/LITERATURE')} src="https://photo-data-base.netlify.app/assets/deporte.e5110516.jpg" />
                <h2 >Ver más</h2>
                <h3>Deportes Universitarios</h3>
            </button>

            {/* Button for Experience section */}
            <button className='outside-btn' onClick={() => navigateExperience('/EXPERIENCE')} >
                <img onClick={() => navigateExperience('/EXPERIENCE')} src="https://photo-data-base.netlify.app/assets/microscope.f118c0e4.jpg" />
                <h2 >Ver más</h2>
                <h3>Investigación y Desarrollo</h3>
            </button>

            {/* Button for Asuntos section */}
            <button className='outside-btn' onClick={() => navigateAsuntos('/ASUNTOS')} >
                <img onClick={() => navigateAsuntos('/ASUNTOS')} src="https://photo-data-base.netlify.app/assets/city.850437a4.jpg" />
                <h2 >Ver más</h2>
                <h3>Mi universidad, mi ciudad</h3>
            </button>

            {/* Button for Vida section */}
            <button className='outside-btn' onClick={() => navigateVida('/VIDA')} >
                <img onClick={() => navigateVida('/VIDA')} src="https://photo-data-base.netlify.app/assets/estudiantes.a90aad50.jpg" />
                <h2 >Ver más</h2>
                <h3>Vida Estudiantil</h3>
            </button>

            {/* Button for Evento section */}
            <button className='outside-btn' onClick={() => navigateEvento('/EVENTO')} >
                <img onClick={() => navigateEvento('/EVENTO')} src="https://photo-data-base.netlify.app/assets/evento.b25824db.jpg" />
                <h2 >Ver más</h2>
                <h3>Eventos y Actividades</h3>
            </button>

            {/* Button for Entrevista section */}
            <button className='outside-btn' onClick={() => navigateEntrevista('/ENTREVISTA')} >
                <img onClick={() => navigateEntrevista('/ENTREVISTA')} src="https://photo-data-base.netlify.app/assets/entrevista.6f892194.jpg" />
                <h2 >Ver más</h2>
                <h3>Entrevistas y Perfiles</h3>
            </button>

        </div >
    )
}

export default Columns
