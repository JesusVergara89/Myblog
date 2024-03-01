import React, { useEffect, useState } from 'react';
import { db10, db2, db3, db4, db5, db6, db7, db8, db9 } from '../firebaseconfig'
import Cardnewyorktimes from './Cardnewyorktimes';
import { collection, getDocs, orderBy, query, limit, startAfter, getCountFromServer } from 'firebase/firestore';
import Card_skeleton from './Loading-skeleton/Card_skeleton';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import NotFound from './NotFound';
import Botonera from './Botonera';

const Seccion = () => {
    const { name } = useParams()
    const arrayOfDataBase = [db2, db3, db4, db5, db6, db7, db8, db9, db10];
    const arrayGuia = ['ACTUALIDAD', 'CULTURA', 'DEPORTES', 'INVESTIGACION', 'ASUNTOS', 'VIDAU', 'EVENTOS', 'ENTREVISTA', 'TECNOLOGIA']
    const functionReturn = () => {
        let dato
        arrayGuia.map((user, index) => {
            if (user === name) {
                dato = arrayOfDataBase[index]
            }
        })
        return dato
    }
    const ArrayDescrip = [
        {
            dataTitle: 'ACTUALIDAD',
            Url: 'ACTUALIDAD',
            dataDescription: 'Mantente al tanto de las últimas noticias, eventos y desarrollos en nuestra universidad y en el mundo. Desde anuncios importantes hasta logros destacados de nuestros estudiantes y profesores.'
        },
        {
            dataTitle: 'CULTURA Y ARTE',
            Url: 'CULTURA',
            dataDescription: 'Explora la escena cultural y artística en Unibarranquilla. Reseñas de eventos, entrevistas con artistas locales y destacados, así como la cobertura de actividades culturales organizadas por la universidad.'
        },
        {
            dataTitle: 'DEPORTES',
            Url: 'DEPORTES',
            dataDescription: 'Permanece actualizado sobre los logros y desempeños de nuestros equipos deportivos, tanto a nivel nacional como internacional. Mantente informado sobre eventos deportivos emocionantes, entrevistas con destacados atletas y análisis de campeonatos universitarios y de alto nivel. Sumérgete en el mundo del deporte donde la pasión y la excelencia se entrelazan en cada competición, desde lo local hasta lo global.'
        },
        {
            dataTitle: 'INVESTIGACIÓN Y DESARROLLO',
            Url: 'INVESTIGACION',
            dataDescription: 'Sumérgete en el vibrante tejido urbano donde convergen la vida estudiantil y la innovación académica. Explora los hallazgos más recientes y los proyectos pioneros desarrollados por nuestros destacados académicos y estudiantes. Adéntrate en las contribuciones que nuestra universidad ofrece al conocimiento y al progreso científico en el bullicioso entorno de la ciudad.'
        },
        {
            dataTitle: 'MI UNIVERISIDAD, MI CIUDAD',
            Url: 'ASUNTOS',
            dataDescription: 'Aquí te sumergimos en la vida estudiantil y el dinamismo urbano que define nuestra comunidad. Desde eventos académicos hasta iniciativas comunitarias, descubre cómo nuestra universidad y la ciudad se entrelazan para enriquecer nuestra experiencia y dejar una marca positiva en nuestra comunidad.'
        },
        {
            dataTitle: 'VIDA ESTUDIANTIL',
            Url: 'VIDAU',
            dataDescription: 'Explora la experiencia estudiantil en Unibarranquilla. Desde consejos prácticos hasta perfiles de estudiantes destacados, te ofrecemos una visión completa de la vida en el campus.'
        },
        {
            dataTitle: 'EVENTOS',
            Url: 'EVENTOS',
            dataDescription: 'Entérate de los eventos próximos, conferencias, seminarios y actividades sociales que enriquecen nuestra vida universitaria y de la ciudad. No te pierdas ninguna oportunidad de participar y ser parte activa de la comunidad.'
        },
        {
            dataTitle: 'ENTREVISTAS Y PERFILES',
            Url: 'ENTREVISTA',
            dataDescription: 'Conoce a fondo a los líderes, académicos y personalidades que forman parte de nuestra ciudad, universidad y país. Descubre sus historias, experiencias y contribuciones a la educación superior.'
        },
        {
            dataTitle: 'TECNOLOGIA',
            Url: 'TECNOLOGIA',
            dataDescription: '¡Bienvenido a la sección de Tecnología! Aquí, te mantenemos al día con las últimas novedades en gadgets, innovaciones y avances tecnológicos. Desde smartphones hasta inteligencia artificial, exploramos cómo la tecnología está moldeando nuestro futuro.'
        }
    ]
    const Descripcion = ArrayDescrip.filter((index) => index.Url === name)
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const [articles, setArticles] = useState()
    const [Lasdoc, setLasdoc] = useState()
    const [Firstdoc, setFirstdoc] = useState()
    const [Start, setStart] = useState({})
    const [Totalpages, setTotalpages] = useState()
    const [Orden, setOrden] = useState("desc")
    const [Reverse, setReverse] = useState(false)
    const [Page, setPage] = useState(1)

    useEffect(() => {
        setArticles(undefined)
        let validar = functionReturn()
        if (validar) {
            scrollToTop()
            const articleRef = collection(validar, "Articles")
            let q = query(articleRef, orderBy("createdAt", `${Orden}`), limit(10), startAfter(Start))
            getDocs(q)
                .then((resp) => {
                    let Result
                    if (Reverse) {
                        Result = resp.docs.reverse()
                    } else {
                        Result = resp.docs
                    }
                    setArticles(
                        Result.map((doc) => {
                            return { ...doc.data(), id: doc.id }
                        })
                    )
                    setLasdoc(Result[resp.docs.length - 1])
                    setFirstdoc(Result[0])
                })
        } else {
            setArticles('failed')
        }
    }, [name, Start])
    useEffect(() => {
        setArticles(undefined)
        setTotalpages(undefined)
        let validar = functionReturn()
        if (validar) {
            const articleRef = collection(validar, "Articles")
            getCountFromServer(articleRef)
                .then((resp) => {
                    setTotalpages(Math.ceil((resp.data().count) / 10))
                })
        } else {
            setArticles('failed')
        }
    }, [name])
    return (
        <>
            {articles === 'failed' ? <NotFound /> :
                <article className="engineering_section">
                    <h2 className="title-actualidad">{
                        Descripcion[0] ?
                            Descripcion[0].dataTitle
                            : <Skeleton width={'80vh'} height={40} style={{ marginTop: 60 }} />
                    }</h2>
                    <p className='description-actualidad'>{
                        Descripcion[0] ?
                            Descripcion[0].dataDescription
                            : <Skeleton height={100} />
                    }</p>
                    {Totalpages ?
                        <Botonera
                            Totalpages={Totalpages}
                            setStart={setStart}
                            Lasdoc={Lasdoc}
                            Firstdoc={Firstdoc}
                            setOrden={setOrden}
                            setReverse={setReverse}
                            setPage={setPage}
                            Page={Page}
                        />
                        : <Skeleton width={'20%'} height={35} style={{ marginLeft: '35%' }} />
                    }
                    <div className="wrapp-section">
                        {articles ?
                            articles.map((article, i) => (
                                <Cardnewyorktimes key={i} database={name} article={article} />
                            ))
                            : <Card_skeleton />
                        }
                    </div>
                    {Totalpages ?
                        <Botonera
                            Totalpages={Totalpages}
                            setStart={setStart}
                            Lasdoc={Lasdoc}
                            Firstdoc={Firstdoc}
                            setOrden={setOrden}
                            setReverse={setReverse}
                            setPage={setPage}
                            Page={Page}
                        />
                        : <Skeleton width={'20%'} height={35} style={{ marginLeft: '35%' }} />
                    }
                </article>
            }
        </>
    )
}

export default Seccion