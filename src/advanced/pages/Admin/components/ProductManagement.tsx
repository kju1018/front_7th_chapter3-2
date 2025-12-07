import { useState } from "react";
import { ProductWithUI } from "../../../../types";
import { useProductForm } from "../hooks/useProductForm";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";
import { useProducts } from "../../../hooks/useProducts";

export function ProductManagement() {
  const [showProductForm, setShowProductForm] = useState(false);

  // useProducts hook에서 actions만 가져오기
  const products = useProducts();

  const {
    productForm,
    editingProduct,
    startEditProduct,
    startAddProduct,
    handleSubmit,
    resetForm,
    handleChange,
    handlePriceBlur,
    handleStockBlur,
    handleDiscountChange,
    handleRemoveDiscount,
    handleAddDiscount,
  } = useProductForm({
    onAdd: (product) => {
      products.add(product);
      setShowProductForm(false);
    },
    onUpdate: (id, product) => {
      products.update(id, product);
      setShowProductForm(false);
    },
  });

  const handleEditProduct = (product: ProductWithUI) => {
    startEditProduct(product);
    setShowProductForm(true);
  };

  const handleAddProduct = () => {
    startAddProduct();
    setShowProductForm(true);
  };

  const handleCancel = () => {
    resetForm();
    setShowProductForm(false);
  };

  return (
    <section className="bg-white rounded-lg border border-gray-200">
      <ProductList
        onEdit={handleEditProduct}
        onDelete={products.delete}
        onAdd={handleAddProduct}
      />
      {showProductForm && (
        <ProductForm
          productForm={productForm}
          editingProduct={editingProduct}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onChange={handleChange}
          onPriceBlur={handlePriceBlur}
          onStockBlur={handleStockBlur}
          onDiscountChange={handleDiscountChange}
          onRemoveDiscount={handleRemoveDiscount}
          onAddDiscount={handleAddDiscount}
        />
      )}
    </section>
  );
}
