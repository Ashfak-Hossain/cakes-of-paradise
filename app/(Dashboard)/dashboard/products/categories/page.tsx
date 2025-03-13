import Link from "next/link";

import NewCategoryForm from "@/components/categories/new-categories-form";
import FormSection from "@/components/common/SectionBody";
import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex h-full flex-1 flex-col space-y-6 p-2 sm:p-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center">
        <SectionHeader
          title="Add New Category"
          subtitle="Category for Products"
        />
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
      <FormSection>
        <NewCategoryForm />
      </FormSection>
    </div>
  );
};

export default page;
