import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <>
      <div className='min-h-screen'>
        <Navbar />
        <div className='text-center text-xl'>
          <h1 className='text-9xl mt-14 md:mt-20 text-pri font-bold'>404</h1>
          <h2 className=' text-gray-600 px-6'>We're really sorry, but we just couldn't find the page you're looking for</h2>
          <p className='text-2xl p-8'>Well, at least you know where <Link to={'/'} className="text-pri">home</Link> is</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
