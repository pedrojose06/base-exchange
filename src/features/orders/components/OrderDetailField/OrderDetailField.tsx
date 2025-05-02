interface IOrderDetailField {
  title: string
  content: string | number
  isEmphasis?: boolean
}

const OrderDetailField = ({
  title,
  content,
  isEmphasis,
}: IOrderDetailField) => {
  return (
    <div>
      <div className={`text-gray-400 text-xs ${isEmphasis && 'font-bold'}`}>
        {title}
      </div>
      <p className={`${isEmphasis && 'font-bold'}`}>{content}</p>
    </div>
  )
}
export default OrderDetailField
