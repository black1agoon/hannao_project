export const mapOrderStatus = function (summary) {
  return {
    today: summary.todayAmount || 0,
    month: summary.monthAmount || 0,
    pending: 0,
    producing: summary.inProTradeAmount || 0,
    finished: summary.monthFinishTradeAmount || 0,
    overdue: summary.exceedTradeAmount || 0,
  }
}

export const mapOrders = function (orderData) {
  return orderData.rows.map(order => {
    return {
      code: order.tradeIdNo,
      customer: order.crmCustomerName,
      product: order.productTitle,
      total: order.quantity,
      finished: order.finishQuantity,
      hod: order.deliveryDate?.replace(/\d{4}-/, ''),
      status: order.finishQuantity / order.quantity < 0.3,
    }
  })
}