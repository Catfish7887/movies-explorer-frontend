import Card from '../Card/Card';

function Cards(props) {

  return (
    <section className= {props.isSavedPage ? "cards cards_saved" : "cards"}>
      <ul className="cardlist">
        <Card isSavedPage={props.isSavedPage} />
        <Card isSavedPage={props.isSavedPage} />
        <Card isSavedPage={props.isSavedPage} />
      </ul>
    </section>
  );
}

export default Cards;
