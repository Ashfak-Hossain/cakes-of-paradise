'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { setIsDrawerOpen } from '@/redux/features/drawers/drawersSlice';
import IngredientForm from '@/components/inventory/IngredientForm';
import { clearSelectedIngredient } from '@/redux/features/ingredients/ingredientsSlice';

const IngredientEditDrawer = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: RootState) => state.drawers.isDrawerOpen
  );
  const formData = useAppSelector(
    (state: RootState) => state.ingredients.formInitialData
  );

  const handleClose = () => {
    dispatch(setIsDrawerOpen(false));
    dispatch(clearSelectedIngredient());
  };

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Update Ingredient</DrawerTitle>
          <DrawerDescription>
            Update the details of the ingredient.
          </DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto w-full px-10">
          <div>
            <IngredientForm initialData={formData} isUpdateMode />
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default IngredientEditDrawer;
