import Card from "../Card/Card";

function Cards(props) {
  const { cards, spanHidden, error, likeCard, dislikeCard, spanPhrase} = props
  return (
    <section className= {props.isSavedPage ? "cards cards_saved" : "cards"}>
      <ul className="cardlist">
        {error !== ''  && <span className="cards__error-span">{error}</span> }
        { !spanHidden  &&  <span className="cards__span">{spanPhrase}</span>}
        { cards.map(card => (<Card key={card?.id || card.movieId} likeCard={likeCard} dislikeCard={dislikeCard} data={card} />)) }
      </ul>
    </section>
  );
}

export default Cards;
