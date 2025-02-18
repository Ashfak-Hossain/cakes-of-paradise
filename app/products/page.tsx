import SectionHeader from '@/components/common/SectionHeader';

const page = () => {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <SectionHeader
        title="Products Management"
        subtitle="Here's a list of all the products."
      />
    </div>
  );
};

export default page;

// 📍 Path: /products
// ✅ Features:
// 	•	📜 List of All Products (Cakes, Pastries, Cookies, etc.)
// 	•	📊 Profit Margin Per Product
// 	•	📖 Ingredients Breakdown Per Product
// 	•	✅ Availability Toggle (In Stock / Out of Stock)
// 	•	➕ Add New Product Form
