"use client";



import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { notFound } from "next/navigation";

import Container from "@/components/shared/container/container";

import ProductGallery from "@/features/products/components/ProductGallery";

import ProductInfo from "@/features/products/components/ProductInfo";

import ReviewCard from "@/features/products/components/ReviewCard";

import RelatedProducts from "@/features/products/components/RelatedProducts";

import { getProductBySlug, getRelatedProducts, getReviewsByProductId } from "@/features/products/data/products";

import { Product } from "@/features/products/types";



export default function ProductPage({ params }: { params: { slug: string } }) {

  const [product, setProduct] = useState<Product | null>(null);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const [reviews, setReviews] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews" | "shipping">("description");



  useEffect(() => {

    async function fetchData() {

      try {

        const productData = await getProductBySlug(params.slug);

        if (!productData) {

          notFound();

          return;

        }

        setProduct(productData);

        const related = await getRelatedProducts(productData.id);

        setRelatedProducts(related);

        const reviewData = getReviewsByProductId(productData.id);

        setReviews(reviewData);

      } catch (error) {

        console.error('Error fetching product:', error);

      } finally {

        setLoading(false);

      }

    }

    fetchData();

  }, [params.slug]);



  if (loading) {

    return (

      <div className="min-h-screen pt-24 flex items-center justify-center">

        <div className="text-center">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>

          <p className="text-gray-600">Loading product...</p>

        </div>

      </div>

    );

  }

  if (!product) {

    notFound();

  }



  const tabs = [

    { id: "description" as const, label: "Description" },

    { id: "specifications" as const, label: "Specifications" },

    { id: "reviews" as const, label: `Reviews (${reviews.length})` },

    { id: "shipping" as const, label: "Shipping" },

  ];



  return (

    <main className="min-h-screen pt-24">

      {/* Breadcrumb */}

      <section className="bg-white border-b border-gray-100">

        <Container className="py-4">

          <nav className="flex items-center gap-2 text-sm text-gray-500">

            <a href="/" className="hover:text-gray-700">Home</a>

            <span>/</span>

            <a href="/shop" className="hover:text-gray-700">Shop</a>

            <span>/</span>

            <span className="text-gray-900">{product.name}</span>

          </nav>

        </Container>

      </section>



      {/* Product Section */}

      <section className="py-12 bg-white">

        <Container>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Gallery */}

            <motion.div

              initial={{ opacity: 0, x: -30 }}

              animate={{ opacity: 1, x: 0 }}

              transition={{ duration: 0.6 }}

            >

              <ProductGallery images={product.images} />

            </motion.div>



            {/* Product Info */}

            <motion.div

              initial={{ opacity: 0, x: 30 }}

              animate={{ opacity: 1, x: 0 }}

              transition={{ duration: 0.6, delay: 0.2 }}

            >

              <ProductInfo product={product} />

            </motion.div>

          </div>

        </Container>

      </section>



      {/* Product Details Tabs */}

      <section className="py-12 bg-gray-50">

        <Container>

          {/* Tabs */}

          <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">

            {tabs.map((tab) => (

              <button

                key={tab.id}

                onClick={() => setActiveTab(tab.id)}

                className={`pb-4 text-sm font-medium whitespace-nowrap transition-colors relative ${

                  activeTab === tab.id

                    ? "text-black"

                    : "text-gray-500 hover:text-gray-700"

                }`}

              >

                {tab.label}

                {activeTab === tab.id && (

                  <motion.div

                    layoutId="activeTab"

                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"

                  />

                )}

              </button>

            ))}

          </div>



          {/* Tab Content */}

          <motion.div

            key={activeTab}

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.3 }}

          >

            {activeTab === "description" && (

              <div className="max-w-4xl">

                <h3 className="text-2xl font-bold mb-4">Product Description</h3>

                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                

                <h4 className="text-lg font-semibold mb-3">Key Features</h4>

                <ul className="space-y-2">

                  {product.tags.map((tag, index) => (

                    <li key={index} className="flex items-center gap-2 text-gray-600">

                      <div className="w-1.5 h-1.5 bg-black rounded-full" />

                      <span className="capitalize">{tag}</span>

                    </li>

                  ))}

                </ul>

              </div>

            )}



            {activeTab === "specifications" && (

              <div className="max-w-4xl">

                <h3 className="text-2xl font-bold mb-6">Specifications</h3>

                <div className="grid md:grid-cols-2 gap-6">

                  {[

                    { label: "Brand", value: product.brand },

                    { label: "Category", value: product.category },

                    { label: "Material", value: "Premium Leather" },

                    { label: "Sole", value: "Rubber" },

                    { label: "Weight", value: "280g" },

                    { label: "Stock", value: `${product.stock} available` },

                  ].map((spec, index) => (

                    <div key={index} className="flex justify-between py-3 border-b border-gray-200">

                      <span className="text-gray-500">{spec.label}</span>

                      <span className="font-medium">{spec.value}</span>

                    </div>

                  ))}

                </div>

              </div>

            )}



            {activeTab === "reviews" && (

              <div>

                {/* Rating Summary */}

                <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100">

                  <div className="flex items-center gap-8">

                    <div className="text-center">

                      <div className="text-5xl font-bold mb-2">{product.rating}</div>

                      <div className="text-sm text-gray-500">out of 5</div>

                    </div>

                    <div className="flex-1">

                      {[5, 4, 3, 2, 1].map((star) => {

                        // Calculate percentage based on rating - higher ratings should have higher percentages
                        const percentage = product.rating >= star 
                          ? 80 + (product.rating - star) * 5 
                          : Math.max(10, 60 - (star - product.rating) * 15);

                        return (

                          <div key={star} className="flex items-center gap-2 mb-2">

                            <span className="text-sm w-3">{star}</span>

                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">

                              <div

                                className="h-full bg-yellow-500 rounded-full"

                                style={{

                                  width: `${Math.min(100, Math.max(5, percentage))}%`,

                                }}

                              />

                            </div>

                          </div>

                        );

                      })}

                    </div>

                    <div className="text-center">

                      <div className="text-2xl font-bold">{product.reviewCount}</div>

                      <div className="text-sm text-gray-500">reviews</div>

                    </div>

                  </div>

                </div>



                {/* Reviews */}

                <div className="grid md:grid-cols-2 gap-6">

                  {reviews.map((review) => (

                    <ReviewCard key={review.id} review={review} />

                  ))}

                </div>

              </div>

            )}



            {activeTab === "shipping" && (

              <div className="max-w-4xl">

                <h3 className="text-2xl font-bold mb-6">Shipping & Returns</h3>

                <div className="space-y-6">

                  {[

                    {

                      title: "Free Shipping",

                      description: "We offer free shipping on all orders over $100. Orders are processed within 1-2 business days.",

                    },

                    {

                      title: "Standard Delivery",

                      description: "Standard shipping takes 3-5 business days depending on your location.",

                    },

                    {

                      title: "Express Delivery",

                      description: "Express shipping is available for $15. Orders arrive within 1-2 business days.",

                    },

                    {

                      title: "Easy Returns",

                      description: "We accept returns within 30 days of purchase. Items must be unworn and in original packaging.",

                    },

                    {

                      title: "International Shipping",

                      description: "We ship to over 50 countries worldwide. Shipping times and rates vary by destination.",

                    },

                  ].map((item, index) => (

                    <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100">

                      <h4 className="font-semibold mb-2">{item.title}</h4>

                      <p className="text-gray-600">{item.description}</p>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </motion.div>

        </Container>

      </section>



      {/* Related Products */}

      {relatedProducts.length > 0 && (

        <section className="py-12 bg-white">

          <Container>

            <RelatedProducts products={relatedProducts} />

          </Container>

        </section>

      )}

    </main>

  );

}

