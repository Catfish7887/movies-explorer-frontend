
function Cards(props) {

  return (
    <section className= {props.isSavedPage ? "cards cards_saved" : "cards"}>
      <ul className="cardlist">
        {props.cards}
      </ul>
    </section>
  );
}

export default Cards;
