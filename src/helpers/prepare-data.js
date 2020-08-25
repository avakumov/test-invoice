 //Подготвливает покупки для отображения, пользователи не повторяются
 export function prepareData(buyers) {
    const resultBuyers = [];
    buyers.forEach((buyer) => {
      const existedBuyerIndex = resultBuyers.findIndex(
        (b) => buyer.clientId === b.clientId
      );
      if (existedBuyerIndex >= 0) {
        resultBuyers[existedBuyerIndex].countPurchases++;
        resultBuyers[existedBuyerIndex].avarageCheck =
          (resultBuyers[existedBuyerIndex].totalRevenues + Number(buyer.buy)) /
          resultBuyers[existedBuyerIndex].countPurchases;
        resultBuyers[existedBuyerIndex].totalRevenues += Number(buyer.buy);
      } else {
        resultBuyers.push({
          clientId: buyer.clientId,
          name: buyer.name,
          countPurchases: 1,
          totalRevenues: Number(buyer.buy),
          avarageCheck: Number(buyer.buy),
        });
      }
    });
    return resultBuyers;
  }