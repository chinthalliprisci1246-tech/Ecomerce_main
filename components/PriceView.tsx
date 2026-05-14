import React from 'react'
import PriceFormatter from './PriceFormater';
interface Props {
  price?: number;
  discount?: number;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  console.log(className)
  return (
    <div>
      <div className='flex items-center gap-2'>
        <PriceFormatter amount={price} className='text-shop-dark-green' />
         {price && discount && <PriceFormatter amount={price + (discount * price ) / 100} 
          className='line-through text-xs font-normal text-shop-light-text'
         />}
      </div>
    </div>
  )
}

export default PriceView
