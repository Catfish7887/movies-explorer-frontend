function calculateCardsQuantity(setter) {
  if (window.innerWidth >= 1280) {
    setter(12);
    return;
  }

  if (window.innerWidth > 768 && window < 1280) {
    setter(8);
    return;
  }

  if (window.innerWidth > 320 && window < 768) {
    setter(5);
    return;
  }
  return;
}

function loadMore(window, renderSize, setter) {
  if (window >= 1280) {
    setter(renderSize + 3);
    return;
  }

  if (window > 768 && window < 1280) {
    setter(renderSize + 2);
    return;
  }

  if (window > 320 && window < 768) {
    setter(renderSize + 2);
    return;
  }

  return
}

const calcFunctions = {
  calculateCardsQuantity,
  loadMore
}

export default calcFunctions;