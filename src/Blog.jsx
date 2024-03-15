import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import NotFound from './Components/NotFound'
import Longin from './Components/Longin'
import CompanyCollaboratorAccess from './Components/CompanyCollaboratorAccess'
import RoutesProtecteds from './Components/RoutesProtecteds'
import Header from './Components/Header'
import Flotan from './Components/Flotan'
const Singlearticle = lazy(() => import('./Components/Singlearticle'))
const Seccion = lazy(() => import('./Components/Seccion'))
const Workus = lazy(() => import('./Components/Workus'))
const Containerpost = lazy(() => import('./Components/Blognews/component/Containerpost'))
const Blogarticle = lazy(() => import('../src/Components/Blognews/component/Blogarticle'))
const Theblog = lazy(() => import('./Components/Theblog'))
import Aboutblog from './Components/Aboutblog'
import FlashArticles from './Components/FlashArticles'
import Networks from './Components/Networks'
import Socialmedia from './Components/Socialmedia'
import news from './Images/news.jpg'
import blog from './Images/blogmain.jpg'
import math from './Images/math.svg'
import Columns from './Components/Columns';
import Pages_seccion_skeleto from './Components/Loading-skeleton/Pages_seccion_skeleto'
import Page_skeleton from './Components/Loading-skeleton/Page_skeleton'
import Loading from './Components/Loading'
import useRouter from './Hooks/useRouter'
import { db } from './firebaseconfig'
import Ciencias from './Components/Ciencias'

function Blog() {

  const [IsLogged, setIsLogged] = useState(false)

  const [reloadPage, setReloadPage] = useState(false)

  const { arrayOfDataBase } = useRouter()

  let filterarrayOfDataBase = arrayOfDataBase.filter((data, i) => (
    data != db
  ))


  const navigateBlog = useNavigate()
  const Home = () => {
    return (
      <article className='main_page'>
        <div className='Video'>
          <img src={news} alt="" />
          <h1>WELCOME</h1>
          <h2>UNIVERSITY</h2>
          <h3>INDEPENDET</h3>
          <h4>NEWSPAPER</h4>
        </div>

        <Aboutblog />

        <FlashArticles IsLogged={IsLogged} />
        {filterarrayOfDataBase.map((user, index) => (
          <Columns key={index} user={user} indext={index} />
        ))
        }

        {/** THIS SECTIONS HACE THE SAME CLASS JUST BECAUSE USE THE SAME CLASS FOR SIZE*/}
        <div className="To-the-blog"
          onClick={() => navigateBlog(`/CIENCIAS`)}
        >
          <img src={math} alt="" />
          <h2 className='To-the-blog-h2'
            onClick={() => navigateBlog(`/CIENCIAS`)}
          >CIENCIAS</h2>
        </div>
        {/** THIS SECTIONS HACE THE SAME CLASS JUST BECAUSE USE THE SAME CLASS FOR SIZE*/}
        <div className="To-the-blog"
          onClick={() => navigateBlog(`/READBLOG`)}
        >
          <img src={blog} alt="" />
          <h2 className='To-the-blog-h2-1'
            onClick={() => navigateBlog(`/READBLOG`)}
          >Blog</h2>
        </div>

        <Networks />

        <Socialmedia />

      </article>
    )
  }
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <div className='Blog'>
      <Header reloadPage={reloadPage} setReloadPage={setReloadPage} />
      <Flotan />
      <Routes>
        <Route path='/'
          element={
            <Home />
          }
        />
        <Route path='/CIENCIAS'
          element={
            <Suspense fallback={<Loading />}>
              <Ciencias />
            </Suspense>
          }
        />
        <Route path='/:name'
          element={
            <Suspense fallback={<Pages_seccion_skeleto />}>
              <Seccion />
            </Suspense>
          }
        />
        <Route path='/:name/:id'
          element=
          {
            <Suspense fallback={<Page_skeleton />}>
              <Singlearticle />
            </Suspense>
          }
        />
        <Route path='/OPENPOSSITIONS'
          element={
            <Suspense fallback={<Loading />}>
              <Workus />
            </Suspense>
          }
        />
        <Route path='/BLOG'
          element={
            <Suspense fallback={<Loading />}>
              <Containerpost />
            </Suspense>
          }
        />
        <Route path='/BLOGARTICLE/:id'
          element={
            <Suspense fallback={<Loading />}>
              <Blogarticle />
            </Suspense>
          }
        />
        <Route path='/READBLOG'
          element={
            <Suspense fallback={<Loading />}>
              <Theblog />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />

        <Route path='/LOGIN' element={<Longin IsLogged={IsLogged} setIsLogged={setIsLogged} />} />

        <Route element={<RoutesProtecteds IsLogged={IsLogged} />}>
          <Route
            path='/COLLABORATORS'
            element={<CompanyCollaboratorAccess IsLogged={IsLogged} setIsLogged={setIsLogged} />}
          />
        </Route>
      </Routes>

    </div>
  )
}

export default Blog