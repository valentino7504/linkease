import '../index.css';
const Heading = ({ text, extraStyles }) => <h1
  className={'text-4xl sm:text-5xl md:text-6xl font-extrabold '
  + `${extraStyles ? extraStyles : ''}`} >
  {text}
</h1>;

export default Heading;
