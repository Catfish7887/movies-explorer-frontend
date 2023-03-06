import Card from "../Card/Card";

function Cards(props) {
  const { cards, spanHidden, error, likeCard, dislikeCard, savedIDs} = props
  return (
    <section className= {props.isSavedPage ? "cards cards_saved" : "cards"}>
      <ul className="cardlist">
        {error !== ''  && <span className="cards__error-span">{error}</span> }
        { !spanHidden  &&  <span className="cards__span">Введите ключевое слово для поиска</span>}
        { cards.map(card => (<Card key={card.id} likeCard={likeCard} savedIDs={savedIDs} dislikeCard={dislikeCard} data={card} />)) }
      </ul>
    </section>
  );
}

export default Cards;
