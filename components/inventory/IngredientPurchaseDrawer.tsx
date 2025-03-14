'use client';

import IngredientPurchaseForm from '@/components/inventory/IngredientPurchaseForm';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { setIsIngredientPurchaseDrawerOpen } from '@/redux/features/drawers/drawersSlice';
import { clearSelectedIngredient } from '@/redux/features/ingredients/ingredientsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

const IngredientPurchaseDrawer = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.drawers.isIngredientPurchaseDrawerOpen);
  const formData = useAppSelector((state: RootState) => state.ingredients.formInitialData);

  const handleClose = () => {
    dispatch(setIsIngredientPurchaseDrawerOpen(false));
    dispatch(clearSelectedIngredient());
  };

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Purchase Ingredient</DrawerTitle>
          <DrawerDescription>Purchase the ingredient from the supplier.</DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto w-full px-10">
          <div>
            <IngredientPurchaseForm initialData={formData} />
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button asChild variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default IngredientPurchaseDrawer;
