import Card from "../Card/Card";

function Cards(props) {
  const {cards} = props

  return (
    <section className= {props.isSavedPage ? "cards cards_saved" : "cards"}>
      <ul className="cardlist">
        { cards[0] ? cards.map(card => (<Card key={card.id} data={card} />)) : <span>Введите ключевое слово для поиска</span>}
      </ul>
    </section>
  );
}

export default Cards;
