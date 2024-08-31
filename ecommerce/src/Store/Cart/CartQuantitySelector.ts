import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';


export const getTotalCartQuantity = createSelector((state:RootState) => state.Cart.items,(items) => Object.values(items).reduce((a,c) => a+c,0))