import Heading from './Heading';
import Button from './Button';

const ValueProp = ({ handleClick }) => {
  return (
    <div className='mt-16 mb-20'>
      <Heading text='Why Choose LinkEase?' extraStyles='text-center' />
      <p className='text-2xl w-5/6 mt-10 mx-auto text-center'>
        <span className='font-bold mb-2 block'>The best part is — LinkEase is absolutely
          free to use!</span> <br />
        Whether you&apos;re integrating links into your marketing campaigns,
        embedding them in your documents, sharing them across media platforms, or including them in your email communications,
        LinkEase offers a seamless and cost-effective solution for all your URL shortening needs. Enjoy without any cost.</p>
      <Button text={'Get Started'} handleClick={handleClick} extraStyles='block mx-auto mt-8' />
    </div>
  );
};

export default ValueProp;
