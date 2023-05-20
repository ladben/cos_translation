import './EntryItemSection.css';

const EntryItemSection = (props) => {
  const { title, contentClassName, content } = props;

  return (
    <div className='entry-section'>
      <div className='section-title'>{title}</div>
      <div className={contentClassName}>{content}</div>
    </div>
  );
}
 
export default EntryItemSection;