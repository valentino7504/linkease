import { useRef } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const MiniShortUrlMsg = ({ urlDetails }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const shortId = urlDetails.shortId;
  const linkRef = useRef(null);
  const navigate = useNavigate();

  const handleCopy = (e) => {
    e.preventDefault();
    const link = linkRef.current;
    if (!link)
      return;
    navigator.clipboard.writeText(link.textContent);
    const btnText = e.target.textContent;
    e.target.textContent = 'Copied!';
    setTimeout(() => e.target.textContent = btnText, 2000);
  }

  const handleInfo = (e) => {
    e.preventDefault();
    navigate('/stats/' + shortId);
  }

  return (
    <div className='text-green-600 mt-4 mx-auto w-4/5 lg:w-2/5
    text-xl p-1 border-2 border-green-600 rounded bg-slate-200 break-words'>
      <h2 className=''>Here's your new short link!</h2> <br />
      <a href={`/${shortId}`} target='_blank' rel='noopener noreferrer'
        className='font-bold underline hover:text-pri' ref={linkRef}>
        {`${baseUrl}/${shortId}`}
      </a>
      <div className='flex flex-row flex-wrap justify-around w-1/2 mx-auto mt-6'>
        <Button
          extraStyles='bg-white text-black lg:w-auto'
          text={'Copy to Clipboard'}
          handleClick={handleCopy}
        />
        <Button
          extraStyles='bg-white text-black lg:w-auto'
          text={'View Detailed Info'}
          handleClick={handleInfo}
        />
      </div>
    </div>
  );
}

export default MiniShortUrlMsg;
