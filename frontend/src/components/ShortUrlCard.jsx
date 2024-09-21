import { QRCodeCanvas } from 'qrcode.react';
import Button from './Button';
import { useRef } from 'react';

const CardSubtitle = ({ text }) =>
  <p className='font-bold text-xl inline-block sm:mr-4'>{text}:</p>;
const CardLink = ({ href }) =>
  <a href={href} target='_blank' rel='noopener noreferrer' className='text-gray-700 underline text-lg'>
    {href}
  </a>;

const ShortUrlCard = ({ urlDetails, extraStyles, handleClick }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const expDateObj = new Date(urlDetails.expiry);
  const createDateObj = new Date(urlDetails.created);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const expiryDate = expDateObj.toLocaleDateString(undefined, options);
  const createDate = createDateObj.toLocaleDateString(undefined, options);
  const canvasRef = useRef(null);
  const downloadQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas)
      return;
    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `linkease_qr_${urlDetails.shortId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`mx-auto w-3/4 md:w-1/2 bg-pri ${extraStyles}
    text-center p-6 rounded-lg`}>
      <h2 className='text-2xl font-bold mb-5'>Your URL</h2>
      <div>
        <div className='break-words mb-4'>
          <CardSubtitle text={'Full URL'} />
          <CardLink href={urlDetails.fullUrl} />
        </div>
        <div className='break-words mb-4'>
          <CardSubtitle text={'Shortened URL'} />
          <CardLink href={`${baseUrl}/${urlDetails.shortId}`} />
        </div>
        <div className='break-words mb-4'>
          <CardSubtitle text={'Clicks'} />
          <p className='inline-block text-2xl font-bold'>{urlDetails.clicks}</p>
        </div>
        <div className='break-words mb-4'>
          <CardSubtitle text={'QR Code'} />
          <QRCodeCanvas
            ref={canvasRef}
            value={`${baseUrl}/${urlDetails.shortId}`}
            className='inline-block p-2'
            marginSize={4}
            size={200}
          />
        </div>
        <div className='break-words mb-4'>
          <CardSubtitle text={'Created'} />
          <p className='inline-block text-xl font-bold'>
            {createDate}
          </p>
        </div>
        <div className='break-words mb-4'>
          <CardSubtitle text={'Expiry'} />
          <p className='inline-block text-xl font-bold'>
            {expiryDate}
          </p>
        </div>
        <div className='break-words mb-4 flex flex-row gap-4 items-center justify-center flex-wrap'>
          <Button text='Refresh Clicks' extraStyles={'bg-white border border-black p-1'} handleClick={handleClick} />
          <Button text='Download QR Code' extraStyles={'bg-white border border-black p-1 lg:w-auto'} handleClick={downloadQRCode} />
        </div>
      </div>
    </div>
  );
};

export default ShortUrlCard;
